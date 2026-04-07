# FAQ-IMPLEMENTATION.md

## Zweck

Diese Datei beschreibt die technische und gestalterische Umsetzung der
FAQ-Sektion für `buhlke.de`.

Sie ergänzt `FAQ.md`:
- `FAQ.md` ist die inhaltliche Quelle
- `FAQ-IMPLEMENTATION.md` beschreibt Layout, Verhalten, Semantik,
  Barrierefreiheit und technische Anforderungen

Wenn Inhalte und Umsetzung kollidieren, gilt:
1. juristische und inhaltliche Richtigkeit aus `FAQ.md`
2. danach die Umsetzungsregeln aus dieser Datei

---

## Zielbild

Die FAQ-Sektion soll:
- direkt unter den PDF-Downloads stehen
- hochwertig, ruhig und seriös wirken
- konkrete Nutzerfragen beantworten
- mobil und auf Desktop sehr gut lesbar sein
- barrierearm funktionieren
- für Suchmaschinen und KI-Systeme gut erfassbar sein
- ohne übertriebene Werbeoptik auskommen

Die FAQ ist keine dekorative SEO-Sektion, sondern ein echter
Orientierungsbereich mit klarer Nutzerführung.

---

## Einbindung in die Seite

Reihenfolge im unteren Seitenbereich:

1. PDF-Downloads
2. FAQ-Sektion
3. Kontakt-/Notfall-CTA
4. Footer

Zwischen den Abschnitten ausreichend Abstand vorsehen, damit die Seite
luftig und hochwertig bleibt.

Empfohlene vertikale Abstände:
- Downloads zu FAQ: 64 bis 96 px
- FAQ-Überschrift zu Einleitung: 16 bis 24 px
- Einleitung zu erster FAQ-Gruppe: 24 bis 32 px
- zwischen FAQ-Gruppen: 32 bis 48 px
- FAQ zu CTA: 48 bis 72 px

Auf Mobile dürfen die Abstände reduziert werden, aber nicht eng wirken.

---

## Layout

### Grundprinzip
- einspaltiges Layout
- keine Tabs
- keine Kartenmatrix
- kein Slider
- keine visuelle Überfrachtung

### Inhaltsbreite
- orientiert sich am bestehenden Content-Raster der Website
- maximale Lesebreite für Fließtext ca. 760 bis 860 px
- FAQ-Fragen dürfen etwas breiter laufen, Antworten sollten angenehm
  lesbar bleiben

### Optische Gestaltung
Die FAQ-Sektion soll sich an der bestehenden Kanzleiästhetik
orientieren:
- heller Hintergrund
- klare dunkle Typografie
- viel Weißraum
- dezente Linien statt schwerer Boxen
- optional Akzentfarbe in derselben Tonalität wie die bestehende Website
- keine aggressive Highlight-Optik
- keine bunten Icons
- keine Schattenlandschaften

### Visuelle Struktur
- H2 für die FAQ-Gesamtüberschrift
- kurzer Einleitungstext
- 3 thematische Gruppen mit jeweils kleiner Zwischenüberschrift
- darunter Accordion-Items
- abschließend ruhiger Kontaktblock

---

## Inhaltliche Struktur

Die FAQ soll in exakt diese drei Gruppen gegliedert werden:

### Gruppe 1
Akute strafrechtliche Situationen

Items:
1. Was sollte ich tun, wenn es zu einer Festnahme, Durchsuchung oder
   Beschlagnahme kommt?
2. Wann sollte ich die Notfallnummer nutzen?
3. Warum ist frühe Akteneinsicht im Strafrecht so wichtig?

### Gruppe 2
Erstkontakt und Unterlagen

Items:
4. Welche Unterlagen sollte ich zum Erstkontakt bereithalten?
5. Wofür ist der Mandantenfragebogen hilfreich?

### Gruppe 3
Jugendstrafrecht und Verkehrsrecht

Items:
6. Unterstützt die Kanzlei auch Eltern und Familien im
   Jugendstrafrecht?
7. Wobei hilft die Kanzlei im Verkehrsrecht konkret?

Die Reihenfolge der Fragen darf nicht verändert werden.

---

## Accordion-Verhalten

### Standardzustand
- alle FAQ-Items initial geschlossen
- keine Antwort standardmäßig geöffnet

### Interaktion
- Klick auf eine Frage öffnet die zugehörige Antwort
- erneuter Klick schließt dieselbe Antwort wieder
- mehrere Antworten dürfen gleichzeitig geöffnet sein
- kein erzwungenes "nur ein offenes Item"

### Animation
- optional einfache, ruhige Expand/Collapse-Animation
- kurze Dauer, unaufdringlich
- keine verspielten Effekte

### Sichtbarkeit
- Fragezeile jederzeit sichtbar
- Antwort vollständig lesbar, sobald geöffnet
- keine abgeschnittenen Texte
- keine "Mehr anzeigen"-Unterstufen innerhalb der Antwort

### Trigger
- die gesamte Fragezeile sollte klickbar sein
- rechts ein schlichtes Plus-/Minus-Symbol oder Chevron
- Symbol soll den Zustand unterstützen, nicht dominieren

---

## Semantik und Barrierefreiheit

### Anforderungen
Die FAQ muss barrierearm umgesetzt werden.

### Grundregeln
- Trigger als echte interaktive Elemente umsetzen
- Frage nicht nur als `div` mit Klick-Handler bauen
- Tastaturbedienung muss möglich sein
- Screenreader-Zustände korrekt ausgeben
- Fokuszustände sichtbar gestalten

### Mindestanforderungen
- jeder Trigger mit eindeutigem Text
- `aria-expanded` korrekt setzen
- Trigger und Antwortbereich logisch verknüpfen
- Fokusrahmen oder gleichwertiger Fokusindikator
- sinnvolle Überschriftenhierarchie

