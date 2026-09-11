#!/usr/bin/env python3
"""Source-level validation, no browser and no third-party packages required."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import Counter
import json
import re
import sys
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'dist' if (ROOT/'dist').is_dir() and not (ROOT/'index.html').is_file() else ROOT
errors=[]
def require(condition,message):
 if not condition: errors.append(message)

class Page(HTMLParser):
 def __init__(self,path):
  super().__init__(convert_charrefs=True);self.path=path;self.ids=[];self.refs=[];self.h1=0;self.images=[];self.json=[];self.in_json=False;self.buf='';self.meta={};self.iframe=0;self.feed(path.read_text())
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'id' in d:self.ids.append(d['id'])
  if tag=='h1':self.h1+=1
  if tag=='meta':self.meta[d.get('name') or d.get('property')]=d.get('content')
  if tag=='iframe':self.iframe+=1
  if tag=='img':
   self.images.append(d)
   require('alt' in d,f'{self.path.name}: missing alt')
   require(d.get('width') and d.get('height'),f'{self.path.name}: missing image dimensions')
  if tag=='a' and d.get('target')=='_blank':require('noopener' in d.get('rel',''),f'{self.path.name}: unsafe new-tab link')
  for key in ['href','src']:
   if key in d:self.refs.append(d[key])
  if 'srcset' in d:
   self.refs += [x.strip().split()[0] for x in d['srcset'].split(',')]
  if tag=='script' and d.get('type')=='application/ld+json':self.in_json=True;self.buf=''
 def handle_data(self,data):
  if self.in_json:self.buf+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.in_json:
   try:self.json.append(json.loads(self.buf))
   except ValueError as ex:errors.append(f'{self.path.name}: invalid JSON-LD {ex}')
   self.in_json=False

pages={p.name:Page(p) for p in OUT.glob('*.html')}
PRODUCTION='noindex' not in (pages['index.html'].meta.get('robots') or '')
HOME='/' if PRODUCTION else 'index.html'
for name,page in pages.items():
 require(page.h1==1,f'{name}: expected one h1, got {page.h1}')
 require(not [x for x,c in Counter(page.ids).items() if c>1],f'{name}: duplicate ids')
 require(page.iframe==0,f'{name}: iframe loaded before consent')
 if name!='404.html':
  require(page.meta.get('description'),f'{name}: missing description')
  require(page.meta.get('robots'),f'{name}: missing robots directive')
 for ref in page.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:continue
  if not PRODUCTION:
   require(not u.path.startswith('/'),f'{name}: root-relative link breaks project Pages: {ref}')
  if u.path.startswith('/'):
   require(PRODUCTION,f'{name}: absolute path only allowed in production: {ref}')
   continue
  target=(OUT/unquote(u.path)) if u.path else OUT/name
  require(target.is_file(),f'{name}: missing local resource {ref}')
  if u.fragment and target.name in pages:require(unquote(u.fragment) in pages[target.name].ids,f'{name}: missing fragment {ref}')
for css in OUT.rglob('*.css'):
 for ref in re.findall(r'url\([\'"]?([^\)\'\"]+)',css.read_text()):
  require(not ref.startswith(('http:','https:','//')),f'{css.name}: unexpected external request {ref}')
  require((css.parent/ref).is_file(),f'{css.name}: missing {ref}')
menu=json.loads((Path(__file__).parent/'menu.json').read_text())
home_html=(OUT/'index.html').read_text()
for offer in menu['offers']:
 require(offer['price'] in home_html,f"Offer price {offer['price']} for {offer['day']} missing on the home page")
 if offer.get('extraPrice'): require(offer['extraPrice'] in home_html,f"Extra offer price {offer['extraPrice']} missing")
graph=pages['speisekarte.html'].json[0]['@graph']
schema_menu=next(x for x in graph if x['@type']=='Menu')
count=sum(len(c['items']) for c in menu['categories'])
require(sum(len(s['hasMenuItem']) for s in schema_menu['hasMenuSection'])==count,'Structured menu count differs')
for category,section in zip(menu['categories'],schema_menu['hasMenuSection']):
 for item,structured in zip(category['items'],section['hasMenuItem']):
  require(item['name']==structured['name'],'Menu name differs in schema')
  expected=[p.replace(',','.') for _,p in item['prices']] if 'prices' in item else [item['price'].replace(',','.')] if item['price'] else []
  require([o['price'] for o in structured.get('offers',[])]==expected,'Price differs in structured menu')
for name,page in pages.items():
 for graph in page.json:
  for item in graph.get('@graph',[]):
   if item.get('@type')=='Restaurant':
    require(item['telephone']=='+4915901254030',f'{name}: wrong telephone in schema')
    require('aggregateRating' not in item,f'{name}: unverified rating')
    require('geo' not in item,f'{name}: unverified coordinates')
manifest=json.loads((OUT/'site.webmanifest').read_text())
for i in manifest['icons']:require((OUT/i['src']).is_file(),'Manifest icon missing')
for p in OUT.rglob('*.svg'):
 try:ET.parse(p)
 except ET.ParseError as ex:errors.append(f'{p}: invalid SVG: {ex}')
ET.parse(OUT/'sitemap.xml')
require((OUT/'.nojekyll').exists(),'.nojekyll missing')
require(not (OUT/'CNAME').exists(),'Preview should not claim an existing domain')
archives=sorted(x.name for x in OUT.rglob('*') if x.is_file() and x.suffix.lower() in {'.zip','.tar','.tgz','.gz','.7z','.rar'})
require(not archives,f'archives must not be published: {archives}')
require(len(pages)==8,'Expected eight HTML entrypoints')
REGULAR=['index.html','speisekarte.html','kontakt.html','impressum.html','datenschutz.html','bildnachweise.html','barrierefreiheit.html']
for name in REGULAR:
 require(name in pages,f'missing page {name}')
 if name in pages:
  require('barrierefreiheit.html' in pages[name].refs,f'{name}: footer is missing the accessibility link')
acc=pages.get('barrierefreiheit.html')
if acc:
 text=(OUT/'barrierefreiheit.html').read_text()
 for anchor in ['anspruch','einordnung','hilfen','pruefung','grenzen','melden']:
  require(anchor in acc.ids,f'barrierefreiheit.html: missing section {anchor}')
 require('BFSG' in text,'barrierefreiheit.html: BFSG assessment missing')
 require('Kleinstunternehmen' in text,'barrierefreiheit.html: microenterprise exemption missing')
 require('Schlichtungsstelle' not in text or 'nicht' in text,'barrierefreiheit.html: public-body template must not be claimed')
 require('vollständig barrierefrei' not in text,'barrierefreiheit.html: unverified full-conformance claim')
# --- Startseiten-Links, WebPage-ID und Serverkonfiguration je Fassung ---
for name in REGULAR:
 if name not in pages: continue
 body=(OUT/name).read_text()
 if PRODUCTION:
  require('href="index.html"' not in body,f'{name}: production must link the home page as /')
  require('href="index.html#angebote"' not in body,f'{name}: production must link offers as /#angebote')
 else:
  require('href="/"' not in body,f'{name}: preview must keep the relative home link')
idpage=[i for g in pages['index.html'].json for i in g.get('@graph',[]) if i.get('@type')=='WebPage']
require(len(idpage)==1,'index.html: expected exactly one WebPage node')
if idpage:
 require(idpage[0]['@id']=='https://kaya-doener-himmelstadt.de/#webpage',
         f"index.html: WebPage @id should be .../#webpage, got {idpage[0]['@id']}")
 require(idpage[0]['url']=='https://kaya-doener-himmelstadt.de/',
         'index.html: WebPage url should be the site root')
manifest_start=json.loads((OUT/'site.webmanifest').read_text())['start_url']
require(manifest_start==('/' if PRODUCTION else './index.html'),f'unexpected manifest start_url {manifest_start}')

ht=OUT/'.htaccess'
if PRODUCTION:
 require(ht.is_file(),'production build must write .htaccess')
 if ht.is_file():
  h=ht.read_text()
  for needle,label in [
    ('AddDefaultCharset UTF-8','UTF-8 charset'),
    ('ErrorDocument 404 /404.html','custom 404 document'),
    ('DirectoryIndex index.html','directory index'),
    ('RewriteEngine On','rewrite engine'),
    ('%{HTTPS} !=on','http to https redirect'),
    ('X-Forwarded-Proto','proxy-terminated TLS check'),
    ('^www\\.','www to non-www redirect'),
    ('index\\.html[\\s?]','index.html to slash redirect'),
    ('R=301','permanent redirects')]:
   require(needle in h,f'.htaccess is missing {label}')
  require('<IfModule mod_rewrite.c>' in h,'.htaccess must guard rewrite rules with IfModule')
  require(h.count('[R=301')==3,f'.htaccess should define exactly three 301 rules, found {h.count("[R=301")}')
else:
 require(not ht.exists(),'preview must not ship an Apache configuration')

if errors:
 print('\n'.join(errors));sys.exit(1)
print(f'PASS ({"Hostinger production" if PRODUCTION else "GitHub Pages preview"}): {len(pages)} pages; all local links, fragments, images, font paths, SVG/XML/JSON, titles and {count} menu positions checked. No iframe or third-party image/font requests in initial HTML. No browser testing performed.')
