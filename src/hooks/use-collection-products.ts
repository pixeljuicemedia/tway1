import { useEffect, useState } from "react";
import { fetchCollectionProducts, fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const cache = new Map<string, ShopifyProduct[]>();
const inflight = new Map<string, Promise<ShopifyProduct[]>>();

/**
 * Live products for a Shopify collection handle.
 * Falls back to the newest catalog products when the collection is missing or empty,
 * so the homepage never renders demo/mock data.
 */
export function useCollectionProducts(handle: string, limit = 4) {
  const key = `${handle}:${limit}`;
  const [products, setProducts] = useState<ShopifyProduct[] | null>(cache.get(key) ?? null);

  useEffect(() => {
    const cached = cache.get(key);
    if (cached) {
      setProducts(cached);
      return;
    }
    let load = inflight.get(key);
    if (!load) {
      load = (async () => {
        const res = await fetchCollectionProducts(handle, limit);
        const list = res?.products ?? [];
        return list.length ? list.slice(0, limit) : (await fetchProducts(limit)).slice(0, limit);
      })();
      inflight.set(key, load);
    }
    let alive = true;
    load
      .then((list) => {
        cache.set(key, list);
        if (alive) setProducts(list);
      })
      .catch(() => alive && setProducts([]));
    return () => {
      alive = false;
    };
  }, [key, handle, limit]);

  return { loading: products === null, products: products ?? [] };
}
