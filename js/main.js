/* ============================================
   KRYSTAL ANN PHOTOGRAPHY — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Progress Bar ──────────────────────
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      progress.style.width = pct + '%';
    }, { passive: true });
  }

  // ── Sticky Nav ──────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── Mobile Nav Toggle ───────────────────────
  const toggle    = document.querySelector('.nav__toggle');
  const mobileNav = document.querySelector('.nav__mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile .nav__link');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Active Nav Link ──────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Scroll Reveal ────────────────────────────
  const revealEls = document.querySelectorAll('.fade-in, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Portfolio Filter ─────────────────────────
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const masonryItems = document.querySelectorAll('.masonry-item');

  if (filterBtns.length && masonryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const filter = btn.dataset.filter;
        masonryItems.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.pointerEvents = show ? '' : 'none';
          if (show) {
            item.style.display = '';
            requestAnimationFrame(() => { item.style.opacity = '1'; });
          } else {
            item.style.opacity = '0';
            setTimeout(() => { if (item.style.opacity === '0') item.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // ── FAQ Accordion ────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.dataset.open === 'true';
      // Close all others
      faqItems.forEach(other => {
        other.dataset.open = 'false';
        const otherBtn = other.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      // Toggle this one
      item.dataset.open = isOpen ? 'false' : 'true';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });

  // ── Session Picker Pills ─────────────────────
  const params  = new URLSearchParams(window.location.search);
  const session = params.get('session');
  if (session) {
    const select = document.getElementById('sessionType');
    if (select) {
      const option = select.querySelector(`option[value="${session}"]`);
      if (option) option.selected = true;
    }
    const pill = document.querySelector(`.session-opt input[value="${session}"]`);
    if (pill) pill.checked = true;
  }

  // ── Contact Form (Formspree) ──────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn     = contactForm.querySelector('button[type="submit"]');
      const success = document.getElementById('formSuccess');
      const formError = document.getElementById('formError');

      const showError = (msg) => {
        if (formError) {
          formError.textContent = msg;
          formError.style.display = 'block';
        } else {
          alert(msg);
        }
      };

      if (formError) formError.style.display = 'none';
      btn.textContent = 'Sending\u2026';
      btn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactForm.style.display = 'none';
          if (success) {
            success.style.display = 'block';
            success.style.animation = 'fadeInUp 0.4s ease forwards';
          }
          if (window.plausible) plausible('Contact Form Submitted');
        } else {
          btn.textContent = 'Send My Message';
          btn.disabled = false;
          showError('Something went wrong. Please try again or email directly.');
        }
      } catch {
        btn.textContent = 'Send My Message';
        btn.disabled = false;
        showError('Something went wrong. Please try again or email directly.');
      }
    });
  }

  // ── Lightbox ─────────────────────────────────
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightboxImg');
  const lbClose    = document.getElementById('lightboxClose');
  const lbPrev     = document.getElementById('lightboxPrev');
  const lbNext     = document.getElementById('lightboxNext');
  const lbCounter  = document.getElementById('lightboxCounter');
  const lbCaption  = document.getElementById('lightboxCaption');

  if (lightbox && lbImg) {
    let currentItems = [];
    let currentIndex = 0;

    const openLightbox = (items, index) => {
      currentItems = items;
      currentIndex = index;
      updateLightbox();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      lbClose && lbClose.focus();
    };

    const updateLightbox = () => {
      const item = currentItems[currentIndex];
      if (!item) return;
      const img = item.querySelector('img');
      if (img) {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
      }
      if (lbCounter) lbCounter.textContent = `${currentIndex + 1} / ${currentItems.length}`;
      const overlay = item.querySelector('.masonry-item__overlay span, .bento-grid__label');
      if (lbCaption && overlay) lbCaption.textContent = overlay.textContent;
      if (lbPrev) lbPrev.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
      if (lbNext) lbNext.style.visibility = currentIndex < currentItems.length - 1 ? 'visible' : 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.masonry-item').forEach(item => {
      item.addEventListener('click', () => {
        const visibleItems = Array.from(document.querySelectorAll('.masonry-item')).filter(i => i.style.display !== 'none');
        const idx = visibleItems.indexOf(item);
        openLightbox(visibleItems, Math.max(0, idx));
      });
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', () => {
      if (currentIndex > 0) { currentIndex--; updateLightbox(); }
    });
    if (lbNext) lbNext.addEventListener('click', () => {
      if (currentIndex < currentItems.length - 1) { currentIndex++; updateLightbox(); }
    });
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; updateLightbox(); }
      if (e.key === 'ArrowRight' && currentIndex < currentItems.length - 1) { currentIndex++; updateLightbox(); }
    });
  }

  // ── Smooth scroll for anchor links ──────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
