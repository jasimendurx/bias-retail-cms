document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Navigation Toggle ─────────────────── */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks     = document.querySelector('.nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  /* ── Header scroll effect (adds shadow on scroll) ───── */
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── Scroll-reveal animations ─────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObs.observe(el));

  /* ── Dynamic Hero Slideshow ───────────────────── */
  const slides     = document.querySelectorAll('.hero-slide');
  const dots       = document.querySelectorAll('.hero-dot');
  const industryEl = document.getElementById('hero-industry-label');

  if (!slides.length) return;   // only run on pages that have the hero

  let currentSlide = 0;
  const INTERVAL_MS = 5800;

  function restartAnimation(el) {
    // Force browser to restart the CSS keyframe animation on this element
    el.style.animation = 'none';
    void el.offsetHeight;         // trigger reflow
    el.style.animation = '';
  }

  function goToSlide(index) {
    // Deactivate previous
    slides[currentSlide].classList.remove('active');
    if (dots.length) dots[currentSlide].classList.remove('active');

    currentSlide = ((index % slides.length) + slides.length) % slides.length;

    // Activate and restart Ken Burns animation
    const nextSlide = slides[currentSlide];
    restartAnimation(nextSlide);
    nextSlide.classList.add('active');
    if (dots.length) dots[currentSlide].classList.add('active');

    // Fade-update the industry label
    if (industryEl) {
      industryEl.style.opacity = '0';
      setTimeout(() => {
        industryEl.textContent = nextSlide.dataset.label || '';
        industryEl.style.opacity = '1';
      }, 350);
    }
  }

  // Dot click navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goToSlide(i);
      timer = setInterval(() => goToSlide(currentSlide + 1), INTERVAL_MS);
    });
  });

  // Auto-advance
  let timer = setInterval(() => goToSlide(currentSlide + 1), INTERVAL_MS);

});
