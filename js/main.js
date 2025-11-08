/* ========================================
   MAIN JAVASCRIPT FILE
   José Picado Portfolio
   All interactive functionality
   ======================================== */

// ========== GLOBAL VARIABLES ==========
let lottieAnimation = null;

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme on load
    initTheme();

    // Initialize AOS (Animate On Scroll) library
    initAOS();

    // Setup scroll-to-top button functionality
    setupScrollToTop();

    // Setup navbar scroll effect
    setupNavbarScroll();

    // Initialize Lottie loader
    initLottieLoader();

    // Setup contact form
    setupContactForm();

    // Close mobile menu when clicking on a link
    setupMobileMenuClose();

    // Initialize Swiper Projects Carousel
    initProjectsSwiper();

    // Initialize GSAP Animations
    initGSAPAnimations();

    console.log('Portfolio initialized (DOMContentLoaded) ✓');
});

// ========== WINDOW LOAD INITIALIZATION ==========
/**
 * Initialize smooth scroll after ALL resources are fully loaded
 * This ensures accurate calculations for scroll positions
 * (fonts, images, Swiper carousel, etc. are fully rendered)
 */
window.addEventListener('load', function() {
    // CRITICAL: Force all AOS elements to animate immediately
    // This prevents layout shifts during navigation
    forceAnimateAllAOS();

    // Wait for animations to settle, then enable smooth scroll
    setTimeout(() => {
        setupSmoothScroll();
        console.log('All resources loaded - Smooth scroll ready! 🚀');
    }, 1000); // 1000ms allows AOS animations (800ms) to complete
});

// ========== AOS INITIALIZATION ==========
/**
 * Initialize AOS (Animate On Scroll) library with custom settings
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,          // Animation duration in milliseconds
            easing: 'ease-out-cubic', // Easing function
            once: true,             // Animation happens only once
            offset: 100,            // Offset from original trigger point
            delay: 0,               // Delay before animation starts
            anchorPlacement: 'top-bottom', // Defines which position triggers animation
            startEvent: 'DOMContentLoaded' // Start calculating positions
        });

        console.log('AOS animations initialized ✓');
    }
}

/**
 * Force all AOS elements to animate immediately on page load
 * This prevents layout shifts during navigation caused by lazy AOS animations
 */
function forceAnimateAllAOS() {
    if (typeof AOS === 'undefined') return;

    // Find ALL elements with data-aos attribute
    const allAosElements = document.querySelectorAll('[data-aos]');

    // Force them all to animate by adding the aos-animate class
    allAosElements.forEach(el => {
        el.classList.add('aos-animate');
    });

    console.log(`Forced ${allAosElements.length} AOS elements to animate ✓`);
}

// ========== LOTTIE LOADING ANIMATION ==========
/**
 * Initialize Lottie loading animation for contact form
 */
function initLottieLoader() {
    const loaderContainer = document.getElementById('lottieLoader');

    if (!loaderContainer) {
        console.warn('Lottie loader container not found');
        return;
    }

    if (typeof lottie === 'undefined') {
        console.warn('Lottie library not loaded');
        return;
    }

    // Initialize Lottie animation
    lottieAnimation = lottie.loadAnimation({
        container: loaderContainer,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'images/Trail loading.json'
    });

    console.log('Lottie loader initialized ✓');
}

/**
 * Show loading animation
 */
function showLoader() {
    const loaderContainer = document.getElementById('lottieLoader');
    const submitBtn = document.querySelector('.btn-submit');

    if (loaderContainer && lottieAnimation) {
        loaderContainer.style.display = 'block';
        lottieAnimation.play();
        if (submitBtn) submitBtn.style.display = 'none';
    }
}

/**
 * Hide loading animation
 */
function hideLoader() {
    const loaderContainer = document.getElementById('lottieLoader');
    const submitBtn = document.querySelector('.btn-submit');

    if (loaderContainer && lottieAnimation) {
        loaderContainer.style.display = 'none';
        lottieAnimation.stop();
        if (submitBtn) submitBtn.style.display = 'block';
    }
}

