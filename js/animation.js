// animations.js - Enhanced Animation Library for PI DOT Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initScrollAnimations();
    initCounterAnimations();
    initScrollReveal();
    initHeroAnimations();
});

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.75) &&
            rect.bottom >= (window.innerHeight * 0.25)
        );
    }
    
    // Animate elements when they come into view
    function animateOnScroll() {
        animatedElements.forEach((element, index) => {
            if (isInViewport(element)) {
                // Add staggered delay based on element position
                const delay = index * 100;
                
                setTimeout(() => {
                    element.classList.add('animated');
                    
                    // Special handling for slide-up elements
                    if (element.classList.contains('slide-up')) {
                        element.classList.add('slide-up-animated');
                    }
                }, delay);
            }
        });
    }
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll with throttling
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(animateOnScroll, 50);
    }, false);
}

/**
 * Initialize counter animations for statistics
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    
    // Animation duration in milliseconds
    const duration = 2000;
    // How often to update the numbers (ms)
    const frameDuration = 16;
    // Total number of frames
    const totalFrames = Math.round(duration / frameDuration);
    
    // Easing function for smooth animation
    const easeOutQuad = t => t * (2 - t);
    
    // Animate a single counter
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'), 10);
        const start = 0;
        let frame = 0;
        
        const counter = setInterval(() => {
            frame++;
            
            // Calculate progress
            const progress = easeOutQuad(frame / totalFrames);
            const currentValue = Math.round(target * progress);
            
            // Update the element
            element.textContent = currentValue.toLocaleString();
            
            // Stop when we hit the target
            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    };
    
    // Only animate when stats section is in view
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            counters.forEach(counter => {
                animateCounter(counter);
            });
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
    // Configure scroll reveal options
    const scrollRevealConfig = {
        // Global settings
        distance: '40px',
        duration: 800,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        interval: 100,
        
        // Element-specific settings
        selectors: {
            '.solution-card': {
                origin: 'bottom',
                delay: 200
            },
            '.stat-item': {
                origin: 'bottom',
                delay: 300
            },
            '.insight-card': {
                origin: 'bottom',
                delay: 150
            },
            '.testimonial': {
                origin: 'bottom',
                delay: 250
            },
            '.case-study': {
                origin: 'bottom',
                delay: 200,
                distance: '60px'
            }
        }
    };
    
    // Apply scroll reveal to elements
    for (const [selector, options] of Object.entries(scrollRevealConfig.selectors)) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            // Add delay based on element position
            const delay = options.delay + (index * scrollRevealConfig.interval);
            
            // Create intersection observer for each element
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add animation classes
                        entry.target.classList.add('scroll-reveal');
                        entry.target.style.setProperty('--reveal-distance', options.distance || scrollRevealConfig.distance);
                        
                        // Set animation duration and delay
                        entry.target.style.animation = `revealAnimation ${scrollRevealConfig.duration}ms cubic-bezier(0.5, 0, 0, 1) ${delay}ms forwards`;
                        
                        // Stop observing after animation
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    }
}

/**
 * Initialize hero section animations
 */
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    // Split hero text for letter animations
    const heroHeading = heroContent.querySelector('h1');
    if (heroHeading) {
        heroHeading.innerHTML = heroHeading.textContent.split('').map(letter => 
            `<span class="hero-letter">${letter === ' ' ? '&nbsp;' : letter}</span>`
        ).join('');
        
        // Animate each letter with staggered delay
        const letters = heroContent.querySelectorAll('.hero-letter');
        letters.forEach((letter, index) => {
            letter.style.animation = `fadeInUp 0.6s ease forwards ${index * 50}ms`;
        });
    }
    
    // Animate hero paragraph
    const heroParagraph = heroContent.querySelector('p');
    if (heroParagraph) {
        setTimeout(() => {
            heroParagraph.style.animation = 'fadeIn 1s ease forwards 500ms';
        }, 300);
    }
    
    // Animate hero buttons
    const heroButtons = heroContent.querySelector('.hero-buttons');
    if (heroButtons) {
        setTimeout(() => {
            heroButtons.style.animation = 'fadeIn 1s ease forwards 800ms';
        }, 300);
    }
    
    // Animate scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.style.animation = 'bounce 2s infinite 1s';
        }, 1000);
    }
}

/**
 * Simple ScrollReveal alternative
 */
function simpleScrollReveal() {
    const elements = document.querySelectorAll('[data-sr]');
    
    function checkScroll() {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                const delay = element.getAttribute('data-sr-delay') || 0;
                const duration = element.getAttribute('data-sr-duration') || 800;
                const distance = element.getAttribute('data-sr-distance') || '40px';
                const origin = element.getAttribute('data-sr-origin') || 'bottom';
                
                // Set CSS properties for animation
                element.style.setProperty('--sr-distance', distance);
                element.style.setProperty('--sr-origin', origin);
                element.style.animation = `revealAnimation ${duration}ms ease forwards ${delay}ms`;
                
                // Remove attribute to prevent re-animation
                element.removeAttribute('data-sr');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
}

// Initialize simple scroll reveal if needed
if (document.querySelector('[data-sr]')) {
    simpleScrollReveal();
}

// Add CSS keyframes dynamically
function injectKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes revealAnimation {
            from {
                opacity: 0;
                transform: translateY(var(--reveal-distance, 40px));
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0) translateX(-50%);
            }
            40% {
                transform: translateY(-20px) translateX(-50%);
            }
            60% {
                transform: translateY(-10px) translateX(-50%);
            }
        }
    `;
    document.head.appendChild(style);
}

// Inject keyframes when the script loads
injectKeyframes();