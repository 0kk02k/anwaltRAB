# Redesign-Plan: Kanzlei Buhlke - Modernes UI, Eleganz & Seriositaet

## Anforderungen

Die Website soll von ihrem aktuell funktionalen, aber noch etwas "baukastenhaften" Erscheinungsbild zu einer **modern-eleganten, editorialen Praesenz** weiterentwickelt werden. Ziel: eine digitale Kanzleibroschuere, die Seriositaet, Vertrauen und persoenliche Naehe ausstrahlt.

**Was bleiben soll:**
- Dunkelblau (#1a365d) + Gold (#c59d5f) Farbschema
- Cormorant Garamond als Serif-Ueberschrift
- Justitia-Hero
- Persoenliche Ich-Form, kein Unternehmensjargon
- Alle Inhalte und Funktionen (PDFs, Kontakt, Maps-Dialog, Geschaeftszeiten)

**Was sich aendern soll:**
- Befreiung vom "UI-Kit"-Look hin zu einem redaktionellen, gesetzten Layout
- Feinere Typografie mit besserer Hierarchie
- Mehr Weite, mehr Weissraum, subtilere Uebergaenge
- Dezente Scroll-Animationen fuer modernen Ausdruck
- Kontaktbereich weniger formularartig, mehr einladend
- Footer kompakter und leichter
- Bugfixes: duplikate Nav-Links, Typos, fehlende schliessende Tags

---

## Phase 0: Bugfixes & Bereinigung

**Gefundene Probleme:**
1. `index.html:1368` - "Kontakt" Link doppelt in der Navigation
2. `impressum.html:246` - `claas` statt `class` Attribut-Typo
3. `datenschutz.html:360` - Fehlendes `</div>` schliessendes Tag fuer `.main-content`
4. `index.html:1516` - "Fuer" statt "Fuerr" (Umlaut-Problematik)
5. Footer-Navigation zeigt "Downloads" Link in impressum.html aber nicht in index.html
6. Alle CSS ist in jeder HTML-Datei dupliziert (~1350 Zeilen pro Datei)

**Aktionen:**
- Doppelten Kontakt-Link entfernen
- Typo `claas` -> `class` korrigieren
- Fehlende schliessende Tags ergaenzen
- Umlaute korrigieren wo noetig
- Footer-Konsistenz pruefen

**ECC-Unterstuetzung:**
| Skill/Agent | Einsatz | Warum |
|---|---|---|
| `code-reviewer` Agent | Nach Fixes | Prueft dass keine neuen Fehler eingeschleust wurden |
| `/verify` | Nach Fixes | Stellt sicher dass alle HTML-Dateien valide sind und Links funktionieren |

**Komplexitaet:** NIEDRIG

---

## Phase 1: CSS auslagern & Farbsystem verfeinern

**Aenderungen:**
- Gemeinsames CSS in `assets/css/style.css` auslagern (Reduzierung von ~4000 Zeilen Duplikat auf ~1400 Zeilen einmalig)
- Neue subtilere Hintergrund-Toene statt reinem #f9fafb:
  - `--color-cream: #faf9f7` (warmer Seiten-Hintergrund)
  - `--color-surface: #ffffff` (Karten/Felder)
  - `--color-primary-light: #2a4a7f` (helleres Blau fuer Hover)
  - `--color-secondary-dark: #a88245` (tieferes Gold fuer Akzente)
- Border-radius von 16px auf 8px reduzieren (eleganter, weniger "bubble")
- Schatten subtiler: weichere, weiter gestreute Schatten

**ECC-Unterstuetzung:**
| Skill/Agent | Einsatz | Warum |
|---|---|---|
| `architect` Agent | Vor CSS-Auslagerung | Bewertet ob ein einfaches `<link>` reicht oder ob CSS-Variables/Split sinnvoll sind |
| `/design-system` (Visual Audit) | Vor Farbanpassung | Analysiert bestehende CSS-Variablen auf Konsistenz, findet ungenutzte Token, bewertet 10 Dimensionen (Farbe, Typo, Spacing, etc.) |
| `/design-system` (Generate) | Nach Farbanpassung | Generiert `DESIGN.md` + `design-tokens.json` + `design-preview.html` als Dokumentation des neuen Systems |
| `code-reviewer` Agent | Nach Auslagerung | Prueft dass alle 3 Seiten korrekt auf neue CSS-Datei verlinken |
| `/browser-qa` (Smoke Test) | Nach Auslagerung | Prueft visuell: keine kaputten Styles, keine Console-Errors, alle Bilder laden |

**Komplexitaet:** MITTEL (wegen CSS-Auslagerung)

---

## Phase 2: Typografie verfeinern

**Aenderungen:**
- Zeilenabstand Fliesstext von 1.7 auf 1.8 erhoehen
- Hero-Titel groesser setzen (Desktop: 5rem statt 4.5rem) mit mehr letter-spacing
- Sektions-Ueberschriften mit `font-weight: 400` statt 700 fuer elegantere Wirkung
- Roemische Zahlen (I, II, III) groesser und dezenter: `color: var(--color-secondary)` mit `opacity: 0.6`
- Fliesstextgroesse leicht erhoehen (0.95rem -> 1.05rem)
- Neuer Utility-Stil `.label` fuer kleine Kategorien in Kapitaelchen

**ECC-Unterstuetzung:**
| Skill/Agent | Einsatz | Warum |
|---|---|---|
| `/design-system` (Visual Audit) | Nach Aenderungen | Speziell Dimension 2 (Typography Hierarchy) - bewertet ob h1 > h2 > h3 > body > caption klar und konsistent ist |
| `/benchmark` (Page Performance) | Nach Aenderungen | Prueft ob Font-Loading (Cormorant Garamond woff2) die LCP beeinflusst, misst FCP/CLS |

**Komplexitaet:** NIEDRIG

---

## Phase 3: Hero-Bereich verfeinern

**Aenderungen:**
- Hero-Hoehe reduzieren (min-height 520px -> 480px), weniger "Banner"
- Justitia-Bild dezenter (opacity 0.35 -> 0.25)
- Gradient weicher: mehr Uebergaenge statt harte Kante
- Untertitel subtiler: letter-spacing erhoehen, opacity reduzieren
- Wave-Uebergang unten beibehalten aber sanftere Kurve

**ECC-Unterstuetzung:**
| Skill/Agent | Einsatz | Warum |
|---|---|---|
| `/browser-qa` (Visual Regression) | Nach Aenderungen | Screenshot-Vergleich Desktop + Mobile, prueft dass Hero nicht "gebrochen" aussieht |
| `/benchmark` (Page Performance) | Nach Aenderungen | Hero-Bild ist laester LCP-Kandidat - misst ob Optimierung noetig (z.B. `fetchpriority="high"`, groesseres `sizes`-Attribut) |

**Komplexitaet:** NIEDRIG

---

## Phase 4: Rechtsgebiete - Vertikaler Rhythmus

**Aenderungen:**
- Practice-rows mehr vertikalen Abstand geben (margin-bottom 2.5rem -> 3.5rem)
- Goldene Seitenlinie duenner (3px -> 2px) und laenger
- Hover-Effekt zuruecknehmen: nur noch Farbwechsel des Titels
- "kontakt aufnehmen"-Link subtiler: kleiner, mit Pfeil-Icon, weniger prominent
- Practice-duo Abstand erhoehen (gap 2rem -> 3rem)

**ECC-Unterstuetzung:**
| Skill/Agent | Einsatz | Warum |
|---|---|---|
| `/click-path-audit` | Nach Aenderungen | Prueft dass alle "kontakt aufnehmen"-Links den korrekten Scroll zum Kontaktbereich ausloesen (keine dead links, kein JavaScript-Fehler) |
| `/design-system` (Visual Audit) | Nach Aenderungen | Dimension 3 (Spacing) - bewertet ob vertikaler Rhythmus konsistent ist |

**Komplexitaet:** NIEDRIG

---

## Phase 5: Kontaktbereich - Reduktion & Eleganz

**Aenderungen:**
- Icon-Kreise entfernen - Icons direkt in Primaerfarbe ohne Hintergrund
- Karten-Rahmen entfernen: kein `border`, kein `box-shadow` - nur feiner Akzentstrich
- Geschaeftszeiten-Karte: Trennlinien duenner, Schriftgroesse reduzieren
- Notfallnummer visuell hervorheben: dezenter roter Akzent
- Download-Bereich nahtloser: einfache Links mit Icon statt extra Rahmen

**ECC-Unterstuetzung:**
| Skill/Agent | Einsatz | Warum |
|---|---|---|
| `/click-path-audit` | Nach Aenderungen | Kritische Interaktionen pruefen: Telefon-Link (`tel:`) oeffnet Waehler, E-Mail-Link (`mailto:`) oeffnet Client, Maps-Link zeigt Confirm-Dialog, PDF-Downloads starten korrekt |
| `/browser-qa` (Interaction Test) | Nach Aenderungen | Klickt jeden Interaktionspunkt durch: Maps-Dialog, PDF-Downloads, Notfallnummer - stellt sicher dass Redesign keine Funktion gebrochen hat |
| `security-reviewer` Agent | Nach Aenderungen | Prueft dass `confirm()` Dialog vor Google Maps Redirect nicht entfernt wurde (Privacy-First Pattern), keine `javascript:void(0)` Leaks |

**Komplexitaet:** MITTEL

---

## Phase 6: Footer - Leichter und kompakter

**Aenderungen:**
- Duplikate Links entfernen (Impressum/Datenschutz erscheinen doppelt)
- Footer-Nav und Legal-Links in einer Zeile zusammenfassen
- Footer-Brand kleiner (1.35rem -> 1.1rem)
- Kontaktdaten kompakter in einer Zeile
- Weniger Padding (2.5rem -> 1.5rem top)

**ECC-Unterstuetzung:**
| Skill/Agent | Einsatz | Warum |
|---|---|---|
| `/click-path-audit` | Nach Aenderungen | Stellt sicher dass alle Footer-Links (Impressum, Datenschutz, Telefon, E-Mail, Maps) nach Konsolidierung noch korrekt funktionieren |
| `code-reviewer` Agent | Nach Aenderungen | Prueft dass keine Links versehentlich entfernt wurden (besonders Legal-Links) |

**Komplexitaet:** NIEDRIG

---

## Phase 7: Scroll-Animationen (subtil)

**Aenderungen:**
- CSS-basierte `@keyframes` fuer sanftes Einblenden
- Sektionen erhalten `opacity: 0` initial, per `IntersectionObserver` sichtbar
- Dauer: 600ms, `ease-out`, kein Bounce/Slide - nur sanftes Einblenden
- `prefers-reduced-motion`: dann keine Animationen
- Header-Scroll-Verhalten beibehalten

**ECC-Unterstuetzung:**
| Skill/Agent | Einsatz | Warum |
|---|---|---|
| `/benchmark` (Page Performance) | Vor UND Nach Aenderungen | Misst LCP/CLS/INP vorher und nachher - stellt sicher dass Animationen kein CLS (Layout Shift) verursachen und INP nicht steigt |
| `performance-optimizer` Agent | Bei Problemen | Falls Benchmark CLS > 0.1 zeigt: analysiert ob `opacity: 0` initial Layout beeinflusst, empfiehlt `will-change` oder alternative Animation-Property |
| `/browser-qa` (Accessibility) | Nach Aenderungen | Prueft dass `prefers-reduced-motion` korrekt greift: bei aktivierter Einstellung keine Animationen sichtbar |

**Komplexitaet:** MITTEL

---

## Phase 8: Impressum & Datenschutz anpassen

**Aenderungen:**
- Gleiche CSS-Aenderungen aus Phase 1-2 uebernehmen
- Konsistentes Erscheinungsbild mit Hauptseite
- `<link>` auf ausgelagerte CSS-Datei setzen

**ECC-Unterstuetzung:**
| Skill/Agent | Einsatz | Warum |
|---|---|---|
| `/browser-qa` (Smoke Test) | Nach Aenderungen | Prueft alle 3 Seiten auf Console-Errors, kaputte Styles, fehlende Fonts |
| `/click-path-audit` | Nach Aenderungen | Prueft Footer-Links auf allen Seiten: Impressum <-> Datenschutz <-> Index Navigation funktioniert korrekt |
| `/verify` | Am Ende | Finaler Check: HTML-validitaet, Link-Integritaet, CSS-Referenzen, fehlende Ressourcen |

**Komplexitaet:** NIEDRIG

---

## Phase 9: Finaler Abschluss & Deployment

**ECC-Unterstuetzung:**
| Skill/Agent | Einsatz | Warum |
|---|---|---|
| `/benchmark` (Page Performance) | Final | Misst finale Core Web Vitals aller 3 Seiten: LCP < 2.5s, CLS < 0.1, INP < 200ms |
| `/browser-qa` (Full Suite) | Final | Smoke Test + Interaction Test + Visual Regression auf Desktop + Mobile |
| `/design-system` (Visual Audit) | Final | Abschluss-Audit ueber alle 10 Dimensionen - Vergleich mit Pre-Redesign Score |
| `/canary-watch` | Nach Deployment | Ueberwacht deployed URL auf Regressionen (HTTP Status, Console Errors, Performance) |
| `/e2e` | Nach Deployment | Generiert E2E-Tests fuer kritische User-Flows: Navigation, Kontakt-Interaktionen, PDF-Downloads |

**Komplexitaet:** NIEDRIG

---

## Abhaengigkeiten

```
Phase 0 (Bugfixes)          - unabhaengig, zuerst erledigen
Phase 1 (CSS auslagern)     - Basis fuer alle folgenden
Phase 2 (Typografie)        - nach Phase 1
Phase 3 (Hero)              - nach Phase 2
Phase 4 (Rechtsgebiete)     - nach Phase 2
Phase 5 (Kontakt)           - nach Phase 2
Phase 6 (Footer)            - nach Phase 2
Phase 7 (Animationen)       - unabhaengig, parallel zu Phase 4-6
Phase 8 (Impressum etc.)    - am Schluss
Phase 9 (Finaler Check)     - nach Phase 8
```

## Risiken

- **NIEDRIG:** Layout bricht auf Mobile - mitigiert durch schrittweise Aenderungen
- **NIEDRIG:** CSS-Auslagerung bricht bestehende Seiten - mitigiert durch relative Pfade
- **NIEDRIG:** Animationen auf aelteren Geraeten - `prefers-reduced-motion` Abdeckung

## Geschaetzte Komplexitaet: MITTEL

- Alle Phasen betreffen nur CSS/HTML-Aenderungen
- Kein JavaScript-Framework, kein Build-System
- Alles in bestehenden Dateien
- Phase 0+1 sind ca. 50% der Arbeit, Rest sind Detailverbesserungen

---

## ECC-Skills & Agents - Zusammenfassung

### Verwendete Agents (Sub-Prozesse)

| Agent | Phasen | Aufgabe |
|---|---|---|
| `architect` | 1 | CSS-Architektur-Entscheidung vor Auslagerung |
| `code-reviewer` | 0, 1, 6 | Code-Qualitaet nach Aenderungen |
| `security-reviewer` | 5 | Privacy-Patterns im Kontaktbereich |
| `performance-optimizer` | 7 | Falls Animationen Performance-Probleme verursachen |

### Verwendete Skills (Slash-Commands)

| Skill | Phasen | Aufgabe |
|---|---|---|
| `/design-system` | 1, 2, 4, 9 | Design-Token Audit + Generierung, Typography/Spacing-Bewertung |
| `/browser-qa` | 1, 3, 5, 7, 8, 9 | Visuelle Tests, Interaction Tests, Accessibility |
| `/click-path-audit` | 4, 5, 6, 8 | User-Flow-Verifikation (Links, Downloads, Maps-Dialog) |
| `/benchmark` | 2, 3, 7, 9 | Performance-Messung (Core Web Vitals: LCP, CLS, INP) |
| `/verify` | 0, 8 | HTML-Validitaet, Link-Integritaet |
| `/canary-watch` | 9 | Post-Deploy Monitoring auf Regressionen |
| `/e2e` | 9 | Automatisierte E2E-Tests fuer kritische User-Flows |
