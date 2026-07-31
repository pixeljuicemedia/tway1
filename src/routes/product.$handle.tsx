import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ExternalLink, Heart, Check } from "lucide-react";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import {
  fetchProductByHandle,
  fetchProducts,
  formatMoney,
  type ShopifyProduct,
  type ShopifyProductNode,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cart-store";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} · Tway Motorsports` },
      { name: "description", content: "Corvette performance part from Tway Motorsports — track-tested and validated in-house." },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { handle } = useParams({ from: "/product/$handle" });
  const [product, setProduct] = useState<ShopifyProductNode | null | undefined>(undefined);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [imageIdx, setImageIdx] = useState(0);
  const [related, setRelated] = useState<ShopifyProduct[]>([]);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  useEffect(() => {
    setImageIdx(0);
    fetchProductByHandle(handle).then((p) => {
      setProduct(p);
      const first = p?.variants.edges[0]?.node;
      if (first) setSelectedVariantId(first.id);
      if (p?.productType) {
        fetchProducts(8, `product_type:${p.productType}`)
          .then((list) => setRelated(list.filter((r) => r.node.handle !== p.handle).slice(0, 4)))
          .catch(() => setRelated([]));
      }
    }).catch((err) => {
      console.error(err);
      setProduct(null);
    });
  }, [handle]);

  if (product === undefined) {
    return (
      <SiteShell>
        <div className="container-wide py-32 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </SiteShell>
    );
  }

  if (product === null) {
    return (
      <SiteShell>
        <div className="container-wide py-32 text-center">
          <Eyebrow accent>Not Found</Eyebrow>
          <h1 className="mt-6 font-display text-4xl font-semibold">Product not found</h1>
          <p className="mt-4 text-muted-foreground">We couldn't find that part.</p>
          <Link to="/shop" className="mt-8 inline-flex btn-ghost">← Back to Shop</Link>
        </div>
      </SiteShell>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges.map((e) => e.node);
  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const currentImage = images[imageIdx]?.node ?? images[0]?.node;
  const thumbs = images.length > 1 ? images : [];
  const gen = detectGeneration(product);

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions ?? [],
    });
    setJustAdded(true);
    window.dispatchEvent(new Event("cart:open"));
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = async () => {
    await handleAdd();
    const url = getCheckoutUrl();
    if (!url) return;

    if (window.self !== window.top && window.top) {
      try {
        window.top.location.href = url;
        return;
      } catch {
        // Fall through when the host disallows top-level navigation.
      }
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <SiteShell>
      {/* BREADCRUMB */}
      <div className="container-wide pt-8 md:pt-12">
        <nav className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          {product.productType && (
            <>
              <span>/</span>
              <Link
                to="/category"
                search={{ gen: "All", cat: product.productType, sort: "Featured" }}
                className="hover:text-foreground"
              >
                {product.productType}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      {/* PRODUCT MAIN */}
      <section className="container-wide pt-10 md:pt-14 pb-8 md:pb-10">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1.15fr_1fr] items-start">
          {/* Gallery */}
          <div className="grid gap-3 md:gap-4 grid-cols-6">
            <div className="col-span-6 relative overflow-hidden rounded-xl bg-surface flex items-center justify-center">
              {currentImage && (
                <img
                  src={currentImage.url}
                  alt={currentImage.altText ?? product.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}
            </div>
            {thumbs.map((img, i) => (
              <button
                key={img.node.url}
                onClick={() => setImageIdx(i)}
                className={`col-span-2 md:col-span-2 relative aspect-square overflow-hidden rounded-lg bg-surface ${i === imageIdx ? "ring-1 ring-race-red" : "opacity-70 hover:opacity-100"}`}
              >
                <img src={img.node.url} alt={img.node.altText ?? `${product.title} angle ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
            {/* Spec strip */}
            <div className="col-span-6 mt-4 hairline-t pt-8 grid grid-cols-3 gap-6">
              <div>
                <div className="font-display text-2xl">{gen || "Corvette"}</div>
                <div className="mt-1 eyebrow">Fitment</div>
              </div>
              <div>
                <div className="font-display text-2xl">{product.productType || "Performance"}</div>
                <div className="mt-1 eyebrow">Category</div>
              </div>
              <div>
                <div className="font-display text-2xl">Yes</div>
                <div className="mt-1 eyebrow">Track Tested</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-28">
            <Eyebrow accent>
              {[product.productType, gen].filter(Boolean).join(" · ") || "Tway Motorsports"}
            </Eyebrow>
            <h1 className="mt-6 font-display text-2xl md:text-3xl font-semibold leading-[1.1]">
              {product.title}
            </h1>
            {selectedVariant?.sku && (
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="eyebrow mr-2 align-middle">Part #:</span>
                <span className="font-display tracking-wide">{selectedVariant.sku}</span>
              </p>
            )}
            {selectedVariant?.selectedOptions?.length ? (
              <p className="mt-3 text-sm text-muted-foreground">
                {selectedVariant.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(" · ")}
              </p>
            ) : null}

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-display text-4xl font-semibold">
                {selectedVariant && formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </span>
              <span className={`eyebrow ${selectedVariant?.availableForSale ? "text-race-red" : "text-muted-foreground"}`}>
                {selectedVariant?.availableForSale ? "In Stock" : "Sold Out"}
              </span>
            </div>

            {(product.descriptionHtml || product.description) && (
              <div
                className="prose-product mt-8 text-muted-foreground leading-relaxed max-w-md"
                dangerouslySetInnerHTML={{
                  __html: product.descriptionHtml || product.description,
                }}
              />
            )}

            {/* Options */}
            {product.options?.map((opt) => {
              if (opt.values.length <= 1 && opt.values[0] === "Default Title") return null;
              return (
                <div key={opt.name} className="mt-10">
                  <p className="eyebrow">{opt.name}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {opt.values.map((val) => {
                      // Build desired option combo: keep other options from current selection,
                      // change only this option to `val`. This makes each dropdown independent.
                      const desired = (selectedVariant?.selectedOptions ?? []).map((so) =>
                        so.name === opt.name ? { ...so, value: val } : so,
                      );
                      if (!desired.some((so) => so.name === opt.name)) {
                        desired.push({ name: opt.name, value: val });
                      }
                      const match =
                        variants.find((v) =>
                          desired.every((d) =>
                            v.selectedOptions.some((so) => so.name === d.name && so.value === d.value),
                          ),
                        ) ??
                        variants.find((v) =>
                          v.selectedOptions.some((so) => so.name === opt.name && so.value === val),
                        );
                      const active = selectedVariant?.selectedOptions.some(
                        (so) => so.name === opt.name && so.value === val,
                      );
                      return (
                        <button
                          key={val}
                          onClick={() => match && setSelectedVariantId(match.id)}
                          disabled={!match?.availableForSale}
                          className={`px-4 py-3 rounded-lg border text-xs font-display uppercase tracking-widest disabled:opacity-40 ${
                            active
                              ? "border-foreground bg-foreground/5"
                              : "border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="mt-10 flex gap-3">
              <button
                onClick={handleAdd}
                disabled={isLoading || !selectedVariant?.availableForSale}
                className={`btn-primary flex-1 disabled:opacity-50 transition-colors ${justAdded ? "!bg-race-red !text-white !border-race-red" : ""}`}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : justAdded ? (
                  <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Added to Cart</span>
                ) : selectedVariant ? (
                  `Add to Build — ${formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode)}`
                ) : (
                  "Add to Build"
                )}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isLoading || !selectedVariant?.availableForSale}
                className="btn-ghost !px-4 disabled:opacity-50"
                aria-label="Buy now"
                title="Buy now"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("cart:open"))}
              className="mt-3 w-full text-center text-[11px] font-display font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              View Cart
            </button>
            <p className="mt-4 text-xs text-muted-foreground text-center">Ships in 3–5 business days · Free US shipping over $500</p>
          </div>
        </div>
      </section>

      {/* CROSS-SELL */}
      {related.length > 0 && (
        <section className="container-wide pt-8 md:pt-10 pb-24 md:pb-32 hairline-t">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <Eyebrow>Pair with</Eyebrow>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">Completes the build</h2>
            </div>
            <Link to="/shop" className="btn-ghost">View All →</Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => {
              const img = r.node.images.edges[0]?.node;
              const price = r.node.priceRange.minVariantPrice;
              return (
                <Link
                  key={r.node.id}
                  to="/product/$handle"
                  params={{ handle: r.node.handle }}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
                    {img && (
                      <img
                        src={img.url}
                        alt={img.altText ?? r.node.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <h3 className="font-display text-base font-medium">{r.node.title}</h3>
                    <span className="font-display text-sm text-muted-foreground shrink-0">
                      {formatMoney(price.amount, price.currencyCode)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </SiteShell>
  );
}

function detectGeneration(p: ShopifyProductNode): string {
  const hay = `${p.title} ${p.tags.join(" ")}`.toUpperCase();
  for (const g of ["C8", "C7", "C6", "C5"]) if (hay.includes(g)) return g;
  return "";
}