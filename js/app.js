/**
 * Divalby Demo Hub — Main Application
 * Premium template showcase platform
 */

(function () {
  'use strict';

  /* ============================================
     Data
     ============================================ */

  const templates = [
    {
      title: 'Divalby Connector',
      category: 'business',
      description: 'Modern integration and automation landing page designed to help businesses showcase workflows, connectivity solutions, and digital transformation services with a clean, conversion-focused experience.',
      features: ['Modern SaaS UI', 'Conversion Focused', 'Fully Responsive', 'Fast Loading'],
      demo: 'https://demo.divalby.com/Divalby%20Connector/',
      buy: 'https://store.divalby.com/b/mJzhg',
      image: 'assets/divalby-connector.png'
    },
    {
      title: 'Atlas Law',
      category: 'law',
      description: 'Premium law firm website template crafted for attorneys, legal consultants, and professional practices seeking a luxurious online presence that builds trust and authority.',
      features: ['Luxury Design', 'Attorney Profiles', 'SEO Optimized', 'Mobile Responsive'],
      demo: 'https://premium.divalby.com/',
      buy: 'https://store.divalby.com/b/NApOh',
      image: 'assets/atlas-law.png'
    },
    {
      title: 'SaaS Landing Page',
      category: 'saas',
      description: 'High-converting SaaS landing page built for startups, software products, and technology companies looking to generate leads and increase product signups.',
      features: ['Lead Generation', 'Modern Dashboard UI', 'Responsive Design', 'Startup Ready'],
      demo: 'https://demo.divalby.com/saas%20landing%20page/',
      buy: 'https://drive.google.com/uc?export=download&id=1GmJC0GAzG_jBUILp9YCgLxPZLugL8nVC',
      image: 'assets/saas-landing-page.png'
    },
    {
      title: 'Divalby Agency Pro',
      category: 'agency',
      description: 'Professional agency website template created for digital agencies, freelancers, creative studios, and marketing teams that want to showcase their services with confidence.',
      features: ['Portfolio Showcase', 'Service Sections', 'Premium Animations', 'SEO Ready'],
      demo: 'https://demo.divalby.com/divalby%20agency%20pro/index.html',
      buy: 'https://drive.google.com/uc?export=download&id=1a-XhFAwMwrI3zVbYMZuF-6Zf3x8fxtc-',
      image: 'assets/divalby-agency-pro.png'
    }
  ];

  const comingSoon = [
    { title: 'Casa Restaurant', category: 'restaurant', image: 'assets/casa.svg' },
    { title: 'Medica Clinic', category: 'medical', image: 'assets/medica.svg' },
    { title: 'Nova Agency', category: 'agency', image: 'assets/nova.svg' },
    { title: 'BuildCore', category: 'consulting', image: 'assets/buildcore.svg' }
  ];

  /* ============================================
     State
     ============================================ */

  let activeCategory = 'all';
  let searchQuery = '';

  /* ============================================
     DOM References
     ============================================ */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ============================================
     Template Rendering
     ============================================ */

  function createTemplateCard(template) {
    const card = document.createElement('article');
    card.className = 'template-card tilt-card reveal';
    card.dataset.category = template.category;
    card.dataset.title = template.title.toLowerCase();

    const featuresHTML = template.features
      .map(f => `<span class="template-card__feature">${f}</span>`)
      .join('');

    card.innerHTML = `
      <div class="template-card__preview">
        <img src="${template.image}" alt="${template.title} preview" loading="lazy" width="640" height="400">
        <span class="template-card__badge">${template.category}</span>
      </div>
      <div class="template-card__body">
        <h3 class="template-card__title">${template.title}</h3>
        <p class="template-card__desc">${template.description}</p>
        <div class="template-card__features">${featuresHTML}</div>
        <div class="template-card__actions">
          <a href="${template.demo}" class="btn btn--primary magnetic-btn" target="_blank" rel="noopener">
            <span>Live Demo</span>
          </a>
          <a href="${template.buy}" class="btn btn--ghost magnetic-btn" target="_blank" rel="noopener">
            <span>Acquire Now</span>
          </a>
        </div>
      </div>
    `;

    return card;
  }

  function renderTemplates() {
    const grid = $('#templatesGrid');
    if (!grid) return;

    grid.innerHTML = '';
    templates.forEach(t => grid.appendChild(createTemplateCard(t)));
    applyFilters();
    initTiltCards();
    initMagneticButtons(grid);
    observeReveals(grid);
  }

  function createComingSoonCard(item) {
    const card = document.createElement('div');
    card.className = 'coming-card reveal';

    card.innerHTML = `
      <div class="coming-card__preview">
        <img src="${item.image}" alt="${item.title}" loading="lazy" width="400" height="250">
        <div class="coming-card__overlay">
          <div class="coming-card__lock">
            <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <span class="coming-card__label">Coming Soon</span>
        </div>
      </div>
      <div class="coming-card__body">
        <h3 class="coming-card__title">${item.title}</h3>
        <p class="coming-card__category">${item.category}</p>
      </div>
    `;

    return card;
  }

  function renderComingSoon() {
    const grid = $('#comingSoonGrid');
    if (!grid) return;

    comingSoon.forEach(item => grid.appendChild(createComingSoonCard(item)));
    observeReveals(grid);
  }

  function renderMarquee() {
    const track = $('#marqueeTrack');
    if (!track) return;

    const allItems = [
      ...templates.map(t => ({ name: t.title, image: t.image })),
      ...comingSoon.map(c => ({ name: c.title, image: c.image }))
    ];

    const itemsHTML = allItems.map(item => `
      <div class="marquee__item">
        <img src="${item.image}" alt="${item.name}" loading="lazy" width="280" height="175">
        <p class="marquee__item-name">${item.name}</p>
      </div>
    `).join('');

    track.innerHTML = itemsHTML + itemsHTML;
  }

  /* ============================================
     Filtering & Search
     ============================================ */

  function applyFilters() {
    const cards = $$('.template-card', $('#templatesGrid'));
    const empty = $('#templatesEmpty');
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.dataset.category;
      const title = card.dataset.title;
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = !searchQuery || title.includes(searchQuery) || category.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('filtered-out');
        visibleCount++;
      } else {
        card.classList.add('filtered-out');
      }
    });

    if (empty) {
      empty.hidden = visibleCount > 0;
    }
  }

  function initFilters() {
    const pills = $$('.filter-pill');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.category;
        applyFilters();
      });
    });
  }

  function initSearch() {
    const input = $('#searchInput');
    if (!input) return;

    let debounce;
    input.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchQuery = input.value.trim().toLowerCase();
        applyFilters();
      }, 150);
    });
  }

  /* ============================================
     Navigation
     ============================================ */

  function initNavigation() {
    const header = $('#nav');
    const toggle = $('#navToggle');
    const mobileNav = $('#mobileNav');
    const backdrop = $('#mobileNavBackdrop');
    const closeBtn = $('#mobileNavClose');
    let scrollY = 0;

    window.addEventListener('scroll', () => {
      if (!document.body.classList.contains('menu-open')) {
        header.classList.toggle('scrolled', window.scrollY > 50);
      }
    }, { passive: true });

    function openMenu() {
      scrollY = window.scrollY;
      mobileNav.classList.add('open');
      mobileNav.setAttribute('aria-hidden', 'false');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      header.classList.add('menu-open');
      document.body.classList.add('menu-open');
      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }

    function closeMenu() {
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      header.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    }

    function toggleMenu() {
      if (mobileNav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    if (toggle && mobileNav) {
      toggle.addEventListener('click', toggleMenu);
      closeBtn?.addEventListener('click', closeMenu);
      backdrop?.addEventListener('click', closeMenu);

      $$('.mobile-nav__link, .mobile-nav__cta', mobileNav).forEach(link => {
        link.addEventListener('click', () => {
          closeMenu();
        });
      });

      $('.mobile-nav__logo', mobileNav)?.addEventListener('click', closeMenu);

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
          closeMenu();
        }
      });
    }

    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = $(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================
     Scroll Reveal
     ============================================ */

  function observeReveals(container) {
    const elements = container ? $$('.reveal', container) : $$('.reveal');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => {
      if (!el.classList.contains('visible')) observer.observe(el);
    });
  }

  /* ============================================
     Counter Animation
     ============================================ */

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const numbers = $$('.stats__number[data-target]');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    numbers.forEach(n => observer.observe(n));
  }

  /* ============================================
     Hero Particles
     ============================================ */

  function initParticles() {
    const canvas = $('#heroParticles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let width, height;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      const count = Math.min(60, Math.floor(window.innerWidth / 20));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1
      }));
    }

    function draw() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199, 169, 107, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationId);
      resize();
      createParticles();
      draw();
    }, { passive: true });
  }

  /* ============================================
     Parallax
     ============================================ */

  function initParallax() {
    const elements = $$('[data-parallax]');
    if (!elements.length) return;

    let ticking = false;

    function update() {
      const scrollY = window.scrollY;
      elements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.03;
        el.style.transform = `translateY(${scrollY * speed * -1}px)`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================
     Mouse Glow
     ============================================ */

  function initMouseGlow() {
    const glow = $('.mouse-glow');
    if (!glow || window.matchMedia('(max-width: 768px)').matches) return;

    let visible = false;

    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      if (!visible) {
        document.body.classList.add('mouse-active');
        visible = true;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      document.body.classList.remove('mouse-active');
      visible = false;
    });
  }

  /* ============================================
     Magnetic Buttons
     ============================================ */

  function initMagneticButtons(container) {
    const all = container ? $$('.magnetic-btn', container) : $$('.magnetic-btn');
    const buttons = all.filter(btn => !btn.closest('.tilt-card'));
    if (window.matchMedia('(max-width: 768px)').matches) return;

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ============================================
     Card Tilt
     ============================================ */

  function initTiltCards() {
    const cards = $$('.tilt-card');
    if (window.matchMedia('(max-width: 968px)').matches) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ============================================
     Init
     ============================================ */

  function init() {
    renderTemplates();
    renderComingSoon();
    renderMarquee();
    initFilters();
    initSearch();
    initNavigation();
    observeReveals();
    initCounters();
    initParticles();
    initParallax();
    initMouseGlow();
    initMagneticButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
