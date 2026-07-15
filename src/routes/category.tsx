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
import build2 from "@/assets/build-2.jpg";
import build3 from "@/assets/build-3.jpg";
import heroCorvette from "@/assets/hero-corvette.jpg";
import corvetteSide from "@/assets/corvette-side.png.asset.json";

export const Route = createFileRoute("/category")({
  head: () => ({
    meta: [
      { title: "C8 Corvette Performance Parts — Tway Motorsports" },
      { name: "description", content: "Track-tested C8 Corvette parts — aero, suspension, brakes, wheels, engine and interior upgrades." },
      { property: "og:title", content: "C8 Corvette Performance Parts — Tway Motorsports" },
      { property: "og:description", content: "Track-tested C8 Corvette parts, engineered and validated in-house." },
    ],
  }),
  component: CategoryPage,
});

const generations = ["All Corvettes", "C5", "C6", "C7", "C8", "Z06", "E-Ray", "Universal"];
const categories = ["All", "Aero", "Suspension", "Brakes", "Wheels", "Interior", "Engine", "Exterior"];
const sortOptions = ["Featured", "Best Sellers", "Newest", "Price ↑", "Price ↓"];

const items = [
  { name: "C8 Z06 Carbon Aero Package", price: "$4,880", meta: "Aero · Carbon", img: prod3, gen: "Z06", tag: "New Arrival" },
  { name: "C8 Stingray Cold Air Intake", price: "$780", meta: "Engine · LT2", img: catC8, gen: "C8", tag: "Best Seller" },
  { name: "C8 Carbon Fiber Splitter", price: "$2,450", meta: "Aero · Carbon", img: prod3, gen: "C8", tag: "New" },
  { name: "C8 Braided Brake Line Set", price: "$285", meta: "Brakes · DOT", img: prod4, gen: "C8", tag: "Fast Ship" },
  { name: "Z06 Forged Wheel Set — 20/21\"", price: "$5,400", meta: "Wheels · Forged", img: prod2, gen: "Z06", tag: "New Arrival" },
  { name: "C7 Adjustable Sway Bar Kit", price: "$1,120", meta: "Suspension · C7", img: catC7, gen: "C7", tag: "Featured" },
  { name: "Track-Ready Corner Package — C7", price: "$8,450", meta: "Suspension · Full", img: build3, gen: "C7", tag: "Best Seller" },
  { name: "Track-Spec Intake Manifold — LT4", price: "$1,895", meta: "Engine · LT4", img: prod1, gen: "C7", tag: "Best Seller" },
  { name: "C6 Z06 Big Brake Kit — 6-Piston", price: "$4,250", meta: "Brakes · 380mm", img: catC6, gen: "C6", tag: "Track Tested" },
  { name: "C6 Racing Bucket Seat Pair", price: "$3,120", meta: "Interior · FIA", img: build2, gen: "C6" },
  { name: "C5 Long-Tube Headers 1⅞\"", price: "$1,780", meta: "Engine · 304 SS", img: catC5, gen: "C5", tag: "Best Seller" },
  { name: "E-Ray Lowering Springs", price: "$685", meta: "Suspension · E-Ray", img: corvetteSide.url, gen: "E-Ray", tag: "New Arrival" },
  { name: "MoTeC C127 Dash Logger", price: "$4,995", meta: "Interior · Data", img: catElectronics, gen: "Universal", tag: "Pro" },
  { name: "Stilo ST5F Carbon Helmet", price: "$1,899", meta: "Safety · SA2020", img: catSafety, gen: "Universal", tag: "Track Tested" },
  { name: "Forged Race Wheel 18×11", price: "$1,240", meta: "Wheels · Forged", img: prod2, gen: "C7", tag: "Track Tested" },
  { name: "Dry Sump Oil System — LT1/LT4", price: "$5,650", meta: "Engine · Endurance", img: prod1, gen: "C7", tag: "Track Tested" },
];

function CategoryPage() {
  return (
    <SiteShell>
      {/* HERO */}
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
              "linear-gradient(to bottom, oklch(0.14 0.005 260 / 0.35) 0%, oklch(0.14 0.005 260 / 0.6) 55%, oklch(0.14 0.005 260) 100%)",
          }}
          aria-hidden
        />
        <div className="relative container-wide pt-20 md:pt-24 pb-16 md:pb-20">
          <div className="flex items-center gap-2 text-[11px] font-display uppercase tracking-widest text-muted-foreground">
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-foreground">C8 Corvette</span>
          </div>
          <Eyebrow accent className="mt-6">Generation · 2020 – Present</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight max-w-4xl">
            C8 Corvette<br /><span className="text-muted-foreground">Performance parts.</span>
          </h1>
          <p className="mt-6 max-w-lg text-muted-foreground leading-relaxed">
            Every C8 upgrade in our catalog — from cold-air intakes and long-tube headers to carbon aero, coilovers and forged wheels. Mounted, mapped and validated on our own cars.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/90 backdrop-blur-xl hairline-b">
        <div className="container-wide py-4 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="shrink-0 eyebrow text-race-red pr-2">Generation</span>
            {generations.map((f, i) => (
              <Link
                key={f}
                to="/category"
                className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-display uppercase tracking-widest border transition-colors ${
                  i === 4
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {f}
              </Link>
            ))}
            <div className="ml-auto shrink-0 hidden md:flex items-center gap-3 text-xs text-muted-foreground">
              <span>{items.length} products</span>
              <span className="h-4 w-px bg-border" />
              <button className="font-display uppercase tracking-widest text-[11px] text-foreground">Sort ↓</button>
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="shrink-0 eyebrow pr-2">Category</span>
            {categories.map((c, i) => (
              <Link
                key={c}
                to="/category"
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-display uppercase tracking-widest border transition-colors ${
                  i === 0
                    ? "bg-foreground text-background border-foreground"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="container-wide py-16 md:py-20">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <Eyebrow>Showing all C8 parts</Eyebrow>
            <h2 className="mt-4 font-display text-2xl md:text-3xl font-semibold">
              {items.length} products
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {sortOptions.map((s, i) => (
              <button
                key={s}
                className={`rounded-full px-3.5 py-1.5 text-[11px] font-display uppercase tracking-widest border transition-colors ${
                  i === 0
                    ? "border-foreground text-foreground"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <Link key={p.name} to="/product" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 rounded-full bg-race-red/90 text-background backdrop-blur px-3 py-1 text-[10px] font-display uppercase tracking-widest">
                  {p.gen}
                </span>
                {p.tag && (
                  <span className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[10px] font-display uppercase tracking-widest">
                    {p.tag}
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
          <p className="text-xs text-muted-foreground">Showing {items.length} of 112 C8 parts</p>
        </div>
      </section>

      {/* CTA */}
      <section className="hairline-t">
        <div className="container-wide py-16 md:py-20 grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
          <div>
            <Eyebrow accent>Not sure what fits?</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl font-semibold leading-[0.95] tracking-tight">
              Talk to a C8 specialist.
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