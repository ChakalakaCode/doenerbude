# PFLICHTENHEFT

## Webpräsenz „Dönerbude Beelen“

### Technische Spezifikation & Realisierungskonzept

---

| **Dokumenttyp**       | Pflichtenheft (Technische Spezifikation)       |
|-----------------------|------------------------------------------------|
| **Projekt**           | Dönerbude Beelen – Webpräsenz                  |
| **Auftraggeber**      | Dönerbude Beelen, Inh. Yurtsever Baran         |
| **Auftragnehmer**     | [Auftragnehmer eintragen]                      |
| **Dokument-ID**       | PH-DOENERBUDE-2026-001                         |
| **Version**           | 1.0                                            |
| **Status**            | Freigegeben                                    |
| **Klassifizierung**   | Vertraulich – nur für Projektbeteiligte        |
| **Bezugsdokument**    | LH-DOENERBUDE-2026-001 (Lastenheft)            |

---

## Änderungshistorie

| Version | Datum       | Autor                | Änderungen                              | Review         |
|---------|-------------|----------------------|-----------------------------------------|----------------|
| 0.1     | 2025-10-15  | Entwicklungsteam     | Initialer Entwurf                       | —              |
| 0.5     | 2025-11-20  | Entwicklungsteam     | Architektur finalisiert                 | Projektleitung |
| 0.9     | 2025-12-15  | Entwicklungsteam     | Review-Feedback eingearbeitet           | QA             |
| 1.0     | 2026-01-05  | Projektleitung       | Finale Freigabe                         | Auftraggeber   |

---

## Freigabe

| Rolle              | Name               | Datum       | Unterschrift         |
|--------------------|--------------------|-------------|----------------------|
| Auftragnehmer      | [Name]             | ________    | ____________________ |
| Projektleitung     | [Name]             | ________    | ____________________ |
| Technische Leitung | [Name]             | ________    | ____________________ |
| Auftraggeber       | Yurtsever Baran    | ________    | ____________________ |

---

## Inhaltsverzeichnis

