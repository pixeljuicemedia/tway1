import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import { useEffect, useMemo, useState } from "react";
import { fetchProducts, formatMoney, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cart-store";
import { Loader2 } from "lucide-react";
import { MAIN_CATEGORIES, mainCategoriesOf } from "@/hooks/use-catalog-facets";
import catC8 from "@/assets/cat-c8-white.jpg";
import catC7 from "@/assets/cat-c7-white.jpg";
import catC6 from "@/assets/cat-c6-white.jpg";
import catC5 from "@/assets/cat-c5-white.jpg";
import catElectronics from "@/assets/cat-electronics.jpg";
import catSafety from "@/assets/cat-safety.jpg";
import build3 from "@/assets/build-3.jpg";
import build1 from "@/assets/build-1.jpg";
import build2 from "@/assets/build-2.jpg";
import heroCorvette from "@/assets/hero-corvette-white.jpg";
import shopHero from "@/assets/shop-hero-corvette.jpg.asset.json";
import corvetteSide from "@/assets/corvette-side-white.jpg.asset.json";
import trackside from "@/assets/trackside.jpg.asset.json";
import racePrep from "@/assets/race-prep.jpg.asset.json";
import engineering from "@/assets/engineering-white.jpg.asset.json";
import burnout1 from "@/assets/burnout1.jpg.asset.json";
import burnout5 from "@/assets/burnout5.jpg.asset.json";
import insideShop2 from "@/assets/inside-shop-2.png.asset.json";
import insideShop4 from "@/assets/inside-shop-4.png.asset.json";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Your Corvette — C5, C6, C7, C8, Z06, E-Ray · Tway Motorsports" },
      { name: "description", content: "The premier destination for Corvette performance. Shop track-tested parts by generation — C5, C6, C7, C8 Corvette, Z06 and E-Ray." },
      { property: "og:title", content: "Shop Your Corvette — Tway Motorsports" },
      { property: "og:description", content: "Track-tested Corvette parts by generation. C5 through C8 Z06 and E-Ray. Installed and validated in-house." },
    ],
  }),
  component: ShopPage,
});

// Generation tags, in display order — filtered against what the catalog actually has
const GEN_TAG_ORDER = ["C5", "C6", "C7", "C8", "Z06", "E-Ray", "Universal"];
const norm = (s: string) => s.trim().toLowerCase();

function productTags(p: ShopifyProduct): string[] {
  const tags = p.node.tags ?? [];
  return p.node.productType ? [...tags, p.node.productType] : tags;
}

function generationsOf(p: ShopifyProduct): string[] {
  const gens = GEN_TAG_ORDER.filter((g) => productTags(p).some((t) => norm(t) === norm(g)));
  return gens.length ? gens : ["Universal"];
}

// Generation hero cards (white-background studio imagery)
const genCards = [
  { key: "C5", years: "1997 – 2004", title: "C5 Corvette", blurb: "LS1 / LS6 · The proven platform.", img: catC5 },
  { key: "C6", years: "2005 – 2013", title: "C6 Corvette", blurb: "LS2 / LS3 / LS7 · Track-day favorite.", img: catC6 },
  { key: "C7", years: "2014 – 2019", title: "C7 Corvette", blurb: "LT1 / LT4 · Grand Sport & Z06.", img: catC7 },
  { key: "C8", years: "2020 – Present", title: "C8 Corvette", blurb: "LT2 · Mid-engine, dialed in.", img: catC8 },
  { key: "Z06", years: "2023 – Present", title: "C8 Z06", blurb: "LT6 flat-plane · 670 hp weapon.", img: heroCorvette },
  { key: "E-Ray", years: "2024 – Present", title: "C8 E-Ray", blurb: "Hybrid AWD · eAWD performance.", img: corvetteSide.url },
  { key: "Universal", years: "All Generations", title: "Universal Corvette", blurb: "Tools, safety & apparel.", img: engineering.url },
];

