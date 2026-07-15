import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import catC8 from "@/assets/cat-c8.jpg";
import catC7 from "@/assets/cat-c7.jpg";
import catC6 from "@/assets/cat-c6.jpg";
import catC5 from "@/assets/cat-c5.jpg";
import catElectronics from "@/assets/cat-electronics.jpg";
import catSafety from "@/assets/cat-safety.jpg";
import svcFab from "@/assets/svc-fab.jpg";
import build3 from "@/assets/build-3.jpg";
import build1 from "@/assets/build-1.jpg";
import build2 from "@/assets/build-2.jpg";
import heroCorvette from "@/assets/hero-corvette.jpg";
import corvetteSide from "@/assets/corvette-side.png.asset.json";
import trackside from "@/assets/trackside.jpg.asset.json";
import racePrep from "@/assets/race-prep.jpg.asset.json";
import engineering from "@/assets/engineering.jpg.asset.json";
import burnout1 from "@/assets/burnout1.jpg.asset.json";
import burnout3 from "@/assets/burnout3.jpg.asset.json";
import burnout5 from "@/assets/burnout5.jpg.asset.json";
import insideShop2 from "@/assets/inside-shop-2.png.asset.json";
import insideShop4 from "@/assets/inside-shop-4.png.asset.json";
import insideShop6 from "@/assets/inside-shop-6.png.asset.json";
import shopHero from "@/assets/shop-hero.jpg.asset.json";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Your Corvette — C5, C6, C7, C8, Z06, E-Ray · Tway Motorsports" },
      { name: "description", content: "The premier destination for Corvette performance. Shop track-tested parts by generation — C5, C6, C7, C8 Stingray, Z06 and E-Ray." },
      { property: "og:title", content: "Shop Your Corvette — Tway Motorsports" },
      { property: "og:description", content: "Track-tested Corvette parts by generation. C5 through C8 Z06 and E-Ray. Installed and validated in-house." },
    ],
  }),
  component: ShopPage,
});

// Corvette-first primary navigation
const generations = ["All Corvettes", "C5", "C6", "C7", "C8", "Z06", "E-Ray", "Universal"];

// Category (secondary) filters — how Corvette owners actually shop
const categories = ["Aero", "Suspension", "Brakes", "Wheels", "Interior", "Engine", "Exterior"];

// Generation hero cards
const genCards = [
  { key: "C5", years: "1997 – 2004", title: "C5 Corvette", blurb: "LS1 / LS6 · The proven platform.", img: catC5, count: 42 },
  { key: "C6", years: "2005 – 2013", title: "C6 Corvette", blurb: "LS2 / LS3 / LS7 · Track-day favorite.", img: catC6, count: 68 },
  { key: "C7", years: "2014 – 2019", title: "C7 Corvette", blurb: "LT1 / LT4 · Grand Sport & Z06.", img: catC7, count: 94 },
  { key: "C8", years: "2020 – Present", title: "C8 Stingray", blurb: "LT2 · Mid-engine, dialed in.", img: catC8, count: 112, featured: true },
  { key: "Z06", years: "2023 – Present", title: "C8 Z06", blurb: "LT6 flat-plane · 670 hp weapon.", img: heroCorvette, count: 47, featured: true },
  { key: "E-Ray", years: "2024 – Present", title: "C8 E-Ray", blurb: "Hybrid AWD · eAWD performance.", img: corvetteSide.url, count: 28 },
  { key: "Universal", years: "All Generations", title: "Universal Corvette", blurb: "Tools, safety & apparel.", img: engineering.url, count: 56 },
];

// Products — each carries generation compatibility + merchandising tags
const items = [
  { name: "C8 Z06 Carbon Aero Package", price: "$4,880", meta: "Aero · Carbon", img: prod3, gen: "Z06", cat: "Aero", tags: ["New Arrival", "Track Tested"] },
  { name: "Track-Spec Intake Manifold — LT4", price: "$1,895", meta: "Engine · LT4", img: prod1, gen: "C7", cat: "Engine", tags: ["Best Seller"] },
  { name: "Forged Race Wheel 18×11", price: "$1,240", meta: "Wheels · Forged", img: prod2, gen: "C7", cat: "Wheels", tags: ["Track Tested"] },
  { name: "C8 Stingray Cold Air Intake", price: "$780", meta: "Engine · LT2", img: catC8, gen: "C8", cat: "Engine", tags: ["Best Seller"] },
  { name: "C7 Adjustable Sway Bar Kit", price: "$1,120", meta: "Suspension · C7", img: catC7, gen: "C7", cat: "Suspension", tags: ["Featured"] },
  { name: "E-Ray Lowering Springs", price: "$685", meta: "Suspension · E-Ray", img: corvetteSide.url, gen: "E-Ray", cat: "Suspension", tags: ["New Arrival"] },
  { name: "C6 Z06 Big Brake Kit — 6-Piston", price: "$4,250", meta: "Brakes · 380mm", img: catC6, gen: "C6", cat: "Brakes", tags: ["Track Tested"] },
  { name: "C5 Long-Tube Headers 1⅞\"", price: "$1,780", meta: "Engine · 304 SS", img: catC5, gen: "C5", cat: "Engine", tags: ["Best Seller"] },
  { name: "C8 Carbon Fiber Splitter", price: "$2,450", meta: "Aero · Carbon", img: prod3, gen: "C8", cat: "Aero", tags: ["New Arrival"] },
  { name: "MoTeC C127 Dash Logger", price: "$4,995", meta: "Interior · Data", img: catElectronics, gen: "Universal", cat: "Interior", tags: ["Pro", "Track Tested"] },
  { name: "Stilo ST5F Carbon Helmet", price: "$1,899", meta: "Safety · SA2020", img: catSafety, gen: "Universal", cat: "Interior", tags: ["Track Tested"] },
  { name: "Track-Ready Corner Package — C7", price: "$8,450", meta: "Suspension · Full", img: build3, gen: "C7", cat: "Suspension", tags: ["Best Seller", "Pro Install"] },
  { name: "C8 Braided Brake Line Set", price: "$285", meta: "Brakes · DOT", img: prod4, gen: "C8", cat: "Brakes", tags: ["Fast Ship"] },
  { name: "Dry Sump Oil System — LT1/LT4", price: "$5,650", meta: "Engine · Endurance", img: prod1, gen: "C7", cat: "Engine", tags: ["Track Tested"] },
  { name: "Z06 Forged Wheel Set — 20/21\"", price: "$5,400", meta: "Wheels · Forged", img: prod2, gen: "Z06", cat: "Wheels", tags: ["New Arrival"] },
  { name: "C6 Racing Bucket Seat Pair", price: "$3,120", meta: "Interior · FIA", img: build2, gen: "C6", cat: "Interior", tags: ["Track Tested"] },
];