### Empfohlene Struktur
- H2: Häufige Fragen
- Einleitungsabsatz
- H3 je Gruppe
- darunter FAQ-Items mit Trigger und Antwortbereich

### Wichtiger Hinweis
Antworten sollen direkt im DOM vorhanden sein und nicht erst nach Klick
extern geladen werden.

---

## SEO- und KI-Anforderungen

### Sichtbarer Content
Die Antworten müssen im Seitenquelltext bzw. DOM vorhanden sein.
Kein nachgelagerter API-Fetch nur beim Öffnen.

### Suchintention
Die Inhalte sollen reale Nutzerfragen beantworten, insbesondere zu:
- Strafrecht
- Jugendstrafrecht
- Verkehrsrecht
- Berlin
- Berlin-Charlottenburg
- Festnahme
- Durchsuchung
- Beschlagnahme
- Ermittlungsverfahren
- Akteneinsicht
- Bußgeld
- Fahrverbot
- Verkehrsunfall
- Mandantenfragebogen
- Notfallnummer

### Stilvorgaben
- keine Keyword-Stapel
- keine künstlich aufgeblähten Antworten
- kein versteckter Text
- keine abweichenden Formulierungen nur für Bots

### Crawler-Freundlichkeit
- Accordion-Inhalt muss auch geschlossen im DOM existieren
- keine Inhalte in Canvas, Bild oder reinem Client-Rendering verstecken
- semantische Überschriften verwenden

---

## Kontakt-/Notfall-CTA unter der FAQ

Direkt unterhalb der FAQ soll ein kompakter Kontaktblock folgen.

### Ziel
Nutzer, die nach der FAQ handeln möchten, sollen ohne Reibung Kontakt
aufnehmen können.

### Inhalt
- Überschrift
- 1 kurzer Begleittext
- reguläre Kontaktwege
- Notfallnummer
- ein klarer Link oder Button zur Kontaktaufnahme

### Empfohlene Reihenfolge
1. Überschrift
2. Begleittext
3. Telefon
4. Notfallnummer
5. E-Mail
6. CTA-Link oder Button

### Textvorgaben
Überschrift:
- Sie benötigen anwaltliche Unterstützung?

Begleittext:
- Nehmen Sie Kontakt zur Kanzlei Buhlke in Berlin-Charlottenburg auf.
  In dringenden strafrechtlichen Situationen steht zusätzlich eine
  Notfallnummer zur Verfügung.

Kontaktdaten:
- Telefon: +49 (0)30 / 28 47 10 22
- Notfallnummer: +49 (0)160 92 33 60 66
- E-Mail: kanzlei@buhlke.de

CTA:
- Kontakt aufnehmen

### Gestaltung
- optisch ruhiger Abschluss, kein harter Werbeblock
- darf leicht abgesetzt sein, z. B. durch Linie oder etwas mehr Abstand
- keine aggressive Akzentfläche nötig

---

## Responsive Verhalten

### Mobile
- einspaltig
- gesamte FAQ über volle verfügbare Content-Breite
- ausreichend große Klickflächen
- Fragezeilen dürfen auf mehrere Zeilen umbrechen
- Antworten mit angenehmer Zeilenhöhe

### Tablet
- weiterhin einspaltig
- keine zweispaltige Aufteilung der FAQ-Gruppen
- Gruppentrennung klar sichtbar

### Desktop
- ebenfalls einspaltig
- Fokus auf Ruhe, Lesbarkeit und hochwertige Anmutung
- Kontaktblock unterhalb der FAQ nicht in mehrere visuell konkurrierende
  Boxen aufteilen

---

## Typografieempfehlung

Diese Angaben sind relativ zur bestehenden Gestaltung zu verstehen.

### H2
- deutlich, aber nicht überdominant
- hochwertige, ruhige Wirkung

### H3
- kleiner als H2, klar als Gruppenlabel erkennbar

### FAQ-Fragen
- etwas stärker gewichtet als Fließtext
- klar lesbar
- kurze Zeilenhöhe, damit die Fragezeile kompakt bleibt

### FAQ-Antworten
- normale Lesetypografie
- gute Zeilenhöhe
- keine zu kleinen Schriftgrade

---

## Komponentenlogik

### Empfohlene Komponenten
- `FaqSection`
- `FaqGroup`
- `FaqItem`
- `FaqCta`

### Verantwortlichkeiten

#### FaqSection
- rendert H2, Einleitung, Gruppen und CTA
- bekommt Daten aus zentraler Quelle

#### FaqGroup
- rendert Gruppenüberschrift
- rendert enthaltene FAQ-Items in Reihenfolge

#### FaqItem
- rendert Trigger und Antwort
- verwaltet offenen/geschlossenen Zustand
- setzt Accessibility-Attribute

#### FaqCta
- rendert Kontaktinformationen und CTA-Link

---

## Datenstruktur

Die FAQ-Inhalte sollen idealerweise datengetrieben gepflegt werden, nicht
hart verteilt im Template.

Empfohlene Datenstruktur:

```json
[
  {
    "group": "Akute strafrechtliche Situationen",
    "items": [
      {
        "id": "festnahme-durchsuchung-beschlagnahme",
        "question": "Was sollte ich tun, wenn es zu einer Festnahme, Durchsuchung oder Beschlagnahme kommt?",
        "answer": "In akuten strafrechtlichen Situationen ist schnelles und besonnenes Handeln wichtig. Auf der Website der Kanzlei Buhlke finden Sie dafür auch eine Notfallnummer. Gerade bei Festnahme, Durchsuchung oder Beschlagnahme kann eine frühe anwaltliche Unterstützung entscheidend sein."
      }
    ]
  }
]