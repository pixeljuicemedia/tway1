import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "tway-motorsports-8sf51j39.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "045845dde1d0a8a08ab2219956f833a3";

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string | null;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  handle: string;
  productType: string;
  vendor: string;
  tags: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  options: Array<{ name: string; values: string[] }>;
}

export interface ShopifyProduct {
  node: ShopifyProductNode;
}

export async function storefrontApiRequest<T = any>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<{ data?: T; errors?: Array<{ message: string }> } | undefined> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description:
        "Shopify API access requires an active Shopify billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) throw new Error(`Shopify HTTP ${response.status}`);

  const data = await response.json();
  if (data.errors) throw new Error(`Shopify: ${data.errors.map((e: any) => e.message).join(", ")}`);
  return data;
}

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          descriptionHtml
          handle
          productType
          tags
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 20) { edges { node { url altText } } }
          variants(first: 10) {
            edges { node {
              id title sku
              price { amount currencyCode }
              availableForSale
              selectedOptions { name value }
            } }
          }
          options { name values }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id title description descriptionHtml handle
      productType vendor
      tags
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 100) { edges { node { url altText } } }
      variants(first: 25) {
        edges { node {
          id title sku
          price { amount currencyCode }
          availableForSale
          selectedOptions { name value }
        } }
      }
      options { name values }
    }
  }
`;

export const CART_QUERY = `
  query cart($id: ID!) { cart(id: $id) { id totalQuantity } }
`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } } }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { id } userErrors { field message } }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id } userErrors { field message } }
  }
`;

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

export function isCartNotFoundError(userErrors: Array<{ message: string }>): boolean {
  return userErrors.some((e) => {
    const m = e.message.toLowerCase();
    return m.includes("cart not found") || m.includes("does not exist");
  });
}

export interface AddItemInput {
  variantId: string;
  quantity: number;
}

export async function createShopifyCart(
  item: AddItemInput
): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest<any>(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity: item.quantity, merchandiseId: item.variantId }] },
  });
  const errs = data?.data?.cartCreate?.userErrors ?? [];
  if (errs.length > 0) {
    console.error("Cart creation failed:", errs);
    return null;
  }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;
  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;
  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

export async function addLineToShopifyCart(
  cartId: string,
  item: AddItemInput
): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<any>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });
  const errs = data?.data?.cartLinesAdd?.userErrors ?? [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length > 0) {
    console.error("Add line failed:", errs);
    return { success: false };
  }
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges ?? [];
  const newLine = lines.find((l: any) => l.node.merchandise.id === item.variantId);
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<any>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const errs = data?.data?.cartLinesUpdate?.userErrors ?? [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length > 0) {
    console.error("Update line failed:", errs);
    return { success: false };
  }
  return { success: true };
}

export async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<any>(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });
  const errs = data?.data?.cartLinesRemove?.userErrors ?? [];
  if (isCartNotFoundError(errs)) return { success: false, cartNotFound: true };
  if (errs.length > 0) {
    console.error("Remove line failed:", errs);
    return { success: false };
  }
  return { success: true };
}

export async function fetchProducts(first = 24, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest<any>(PRODUCTS_QUERY, { first, query: query ?? null });
  return data?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProductNode | null> {
  const data = await storefrontApiRequest<any>(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.product ?? null;
}

export function formatMoney(amount: string | number, currencyCode: string): string {
  const n = typeof amount === "number" ? amount : parseFloat(amount);
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: currencyCode }).format(n);
  } catch {
    return `${currencyCode} ${n.toFixed(2)}`;
  }
}

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
}

export const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges { node { id handle title description image { url altText } } }
    }
  }
`;

export const COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id handle title description image { url altText }
      products(first: $first) {
        edges {
          node {
            id title description descriptionHtml handle productType vendor tags
            priceRange { minVariantPrice { amount currencyCode } }
            images(first: 20) { edges { node { url altText } } }
            variants(first: 10) {
              edges { node {
                id title sku
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              } }
            }
            options { name values }
          }
        }
      }
    }
  }
`;

/** All collections. */
export async function fetchCollections(first = 100): Promise<ShopifyCollection[]> {
  const data = await storefrontApiRequest<any>(COLLECTIONS_QUERY, { first });
  return (data?.data?.collections?.edges ?? []).map((e: any) => e.node as ShopifyCollection);
}

/**
 * Collections that should appear in the "Featured" nav column.
 * Merchant-managed from Shopify, no code changes needed. A collection is featured if:
 *   1. it has a collection image, OR
 *   2. its description contains "#featured"
 * "All" and "frontpage" are always excluded. If nothing qualifies, every real
 * collection is shown so the menu is never empty.
 */
export async function fetchFeaturedCollections(first = 100): Promise<ShopifyCollection[]> {
  const all = await fetchCollections(first);
  const real = all.filter(
    (c) => c.handle !== "frontpage" && c.handle !== "all" && !/^all$/i.test(c.title.trim())
  );
  const picked = real.filter(
    (c) => !!c.image?.url || /#featured/i.test(c.description ?? "")
  );
  return picked.length ? picked : real;
}

export async function fetchCollectionProducts(
  handle: string,
  first = 100
): Promise<{ collection: ShopifyCollection; products: ShopifyProduct[] } | null> {
  const data = await storefrontApiRequest<any>(COLLECTION_PRODUCTS_QUERY, { handle, first });
  const c = data?.data?.collection;
  if (!c) return null;
  return {
    collection: { id: c.id, handle: c.handle, title: c.title, description: c.description, image: c.image ?? null },
    products: c.products?.edges ?? [],
  };
}