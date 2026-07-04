/* ===== TWM home sections — skeleton-shimmer loading + staggered reveal ===== */
(function () {
  const esc = TWM.esc;
  const MIN = 480; // min time skeletons stay up, so the shimmer reads as intentional
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const wait = t0 => new Promise(r => setTimeout(r, Math.max(0, MIN - (performance.now() - t0))));
  function reveal(grid) {
    if (reduce) return;
    [...grid.children].forEach((el, i) => {
      el.classList.add('reveal-up');
      requestAnimationFrame(() => setTimeout(() => el.classList.add('in'), 40 + i * 75));
    });
  }
  const rep = (n, html) => Array.from({ length: n }).map(() => html).join('');

  const coreSkel = rep(6, `<div class="pc-skel"><div class="skel-box pc-photo-skel"></div><div class="skel-line w60"></div><div class="skel-line w35"></div></div>`);
  const galSkel  = rep(8, `<div class="skel-box gal-skel"></div>`);
  const evSkel   = rep(3, `<div class="ev-skel"><div class="skel-box ev-ban-skel"></div><div class="skel-pad"><div class="skel-line w80"></div><div class="skel-line w50"></div></div></div>`);

  /* ---- Core members (first 6) ---- */
  (async () => {
    const grid = document.getElementById('coreGrid'); if (!grid) return;
    grid.innerHTML = coreSkel;
    const t0 = performance.now();
    const members = await TWM.getMembers();
    await wait(t0);
    grid.innerHTML = members.slice(0, 6).map(m => {
      const initial = (String(m.name).trim()[0] || '?').toUpperCase();
      const primary = (m.identities && m.identities[0]) || 'Member';
      const ph = m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy" onerror="this.remove()">` : '';
      return `<a class="pc" href="twm-members.html#members">
        <div class="pc-photo">${ph}<span class="pc-initial">${esc(initial)}</span></div>
        <div class="pc-name">${esc(m.name)}</div>
        <div class="pc-role">${esc(primary)}</div></a>`;
    }).join('');
    reveal(grid);
  })();

  /* ---- Lightbox ---- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  function openLB(src, cap) { lbImg.src = src; lbCap.textContent = cap || ''; lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeLB() { lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.removeAttribute('src'); }
  document.getElementById('lbClose').addEventListener('click', closeLB);
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

  /* ---- Gallery highlights ---- */
  (async () => {
    const grid = document.getElementById('galGrid'); if (!grid) return;
    grid.innerHTML = galSkel;
    const t0 = performance.now();
    const q = `*[_type=="galleryImage" && featured==true]|order(order asc, eventDate desc)[0...8]{ "url": image.asset->url, caption }`;
    const data = await TWM.fetch(q);
    await wait(t0);
    if (Array.isArray(data) && data.length) {
      grid.innerHTML = data.map(g =>
        `<div class="gal-tile"><img src="${esc(TWM.img(g.url, 500, 500))}" data-full="${esc(TWM.img(g.url, 1400))}" data-cap="${esc(g.caption || '')}" alt="${esc(g.caption || '')}" loading="lazy"></div>`
      ).join('');
      grid.querySelectorAll('.gal-tile img').forEach(im =>
        im.addEventListener('click', () => openLB(im.dataset.full, im.dataset.cap)));
    } else {
      const labels = ['Workshop', 'Meetup', 'Session', 'Panel', 'Social', 'Talk', 'Demo', 'Mixer'];
      grid.innerHTML = labels.map((l, i) => `<div class="gal-tile ph pal${i % 6}"><span>${l}</span></div>`).join('');
    }
    reveal(grid);
  })();

  /* ---- Past events / sessions (latest 3) ---- */
  (async () => {
    const grid = document.getElementById('evGrid'); if (!grid) return;
    grid.innerHTML = evSkel;
    const t0 = performance.now();
    const q = `*[_type=="pastSession"]|order(date desc)[0...3]{ title, date, time, venue, speaker, "banner": images[0].asset->url }`;
    const data = await TWM.fetch(q);
    await wait(t0);
    const fmt = d => { try { return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { return d || ''; } };
    let items = (Array.isArray(data) && data.length) ? data : [
      { title: 'AI & Career Growth Workshop', date: '2026-06-12', time: '5:00 PM', venue: 'Warangal', banner: null },
      { title: 'Founders Roundtable', date: '2026-05-20', time: '6:30 PM', venue: 'Hanamkonda', banner: null },
      { title: 'Build-in-Public Night', date: '2026-04-28', time: '6:00 PM', venue: 'Warangal', banner: null }
    ];
    grid.innerHTML = items.map((e, i) => {
      const ban = e.banner
        ? `<img src="${esc(TWM.img(e.banner, 700, 440))}" alt="${esc(e.title)}">`
        : `<span class="ev-ph">${esc((String(e.title || '?')[0]))}</span>`;
      const meta = [fmt(e.date), e.time, e.venue].filter(Boolean).map(esc).join(' \u00B7 ');
      return `<a class="ev-card pal${i % 6}" href="events.html">
        <div class="ev-banner">${ban}</div>
        <div class="ev-body">
          <div class="ev-name">${esc(e.title)}</div>
          <div class="ev-meta">${meta}</div>
          <span class="ev-link">View details &rarr;</span>
        </div></a>`;
    }).join('');
    reveal(grid);
  })();
})();
