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

  var heroVideo = document.querySelector('.hero-video');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion && heroVideo) {
    heroVideo.src = heroVideo.dataset.staticImage;
  }
  if (reduceMotion) return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // The camera reveal plays once; scroll adds a separate foreground-to-background drift.
  var st = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 };
  gsap.to('.hero-video', { yPercent: 9, scale: 1.08, ease: 'none', scrollTrigger: st });
  gsap.to('.hero-content', { y: -60, opacity: 0.2, ease: 'none', scrollTrigger: st });

  gsap.utils.toArray('.reveal').forEach(function (el) {
    gsap.from(el, { y: 24, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  gsap.to('.cta-img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true } });
})();