// Curated Corvette collections
const collections = [
  { title: "Most Popular C8 Upgrades", desc: "Bolt-ons the Stingray community keeps buying.", img: catC8, count: 24 },
  { title: "C7 Track Essentials", desc: "Everything the Grand Sport needs for a session.", img: build3, count: 18 },
  { title: "Best Selling C6 Parts", desc: "Tried and proven on the Z06 platform.", img: catC6, count: 21 },
  { title: "Z06 Aero Packages", desc: "Front splitters, wickers, wings — flat-plane ready.", img: prod3, count: 12 },
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
  return (
    <SiteShell>
      {/* HERO — Corvette-first */}
      <section className="relative hairline-b overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroCorvette})` }}
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {genCards.map((g) => (
            <a
              key={g.key}
              href={`#gen-${g.key}`}
              className={`group relative block overflow-hidden rounded-2xl border border-border ${g.featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}
            >
              <div className={`relative ${g.featured ? "aspect-[4/5] lg:aspect-[3/4]" : "aspect-[5/6]"} overflow-hidden bg-surface`}>
                <img
                  src={g.img}
                  alt={g.title}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.14 0.005 260) 0%, oklch(0.14 0.005 260 / 0.35) 45%, transparent 75%)",
                  }}
                />
                <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-background/70 backdrop-blur px-3 py-1 text-[10px] font-display uppercase tracking-widest">
                      {g.years}
                    </span>
                    <span className="text-[10px] font-display uppercase tracking-widest text-white/70">
                      {g.count} parts
                    </span>
                  </div>
                  <div>
                    <p className="eyebrow text-race-red">Generation · {g.key}</p>
                    <h3 className="mt-3 font-display text-2xl md:text-3xl font-semibold leading-tight">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70 leading-snug">{g.blurb}</p>
                    <div className="mt-5 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-widest text-white group-hover:text-race-red transition-colors">
                      Shop {g.key}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CORVETTE-FIRST NAV — sticky generation + category filters */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/90 backdrop-blur-xl hairline-b hairline-t">
        <div className="container-wide py-4 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="shrink-0 eyebrow text-race-red pr-2">Generation</span>
            {generations.map((f, i) => (
              <button
                key={f}
                className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-display uppercase tracking-widest border transition-colors ${
                  i === 0
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {f}
              </button>
            ))}
            <div className="ml-auto shrink-0 hidden md:flex items-center gap-3 text-xs text-muted-foreground">
              <span>{items.length} products</span>
              <span className="h-4 w-px bg-border" />
              <button className="font-display uppercase tracking-widest text-[11px] text-foreground">Sort ↓</button>
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="shrink-0 eyebrow pr-2">Category</span>
            {categories.map((c) => (
              <button
                key={c}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-display uppercase tracking-widest border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="container-wide py-16 md:py-24">
        <div className="grid gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <Link key={p.name} to="/product" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                <span className="absolute top-4 left-4 rounded-full bg-race-red/90 text-background backdrop-blur px-3 py-1 text-[10px] font-display uppercase tracking-widest">
                  {p.gen}
                </span>
                {p.tags?.[0] && (
                  <span className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[10px] font-display uppercase tracking-widest">
                    {p.tags[0]}
                  </span>
                )}
              </div>
              <div className="mt-5 grid grid-cols-[1fr_auto] gap-4 items-start">
                <div className="min-w-0">
                  <p className="eyebrow">{p.meta}</p>
                  <h3 className="mt-2 font-display text-base font-medium leading-snug truncate">{p.name}</h3>
                </div>
                <span className="font-display text-sm text-muted-foreground shrink-0">{p.price}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-4">
          <button className="btn-ghost">Load More</button>
          <p className="text-xs text-muted-foreground">Showing {items.length} of 447 Corvette parts</p>
        </div>
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
              <a key={c.title} href="#" className="group relative block overflow-hidden rounded-2xl border border-border bg-background">
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
              </a>
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