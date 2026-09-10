# KAYA · Marke und Bilder

## Logo-Konstruktion

Das bisherige Zeichen wurde als klare zweidimensionale Marke neu aufgebaut. Erhalten bleiben der kantige KAYA-Schriftzug, das kleine Dreieck im ersten A, der rote DÖNER-Schriftzug und das Olivenmotiv am letzten A. Die 3D-/Metalloptik des alten Bildes wird durch saubere, skalierbare Konturen ersetzt.

Die KAYA-Buchstaben sind eigene geometrische Vektorpfade. Beide A basieren auf demselben Umriss, um 252 Einheiten versetzt. Die Buchstabenhöhe beträgt 120 Konstruktionseinheiten, die senkrechten Grundstämme 22 Einheiten. Die A-Flanken sind achsensymmetrisch. Der Zweig hat zwei längliche Oliven und zwei Blätter. Unterschiedliche optische Abstände gleichen die offenen Diagonalen von A und Y aus; deshalb wäre ein mathematisch identischer Abstand zwischen allen Buchstaben typografisch nicht sinnvoll.

Der DÖNER-Schriftzug wurde aus Barlow Condensed ExtraBold in Vektorpfade umgewandelt. Keine SVG-Datei ist von einer externen Schriftdatei abhängig.

## Varianten und Anwendung

| Variante | Einsatz |
| --- | --- |
| Horizontal, farbig | Website-Header, Signatur, längliche Beschilderung |
| Kompakt/stacked, farbig | Profile, quadratische Flächen, Flyer |
| KAYA-Wortmarke | Große Markenflächen und reduzierte Anwendungen |
| A mit Olivenzweig | Favicon, App-Symbol, kleine Markenkennzeichnung |
| Schwarz/Weiß | Einfarbiger Druck, Stempel, helle oder dunkle Flächen |

- Schutzraum rund um das Hauptlogo: mindestens eine senkrechte Stammstärke der KAYA-Buchstaben, bei kleinen Anwendungen lieber mehr.
- Richtwerte zur Lesbarkeit: Hauptlogo ab etwa 180 px Breite, kompakte Variante ab etwa 100 px, Bildmarke ab 32 px. Die kleinen Favicons sind gesonderte Rasterexporte.
- Nie verzerren, schrägziehen oder einzelne Logo-Elemente verschieben. SVG proportional skalieren.
- Für sehr kleine Stempel oder Gravuren die Bildmarke oder einfarbige Wortmarke verwenden; die Olivenzweigdetails können materialbedingt vereinfacht werden müssen.
- Die PNGs sind transparent. Für weiße PNGs einen dunklen Hintergrund verwenden; in einer weißen Vorschau wirken sie sonst leer.

## Farben und Schriften

| Verwendung | Farbe |
| --- | --- |
| Graphit | `#1C1D19` |
| KAYA-Rot | `#C93627` |
| Helles Rot auf dunklen Flächen | `#FF6751` |
| Olive im Logo | `#728243` |
| Blattgrün auf dunklen Flächen | `#A3B85C` |
| Olivfarbener Lesetext auf hellen Flächen | `#596C2E` |
| Helles Papier | `#F6F3EB` |

Überschriften: Barlow Condensed Bold/ExtraBold. Fließtext: Manrope Regular bis Bold. Die WOFF-Dateien liegen unter `assets/fonts/`; die SIL-OFL-Lizenztexte liegen daneben. Die gesamte Website lädt ihre Schriften lokal.

## Bildquellen

| Verwendete Datei | Fotograf | Motiv / Quelle |
| --- | --- | --- |
| `food-hero-640.webp`, `food-hero-1200.webp` | Anima Visual | [Kebab-Foto](https://unsplash.com/photos/jhTzMj5aJQk) |
| `food-falafel-640.webp`, `food-falafel-1200.webp` | Ludovic Avice | [Falafel-Foto](https://unsplash.com/photos/SZGNQxd0HfI) |
| `food-wrap-640.webp`, `food-wrap-1200.webp` | Eugene Kucheruk | [Wrap-Foto](https://unsplash.com/photos/TvcjBk5y0wU) |
| `kaya-standort-original.jpg` | Durch den Auftraggeber bereitgestellt | Originaler Screenshot des KAYA-Standorts; Bildausschnitt erfolgt ausschließlich über CSS |
| `og-kaya-doener.jpg` | Bestehender Website-Bestand | Bisheriges Social-Preview-Bild unverändert übernommen |

Die drei Foodfotos sind kostenlose reguläre Unsplash-Fotos; es wurden keine Unsplash+-Bilder gewählt. Grundlage ist die [Unsplash-Lizenz](https://unsplash.com/license), die auch kommerzielle Verwendung gestattet. „Lizenzfrei“ bedeutet hier nicht „ohne Lizenzbedingungen“ oder „gemeinfrei“. Die Quellen und Downloadziele wurden über offizielle Unsplash-Ergebnisse geprüft. Die einzelnen Fotodetailseiten waren im Recherchezugriff nicht vollständig darstellbar. Genauere Herkunftsdaten und dieser Prüfungsumfang stehen in `Bildquellen.json`.

Die Bilder werden lokal ausgeliefert. Es gibt keine Unsplash-Hotlinks und keinen externen Font-Aufruf. Die Foodfotos werden ausdrücklich als Symbolbilder gekennzeichnet, da sie nicht aus der KAYA-Küche stammen.

## Späteres Fotoshooting

Für den Austausch reichen zunächst diese Motive:

1. Ein tatsächlicher KAYA-Döner im Brot und ein Dürüm: großes appetitliches Hauptmotiv, Platz um das Essen für verschiedene Ausschnitte. Querformat mit ausreichender Höhe.
2. Eine echte Falafel-/Halloumi-Variante: Teller oder Brot nah aufgenommen, klare Zutaten, natürliches Licht.
3. Ein gutes Außenfoto mit sichtbarer Beschilderung sowie ein ruhiges Innenfoto. Möglichst ohne erkennbare Gäste.

Die beiden vorhandenen WebP-Größen pro Motiv können durch 640 px und 1200 px breite Dateien mit denselben Namen ersetzt werden. Bei anderen Seitenverhältnissen die HTML-Angaben für Breite/Höhe und gegebenenfalls `object-position` im CSS anpassen. Danach Alttexte, Symbolbild-Hinweise und Bildnachweise ändern. Das Standortfoto ist derzeit ein unveränderter Screenshot mit einem passenden CSS-Ausschnitt; bei einem normalen neuen Foto die Klasse `store-photo` beziehungsweise deren besondere Ausschnittregeln entfernen.

Das aktuelle Hero-Foto zeigt Kebab im gerollten Fladenbrot mit Pommes und ist ausdrücklich keine genaue Abbildung des KAYA-Döners. Die stärkste weitere Qualitätsverbesserung sind deshalb eigene authentische Produktbilder.
