document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Load Components Dynamically
    const loadComponent = async (id, file, callback) => {
        const el = document.getElementById(id);
        if (el) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const html = await response.text();
                    el.innerHTML = html;
                    if (callback) callback();
                }
            } catch (err) {
                console.error('Error loading ' + file, err);
            }
        }
    };

    // Load Header then init header JS
    loadComponent('header-placeholder', 'assets/header.html', () => {
        initHeader();
        setActiveNav();
    });

    // Load Footer then init footer JS
    loadComponent('footer-placeholder', 'assets/footer.html', () => {
        initFooter();
        // Set year
        const yearEl = document.getElementById('currentYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    });

    // 2. Active Navigation Highlight
    const setActiveNav = () => {
        let currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        if (currentPage === '') currentPage = 'index';
        
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
        navLinks.forEach(link => {
            const pageAttr = link.getAttribute('data-page');
            if (pageAttr) {
                const page = pageAttr.replace('.html', '');
                if (page === currentPage) {
                    link.classList.add('active');
                }
            }
        });
    };

    // 3. Header & Mobile Menu Logic
    const initHeader = () => {
        const header = document.getElementById('header');
        
        // Sticky Header
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile Menu
        const mobileToggle = document.querySelector('.mobile-toggle');
        const closeMenu = document.querySelector('.close-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

        if (mobileToggle && overlay) {
            mobileToggle.addEventListener('click', () => {
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden'; // prevent scrolling
            });
        }

        if (closeMenu && overlay) {
            closeMenu.addEventListener('click', () => {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        }

        // Close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    };

    // 4. Footer Logic (Newsletter)
    const initFooter = () => {
        const form = document.getElementById('newsletterForm');
        const successMsg = document.getElementById('newsletterSuccess');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                form.style.display = 'none';
                successMsg.classList.add('active');
            });
        }
    };

    // 5. Scroll Reveal Animation (Intersection Observer)
    const initReveal = () => {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    };

    // Initialize reveal for elements already in DOM
    initReveal();

    // 6. FAQ Accordion
    const initFAQ = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all
                    faqItems.forEach(faq => faq.classList.remove('active'));
                    
                    // Open clicked if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };
    initFAQ();

    // 7. Contact Form
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            if (contactSuccess) contactSuccess.classList.add('active');
        });
    }

    // 8. Animated Counters
    const initCounters = () => {
        const counters = document.querySelectorAll('.counter-value');
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.getAttribute('data-target'));
                    const duration = 2000;
                    const start = performance.now();

                    const updateCounter = (currentTime) => {
                        const elapsed = currentTime - start;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Ease out quart
                        const easeProgress = 1 - Math.pow(1 - progress, 4);
                        
                        target.innerText = Math.floor(finalValue * easeProgress);

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.innerText = finalValue;
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    };
    initCounters();

    // Re-init observers after a small delay in case DOM is still rendering
    setTimeout(() => {
        initReveal();
        initCounters();
    }, 500);
});
