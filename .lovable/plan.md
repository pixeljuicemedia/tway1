# Connect Tway Motorsports to Shopify

Your Shopify store `tway-motorsports-8sf51j39.myshopify.com` is connected. This plan wires the storefront so real products, cart, and checkout run through Shopify's Storefront API (2025-07).

**Note:** Your store currently has **0 products**. After building the plumbing, I'll ask you to add products through chat (e.g. "Add a C8 cold air intake, $780").

## What gets built

### 1. Shopify storefront library — `src/lib/shopify.ts`
- Store domain + storefront token constants (2025-07 API).
- `storefrontApiRequest` helper with 402 (billing) handling.
- GraphQL queries: products list, product-by-handle, cart CRUD.
- Cart mutations: `createShopifyCart`, `addLineToShopifyCart`, `updateShopifyCartLine`, `removeLineFromShopifyCart`.
- `formatCheckoutUrl` (adds `channel=online_store`), `formatMoney` (Intl currency).

### 2. Cart state — `src/stores/cart-store.ts`
- Zustand store with `persist` (localStorage), tracks `items`, `cartId`, `checkoutUrl`, `isLoading`, `isSyncing`.
- Actions: `addItem`, `updateQuantity`, `removeItem`, `clearCart`, `syncCart`, `getCheckoutUrl`.
- Real-time Shopify sync on every mutation; clears local state on "cart not found".

### 3. Cart sync hook — `src/hooks/use-cart-sync.ts`
- Syncs on mount and on tab-visibility change so returning from Shopify checkout clears completed orders.

### 4. Cart drawer — `src/components/cart-drawer.tsx`
- Slide-out sheet with line items, qty steppers, remove, running total.
- "Checkout with Shopify" button opens `checkoutUrl` in a new tab (`_blank`).

### 5. Header wiring — `src/components/site-layout.tsx`
- Add `CartDrawer` trigger next to the Request Quote button (mobile + desktop).
- Call `useCartSync()` inside `SiteShell` so the cart stays in sync app-wide.

### 6. Real Shopify products on Shop page — `src/routes/shop.tsx`
- Replace the hardcoded `items` demo grid with a live products grid from `fetchProducts()`.
- Empty state: "No products found — add one from chat" (no pseudo/mock products, per Shopify rules).
- Product cards link to `/product/$handle`. Corvette generation cards, filter chips, and lifestyle sections stay as-is (prototype navigation).

### 7. Product detail — `src/routes/product.$handle.tsx`
- Fetches product by handle via loader.
- Image gallery, title, description, variant selector (from `options`/`variants`), price, "Add to Cart" button that calls `useCartStore.addItem` with the selected variant.
- The existing `/product` prototype route stays for design reference.

## What stays as-is (this pass)
- Homepage `index.tsx` "Featured Parts" grid (demo visuals, per your earlier direction).
- Category prototype page.
- Shop page's generation cards + curated collections (they're navigation, not products).

Once you're happy with the plumbing, we can swap those to real Shopify data too.

## Technical notes
- All checkout goes through `cartCreate` → `checkoutUrl` — no manual `/cart/add` or product-page URLs.
- `channel=online_store` is appended to every checkout URL.
- `sonner` (already installed) is used for the 402 "Shopify billing required" toast.
- `zustand` will be added as a dependency.

## After you approve
1. I'll build the files above.
2. I'll prompt you to create your first products via chat (e.g. "Add product: C8 Stingray Cold Air Intake, $780, Engine, C8").