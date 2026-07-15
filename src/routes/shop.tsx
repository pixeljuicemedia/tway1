import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import catC8 from "@/assets/cat-c8.jpg";
import catC7 from "@/assets/cat-c7.jpg";
import catElectronics from "@/assets/cat-electronics.jpg";
import catSafety from "@/assets/cat-safety.jpg";
import svcFab from "@/assets/svc-fab.jpg";
import build3 from "@/assets/build-3.jpg";
import shopHero from "@/assets/shop-hero.jpg.asset.json";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Performance Parts · Tway Motorsports" },
      { name: "description", content: "Track-tested performance parts for C5, C6, C7 and C8 Corvettes. Fabrication, drivetrain, aero, electronics and safety equipment." },
      { property: "og:title", content: "Shop Performance Parts — Tway Motorsports" },
      { property: "og:description", content: "Track-tested Corvette performance parts. Fabrication, drivetrain, aero, electronics and safety." },
    ],
  }),
  component: ShopPage,
});

const filters = ["All", "C8", "C7", "C6", "C5", "Drivetrain", "Aero", "Suspension", "Brakes", "Safety", "Electronics"];

const items = [
  { name: "Track-Spec Intake Manifold", price: "$1,895", meta: "Intake · LT4", img: prod1, tag: "Best Seller" },
  { name: "Forged Race Wheel 18×11", price: "$1,240", meta: "Wheel · Forged", img: prod2 },
  { name: "Carbon Front Splitter — C7", price: "$2,450", meta: "Aero · Carbon", img: prod3, tag: "New" },
  { name: "Long-Tube Headers 1⅞\"", price: "$1,780", meta: "Exhaust · 304 SS", img: prod4 },
  { name: "C8 Cold Air Intake", price: "$780", meta: "Intake · C8", img: catC8 },
  { name: "C7 Adjustable Sway Bar Kit", price: "$1,120", meta: "Suspension · C7", img: catC7 },
  { name: "MoTeC C127 Dash Logger", price: "$4,995", meta: "Electronics · Data", img: catElectronics, tag: "Pro" },
  { name: "Stilo ST5F Carbon Helmet", price: "$1,899", meta: "Safety · SA2020", img: catSafety },
  { name: "Custom Cage Fabrication", price: "From $6,800", meta: "Fabrication", img: svcFab, tag: "Made-to-Order" },
  { name: "Track-Ready Corner Package", price: "$8,450", meta: "Suspension · Full", img: build3 },
  { name: "Braided Brake Line Set", price: "$285", meta: "Brakes · DOT", img: prod4 },
  { name: "Dry Sump Oil System — LT", price: "$5,650", meta: "Engine · Endurance", img: prod1 },
];

function ShopPage() {
  return (
    <SiteShell>
      {/* HERO */}
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
              "linear-gradient(to bottom, oklch(0.14 0.005 260 / 0.2) 0%, oklch(0.14 0.005 260 / 0.4) 60%, oklch(0.14 0.005 260) 100%)",
          }}
          aria-hidden
        />
        <div className="relative container-wide pt-20 md:pt-28 pb-16 md:pb-20 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-end">
          <div>
            <Eyebrow accent>Collection · Performance Parts</Eyebrow>
            <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
              The catalog.<br /><span className="text-muted-foreground">Track approved.</span>
            </h1>
          </div>
          <p className="max-w-md text-muted-foreground leading-relaxed">
            Every part on this page has been mounted, mapped, run through a session and validated by our engineers before we listed it. If it's not on the shelf, we didn't trust it.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/85 backdrop-blur-xl hairline-b">
        <div className="container-wide py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-display uppercase tracking-widest border transition-colors ${
                i === 0 ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
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
      </section>

      {/* GRID */}
      <section className="container-wide py-16 md:py-24">
        <div className="grid gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <Link key={p.name} to="/product" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                {p.tag && (
                  <span className="absolute top-4 left-4 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[10px] font-display uppercase tracking-widest">
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
          <p className="text-xs text-muted-foreground">Showing 12 of 148 products</p>
        </div>
      </section>
    </SiteShell>
  );
}