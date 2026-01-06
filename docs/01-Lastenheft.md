---

![Logo](../berlin.png)

---

# LASTENHEFT

## Webpräsenz „Dönerbude Beelen"

### Digitale Präsenz & Kundenkommunikation

---

| **Dokumenttyp**       | Lastenheft (Anforderungsspezifikation)         |
|-----------------------|------------------------------------------------|
| **Projekt**           | Dönerbude Beelen – Webpräsenz                  |
| **Auftraggeber**      | Dönerbude Beelen, Inh. Yurtsever Baran         |
| **Auftragnehmer**     | Mutlu Arabul                     |
| **Dokument-ID**       | LH-DOENERBUDE-2026-001                         |
| **Version**           | 1.0                                            |
| **Status**            | Freigegeben                                    |
| **Klassifizierung**   | Vertraulich – nur für Projektbeteiligte        |

---

## Änderungshistorie

| Version | Datum       | Autor                | Änderungen                              | Freigabe       |
|---------|-------------|----------------------|-----------------------------------------|----------------|
| 0.1     | 2025-10-01  | Projektteam          | Initialer Entwurf                       | —              |
| 0.5     | 2025-11-15  | Projektteam          | Anforderungen konkretisiert             | —              |
| 0.9     | 2025-12-10  | Projektleitung       | Review & Korrekturen                    | —              |
| 1.0     | 2026-01-05  | Auftraggeber         | Finale Freigabe                         | Yurtsever Baran|

---

## Freigabe

| Rolle              | Name               | Datum       | Unterschrift         |
|--------------------|--------------------|-------------|----------------------|
| Auftraggeber       | Yurtsever Baran    | ________    | ____________________ |
| Projektleitung     | [Name]             | ________    | ____________________ |
| Qualitätssicherung | [Name]             | ________    | ____________________ |

---

## Inhaltsverzeichnis

