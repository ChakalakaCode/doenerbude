const fs = require('fs');
const path = require('path');

// Korrigiere die Navigation in allen HTML-Dateien
function fixNavigation() {
    // Korrigiere die Hauptseiten
    const mainPages = ['index.html', 'standorte.html'];
    
    mainPages.forEach(page => {
        const filePath = path.join(__dirname, page);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Korrigiere den Standorte-Link
            content = content.replace(
                /<a\s+href=["']#?standorte\.html["']/g,
                '<a href="standorte.html"'
            );
            
            // Korrigiere die aktive Klasse
            if (page === 'standorte.html') {
                content = content.replace(
                    /<a\s+href=["']standorte\.html["'](?!.*active)/,
                    '<a href="standorte.html" class="nav-link active"'
                );
            }
            
            fs.writeFileSync(filePath, content);
            console.log(`Navigation in ${page} aktualisiert`);
        }
    });

    // Korrigiere die Standortseiten
    const locationDir = path.join(__dirname, 'location-pages');
    if (fs.existsSync(locationDir)) {
        const files = fs.readdirSync(locationDir);
        
        files.forEach(file => {
            if (file.endsWith('.html')) {
                const filePath = path.join(locationDir, file);
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Korrigiere den Standorte-Link in der Navigation
                content = content.replace(
                    /<a\s+href=["']#?standorte\.html["']/g,
                    '<a href="/standorte.html"'
                );
                
                // Füge die aktive Klasse zum Standorte-Link hinzu
                content = content.replace(
                    /<a\s+href=["']\/standorte\.html["'](?!.*active)/,
                    '<a href="/standorte.html" class="nav-link active"'
                );
                
                fs.writeFileSync(filePath, content);
                console.log(`Navigation in ${file} aktualisiert`);
            }
        });
    }
    
    console.log('Alle Navigationslinks wurden erfolgreich aktualisiert!');
}

// Führe das Skript aus
fixNavigation();