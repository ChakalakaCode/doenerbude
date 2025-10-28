/**
 * 🥙 Dönerbude Beelen – Local SEO Page Generator
 * -------------------------------------------------
 * Dieses Skript erzeugt automatisch SEO-optimierte Landingpages
 * für Orte im Umkreis von Beelen mit dynamischem, semantisch
 * variiertem Content (um Duplicate Content zu vermeiden).
 */

const fs = require('fs');
const path = require('path');

// 🗺️ Orte im 50km-Umkreis um Beelen
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

// 🧠 Hilfsfunktionen
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const cleanName = (name) =>
  name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');

// 🧩 SEO-Dynamik
function getPageTitle(location) {
  const emojis = ['🥙', '🍢', '🍴', '🌯'];
  return `${rand(emojis)} ${
    location.type === 'city' ? 'Bester Döner in' : 'Döner bei'
  } ${location.name} | Berliner Art | ${location.distance}km entfernt`;
}

function getMetaDescription(location) {
  const travelTime = Math.round(location.distance * 1.5);
  return `Nur ${location.distance}km von ${location.name} (ca. ${travelTime} Min. Fahrt) – entdecken Sie den besten Berliner Döner im Münsterland! Frisch, authentisch & mit Liebe zubereitet.`;
}

// 🧾 Schema.org Markup (Local SEO)
function getStructuredData(location) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `Dönerbude Beelen – Berliner Döner für ${location.name}`,
    image: "https://www.doenerbude-beelen.de/berliner-doener.jpg",
    servesCuisine: "Berliner Döner, Türkische Küche",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Warendorfer Str. 21",
      addressLocality: "Beelen",
      postalCode: "48361",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.9292",
      longitude: "8.1083",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "22:00",
    },
    telephone: "+4925868828866",
  };
}

// 🧠 Unique-Text-Generator
function generateUniqueText(base, location) {
  const synonymSets = [
    ['authentisch', 'originalgetreu', 'echt', 'traditionell'],
    ['frisch', 'knackig', 'täglich zubereitet', 'regional'],
    ['besuchen', 'vorbeischauen', 'vorbeikommen', 'reinschauen'],
    ['lohnt sich', 'ist empfehlenswert', 'ist ein Genuss', 'ist ein Muss'],
  ];

  let text = base;
  synonymSets.forEach(set => {
    const regex = new RegExp(set[0], 'gi');
    text = text.replace(regex, rand(set));
  });

  const extraSentences = [
    `Viele Gäste aus ${location.name} besuchen uns regelmäßig.`,
    `Unser Berliner Döner ist auch in ${location.name} längst bekannt.`,
    `Wenn Sie aus ${location.name} kommen – probieren Sie echten Berliner Geschmack.`,
    `Auch Foodies aus ${location.name} schätzen unsere hausgemachte Soße.`
  ];

  return text + `<p>${rand(extraSentences)}</p>`;
}

// 🏷️ Seitentitel / Überschriften
const getMainHeading = (loc) =>
  loc.type === 'city'
    ? `🍽️ Ihr Berliner Döner-Spezialist für ${loc.name} und Umgebung`
    : `🥙 Bester Döner nahe ${loc.name} | Berliner Art`;

function getSubtitle(location) {
  const travelTime = Math.round(location.distance * 1.5);
  const base = `
  <p>Nur ${location.distance}km von ${location.name} (ca. ${travelTime} Min. Fahrt) – Ihr Anbieter für originalen Berliner Döner im Münsterland.</p>
  <ul>
    <li>Frische Zutaten täglich zubereitet</li>
    <li>Original Berliner Rezept seit über 15 Jahren</li>
    <li>Große Portionen zu fairen Preisen</li>
    <li>Kostenlose Parkplätze direkt vor der Tür</li>
    <li>Schneller Service auch zum Mitnehmen</li>
  </ul>`;
  return generateUniqueText(base, location);
}

function getCTAText(location) {
  const travelTime = Math.round(location.distance * 1.5);
  return rand([
    `🍴 Jetzt aus ${location.name} anreisen (nur ${travelTime} Min.)`,
    `🚗 Nur ${location.distance}km von ${location.name} entfernt – jetzt probieren!`,
    `🥙 Bestellen Sie jetzt unter 02586 8828866 – auch zur Abholung!`,
    `⭐ Überzeugen Sie sich selbst vom besten Döner der Region.`,
  ]);
}

// 🧱 HTML-Vorlage
function template(location) {
  const slug = cleanName(location.name);
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${getPageTitle(location)}</title>
<meta name="description" content="${getMetaDescription(location)}">
<link rel="canonical" href="https://www.doenerbude-beelen.de/doener-${slug}">
<link rel="stylesheet" href="/doenerbude/styles.css">
<script type="application/ld+json">${JSON.stringify(getStructuredData(location))}</script>
</head>
<body>
<header>
  <h1>${getMainHeading(location)}</h1>
</header>
<main>
  <section>
    ${getSubtitle(location)}
    <h2>Warum sich die Fahrt aus ${location.name} lohnt</h2>
    <p>Unsere Gäste aus ${location.name} genießen echten Berliner Geschmack – täglich frisch, mit Leidenschaft zubereitet.</p>
    <p>${getCTAText(location)}</p>
    <a href="https://maps.google.com?q=Dönerbude+Beelen" target="_blank">📍 Route anzeigen (${location.distance}km von ${location.name})</a>
  </section>
</main>
<footer>
  <p>&copy; ${new Date().getFullYear()} Dönerbude Beelen – Berliner Döner für ${location.name}</p>
</footer>
</body>
</html>`;
}

// 🧰 Sitemap
function createSitemap(outputDir) {
  const urls = locations
    .map(
      (l) => `
  <url>
    <loc>https://www.doenerbude-beelen.de/doener-${cleanName(l.name)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.doenerbude-beelen.de/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;

  fs.writeFileSync(path.join(outputDir, '../sitemap.xml'), sitemap);
  console.log('✅ Sitemap wurde erstellt');
}

// ⚙️ Hauptfunktion
function generatePages() {
  const outputDir = path.join(__dirname, 'location-pages');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  locations.forEach((loc) => {
    const filename = `doener-${cleanName(loc.name)}.html`;
    fs.writeFileSync(path.join(outputDir, filename), template(loc), 'utf8');
    console.log(`✅ Seite erstellt: ${filename}`);
  });

  createSitemap(outputDir);
  console.log('🎉 Alle SEO-Seiten erfolgreich generiert!');
}

// 🔥 Start
generatePages();