// ========== DARK/LIGHT MODE TOGGLE ==========
/**
 * Initialize theme from localStorage or system preference
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);

    console.log(`Theme initialized: ${theme} ✓`);
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

/**
 * Update theme toggle button icon
 * @param {string} theme - Current theme ('dark' or 'light')
 */
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// ========== SMOOTH SCROLL ==========
/**
 * Setup clean smooth scrolling - all AOS elements are pre-animated on load
 * This ensures stable, accurate positioning from the first click
 */
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const navbar = document.querySelector('.navbar');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                let targetElement;
                let offset;

                // Determine target element and offset for each section
                if (targetId === 'hero') {
                    targetElement = targetSection.querySelector('.hero-tag') || targetSection;
                    offset = 20;
                } else if (targetId === 'about' || targetId === 'projects' || targetId === 'skills') {
                    targetElement = targetSection.querySelector('.section-header') || targetSection;
                    offset = 10;
                } else if (targetId === 'contact') {
                    targetElement = targetSection.querySelector('.section-header') || targetSection;
                    offset = 20;
                } else {
                    targetElement = targetSection;
                    offset = 0;
                }

                // Calculate scroll position (all AOS elements already animated)
                const rect = targetElement.getBoundingClientRect();
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                const scrollTarget = currentScroll + rect.top - navbarHeight - offset;

                // Single smooth scroll - clean and precise
                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Clean smooth scroll enabled ✓');
}

// ========== SCROLL TO TOP BUTTON ==========
/**
 * Setup scroll-to-top button functionality
 * Button appears after scrolling 300px down
 */
function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (!scrollTopBtn) {
        console.warn('Scroll to top button not found');
        return;
    }

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('Scroll to top button setup complete ✓');
}

// ========== NAVBAR SCROLL EFFECT ==========
/**
 * Add 'scrolled' class to navbar when user scrolls down
 * Creates a visual effect on the navigation bar
 */
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) {
        console.warn('Navbar not found');
        return;
    }

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    console.log('Navbar scroll effect setup complete ✓');
}

// ========== MOBILE MENU ==========
/**
 * Close mobile menu when a navigation link is clicked
 */
function setupMobileMenuClose() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Check if menu is open (Bootstrap collapse)
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
            }
        });
    });

    console.log('Mobile menu close setup complete ✓');
}

// ========== CONTACT FORM ==========
/**
 * Setup contact form with validation and submission
 * EmailJS integration (commented out - needs configuration)
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Enhanced validation with specific error messages
        const validationResult = validateForm(formData);
        if (!validationResult.isValid) {
            showFormStatus('error', validationResult.message);
            return;
        }

        // Show loading animation
        showLoader();

        // ========== EMAILJS INTEGRATION ==========
        // EmailJS Credentials (Updated 2025)
        const PUBLIC_KEY = 'c1v4HjVi2uotL4KP0';  // ✅ Updated
        const SERVICE_ID = 'service_wrz9qj4';  // ✅ Updated

        // Template IDs
        const TEMPLATE_CONTACT = 'template_z5lima8';  // Contact notification to José
        const TEMPLATE_AUTOREPLY = 'template_zjzcuqt';  // Auto-reply to user

        // Initialize EmailJS
        emailjs.init(PUBLIC_KEY);

        console.log('📧 Sending both emails...', {
            service: SERVICE_ID,
            templates: { contact: TEMPLATE_CONTACT, autoreply: TEMPLATE_AUTOREPLY },
            formData: formData
        });

        // Send BOTH emails: Contact notification + Auto-reply
        // Test each email separately to identify which one is failing

        // Email 1: Send contact notification to José Picado
        emailjs.send(SERVICE_ID, TEMPLATE_CONTACT, {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message
        })
        .then(function(response) {
            console.log('✅ Contact notification sent successfully!', response);

            // Email 2: Send auto-reply confirmation to the user
            // Variables must match template configuration exactly
            return emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, {
                email: formData.email,      // {{email}} - To Email field
                from_name: formData.name,   // {{from_name}} - In HTML
                message: formData.message   // {{message}} - In HTML
            });
        })
        .then(function(response) {
            console.log('✅ Auto-reply sent successfully!', response);
            console.log('🎉 Both emails sent!');
            showFormStatus('success', getSuccessMessage());
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('❌ Email sending failed:', error);
            console.error('📋 Error status:', error.status);
            console.error('📋 Error text:', error.text);
            console.error('📋 Full error:', error);

            // Show which template failed
            const errorMsg = error.status === 422
                ? (currentLanguage === 'es'
                    ? 'Error 422: Las variables del template no coinciden. Verifica tu configuración en EmailJS.'
                    : 'Error 422: Template variables mismatch. Check your EmailJS configuration.')
                : getErrorMessage();

            showFormStatus('error', errorMsg);
        })
        .finally(function() {
            // Hide loading animation
            hideLoader();
        });
    });

    console.log('Contact form setup complete ✓');
}

/**
 * Validate contact form data with specific error messages
 * @param {Object} data - Form data object
 * @returns {Object} - Object with isValid boolean and message string
 */