1. [Einleitung](#1-einleitung)
   1.1 [Zweck des Dokuments](#11-zweck-des-dokuments)
   1.2 [Geltungsbereich](#12-geltungsbereich)
   1.3 [Zielgruppe](#13-zielgruppe)
   1.4 [Referenzierte Dokumente](#14-referenzierte-dokumente)
2. [Ausgangssituation und Zielsetzung](#2-ausgangssituation-und-zielsetzung)
   2.1 [Ist-Zustand](#21-ist-zustand)
   2.2 [Problemstellung](#22-problemstellung)
   2.3 [Projektziele](#23-projektziele)
   2.4 [Erfolgskriterien](#24-erfolgskriterien)
3. [Stakeholder-Analyse](#3-stakeholder-analyse)
4. [Systemkontext und Abgrenzung](#4-systemkontext-und-abgrenzung)
   4.1 [Systemumgebung](#41-systemumgebung)
   4.2 [Systemgrenzen](#42-systemgrenzen)
   4.3 [Schnittstellen](#43-schnittstellen)
5. [Funktionale Anforderungen](#5-funktionale-anforderungen)
6. [Nicht-funktionale Anforderungen](#6-nicht-funktionale-anforderungen)
7. [Randbedingungen und Einschränkungen](#7-randbedingungen-und-einschränkungen)
8. [Abnahmekriterien](#8-abnahmekriterien)
9. [Glossar](#9-glossar)
10. [Anhänge](#10-anhänge)

---

## 1. Einleitung

### 1.1 Zweck des Dokuments

Das vorliegende Lastenheft definiert die vollständigen Anforderungen des Auftraggebers an die zu entwickelnde Webpräsenz für die „Dönerbude Beelen". Es dient als verbindliche Grundlage für:

- Die Erstellung des Pflichtenhefts durch den Auftragnehmer
- Die Projektplanung und Ressourcenkalkulation
- Die spätere Abnahme des Projektergebnisses
- Die Kommunikation zwischen allen Projektbeteiligten

Dieses Dokument ist nach den Richtlinien des **IEEE 830-1998** (Recommended Practice for Software Requirements Specifications) sowie in Anlehnung an **DIN 69901** (Projektmanagement) strukturiert.

### 1.2 Geltungsbereich

Dieses Lastenheft gilt für das Gesamtprojekt „Webpräsenz Dönerbude Beelen" einschließlich:

- Konzeption und Design
- Technische Umsetzung
- Content-Erstellung
- SEO-Optimierung
- Qualitätssicherung und Abnahme

### 1.3 Zielgruppe

| Zielgruppe              | Verwendungszweck                                        |
|-------------------------|---------------------------------------------------------|
| Auftraggeber            | Anforderungsdefinition, Freigabe, Abnahme               |
| Projektleitung          | Projektplanung, Steuerung, Controlling                  |
| Entwicklungsteam        | Technische Umsetzung, Pflichtenhefterstellung           |
| Qualitätssicherung      | Testplanung, Abnahmetests                               |
| Externe Dienstleister   | Hosting, Domain-Management                              |

### 1.4 Referenzierte Dokumente

| Dokument-ID              | Bezeichnung                                  | Version |
|--------------------------|----------------------------------------------|---------|
| PH-DOENERBUDE-2026-001   | Pflichtenheft                                | 1.0     |
| US-DOENERBUDE-2026-001   | User Stories & Akzeptanzkriterien            | 1.0     |
| TP-DOENERBUDE-2026-001   | Test- und Abnahmeplan                        | 1.0     |
| BH-DOENERBUDE-2026-001   | Benutzerhandbuch                             | 1.0     |
| WH-DOENERBUDE-2026-001   | Betriebs- und Wartungshandbuch               | 1.0     |

---

## 2. Ausgangssituation und Zielsetzung

### 2.1 Ist-Zustand

Die **Dönerbude Beelen** ist ein etablierter Gastronomiebetrieb mit Standort in der Warendorferstraße 21, 48361 Beelen. Der Betrieb bietet authentischen Berliner Döner sowie Pizza und weitere Speisen an.

**Aktuelle Situation:**
- Lokale Bekanntheit primär durch Laufkundschaft und Mundpropaganda
- Begrenzte digitale Präsenz
- Bestellungen erfolgen ausschließlich telefonisch oder vor Ort
- Keine systematische Erfassung von Kundeninteraktionen

### 2.2 Problemstellung

| Problem                                    | Auswirkung                                          |
|--------------------------------------------|-----------------------------------------------------|
| Fehlende professionelle Online-Präsenz     | Eingeschränkte Auffindbarkeit für Neukunden         |
| Keine SEO-optimierte Webseite              | Geringe Sichtbarkeit in Suchmaschinen               |
| Kein digitaler Zugang zur Speisekarte      | Umständliche Informationsbeschaffung für Kunden     |
| Keine Möglichkeit zur Online-Vorbestellung | Potenzielle Umsatzeinbußen                          |
| Fehlende regionale Suchmaschinenoptimierung| Nicht-Erscheinen bei lokalen Suchanfragen           |

### 2.3 Projektziele

#### 2.3.1 Strategische Ziele

| ID      | Ziel                                                      | Priorität |
|---------|-----------------------------------------------------------|-----------|
| SZ-01   | Etablierung einer professionellen digitalen Markenpräsenz | Hoch      |
| SZ-02   | Steigerung der regionalen Online-Sichtbarkeit             | Hoch      |
| SZ-03   | Vereinfachung des Bestellprozesses für Kunden             | Hoch      |
| SZ-04   | Erschließung neuer Kundengruppen im Umkreis               | Mittel    |

#### 2.3.2 Operative Ziele

| ID      | Ziel                                                      | Messbar durch                    |
|---------|-----------------------------------------------------------|----------------------------------|
| OZ-01   | Website-Launch mit vollständiger Funktionalität           | Go-Live-Datum                    |
| OZ-02   | Top-10-Ranking für „Döner Beelen"                         | Google Search Console            |
| OZ-03   | Durchschnittliche Ladezeit < 3 Sekunden                   | Google PageSpeed Insights        |
| OZ-04   | Mobile Usability Score > 90                               | Google Lighthouse                |
| OZ-05   | Rechtskonforme Website (DSGVO, TMG)                       | Juristische Prüfung              |

### 2.4 Erfolgskriterien

Das Projekt gilt als erfolgreich abgeschlossen, wenn:

1. **Funktional:** Alle definierten Anforderungen sind implementiert und getestet.
2. **Qualitativ:** Die nicht-funktionalen Anforderungen sind nachweislich erfüllt.
3. **Zeitlich:** Der Go-Live erfolgt innerhalb des vereinbarten Zeitrahmens.
4. **Budgetär:** Das Projekt wird innerhalb des vereinbarten Budgets abgeschlossen.
5. **Abnahme:** Der Auftraggeber erteilt die formale Abnahme.

---

## 3. Stakeholder-Analyse

### 3.1 Primäre Stakeholder

| Stakeholder              | Rolle                | Interessen/Erwartungen                              | Einfluss |
|--------------------------|----------------------|-----------------------------------------------------|----------|
| Yurtsever Baran          | Auftraggeber/Inhaber | Professionelle Präsenz, Umsatzsteigerung, ROI       | Hoch     |
| Endkunden (Besucher)     | Nutzer               | Schnelle Information, einfache Kontaktaufnahme      | Hoch     |
| Mitarbeiter              | Intern               | Klare Kommunikation der Öffnungszeiten/Angebote     | Mittel   |

### 3.2 Sekundäre Stakeholder

| Stakeholder              | Rolle                | Interessen/Erwartungen                              | Einfluss |
|--------------------------|----------------------|-----------------------------------------------------|----------|
| Suchmaschinen (Google)   | Indexierung          | Strukturierte Daten, semantisches HTML              | Hoch     |
| Hosting-Provider         | Infrastruktur        | Technische Spezifikationen, Support                 | Mittel   |
| Behörden (Datenschutz)   | Regulierung          | DSGVO-Konformität, Impressumspflicht                | Mittel   |
| Wettbewerber             | Markt                | Beobachtung des Marktauftritts                      | Niedrig  |

### 3.3 Stakeholder-Matrix

```
                    EINFLUSS
              Niedrig         Hoch
         ┌─────────────┬─────────────┐
  Hoch   │  Informieren│  Eng        │
INTERESSE│             │  einbinden  │
         │             │  (Inhaber,  │
         │             │   Kunden)   │
         ├─────────────┼─────────────┤
  Niedrig│  Minimal    │  Zufrieden  │
         │  beobachten │  halten     │
         │             │  (Hosting)  │
         └─────────────┴─────────────┘
```

---

## 4. Systemkontext und Abgrenzung

### 4.1 Systemumgebung

```
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNE SYSTEME                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Google    │  │   Google    │  │   CDN       │              │
│  │  Analytics  │  │    Maps     │  │  (Fonts/    │              │
│  │             │  │   Embed     │  │   Icons)    │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│         ▼                ▼                ▼                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │               WEBSITE „DÖNERBUDE BEELEN"                │    │
│  │                                                         │    │
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │    │
│  │   │  Start- │ │  SEO-   │ │ Rechts- │ │  Assets │       │    │
│  │   │  seite  │ │  Seiten │ │ seiten  │ │  (PDF,  │       │    │
│  │   │         │ │         │ │         │ │  Media) │       │    │
│  │   └─────────┘ └─────────┘ └─────────┘ └─────────┘       │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    WEBSERVER / HOSTING                  │    │
│  │              (Statische Auslieferung, TLS)              │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                      ENDNUTZER                          │    │
│  │        (Desktop-Browser / Mobile Browser)               │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Systemgrenzen

#### 4.2.1 Im Projektumfang enthalten (In-Scope)

| ID      | Komponente                                            | Beschreibung                                   |
|---------|-------------------------------------------------------|------------------------------------------------|
| IS-01   | Responsive Website                                    | Desktop- und mobiloptimierte Darstellung       |
| IS-02   | Startseite mit Hero-Bereich                           | Markenauftritt, Quick-Actions, Kontakt         |
| IS-03   | Speisekarte-Download                                  | PDF-Bereitstellung                             |
| IS-04   | Kontakt-/Öffnungszeiten-Bereich                       | Vollständige Kontaktinformationen              |
| IS-05   | Interaktive Karteneinbindung                          | Google Maps mit Click-to-Load                  |
| IS-06   | SEO-Landingpages                                      | Regionale Unterseiten (12+ Orte)               |
| IS-07   | Rechtliche Seiten                                     | Impressum, Datenschutzerklärung                |
| IS-08   | Cookie-Consent-Management                             | DSGVO-konforme Einwilligung                    |
| IS-09   | Analytics-Integration                                 | Google Analytics 4 (consent-basiert)           |
| IS-10   | Social-Share-Funktionalität                           | Teilen über Web Share API / WhatsApp           |

#### 4.2.2 Nicht im Projektumfang enthalten (Out-of-Scope)

| ID      | Komponente                                            | Begründung                                     |
|---------|-------------------------------------------------------|------------------------------------------------|
| OS-01   | Online-Bestellsystem mit Warenkorbfunktion            | Nicht beauftragt; telefonische Bestellung      |
| OS-02   | Online-Zahlungsabwicklung                             | Nicht beauftragt                               |
| OS-03   | Backend-System / Datenbank                            | Statische Website ausreichend                  |
| OS-04   | Benutzerkonten / Login-Bereich                        | Nicht beauftragt                               |
| OS-05   | Integration Lieferdienst-Plattformen                  | Nicht beauftragt                               |
| OS-06   | Mehrsprachigkeit                                      | Zielgruppe deutschsprachig                     |
| OS-07   | Native Mobile App                                     | Nicht beauftragt                               |

### 4.3 Schnittstellen

| ID      | Schnittstelle           | Typ              | Beschreibung                                    |
|---------|-------------------------|------------------|------------------------------------------------|
| IF-01   | Google Analytics 4      | Extern (JS)      | Tracking nach Consent                          |
| IF-02   | Google Maps Embed       | Extern (iframe)  | Karteneinbindung nach Nutzeraktion             |
| IF-03   | Google Fonts            | Extern (CSS)     | Schriftarten (Poppins)                         |
| IF-04   | Font Awesome CDN        | Extern (CSS/JS)  | Icon-Bibliothek                                |
| IF-05   | Tel-Link (RFC 3966)     | Systemstandard   | Telefon-Integration auf Mobilgeräten           |
| IF-06   | Web Share API           | Browser-API      | Native Teilen-Funktionalität                   |

---

## 5. Funktionale Anforderungen

### 5.1 Übersicht der Anforderungskategorien

| Kategorie                   | Anforderungs-IDs    | Priorität         |
|-----------------------------|---------------------|-------------------|
| Navigation & Struktur       | FA-NAV-001 – 005    | Must-Have         |
| Kontakt & Bestellung        | FA-KON-001 – 006    | Must-Have         |
| Speisekarte                 | FA-SPK-001 – 003    | Must-Have         |
| Standort & Karte            | FA-MAP-001 – 004    | Must-Have         |
| SEO & Marketing             | FA-SEO-001 – 008    | Should-Have       |
| Rechtliches & Compliance    | FA-REC-001 – 005    | Must-Have         |
| Tracking & Analytics        | FA-TRK-001 – 006    | Should-Have       |
| Social & Sharing            | FA-SOC-001 – 003    | Could-Have        |

### 5.2 Detaillierte Anforderungen

#### 5.2.1 Navigation & Struktur

| ID          | Anforderung                                                         | Priorität | Quelle        |
|-------------|---------------------------------------------------------------------|-----------|---------------|
| FA-NAV-001  | Die Website MUSS eine persistente Hauptnavigation bereitstellen.    | Must      | Auftraggeber  |
| FA-NAV-002  | Die Navigation MUSS folgende Bereiche verlinken: Home, Speisekarte, Kontakt, Rechtliches. | Must | Auftraggeber |
| FA-NAV-003  | Auf mobilen Geräten MUSS ein Hamburger-Menü angezeigt werden.       | Must      | Best Practice |
| FA-NAV-004  | Anker-Links SOLLEN smooth scrollen mit Offset für Fixed Header.     | Should    | UX            |
| FA-NAV-005  | Die Navigation SOLL ein Dropdown für rechtliche Seiten enthalten.   | Should    | UX            |

#### 5.2.2 Kontakt & Bestellung

| ID          | Anforderung                                                         | Priorität | Quelle        |
|-------------|---------------------------------------------------------------------|-----------|---------------|
| FA-KON-001  | Die Website MUSS mindestens einen prominenten Telefon-CTA enthalten.| Must      | Auftraggeber  |
| FA-KON-002  | Telefonnummern MÜSSEN als klickbare `tel:`-Links implementiert sein.| Must      | Usability     |
| FA-KON-003  | Die vollständige Adresse MUSS sichtbar dargestellt werden.          | Must      | Auftraggeber  |
| FA-KON-004  | Öffnungszeiten MÜSSEN klar und aktuell angezeigt werden.            | Must      | Auftraggeber  |
| FA-KON-005  | Ein Bestellmodal SOLL eine Zusammenfassung vor dem Anruf zeigen.    | Should    | UX            |
| FA-KON-006  | Quick-Order-Bereich SOLL im Above-the-Fold-Bereich sichtbar sein.   | Should    | Conversion    |

#### 5.2.3 Speisekarte

| ID          | Anforderung                                                         | Priorität | Quelle        |
|-------------|---------------------------------------------------------------------|-----------|---------------|
| FA-SPK-001  | Die vollständige Speisekarte MUSS als PDF zum Download bereitstehen.| Must      | Auftraggeber  |
| FA-SPK-002  | Der Download-Bereich MUSS visuell prominent gestaltet sein.         | Must      | UX            |
| FA-SPK-003  | Der Download SOLL ohne Registrierung oder Eingabe möglich sein.     | Should    | Usability     |

#### 5.2.4 Standort & Karte

| ID          | Anforderung                                                         | Priorität | Quelle        |
|-------------|---------------------------------------------------------------------|-----------|---------------|
| FA-MAP-001  | Der Standort MUSS über eine eingebettete Karte darstellbar sein.    | Must      | Auftraggeber  |
| FA-MAP-002  | Die Karte MUSS erst nach expliziter Nutzeraktion geladen werden.    | Must      | Datenschutz   |
| FA-MAP-003  | Ein „Route planen"-Link zu Google Maps SOLL bereitgestellt werden.  | Should    | UX            |
| FA-MAP-004  | Vor dem Laden SOLL ein Platzhalter mit Ladebutton angezeigt werden. | Should    | UX            |

#### 5.2.5 SEO & Marketing

| ID          | Anforderung                                                         | Priorität | Quelle        |
|-------------|---------------------------------------------------------------------|-----------|---------------|
| FA-SEO-001  | Jede Seite MUSS einen einzigartigen `<title>` besitzen.             | Must      | SEO           |
| FA-SEO-002  | Jede Seite MUSS eine einzigartige `meta description` besitzen.      | Must      | SEO           |
| FA-SEO-003  | Strukturierte Daten (Schema.org/Restaurant) MÜSSEN eingebunden sein.| Must      | SEO           |
| FA-SEO-004  | Eine XML-Sitemap MUSS erstellt und gepflegt werden.                 | Must      | SEO           |
| FA-SEO-005  | Eine robots.txt MUSS vorhanden sein.                                | Must      | SEO           |
| FA-SEO-006  | SEO-Landingpages für relevante Orte SOLLEN erstellt werden.         | Should    | Marketing     |
| FA-SEO-007  | Open Graph Tags für Social Media SOLLEN implementiert werden.       | Should    | Marketing     |
| FA-SEO-008  | Twitter Cards KÖNNEN implementiert werden.                          | Could     | Marketing     |

#### 5.2.6 Rechtliches & Compliance

| ID          | Anforderung                                                         | Priorität | Quelle        |
|-------------|---------------------------------------------------------------------|-----------|---------------|
| FA-REC-001  | Ein Impressum gemäß § 5 TMG MUSS bereitgestellt werden.             | Must      | Gesetzlich    |
| FA-REC-002  | Eine Datenschutzerklärung gemäß DSGVO MUSS bereitgestellt werden.   | Must      | Gesetzlich    |
| FA-REC-003  | Rechtliche Seiten MÜSSEN von jeder Seite erreichbar sein.           | Must      | Gesetzlich    |
| FA-REC-004  | Ein Cookie-Consent-Banner MUSS vor Tracking-Aktivierung erscheinen. | Must      | DSGVO         |
| FA-REC-005  | Externe Dienste MÜSSEN in der Datenschutzerklärung genannt werden.  | Must      | DSGVO         |

#### 5.2.7 Tracking & Analytics

| ID          | Anforderung                                                         | Priorität | Quelle        |
|-------------|---------------------------------------------------------------------|-----------|---------------|
| FA-TRK-001  | Google Analytics 4 SOLL integriert werden.                          | Should    | Marketing     |
| FA-TRK-002  | Analytics DARF nur nach Einwilligung aktiviert werden.              | Must      | DSGVO         |
| FA-TRK-003  | IP-Anonymisierung MUSS aktiviert sein.                              | Must      | DSGVO         |
| FA-TRK-004  | Telefon-Klicks SOLLEN als Events getrackt werden.                   | Should    | Analytics     |
| FA-TRK-005  | Karten-Interaktionen SOLLEN als Events getrackt werden.             | Should    | Analytics     |
| FA-TRK-006  | PDF-Downloads SOLLEN als Events getrackt werden.                    | Should    | Analytics     |

#### 5.2.8 Social & Sharing

| ID          | Anforderung                                                         | Priorität | Quelle        |
|-------------|---------------------------------------------------------------------|-----------|---------------|
| FA-SOC-001  | Ein Share-Button KANN bereitgestellt werden.                        | Could     | Marketing     |
| FA-SOC-002  | Die Web Share API SOLL genutzt werden, falls verfügbar.             | Should    | UX            |
| FA-SOC-003  | WhatsApp-Sharing SOLL als Fallback dienen.                          | Should    | UX            |

---

## 6. Nicht-funktionale Anforderungen

### 6.1 Performance

| ID          | Anforderung                                                         | Metrik                | Zielwert     |
|-------------|---------------------------------------------------------------------|-----------------------|--------------|
| NFA-PRF-001 | Die Startseite MUSS schnell laden.                                  | Time to Interactive   | < 3,5 s      |
| NFA-PRF-002 | Bilder MÜSSEN in optimierten Formaten bereitgestellt werden.        | Bildformat            | AVIF/WebP    |
| NFA-PRF-003 | Lazy Loading MUSS für Medien unterhalb des Folds genutzt werden.    | Implementation        | Ja           |
| NFA-PRF-004 | Google PageSpeed Score (Mobile) SOLL gut sein.                      | Lighthouse Score      | > 80         |
| NFA-PRF-005 | Critical CSS SOLL inline eingebunden werden.                        | Render-Blocking       | Minimiert    |

### 6.2 Usability

| ID          | Anforderung                                                         | Metrik                | Zielwert     |
|-------------|---------------------------------------------------------------------|-----------------------|--------------|
| NFA-USA-001 | Die Website MUSS responsiv sein.                                    | Breakpoints           | Mobile/Tablet/Desktop |
| NFA-USA-002 | Touch-Targets MÜSSEN ausreichend groß sein.                         | Mindestgröße          | 44x44 px     |
| NFA-USA-003 | CTAs MÜSSEN visuell hervorgehoben und eindeutig beschriftet sein.   | Design                | Klar erkennbar |
| NFA-USA-004 | Formulare (falls vorhanden) MÜSSEN validiert werden.                | Feedback              | Sofort       |
| NFA-USA-005 | Die Navigation MUSS auf allen Geräten funktional sein.              | Testing               | Bestanden    |

### 6.3 Barrierefreiheit

| ID          | Anforderung                                                         | Metrik                | Zielwert     |
|-------------|---------------------------------------------------------------------|-----------------------|--------------|
| NFA-A11Y-001| Semantisches HTML MUSS verwendet werden.                            | HTML-Validierung      | Valide       |
| NFA-A11Y-002| Bilder MÜSSEN sinnvolle Alt-Texte besitzen.                         | Alt-Attribute         | Vorhanden    |
| NFA-A11Y-003| Farbkontraste MÜSSEN ausreichend sein.                              | WCAG AA               | Kontrastverhältnis ≥ 4,5:1 |
| NFA-A11Y-004| Die Website SOLL per Tastatur navigierbar sein.                     | Keyboard-Navigation   | Funktional   |

### 6.4 Sicherheit

| ID          | Anforderung                                                         | Metrik                | Zielwert     |
|-------------|---------------------------------------------------------------------|-----------------------|--------------|
| NFA-SEC-001 | Die Website MUSS über HTTPS ausgeliefert werden.                    | TLS-Zertifikat        | Gültig       |
| NFA-SEC-002 | Keine sensiblen Daten DÜRFEN clientseitig gespeichert werden.       | Lokale Speicherung    | Keine PII    |
| NFA-SEC-003 | Externe Ressourcen SOLLEN mit Integrity-Hashes eingebunden werden.  | SRI                   | Wo möglich   |

### 6.5 Wartbarkeit

| ID          | Anforderung                                                         | Metrik                | Zielwert     |
|-------------|---------------------------------------------------------------------|-----------------------|--------------|
| NFA-WAR-001 | Der Code MUSS lesbar und dokumentiert sein.                         | Kommentare            | Vorhanden    |
| NFA-WAR-002 | Inhalte MÜSSEN ohne technisches Wissen änderbar sein (PDF-Tausch).  | Aufwand               | < 5 min      |
| NFA-WAR-003 | Die Struktur SOLL modular und erweiterbar sein.                     | Architektur           | Klar getrennt|

### 6.6 Kompatibilität

| ID          | Anforderung                                                         | Metrik                | Zielwert     |
|-------------|---------------------------------------------------------------------|-----------------------|--------------|
| NFA-KOM-001 | Die Website MUSS in aktuellen Browsern funktionieren.               | Browser               | Chrome, Firefox, Safari, Edge (aktuelle Version) |
| NFA-KOM-002 | Die Website MUSS auf iOS und Android funktionieren.                 | Mobile OS             | iOS 14+, Android 10+ |

---

## 7. Randbedingungen und Einschränkungen

### 7.1 Technische Randbedingungen

| ID          | Randbedingung                                                       | Auswirkung                              |
|-------------|---------------------------------------------------------------------|-----------------------------------------|
| RB-TEC-001  | Umsetzung als statische Website (HTML/CSS/JS)                       | Kein serverseitiges Processing          |
| RB-TEC-002  | Keine serverseitige Logik (PHP, Node.js, etc.)                      | Einschränkung bei dynamischen Features  |
| RB-TEC-003  | Hosting erfolgt auf statischem Webspace                             | Begrenzte Serverkonfiguration           |

### 7.2 Organisatorische Randbedingungen

| ID          | Randbedingung                                                       | Auswirkung                              |
|-------------|---------------------------------------------------------------------|-----------------------------------------|
| RB-ORG-001  | Inhalte werden vom Auftraggeber bereitgestellt                      | Abhängigkeit bei Content-Erstellung     |
| RB-ORG-002  | Speisekarte liegt als fertiges PDF vor                              | Kein Redesign erforderlich              |
| RB-ORG-003  | Domain und Hosting bereits vorhanden                                | Keine Beschaffung notwendig             |

### 7.3 Rechtliche Randbedingungen

| ID          | Randbedingung                                                       | Auswirkung                              |
|-------------|---------------------------------------------------------------------|-----------------------------------------|
| RB-REC-001  | DSGVO-Konformität zwingend erforderlich                             | Cookie-Consent, Datenschutzerklärung    |
| RB-REC-002  | Impressumspflicht nach § 5 TMG                                      | Vollständiges Impressum                 |
| RB-REC-003  | Zielregion Deutschland                                              | Deutsche Sprache, DE-Recht              |

### 7.4 Externe Abhängigkeiten

| ID          | Abhängigkeit                 | Anbieter        | Risiko                                  |
|-------------|------------------------------|-----------------|----------------------------------------|
| EA-001      | Google Fonts                 | Google          | Verfügbarkeit, DSGVO-Hinweis erforderlich |
| EA-002      | Font Awesome CDN             | Fonticons       | Verfügbarkeit                          |
| EA-003      | Google Maps Embed            | Google          | DSGVO-Hinweis, Consent erforderlich    |
| EA-004      | Google Analytics 4           | Google          | DSGVO-Hinweis, Consent erforderlich    |

---

## 8. Abnahmekriterien

### 8.1 Formale Abnahmekriterien

| ID          | Kriterium                                                           | Nachweis              |
|-------------|---------------------------------------------------------------------|-----------------------|
| AK-FOR-001  | Alle Must-Have-Anforderungen sind implementiert.                    | Testprotokoll         |
| AK-FOR-002  | Keine kritischen oder schwerwiegenden Fehler offen.                 | Fehlerliste           |
| AK-FOR-003  | Dokumentation ist vollständig übergeben.                            | Dokumentenliste       |
| AK-FOR-004  | Schulung/Einweisung ist erfolgt.                                    | Protokoll             |

### 8.2 Funktionale Abnahmekriterien

| ID          | Kriterium                                                           | Testmethode           |
|-------------|---------------------------------------------------------------------|-----------------------|
| AK-FUN-001  | Alle Seiten sind erreichbar und verlinkt.                           | Manueller Test        |
| AK-FUN-002  | Telefonlinks öffnen Telefon-App auf Mobile.                         | Gerätetest            |
| AK-FUN-003  | Speisekarte-PDF ist downloadbar.                                    | Download-Test         |
| AK-FUN-004  | Google Maps lädt erst nach Klick.                                   | Manueller Test        |
| AK-FUN-005  | Cookie-Banner erscheint bei Erstbesuch.                             | Inkognito-Test        |
| AK-FUN-006  | Analytics wird nur nach Consent aktiviert.                          | Netzwerkanalyse       |

### 8.3 Nicht-funktionale Abnahmekriterien

| ID          | Kriterium                                                           | Testmethode           |
|-------------|---------------------------------------------------------------------|-----------------------|
| AK-NFU-001  | Website ist responsiv (Mobile/Tablet/Desktop).                      | Multi-Device-Test     |
| AK-NFU-002  | Ladezeit < 3,5 Sekunden (3G-Simulation).                            | Lighthouse            |
| AK-NFU-003  | Keine kritischen Accessibility-Fehler.                              | Lighthouse A11Y       |
| AK-NFU-004  | HTTPS aktiv und Zertifikat gültig.                                  | SSL-Check             |

---

## 9. Glossar

| Begriff                | Definition                                                                        |
|------------------------|-----------------------------------------------------------------------------------|
| Above-the-Fold         | Der sichtbare Bereich einer Webseite ohne Scrollen.                               |
| AVIF                   | AV1 Image File Format – modernes, effizientes Bildformat.                         |
| CTA                    | Call-to-Action – Handlungsaufforderung (z. B. Button).                            |
| DSGVO                  | Datenschutz-Grundverordnung der EU.                                               |
| Hamburger-Menü         | Dreistrich-Icon für mobile Navigation.                                            |
| Lazy Loading           | Nachladen von Inhalten erst bei Sichtbarkeit.                                     |
| Must-Have              | Zwingend erforderliche Anforderung.                                               |
| Schema.org             | Vokabular für strukturierte Daten im Web.                                         |
| SEO                    | Search Engine Optimization – Suchmaschinenoptimierung.                            |
| Should-Have            | Wichtige, aber nicht zwingende Anforderung.                                       |
| Sitemap                | XML-Datei mit Auflistung aller URLs für Suchmaschinen.                            |
| TMG                    | Telemediengesetz – deutsches Gesetz zur Impressumspflicht.                        |
| TLS                    | Transport Layer Security – Verschlüsselungsprotokoll (HTTPS).                     |
| Web Share API          | Browser-API zum Teilen von Inhalten mit nativen Apps.                             |

---

## 10. Anhänge

### Anhang A: Seitenstruktur (Sitemap)

```
beelen-doenerbude.de/
├── index.html                    (Startseite)
├── impressum.html                (Impressum)
├── datenschutz.html              (Datenschutzerklärung)
├── doener-in-der-naehe.html      (SEO-Hub-Seite)
├── doener-warendorf.html         (SEO-Landingpage)
├── doener-ahlen.html             (SEO-Landingpage)
├── doener-guetersloh.html        (SEO-Landingpage)
├── doener-rheda-wiedenbrueck.html(SEO-Landingpage)
├── doener-oelde.html             (SEO-Landingpage)
├── doener-beckum.html            (SEO-Landingpage)
├── doener-ennigerloh.html        (SEO-Landingpage)
├── doener-everswinkel.html       (SEO-Landingpage)
├── doener-sassenberg.html        (SEO-Landingpage)
├── doener-telgte.html            (SEO-Landingpage)
├── doener-harsewinkel.html       (SEO-Landingpage)
├── Speisekarte.pdf               (Download)
├── sitemap.xml                   (SEO)
└── robots.txt                    (SEO)
```

### Anhang B: Wireframes

*[Wireframes werden separat als Bilddateien bereitgestellt]*

### Anhang C: Kontaktdaten Auftraggeber

**Dönerbude Beelen**
Inhaber: Yurtsever Baran
Warendorferstraße 21
48361 Beelen
Telefon: 02586 88 2 88 66

---

**Ende des Dokuments**

---

*Dieses Dokument ist vertraulich und nur für die benannten Projektbeteiligten bestimmt.*
