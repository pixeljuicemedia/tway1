---
name: Featured nav collections rule
description: How the Shop nav "Featured" column picks Shopify collections (image or #featured in description)
type: feature
---
The Shop mega-menu "Featured" column is driven live from Shopify collections
(`fetchFeaturedCollections` in src/lib/shopify.ts):
- Included if the collection has a collection image OR its description contains `#featured`.
- `all` and `frontpage` are always excluded.
- If nothing qualifies, all real collections are shown so the menu is never empty.
Links go to `/category?collection=<handle>`, which fetches that collection's products.
Goal: merchandising managed entirely from Shopify admin, no code changes.
