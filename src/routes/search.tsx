import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import { useEffect, useMemo, useState } from "react";
import { fetchProducts, formatMoney, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cart-store";
import { Loader2, Search as SearchIcon } from "lucide-react";
import heroCorvette from "@/assets/hero-corvette.jpg";

type SearchState = { q: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchState => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: ({ loaderData: _l }) => ({
    meta: [
      { title: "Search — Tway Motorsports" },
      { name: "description", content: "Search Corvette performance parts by vehicle, brand, part name or number." },
      { property: "og:title", content: "Search — Tway Motorsports" },
      { property: "og:description", content: "Search Corvette performance parts by vehicle, brand, part name or number." },
    ],
  }),
  component: SearchPage,
});

function detectGeneration(p: ShopifyProduct): string {
  const t = p.node.title.toUpperCase();
  const tags = (p.node.tags ?? []).map((x) => x.toUpperCase());
  if (t.includes("E-RAY") || tags.includes("E-RAY")) return "E-Ray";
  if (t.includes("Z06") || tags.includes("Z06")) return "Z06";
  if (t.includes("C8")) return "C8";
  if (t.includes("C7")) return "C7";
  if (t.includes("C6")) return "C6";
  if (t.includes("C5")) return "C5";
  return "Universal";
}

function buildShopifyQuery(q: string): string {
  // Search across title, tags, vendor, product_type, sku.
  const term = q.trim();
  if (!term) return "";
  const parts = term.split(/\s+/).filter(Boolean).slice(0, 6);
  return parts
    .map(
      (t) =>
        `(title:*${t}* OR tag:*${t}* OR vendor:*${t}* OR product_type:*${t}* OR sku:*${t}*)`
    )
    .join(" AND ");
}

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [input, setInput] = useState(q);
  const [results, setResults] = useState<ShopifyProduct[] | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  useEffect(() => setInput(q), [q]);

  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      return;
    }
    setResults(null);
    const query = buildShopifyQuery(term);
    fetchProducts(50, query)
      .then((list) => {
        // Fallback: if Shopify returns nothing, do a client-side title match on all products
        if (list.length === 0) {
          fetchProducts(100)
            .then((all) => {
              const lower = term.toLowerCase();
              setResults(
                all.filter((p) => {
                  const hay = `${p.node.title} ${(p.node.tags ?? []).join(" ")} ${p.node.productType ?? ""}`.toLowerCase();
                  return hay.includes(lower);
                })
              );
            })
            .catch(() => setResults([]));
        } else {
          setResults(list);
        }
      })
      .catch(() => setResults([]));
  }, [q]);

  const count = useMemo(() => results?.length ?? 0, [results]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ search: { q: input.trim() } });
  };

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
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Search</span>
          </div>
          <Eyebrow accent className="mt-6">Search</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[0.95] tracking-tight max-w-4xl">
            {q ? <>Results for<br /><span className="text-muted-foreground">“{q}”</span></> : <>Find your part.</>}
          </h1>

          <form
            onSubmit={onSubmit}
            role="search"
            className="mt-10 w-full max-w-2xl flex items-center rounded-lg bg-background/70 backdrop-blur-xl border border-white/15 shadow-lg shadow-black/30 h-12 md:h-14 pl-4 pr-2"
          >
            <SearchIcon className="h-4 w-4 text-white/70 shrink-0" />
            <input
              autoFocus={!q}
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search by vehicle, brand, part name or number…"
              className="flex-1 bg-transparent px-3 text-sm md:text-base text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              className="h-9 md:h-10 rounded-md bg-foreground text-background px-4 font-display text-[11px] uppercase tracking-[0.18em] hover:bg-race-red hover:text-foreground transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* RESULTS */}
      <section className="container-wide py-16 md:py-20">
        {!q ? (
          <div className="max-w-xl mx-auto text-center py-16 md:py-24">
            <p className="eyebrow text-race-red">Start typing</p>
            <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold">
              Search our catalog.
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Try “C8 brakes”, “AP Racing”, or a specific part number.
            </p>
            <Link to="/shop" className="mt-6 inline-flex btn-ghost">Browse the shop →</Link>
          </div>
        ) : results === null ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : count === 0 ? (
          <div className="max-w-xl mx-auto text-center py-16 md:py-24 border border-border rounded-2xl bg-surface/40 px-8">
            <p className="eyebrow text-race-red">No matches</p>
            <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold">
              We couldn't find anything for “{q}”.
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Try a broader term, or browse by generation and category.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/shop" className="btn-ghost">Browse the shop</Link>
              <Link to="/contact" className="btn-primary">Ask a specialist</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <Eyebrow>Results</Eyebrow>
              <h2 className="mt-4 font-display text-2xl md:text-3xl font-semibold">
                {count} {count === 1 ? "product" : "products"}
              </h2>
            </div>
            <div className="grid gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results!.map((p) => {
                const node = p.node;
                const img = node.images.edges[0]?.node;
                const variant = node.variants.edges[0]?.node;
                const g = detectGeneration(p);
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
                        <span className="absolute top-4 left-4 rounded-full bg-race-red/90 text-background backdrop-blur px-3 py-1 text-[10px] font-display uppercase tracking-widest">
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
                          }),
                          window.dispatchEvent(new Event("cart:open")))
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
          </>
        )}
      </section>
    </SiteShell>
  );
}