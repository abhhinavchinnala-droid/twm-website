# The Warangal Margam — Site + Sanity CMS

This is a static website (plain HTML, CSS, JS). It runs on any static host
(Netlify Drop, Cloudflare Pages, GitHub Pages, Vercel) with no build step.

Every content section is wired to Sanity. Before you connect Sanity the site
shows built-in fallback content so nothing looks broken. The moment you paste
your Sanity Project ID into `sanity.js`, every section starts reading from the
CMS instead, with no code changes.

## Files

```
index.html          Home page (hero, Core Members, Gallery Highlights, Past Events)
twm-members.html    Full members list + Community Members
gallery.html        Full gallery with category filters + lightbox
events.html         Upcoming events + Previous sessions + detail popup
sanity.js           The one file you edit to connect Sanity
members-data.js     Built-in 41-member fallback list
home_script.js      Home page section loader
nav.js              Shared nav behaviour for gallery/events
twm-base.css        Shared styles for gallery/events
photos/             Member photos (used as fallback)
sanity-studio/      The Sanity schema files (the CMS side)
```

Keep all of these together when you upload. If `photos/` is missing, members
fall back to letter tiles.

## How the site decides where content comes from

- If `PROJECT_ID` in `sanity.js` is still `YOUR_PROJECT_ID`, the site uses the
  built-in fallback (the 41 members, sample events, placeholder gallery tiles).
- Once you set a real `PROJECT_ID`, every section queries Sanity. If a Sanity
  collection is empty, that section falls back again, so you can fill the CMS
  one piece at a time.

## Connect Sanity (one time)

1. Install Node.js (v18+), then create a Studio:

   ```
   npm create sanity@latest -- --template clean --create-project "TWM" --dataset production
   ```

   Pick JavaScript when asked. This makes a `twm/` folder (your Studio).

2. Copy the schema files in:

   - Take everything from `sanity-studio/schemaTypes/` in this package
   - Paste it into your Studio's `schemaTypes/` folder, replacing what is there
   - Open `sanity.config.js` and make sure it uses these schemas:

     ```js
     import {schemaTypes} from './schemaTypes'
     // ...
     schema: { types: schemaTypes },
     ```

3. Find your Project ID:

   - Run `npx sanity manage` (opens the project dashboard), or look in
     `sanity.config.js` for `projectId: '...'`

4. Paste the Project ID into this site:

   - Open `sanity.js`
   - Change `PROJECT_ID: 'YOUR_PROJECT_ID'` to your real ID
   - Save. The whole site now reads from Sanity.

5. Allow the website to read from Sanity (CORS):

   - Run `npx sanity cors add https://your-domain.com --no-credentials`
   - Add `http://localhost:3000` too if you test locally
   - (No token is used. The dataset is read publicly, which is correct for a
     public website.)

6. Run the Studio and add content:

   ```
   cd twm
   npm run dev          # opens the editor at localhost:3333
   npx sanity deploy    # optional: puts the editor online at a sanity.studio URL
   ```

   Now anyone on the team can add members, events, gallery photos, and so on
   from the Studio. No code editing.

## What each collection feeds

| Collection            | Shows up on                                              |
|-----------------------|----------------------------------------------------------|
| Member                | Members page grid, and first 6 on the home page          |
| Community Member      | Community Members section on the members page            |
| Upcoming Event        | Events page (Upcoming) and home page Past Events strip    |
| Previous Session      | Events page (Previous sessions) + home Past Events strip  |
| Gallery Image         | Gallery page; `featured` ones show on the home page       |
| Testimonial           | Reserved for a future testimonials section                |
| Website Settings      | Reserved for hero/about/contact text                      |

Notes:
- Member "Roles / Identities": the first one becomes the gold label on the card.
- Gallery "Featured": tick this to surface an image in the home highlights.
- Gallery "Category": fills the filter chips on the gallery page.
- Member/Event "Display Order": lower numbers come first.

## Host the site

Drag the whole folder (all HTML files + `photos/` + the `.js`/`.css` files)
into Netlify Drop or a Cloudflare Pages project. The `sanity-studio/` folder is
only the schema source; it does not need to be hosted with the site.
