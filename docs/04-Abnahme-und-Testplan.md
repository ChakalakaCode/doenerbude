# ABNAHME- UND TESTPLAN

## Webpräsenz “Dönerbude Beelen”

### Qualitätssicherung & Abnahmedokumentation

---

| **Dokumenttyp**       | Abnahme- und Testplan                              |
|-----------------------|----------------------------------------------------|
| **Projekt**           | Dönerbude Beelen – Webpräsenz                      |
| **Dokument-ID**       | TP-DOENERBUDE-2026-001                             |
| **Version**           | 1.0                                                |
| **Status**            | Freigegeben                                        |
| **Bezugsdokumente**   | LH-DOENERBUDE-2026-001, PH-DOENERBUDE-2026-001     |

---

## Änderungshistorie

| Version | Datum       | Autor             | Änderungen                    |
|---------|-------------|-------------------|-------------------------------|
| 0.1     | 2025-11-15  | QA-Team           | Initiale Testfälle            |
| 0.5     | 2025-12-01  | QA-Team           | Erweiterung um Performance    |
| 1.0     | 2026-01-05  | Projektleitung    | Finale Version für Abnahme    |

---

## Inhaltsverzeichnis

1. [Einleitung](#1-einleitung)
2. [Testumgebung](#2-testumgebung)
3. [Teststrategie](#3-teststrategie)
4. [Testfälle](#4-testfälle)
5. [Abnahmekriterien](#5-abnahmekriterien)
6. [Abnahmeprotokoll](#6-abnahmeprotokoll)
7. [Anhänge](#7-anhänge)

---

## 1. Einleitung

### 1.1 Zweck

Dieser Testplan definiert die Qualitätssicherungsmaßnahmen für das Projekt “Webpräsenz Dönerbude Beelen". Er beschreibt die durchzuführenden Tests, Testumgebungen und Abnahmekriterien.

### 1.2 Geltungsbereich

| Aspekt                | Details                                            |
|-----------------------|----------------------------------------------------|
| Testgegenstand        | Statische Website inkl. aller Seiten               |
| Testarten             | Funktional, UI/UX, Performance, Sicherheit         |
| Testtiefe             | Systemtest, Akzeptanztest                          |

### 1.3 Qualitätsziele

| Qualitätsmerkmal      | Zielwert                                           |
|-----------------------|----------------------------------------------------|
| Funktionale Korrektheit | 100% der Must-Anforderungen                      |
| Browser-Kompatibilität | Chrome, Firefox, Safari, Edge (aktuelle Versionen)|
| Performance           | PageSpeed Score > 80 (Mobile)                      |
| Barrierefreiheit      | Lighthouse A11Y > 80                               |

---

## 2. Testumgebung

### 2.1 Hardware

| Gerätekategorie       | Geräte                                             |
|-----------------------|----------------------------------------------------|
| Desktop               | Windows 10/11, macOS                               |
| Tablet                | iPad (Safari)                                      |
| Smartphone            | iPhone (Safari), Android (Chrome)                  |

### 2.2 Software / Browser

| Browser               | Version                | Plattform              |
|-----------------------|------------------------|------------------------|
| Google Chrome         | Aktuell (v120+)        | Windows, macOS, Android|
| Mozilla Firefox       | Aktuell (v120+)        | Windows, macOS         |
| Safari                | Aktuell (v17+)         | macOS, iOS             |
| Microsoft Edge        | Aktuell (v120+)        | Windows                |

### 2.3 Netzwerkbedingungen

| Profil                | Download    | Upload    | Latenz    |
|-----------------------|-------------|-----------|-----------|
| Normal (WiFi)         | 25 Mbps     | 5 Mbps    | 20 ms     |
| Slow 3G               | 0.4 Mbps    | 0.4 Mbps  | 400 ms    |
| Fast 3G               | 1.5 Mbps    | 0.75 Mbps | 100 ms    |

### 2.4 Test-Tools

| Tool                  | Zweck                                              |
|-----------------------|----------------------------------------------------|
| Chrome DevTools       | Debugging, Network, Performance                    |
| Lighthouse            | Performance, A11Y, SEO Audit                       |
| GTmetrix              | Performance-Analyse                                |
| Schema.org Validator  | Structured Data Validierung                        |
| W3C Validator         | HTML/CSS Validierung                               |

---

## 3. Teststrategie

### 3.1 Testarten-Matrix

| Testart               | Methode     | Verantwortlich | Zeitpunkt            |
|-----------------------|-------------|----------------|----------------------|
| Unit-Tests            | Manuell     | Entwickler     | Während Entwicklung  |
| Integrationstests     | Manuell     | QA-Team        | Nach Feature-Abschluss|
| Systemtests           | Manuell     | QA-Team        | Vor Release          |
| Akzeptanztests        | Manuell     | Auftraggeber   | Abnahme              |
| Regressionstests      | Manuell     | QA-Team        | Nach Änderungen      |

### 3.2 Risiko-basierte Priorisierung

| Priorität | Beschreibung                    | Testintensität |
|-----------|---------------------------------|----------------|
| Kritisch  | Kernfunktionen (Telefon, Kontakt)| Intensiv      |
| Hoch      | Navigation, Download            | Vollständig    |
| Mittel    | SEO, Analytics                  | Stichproben    |
| Niedrig   | Nice-to-have Features           | Minimal        |

---

## 4. Testfälle

### 4.1 Funktionale Tests

---

#### TC-01: Telefonische Bestellung – Header CTA

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-01                                              |
| **Priorität**         | Kritisch                                           |
| **User Story Ref.**   | US-01                                              |
| **Anforderungs-Ref.** | FA-KON-001, FA-KON-002                             |

**Vorbedingungen:**
- Startseite ist geladen
- Mobilgerät oder Desktop verfügbar

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | Startseite öffnen                   | Seite lädt vollständig                |
| 2       | „Bestellen" Button im Header finden | Button ist sichtbar                   |
| 3       | Button klicken                      | `tel:+4925868828866` wird aufgerufen  |
| 4       | (Mobile) Telefon-App öffnet sich    | Nummer ist vorbefüllt                 |

**Nachbedingungen:**
- Keine Änderungen am System

---

#### TC-02: Google Maps – Click-to-Load

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-02                                              |
| **Priorität**         | Hoch                                               |
| **User Story Ref.**   | US-04                                              |
| **Anforderungs-Ref.** | FA-MAP-001 – 004                                   |

**Vorbedingungen:**
- Startseite ist geladen
- DevTools Network-Tab geöffnet

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | Seite initial laden                 | Keine maps.google.com Requests        |
| 2       | Zum Kartenbereich scrollen          | Placeholder mit Button sichtbar       |
| 3       | „Karte laden" Button klicken        | Request an Google Maps wird gesendet  |
| 4       | Karte wird angezeigt                | iframe mit Map ist eingebettet        |

**Nachbedingungen:**
- Map bleibt geladen bis Seitenreload

---

#### TC-03: Speisekarte Download

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-03                                              |
| **Priorität**         | Kritisch                                           |
| **User Story Ref.**   | US-05                                              |
| **Anforderungs-Ref.** | FA-SPK-001 – 003                                   |

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | Zum Speisekarten-Bereich scrollen   | Download-Button ist sichtbar          |
| 2       | Download-Button klicken             | Download startet                      |
| 3       | Datei öffnen                        | PDF ist lesbar und vollständig        |

---

#### TC-04: Mobile Navigation

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-04                                              |
| **Priorität**         | Hoch                                               |
| **User Story Ref.**   | —                                                  |
| **Anforderungs-Ref.** | NFA-RES-001                                        |

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | Viewport auf < 768px setzen         | Hamburger-Icon erscheint              |
| 2       | Hamburger-Icon klicken              | Menü öffnet sich                      |
| 3       | Navigationslink klicken             | Seite scrollt, Menü schließt          |
| 4       | Hamburger erneut klicken            | Menü öffnet/schließt korrekt          |

---

#### TC-05: Rechtliche Seiten

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-05                                              |
| **Priorität**         | Kritisch                                           |
| **User Story Ref.**   | US-06, US-07                                       |
| **Anforderungs-Ref.** | FA-REC-001 – 003                                   |

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | `impressum.html` aufrufen           | Seite lädt vollständig                |
| 2       | Inhalt prüfen                       | Pflichtangaben vorhanden              |
| 3       | `datenschutz.html` aufrufen         | Seite lädt vollständig                |
| 4       | Externe Dienste dokumentiert prüfen | GA, Maps, Fonts aufgeführt            |

---

#### TC-06: Warenkorb-Modal

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-06                                              |
| **Priorität**         | Mittel                                             |
| **User Story Ref.**   | US-02                                              |
| **Anforderungs-Ref.** | FA-KON-005                                         |

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | Produkt-„Bestellen" Button klicken  | Toast-Benachrichtigung erscheint      |
| 2       | Warenkorb-Icon klicken              | Modal öffnet sich                     |
| 3       | Produktliste prüfen                 | Hinzugefügte Produkte sichtbar        |
| 4       | Telefon-CTA im Modal klicken        | Anruf wird initiiert                  |

---

#### TC-07: Öffnungszeiten

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-07                                              |
| **Priorität**         | Hoch                                               |
| **User Story Ref.**   | US-03                                              |

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | Zum Kontaktbereich scrollen         | Öffnungszeiten sind sichtbar          |
| 2       | Mobile-Viewport testen              | Text lesbar ohne Zoom                 |

---

#### TC-08: Cookie-Consent & Analytics

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-08                                              |
| **Priorität**         | Kritisch                                           |
| **User Story Ref.**   | US-08, US-11                                       |
| **Anforderungs-Ref.** | FA-REC-004, FA-TRK-001 – 006                       |

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | localStorage löschen, Seite laden   | Cookie-Banner erscheint               |
| 2       | DevTools Network prüfen             | Keine GA-Requests                     |
| 3       | „Nur notwendige" wählen             | Banner schließt, keine GA-Requests    |
| 4       | localStorage löschen, erneut laden  | Banner erscheint wieder               |
| 5       | „Alle akzeptieren" wählen           | GA wird initialisiert                 |
| 6       | Telefon-Link klicken                | GA-Event wird gesendet                |

---

#### TC-09: Lighthouse Audit

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-09                                              |
| **Priorität**         | Hoch                                               |

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | Lighthouse Mobile-Audit starten     | Audit läuft durch                     |
| 2       | Performance Score prüfen            | Score > 80                            |
| 3       | Accessibility Score prüfen          | Score > 80                            |
| 4       | SEO Score prüfen                    | Score > 90                            |

---

#### TC-10: SEO-Landingpages

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-10                                              |
| **Priorität**         | Mittel                                             |
| **User Story Ref.**   | US-09, US-10                                       |

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | `sitemap.xml` aufrufen              | Alle Seiten gelistet                  |
| 2       | SEO-Landingpage öffnen              | Seite lädt                            |
| 3       | Title-Tag prüfen                    | Einzigartig und relevant              |
| 4       | Meta-Description prüfen             | Vorhanden und einzigartig             |

---

#### TC-11: Share-Funktion

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | TC-11                                              |
| **Priorität**         | Niedrig                                            |
| **User Story Ref.**   | US-12                                              |

**Testschritte:**

| Schritt | Aktion                              | Erwartetes Ergebnis                   |
|---------|-------------------------------------|---------------------------------------|
| 1       | Share-Button finden                 | Button ist sichtbar                   |
| 2       | (Web Share API) Button klicken      | Native Share-Dialog öffnet            |
| 3       | (Fallback) Button klicken           | WhatsApp-Link wird geöffnet           |

---

### 4.3 Cross-Browser-Test-Matrix

| Testfall | Chrome | Firefox | Safari | Edge | iOS Safari | Android Chrome |
|----------|--------|---------|--------|------|------------|----------------|
| TC-01    | ☐      | ☐       | ☐      | ☐    | ☐          | ☐              |
| TC-02    | ☐      | ☐       | ☐      | ☐    | ☐          | ☐              |
| TC-03    | ☐      | ☐       | ☐      | ☐    | ☐          | ☐              |
| TC-04    | —      | —       | —      | —    | ☐          | ☐              |
| TC-05    | ☐      | ☐       | ☐      | ☐    | ☐          | ☐              |

---

## 5. Abnahmekriterien

### 5.1 Go-Live Kriterien

| Kategorie             | Kriterium                          | Zielwert        | Status |
|-----------------------|------------------------------------|-----------------|--------|
| Funktional            | Must-Anforderungen erfüllt         | 100%            | ☐      |
| Funktional            | Should-Anforderungen erfüllt       | ≥ 80%           | ☐      |
| Performance           | PageSpeed Mobile                   | > 80            | ☐      |
| Rechtlich             | Impressum vorhanden                | Ja              | ☐      |
| Rechtlich             | Datenschutzerklärung vorhanden     | Ja              | ☐      |
| Rechtlich             | Cookie-Consent funktioniert        | Ja              | ☐      |
| Sicherheit            | HTTPS aktiv                        | Ja              | ☐      |
| Cross-Browser         | Keine kritischen Fehler            | Ja              | ☐      |

### 5.2 Blocker-Definition

| Severity   | Beschreibung                                | Auswirkung auf Go-Live |
|------------|---------------------------------------------|------------------------|
| Blocker    | Kernfunktion nicht nutzbar                  | Verhindert Go-Live     |
| Critical   | Wichtige Funktion eingeschränkt             | Go-Live mit Risiko     |
| Major      | Funktion beeinträchtigt, Workaround möglich | Go-Live möglich        |
| Minor      | Kosmetische Fehler                          | Kein Einfluss          |

---

## 6. Abnahmeprotokoll

### 6.1 Abnahme-Metadaten

| Feld                  | Wert                                               |
|-----------------------|----------------------------------------------------|
| **Abnahmedatum**      | _________________                                  |
| **Version**           | _________________                                  |
| **Commit/Tag**        | _________________                                  |
| **Testumgebung URL**  | _________________                                  |

### 6.2 Beteiligte

| Rolle                 | Name                 | Unterschrift           |
|-----------------------|----------------------|------------------------|
| Auftraggeber          | Yurtsever Baran      | _________________      |
| Projektleitung        | _________________    | _________________      |
| QA-Verantwortlicher   | _________________    | _________________      |

### 6.3 Testergebnisse

| Testfall | Ergebnis     | Anmerkungen                               |
|----------|--------------|-------------------------------------------|
| TC-01    | ☐ Pass ☐ Fail| _________________                         |
| TC-02    | ☐ Pass ☐ Fail| _________________                         |
| TC-03    | ☐ Pass ☐ Fail| _________________                         |
| TC-04    | ☐ Pass ☐ Fail| _________________                         |
| TC-05    | ☐ Pass ☐ Fail| _________________                         |
| TC-06    | ☐ Pass ☐ Fail| _________________                         |
| TC-07    | ☐ Pass ☐ Fail| _________________                         |
| TC-08    | ☐ Pass ☐ Fail| _________________                         |
| TC-09    | ☐ Pass ☐ Fail| _________________                         |
| TC-10    | ☐ Pass ☐ Fail| _________________                         |
| TC-11    | ☐ Pass ☐ Fail| _________________                         |

### 6.4 Gesamtergebnis

| Ergebnis                             | Auswahl                              |
|--------------------------------------|--------------------------------------|
| ☐ **Bestanden ohne Einschränkungen** | Go-Live freigegeben                  |
| ☐ **Bestanden mit Auflagen**         | Go-Live mit dokumentierten Mängeln   |
| ☐ **Nicht bestanden**                | Nachbesserung erforderlich           |

### 6.5 Mängelliste

| ID   | Beschreibung         | Severity | Verantwortlich | Fix-Termin | Status     |
|------|----------------------|----------|----------------|------------|------------|
| M-01 | _________________    | _______  | _____________  | __________| ☐ Offen    |
| M-02 | _________________    | _______  | _____________  | __________| ☐ Offen    |
| M-03 | _________________    | _______  | _____________  | __________| ☐ Offen    |

### 6.6 Freigabe

Hiermit wird die Abnahme des Projekts “Webpräsenz Dönerbude Beelen" erklärt:

| Auftraggeber          | Datum                | Unterschrift           |
|-----------------------|----------------------|------------------------|
| Yurtsever Baran       | _________________    | _________________      |

---

## 7. Anhänge

### 7.1 Checkliste für Schnelltest

**Vor jeder Deployment:**

- [ ] Startseite lädt ohne Fehler
- [ ] Telefon-Links funktionieren
- [ ] Speisekarte-Download funktioniert
- [ ] Karte lädt erst nach Klick
- [ ] Cookie-Banner erscheint
- [ ] Keine horizontalen Scrollbars (Mobile)
- [ ] Impressum/Datenschutz erreichbar

### 7.2 Browser-Kompatibilitäts-Checkliste

| Feature               | Chrome | Firefox | Safari | Edge |
|-----------------------|--------|---------|--------|------|
| CSS Grid              | ✓      | ✓       | ✓      | ✓    |
| CSS Flexbox           | ✓      | ✓       | ✓      | ✓    |
| Web Share API         | ✓      | ✗       | ✓      | ✓    |
| IntersectionObserver  | ✓      | ✓       | ✓      | ✓    |
| localStorage          | ✓      | ✓       | ✓      | ✓    |

---

**Ende des Dokuments**

---

*Dieses Dokument ist vertraulich und nur für die benannten Projektbeteiligten bestimmt.*
