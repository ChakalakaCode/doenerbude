# USER STORIES & AKZEPTANZKRITERIEN

## Webpräsenz „Dönerbude Beelen"

### Product Backlog

---

| **Dokumenttyp**       | User Stories & Akzeptanzkriterien                  |
|-----------------------|----------------------------------------------------|
| **Projekt**           | Dönerbude Beelen – Webpräsenz                      |
| **Dokument-ID**       | US-DOENERBUDE-2026-001                             |
| **Version**           | 1.0                                                |
| **Status**            | Freigegeben                                        |
| **Bezugsdokument**    | LH-DOENERBUDE-2026-001 (Lastenheft)                |

---

## Änderungshistorie

| Version | Datum       | Autor            | Änderungen                    |
|---------|-------------|------------------|-------------------------------|
| 0.1     | 2025-10-10  | Product Owner    | Initialer Backlog             |
| 0.5     | 2025-11-01  | Product Owner    | Priorisierung abgeschlossen   |
| 1.0     | 2026-01-05  | Projektteam      | Finale Version                |

---

## Inhaltsverzeichnis

1. [Einleitung](#1-einleitung)
2. [Priorisierungsschema](#2-priorisierungsschema)
3. [Epic-Übersicht](#3-epic-übersicht)
4. [User Stories im Detail](#4-user-stories-im-detail)
5. [Story Map](#5-story-map)
6. [Traceability Matrix](#6-traceability-matrix)

---

## 1. Einleitung

### 1.1 Zweck

Dieses Dokument enthält alle User Stories für das Projekt „Webpräsenz Dönerbude Beelen" in strukturierter Form mit testbaren Akzeptanzkriterien nach dem **Given-When-Then**-Schema.

### 1.2 Format

Jede User Story folgt dem Standard-Template:

> **Als** [Rolle] **möchte ich** [Funktion] **damit** [Nutzen].

---

## 2. Priorisierungsschema

### 2.1 MoSCoW-Methode

| Priorität   | Bedeutung                                          | Anteil      |
|-------------|---------------------------------------------------|-------------|
| **Must**    | Zwingend erforderlich für Go-Live                 | ~60%        |
| **Should**  | Wichtig, aber nicht kritisch                      | ~20%        |
| **Could**   | Wünschenswert bei verfügbarer Zeit                | ~15%        |
| **Won't**   | Nicht in diesem Release                           | ~5%         |

### 2.2 Story Points (Fibonacci)

| Points | Aufwand     | Beispiel                              |
|--------|-------------|---------------------------------------|
| 1      | Trivial     | Text-Anpassung                        |
| 2      | Klein       | Neuer Link/Button                     |
| 3      | Mittel      | Neue Section                          |
| 5      | Größer      | Interaktive Komponente                |
| 8      | Komplex     | Externe Integration                   |
| 13     | Sehr komplex| Neue Seitenstruktur                   |

---

## 3. Epic-Übersicht

| Epic-ID | Epic-Name                  | User Stories      | Priorität |
|---------|----------------------------|-------------------|-----------|
| EP-01   | Bestellung & Kontakt       | US-01, US-02      | Must      |
| EP-02   | Information & Navigation   | US-03, US-04, US-05| Must     |
| EP-03   | Rechtliches & Compliance   | US-06, US-07, US-08| Must     |
| EP-04   | Marketing & SEO            | US-09, US-10      | Should    |
| EP-05   | Analytics & Tracking       | US-11, US-12      | Should    |
| EP-06   | Social & Sharing           | US-13             | Could     |

---

## 4. User Stories im Detail

---

### Epic EP-01: Bestellung & Kontakt

---

#### US-01: Telefonische Bestellung

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-01                                              |
| **Epic**              | EP-01 – Bestellung & Kontakt                       |
| **Priorität**         | Must                                               |
| **Story Points**      | 3                                                  |
| **Sprint**            | Sprint 1                                           |
| **Anforderungs-Ref.** | FA-KON-001, FA-KON-002                             |

**User Story:**
> **Als** Website-Besucher  
> **möchte ich** per Klick die Telefonnummer des Restaurants anrufen können  
> **damit** ich schnell und unkompliziert meine Bestellung aufgeben kann.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-01.1  | Besucher ist auf der Startseite    | Besucher klickt auf „Bestellen" | Telefon-App öffnet mit Nummer vorbefüllt|
| AC-01.2  | Besucher ist auf Mobile            | Besucher tippt auf Telefonnummer| Native Telefon-App wird gestartet       |
| AC-01.3  | Besucher ist auf Desktop           | Besucher klickt auf tel:-Link   | Browser zeigt Dialog oder öffnet App    |

**Definition of Done:**
- [ ] Mindestens 3 Telefon-CTAs auf der Startseite
- [ ] Alle tel:-Links sind korrekt formatiert
- [ ] Getestet auf iOS und Android

---

#### US-02: Bestellübersicht im Modal

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-02                                              |
| **Epic**              | EP-01 – Bestellung & Kontakt                       |
| **Priorität**         | Should                                             |
| **Story Points**      | 5                                                  |
| **Sprint**            | Sprint 2                                           |
| **Anforderungs-Ref.** | FA-KON-005                                         |

**User Story:**
> **Als** Website-Besucher  
> **möchte ich** ausgewählte Produkte in einer Übersicht sammeln können  
> **damit** ich beim Telefonanruf meine Bestellung klar formulieren kann.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-02.1  | Produkte sind auf der Seite        | Besucher klickt „Bestellen"    | Produkt wird zum Warenkorb hinzugefügt  |
| AC-02.2  | Warenkorb enthält Produkte         | Besucher öffnet Modal          | Übersicht aller Produkte wird angezeigt |
| AC-02.3  | Modal ist geöffnet                 | Besucher klickt Telefon-CTA    | Anruf wird initiiert                    |

**Definition of Done:**
- [ ] Warenkorb-Logik implementiert
- [ ] Modal zeigt Produktliste
- [ ] Toast-Benachrichtigung bei Hinzufügen

---

### Epic EP-02: Information & Navigation

---

#### US-03: Öffnungszeiten einsehen

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-03                                              |
| **Epic**              | EP-02 – Information & Navigation                   |
| **Priorität**         | Must                                               |
| **Story Points**      | 2                                                  |
| **Sprint**            | Sprint 1                                           |
| **Anforderungs-Ref.** | FA-KON-004                                         |

**User Story:**
> **Als** potenzieller Kunde  
> **möchte ich** die aktuellen Öffnungszeiten sehen  
> **damit** ich weiß, wann ich bestellen oder vorbeikommen kann.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-03.1  | Besucher ist auf der Startseite    | Besucher scrollt zu Kontakt    | Öffnungszeiten sind sichtbar            |
| AC-03.2  | Besucher nutzt Mobilgerät          | Besucher betrachtet Seite      | Text ist ohne Zoomen lesbar             |

**Definition of Done:**
- [ ] Öffnungszeiten im Kontaktbereich
- [ ] Mobile-optimierte Darstellung
- [ ] Schema.org openingHours vorhanden

---

#### US-04: Standort und Anfahrt

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-04                                              |
| **Epic**              | EP-02 – Information & Navigation                   |
| **Priorität**         | Must                                               |
| **Story Points**      | 5                                                  |
| **Sprint**            | Sprint 1                                           |
| **Anforderungs-Ref.** | FA-MAP-001 – 004                                   |

**User Story:**
> **Als** Besucher  
> **möchte ich** die Adresse sehen und eine Karte laden können  
> **damit** ich den Standort des Restaurants finde.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-04.1  | Besucher ist auf der Startseite    | Seite wird initial geladen     | Keine Google-Maps-Requests              |
| AC-04.2  | Map-Placeholder ist sichtbar       | Besucher klickt „Karte laden"  | Google Maps iframe wird eingebettet     |
| AC-04.3  | Karte ist geladen                  | Besucher klickt „Route planen" | Google Maps Navigation öffnet sich      |

**Definition of Done:**
- [ ] Click-to-Load implementiert
- [ ] Adresse textlich vorhanden
- [ ] Route-Button funktioniert

---

#### US-05: Speisekarte herunterladen

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-05                                              |
| **Epic**              | EP-02 – Information & Navigation                   |
| **Priorität**         | Must                                               |
| **Story Points**      | 2                                                  |
| **Sprint**            | Sprint 1                                           |
| **Anforderungs-Ref.** | FA-SPK-001 – 003                                   |

**User Story:**
> **Als** Besucher  
> **möchte ich** die Speisekarte als PDF herunterladen  
> **damit** ich das Angebot auch offline ansehen kann.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-05.1  | Besucher ist im Speisekarten-Bereich| Besucher klickt Download-Button| PDF-Download startet                    |
| AC-05.2  | Download ist abgeschlossen         | Besucher öffnet Datei          | PDF ist lesbar und vollständig          |

**Definition of Done:**
- [ ] Download-Button prominent platziert
- [ ] PDF ist aktuell
- [ ] Download funktioniert in allen Browsern

---

### Epic EP-03: Rechtliches & Compliance

---

#### US-06: Impressum bereitstellen

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-06                                              |
| **Priorität**         | Must                                               |
| **Story Points**      | 2                                                  |
| **Anforderungs-Ref.** | FA-REC-001, FA-REC-003                             |

**User Story:**
> **Als** Betreiber  
> **möchte ich** ein rechtsgültiges Impressum bereitstellen  
> **damit** die Website den Anforderungen nach § 5 TMG entspricht.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-06.1  | Besucher ist auf beliebiger Seite  | Besucher klickt „Impressum"    | Impressum-Seite wird angezeigt          |
| AC-06.2  | Impressum-Seite ist geladen        | Besucher liest Inhalt          | Alle Pflichtangaben sind vorhanden      |

---

#### US-07: Datenschutzerklärung

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-07                                              |
| **Priorität**         | Must                                               |
| **Story Points**      | 2                                                  |
| **Anforderungs-Ref.** | FA-REC-002, FA-REC-005                             |

**User Story:**
> **Als** Betreiber  
> **möchte ich** eine DSGVO-konforme Datenschutzerklärung bereitstellen  
> **damit** Besucher über die Datenverarbeitung informiert sind.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-07.1  | Besucher ist auf beliebiger Seite  | Besucher klickt „Datenschutz"  | Datenschutz-Seite wird angezeigt        |
| AC-07.2  | Seite ist geladen                  | Besucher liest Inhalt          | Alle externen Dienste sind dokumentiert |

---

#### US-08: Cookie-Consent

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-08                                              |
| **Priorität**         | Must                                               |
| **Story Points**      | 5                                                  |
| **Anforderungs-Ref.** | FA-REC-004, FA-TRK-002                             |

**User Story:**
> **Als** Betreiber  
> **möchte ich** die Einwilligung für Tracking einholen  
> **damit** die Website DSGVO-konform ist.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-08.1  | Erstbesuch der Website             | Seite wird geladen             | Cookie-Banner erscheint                 |
| AC-08.2  | Banner ist sichtbar                | Besucher wählt „Nur notwendige"| Keine GA-Requests                       |
| AC-08.3  | Banner ist sichtbar                | Besucher wählt „Alle akzeptieren"| GA wird initialisiert                 |

---

### Epic EP-04: Marketing & SEO

---

#### US-09: SEO-optimierte Meta-Tags

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-09                                              |
| **Priorität**         | Must                                               |
| **Story Points**      | 3                                                  |
| **Anforderungs-Ref.** | FA-SEO-001 – 005                                   |

**User Story:**
> **Als** Betreiber  
> **möchte ich** SEO-optimierte Seiten  
> **damit** das Restaurant in Suchmaschinen gefunden wird.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-09.1  | Jede Seite des Projekts            | SEO-Audit durchgeführt         | Einzigartige Title/Description          |
| AC-09.2  | Startseite                         | Schema-Validator prüft         | Restaurant-Markup ist valide            |
| AC-09.3  | Website live                       | Sitemap.xml aufgerufen         | Alle Seiten sind gelistet               |

---

#### US-10: Regionale Landingpages

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-10                                              |
| **Priorität**         | Should                                             |
| **Story Points**      | 8                                                  |
| **Anforderungs-Ref.** | FA-SEO-006                                         |

**User Story:**
> **Als** Betreiber  
> **möchte ich** regionale Landingpages für umliegende Orte  
> **damit** Kunden aus der Region das Restaurant finden.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-10.1  | SEO-Seiten existieren              | Nutzer sucht „Döner Warendorf" | Landingpage erscheint in Ergebnissen    |
| AC-10.2  | Landingpage wird besucht           | Nutzer klickt CTA              | Navigation zur Hauptseite funktioniert  |

---

### Epic EP-05: Analytics & Tracking

---

#### US-11: Consent-basiertes Tracking

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-11                                              |
| **Priorität**         | Should                                             |
| **Story Points**      | 5                                                  |
| **Anforderungs-Ref.** | FA-TRK-001 – 006                                   |

**User Story:**
> **Als** Betreiber  
> **möchte ich** Nutzerinteraktionen messen  
> **damit** ich verstehe, welche CTAs funktionieren.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-11.1  | Consent wurde erteilt              | Besucher klickt Telefon-Link   | Event wird in GA erfasst                |
| AC-11.2  | Consent wurde erteilt              | Besucher lädt Karte            | Event wird in GA erfasst                |
| AC-11.3  | Consent wurde erteilt              | Besucher lädt PDF              | Event wird in GA erfasst                |

---

### Epic EP-06: Social & Sharing

---

#### US-12: Seite teilen

| Attribut              | Wert                                               |
|-----------------------|----------------------------------------------------|
| **ID**                | US-12                                              |
| **Priorität**         | Could                                              |
| **Story Points**      | 3                                                  |
| **Anforderungs-Ref.** | FA-SOC-001 – 003                                   |

**User Story:**
> **Als** Besucher  
> **möchte ich** die Seite mit Freunden teilen  
> **damit** ich das Restaurant empfehlen kann.

**Akzeptanzkriterien:**

| AC-ID    | Given                              | When                           | Then                                    |
|----------|------------------------------------|---------------------------------|-----------------------------------------|
| AC-12.1  | Browser unterstützt Web Share API  | Besucher klickt Share-Button   | Native Share-Dialog erscheint           |
| AC-12.2  | Browser unterstützt API nicht      | Besucher klickt Share-Button   | WhatsApp-Link wird geöffnet             |

---

## 5. Story Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER JOURNEY                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ENTDECKEN        INFORMIEREN         BESTELLEN         TEILEN              │
│      │                 │                  │               │                 │
│      ▼                 ▼                  ▼               ▼                 │
│  ┌───────┐        ┌───────┐         ┌───────┐       ┌───────┐              │
│  │US-09  │        │US-03  │         │US-01  │       │US-12  │              │
│  │US-10  │        │US-04  │         │US-02  │       │       │              │
│  │       │        │US-05  │         │       │       │       │              │
│  └───────┘        └───────┘         └───────┘       └───────┘              │
│   SEO/            Info/              Telefon/        Social                 │
│   Marketing       Navigation         Modal           Share                  │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  COMPLIANCE (quer zu allen Journeys)                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  US-06 (Impressum)  │  US-07 (Datenschutz)  │  US-08 (Consent)      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ANALYTICS (quer zu allen Journeys)                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  US-11 (Event-Tracking)                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Traceability Matrix

| User Story | Lastenheft-Anforderung | Pflichtenheft-Kapitel | Testfall      |
|------------|------------------------|----------------------|---------------|
| US-01      | FA-KON-001, FA-KON-002 | 4.2                  | TC-01         |
| US-02      | FA-KON-005             | 4.2                  | TC-06         |
| US-03      | FA-KON-004             | 4.2                  | TC-07         |
| US-04      | FA-MAP-001 – 004       | 4.4, 7.2             | TC-02         |
| US-05      | FA-SPK-001 – 003       | 4.3                  | TC-03         |
| US-06      | FA-REC-001, FA-REC-003 | 8                    | TC-05         |
| US-07      | FA-REC-002, FA-REC-005 | 8                    | TC-05         |
| US-08      | FA-REC-004, FA-TRK-002 | 8                    | TC-08         |
| US-09      | FA-SEO-001 – 005       | 4.5                  | TC-09         |
| US-10      | FA-SEO-006             | 4.5                  | TC-10         |
| US-11      | FA-TRK-001 – 006       | 7.1                  | TC-08         |
| US-12      | FA-SOC-001 – 003       | —                    | TC-11         |

---

**Ende des Dokuments**

---

*Dieses Dokument ist vertraulich und nur für die benannten Projektbeteiligten bestimmt.*