1. [Einleitung](#1-einleitung)
2. [Systemarchitektur](#2-systemarchitektur)
3. [Technische Spezifikation](#3-technische-spezifikation)
4. [Komponentenbeschreibung](#4-komponentenbeschreibung)
5. [Benutzeroberfläche](#5-benutzeroberfläche)
6. [Datenmodell](#6-datenmodell)
7. [Schnittstellenspezifikation](#7-schnittstellenspezifikation)
8. [Sicherheitskonzept](#8-sicherheitskonzept)
9. [Performance-Konzept](#9-performance-konzept)
10. [Qualitätssicherung](#10-qualitätssicherung)
11. [Deployment & Betrieb](#11-deployment--betrieb)
12. [Risikomanagement](#12-risikomanagement)

---

## 1. Einleitung

### 1.1 Zweck des Dokuments

Das Pflichtenheft beschreibt die technische Realisierung der im Lastenheft (LH-DOENERBUDE-2026-001) definierten Anforderungen. Es dient als verbindliche technische Spezifikation für die Implementierung.

### 1.2 Anforderungsrückverfolgung

| Lastenheft-Anforderung | Pflichtenheft-Kapitel | Status       |
|------------------------|-----------------------|--------------|
| FA-NAV-001 – 005       | 4.1, 5.1              | Spezifiziert |
| FA-KON-001 – 006       | 4.2, 5.2              | Spezifiziert |
| FA-SPK-001 – 003       | 4.3                   | Spezifiziert |
| FA-MAP-001 – 004       | 4.4, 7.2              | Spezifiziert |
| FA-SEO-001 – 008       | 4.5                   | Spezifiziert |
| FA-REC-001 – 005       | 8                     | Spezifiziert |
| FA-TRK-001 – 006       | 7.1                   | Spezifiziert |
| NFA-PRF-001 – 005      | 9                     | Spezifiziert |

---

## 2. Systemarchitektur

### 2.1 Architekturübersicht

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SYSTEMARCHITEKTUR                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    CLIENT (BROWSER)                               │  │
│  │                                                                   │  │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │  │
│  │   │   HTML5     │  │   CSS3      │  │ JavaScript  │               │  │
│  │   │ (Struktur)  │  │  (Styling)  │  │  (ES6+)     │               │  │
│  │   └─────────────┘  └─────────────┘  └─────────────┘               │  │
│  │                          │                                        │  │
│  │                          ▼                                        │  │
│  │   ┌───────────────────────────────────────────────────────────┐   │  │
│  │   │              DOM (Document Object Model)                  │   │  │
│  │   │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │   │  │
│  │   │  │ Header │ │  Hero  │ │Sections│ │ Modal  │ │ Footer │   │   │  │
│  │   │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │   │  │
│  │   └───────────────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                │                                        │
│  ┌─────────────────────────────┼─────────────────────────────────────┐  │
│  │              EXTERNE DIENSTE (CDN / API)                          │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐              │  │
│  │  │  Google  │ │  Google  │ │  Google  │ │   Font   │              │  │
│  │  │  Fonts   │ │Analytics │ │   Maps   │ │ Awesome  │              │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘              │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                │                                        │
│  ┌─────────────────────────────┼─────────────────────────────────────┐  │
│  │                    WEBSERVER (HOSTING)                            │  │
│  │         Statische Auslieferung │ TLS/HTTPS │ Caching              │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Technologie-Stack

| Schicht           | Technologie              | Version/Details                    |
|-------------------|--------------------------|------------------------------------|
| Markup            | HTML5                    | Semantisches HTML                  |
| Styling           | CSS3                     | Custom Properties, Flexbox, Grid   |
| Schriftart        | Google Fonts             | Poppins (300–900)                  |
| Icons             | Font Awesome             | 6.0.0 (CDN)                        |
| Scripting         | Vanilla JavaScript       | ES6+ (kein Framework)              |
| Analytics         | Google Analytics 4       | gtag.js                            |
| Karten            | Google Maps Embed API    | iframe-Integration                 |
| Hosting           | Statischer Webserver     | Apache/Nginx mit TLS               |

### 2.3 Dateistruktur

```
beelen-doenerbude.de/
│
├── index.html                      # Startseite (Haupt-Entry-Point)
├── impressum.html                  # Impressum (§5 TMG)
├── datenschutz.html                # Datenschutzerklärung (DSGVO)
│
├── doener-in-der-naehe.html        # SEO-Hub: Regionale Übersicht
├── doener-warendorf.html           # SEO-Landingpage
├── doener-ahlen.html               # SEO-Landingpage
├── doener-guetersloh.html          # SEO-Landingpage
├── [... weitere SEO-Seiten]
│
├── styles.css                      # Haupt-Stylesheet (~3700 Zeilen)
├── script.js                       # Haupt-JavaScript (~600 Zeilen)
│
├── Speisekarte.pdf                 # Speisekarte (~3.7 MB)
│
├── berlin.png / berlin.jpg         # Logo-Assets
├── hero-background.avif            # Hero-Hintergrund (AVIF)
├── [... weitere Medien]
│
├── favicon.ico                     # Favicon
├── sitemap.xml                     # XML-Sitemap
├── robots.txt                      # Crawler-Anweisungen
├── .htaccess                       # Apache-Konfiguration
└── CNAME                           # Domain-Konfiguration
```

---

## 3. Technische Spezifikation

### 3.1 HTML-Spezifikation

| Aspekt                | Spezifikation                                      |
|-----------------------|----------------------------------------------------|
| Doctype               | `<!DOCTYPE html>`                                  |
| Sprache               | `lang="de"`                                        |
| Zeichensatz           | UTF-8                                              |
| Viewport              | `width=device-width, initial-scale=1.0`            |
| Semantische Elemente  | `<header>`, `<main>`, `<section>`, `<footer>`      |

### 3.2 CSS-Spezifikation

| Aspekt                | Spezifikation                                      |
|-----------------------|----------------------------------------------------|
| Layout                | Flexbox, CSS Grid                                  |
| Responsive            | Mobile-First mit Media Queries                     |
| Breakpoints           | 768px (Mobile/Tablet), 992px (Desktop)             |
| Animationen           | CSS Transitions, @keyframes                        |

#### 3.2.1 Farbschema

| Farbe                 | Hex-Code    | Verwendung                         |
|-----------------------|-------------|------------------------------------|
| Primär (Gold)         | `#ffd700`   | CTA-Buttons, Akzente, Logo         |
| Hintergrund Dunkel    | `#000000`   | Header, Sections, Footer           |
| Hintergrund Hell      | `#1a1a1a`   | Karten, Menü-Sections              |
| Text Hell             | `#ffffff`   | Text auf dunklem Hintergrund       |
| Akzent Rot            | `#e74c3c`   | Sekundäre Buttons                  |
| Erfolg                | `#27ae60`   | Bestätigungen                      |

### 3.3 JavaScript-Spezifikation

| Aspekt                | Spezifikation                                      |
|-----------------------|----------------------------------------------------|
| ECMAScript-Version    | ES6+ (const, let, arrow functions)                 |
| Bibliotheken          | Keine (Vanilla JS)                                 |
| Event-Handling        | addEventListener                                   |
| DOM-Manipulation      | querySelector, classList, createElement            |

---

## 4. Komponentenbeschreibung

### 4.1 Navigation (FA-NAV-001 – 005)

#### Desktop-Navigation
- Fixierter Header mit Logo und Navigationslinks
- Dropdown-Menü für rechtliche Seiten

#### Mobile-Navigation (Hamburger)

| Element               | Verhalten                                          |
|-----------------------|----------------------------------------------------|
| `.hamburger`          | Toggle-Button (3 Spans)                            |
| `.nav-menu.active`    | Menü wird eingeblendet                             |
| Klick auf Link        | Menü schließt automatisch                          |

#### Scroll-Verhalten
- Smooth Scrolling mit 80px Header-Offset
- Header-Schatten verstärkt bei Scroll > 100px

### 4.2 Kontakt & Bestellung (FA-KON-001 – 006)

#### Telefon-Integration

| Platzierung           | Element-Typ           | CSS-Klasse            |
|-----------------------|-----------------------|-----------------------|
| Navigation            | `<a href="tel:...">`  | `.order-btn`          |
| Hero Quick-Info       | `<a href="tel:...">`  | `.info-item a`        |
| Quick-Order Section   | `<a href="tel:...">`  | `.phone-number`       |
| Kontakt-Bereich       | `<a href="tel:...">`  | `.contact-item a`     |
| Order-Modal           | `<a href="tel:...">`  | `.btn.btn-primary`    |
| Footer                | `<a href="tel:...">`  | —                     |

#### Order-Modal
- Lokaler Warenkorb (`cart` Array)
- Modal zeigt Bestellübersicht
- CTA führt zur telefonischen Bestellung

### 4.3 Speisekarte-Download (FA-SPK-001 – 003)

| Aspekt                | Implementation                                     |
|-----------------------|----------------------------------------------------|
| Element               | `<a href="Speisekarte.pdf" download>`              |
| Styling               | Prominenter Button mit Icon                        |
| Event-Tracking        | `click_menu_pdf` Event                             |

### 4.4 Google Maps Integration (FA-MAP-001 – 004)

**Click-to-Load Pattern:**
1. Placeholder mit Button wird angezeigt
2. Bei Klick: iframe wird dynamisch erstellt
3. Google Maps Embed wird geladen

### 4.5 SEO-Implementierung (FA-SEO-001 – 008)

| Element               | Implementation                                     |
|-----------------------|----------------------------------------------------|
| Title-Tags            | Einzigartig pro Seite                              |
| Meta Description      | Einzigartig pro Seite                              |
| Canonical URLs        | Gesetzt                                            |
| Open Graph            | og:title, og:description, og:image                 |
| Schema.org            | Restaurant-Markup (JSON-LD)                        |
| Sitemap               | XML-Format, alle Seiten                            |

---

## 5. Benutzeroberfläche

### 5.1 Seitenlayout

```
┌─────────────────────────────────────────────────┐
│              HEADER (Fixed, 85px)               │
├─────────────────────────────────────────────────┤
│              HERO SECTION                       │
│   [Headline] [Quick Info] [CTAs]    [Logo]      │
├─────────────────────────────────────────────────┤
│              VIDEO SECTION                      │
├─────────────────────────────────────────────────┤
│              QUICK ORDER + MAPS                 │
├─────────────────────────────────────────────────┤
│              ANGEBOTE                           │
├─────────────────────────────────────────────────┤
│              SPEISEKARTE DOWNLOAD               │
├─────────────────────────────────────────────────┤
│              KONTAKT & ÖFFNUNGSZEITEN           │
├─────────────────────────────────────────────────┤
│              ÜBER UNS                           │
├─────────────────────────────────────────────────┤
│              FOOTER                             │
└─────────────────────────────────────────────────┘
```

### 5.2 Responsive Breakpoints

| Breakpoint     | Viewport            | Anpassungen                          |
|----------------|---------------------|--------------------------------------|
| Mobile         | < 768px             | Hamburger-Menü, einspaltiges Layout  |
| Tablet         | 768px – 991px       | Hamburger-Menü, zweispaltiges Layout |
| Desktop        | ≥ 992px             | Vollständige Navigation, Grid-Layout |

---

## 6. Datenmodell

### 6.1 Statische Inhalte

| Datentyp               | Speicherort          | Format               |
|------------------------|----------------------|----------------------|
| Kontaktdaten           | `index.html`         | Inline-Text          |
| Öffnungszeiten         | `index.html`         | Inline-Text          |
| Rechtliche Texte       | `*.html`             | Inline-Text          |
| Speisekarte            | `Speisekarte.pdf`    | PDF-Datei            |

### 6.2 Client-seitiger Zustand

| Zustand                | Speicherung          | Persistenz           |
|------------------------|----------------------|----------------------|
| `cart` (Warenkorb)     | JavaScript-Variable  | Session              |
| `cookieConsent`        | localStorage         | Persistent           |

---

## 7. Schnittstellenspezifikation

### 7.1 Google Analytics 4 (FA-TRK-001 – 006)

| Aspekt                | Details                                            |
|-----------------------|----------------------------------------------------|
| Measurement ID        | `G-KMLFEZJ49P`                                     |
| Initialisierung       | Nach Cookie-Consent                                |
| IP-Anonymisierung     | GA4 Standard (automatisch)                         |

#### Event-Tracking

| Event-Name            | Trigger                    | Parameter                    |
|-----------------------|----------------------------|------------------------------|
| `click_call`          | Klick auf `tel:`-Link      | `location`                   |
| `click_menu_pdf`      | Klick auf PDF-Download     | `location`                   |
| `click_map_load`      | Klick auf "Karte laden"    | —                            |
| `click_share_button`  | Klick auf Share-Button     | `method`                     |

### 7.2 Google Maps Embed

| Parameter             | Wert                                               |
|-----------------------|----------------------------------------------------|
| Basis-URL             | `https://www.google.com/maps`                      |
| Query                 | `Warendorferstraße+21,+48361+Beelen`               |
| Laden                 | On-Click (nicht automatisch)                       |

---

## 8. Sicherheitskonzept

### 8.1 Datenschutz & DSGVO (FA-REC-001 – 005)

#### Cookie-Consent-Banner

| Aspekt                | Implementation                                     |
|-----------------------|----------------------------------------------------|
| Trigger               | Bei fehlendem `cookieConsent` in localStorage      |
| Optionen              | "Nur notwendige" / "Alle akzeptieren"              |
| GA-Aktivierung        | Erst nach Consent                                  |

### 8.2 Transport-Sicherheit

| Aspekt                | Anforderung                                        |
|-----------------------|----------------------------------------------------|
| Protokoll             | HTTPS (TLS 1.2+)                                   |
| Zertifikat            | Gültiges SSL-Zertifikat                            |

---

## 9. Performance-Konzept

### 9.1 Optimierungsmaßnahmen

| Maßnahme              | Implementation                                     |
|-----------------------|----------------------------------------------------|
| Bildoptimierung       | AVIF-Format                                        |
| Lazy Loading          | `loading="lazy"` für Bilder                        |
| Video Lazy Load       | IntersectionObserver                               |
| Map Click-to-Load     | Erst bei Nutzeraktion                              |
| Font Preload          | `<link rel="preconnect">`                          |
| Throttle              | Scroll/Resize Events gedrosselt                    |

### 9.2 Performance-Ziele

| Metrik                     | Zielwert             |
|----------------------------|----------------------|
| Time to Interactive        | < 3.5 s              |
| PageSpeed Score (Mobile)   | > 80                 |
| Cumulative Layout Shift    | < 0.1                |

---

## 10. Qualitätssicherung

### 10.1 Testarten

| Testart               | Beschreibung                                       |
|-----------------------|----------------------------------------------------|
| Funktionale Tests     | Manuelle Tests aller User Stories                  |
| Cross-Browser-Tests   | Chrome, Firefox, Safari, Edge                      |
| Mobile-Tests          | iOS Safari, Android Chrome                         |
| Performance-Tests     | Lighthouse Audits                                  |
| Accessibility-Tests   | Lighthouse A11Y                                    |

---

## 11. Deployment & Betrieb

### 11.1 Deployment-Prozess

1. Lokale Entwicklung
2. Review/Test
3. Upload auf Produktionsserver (FTP/SSH)

### 11.2 Server-Konfiguration

- Caching via `.htaccess`
- Gzip-Kompression aktiviert
- TLS/HTTPS konfiguriert

---

## 12. Risikomanagement

### 12.1 Technische Risiken

| Risiko                | Wahrscheinlichkeit | Maßnahme                        |
|-----------------------|--------------------|----------------------------------|
| CDN-Ausfall           | Niedrig            | Fallback-Fonts                   |
| Browser-Inkompatibilität | Niedrig         | Testing, moderne Standards       |
| Performance-Probleme  | Mittel             | Monitoring, Optimierung          |

### 12.2 Organisatorische Risiken

| Risiko                | Wahrscheinlichkeit | Maßnahme                        |
|-----------------------|--------------------|----------------------------------|
| SSL-Zertifikat-Ablauf | Mittel             | Auto-Renewal                     |
| Domain-Verlängerung   | Niedrig            | Kalender-Erinnerung              |

---

**Ende des Dokuments**

---

*Dieses Dokument ist vertraulich und nur für die benannten Projektbeteiligten bestimmt.*
