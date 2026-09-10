# KAYA Döner · Analyse und Übergabe

Stand: 10. September 2026. Untersucht wurden die öffentlich abrufbare Startseite, Impressum und Datenschutz sowie der ausgelieferte HTML-, CSS- und JavaScript-Quelltext. Die vom Auftraggeber bereitgestellten Logo- und Standortbilder wurden als Referenz verwendet. Ein visueller Browsertest war nicht Bestandteil der durchgeführten Prüfung.

## Was an der bestehenden Website auffiel

| Befund | Konsequenz im Relaunch |
| --- | --- |
| Die Navigation verteilt eine einzige Seite auf sieben Themen und wiederholt ähnliche Ziele. | Drei Hauptseiten; die Startseite konzentriert sich auf Speisekarte, Angebote, Telefon und Besuch. |
| Frische, Soßen, Erreichbarkeit und Speisenauswahl werden mehrfach sehr ähnlich erklärt. | Kürzere Texte mit klarer Aufgabe je Abschnitt. |
| Der Header verwendet eine einfache Textdarstellung mit Punkt statt des vorhandenen Unternehmenszeichens mit Olivenmotiv. | Ein zusammenhängendes, geometrisch gezeichnetes Logo-System auf Grundlage des Unternehmenszeichens. |
| Im HTML wird `hero-doener-v6.webp` vorgeladen, das tatsächlich verwendete Hero-Bild ist jedoch `hero-doener.png`. | Kein überflüssiges anderes Bild-Preload; das echte Titelbild erhält Priorität und passende responsive Dateien. |
| CSS, JavaScript, Favicons und einige Bildpfade beginnen mit `/`. | Relative Ressourcenpfade für die Vorschau innerhalb eines GitHub-Repository-Unterordners. |
| `4,9`, `80+` und drei Bewertungszitate stehen ohne belegten Aktualisierungsstand auf der Seite. | Direkter Link zu den tatsächlichen Google-Bewertungen; keine unbestätigte Sternezahl und keine übernommenen, nicht verifizierbaren Zitate. |
| Die Allergenzeile enthält eine fehlerhafte Dopplung („telefonisch unter telefonisch nachfragen“). Rezepturspezifische Angaben fehlen. | Verständlicher Kontakt-Hinweis; die fehlenden Zuordnungen sind weiterhin vom Betrieb zu liefern. |
| Standortkoordinaten und ein großes Einzugsgebiet stehen im Schema, ohne dass diese Details aus den übrigen Angaben zuverlässig belegbar sind. | Adresse und Kontaktdaten bleiben erhalten; unbestätigte Koordinaten und ein vermeintliches Liefergebiet werden nicht ausgegeben. |
| Datenschutzerklärung nennt Hostinger, obwohl zunächst GitHub Pages zur Vorschau eingesetzt werden soll. | Getrennte, erzeugbare Vorschau-/Produktionsfassungen des Hostingabschnitts. |

Die bisherige Seite war nicht in jeder Hinsicht schlecht: Impressum nach DDG, Telefonlinks, eine datenschutzgesteuerte Karte, Leseeinstellungen, strukturierte Daten und Favicons waren bereits vorhanden. Das Problem war vor allem die uneinheitliche Markenwirkung, die Wiederholung im Aufbau und einige technische beziehungsweise nicht belegte Angaben. Eine bestimmte „20.000-Euro-Wertigkeit“ lässt sich nicht objektiv zusichern; der Relaunch setzt den gewünschten Qualitätsanspruch durch Typografie, Layout, Bildauswahl und konsistente Bedienung um.

## Übernommene Betriebsdaten

| Angabe | Übernommener Stand |
| --- | --- |
| Name | KAYA Döner |
| Inhaber | Mahmoud Zakrieah |
| Rechtsform | Einzelunternehmen |
| Adresse | Rote Wiese 2, 97267 Himmelstadt |
| Telefon | 01590 1254030 |
| E-Mail | iammahmoud@outlook.de |
| Öffnungszeiten | Montag bis Sonntag 11:00–20:00 Uhr; Feiertage können abweichen |
| Angebot | 34 Speisekartenpositionen, sechs Soßen, drei Wochenangebotstage |
| Vor Ort | Innen-/Außenplätze, kostenlose Parkplätze, ebenerdiger Zugang, Kunden-Toilette, Abholung |

