import { useEffect, useState } from "react";
import { fetchFeaturedCollections, type ShopifyCollection } from "@/lib/shopify";

let cache: ShopifyCollection[] | null = null;
let inflight: Promise<ShopifyCollection[]> | null = null;

/**
 * Featured collections for the Shop nav.
 * A collection shows up here automatically once it has a collection image in Shopify.
 */
export function useFeaturedCollections() {
  const [collections, setCollections] = useState<ShopifyCollection[] | null>(cache);

  useEffect(() => {
    if (cache) return;
    inflight = inflight ?? fetchFeaturedCollections(100);
    inflight
      .then((c) => {
        cache = c;
        setCollections(c);
      })
      .catch(() => setCollections([]));
  }, []);

  return { loading: collections === null, collections: collections ?? [] };
}
