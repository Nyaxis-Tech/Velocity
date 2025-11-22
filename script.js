// Immediate scroll to top
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Scroll to top on page load/reload
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('pageshow', () => {
    window.scrollTo(0, 0);
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// DOM loaded animations
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => observer.observe(card));

    const vehicleCards = document.querySelectorAll('.vehicle-card');
    vehicleCards.forEach(card => observer.observe(card));

    const specCards = document.querySelectorAll('.spec-card');
    specCards.forEach(card => observer.observe(card));
});

// Header scroll
window.addEventListener('scroll', () => {
    document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// CTA form
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = ctaForm.querySelector('.email-input').value;
        alert(`Thank you! We'll contact you at ${email} soon.`);
        ctaForm.reset();
    });
}

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Hover lift effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statItems = entry.target.querySelectorAll('.stat-item');
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    const valueElement = item.querySelector('.stat-value');
                    const text = valueElement.textContent.trim();
                    const isPercentage = text.includes('%');
                    const isKPlus = text.includes('K+');
                    const isPlus = text.includes('+') && !isKPlus;

                    let targetNumber;
                    if (isKPlus) {
                        targetNumber = parseInt(text.replace(/\D/g, '')) * 1000;
                    } else {
                        targetNumber = parseInt(text.replace(/\D/g, ''));
                    }

                    if (targetNumber) {
                        let currentNumber = 0;
                        const duration = 2000;
                        const increment = targetNumber / (duration / 16);

                        const counterInterval = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= targetNumber) {
                                let finalText;
                                if (isKPlus) {
                                    finalText = Math.floor(targetNumber / 1000) + 'K+';
                                } else if (isPercentage) {
                                    finalText = targetNumber + '%';
                                } else if (isPlus) {
                                    finalText = targetNumber + '+';
                                } else {
                                    finalText = targetNumber;
                                }
                                valueElement.textContent = finalText;
                                clearInterval(counterInterval);
                            } else {
                                let displayNumber;
                                if (isKPlus) {
                                    displayNumber = Math.floor(currentNumber / 1000) + 'K+';
                                } else if (isPercentage) {
                                    displayNumber = Math.floor(currentNumber) + '%';
                                } else if (isPlus) {
                                    displayNumber = Math.floor(currentNumber) + '+';
                                } else {
                                    displayNumber = Math.floor(currentNumber);
                                }
                                valueElement.textContent = displayNumber;
                            }
                        }, 16);
                    }
                }, index * 200);
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.3 });

// Observe stats
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelector('.stats');
    if (stats) statsObserver.observe(stats);
});

// Loader hide
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hidden");

        // Trigger hero animations
        setTimeout(() => {
            const heroAnimatedElements = document.querySelectorAll('.hero .fade-in-up');
            heroAnimatedElements.forEach(element => {
                element.classList.add('animate');
            });
        }, 200);

    }, 700);
});

// FEATURE CAROUSEL FIX
let currentFeatureIndex = 0;
const featureCards = document.querySelectorAll('.feature-card');
const totalFeatures = featureCards.length;

function rotateFeatures() {
    featureCards.forEach((card, index) => {
        const position = (index - currentFeatureIndex + totalFeatures) % totalFeatures;
        // position 0 is center, 1 is right, totalFeatures-1 is left
        if (position === 0) {
            card.style.transform = 'translateX(0) scale(1)';
            card.style.opacity = '1';
            card.style.zIndex = '3';
            card.classList.add('is-active');
            card.setAttribute('aria-hidden', 'false');

        } else if (position === 1) {
            card.style.transform = 'translateX(260px) scale(0.85)';
            card.style.opacity = '0.7';
            card.style.zIndex = '2';
            card.classList.remove('is-active');
            card.setAttribute('aria-hidden', 'true');

        } else if (position === totalFeatures - 1) {
            card.style.transform = 'translateX(-260px) scale(0.85)';
            card.style.opacity = '0.7';
            card.style.zIndex = '2';
            card.classList.remove('is-active');
            card.setAttribute('aria-hidden', 'true');

        } else {
            const direction = position < totalFeatures / 2 ? 1 : -1;
            card.style.transform = `translateX(${direction * 450}px) scale(0.6)`;
            card.style.opacity = '0.2';
            card.style.zIndex = '1';
            card.classList.remove('is-active');
            card.setAttribute('aria-hidden', 'true');
        }
    });

    currentFeatureIndex = (currentFeatureIndex + 1) % totalFeatures;
}

document.addEventListener('DOMContentLoaded', () => {
    if (featureCards.length > 0) {
        rotateFeatures();
        setInterval(rotateFeatures, 3000);
    }
});


// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// Language Switching Functionality
let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    const body = document.body;
    const elementsWithTranslation = document.querySelectorAll('[data-en][data-ar]');
    
    // Update text content
    elementsWithTranslation.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Handle special elements that need HTML structure preserved
            if (element.classList.contains('hero-title')) {
                if (lang === 'ar') {
                    element.innerHTML = `${text} <span class="gradient-text"></span>`;
                } else {
                    element.innerHTML = `Drive The <span class="gradient-text">Future</span>`;
                }
            } else if (element.classList.contains('section-title')) {
                // Handle section titles with gradient text
                const hasGradientText = element.querySelector('.gradient-text');
                if (hasGradientText) {
                    if (lang === 'ar') {
                        // Split Arabic text to put last word in gradient
                        const words = text.split(' ');
                        if (words.length > 1) {
                            const lastWord = words.pop();
                            const firstPart = words.join(' ');
                            element.innerHTML = `${firstPart} <span class="gradient-text">${lastWord}</span>`;
                        } else {
                            element.innerHTML = `<span class="gradient-text">${text}</span>`;
                        }
                    } else {
                        // Handle English gradient text patterns
                        if (text.includes('Excellence')) {
                            element.innerHTML = `Engineered For <span class="gradient-text">Excellence</span>`;
                        } else if (text.includes('Collection')) {
                            element.innerHTML = `Our <span class="gradient-text">Collection</span>`;
                        } else if (text.includes('Specifications')) {
                            element.innerHTML = `Technical <span class="gradient-text">Specifications</span>`;
                        } else if (text.includes('Journey')) {
                            element.innerHTML = `Begin Your <span class="gradient-text">Journey</span>`;
                        } else {
                            element.innerHTML = `<span class="gradient-text">${text}</span>`;
                        }
                    }
                } else {
                    element.textContent = text;
                }
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update email input placeholder
    const emailInput = document.querySelector('.email-input');
    if (emailInput) {
        const placeholder = emailInput.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            emailInput.placeholder = placeholder;
        }
    }
    
    // Update direction and language attributes
    if (lang === 'ar') {
        body.setAttribute('dir', 'rtl');
        body.setAttribute('lang', 'ar');
    } else {
        body.setAttribute('dir', 'ltr');
        body.setAttribute('lang', 'en');
    }
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
}

// Initialize language switching
document.addEventListener('DOMContentLoaded', () => {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    switchLanguage(savedLang);
    
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});

// Active navigation highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop;
        if (window.pageYOffset >= top - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
