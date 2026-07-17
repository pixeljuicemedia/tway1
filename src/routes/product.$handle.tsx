import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import { fetchProductByHandle, formatMoney, type ShopifyProductNode } from "@/lib/shopify";
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
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  useEffect(() => {
    fetchProductByHandle(handle).then((p) => {
      setProduct(p);
      const first = p?.variants.edges[0]?.node;
      if (first) setSelectedVariantId(first.id);
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
  };

  const handleBuyNow = async () => {
    await handleAdd();
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <SiteShell>
      <div className="container-wide py-12 md:py-16">
        <Link to="/shop" className="text-xs eyebrow text-muted-foreground hover:text-foreground">← Back to Shop</Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="aspect-square overflow-hidden rounded-2xl bg-surface">
              {currentImage && (
                <img
                  src={currentImage.url}
                  alt={currentImage.altText ?? product.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <button
                    key={img.node.url}
                    onClick={() => setImageIdx(i)}
                    className={`aspect-square overflow-hidden rounded-lg bg-surface border ${i === imageIdx ? "border-race-red" : "border-border"}`}
                  >
                    <img src={img.node.url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <Eyebrow accent>Tway Motorsports</Eyebrow>
            <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight">
              {product.title}
            </h1>
            <p className="mt-6 font-display text-2xl">
              {selectedVariant && formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
            </p>

            {product.description && (
              <p className="mt-6 text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            )}

            {product.options.length > 0 && product.options[0].values.length > 1 && (
              <div className="mt-8 space-y-6">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <p className="eyebrow">{option.name}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {variants.map((v) => {
                        const val = v.selectedOptions.find((o) => o.name === option.name)?.value;
                        if (!val) return null;
                        const active = v.id === selectedVariant?.id;
                        return (
                          <button
                            key={v.id + option.name}
                            onClick={() => setSelectedVariantId(v.id)}
                            className={`rounded-full px-4 py-2 text-[11px] font-display uppercase tracking-widest border transition-colors ${
                              active ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {val}
                          </button>
                        );
                      }).filter((n, i, arr) => {
                        // dedupe by rendered label per option — simple approach: filter to first occurrence
                        return arr.findIndex((x) => (x as any)?.key === (n as any)?.key) === i;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                disabled={isLoading || !selectedVariant?.availableForSale}
                className="flex-1 h-14 inline-flex items-center justify-center rounded-lg border border-foreground text-foreground font-display text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isLoading || !selectedVariant?.availableForSale}
                className="flex-1 h-14 inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background font-display text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                <ExternalLink className="h-4 w-4" /> Buy Now
              </button>
            </div>

            {selectedVariant && !selectedVariant.availableForSale && (
              <p className="mt-4 text-sm text-race-red font-display uppercase tracking-widest">Sold out</p>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}