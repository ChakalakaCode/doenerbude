# Döner Palace - Restaurant Website

Eine moderne, responsive Website für ein Döner Restaurant mit Bestellfunktionalität.

## Features

### 🎨 Design
- **Modernes Design** mit Gradient-Hintergründen und Animationen
- **Vollständig responsive** für Desktop, Tablet und Mobile
- **Smooth Scrolling** und Parallax-Effekte
- **Animierte Elemente** beim Scrollen
- **Floating Action Button** für schnelle Bestellungen

### 📱 Funktionalität
- **Interaktive Speisekarte** mit Kategoriefiltern
- **Warenkorb-System** zum Sammeln von Bestellungen
- **Telefon-Integration** für direkte Bestellungen
- **Mobile Navigation** mit Hamburger-Menü
- **Kontaktinformationen** und Öffnungszeiten

### 🍽️ Speisekarte
- **Döner-Varianten**: Kebab, Dürüm, Teller, Salat
- **Pizza-Auswahl**: Margherita, Döner-Pizza
- **Getränke**: Cola, Ayran
- **Preise** und detaillierte Beschreibungen

## Technische Details

### Dateien
- `index.html` - Hauptseite mit HTML-Struktur
- `styles.css` - CSS-Styling mit Animationen und responsivem Design
- `script.js` - JavaScript für Interaktivität und Funktionalität

### Verwendete Technologien
- **HTML5** - Semantische Struktur
- **CSS3** - Grid, Flexbox, Animationen, Gradients
- **Vanilla JavaScript** - Interaktivität ohne Frameworks
- **Font Awesome** - Icons
- **Google Fonts** - Poppins Schriftart

### Browser-Kompatibilität
- Chrome (empfohlen)
- Firefox
- Safari
- Edge
- Mobile Browser

## Installation & Nutzung

### Lokaler Server starten
```bash
# Mit Python
python -m http.server 8000

# Mit Node.js (falls installiert)
npx serve .
```

### Anpassungen

#### Kontaktdaten ändern
In `index.html` die Telefonnummer und Adresse anpassen:
```html
<a href="tel:+49123456789">+49 123 456 789</a>
```

#### Speisekarte erweitern
Neue Menü-Items in `index.html` hinzufügen:
```html
<div class="menu-item" data-category="doener">
    <div class="menu-item-image">🥙</div>
    <div class="menu-item-content">
        <h3>Neuer Döner</h3>
        <p>Beschreibung...</p>
        <div class="price">€7.50</div>
        <button class="order-btn-item" data-item="Neuer Döner" data-price="7.50">
            <i class="fas fa-plus"></i> Bestellen
        </button>
    </div>
</div>
```

#### Farben anpassen
In `styles.css` die Hauptfarben ändern:
```css
/* Hauptfarbe von Rot zu einer anderen Farbe */
:root {
    --primary-color: #e74c3c; /* Hier ändern */
    --primary-dark: #c0392b;   /* Hier ändern */
}
```

## Features im Detail

### Bestellsystem
- Artikel zum Warenkorb hinzufügen
- Mengen anpassen
- Artikel entfernen
- Gesamtsumme berechnen
- Direkter Anruf zur Bestellung

### Responsive Design
- **Desktop**: Vollständige Navigation und Grid-Layout
- **Tablet**: Angepasste Spaltenanzahl
- **Mobile**: Hamburger-Menü und gestapeltes Layout

### Animationen
- **Hero-Section**: Typing-Effekt und Parallax
- **Menu-Items**: Fade-in beim Scrollen
- **Buttons**: Hover-Effekte und Transformationen
- **Modal**: Slide-in Animation

## Erweiterungsmöglichkeiten

### Online-Bestellung
- Integration mit Zahlungsanbietern (Stripe, PayPal)
- Lieferadresse-Erfassung
- Bestellstatus-Tracking

### Backend-Integration
- Speisekarte aus Datenbank laden
- Bestellungen in Datenbank speichern
- Admin-Panel für Restaurant-Betreiber

### Zusätzliche Features
- Bewertungssystem
- Reservierungssystem
- Newsletter-Anmeldung
- Social Media Integration
- Mehrsprachigkeit

## Support

Bei Fragen oder Anpassungswünschen können Sie:
- Den Code direkt bearbeiten
- Neue Features hinzufügen
- Das Design anpassen

Die Website ist vollständig dokumentiert und einfach zu erweitern!
