// ═══════════════════════════════════════════════════════════
// ELIETRIQUE.COM - JAVASCRIPT
// Version séparée par Junior & Claude - Février 2025
// ═══════════════════════════════════════════════════════════

// ========================================
// LANGUAGE SWITCHER
// ========================================
function switchLanguage() {
    const body = document.body;
    const currentLang = body.classList.contains('lang-fr') ? 'fr' : 'en';
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    
    // Toggle body class
    body.classList.remove('lang-fr', 'lang-en');
    body.classList.add(`lang-${newLang}`);
    
    // Hide all language elements
    document.querySelectorAll('.lang-fr, .lang-en').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show new language elements
    document.querySelectorAll(`.lang-${newLang}`).forEach(el => {
        el.style.display = '';
    });
    
    // Update form placeholders
    updateFormPlaceholders(newLang);
    
    // Update select options
    updateSelectOptions(newLang);
    
    // Save preference
    localStorage.setItem('elietrique-lang', newLang);
    
    // Update page title and meta
    if (newLang === 'en') {
        document.title = 'ElieTrique.com - Professional Electrician in Sainte-Thérèse';
        document.querySelector('meta[name="description"]').content = 'ElieTrique.com - Professional electrical services in Sainte-Thérèse. Installation, renovation, 24/7 emergency. Certified master electrician.';
        document.documentElement.lang = 'en';
    } else {
        document.title = 'ÉlieTrique.com - Électricien Professionnel à Sainte-Thérèse';
        document.querySelector('meta[name="description"]').content = 'ÉlieTrique.com - Services d\'électricité professionnels à Sainte-Thérèse. Installation, rénovation, urgence 24/7. Maître électricien certifié.';
        document.documentElement.lang = 'fr';
    }
}

function updateFormPlaceholders(lang) {
    const inputs = document.querySelectorAll('[data-placeholder-fr], [data-placeholder-en]');
    inputs.forEach(input => {
        const placeholder = input.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
}

function updateSelectOptions(lang) {
    const select = document.getElementById('serviceSelect');
    if (select) {
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            const text = option.getAttribute(`data-text-${lang}`);
            if (text) {
                option.textContent = text;
            }
        });
    }
}

// Load saved language on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('elietrique-lang');
    if (savedLang && savedLang !== 'fr') {
        switchLanguage();
    }
    
    // Initialize portfolio lightbox if exists
    if (typeof initPortfolioLightbox === 'function') {
        initPortfolioLightbox();
    }
});

// ========================================
// MENU HAMBURGER
// ========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    body.classList.toggle('menu-open');
});

const allNavLinks = document.querySelectorAll('.nav-links a');
allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 165, 0, 0.3)';
        navbar.style.boxShadow = '0 2px 12px rgba(255, 165, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 8px rgba(255, 165, 0, 0.2)';
    }
});

// ========================================
// COOKIE CONSENT
// ========================================
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');
const cookiePolicy = document.getElementById('cookiePolicy');

function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }
}

acceptCookies.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieConsent.classList.remove('show');
    console.log('Cookies accepted');
});

declineCookies.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'declined');
    cookieConsent.classList.remove('show');
    console.log('Cookies declined');
});

cookiePolicy.addEventListener('click', function(e) {
    e.preventDefault();
    const currentLang = document.body.classList.contains('lang-fr') ? 'fr' : 'en';
    if (currentLang === 'fr') {
        alert('Politique de cookies:\n\nNous utilisons des cookies pour:\n- Améliorer votre expérience de navigation\n- Analyser l\'utilisation du site\n- Mémoriser vos préférences de langue\n\nAucune donnée personnelle n\'est collectée sans votre consentement.');
    } else {
        alert('Cookie Policy:\n\nWe use cookies to:\n- Improve your browsing experience\n- Analyze site usage\n- Remember your language preferences\n\nNo personal data is collected without your consent.');
    }
});

// Initialize cookie consent check
checkCookieConsent();

// ========================================
// PORTFOLIO LIGHTBOX - SUPER WOW! 🔥
// ========================================
function initPortfolioLightbox() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioItems.length === 0) return; // Skip if no portfolio items
    
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
            <img src="" alt="" class="lightbox-image">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    let currentIndex = 0;
    const images = Array.from(portfolioItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt,
        caption: item.dataset.caption || ''
    }));
    
    function showImage(index) {
        currentIndex = index;
        const img = images[index];
        lightbox.querySelector('.lightbox-image').src = img.src;
        lightbox.querySelector('.lightbox-image').alt = img.alt;
        lightbox.querySelector('.lightbox-caption').textContent = img.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLight box() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }
    
    // Event listeners
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => showImage(index));
    });
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);
    
    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

// ═══════════════════════════════════════════════════════════
// FIN DU SCRIPT - Peace & Flow! 🌊
// ═══════════════════════════════════════════════════════════
