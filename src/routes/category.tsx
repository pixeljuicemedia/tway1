import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import { useEffect, useMemo, useState } from "react";
import { fetchProducts, fetchCollectionProducts, formatMoney, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cart-store";
import { Loader2 } from "lucide-react";
import { MAIN_CATEGORIES, mainCategoriesOf, subCategoriesOf } from "@/hooks/use-catalog-facets";
import heroCorvette from "@/assets/hero-corvette.jpg";

type SearchState = { gen: string; cat: string; sub?: string; sort: string; collection?: string };

// Generation tags, in display order. Only ones present in the catalog are shown.
const GEN_TAG_ORDER = ["C5", "C6", "C7", "C8", "Z06", "E-Ray", "Universal"];
const SORTS = ["Featured", "Price ↑", "Price ↓", "A–Z"] as const;

const norm = (s: string) => s.trim().toLowerCase();

function productTags(p: ShopifyProduct): string[] {
  const tags = p.node.tags ?? [];
  return p.node.productType ? [...tags, p.node.productType] : tags;
}

function hasTag(p: ShopifyProduct, tag: string): boolean {
  return productTags(p).some((t) => norm(t) === norm(tag));
}

const GEN_YEARS: Record<string, string> = {
  All: "Every Corvette",
  C5: "1997 – 2004",
  C6: "2005 – 2013",
  C7: "2014 – 2019",
  C8: "2020 – Present",
  Z06: "2023 – Present",
  "E-Ray": "2024 – Present",
  Universal: "All Generations",
};

export const Route = createFileRoute("/category")({
  validateSearch: (search: Record<string, unknown>): SearchState => ({
    gen: typeof search.gen === "string" ? search.gen : "All",
    cat: typeof search.cat === "string" ? search.cat : "All",
    sub: typeof search.sub === "string" && search.sub && search.sub !== "All" ? search.sub : undefined,
    sort: typeof search.sort === "string" ? search.sort : "Featured",
    collection: typeof search.collection === "string" && search.collection ? search.collection : undefined,
  }),
  head: ({ loaderData: _l }) => ({
    meta: [
      { title: "Corvette Performance Parts — Tway Motorsports" },
      { name: "description", content: "Track-tested Corvette parts — aero, suspension, brakes, wheels, engine and interior upgrades. Filter by generation and category." },
      { property: "og:title", content: "Corvette Performance Parts — Tway Motorsports" },
      { property: "og:description", content: "Track-tested Corvette parts, engineered and validated in-house." },
    ],
  }),
  component: CategoryPage,
});

function generationsOf(p: ShopifyProduct): string[] {
  const gens = GEN_TAG_ORDER.filter((g) => hasTag(p, g));
  return gens.length ? gens : ["Universal"];
}

function CategoryPage() {
  const { gen, cat, sub, sort, collection } = Route.useSearch();
  const navigate = useNavigate({ from: "/category" });
  const [products, setProducts] = useState<ShopifyProduct[] | null>(null);
  const [collectionTitle, setCollectionTitle] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    let cancelled = false;
    setProducts(null);
    if (collection) {
      fetchCollectionProducts(collection, 100)
        .then((res) => {
          if (cancelled) return;
          setCollectionTitle(res?.collection.title ?? null);
          setProducts(res?.products ?? []);
        })
        .catch(() => !cancelled && setProducts([]));
    } else {
      setCollectionTitle(null);
      fetchProducts(250)
        .then((p) => !cancelled && setProducts(p))
        .catch(() => !cancelled && setProducts([]));
    }
    return () => {
      cancelled = true;
    };
  }, [collection]);

  const filtered = useMemo(() => {
    if (!products) return null;
    let list = products.slice();
    if (gen !== "All") list = list.filter((p) => generationsOf(p).some((g) => norm(g) === norm(gen)));
    if (cat !== "All") list = list.filter((p) => mainCategoriesOf(p).some((m) => norm(m) === norm(cat)));
    if (sub) list = list.filter((p) => hasTag(p, sub));
    switch (sort) {
      case "Price ↑":
        list.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
        break;
      case "Price ↓":
        list.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
        break;
      case "A–Z":
        list.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
    }
    return list;
  }, [products, gen, cat, sub, sort]);

  // Facets built from the live catalog's tags
  const { genOptions, catOptions, subOptions } = useMemo(() => {
    const gens = new Set<string>();
    const cats = new Set<string>();
    const subs = new Map<string, string>();
    for (const p of products ?? []) {
      for (const g of generationsOf(p)) gens.add(g);
      for (const m of mainCategoriesOf(p)) cats.add(m);
      if (cat !== "All" && mainCategoriesOf(p).some((m) => norm(m) === norm(cat))) {
        for (const s of subCategoriesOf(p, cat)) if (!subs.has(norm(s))) subs.set(norm(s), s);
      }
    }
    return {
      genOptions: ["All", ...GEN_TAG_ORDER.filter((g) => gens.has(g))],
      catOptions: ["All", ...MAIN_CATEGORIES.filter((m) => cats.has(m))],
      subOptions: Array.from(subs.values()).sort((a, b) => a.localeCompare(b)),
    };
  }, [products, cat]);

  const title = collectionTitle ?? (gen === "All" ? "All Corvette Parts" : `${gen} Corvette`);
  const subtitle = cat === "All" ? "Performance parts." : `${cat}.`;

  const setParam = (key: keyof SearchState, value: string) =>
    navigate({ search: (prev: SearchState) => ({ ...prev, [key]: value }), resetScroll: false });

  const setCat = (value: string) =>
    navigate({ search: (prev: SearchState) => ({ ...prev, cat: value, sub: undefined }), resetScroll: false });

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative hairline-b overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroCorvette})` }} aria-hidden />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.14 0.005 260 / 0.35) 0%, oklch(0.14 0.005 260 / 0.6) 55%, oklch(0.14 0.005 260) 100%)",
          }}
          aria-hidden
        />
        <div className="relative container-wide pt-20 md:pt-24 pb-16 md:pb-20">
          <div className="flex items-center gap-2 text-[11px] font-display uppercase tracking-widest text-muted-foreground">
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            {collectionTitle ? (
              <span className="text-foreground">{collectionTitle}</span>
            ) : (
              <span className="text-foreground">{gen === "All" ? "All Corvettes" : gen}</span>
            )}
            {cat !== "All" && (<><span>/</span><span className="text-foreground">{cat}</span></>)}
            {sub && (<><span>/</span><span className="text-foreground">{sub}</span></>)}
          </div>
          <Eyebrow accent className="mt-6">{collectionTitle ? "Featured Collection" : GEN_YEARS[gen] ?? "All Corvettes"}</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight max-w-4xl">
            {title}<br /><span className="text-muted-foreground">{subtitle}</span>
          </h1>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/90 backdrop-blur-xl hairline-b">
        <div className="container-wide py-4 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="shrink-0 eyebrow text-race-red pr-2">Generation</span>
            {genOptions.map((f) => {
              const active = gen === f;
              return (
                <button
                  key={f}
                  onClick={() => setParam("gen", f)}
                  className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-display uppercase tracking-widest border transition-colors ${
                    active
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  }`}
                >
                  {f === "All" ? "All Corvettes" : f}
                </button>
              );
            })}
            <div className="ml-auto shrink-0 hidden md:flex items-center gap-3 text-xs text-muted-foreground">
              <span>{filtered?.length ?? 0} products</span>
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="shrink-0 eyebrow pr-2">Category</span>
            {catOptions.map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-display uppercase tracking-widest border transition-colors ${
                    active
                      ? "bg-foreground text-background border-foreground"
                      : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          {cat !== "All" && subOptions.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="shrink-0 eyebrow pr-2">{cat}</span>
              <button
                onClick={() => setParam("sub", "All")}
                className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-display uppercase tracking-widest border transition-colors ${
                  !sub ? "border-foreground text-foreground" : "border-border/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                All {cat}
              </button>
              {subOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setParam("sub", s)}
                  className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-display uppercase tracking-widest border transition-colors ${
                    sub === s ? "border-foreground text-foreground" : "border-border/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="container-wide py-16 md:py-20">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <Eyebrow>
              {gen === "All" ? "Showing all parts" : `Showing ${gen} parts`}
              {cat !== "All" ? ` · ${cat}` : ""}
            </Eyebrow>
            <h2 className="mt-4 font-display text-2xl md:text-3xl font-semibold">
              {filtered?.length ?? 0} products
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {SORTS.map((s) => (
              <button
                key={s}
                onClick={() => setParam("sort", s)}
                className={`rounded-full px-3.5 py-1.5 text-[11px] font-display uppercase tracking-widest border transition-colors ${
                  sort === s
                    ? "border-foreground text-foreground"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {products === null ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : filtered && filtered.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-16 md:py-24 border border-border rounded-2xl bg-surface/40 px-8">
            <p className="eyebrow text-race-red">No matches</p>
            <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold">Nothing fits that filter yet.</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Try widening your search or clear the filters.
            </p>
            <button
              onClick={() => navigate({ search: { gen: "All", cat: "All", sort: "Featured" } })}
              className="mt-6 btn-ghost"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered!.map((p) => {
              const node = p.node;
              const img = node.images.edges[0]?.node;
              const variant = node.variants.edges[0]?.node;
              const g = generationsOf(p).join(" · ");
              return (
                <div key={node.id} className="group block">
                  <Link to="/product/$handle" params={{ handle: node.handle }}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
                      {img && (
                        <img
                          src={img.url}
                          alt={img.altText ?? node.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                      )}
                      <span className="absolute top-4 left-4 rounded-full bg-race-red/90 text-background backdrop-blur px-3 py-1 text-[16px] font-bold font-display uppercase tracking-widest">
                        {g}
                      </span>
                      {node.productType && (
                        <span className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[10px] font-display uppercase tracking-widest">
                          {node.productType}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="mt-5 grid grid-cols-[1fr_auto] gap-4 items-start">
                    <div className="min-w-0">
                      <Link to="/product/$handle" params={{ handle: node.handle }}>
                        <h3 className="font-display text-base font-medium leading-snug truncate hover:text-race-red transition-colors">
                          {node.title}
                        </h3>
                      </Link>
                      <p className="mt-1 font-display text-sm text-muted-foreground">
                        {formatMoney(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}
                      </p>
                    </div>
                    <button
                      disabled={!variant || cartLoading || !variant.availableForSale}
                      onClick={() =>
                        variant &&
                        (addItem({
                          product: p,
                          variantId: variant.id,
                          variantTitle: variant.title,
                          price: variant.price,
                          quantity: 1,
                          selectedOptions: variant.selectedOptions ?? [],
                        }), window.dispatchEvent(new Event("cart:open")))
                      }
                      className="shrink-0 rounded-full border border-border px-3 py-1.5 text-[10px] font-display uppercase tracking-widest hover:border-race-red hover:text-race-red transition-colors disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="hairline-t">
        <div className="container-wide py-16 md:py-20 grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
          <div>
            <Eyebrow accent>Not sure what fits?</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl font-semibold leading-[0.95] tracking-tight">
              Talk to a Corvette specialist.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-6 py-4 font-display text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors">
              Request a Build Consult
            </Link>
            <Link to="/shop" className="btn-ghost justify-center">Back to Shop</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}