Alle 34 Speisekartenpositionen und ihre numerischen Preise wurden in derselben Reihenfolge mit dem alten HTML abgeglichen. Keine Preise wurden neu kalkuliert. „Auf Anfrage“ bleibt bei Baklava und Çay bestehen. Die separate Position „Falafeltasche“ bleibt wie in der Vorlage erhalten, obwohl sie sich möglicherweise mit „Falafel Döner“ überschneidet. Der Betrieb sollte diese Abgrenzung bei Gelegenheit erklären.

## Gestaltung und Funktionen

- Graphit, KAYA-Rot, Blatt-/Olivgrün und helles Papier als wiederkehrendes Farbsystem.
- Geometrische KAYA-Wortmarke, einheitliche A-Formen, zwei erkennbare Oliven mit Blättern; Schriftzug DÖNER in Pfade umgewandelt.
- Barlow Condensed für die markanten Überschriften, Manrope für Text und Bedienung; lokal gespeicherte Lizenzschriften.
- Fotogestützter Einstieg, eigenständiger Angebotsbereich, übersichtliche Speisekarte und ein tatsächliches Standortfoto.
- Telefon- und E-Mail-Links, Google Maps und Apple Karten, mobile Schnellzugriffe.
- Google-Karte mit ausdrücklicher Einwilligung, Widerruf und Berücksichtigung von Widerrufen in anderen geöffneten Tabs.
- Schriftgröße/Kontrast, Sprunglink, sichtbarer Tastaturfokus, reduzierte Bewegung und Druckansicht der Karte.
- Normale HTML-Inhalte und Kategorie-Anker funktionieren ohne JavaScript. Die optionalen Komfortfunktionen benötigen JavaScript.

## SEO und GEO

Jede Hauptseite hat einen eigenen Seitentitel, eine Beschreibung und eine klare Hauptüberschrift. Unternehmensdaten sind konsistent und werden zusätzlich als `Restaurant`, `WebSite` und `WebPage` beschrieben. Die vollständige Speisekarte ist als HTML lesbar und zusätzlich als `Menu` mit `MenuSection`, `MenuItem` und echten Preisen ausgezeichnet. Die FAQ ist sichtbar und enthält dieselben Antworten wie die strukturierten Daten. Für Unterseiten gibt es Brotkrumendaten.

Damit werden sowohl lokale Suchanfragen als auch die maschinelle Auswertung für Such- und KI-Antwortsysteme unterstützt. Es werden keine erfundenen Bewertungen, Keyword-Ortsseiten, Liefergebiete oder Rankingversprechen verwendet. Google weist darauf hin, dass für seine KI-Suchfunktionen dieselben grundlegenden SEO-Prinzipien gelten und keine speziellen Zusatzdateien erforderlich sind. FAQ-Markup garantiert keine hervorgehobene Darstellung.

Die Vorschau steht auf `noindex`. `--production` aktiviert die Indexierung der drei Hauptseiten und die Sitemap für die bekannte Domain. Impressum, Datenschutz, Bildnachweise und Fehlerseite bleiben nicht zur Indexierung vorgesehen. Das bestehende Social-Preview-Bild wurde unverändert als `og-kaya-doener.jpg` beibehalten.

## Vor dem produktiven Livegang zu bestätigen

1. **Preise, Angebote, Öffnungszeiten und Kontaktdaten:** vom Betreiber nochmals bestätigen. Die Übernahme von der alten Website beweist nicht, dass diese Angaben noch aktuell sind.
2. **Allergene und Zusatzstoffe:** tatsächliche Zuordnung je Gericht, Soße und gegebenenfalls Getränk anhand von Rezepturen und Lieferantendaten ergänzen. Eine pauschale Telefonnummer ersetzt nicht automatisch alle Informationspflichten. Mündliche Allergeninformationen setzen nach § 4 LMIDV unter anderem eine verfügbare schriftliche/elektronische Dokumentation und entsprechende Hinweise voraus. Bei telefonischen Fernabsatzbestellungen sind erforderliche Informationen vor Vertragsschluss zu berücksichtigen.
3. **Getränkepfand:** klären, ob und in welcher Höhe bei den angebotenen Verpackungen Pfand anfällt. In den Ausgangsdaten war das nicht ausgewiesen; es wurde kein Betrag erfunden.
4. **Produktbezeichnung:** anhand der tatsächlichen Zusammensetzung klären, welche Fleischprodukte als Döner beziehungsweise Drehspieß angeboten werden dürfen. Die bisherige Benennung wurde übernommen, nicht anhand von Lieferantennachweisen überprüft.
5. **Impressum:** vorhandene Umsatzsteuer-Identifikationsnummer oder Wirtschafts-Identifikationsnummer sowie gegebenenfalls Register-/Zulassungsangaben ergänzen, soweit die Voraussetzungen nach § 5 DDG vorliegen. Keine private Steuernummer veröffentlichen.
6. **Hosting:** beim tatsächlichen Wechsel zu Hostinger den Produktionsmodus nutzen; Vertragspartner, Auftragsverarbeitung, eingesetzte Subdienste und Aufbewahrungsregeln mit dem realen Hostingvertrag abgleichen.
7. **Eigene Bilder:** Nutzungsrechte am bereitgestellten Standortfoto und am Ausgangslogo müssen beim Betreiber vorliegen. Das Foto wurde durch den Auftraggeber bereitgestellt; eine eigenständige Rechtekette ist nicht dokumentiert. Die neuen Foodfotos sind dagegen mit Unsplash-Quellen dokumentiert.
8. **Browser-Freigabe:** nach GitHub-Veröffentlichung die tatsächliche mobile und Desktop-Darstellung prüfen. Bei der späteren Hauptdomain zusätzlich HTTPS, Weiterleitungen, Search Console und öffentliche Erreichbarkeit prüfen.

