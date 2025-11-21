// DOM Elements
const GA_MEASUREMENT_ID = 'G-KMLFEZJ49P';
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');
const orderBtns = document.querySelectorAll('.order-btn-item');
const modal = document.getElementById('orderModal');
const closeModal = document.querySelector('.close');
const orderSummary = document.getElementById('orderSummary');
const headerEl = document.querySelector('.header');
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const heroImage = document.querySelector('.hero-image');

// Order cart
let cart = [];

// Throttle helper to improve scroll/resize performance
function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// Mobile Navigation Toggle (optional on some pages)
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Video autoplay on scroll
const video = document.getElementById('restaurantVideo');
const videoSection = document.querySelector('.restaurant-video');
const videoSource = video ? video.querySelector('source') : null;

const videoObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!video) return;

        if (entry.isIntersecting) {
            // Quelle erst bei Sichtbarkeit setzen (Lazy Loading)
            if (videoSource && !videoSource.src) {
                const dataSrc = videoSource.getAttribute('data-src');
                if (dataSrc) {
                    videoSource.src = dataSrc;
                    video.load();
                }
            }

            // Video ist sichtbar - starte Wiedergabe
            video.play().catch(e => {
                console.log('Autoplay failed:', e);
            });
        } else {
            // Video ist nicht sichtbar - pausiere
            video.pause();
        }
    });
}, videoObserverOptions);

if (video && videoSection) {
    videoObserver.observe(videoSection);
}

// Header scroll effect
function handleHeaderScroll() {
    if (!headerEl) return;
    if (window.scrollY > 100) {
        headerEl.style.background = '#000';
        headerEl.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        headerEl.style.background = '#000';
        headerEl.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
}

window.addEventListener('scroll', throttle(handleHeaderScroll, 100));

// Menu category filtering
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        // Filter menu items with animation
        menuItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Add to cart functionality (only on pages with order buttons and modal)
if (orderBtns.length && modal && orderSummary) {
    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemName = btn.getAttribute('data-item');
            const itemPrice = parseFloat(btn.getAttribute('data-price'));
            
            // Add item to cart
            const existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: 1
                });
            }

            // GA: Menü-Bestellung geklickt
            trackEvent('click_order_item', {
                item_name: itemName,
                price: itemPrice,
                location: 'menu_item_button'
            });
            
            // Visual feedback
            btn.innerHTML = '<i class="fas fa-check"></i> Hinzugefügt!';
            btn.style.background = '#27ae60';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-plus"></i> Bestellen';
                btn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            }, 1500);
            
            // Show cart notification
            showCartNotification();
            
            // Update cart display if modal is open
            if (modal && modal.style.display === 'block') {
                updateOrderSummary();
            }
        });
    });
}

// Show cart notification
function showCartNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        <span>Artikel zum Warenkorb hinzugefügt!</span>
        <button class="cart-notification-btn" onclick="openOrderModal()">Warenkorb anzeigen</button>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Google Analytics loader
function loadGoogleAnalytics() {
    if (!GA_MEASUREMENT_ID) return;
    if (window.gtagInitialized) return;

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
    window.gtagInitialized = true;
}

// Safe event tracking helper
function trackEvent(eventName, params = {}) {
    if (!window.gtagInitialized || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params);
}

