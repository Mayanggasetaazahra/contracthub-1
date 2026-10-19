(function () {
  'use strict';
  var header = document.getElementById('siteHeader');
  var toggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  function onScroll() { header.classList.toggle('is-solid', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = !mobileNav.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileNav.classList.add('hidden'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero parallax: each vector layer moves at its own depth
  var st = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 };
  gsap.to('.layer-sky',   { y: 120, ease: 'none', scrollTrigger: st });
  gsap.to('.layer-hills', { y: 70,  ease: 'none', scrollTrigger: st });
  gsap.to('.layer-port',  { y: 40,  ease: 'none', scrollTrigger: st });
  gsap.to('.layer-ship',  { x: 60, y: 20, ease: 'none', scrollTrigger: st });
  gsap.to('.hero-content', { y: -60, opacity: 0.2, ease: 'none', scrollTrigger: st });

  // Gentle ship bob
  gsap.to('.layer-ship', { rotation: 0.6, transformOrigin: '50% 100%', yoyo: true, repeat: -1, duration: 3, ease: 'sine.inOut' });

  gsap.utils.toArray('.reveal').forEach(function (el) {
    gsap.from(el, { y: 24, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  gsap.to('.cta-img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true } });
})();
