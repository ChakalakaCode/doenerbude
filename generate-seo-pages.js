const fs = require('fs');
const path = require('path');
 
// Liste der Orte im 50km Umkreis um Beelen mit Entfernungen
const locations = [
    { name: 'Münster', distance: 35, type: 'city' },
    { name: 'Ostbevern', distance: 15, type: 'village' },
    { name: 'Telgte', distance: 25, type: 'town' },
    { name: 'Warendorf', distance: 15, type: 'town' },
    { name: 'Sassenberg', distance: 10, type: 'town' },
    { name: 'Gütersloh', distance: 30, type: 'city' },
    { name: 'Rheda-Wiedenbrück', distance: 25, type: 'city' },
    { name: 'Harsewinkel', distance: 20, type: 'town' },
    { name: 'Versmold', distance: 15, type: 'town' },
    { name: 'Halle (Westf.)', distance: 25, type: 'town' },
    { name: 'Borgholzhausen', distance: 35, type: 'town' },
    { name: 'Beckum', distance: 20, type: 'town' },
    { name: 'Oelde', distance: 15, type: 'town' },
    { name: 'Lippstadt', distance: 35, type: 'town' },
    { name: 'Rietberg', distance: 30, type: 'town' },
    { name: 'Herzebrock-Clarholz', distance: 20, type: 'village' },
    { name: 'Ennigerloh', distance: 15, type: 'town' },
    { name: 'Ahlen', distance: 20, type: 'town' },
    { name: 'Drensteinfurt', distance: 25, type: 'town' },
    { name: 'Sendenhorst', distance: 15, type: 'town' },
    { name: 'Everswinkel', distance: 10, type: 'village' },
    { name: 'Greven', distance: 30, type: 'town' },
    { name: 'Saerbeck', distance: 25, type: 'village' },
    { name: 'Ladbergen', distance: 28, type: 'village' },
    { name: 'Lienen', distance: 32, type: 'village' },
    { name: 'Lengerich', distance: 40, type: 'town' },
    { name: 'Hörstel', distance: 45, type: 'town' },
    { name: 'Westerkappeln', distance: 38, type: 'town' },
    { name: 'Tecklenburg', distance: 42, type: 'town' },
    { name: 'Mettmann', distance: 48, type: 'town' }
];

// Funktionen für dynamische Inhalte
function getPageTitle(location) {
    if (location.type === 'city') {
        return `🍢 Bester Döner in ${location.name} | Original Berliner Art | Nur ${location.distance}km`;
    } else {
        return `🥙 Döner in ${location.name} | Berliner Spezialität | ${location.distance}km von Ihnen`;
    }
}

function getMetaDescription(location) {
    const travelTime = Math.round(location.distance * 1.5);
    return `🚗 Nur ${location.distance}km von ${location.name} entfernt (ca. ${travelTime} Min.) | Genießen Sie den besten Berliner Döner im Münsterland. Frisch zubereitet mit hochwertigen Zutaten. Besuchen Sie uns in Beelen!`;
}

function getStructuredData(location) {
    return {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": `Dönerbude Beelen - Original Berliner Döner für ${location.name}`,
        "image": "https://www.doenerbude-beelen.de/berliner-doener.jpg",
        "priceRange": "€€",
        "servesCuisine": "Berliner Döner, Türkische Küche",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Warendorfer Str. 21",
            "addressLocality": "Beelen",
            "postalCode": "48361",
            "addressCountry": "DE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "51.9292",
            "longitude": "8.1083"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "11:00",
            "closes": "22:00"
        },
        "telephone": "+4925868828866"
    };
}

function getMainHeading(location) {
    if (location.type === 'city') {
        return `🍽️ Ihr Berliner Döner-Spezialist für ${location.name} und Umgebung`;
    } else {
        return `🥙 Bester Döner in der Nähe von ${location.name} | Berliner Art`;
    }
}

function getSubtitle(location) {
    const travelTime = Math.round(location.distance * 1.5);
    const benefits = [
        "Frische, täglich selbst zubereitete Zutaten",
        "Originale Berliner Rezeptur seit über 15 Jahren",
        "Große Portionen zu fairen Preisen",
        "Kostenlose Parkplätze direkt vor der Tür",
        "Schneller Service für unterwegs"
    ];
    
    return `
        <p>Nur ${location.distance}km von ${location.name} entfernt (ca. ${travelTime} Min. Fahrt) - Ihr zuverlässiger Anbieter für originalen Berliner Döner im Münsterland.</p>
        <div class="benefits">
            <h3>Warum Gäste aus ${location.name} zu uns kommen:</h3>
            <ul>
                ${benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
        </div>
    `;
}