function validateForm(data) {
    const lang = typeof currentLanguage !== 'undefined' ? currentLanguage : 'es';

    // Validation error messages
    const errorMessages = {
        es: {
            emptyName: 'Por favor ingresa tu nombre.',
            emptyEmail: 'Por favor ingresa tu email.',
            emptyMessage: 'Por favor ingresa un mensaje.',
            invalidEmail: 'Por favor ingresa un email válido.',
            shortMessage: 'El mensaje debe tener al menos 10 caracteres.',
            longName: 'El nombre no puede exceder 100 caracteres.',
            longMessage: 'El mensaje no puede exceder 1000 caracteres.'
        },
        en: {
            emptyName: 'Please enter your name.',
            emptyEmail: 'Please enter your email.',
            emptyMessage: 'Please enter a message.',
            invalidEmail: 'Please enter a valid email address.',
            shortMessage: 'Message must be at least 10 characters long.',
            longName: 'Name cannot exceed 100 characters.',
            longMessage: 'Message cannot exceed 1000 characters.'
        }
    };

    const messages = errorMessages[lang];

    // Check if name is filled
    if (!data.name) {
        return { isValid: false, message: messages.emptyName };
    }

    // Check name length
    if (data.name.length > 100) {
        return { isValid: false, message: messages.longName };
    }

    // Check if email is filled
    if (!data.email) {
        return { isValid: false, message: messages.emptyEmail };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return { isValid: false, message: messages.invalidEmail };
    }

    // Check if message is filled
    if (!data.message) {
        return { isValid: false, message: messages.emptyMessage };
    }

    // Check minimum message length
    if (data.message.length < 10) {
        return { isValid: false, message: messages.shortMessage };
    }

    // Check maximum message length
    if (data.message.length > 1000) {
        return { isValid: false, message: messages.longMessage };
    }

    return { isValid: true, message: '' };
}

/**
 * Display form status message
 * @param {string} type - 'success' or 'error'
 * @param {string} message - Message to display
 */
