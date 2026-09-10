# KAYA Döner · Website-Relaunch

Das Paket ist direkt für die Vorschau auf GitHub Pages vorbereitet. Es benötigt kein npm, kein React, keinen Server und keinen Build-Schritt. `index.html` liegt nach dem Entpacken direkt im Hauptverzeichnis der ZIP.

## Auf GitHub ansehen

1. ZIP vollständig entpacken lassen. Den **Inhalt** in das gewünschte Repository legen, sodass `index.html`, `assets/` und die weiteren HTML-Dateien direkt im Repository-Hauptverzeichnis liegen.
2. In GitHub unter **Settings → Pages → Build and deployment** die Veröffentlichung **Deploy from a branch**, Branch **main**, Ordner **/(root)** auswählen.
3. Nach dem GitHub-Deployment den angezeigten `github.io`-Link öffnen.

Die Dateien funktionieren auch in einem GitHub-Projektpfad wie `https://NAME.github.io/REPOSITORY/`. Die ZIP enthält bewusst keine `CNAME`-Datei; die bestehende Hauptdomain wird durch dieses Paket nicht umgestellt.

## Diesen Auftrag kannst du Claude geben

> Entpacke die beigefügte KAYA-Döner-ZIP vollständig. Lege ihren Inhalt direkt in das Hauptverzeichnis dieses Repositorys, sodass index.html und assets/ dort liegen, nicht in einem zusätzlichen ZIP- oder Projekt-Unterordner. Es handelt sich um eine fertige statische Website; installiere kein Framework und verändere keine Gestaltung, Texte oder Preise. Erhalte .nojekyll. Richte die Vorschau auf GitHub Pages aus main und /(root) ein, soweit du Zugriff auf diese Einstellung hast. Setze keine Custom Domain und lege keine CNAME-Datei an. Erhalte den Vorschau-Modus mit noindex. Prüfe interne Pfade und, falls Python und Node verfügbar sind, führe python tools/verify.py sowie node tools/verify-behavior.cjs aus. Nimm bei einem bestehenden Repository zuerst eine Sicherung der zu ersetzenden Dateien vor und entferne keine sachfremden Dateien. Gib mir anschließend den GitHub-Pages-Vorschaulink.

## Enthaltene Seiten

| Datei | Inhalt |
| --- | --- |
| `index.html` | Einstieg, Auswahl, Wochenangebote, KAYA-Standort, häufige Fragen |
| `speisekarte.html` | 34 Positionen, alle übernommenen Preise, sechs Soßen, Druckansicht |
| `kontakt.html` | Telefon, E-Mail, Öffnungszeiten, Anfahrt, optionale Google-Karte |
| `impressum.html` | Übernommene Anbieterangaben in neuer Gestaltung |
| `datenschutz.html` | Erklärung passend zur GitHub-Pages-Vorschau |
| `bildnachweise.html` | Fotografen, Bild- und Schriftlizenzen |
| `barrierefreiheit.html` | Bedienhilfen, durchgeführte Prüfungen, bekannte Einschränkungen, BFSG-Einordnung |
| `404.html` | Eigenständige Fehlerseite |

## Logo-Dateien

In `assets/brand/` liegen 16 SVG-Varianten und jeweils ein transparentes PNG:

- `horizontal`: KAYA und DÖNER nebeneinander, etwa für Header und Signaturen.
- `stacked`: kompakte Anordnung, etwa für Profile und Drucksachen.
- `wordmark`: KAYA-Wortmarke mit Olivenzweig.
- `symbol`: A mit Olivenzweig für kleine Anwendungen.

Die Endungen bedeuten: `dark` für helle Hintergründe, `light` für dunkle Hintergründe, `black` und `white` für einfarbige Anwendungen. **Die SVGs enthalten nur Pfade und Formen; es muss dafür keine Schrift installiert sein.** PNGs haben einen transparenten Hintergrund. Für Druck und Skalierung vorzugsweise SVG verwenden.

Eine Gesamtansicht liegt unter `unterlagen/KAYA-Logo-Uebersicht.png`. Die Regeln stehen in `unterlagen/Marke-und-Bilder.md`.

## Vorschau und späterer Livegang

**Vorschau ist absichtlich `noindex`.** So soll der Teststand nicht als zweite KAYA-Website in Suchmaschinen erscheinen. Das ist keine Zugangssperre: Wer den Link kennt, kann eine öffentliche GitHub-Pages-Seite sehen.

