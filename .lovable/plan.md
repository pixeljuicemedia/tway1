## Confirmed issues

- `layout/theme.liquid` relies entirely on `header-group.json` and `footer-group.json` for global chrome.
- Those group files use hyphenated block IDs such as `link-home` and `col-explore`; Shopify’s section-group format only accepts alphanumeric IDs, so the groups are not reliable render sources.
- The hero button does not use its configured `cta_primary_link`; it is hardcoded to `routes.all_products_collection_url`, which resolves to the same `/collections/all` URL shown by the reported 404.
- The theme currently has no `list-collections.json` template for the safer canonical `/collections` shop route.

## Implementation

1. **Guarantee the header and footer render**
   - Change `layout/theme.liquid` to render `header.liquid` and `footer.liquid` directly as static global sections.
   - Remove the now-unused broken header/footer group files so Shopify cannot reject or continue loading stale group configuration.
   - Keep the existing default navigation blocks, logo fallback, contact details, and responsive styling intact.

2. **Create a real `/collections` shop destination**
   - Add a Shopify list-collections template and matching section styled like the existing shop/product grids.
   - Link the hero CTA to `routes.collections_url`, while honoring a merchant-selected CTA URL when one is configured.
   - Replace sibling “Shop” / “Shop All” defaults that still target `/collections/all` so the header and footer do not reproduce the same 404.

3. **Validate and sync**
   - Validate every JSON template and Liquid schema locally.
   - Check all section references and catalog links.
   - Push the corrected theme files directly to `pixeljuicemedia/tway-liquid` on `main` through the working GitHub connection and verify the resulting repository contents.