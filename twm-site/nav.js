/* shared nav behaviour for gallery.html / events.html */
(function () {
  document.querySelectorAll('.nav-item').forEach((item, i) => {
    item.style.opacity = '0'; item.style.transform = 'translateY(-6px)';
    item.style.transition = `opacity .3s ease ${0.08 + i * 0.06}s, transform .3s ease ${0.08 + i * 0.06}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }));
  });
  const navEl = document.querySelector('nav');
  const onScroll = () => navEl.classList.toggle('scrolled', scrollY > 8); onScroll();
  addEventListener('scroll', onScroll, { passive: true });
  const t = document.getElementById('navToggle'), l = document.getElementById('navLinks');
  function set(o) { l.classList.toggle('open', o); t.classList.toggle('open', o); t.setAttribute('aria-expanded', o ? 'true' : 'false'); t.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); }
  t.addEventListener('click', () => set(!l.classList.contains('open')));
  l.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  addEventListener('resize', () => { if (innerWidth > 760) set(false); });
})();