function getLocationContent(location) {
    const travelTime = Math.round(location.distance * 1.5);
    const variations = [
        `
        <section class="location-content">
            <h2>Berliner Döner-Spezialitäten für ${location.name}</h2>
            <p>Liebe Döner-Freunde aus ${location.name}, wir freuen uns, Ihnen den authentischen Geschmack des Berliner Döners in bester Qualität zu bieten. Viele unserer Stammgäste kommen regelmäßig aus ${location.name} zu uns, um sich von unserem einzigartigen Geschmack zu überzeugen.</p>
            
            <h3>Warum sich die Fahrt aus ${location.name} lohnt:</h3>
            <ul>
                <li>💯 Echte Handwerkskunst: Unser Dönerfleisch wird täglich frisch aufgespießt und schonend gegrillt</li>
                <li>🌱 Frisches Gemüse aus regionalem Anbau</li>
                <li>👨‍🍳 Erfahrene Döner-Meister mit jahrelanger Erfahrung</li>
                <li>🚗 Bequeme Anfahrt von ${location.name} in nur ${travelTime} Minuten</li>
                <li>📱 Bestellen Sie vor - so ist Ihr Döner fertig, wenn Sie ankommen</li>
            </ul>
            
            <h3>Unser Tipp für Gäste aus ${location.name}:</h3>
            <p>Kombinieren Sie Ihren Besuch bei uns mit einem Ausflug ins schöne Beelen. Nach einem leckeren Döner bei uns können Sie den historischen Ortskern erkunden oder einen Spaziergang im nahegelegenen Park machen.</p>
            
            <div class="cta-box">
                <h3>Besuchen Sie uns!</h3>
                <p>Wir freuen uns auf Ihren Besuch aus ${location.name}!</p>
                <p>📅 Täglich geöffnet von 11:00 bis 22:00 Uhr<br>
                📍 Warendorfer Str. 21, 48361 Beelen<br>
                📞 02586 8828866</p>
            </div>
        </section>
        `,
        
        `
        <section class="location-content">
            <h2>Ihr Döner-Experte in der Region ${location.name}</h2>
            <p>Sie suchen in ${location.name} nach einem echten kulinarischen Erlebnis? Dann besuchen Sie uns in Beelen! Unsere Döner-Spezialitäten werden von Gästen aus der gesamten Region geschätzt - von Münster bis ${location.name}.</p>
            
            <h3>Das macht uns besonders:</h3>
            <div class="features-grid">
                <div class="feature">
                    <h4>🥙 Original Berliner Rezeptur</h4>
                    <p>Nach traditioneller Art zubereitet mit ausgewählten Gewürzen</p>
                </div>
                <div class="feature">
                    <h4>🚚 Schneller Service</h4>
                    <p>Perfekt für die Mittagspause oder den schnellen Snack</p>
                </div>
                <div class="feature">
                    <h4>🌿 Frische Kräuter</h4>
                    <p>Täglich frisch zubereitete Saucen und Salate</p>
                </div>
                <div class="feature">
                    <h4>🍽️ Gemütliche Atmosphäre</h4>
                    <p>Moderne Sitzgelegenheiten für Ihren Besuch</p>
                </div>
            </div>
            
            <h3>Anfahrt von ${location.name}:</h3>
            <p>Mit dem Auto erreichen Sie uns von ${location.name} aus in nur ${travelTime} Minuten über die B64. Kostenlose Parkplätze finden Sie direkt vor unserer Tür. Auch mit dem ÖPNV sind wir gut erreichbar - die Bushaltestelle "Beelen Mitte" ist nur 3 Gehminuten entfernt.</p>
            
            <div class="testimonial">
                <blockquote>
                    "Als wir von Freunden aus ${location.name} von der Dönerbude in Beelen gehört haben, waren wir zunächst skeptisch. Doch der Geschmack hat uns sofort überzeugt - jetzt fahren wir regelmäßig die kurze Strecke für den besten Döner der Region!"
                    <footer>- Familie M. aus ${location.name}</footer>
                </blockquote>
            </div>
        </section>
        `
    ];
    
    return variations[Math.floor(Math.random() * variations.length)];
}

function getCTAText(location) {
    const travelTime = Math.round(location.distance * 1.5);
    const ctaVariations = [
        `🍴 Jetzt aus ${location.name} anreisen (nur ${travelTime} Min.)`,
        `🚗 Nur ${location.distance}km von ${location.name} entfernt - jetzt probieren!`,
        `🥙 Bestellen Sie jetzt unter 02586 8828866 - auch zur Abholung`,
        `⭐ Überzeugen Sie sich selbst vom besten Döner der Region!`
    ];
    return ctaVariations[Math.floor(Math.random() * ctaVariations.length)];
}

