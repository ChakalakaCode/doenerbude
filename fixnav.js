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
                
                // Ersetze die komplette Navigation
                const newNav = `
                <nav class="navbar">
                    <div class="nav-container">
                        <div class="logo">
                            <div class="logo-circle-new">
                                <a href="/"><img src="../berlin.jpg" alt="Dönerbude Logo" class="logo-image"></a>
                            </div>
                            <a href="/" style="text-decoration: none;">
                                <span class="logo-beelen">Beelen</span>
                            </a>
                        </div>
                        <ul class="nav-menu">
                            <li><a href="/#home" class="nav-link">Home</a></li>
                            <li><a href="/#menu" class="nav-link">Speisekarte</a></li>
                            <li><a href="/standorte.html" class="nav-link">Standorte</a></li>
                            <li><a href="/#about" class="nav-link">Über uns</a></li>
                            <li><a href="/#contact" class="nav-link">Kontakt</a></li>
                            <li><a href="tel:+4925868828866" class="nav-link order-btn">
                                <i class="fas fa-phone-alt"></i> 02586 88 2 88 66
                            </a></li>
                        </ul>
                    </div>
                </nav>`;
                
                // Ersetze die bestehende Navigation
                content = content.replace(/<nav class="navbar">[\s\S]*?<\/nav>/, newNav);
                
                fs.writeFileSync(filePath, content);
                console.log(`Navigation in ${file} aktualisiert`);
            }
        });
    }
    
    console.log('Alle Navigationslinks wurden erfolgreich aktualisiert!');
}

// Führe das Skript aus
fixNavigation();