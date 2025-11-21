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