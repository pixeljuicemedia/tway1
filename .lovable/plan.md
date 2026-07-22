# Port Tway Motorsports to a Shopify Liquid theme (pixel-perfect, mobile-first)

Confirmed scope:
- You upload the `.zip` to Shopify Admin → Online Store → Themes → Add theme.
- Current Lovable site stays untouched; the Liquid build happens in this project's codebase alongside it under `shopify-theme/` and is packaged for download.
- All hardcoded copy (About, Services, Contact hours/address, curated collection titles, hero eyebrows, trust stats, etc.) moves into Shopify **Section settings** so you can edit from Shopify's theme editor with no code.
- Pixel-perfect on **desktop and mobile**, with mobile as the priority. Every section gets a mobile pass before I move to the next one.

## Deliverable

A zip you upload: `/mnt/documents/tway-theme.zip` — standard Shopify 2.0 theme structure, OS 2.0 JSON templates, sections everywhere, section settings for all editable copy.

```text
shopify-theme/
├── assets/            # theme.css (compiled), theme.js, logo, fonts, hero C8 images, IG images, category images
├── config/            # settings_schema.json (global theme settings), settings_data.json
├── layout/theme.liquid
├── locales/en.default.json
├── sections/          # header, footer, hero-crossfade, brand-strip, featured-products, generation-cards,
│                      # curated-collections, trust-stats, instagram-grid, mobile-sticky-nav,
│                      # collection-filter-bar, product-main, product-related, page-about-*, page-services-*, page-contact-*
├── snippets/          # product-card, price, cart-drawer, cart-line, icon-*, meta-tags, responsive-image
└── templates/
    ├── index.json
    ├── collection.json
    ├── product.json
    ├── cart.json
    ├── search.json
    ├── page.about.json
    ├── page.services.json
    ├── page.contact.json
    └── 404.json
```

## Pixel-perfect strategy

- `assets/theme.css` is a **compiled CSS file** built from the current Tailwind classes and `src/styles.css` tokens (colors, `--race-red`, eyebrow utilities, `.prose-product`, hero crossfade keyframes, container widths). Shopify themes don't run Tailwind at request time, so I flatten it once. No CDN Tailwind — that would break parity.
- Same custom fonts loaded via `{{ 'font.woff2' | asset_url }}` `@font-face` in `theme.css`.
- Same breakpoints (`sm/md/lg` mapped to px values used today) baked into custom media queries.
- Every section gets tested at **375px, 414px, 768px, 1024px, 1440px** before I mark it done — I screenshot each viewport with Playwright against a local preview and diff against the current site.
- The mobile-sticky bottom nav from the current home page is ported as its own section, enabled globally on mobile.

## Page-by-page port

- **Home (`index.json`)** — hero crossfade with the C8 images and hero search wired to `/search`, brand strip, featured products (bound to a Shopify collection you pick in the editor), generation cards → `/collections/{gen-handle}`, curated collections, trust stats, Instagram grid (manual URLs + images as section blocks), mobile sticky nav.
- **Collection (`collection.json`)** — sticky Generation + Category filter bar. Generation filter uses tags (`gen-c5`, `gen-c6`, `gen-c7`, `gen-c8`, `gen-z06`, `gen-eray`); category filter uses `product.product_type`. Native Shopify filters/sort under the hood.
- **Product (`product.json`)** — gallery + thumbnails, breadcrumb, sticky details panel, **variant option selectors as dropdowns** (works with the Brake Pads + Tension Kit add-ons using native `option1/option2/option3` — no custom logic needed), HTML description rendered raw with `.prose-product`, spec strip under the gallery, related products by product type, "Added to cart" state, cart drawer opens on add (JS listens to Shopify's `cart:added` event).
- **Cart (`cart.json`) + drawer** — native Shopify AJAX cart via `/cart.js`. No iframe workaround, no `_top` — checkout is same-origin.
- **Search (`search.json`)** — Shopify predictive search + results grid identical to shop.
- **About / Services / Contact pages** — one Shopify Page per URL, each with its own custom template (`page.about.json`, etc.). Every copy block, image, and stat is a section setting. Contact form uses `{% form 'contact' %}` posting to Shopify (submissions go to your store email).
- **404** — themed match with home CTA back.

## Editable-in-theme-editor content

Moved out of code into Section settings so you edit in Shopify (no dev needed):
- Hero: eyebrow, headline, subhead, CTA text/link, C8 slide images (up to 6), crossfade timing.
- Brand strip: logo blocks (image + link).
- Featured products: collection picker + heading + eyebrow.
- Generation cards: block per generation (label, years, image, tag).
- Curated collections: block per tile (title, image, collection link).
- Trust stats: block per stat (number, label).
- Instagram grid: block per tile (image, IG URL).
- About page: hero image, all body copy blocks, "Inside the Shop" gallery (image blocks, lightbox stays), team info.
- Services page: hero, process background, service blocks (icon, title, copy), our-process copy.
- Contact page: hero image, address, phone, hours, podium image.
- Footer: columns + links as blocks, address, social handles.

## What changes vs. today (transparency)

- URLs move to Shopify conventions: `/collections/c8-corvette`, `/products/{handle}`, `/pages/about`, `/pages/services`, `/pages/contact`, `/cart`, `/search`. I'll set up 301s in Shopify if you want.
- Checkout works normally — same-origin, no blocking.
- Shopify Files hosts images. Current `/__l5e/assets-v1/…` Lovable URLs won't work in the theme, so I re-upload every image (hero C8s, IG tiles, category images, shop photos, logo, about gallery, contact hero/podium, services images, process bg) as theme assets or Shopify Files, and reference them via `asset_url` / `file_url`.

## Build order (multiple turns, one review checkpoint per step)

1. **Scaffold** — folder structure, `theme.liquid`, header section (with the pill nav + mobile menu + search + cart), footer section, `theme.css` compiled from current tokens, `theme.js` with cart drawer + mobile menu, `settings_schema.json`. **Mobile parity screenshots for header/footer at 375/414/768/1024/1440**.
2. **Product page** — full port including variant add-ons; mobile parity pass.
3. **Collection page** — filter bar + grid; mobile parity pass.
4. **Home** — all sections; mobile parity pass (this is the biggest step).
5. **About / Services / Contact** — page templates + sections; mobile parity pass.
6. **Search + 404 + cart drawer polish + Instagram grid + mobile sticky nav** — final mobile pass.
7. **Package** — zip to `/mnt/documents/tway-theme.zip`, plus a `README.md` inside the zip with upload steps, tag conventions for generations, and which sections to fill in first.

Each turn stops for your review; I don't move on until you confirm mobile+desktop parity for that step.

## What I need from you at kickoff

- Confirm this build order and that I can start with **step 1 (scaffold + header + footer)** now.
- If you already have preferred **generation tags** other than `gen-c5`, `gen-c6`, `gen-c7`, `gen-c8`, `gen-z06`, `gen-eray`, tell me — otherwise I'll apply these to the existing 21 demo products in Shopify as part of step 3.