Die Rechtstexte sind an die tatsächliche technische Umsetzung und öffentlich geprüfte Quellen angepasst. Eine verbindliche anwaltliche Prüfung der gesamten Unternehmenssituation oder der Lebensmittelkennzeichnung ist damit nicht erfolgt.

## Durchgeführte Prüfung

- Sieben HTML-Seiten: lokale Links, Fragmente, Bilder, Schriftpfade, Dateiexistenz, SVG/XML/JSON, genau eine H1 pro Seite und Metadaten geprüft.
- Speisekarte: 34 Positionen, Preisübernahme aus der Vorlage und Übereinstimmung mit den strukturierten Daten geprüft.
- JavaScript-Syntax geprüft.
- Neun Ausführungstests mit einem In-Memory-DOM: keine Karte vor Einwilligung, einmaliges Laden, Widerruf, Ablehnen/Dialogschließen, gültige/abgelaufene/fehlerhafte Einwilligungen, gesperrter Browser-Speicher, Widerruf in einem anderen Tab, Berliner Sommer-/Winterzeit an Öffnungsgrenzen, mobile Menüsteuerung und Leseeinstellungen.
- Hauptfarbkombinationen rechnerisch geprüft: Weiß auf KAYA-Rot 5,20:1, Fließtextgrau auf Papier 5,43:1, Olivtext auf Papier 5,25:1 und helles Rot auf Graphit 5,90:1. Das ist keine vollständige WCAG-Konformitätsprüfung.
- Verwendete Bilddateien vollständig decodiert; eine zunächst unvollständige Falafel-Datei wurde vor Einbau ersetzt.
- Kein Browser-/Screenshot-/End-to-End-Test. Keine gemessenen Lighthouse-Scores oder Core Web Vitals. Responsive Regeln und Schriftbreiten wurden im Quelltext geprüft, nicht durch eine gerenderte Browseransicht bestätigt.

## Quellen

- [Bestehende Website und Speisekarte](https://kaya-doener-himmelstadt.de/)
- [Bestehendes Impressum](https://kaya-doener-himmelstadt.de/impressum.html)
- [Bestehende Datenschutzerklärung](https://kaya-doener-himmelstadt.de/datenschutz.html)
- [§ 5 DDG – Anbieterinformationen](https://www.gesetze-im-internet.de/ddg/__5.html)
- [§ 25 TDDDG – Endeinrichtungen](https://www.gesetze-im-internet.de/ttdsg/__25.html)
- [§ 4 LMIDV – nicht vorverpackte Lebensmittel](https://www.gesetze-im-internet.de/lmidv/__4.html)
- [§ 13 PAngV – Gaststätten](https://www.gesetze-im-internet.de/pangv_2022/__13.html)
- [EU-Verordnung 2024/3228 – Ende der OS-Plattform](https://eur-lex.europa.eu/eli/reg/2024/3228/oj)
- [GitHub Pages – Datenverarbeitung](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection)
- [GitHub-Datenschutzerklärung](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [Hostinger – Datenschutz](https://www.hostinger.com/legal/privacy-policy)
- [Hostinger – Vertragspartner](https://www.hostinger.com/legal/universal-terms-of-service-agreement)
- [BayLDA – Kontaktdaten](https://www.lda.bayern.de/de/kontakt.html)
- [Google – KI-Suchfunktionen und Websites](https://developers.google.com/search/docs/appearance/ai-features)
- [Unsplash-Lizenz](https://unsplash.com/license)
