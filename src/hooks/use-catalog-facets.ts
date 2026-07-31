import { useEffect, useMemo, useState } from "react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

export const GEN_TAG_ORDER = ["C5", "C6", "C7", "C8", "Z06", "E-Ray", "Universal"];
const IGNORED_TAGS = ["corvette"];
const norm = (s: string) => s.trim().toLowerCase();

export const GEN_META: Record<string, { label: string; years: string }> = {
  C5: { label: "C5 Corvette", years: "1997 – 2004" },
  C6: { label: "C6 Corvette", years: "2005 – 2013" },
  C7: { label: "C7 Corvette", years: "2014 – 2019" },
  C8: { label: "C8 Stingray", years: "2020 – Present" },
  Z06: { label: "C8 Z06", years: "2023 – Present" },
  "E-Ray": { label: "C8 E-Ray", years: "2024 – Present" },
  Universal: { label: "Universal", years: "All Generations" },
};

export function productTags(p: ShopifyProduct): string[] {
  const tags = p.node.tags ?? [];
  return p.node.productType ? [...tags, p.node.productType] : tags;
}

export function generationsOf(p: ShopifyProduct): string[] {
  const gens = GEN_TAG_ORDER.filter((g) => productTags(p).some((t) => norm(t) === norm(g)));
  return gens.length ? gens : ["Universal"];
}

let cache: ShopifyProduct[] | null = null;
let inflight: Promise<ShopifyProduct[]> | null = null;

/** Live catalog facets (generations + categories) derived from Shopify tags/product types. */
export function useCatalogFacets() {
  const [products, setProducts] = useState<ShopifyProduct[] | null>(cache);

  useEffect(() => {
    if (cache) return;
    inflight = inflight ?? fetchProducts(100);
    inflight
      .then((p) => {
        cache = p;
        setProducts(p);
      })
      .catch(() => setProducts([]));
  }, []);

  return useMemo(() => {
    const counts = new Map<string, number>();
    const cats = new Map<string, string>();
    const catCounts = new Map<string, number>();
    for (const p of products ?? []) {
      for (const g of generationsOf(p)) counts.set(g, (counts.get(g) ?? 0) + 1);
      for (const t of productTags(p)) {
        const n = norm(t);
        if (IGNORED_TAGS.includes(n)) continue;
        if (GEN_TAG_ORDER.some((g) => norm(g) === n)) continue;
        if (!cats.has(n)) cats.set(n, t.trim());
        catCounts.set(t.trim(), (catCounts.get(t.trim()) ?? 0) + 1);
      }
    }
    return {
      loading: products === null,
      genCounts: counts,
      catCounts,
      generations: GEN_TAG_ORDER.filter((g) => (counts.get(g) ?? 0) > 0),
      categories: Array.from(cats.values()).sort((a, b) => a.localeCompare(b)),
    };
  }, [products]);
}