// Curated Corvette collections
const collections = [
  { title: "Most Popular C8 Upgrades", desc: "Bolt-ons the Stingray community keeps buying.", img: catC8, count: 24 },
  { title: "C7 Track Essentials", desc: "Everything the Grand Sport needs for a session.", img: build3, count: 18 },
  { title: "Best Selling C6 Parts", desc: "Tried and proven on the Z06 platform.", img: catC6, count: 21 },
  { title: "Z06 Aero Packages", desc: "Front splitters, wickers, wings — flat-plane ready.", img: heroCorvette, count: 12 },
  { title: "Suspension Upgrades", desc: "Coilovers, sway bars and geometry parts.", img: build1, count: 36 },
  { title: "New Corvette Arrivals", desc: "The latest hardware, just off the shelf.", img: heroCorvette, count: 15 },
];

const lifestyle = [
  { img: trackside.url, label: "Trackside" },
  { img: racePrep.url, label: "Race Prep" },
  { img: insideShop4.url, label: "Fabrication" },
  { img: burnout1.url, label: "Rolling" },
  { img: insideShop2.url, label: "Suspension Bay" },
  { img: burnout5.url, label: "Podium" },
];

function ShopPage() {
  const [products, setProducts] = useState<ShopifyProduct[] | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    fetchProducts(48).then(setProducts).catch((err) => {
      console.error("Failed to load products:", err);
      setProducts([]);
    });
  }, []);

  const productCount = products?.length ?? 0;

  const { genCounts, categories } = useMemo(() => {
    const counts = new Map<string, number>();
    const cats = new Set<string>();
    for (const p of products ?? []) {
      for (const g of generationsOf(p)) counts.set(g, (counts.get(g) ?? 0) + 1);
      for (const m of mainCategoriesOf(p)) cats.add(m);
    }
    return {
      genCounts: counts,
      categories: MAIN_CATEGORIES.filter((m) => cats.has(m)) as string[],
    };
  }, [products]);

  const availableGens = GEN_TAG_ORDER.filter((g) => (genCounts.get(g) ?? 0) > 0);
  const visibleGenCards = genCards.filter((g) => (genCounts.get(g.key) ?? 0) > 0);
  const generations = ["All Corvettes", ...availableGens];

  return (
    <SiteShell>
      {/* HERO — Corvette-first */}
      <section className="relative hairline-b overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${shopHero.url})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.14 0.005 260 / 0.35) 0%, oklch(0.14 0.005 260 / 0.55) 55%, oklch(0.14 0.005 260) 100%)",
          }}
          aria-hidden
        />
        <div className="relative container-wide pt-20 md:pt-28 pb-20 md:pb-28 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-end">
          <div>
            <Eyebrow accent>The Corvette Shop · Est. 2000</Eyebrow>
            <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
              Shop your<br />Corvette.
            </h1>
            <p className="mt-6 max-w-lg text-muted-foreground leading-relaxed">
              C5 through C8 Z06 and E-Ray — every part mounted, mapped and validated on our own cars before it hits the shelf. This is where Corvette owners come for real speed.
            </p>
          </div>
          <div className="max-w-md">
            <div className="grid grid-cols-3 gap-6 hairline-t pt-6">
              <Stat kpi="25+" label="Years on Corvette" />
              <Stat kpi="447" label="Parts in stock" />
              <Stat kpi="6" label="Generations" />
            </div>
          </div>
        </div>
      </section>

      {/* SHOP YOUR CORVETTE — Generation cards */}
      <section className="container-wide py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] items-end mb-12">
          <div>
            <Eyebrow accent>Shop Your Corvette</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[0.95] tracking-tight">
              Pick your generation.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
            Every product is tagged for fitment. Select a car and the catalog filters to parts engineered specifically for it.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleGenCards.map((g) => (
            <Link
              key={g.key}
              to="/category"
              search={{ gen: g.key, cat: "All", sort: "Featured" }}
              className="group block overflow-hidden rounded-2xl border border-border bg-white"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <img
                  src={g.img}
                  alt={g.title}
                  className="h-full w-full object-contain object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-full bg-black/80 text-white backdrop-blur px-3 py-1 text-[10px] font-display uppercase tracking-widest">
                    {g.years}
                  </span>
                  <span className="text-[10px] font-display uppercase tracking-widest text-black/70">
                    {genCounts.get(g.key) ?? 0} parts
                  </span>
                </div>
              </div>
              <div className="p-5 md:p-6 border-t border-border/50">
                <p className="eyebrow text-race-red">Generation · {g.key}</p>
                <h3 className="mt-2 font-display text-xl md:text-2xl font-semibold leading-tight text-black">
                  {g.title}
                </h3>
                <p className="mt-1.5 text-sm text-black/70 leading-snug">{g.blurb}</p>
                <div className="mt-4 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-widest text-black group-hover:text-race-red transition-colors">
                  Shop {g.key}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CORVETTE-FIRST NAV — sticky generation + category filters */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/90 backdrop-blur-xl hairline-b hairline-t">
        <div className="container-wide py-4 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="shrink-0 eyebrow text-race-red pr-2">Generation</span>
            {generations.map((f, i) => (
              <Link
                key={f}
                to="/category"
                search={{ gen: f === "All Corvettes" ? "All" : f, cat: "All", sort: "Featured" }}
                className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-display uppercase tracking-widest border transition-colors ${
                  i === 0
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {f}
              </Link>
            ))}
            <div className="ml-auto shrink-0 hidden md:flex items-center gap-3 text-xs text-muted-foreground">
              <span>{productCount} products</span>
              <span className="h-4 w-px bg-border" />
              <button className="font-display uppercase tracking-widest text-[11px] text-foreground">Sort ↓</button>
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="shrink-0 eyebrow pr-2">Category</span>
            {categories.map((c) => (
              <Link
                key={c}
                to="/category"
                search={{ gen: "All", cat: c, sort: "Featured" }}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-display uppercase tracking-widest border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="container-wide py-16 md:py-24">
        {products === null ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-16 md:py-24 border border-border rounded-2xl bg-surface/40 px-8">
            <p className="eyebrow text-race-red">Catalog</p>
            <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold">No products found</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Your Shopify store is connected but empty. Tell the chat what to add — e.g. "Add product: C8 Cold Air Intake, $780" — and it'll appear here instantly.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => {
                const node = p.node;
                const img = node.images.edges[0]?.node;
                const variant = node.variants.edges[0]?.node;
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

            <div className="mt-20 flex flex-col items-center gap-4">
              <p className="text-xs text-muted-foreground">Showing {productCount} Corvette parts</p>
            </div>
          </>
        )}
      </section>

      {/* CURATED COLLECTIONS */}
      <section className="hairline-t bg-surface/40">
        <div className="container-wide py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] items-end mb-12">
            <div>
              <Eyebrow accent>Curated Collections</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-[0.95] tracking-tight">
                Built for Corvette owners.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Hand-picked bundles our engineers actually recommend — not algorithmic filler.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c) => (
              <Link key={c.title} to="/category" search={{ gen: "All", cat: "All", sort: "Featured" }} className="group relative block overflow-hidden rounded-2xl border border-border bg-background">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.title} className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-medium leading-tight">{c.title}</h3>
                    <span className="shrink-0 text-[10px] font-display uppercase tracking-widest text-muted-foreground">{c.count} items</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-widest text-foreground group-hover:text-race-red transition-colors">
                    Explore Collection
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE STRIP — race shop authenticity */}
      <section className="container-wide py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] items-end mb-12">
          <div>
            <Eyebrow accent>Inside the Race Shop</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-[0.95] tracking-tight">
              Every part, on our own cars first.
            </h2>
          </div>
          <Link to="/services" className="btn-ghost shrink-0">Professional Installation →</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {lifestyle.map((l, i) => (
            <div key={l.label} className={`group relative overflow-hidden rounded-xl bg-surface ${i === 0 ? "md:row-span-2 md:col-span-1 aspect-square md:aspect-auto" : "aspect-[4/5]"}`}>
              <img src={l.img} alt={l.label} className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                <span className="text-[10px] font-display uppercase tracking-widest text-white">{l.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hairline-t">
        <div className="container-wide py-20 md:py-24 grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
          <div>
            <Eyebrow accent>Not sure what fits?</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-5xl font-semibold leading-[0.95] tracking-tight">
              Talk to a Corvette specialist.
            </h2>
            <p className="mt-6 max-w-lg text-muted-foreground leading-relaxed">
              Give us your VIN, mods list and how you drive the car — we'll spec a build the same way we spec our own.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-6 py-4 font-display text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors">
              Request a Build Consult
            </Link>
            <Link to="/services" className="btn-ghost justify-center">See Services</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{kpi}</p>
      <p className="mt-2 text-[10px] font-display uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}