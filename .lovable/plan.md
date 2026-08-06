# Shopify-native storefront parity plan

## Recommendation

Use **Shopify CLI + a local Shopify theme workflow**, with a high-capability coding agent such as **Claude Code using its strongest available model** (or equivalent), while keeping Lovable/this project as the visual reference. The important improvement is not the model alone: it is an iterative, screenshot-driven migration where Liquid, CSS, JavaScript, and Shopify data are tested inside Shopify rather than translated in one pass.

A true Shopify-hosted theme is the right target if Shopify must own hosting, checkout, product data, and theme customization. Pixel parity is achievable at agreed desktop and mobile breakpoints, but it must be rebuilt deliberately; React components and TanStack routing cannot be copied directly into Liquid.

## Why the previous port diverged

- The current homepage is a React composition with more sections and interactions than the Shopify homepage JSON currently renders.
- Several React homepage areas still use local presentation data, while the Liquid version uses Shopify collections and theme-editor settings, so content and layout can differ even when the CSS is similar.
- The Shopify theme has a separate hand-maintained CSS implementation rather than sharing the React design tokens and exact component markup.
- React navigation derives generations, categories, and `#featured` collections from the live catalog; the Liquid header currently depends on manually configured theme blocks.
- React and Liquid product/gallery/cart behaviors are separate implementations and need parity testing, not just visual styling.

## Implementation phases

1. **Freeze the reference**
   - Capture the current storefront at desktop and mobile reference viewports for `/`, `/shop`, collection/category views, product pages, `/about`, `/services`, `/contact`, search, and cart interactions.
   - Inventory exact typography, spacing, imagery, responsive breakpoints, animation timing, link destinations, filtering, variant/add-on behavior, gallery behavior, and cart/checkout flow.

2. **Make Shopify the source of truth**
   - Map every reference section to a Shopify section/template.
   - Replace duplicated hardcoded content with Shopify settings, collections, products, page content, and merchant-managed assets where appropriate.
   - Preserve the current `#featured` collection convention and make the theme navigation reproduce the current dynamic behavior as closely as Shopify Liquid permits.

3. **Rebuild the shared visual system once**
   - Consolidate the exact reference tokens into `theme.css`: fonts, colors, surfaces, borders, radii, shadows, container widths, type scale, spacing, and motion.
   - Reuse consistent Liquid markup and CSS classes for header, footer, buttons, cards, section headings, overlays, and responsive layouts instead of approximating each section independently.
   - Upload/use the same image assets and preserve the current image crop, aspect-ratio, overlay, and loading behavior.

4. **Rebuild page templates and behavior**
   - Homepage: match the hero crossfade, brand strip, product sections, category/generation sections, trust content, services/build imagery, and Instagram area.
   - Catalog: match generation/category/tag filtering, sorting, collection links, product cards, empty states, and pagination.
   - Product: match gallery thumbnails/lightbox behavior, responsive image sizing, SKU/brand/fitment output, all compatible generations, variant pricing, brake add-ons, formatted descriptions, and add-to-cart success behavior.
   - Cart: match the drawer, quantity controls, continue-shopping action, and Shopify-hosted checkout behavior.
   - Content pages: reproduce the current About, Services, and Contact layouts and imagery.

5. **Visual and functional QA loop**
   - Run Shopify theme preview locally through Shopify CLI and compare screenshots against the frozen React references at the same viewport sizes.
   - Fix the largest differences first: geometry, typography, imagery/crops, overlays, responsive stacking, then interaction states.
   - Test real Shopify products and variants, filters, search, cart updates, checkout handoff, mobile navigation, and deep-link refreshes.
   - Repeat until the agreed breakpoints and workflows match, then package the theme for upload or publish it through Shopify.

## Tool choice

- **Best for this migration:** Shopify CLI + GitHub + Claude Code on the strongest available model, because it can inspect many Liquid files, make coordinated cross-file changes, run local checks, and iterate against screenshots.
- **Also viable:** Cursor or another IDE agent with Shopify CLI; the decisive factor is the screenshot comparison loop and access to the real Shopify preview, not the brand of agent.
- **Not sufficient by itself:** an automatic React-to-Liquid converter or a single prompt to any model. Those can scaffold templates, but they will not preserve exact responsive geometry, Shopify editor constraints, or interaction parity reliably.
- **Keep Lovable for:** the existing reference build, asset/code history, and any future standalone React storefront work. The Shopify theme should become its own intentionally maintained target rather than a generated export.

## Deliverable

A Shopify-uploadable theme that is visually matched to the current build at the selected reference breakpoints, uses live Shopify catalog data, and preserves the existing shopping workflows without relying on the React runtime.