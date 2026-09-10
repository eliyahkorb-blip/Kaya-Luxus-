/* Executes the actual enhancement script against a small in-memory DOM.
   Covers consent lifecycle and time-zone boundaries; not a browser/visual test. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const file = path.join(root, fs.existsSync(path.join(root, 'dist')) ? 'dist/assets/site.js' : 'assets/site.js');
const code = fs.readFileSync(file, 'utf8');
function setup({saved, failStorage=false, now='2026-09-10T09:00:00Z'}={}) {
  const values = new Map(saved ? [['kaya_maps_v2',saved]] : []);
  const fixed = new Date(now).getTime();
  const context = {focus:null, created:[], intervals:[]};
  class Element {
    constructor(name) {this.name=name;this.hidden=false;this.dataset={};this.attrs={};this.handlers={};this.children=[];this.style={setProperty(){}};this.classes=new Set();this.classList={toggle:(n,on)=>{if(on)this.classes.add(n);else this.classes.delete(n);}};this.links=[];}
    setAttribute(k,v){this.attrs[k]=v;}
    addEventListener(k,f){this.handlers[k]=f;}
    querySelector(s){return s==='a'?this.links[0]||null:null;}
    querySelectorAll(s){return s.includes('a')?this.links:[];}
    append(el){el.parent=this;this.children.push(el);}
    remove(){if(this.parent)this.parent.children=this.parent.children.filter(e=>e!==this);}
    focus(){context.focus=this;doc.activeElement=this;}
    showModal(){this.open=true;}
    close(){this.open=false;this.handlers.close?.();}
    click(){this.handlers.click?.({});}
  }
  const ids=['nav-toggle','mobile-nav','font-level','font-minus','font-plus','contrast-toggle','reading-reset','map-stage','map-placeholder','privacy-dialog','map-revoke','privacy-accept','privacy-decline','privacy-close','print-menu'];
  const els=Object.fromEntries(ids.map(id=>[id,new Element(id)]));
  const main=new Element('main'),footer=new Element('footer'),status=new Element('opening'),consentStatus=new Element('consent'),load=new Element('load'),settings=new Element('settings');
  const navLinks=[new Element('start'),new Element('menu'),new Element('call')];
  els['mobile-nav'].links=navLinks;
  const doc={documentElement:new Element('html'),body:new Element('body'),handlers:{},activeElement:null,
    querySelector(s){return s==='main'?main:s==='.site-footer'?footer:s.startsWith('#')?els[s.slice(1)]||null:null;},
    querySelectorAll(s){return s==='[data-opening-state]'?[status]:s==='[data-consent-status]'?[consentStatus]:s==='[data-load-map]'?[load]:s==='[data-privacy-settings]'?[settings]:[];},
    createElement(n){const el=new Element(n);context.created.push(el);return el;},
    addEventListener(k,f){this.handlers[k]=f;}
  };
  const win={handlers:{},addEventListener(k,f){this.handlers[k]=f;},print(){context.printed=true;}};
  class FixedDate extends Date {constructor(...args){super(...(args.length?args:[fixed]));}static now(){return fixed;}}
  const media={addEventListener(k,f){this.change=f;}};
  const storage={getItem(k){if(failStorage)throw new Error('blocked');return values.get(k)||null;},setItem(k,v){if(failStorage)throw new Error('blocked');values.set(k,v);},removeItem(k){if(failStorage)throw new Error('blocked');values.delete(k);}};
  vm.runInNewContext(code,{document:doc,window:win,localStorage:storage,Date:FixedDate,Intl,location:{href:''},matchMedia:()=>media,setInterval:f=>context.intervals.push(f)});
  return {els,main,status,load,settings,values,doc,win,context,media,consentStatus};
}
let tests=0;
function test(name,f){f();tests++;console.log('PASS '+name);}
test('No Google iframe before explicit consent',()=>{const a=setup();assert.equal(a.context.created.filter(x=>x.name==='iframe').length,0);assert.equal(a.els['map-stage'].children.length,0);});
test('Consent loads one map; revocation removes it',()=>{const a=setup();a.load.click();a.load.click();assert.equal(a.els['map-stage'].children.length,1);assert.match(a.els['map-stage'].children[0].src,/^https:\/\/www.google.com\/maps/);a.els['map-revoke'].click();assert.equal(a.els['map-stage'].children.length,0);assert.equal(JSON.parse(a.values.get('kaya_maps_v2')).choice,'no');});
test('Decline is functional and closes the dialog',()=>{const a=setup();a.settings.click();assert.equal(a.els['privacy-dialog'].open,true);a.els['privacy-decline'].click();assert.equal(a.els['privacy-dialog'].open,false);assert.equal(a.els['map-stage'].children.length,0);assert.equal(a.context.focus,a.settings);});
test('Valid choice restores; old, malformed and future choices do not',()=>{const now=Date.parse('2026-09-10T09:00:00Z');for(const [raw,expected] of [[JSON.stringify({choice:'yes',at:now-1000}),1],[JSON.stringify({choice:'yes',at:now-181*86400000}),0],[JSON.stringify({choice:'yes',at:now+5000}),0],['broken',0]])assert.equal(setup({saved:raw}).els['map-stage'].children.length,expected);});
test('Unavailable browser storage leaves controls usable',()=>{const a=setup({failStorage:true});a.load.click();assert.equal(a.els['map-stage'].children.length,1);a.els['font-plus'].click();assert.equal(a.els['font-level'].textContent,'113 %');a.els['map-revoke'].click();assert.equal(a.els['map-stage'].children.length,0);});
test('Revocation or clearing storage in another tab removes the map',()=>{const a=setup();a.load.click();a.win.handlers.storage({key:'kaya_maps_v2',newValue:JSON.stringify({choice:'no',at:Date.parse('2026-09-10T09:00:00Z')})});assert.equal(a.els['map-stage'].children.length,0);a.load.click();a.win.handlers.storage({key:null});assert.equal(a.els['map-stage'].children.length,0);});
test('Berlin opening boundaries include winter and summer time',()=>{for(const [now,expected] of [['2026-01-10T09:59:00Z','heute ab 11'],['2026-01-10T10:00:00Z','jetzt geöffnet'],['2026-01-10T19:00:00Z','morgen ab 11'],['2026-07-10T08:59:00Z','heute ab 11'],['2026-07-10T09:00:00Z','jetzt geöffnet'],['2026-07-10T18:00:00Z','morgen ab 11']])assert.ok(setup({now}).status.textContent.includes(expected),now);});
test('Mobile navigation opens, Escape restores, desktop resize resets',()=>{const a=setup();a.els['nav-toggle'].click();assert.equal(a.els['nav-toggle'].attrs['aria-expanded'],'true');assert.equal(a.main.inert,true);a.doc.handlers.keydown({key:'Escape'});assert.equal(a.main.inert,false);assert.equal(a.context.focus,a.els['nav-toggle']);a.els['nav-toggle'].click();a.media.change({matches:true});assert.equal(a.main.inert,false);});
test('Reading controls respect bounds and reset',()=>{const a=setup();for(let i=0;i<5;i++)a.els['font-plus'].click();assert.equal(a.els['font-level'].textContent,'125 %');assert.equal(a.els['font-plus'].disabled,true);a.els['contrast-toggle'].click();assert.equal(a.els['contrast-toggle'].attrs['aria-pressed'],'true');a.els['reading-reset'].click();assert.equal(a.els['font-level'].textContent,'100 %');assert.equal(a.els['contrast-toggle'].attrs['aria-pressed'],'false');});
test('Enlarged reading size marks the document for reflow rules',()=>{const a=setup();assert.equal(a.doc.documentElement.classes.has('text-scaled'),false,'not set at 100 %');a.els['font-plus'].click();assert.equal(a.doc.documentElement.classes.has('text-scaled'),true,'set above 100 %');a.els['font-plus'].click();assert.equal(a.doc.documentElement.classes.has('text-scaled'),true,'still set at 125 %');a.els['reading-reset'].click();assert.equal(a.doc.documentElement.classes.has('text-scaled'),false,'removed after reset');});
console.log(`${tests} source-level interaction tests passed. No browser/visual testing performed.`);
