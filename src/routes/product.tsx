import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import svcDyno from "@/assets/svc-dyno.jpg";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Track-Spec Intake Manifold — Tway Motorsports" },
      { name: "description", content: "CNC-machined billet intake manifold for LT4 and LT2 platforms. Track-validated with a documented +42 whp gain." },
      { property: "og:title", content: "Track-Spec Intake Manifold — Tway Motorsports" },
      { property: "og:description", content: "CNC-machined billet intake manifold, track-validated. Documented +42 whp." },
      { property: "og:image", content: "https://images.unsplash.com/placeholder" },
    ],
  }),
  component: ProductPage,
});

const gallery = [prod1, prod4, prod2, prod3];

function ProductPage() {
  return (
    <SiteShell>
      {/* BREADCRUMB */}
      <div className="container-wide pt-8 md:pt-12">
        <nav className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span>Intake</span>
          <span>/</span>
          <span className="text-foreground">Track-Spec Manifold</span>
        </nav>
      </div>

      {/* PRODUCT MAIN */}
      <section className="container-wide pt-10 md:pt-14 pb-24 md:pb-32">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1.15fr_1fr] items-start">
          {/* Gallery */}
          <div className="grid gap-3 md:gap-4 grid-cols-6">
            <div className="col-span-6 relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
              <img src={prod1} alt="Track-Spec Intake Manifold main view" className="h-full w-full object-cover" />
            </div>
            {gallery.map((g, i) => (
              <button key={i} className={`col-span-2 md:col-span-2 relative aspect-square overflow-hidden rounded-lg bg-surface ${i === 0 ? "ring-1 ring-race-red" : "opacity-70 hover:opacity-100"}`}>
                <img src={g} alt={`Angle ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-28">
            <Eyebrow accent>Intake · Track-Only</Eyebrow>
            <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-[1.02]">
              Track-Spec Billet<br />Intake Manifold
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">SKU · TWY-INT-LT4-01 · Fitment: LT4 / LT2</p>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-display text-4xl font-semibold">$1,895</span>
              <span className="text-sm text-muted-foreground line-through">$2,195</span>
              <span className="eyebrow text-race-red">In Stock</span>
            </div>

            <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
              CNC-machined from 6061-T6 billet aluminum with a hand-ported plenum. Validated on our Mustang dyno: <span className="text-foreground">+42 whp / +38 lb-ft</span> at the wheels versus factory.
            </p>

            {/* Options */}
            <div className="mt-10 space-y-6">
              <div>
                <p className="eyebrow">Finish</p>
                <div className="mt-3 flex gap-2">
                  {["Raw Billet", "Anodized Black", "Cerakote Red"].map((o, i) => (
                    <button key={o} className={`px-4 py-3 rounded-lg border text-xs font-display uppercase tracking-widest ${i === 1 ? "border-foreground bg-foreground/5" : "border-border text-muted-foreground hover:text-foreground"}`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow">Throttle Body</p>
                <div className="mt-3 flex gap-2">
                  {["87mm", "95mm", "103mm"].map((o, i) => (
                    <button key={o} className={`px-5 py-3 rounded-lg border text-xs font-display uppercase tracking-widest ${i === 2 ? "border-foreground bg-foreground/5" : "border-border text-muted-foreground hover:text-foreground"}`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <button className="btn-primary flex-1">Add to Build — $1,895</button>
              <button className="btn-ghost !px-4" aria-label="Save">♡</button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground text-center">Ships in 3–5 business days · Free US shipping over $500</p>

            {/* Spec strip */}
            <div className="mt-12 hairline-t pt-8 grid grid-cols-3 gap-6">
              {[["+42", "WHP Gain"], ["6061", "Billet T6"], ["Yes", "Track Tested"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl">{n}</div>
                  <div className="mt-1 eyebrow">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPECS / STORY */}
      <section className="hairline-t">
        <div className="container-wide py-24 md:py-32 grid gap-16 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <Eyebrow>Engineering Notes</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-5xl font-semibold leading-[1.05]">Designed for full throttle. Every lap.</h2>
            <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
              Runners are CFD-optimized for a 5,800–7,600 RPM operating window — where the LT platform lives on track. Every unit is hand-blended and flow-tested before it ships.
            </p>
            <dl className="mt-10 divide-y divide-border">
              {[
                ["Material", "6061-T6 Billet Aluminum"],
                ["Runner Length", "165 mm (matched)"],
                ["Plenum Volume", "6.2 L"],
                ["TB Compatibility", "87 / 95 / 103 mm"],
                ["Warranty", "24 months · race use covered"],
              ].map(([k, v]) => (
                <div key={k} className="py-4 grid grid-cols-[1fr_1.4fr] gap-4">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="text-sm text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            <img src={svcDyno} alt="Product dyno testing" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CROSS-SELL */}
      <section className="container-wide py-24 md:py-32 hairline-t">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <Eyebrow>Pair with</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold">Completes the build</h2>
          </div>
          <Link to="/shop" className="btn-ghost">View All →</Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Long-Tube Headers", price: "$1,780", img: prod4 },
            { name: "Forged Race Wheel", price: "$1,240", img: prod2 },
            { name: "Carbon Front Splitter", price: "$2,450", img: prod3 },
            { name: "Track-Spec Intake", price: "$1,895", img: prod1 },
          ].map((p) => (
            <Link key={p.name} to="/product" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <h3 className="font-display text-base font-medium">{p.name}</h3>
                <span className="font-display text-sm text-muted-foreground">{p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}