// Template für die HTML-Seiten
const template = (location) => `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${getPageTitle(location)}</title>
    <meta name="description" content="${getMetaDescription(location)}">
    <base href="/">
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="canonical" href="https://www.doenerbude-beelen.de/doener-${location.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}" />
    <script type="application/ld+json">
    ${JSON.stringify(getStructuredData(location), null, 2)}
    </script>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo">
                    <div class="logo-circle-new">
                        <a href="index.html"><img src="berlin.jpg" alt="Dönerbude Logo" class="logo-image"></a>
                    </div>
                    <a href="/" style="text-decoration: none;">
                        <span class="logo-beelen">Beelen</span>
                    </a>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.html#home" class="nav-link">Home</a></li>
                    <li><a href="index.html#menu" class="nav-link">Speisekarte</a></li>
                    <li><a href="index.html#about" class="nav-link">Über uns</a></li>
                    <li><a href="index.html#contact" class="nav-link">Kontakt</a></li>
                    <li><a href="tel:+4925868828866" class="nav-link order-btn">
                        <i class="fas fa-phone-alt"></i> 02586 88 2 88 66
                    </a></li>
                </ul>
            </div>
        </nav>
    </header>

    <main class="location-page">
        <section class="location-hero">
            <div class="container">
                <h1>${getMainHeading(location)}</h1>
                <p class="location-subtitle">${getSubtitle(location)}</p>
                
                <div class="location-content">
                    ${getLocationContent(location)}
                </div>

                <div class="cta-section">
                    <h2>Besuchen Sie uns in Beelen</h2>
                    <p>${getCTAText(location)}</p>
                    <a href="https://maps.google.com?q=Dönerbude+Beelen" class="btn" target="_blank">
                        <i class="fas fa-map-marker-alt"></i> Route anzeigen (${location.distance}km von ${location.name})
                    </a>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Dönerbude Beelen</h3>
                    <p>Ihr Ansprechpartner für originalen Berliner Döner im Raum ${location.name} und Umgebung.</p>
                </div>
                <div class="footer-section">
                    <h3>Kontakt</h3>
                    <p>Warendorfer Str. 21<br>48361 Beelen</p>
                    <p>Tel: <a href="tel:+4925868828866">02586 88 2 88 66</a></p>
                </div>
                <div class="footer-section">
                    <h3>Öffnungszeiten</h3>
                    <p>Mo-Sa: 11:00 - 22:00 Uhr<br>So: Geschlossen</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Dönerbude Beelen | 
                   <a href="/impressum.html">Impressum</a> | 
                   <a href="/datenschutz.html">Datenschutz</a>
                </p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

// Hauptfunktion zum Generieren der Seiten
function generatePages() {
    // Ordner für die generierten Seiten erstellen
    const outputDir = path.join(__dirname, 'location-pages');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Für jeden Ort eine HTML-Datei generieren
    locations.forEach(location => {
        const filename = `doener-${location.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}.html`;
        const filePath = path.join(outputDir, filename);
        
        fs.writeFileSync(filePath, template(location));
        console.log(`Seite erstellt: ${filename}`);
    });

    // Sitemap erstellen
    createSitemap(outputDir);
    
    console.log('Alle SEO-Seiten wurden erfolgreich generiert!');
}
// Fügen Sie diese Funktion zu Ihrer generate-seo-pages.js hinzu
function addBackLinksToLocationPages() {
    const locationPagesDir = path.join(__dirname, 'location-pages');
    const files = fs.readdirSync(locationPagesDir);
    
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(locationPagesDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Füge den Standorte-Link zur Navigation hinzu
            content = content.replace(
                '<li><a href="/#contact" class="nav-link">Kontakt</a></li>',
                '<li><a href="/#contact" class="nav-link">Kontakt</a></li>\n                    <li><a href="/standorte.html" class="nav-link">Standorte</a></li>'
            );
            
            // Füge einen "Zurück zur Übersicht"-Link hinzu
            const backLink = '\n    <div class="container" style="margin: 2rem 0; text-align: center;">\n        <a href="/standorte.html" class="btn">\n            <i class="fas fa-arrow-left"></i> Zurück zur Standortübersicht\n        </a>\n    </div>\n';
            content = content.replace('</main>', backLink + '</main>');
            
            fs.writeFileSync(filePath, content);
        }
    });
    
    console.log('Standortseiten wurden aktualisiert!');
}

// Rufen Sie die Funktion am Ende Ihrer generate-seo-pages.js auf
addBackLinksToLocationPages();

// Sitemap erstellen
function createSitemap(outputDir) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.doenerbude-beelen.de/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    ${locations.map(location => `
    <url>
        <loc>https://www.doenerbude-beelen.de/doener-${location.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    `).join('')}
</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
    console.log('Sitemap wurde erstellt: sitemap.xml');
}

// Skript ausführen
generatePages();