---
name: Featured nav collections rule
description: Shop nav "Featured" column includes only Shopify collections whose description contains #featured
type: feature
---
The Shop mega-menu "Featured" column is driven live from Shopify collections
(`fetchFeaturedCollections` in src/lib/shopify.ts):
- Included ONLY if the collection description contains `#featured` (case-insensitive).
- Collection images are NOT a flag — user explicitly rejected that provision.
- `all` and `frontpage` are always excluded. No fallback: no tagged collections = empty column.
Links go to `/category?collection=<handle>`, which fetches that collection's products.
Goal: merchandising managed entirely from Shopify admin, no code changes.
