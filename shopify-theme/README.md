# Tway Motorsports — Shopify Theme

Pixel-matched Liquid port of the Lovable React site.

## Install
1. Zip the entire `shopify-theme/` directory contents (files at zip root, not the folder itself).
2. Shopify admin → Online Store → Themes → Add theme → Upload zip.
3. Preview, then Publish.

## Structure
- `layout/theme.liquid` — shell, meta, cart drawer include
- `sections/` — every homepage/product/collection/cart/search/content section is block-based and editable in the theme customizer
- `templates/*.json` — sectioned templates (index, product, collection, cart, search, page.about, page.contact, page.services)
- `snippets/` — reusable partials (product-card, price, cart-drawer, meta-tags)
- `assets/theme.css` / `theme.js` — extracted styles + AJAX cart / nav logic

## Content pages
In admin (Online Store → Pages) create pages with these handles and assign the matching template:
- `/pages/about` → `page.about`
- `/pages/contact` → `page.contact`
- `/pages/services` → `page.services`

## Tags & product types
- Tag products with `C5`, `C6`, `C7`, `C8` so generation filter chips work on collection pages.
- Set product `type` (Aero, Suspension, Brakes, etc.) to power curated collections.

## Editing
Every section exposes settings + image pickers in Customize — hero images, brand logos, generation tiles, Instagram grid, trust stats, service cards, contact details, and gallery all editable without touching code.