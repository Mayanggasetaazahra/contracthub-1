(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var hero = document.getElementById('hero');
  var toggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  // Header becomes solid once the hero is passed
  function updateHeader() {
    var limit = hero ? hero.offsetHeight - 80 : 40;
    header.classList.toggle('is-solid', window.scrollY > limit);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile menu
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('hidden') === false;
      toggle.setAttribute('aria-expanded', String(open));
      header.classList.add('is-solid');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero: zoom through the binocular lenses, fade vector into real photo
  var tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom bottom', scrub: 0.6 }
  });
  tl.to('.hero-binocular', { scale: 7, duration: 1 }, 0)
    .to('.hero-binocular', { opacity: 0, duration: 0.25 }, 0.75)
    .to('.hero-vector', { scale: 1.25, duration: 1 }, 0)
    .to('.hero-photo', { opacity: 1, scale: 1, duration: 0.6 }, 0.35)
    .from('.hero-copy > div', { y: 40, opacity: 0, duration: 0.35 }, 0.55)
    .to('.hero-hint', { opacity: 0, duration: 0.15 }, 0);

  // Section reveals
  gsap.utils.toArray('.reveal').forEach(function (el) {
    gsap.from(el, {
      y: 24, opacity: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // CTA photo parallax
  gsap.to('.cta-img', {
    yPercent: 8, ease: 'none',
    scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true }
  });
})();
