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

/** Top-level shopping categories and the tags that roll up into each. */
export const MAIN_CATEGORIES = [
  "Engine",
  "Brakes",
  "Suspension",
  "Exhaust",
  "Interior",
  "Exterior",
  "Tools",
  "Fluids",
] as const;

const CATEGORY_KEYWORDS: Record<string, RegExp> = {
  Engine: /(engine|intake|manifold|supercharg|turbo|boost|cooling|radiator|fuel|clutch|transmission|drivetrain|differential|belt|pulley|cam|head gasket)/i,
  Brakes: /(brake|pad|rotor|caliper|bbk|big brake|abs)/i,
  Suspension: /(suspension|coilover|spring|shock|strut|sway|bushing|control arm|alignment|camber|racing wheel|wheel|tire|rim|hub|axle)/i,
  Exhaust: /(exhaust|header|muffler|cat[- ]?back|downpipe|midpipe|x-?pipe|resonator|tip)/i,
  Interior: /(interior|seat|harness|belt kit|cage|roll bar|steering wheel|shifter|pedal|carpet|trim|apparel|safety|helmet|fire)/i,
  Exterior: /(exterior|aero|splitter|wing|rear wing|spoiler|ducktail|diffuser|body|hood|bumper|fender|rocker|canard|wrap|vinyl|mirror|glass)/i,
  Tools: /(tool|wrench|socket|spreader|jack|stand|pliers|torque|bleeder|gauge tool|equipment)/i,
  Fluids: /(fluid|oil|coolant|antifreeze|lubricant|grease|additive|chemical)/i,
};

/** Categories with the most specific keywords are matched first; Suspension precedes Exterior so wheels never land in Exterior. */
const MATCH_PRIORITY = [
  "Fluids",
  "Tools",
  "Brakes",
  "Suspension",
  ...MAIN_CATEGORIES.filter((m) => !["Fluids", "Tools", "Brakes", "Suspension"].includes(m)),
];

/** Wheel/tire language always belongs to Suspension (racing wheels), never Exterior. */
const WHEEL_TAGS = /(wheel|tire|tyre|rim)/i;

/** Which main category a tag belongs to (null if unmapped). */
export function mainCategoryOfTag(tag: string): string | null {
  const t = tag.trim();
  const exact = MAIN_CATEGORIES.find((m) => norm(m) === norm(t));
  if (exact) return exact;
  if (WHEEL_TAGS.test(t)) return "Suspension";
  for (const m of MATCH_PRIORITY) {
    if (CATEGORY_KEYWORDS[m].test(t)) return m;
  }
  return null;
}

/** Main categories a product belongs to. */
export function mainCategoriesOf(p: ShopifyProduct): string[] {
  const out = new Set<string>();
  for (const t of productTags(p)) {
    if (GEN_TAG_ORDER.some((g) => norm(g) === norm(t))) continue;
    const m = mainCategoryOfTag(t);
    if (m) out.add(m);
  }
  return Array.from(out);
}

/** Sub-category tags of a product that live under a given main category. */
export function subCategoriesOf(p: ShopifyProduct, main: string): string[] {
  return productTags(p)
    .map((t) => t.trim())
    .filter(
      (t) =>
        !IGNORED_TAGS.includes(norm(t)) &&
        !GEN_TAG_ORDER.some((g) => norm(g) === norm(t)) &&
        norm(t) !== norm(main) &&
        mainCategoryOfTag(t) === main
    );
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
    inflight = inflight ?? fetchProducts(250);
    inflight
      .then((p) => {
        cache = p;
        setProducts(p);
      })
      .catch(() => setProducts([]));
  }, []);

  return useMemo(() => {
    const counts = new Map<string, number>();
    const catCounts = new Map<string, number>();
    const subs = new Map<string, Map<string, number>>();
    for (const p of products ?? []) {
      for (const g of generationsOf(p)) counts.set(g, (counts.get(g) ?? 0) + 1);
      for (const m of mainCategoriesOf(p)) {
        catCounts.set(m, (catCounts.get(m) ?? 0) + 1);
        const bucket = subs.get(m) ?? new Map<string, number>();
        for (const s of subCategoriesOf(p, m)) bucket.set(s, (bucket.get(s) ?? 0) + 1);
        subs.set(m, bucket);
      }
    }
    return {
      loading: products === null,
      genCounts: counts,
      catCounts,
      subCategories: subs,
      generations: GEN_TAG_ORDER.filter((g) => (counts.get(g) ?? 0) > 0),
      categories: MAIN_CATEGORIES.filter((m) => (catCounts.get(m) ?? 0) > 0) as string[],
    };
  }, [products]);
}
