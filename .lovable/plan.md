## Diagnosis

The Liquid theme is technically working — the reason it looks broken on your store is that everything visual is wired to Shopify **image_picker** settings and **content pages** the merchant is expected to configure. On a fresh install none of that exists yet, so:

- **Hero graphic is black** — `hero-crossfade` iterates `section.blocks` of type `slide`, but the preset only seeds `badge` blocks, no slide blocks and no image files. Empty image pickers = 0 slides = pitch black.
- **Homepage almost blank** — `generation-cards`, `curated-collections`, `instagram-grid`, `brand-strip`, `trust-stats` all render from empty image_pickers / unset block content.
- **Nav "not working"** — links point to `/pages/services`, `/pages/about`, `/pages/contact`, `/collections/c5..c8`, `/collections/aero..` etc. Those pages/collections don't exist in your Shopify yet, and even the templates (`page.about`, `page.contact`, `page.services`) aren't assigned to any page.
- **Contact page totally different** — `templates/page.contact.json` only has a bare rich-hero + a generic contact form. The React page had a full info card (address, phone, hours), racecar hero graphic, podium image, map area — none of that is in the Liquid template.

Root cause: the port assumed the merchant would populate all imagery and content through the customizer. It should ship self-contained so it looks right the moment the zip is uploaded.

## Fix plan

### 1. Bundle default images into `shopify-theme/assets/`
Download the actual CDN images used on the React site and place them in the theme's `assets/` folder so they load via `{{ 'file.jpg' | asset_url }}` with zero customizer setup:
- `c8hero1..4.jpg` — hero crossfade slides
- `contact-racecar-hero.png`, `contact-podium.jpg` — contact page
- `about-team-family.jpg`, `inside-shop-1..9.png` — about page
- `services-hero.jpg`, `trackside.jpg`, `engineering.jpg`, `process-bg.jpg` — services page
- `ig1..7.jpg` — Instagram grid
- `tway-logo-darkbg.png` — header/footer logo fallback
- `corvette-side.png` — generation card fallback

### 2. Add "asset fallback" logic to every image section
In each section (`hero-crossfade`, `generation-cards`, `curated-collections`, `instagram-grid`, `rich-hero`, `brand-strip`, `services-grid`, `contact-form`, `image-gallery`), change:
```
{% if block.settings.image != blank %} ... image_url ... {% endif %}
```
to fall back to a bundled asset URL when the picker is empty:
```
{% if block.settings.image != blank %}{{ block.settings.image | image_url: width: 1920 }}{% else %}{{ 'c8hero1.jpg' | asset_url }}{% endif %}
```
Merchant can still override in the customizer, but out-of-the-box it just works.

### 3. Seed real slide/tile blocks in `templates/index.json`
Replace the empty `blocks: {}` for hero and other sections with concrete block presets — 4 hero slides, 5 generation cards (C5/C6/C7/C8/Z06), 7 category tiles, 7 Instagram tiles, 4 brand logos, 4 trust stats — each pointing to a bundled asset filename. That way the homepage renders fully immediately.

### 4. Rebuild the contact page template to match the React site
Rewrite `templates/page.contact.json` and expand `sections/contact-form.liquid` (or add a new `contact-info` section) with:
- Racecar hero background (bundled asset)
- Two-column layout: contact form on left, info card on right with the correct address (Orange, CA), phone (714) 410-1820, Mon–Fri 9AM–5PM
- Podium image card
- Same edgy dark styling as the React version

### 5. Enrich about and services page templates
Wire the gallery blocks in `page.about.json` to bundled `inside-shop-*` images, add the family/trackside hero image, and set services-grid blocks to real service copy with bundled backgrounds.

### 6. Update `README.md` install instructions
Add a short "after upload" checklist so nav works:
- Create pages: About, Contact, Services (assign matching templates)
- Create collections with handles: `c5`, `c6`, `c7`, `c8`, `z06`, `aero`, `suspension`, `brakes`, `wheels`, `interior`, `engine`, `exterior`, `best-sellers`, `new-arrivals`, `track-essentials`
- (Optional) Tag products C5/C6/C7/C8 and set product type for filtering

### 7. Re-zip and hand over
Regenerate `tway-motorsports-shopify-theme.zip` under `/mnt/documents/` for you to download and re-upload.

## Notes / trade-offs

- Bundling ~30 image files will inflate the theme zip to roughly 8–12 MB (still well under Shopify's 50 MB theme limit).
- The nav links to `/pages/*` and `/collections/*` can only fully "work" once those Shopify pages/collections exist — that's inherently merchant setup. The plan makes the theme self-contained visually and the README makes the setup a 5-minute checklist rather than guesswork.
- No changes to the React app in `src/` — this is Liquid-theme-only work.

Ready to execute once you approve.