function showFormStatus(type, message) {
    const formStatus = document.getElementById('formStatus');

    if (!formStatus) return;

    // Remove existing classes
    formStatus.classList.remove('success', 'error');

    // Add appropriate class and message
    formStatus.classList.add(type);
    formStatus.textContent = message;
    formStatus.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

/**
 * Get success message based on current language
 * @returns {string} Success message
 */
function getSuccessMessage() {
    // Use translations object if available (from language.js)
    if (typeof translations !== 'undefined' && typeof currentLanguage !== 'undefined') {
        return translations[currentLanguage]['form-success'] ||
               (currentLanguage === 'es'
                   ? '¡Mensaje enviado exitosamente! Te contactaré pronto.'
                   : 'Message sent successfully! I will contact you soon.');
    }
    // Fallback
    return currentLanguage === 'es'
        ? '¡Mensaje enviado exitosamente! Te contactaré pronto.'
        : 'Message sent successfully! I will contact you soon.';
}

/**
 * Get error message based on current language
 * @returns {string} Error message
 */
function getErrorMessage() {
    // Use translations object if available (from language.js)
    if (typeof translations !== 'undefined' && typeof currentLanguage !== 'undefined') {
        return translations[currentLanguage]['form-error'] ||
               (currentLanguage === 'es'
                   ? 'Error al enviar mensaje. Por favor intenta de nuevo o contáctame directamente.'
                   : 'Error sending message. Please try again or contact me directly.');
    }
    // Fallback
    return currentLanguage === 'es'
        ? 'Error al enviar mensaje. Por favor intenta de nuevo o contáctame directamente.'
        : 'Error sending message. Please try again or contact me directly.';
}

// ========== PERFORMANCE OPTIMIZATION ==========
/**
 * Lazy load images when they come into viewport
 * (Optional enhancement - can be added later)
 */
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ========== UTILITY FUNCTIONS ==========
/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== SWIPER CAROUSEL INITIALIZATION ==========
/**
 * Initialize Swiper.js Projects Carousel
 */
function initProjectsSwiper() {
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper library not loaded');
        return;
    }

    const projectsSwiper = new Swiper('.projectsSwiper', {
        // Swiper Parameters
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        speed: 800,
        effect: 'slide',

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        // Keyboard control
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        // Mouse wheel control
        mousewheel: {
            enabled: false,
        },

        // Responsive breakpoints
        breakpoints: {
            768: {
                slidesPerView: 1,
            },
        },

        // Events
        on: {
            init: function () {
                console.log('Projects Swiper initialized ✓');
                // DISABLED: updateProjectContent causes image/content mismatch
                // updateProjectContent(this.realIndex);
            },
            slideChange: function () {
                // DISABLED: updateProjectContent causes image/content mismatch
                // Content is already correctly set in HTML, no need to override
                // updateProjectContent(this.realIndex);

                // Add custom animations on slide change
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    activeSlide.classList.add('swiper-slide-animated');
                }
            },
        },
    });
}


// ========== GSAP ANIMATIONS ==========
/**
 * Initialize GSAP Premium Animations
 */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP library not loaded');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.from('.hero-tag', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.hero-heading', {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-tagline', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.hero-stats .stat-item', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.4)'
    });

    gsap.from('.btn-cta', {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: 1,
        ease: 'elastic.out(1, 0.5)'
    });

    // Section Title Animations with ScrollTrigger
    gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Skills Cards Animation
    gsap.from('.skill-card', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 75%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse'
        }
    });

    // Floating Buttons Animation
    gsap.from('.btn-floating', {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        delay: 1.5,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });

    // Mouse follower effect for hero section (optional premium effect)
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to('.hero-image-wrapper, .image-wrapper', {
                x: x,
                y: y,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }

    console.log('GSAP animations initialized ✓');
}

// ========== CONSOLE BRANDING ==========
/**
 * Display custom console message
 * (Fun easter egg for developers who inspect the site)
 */
console.log('%c👋 Hey there, fellow developer!', 'color: #33af7f; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'color: #203c86; font-size: 14px;');
console.log('%c📧 jpicado011@gmail.com', 'color: #4b77bb; font-size: 12px;');
console.log('%c💼 linkedin.com/in/josé-andrés-picado-corrales-a10a28173', 'color: #4b77bb; font-size: 12px;');
console.log('%c🐧 Precision in Process, Power in Performance', 'color: #33af7f; font-size: 12px; font-style: italic;');