// Cookie consent banner
function createCookieBanner() {
    if (document.querySelector('.cookie-banner')) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-banner-inner">
            <div class="cookie-banner-text">
                <h3>Cookies & Datenschutz</h3>
                <p>Wir verwenden Cookies für den technischen Betrieb und anonyme Statistiken (Google Analytics). Sie können selbst entscheiden, wie wir Cookies setzen.</p>
                <p style="font-size: 0.8rem; opacity: 0.8; margin-top: 0.25rem;">Details finden Sie in unserer <a href="datenschutz.html" style="color:#ffd700; text-decoration: underline;">Datenschutzerklärung</a>.</p>
            </div>
            <div class="cookie-banner-actions">
                <button class="cookie-btn cookie-necessary">Nur notwendige Cookies</button>
                <button class="cookie-btn cookie-all">Alle akzeptieren (inkl. Statistik)</button>
            </div>
        </div>
    `;

    banner.style.position = 'fixed';
    banner.style.left = '0';
    banner.style.right = '0';
    banner.style.bottom = '0';
    banner.style.zIndex = '2000';
    banner.style.display = 'flex';
    banner.style.justifyContent = 'center';
    banner.style.alignItems = 'flex-end';
    banner.style.padding = '1rem';
    banner.style.boxSizing = 'border-box';
    banner.style.fontFamily = "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    banner.style.pointerEvents = 'none';

    const inner = banner.querySelector('.cookie-banner-inner');
    const text = banner.querySelector('.cookie-banner-text');
    const actions = banner.querySelector('.cookie-banner-actions');
    const necessaryBtn = banner.querySelector('.cookie-necessary');
    const allBtn = banner.querySelector('.cookie-all');

    if (inner) {
        inner.style.background = 'rgba(0,0,0,0.96)';
        inner.style.color = '#fff';
        inner.style.borderRadius = '14px';
        inner.style.maxWidth = '960px';
        inner.style.width = '100%';
        inner.style.padding = '1.2rem 1.4rem';
        inner.style.boxShadow = '0 18px 45px rgba(0,0,0,0.6)';
        inner.style.display = 'flex';
        inner.style.flexWrap = 'wrap';
        inner.style.gap = '0.75rem 1rem';
        inner.style.alignItems = 'center';
        inner.style.justifyContent = 'space-between';
        inner.style.pointerEvents = 'auto';
    }

    if (text) {
        text.style.flex = '1 1 220px';
        text.style.fontSize = '0.9rem';
    }

    if (actions) {
        actions.style.display = 'flex';
        actions.style.flexWrap = 'wrap';
        actions.style.gap = '0.5rem';
        actions.style.justifyContent = 'flex-end';
    }

    [necessaryBtn, allBtn].forEach(btn => {
        if (!btn) return;
        btn.style.border = 'none';
        btn.style.padding = '0.6rem 1.2rem';
        btn.style.borderRadius = '999px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = '600';
        btn.style.fontSize = '0.9rem';
        btn.style.whiteSpace = 'nowrap';
    });

    if (necessaryBtn) {
        necessaryBtn.style.background = '#2c3e50';
        necessaryBtn.style.color = '#fff';
        necessaryBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'necessary');
            loadGoogleAnalytics();
            banner.remove();
        });
    }

    if (allBtn) {
        allBtn.style.background = '#27ae60';
        allBtn.style.color = '#fff';
        allBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'all');
            loadGoogleAnalytics();
            banner.remove();
        });
    }

    document.body.appendChild(banner);
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Initialize cookie consent & Google Analytics
document.addEventListener('DOMContentLoaded', () => {
    try {
        let consent = localStorage.getItem('cookieConsent');

        if (consent === 'accepted') {
            consent = 'all';
            localStorage.setItem('cookieConsent', 'all');
        } else if (consent === 'rejected') {
            consent = 'necessary';
            localStorage.setItem('cookieConsent', 'necessary');
        }

        if (consent === 'all' || consent === 'necessary') {
            loadGoogleAnalytics();
        } else if (!consent) {
            createCookieBanner();
        }
    } catch (e) {
        console.error('Cookie consent konnte nicht gelesen werden:', e);
    }
});

// Click-to-load Google Maps to reduce initial JS/CSS payload
document.addEventListener('DOMContentLoaded', () => {
    const mapPlaceholder = document.getElementById('mapPlaceholder');
    const loadMapButton = document.getElementById('loadMapButton');

    if (!mapPlaceholder || !loadMapButton) return;

    loadMapButton.addEventListener('click', () => {
        const mapSrc = mapPlaceholder.getAttribute('data-map-src');
        if (!mapSrc) return;

        const iframe = document.createElement('iframe');
        iframe.title = 'Karte Dönerbude Beelen';
        iframe.src = mapSrc;
        iframe.width = '100%';
        iframe.height = '400';
        iframe.style.border = '0';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.allowFullscreen = true;

        // Remove button and insert iframe
        mapPlaceholder.innerHTML = '';
        mapPlaceholder.appendChild(iframe);
    });
});

// Add parallax effect to hero section (optimized with requestAnimationFrame)
const isDesktopViewport = window.matchMedia('(min-width: 769px)').matches;
let lastScrollY = window.pageYOffset || 0;
let heroHeight = heroSection ? heroSection.offsetHeight : 0;

if (isDesktopViewport) {
    window.addEventListener('scroll', () => {
        lastScrollY = window.pageYOffset || 0;
    });

    window.addEventListener('resize', throttle(() => {
        if (heroSection) {
            heroHeight = heroSection.offsetHeight;
        }
    }, 200));

    function updateParallax() {
        if (heroSection && heroContent && heroImage && lastScrollY < heroHeight) {
            const scrolled = lastScrollY;
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        window.requestAnimationFrame(updateParallax);
    }

    window.requestAnimationFrame(updateParallax);
}

// Collapsible Menu Sections
document.addEventListener('DOMContentLoaded', () => {
    const menuHeaders = document.querySelectorAll('.menu-section-header');
    
    // Initialize - collapse all sections except the first one
    menuHeaders.forEach((header, index) => {
        const content = header.nextElementSibling;
        
        if (index === 0) {
            // First section open by default
            content.classList.add('show');
            header.classList.remove('collapsed');
        } else {
            // All other sections collapsed
            content.classList.remove('show');
            header.classList.add('collapsed');
        }
        
        // Add click event
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isCollapsed = header.classList.contains('collapsed');
            
            if (isCollapsed) {
                // Expand this section
                header.classList.remove('collapsed');
                content.classList.add('show');
            } else {
                // Collapse this section
                header.classList.add('collapsed');
                content.classList.remove('show');
            }
        });
    });
});