Nach der inhaltlichen Freigabe kann die Livefassung für die bestehende Hostinger-Hauptdomain erzeugt werden:

```bash
python tools/build.py --production
python tools/verify.py
```

Dieser Schritt aktiviert die Indexierung der drei Hauptseiten, erstellt die produktive Sitemap und ändert den Hostingabschnitt der Datenschutzerklärung von GitHub Pages auf Hostinger. Die Produktionsdomain bleibt `https://kaya-doener-himmelstadt.de/`.

Anschließend die öffentlichen HTML-Dateien, `assets/`, Favicons, `site.webmanifest`, `robots.txt`, `sitemap.xml`, `og-kaya-doener.jpg` und `.nojekyll` nach Hostinger hochladen. `tools/` und `unterlagen/` müssen nicht auf den produktiven Webserver. Eine bestehende Serverkonfiguration, etwa `.htaccess`, vorher sichern und auf Kompatibilität mit den HTML-Routen prüfen. HTTPS und Weiterleitung auf die Hauptdomain im Hosting einrichten beziehungsweise beibehalten.

**Nicht einfach die ungeprüfte Vorschau auf die Hauptdomain kopieren:** Vor dem Livegang sind die in `unterlagen/Analyse-und-Uebergabe.md` aufgeführten Betriebsangaben zu bestätigen. Das betrifft insbesondere Rezeptur-/Allergenangaben, Zusatzstoffe, Pfand und gegebenenfalls vorhandene Identifikationsnummern.

Zur Vorschaufassung zurück:

```bash
python tools/build.py
```

## Inhalte ändern

- **Gerichte, Preise, Wochenangebote:** `tools/menu.json` bearbeiten, dann `python tools/build.py` für die Vorschau oder mit `--production` für Hostinger ausführen. Damit bleiben HTML und strukturierte Speisekarte identisch.
- **Texte, Kontaktdaten, Öffnungszeiten:** `tools/build.py` enthält die Vorlagen. Nach einer Änderung neu erzeugen. Bei veränderten Öffnungszeiten auch die Berechnung in `assets/site.js` anpassen.
- **Farben, Abstände, Schriftgrößen:** `assets/site.css`.
- **Bilder ersetzen:** Hinweise und Dateinamen in `unterlagen/Marke-und-Bilder.md`. Bildtexte, Kennzeichnung und Bildnachweise passend mitändern.
- Direkte Änderungen an erzeugten HTML-Dateien sind möglich, werden bei einem erneuten Build aber überschrieben.

## Prüfung

```bash
python tools/verify.py
node --check assets/site.js
node tools/verify-behavior.cjs
```

### Hostinger-Fassung erzeugen

Im Repository liegt bewusst **keine** ZIP-Datei: Alles hier wird über GitHub Pages
öffentlich ausgeliefert, und ein Archiv im Hauptverzeichnis wäre unter der Vorschau-URL
herunterladbar. `tools/verify.py` bricht deshalb ab, sobald ein Archiv im Ausgabeordner
liegt, und `.gitignore` schließt `*.zip` aus.

```bash
python tools/build.py --production   # Indexierung, produktive Sitemap, Hostinger-Datenschutz
python tools/verify.py
# die oeffentlichen Dateien ausserhalb des Repositorys packen:
#   *.html, assets/, Favicons, site.webmanifest, robots.txt, sitemap.xml,
#   og-kaya-doener.jpg, .nojekyll
# ohne tools/, unterlagen/ und assets/images/kaya-standort-original.jpg
python tools/build.py                # Vorschau wiederherstellen (noindex)
```

Die Prüfungen kontrollieren Dateien, Links, Anker, strukturierte Daten sowie wichtige JavaScript-Funktionen. Sie ersetzen keinen Browserdurchgang. Ein visueller oder Live-Browsertest und Messwerte wie Lighthouse/Core Web Vitals wurden hier nicht durchgeführt. Prüfe die bereitgestellte Vorschau vor Freigabe auf deinem iPad und einem Smartphone; besonders Navigation, lange Speisekarte, Telefonlinks und Karteneinwilligung.

Nach dem Livegang: Hauptdomain in Google Search Console prüfen, Sitemap einreichen und Adresse, Telefon, Öffnungszeiten sowie Speisekarten-Link im Google-Unternehmensprofil abgleichen.
