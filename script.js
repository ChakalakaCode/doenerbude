// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');
const orderBtns = document.querySelectorAll('.order-btn-item');
const modal = document.getElementById('orderModal');
const closeModal = document.querySelector('.close');
const orderSummary = document.getElementById('orderSummary');

// Order cart
let cart = [];
//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
// Mobile Navigation Toggle
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

const videoObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
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
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = '#000';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = '#000';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
});

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

// Add to cart functionality
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
        if (modal.style.display === 'block') {
            updateOrderSummary();
        }
    });
});

// Show cart notification
function showCartNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        <span>Artikel zum Warenkorb hinzugefügt!</span>
        <button onclick="openOrderModal()">Warenkorb anzeigen</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 1500;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Add button styles
    const button = notification.querySelector('button');
    button.style.cssText = `
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
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

// Open order modal
function openOrderModal() {
    updateOrderSummary();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Update order summary
function updateOrderSummary() {
    if (cart.length === 0) {
        orderSummary.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #bdc3c7; margin-bottom: 1rem;"></i>
                <p>Ihr Warenkorb ist leer</p>
                <p style="color: #666; font-size: 0.9rem;">Fügen Sie Artikel aus der Speisekarte hinzu</p>
            </div>
        `;
        return;
    }
    
    let total = 0;
    let summaryHTML = '<div class="cart-items">';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        summaryHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>€${item.price.toFixed(2)} × ${item.quantity}</p>
                </div>
                <div class="item-controls">
                    <button onclick="updateQuantity(${index}, -1)" class="qty-btn">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)" class="qty-btn">+</button>
                    <button onclick="removeItem(${index})" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="item-total">€${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });
    
    summaryHTML += `
        </div>
        <div class="cart-total">
            <h3>Gesamtsumme: €${total.toFixed(2)}</h3>
        </div>
    `;
    
    orderSummary.innerHTML = summaryHTML;
}

// Update item quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateOrderSummary();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    updateOrderSummary();
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .cart-items {
        max-height: 300px;
        overflow-y: auto;
        margin-bottom: 1rem;
    }
    
    .cart-item {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #eee;
        background: #f8f9fa;
        border-radius: 10px;
        margin-bottom: 0.5rem;
    }
    
    .item-info h4 {
        margin: 0 0 0.5rem 0;
        color: #2c3e50;
    }
    
    .item-info p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    .item-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .qty-btn {
        width: 30px;
        height: 30px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .qty-btn:hover {
        background: #e74c3c;
        color: white;
        border-color: #e74c3c;
    }
    
    .quantity {
        font-weight: 600;
        min-width: 20px;
        text-align: center;
    }
    
    .remove-btn {
        background: #e74c3c;
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        margin-left: 0.5rem;
    }
    
    .remove-btn:hover {
        background: #c0392b;
        transform: scale(1.1);
    }
    
    .item-total {
        font-weight: 700;
        color: #e74c3c;
        font-size: 1.1rem;
    }
    
    .cart-total {
        text-align: center;
        padding: 1rem;
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        border-radius: 10px;
        margin-top: 1rem;
    }
    
    .cart-total h3 {
        margin: 0;
        font-size: 1.3rem;
    }
    
    .empty-cart {
        text-align: center;
        padding: 2rem;
        color: #666;
    }
    
    .empty-cart i {
        display: block;
        margin-bottom: 1rem;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Add initial styles for animation
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    // Add animation to contact items
    document.querySelectorAll('.contact-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
});

// Add floating action button for quick order
function createFloatingOrderButton() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-btn';
    fab.innerHTML = `
        <i class="fas fa-phone"></i>
        <span>Bestellen</span>
    `;
    
    fab.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(231, 76, 60, 0.4);
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        transition: all 0.3s ease;
        text-decoration: none;
    `;
    
    fab.addEventListener('click', () => {
        window.location.href = 'tel:+4925868828866';
    });
    
    fab.addEventListener('mouseenter', () => {
        fab.style.transform = 'translateY(-3px) scale(1.05)';
        fab.style.boxShadow = '0 8px 30px rgba(231, 76, 60, 0.5)';
    });
    
    fab.addEventListener('mouseleave', () => {
        fab.style.transform = 'translateY(0) scale(1)';
        fab.style.boxShadow = '0 5px 20px rgba(231, 76, 60, 0.4)';
    });
    
    document.body.appendChild(fab);
    
    // Hide/show on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            fab.style.transform = 'translateY(100px)';
        } else {
            fab.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

// Initialize floating action button
document.addEventListener('DOMContentLoaded', createFloatingOrderButton);

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
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

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