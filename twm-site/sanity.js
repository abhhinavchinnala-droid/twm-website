/* ============================================================
   TWM · Sanity data layer (shared by every page)
   ------------------------------------------------------------
   STEP 1: create a Sanity project (see SETUP.md)
   STEP 2: paste your Project ID below and save.
   That's the ONLY edit needed to switch the whole site
   from the built-in fallback data to live CMS content.
   ============================================================ */
window.TWM = {
  PROJECT_ID: '2riqq249',   // <-- paste your Sanity project ID here
  DATASET:    'production',
  API:        '2026-06-01',

  get configured() {
    return this.PROJECT_ID && this.PROJECT_ID !== 'YOUR_PROJECT_ID';
  }
};

/* Run a GROQ query against the cached read endpoint.
   Returns the result array/object, or null if Sanity isn't
   configured or the request fails (caller then uses fallback). */
TWM.fetch = async function (query) {
  if (!TWM.configured) return null;
  const url = `https://${TWM.PROJECT_ID}.apicdn.sanity.io/v${TWM.API}/data/query/${TWM.DATASET}?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    return json.result;
  } catch (e) {
    console.warn('[TWM] Sanity fetch failed, using fallback:', e.message);
    return null;
  }
};

/* Build a sized image URL from a Sanity asset URL (cdn.sanity.io/...). */
TWM.img = function (url, w, h) {
  if (!url) return '';
  const params = [];
  if (w) params.push('w=' + w);
  if (h) params.push('h=' + h);
  params.push('fit=crop', 'auto=format');
  return url + (url.includes('?') ? '&' : '?') + params.join('&');
};

TWM.esc = function (s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
};

/* Member card markup — identical design used by the members
   page grid and the home-page "Core Members" preview.
   m = { name, identities:[], website, bio, photo } */
TWM.PALS = ['pal-a','pal-b','pal-c','pal-d','pal-e','pal-f','pal-g','pal-h'];
TWM.memberCardHTML = function (m, i) {
  const esc = TWM.esc;
  const pal = TWM.PALS[i % TWM.PALS.length];
  const name = m.name || '';
  const initial = (name.trim()[0] || '?').toUpperCase();
  const ids = m.identities || [];
  const primary = ids[0] || 'Member';
  const roleJoin = ids.length ? ids.join(' \u00B7 ') : 'Member';
  const cardRole = m.bio || roleJoin;
  const site = m.website || '';
  const photo = m.photo || '';
  const img = photo
    ? `<img class="member-photo" src="${esc(photo)}" alt="${esc(name)}" loading="lazy" onerror="this.remove()">`
    : '';
  const tag = site ? `<div class="member-tag">${esc(site)}</div>` : '';
  return `<div class="member-card ${pal}" data-name="${esc(name)}" data-role="${esc(roleJoin)}" data-domain="${esc(primary)}" data-company="${esc(site)}" data-initial="${esc(initial)}" data-bio="${esc(m.bio || '')}" data-photo="${esc(photo)}">
      <div class="member-photo-placeholder"><span class="member-initial">${esc(initial)}</span></div>${img}
      <div class="member-overlay"></div>
      <div class="member-info">
        <span class="member-domain">${esc(primary)}</span>
        <div class="member-name">${esc(name)}</div>
        <div class="member-role">${esc(cardRole)}</div>${tag}
      </div>
    </div>`;
};

/* Fetch members from Sanity, or return the built-in fallback list. */
TWM.getMembers = async function () {
  const q = `*[_type=="member"]|order(order asc, name asc){
    name, identities, website, bio, "photo": photo.asset->url
  }`;
  const data = await TWM.fetch(q);
  if (Array.isArray(data) && data.length) {
    return data.map(m => ({
      name: m.name, identities: m.identities || [],
      website: m.website || '', bio: m.bio || '',
      photo: m.photo ? TWM.img(m.photo, 600, 800) : ''
    }));
  }
  return (window.FALLBACK_MEMBERS || []);
};
