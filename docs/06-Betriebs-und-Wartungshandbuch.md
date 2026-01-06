# BETRIEBS- UND WARTUNGSHANDBUCH

## Webpräsenz „Dönerbude Beelen"

### Operations & Maintenance Guide

---

| **Dokumenttyp**       | Betriebs- und Wartungshandbuch                     |
|-----------------------|----------------------------------------------------|
| **Projekt**           | Dönerbude Beelen – Webpräsenz                      |
| **Dokument-ID**       | WH-DOENERBUDE-2026-001                             |
| **Version**           | 1.0                                                |
| **Status**            | Freigegeben                                        |
| **Zielgruppe**        | Betreiber, Administratoren, Webmaster              |

---

## Änderungshistorie

| Version | Datum       | Autor             | Änderungen                    |
|---------|-------------|-------------------|-------------------------------|
| 1.0     | 2026-01-05  | Projektteam       | Initiale Version              |

---

## Inhaltsverzeichnis

1. [Systemübersicht](#1-systemübersicht)
2. [Hosting & Infrastruktur](#2-hosting--infrastruktur)
3. [Deployment-Prozess](#3-deployment-prozess)
4. [Inhaltspflege](#4-inhaltspflege)
5. [Wartungsarbeiten](#5-wartungsarbeiten)
6. [Monitoring & Analytics](#6-monitoring--analytics)
7. [Sicherheit](#7-sicherheit)
8. [Backup & Recovery](#8-backup--recovery)
9. [Fehlerbehebung](#9-fehlerbehebung)
10. [Kontakte & Eskalation](#10-kontakte--eskalation)

---

## 1. Systemübersicht

### 1.1 Systemarchitektur

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CDN / WEBSERVER                               │
│                    (Apache/Nginx)                                │
│                    HTTPS (TLS 1.2+)                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STATISCHE WEBSITE                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────────┐ │
│  │  HTML   │  │   CSS   │  │   JS    │  │  Assets (Bilder,    │ │
│  │  Seiten │  │ Styles  │  │ Script  │  │  Videos, PDF)       │ │
│  └─────────┘  └─────────┘  └─────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNE DIENSTE                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │Google Fonts │  │Google Maps  │  │ Google Analytics (GA4)  │  │
│  │  (CDN)      │  │  (Embed)    │  │ (nach Consent)          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Technologie-Stack

| Komponente            | Technologie                                        |
|-----------------------|----------------------------------------------------|
| Frontend              | HTML5, CSS3, Vanilla JavaScript                    |
| Hosting               | Statisches Webhosting (Apache/Nginx)               |
| SSL/TLS               | Let's Encrypt oder Provider-Zertifikat             |
| Analytics             | Google Analytics 4                                 |
| Maps                  | Google Maps Embed API                              |
| Fonts                 | Google Fonts, Font Awesome                         |

### 1.3 Dateistruktur

```
/
├── index.html              # Startseite
├── impressum.html          # Impressum
├── datenschutz.html        # Datenschutzerklärung
├── doener-*.html           # SEO-Landingpages
├── styles.css              # Haupt-Stylesheet
├── script.js               # JavaScript-Logik
├── Speisekarte.pdf         # Speisekarte (Download)
├── sitemap.xml             # SEO Sitemap
├── robots.txt              # Crawler-Anweisungen
├── .htaccess               # Server-Konfiguration (Apache)
├── favicon.ico             # Favicon
└── assets/                 # Medien-Ordner
    ├── images/             # Bilder (AVIF, JPG, PNG)
    └── videos/             # Videos (MP4)
```

---

## 2. Hosting & Infrastruktur

### 2.1 Server-Anforderungen

| Anforderung           | Minimum                    | Empfohlen                  |
|-----------------------|----------------------------|----------------------------|
| Webserver             | Apache 2.4+ / Nginx 1.18+  | Aktuelle stabile Version   |
| PHP                   | Nicht erforderlich         | —                          |
| Datenbank             | Nicht erforderlich         | —                          |
| SSL/TLS               | TLS 1.2                    | TLS 1.3                    |
| Speicherplatz         | 100 MB                     | 500 MB                     |

### 2.2 Domain-Konfiguration

| Einstellung           | Wert                                               |
|-----------------------|----------------------------------------------------|
| Primäre Domain        | `www.doenerbude-beelen.de` (Beispiel)              |
| Redirect              | non-www → www (oder umgekehrt)                     |
| HTTPS                 | Erzwungen (HTTP → HTTPS Redirect)                  |

### 2.3 Server-Konfiguration (.htaccess)

```apache
# HTTPS erzwingen
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Caching für statische Assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Gzip-Kompression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

---

## 3. Deployment-Prozess

### 3.1 Deployment-Workflow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Lokale     │───▶│   Review    │───▶│   Upload    │───▶│   Live      │
│  Änderung   │    │   & Test    │    │   (FTP/SSH) │    │   Prüfung   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### 3.2 Deployment-Checkliste

| Schritt | Aktion                                   | Status |
|---------|------------------------------------------|--------|
| 1       | Änderungen lokal testen                  | ☐      |
| 2       | Browser-Cache leeren und testen          | ☐      |
| 3       | Mobile-Ansicht prüfen                    | ☐      |
| 4       | Dateien per FTP/SSH hochladen            | ☐      |
| 5       | Website im Browser prüfen (Hard Refresh) | ☐      |
| 6       | Telefon-Links testen                     | ☐      |
| 7       | PDF-Download testen                      | ☐      |

### 3.3 Upload-Methoden

| Methode               | Tool                       | Verwendung                 |
|-----------------------|----------------------------|----------------------------|
| FTP                   | FileZilla, WinSCP          | Standard-Upload            |
| SFTP                  | FileZilla, WinSCP          | Sichere Übertragung        |
| SSH/SCP               | Terminal, PuTTY            | Kommandozeile              |
| Git Deploy            | git push (wenn konfiguriert)| Automatisiert              |

---

## 4. Inhaltspflege

### 4.1 Telefonnummer ändern

**Betroffene Dateien:**

| Datei                 | Vorkommen                                          |
|-----------------------|----------------------------------------------------|
| `index.html`          | Header, Quick-Order, Kontakt, Footer, Modal        |
| `impressum.html`      | Kontaktdaten                                       |
| `datenschutz.html`    | Ggf. Kontaktdaten                                  |

**Anleitung:**

1. Öffnen Sie die Dateien in einem Texteditor
2. Suchen Sie nach: `tel:+4925868828866`
3. Ersetzen Sie mit der neuen Nummer im Format: `tel:+49XXXXXXXXXXX`
4. Suchen Sie auch nach der lesbaren Nummer: `02586 8828866`
5. Speichern und hochladen

---

### 4.2 Adresse ändern

**Betroffene Dateien:**

| Datei                 | Bereich                                            |
|-----------------------|----------------------------------------------------|
| `index.html`          | Kontaktbereich, Schema.org Markup                  |
| `impressum.html`      | Adressangaben                                      |

**Anleitung:**

1. Suchen Sie nach: `Warendorfer Straße 21`
2. Ersetzen Sie mit der neuen Adresse
3. Aktualisieren Sie auch die PLZ: `48361 Beelen`
4. Prüfen Sie das Schema.org JSON-LD im `<head>`

---

### 4.3 Öffnungszeiten ändern

**Betroffene Dateien:** `index.html`

**Anleitung:**

1. Suchen Sie den Kontaktbereich
2. Aktualisieren Sie die Zeiten
3. Prüfen Sie auch das Schema.org Markup (`openingHours`)

---

### 4.4 Speisekarte austauschen

| Schritt | Aktion                                             |
|---------|----------------------------------------------------|
| 1       | Neue PDF erstellen mit Namen: `Speisekarte.pdf`    |
| 2       | Alte Datei auf dem Server ersetzen                 |
| 3       | Download im Browser testen                         |

> ⚠️ **Wichtig:** Der Dateiname muss exakt `Speisekarte.pdf` lauten (Groß-/Kleinschreibung beachten).

---

### 4.5 Neue SEO-Landingpage erstellen

| Schritt | Aktion                                             |
|---------|----------------------------------------------------|
| 1       | Bestehende Datei kopieren (z.B. `doener-warendorf.html`) |
| 2       | Datei umbenennen: `doener-<neuer-ort>.html`        |
| 3       | Title-Tag anpassen                                 |
| 4       | Meta-Description anpassen                          |
| 5       | Inhalt ortsspezifisch anpassen                     |
| 6       | In `sitemap.xml` eintragen                         |
| 7       | Alle Dateien hochladen                             |

---

## 5. Wartungsarbeiten

### 5.1 Regelmäßige Wartung

| Intervall      | Aufgabe                              | Verantwortlich |
|----------------|--------------------------------------|----------------|
| Wöchentlich    | Website-Funktion prüfen              | Betreiber      |
| Monatlich      | Speisekarte aktualisieren (bei Bedarf)| Betreiber     |
| Quartal        | SSL-Zertifikat prüfen                | Webmaster      |
| Jährlich       | Domain-Verlängerung prüfen           | Betreiber      |
| Jährlich       | Datenschutzerklärung prüfen          | Betreiber      |

### 5.2 Wartungs-Checkliste

| Prüfpunkt                            | Status | Datum      |
|--------------------------------------|--------|------------|
| Alle Seiten laden korrekt            | ☐      | __________ |
| Telefon-Links funktionieren          | ☐      | __________ |
| Speisekarte-Download funktioniert    | ☐      | __________ |
| Google Maps lädt nach Klick          | ☐      | __________ |
| Impressum/Datenschutz aktuell        | ☐      | __________ |
| SSL-Zertifikat gültig                | ☐      | __________ |
| Keine horizontalen Scrollbars        | ☐      | __________ |

---

## 6. Monitoring & Analytics

### 6.1 Google Analytics 4

| Einstellung           | Wert                                               |
|-----------------------|----------------------------------------------------|
| Property              | Dönerbude Beelen                                   |
| Measurement ID        | `G-KMLFEZJ49P`                                     |
| Datenaufbewahrung     | 14 Monate                                          |

### 6.2 Wichtige Metriken

| Metrik                | Beschreibung                       | Ziel           |
|-----------------------|------------------------------------|----------------|
| Seitenaufrufe         | Gesamte Aufrufe                    | Wachstum       |
| Telefon-Klicks        | Event `click_call`                 | Tracking       |
| PDF-Downloads         | Event `click_menu_pdf`             | Tracking       |
| Karten-Klicks         | Event `click_map_load`             | Tracking       |

### 6.3 Analytics-Zugang

Der Zugang zu Google Analytics erfolgt über:
- Google Analytics: `analytics.google.com`
- Login mit dem verknüpften Google-Konto

---

## 7. Sicherheit

### 7.1 Sicherheitsmaßnahmen

| Maßnahme              | Status       | Details                            |
|-----------------------|--------------|------------------------------------|
| HTTPS                 | ✓ Aktiv      | Alle Seiten per HTTPS              |
| Content Security Policy| Optional    | Kann in .htaccess konfiguriert werden |
| X-Frame-Options       | Empfohlen    | `DENY` oder `SAMEORIGIN`           |

### 7.2 Sicherheits-Checkliste

| Prüfpunkt                            | Status |
|--------------------------------------|--------|
| SSL-Zertifikat gültig (nicht abgelaufen) | ☐  |
| HTTP → HTTPS Redirect aktiv          | ☐      |
| Keine sensiblen Daten im Frontend    | ☐      |
| Externe Ressourcen über HTTPS        | ☐      |

---

## 8. Backup & Recovery

### 8.1 Backup-Strategie

| Backup-Typ            | Quelle               | Häufigkeit    | Aufbewahrung |
|-----------------------|----------------------|---------------|--------------|
| Repository            | Git-Repository       | Kontinuierlich| Unbegrenzt   |
| Produktiv-Dateien     | Webserver            | Monatlich     | 6 Monate     |
| Speisekarte           | Lokale Kopie         | Bei Änderung  | Unbegrenzt   |

### 8.2 Backup durchführen

| Schritt | Aktion                                             |
|---------|----------------------------------------------------|
| 1       | Per FTP alle Dateien vom Server herunterladen      |
| 2       | In ZIP-Archiv packen mit Datum                     |
| 3       | Auf externem Speicher ablegen                      |

### 8.3 Recovery (Wiederherstellung)

| Schritt | Aktion                                             |
|---------|----------------------------------------------------|
| 1       | Letztes Backup entpacken                           |
| 2       | Alle Dateien per FTP hochladen                     |
| 3       | Website im Browser testen                          |

---

## 9. Fehlerbehebung

### 9.1 Häufige Probleme

---

#### Problem: Speisekarte lädt nicht

| Ursache               | Lösung                                             |
|-----------------------|----------------------------------------------------|
| Datei nicht vorhanden | `Speisekarte.pdf` hochladen                        |
| Falscher Dateiname    | Exakt `Speisekarte.pdf` verwenden                  |
| Groß-/Kleinschreibung | Linux-Server beachten Schreibweise                 |

---

#### Problem: Google Maps lädt nicht

| Ursache               | Lösung                                             |
|-----------------------|----------------------------------------------------|
| Adblocker             | Nutzer muss Blocker deaktivieren                   |
| API-Fehler            | Google Maps Status prüfen                          |
| JavaScript-Fehler     | Browser-Konsole prüfen                             |

---

#### Problem: Telefon-Link funktioniert nicht

| Ursache               | Lösung                                             |
|-----------------------|----------------------------------------------------|
| Desktop-Browser       | Normal – tel:-Links benötigen Telefon-App          |
| Falsches Format       | Format prüfen: `tel:+49XXXXXXXXXXX`                |

---

#### Problem: Seite lädt langsam

| Ursache               | Lösung                                             |
|-----------------------|----------------------------------------------------|
| Große Bilder          | Bilder optimieren (AVIF/WebP)                      |
| Kein Caching          | .htaccess Caching-Regeln prüfen                    |
| Server-Problem        | Hoster kontaktieren                                |

---

#### Problem: SSL-Zertifikat abgelaufen

| Ursache               | Lösung                                             |
|-----------------------|----------------------------------------------------|
| Keine Auto-Renewal    | Zertifikat manuell erneuern                        |
| Let's Encrypt Fehler  | Certbot erneut ausführen                           |

---

### 9.2 Diagnose-Tools

| Tool                  | Zweck                          | URL                        |
|-----------------------|--------------------------------|----------------------------|
| SSL Labs              | SSL-Zertifikat prüfen          | ssllabs.com/ssltest        |
| GTmetrix              | Performance                    | gtmetrix.com               |
| PageSpeed Insights    | Google Performance             | pagespeed.web.dev          |
| W3C Validator         | HTML-Validierung               | validator.w3.org           |

---

## 10. Kontakte & Eskalation

### 10.1 Ansprechpartner

| Rolle                 | Name/Kontakt         | Zuständigkeit              |
|-----------------------|----------------------|----------------------------|
| Betreiber             | Yurtsever Baran      | Inhaltliche Fragen         |
| Webmaster             | _________________    | Technische Betreuung       |
| Hosting-Provider      | _________________    | Server-Probleme            |

### 10.2 Eskalationsmatrix

| Problem-Typ           | Erstmaßnahme         | Eskalation an              |
|-----------------------|----------------------|----------------------------|
| Inhaltsfehler         | Selbst korrigieren   | —                          |
| Website nicht erreichbar | Hoster kontaktieren | Webmaster                 |
| Sicherheitsvorfall    | Website offline nehmen| Webmaster, Hoster         |

---

**Ende des Dokuments**

---

*Dieses Dokument ist vertraulich und nur für die benannten Projektbeteiligten bestimmt.*
