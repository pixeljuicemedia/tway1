import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import burnout1 from "@/assets/burnout1.jpg.asset.json";
import burnout2 from "@/assets/burnout2.jpg.asset.json";
import burnout3 from "@/assets/burnout3.jpg.asset.json";
import burnout4 from "@/assets/burnout4.jpg.asset.json";
import burnout5 from "@/assets/burnout5.jpg.asset.json";
import burnout6 from "@/assets/burnout6.jpg.asset.json";
const burnoutFrames = [burnout1, burnout2, burnout3, burnout4, burnout5, burnout6];
const CROSSFADE_CYCLE_S = 18;
import twayLogoDark from "@/assets/tway-logo-dark.png.asset.json";
import catC8 from "@/assets/cat-c8.jpg";
import catC7 from "@/assets/cat-c7.jpg";
import catC6 from "@/assets/cat-c6.jpg";
import catC5 from "@/assets/cat-c5.jpg";
import catSafety from "@/assets/cat-safety.jpg";
import catElectronics from "@/assets/cat-electronics.jpg";
import svcFab from "@/assets/svc-fab.jpg";
import svcDyno from "@/assets/svc-dyno.jpg";
import svcEngine from "@/assets/svc-engine.jpg";
import build1 from "@/assets/build-1.jpg";
import build2 from "@/assets/build-2.jpg";
import build3 from "@/assets/build-3.jpg";
import prod1 from "@/assets/prod-1.jpg";
import prod2 from "@/assets/prod-2.jpg";
import prod3 from "@/assets/prod-3.jpg";
import prod4 from "@/assets/prod-4.jpg";
import whyTrack from "@/assets/why-track.jpg";
import userShop from "@/assets/tway-user-photo.jpg";
import social1 from "@/assets/social-1.jpg";
import social2 from "@/assets/social-2.jpg";
import social3 from "@/assets/social-3.jpg";
import social4 from "@/assets/social-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tway Motorsports — Performance Parts, Track-Proven. Shop Now." },
      { name: "description", content: "Shop track-tested performance parts, aero, suspension, brakes and drivetrain — plus professional installation from a 20+ year race shop." },
      { property: "og:title", content: "Tway Motorsports — Performance Parts, Track-Proven. Shop Now." },
      { property: "og:description", content: "Shop track-tested performance parts, aero, suspension, brakes and drivetrain — plus professional installation from a 20+ year race shop." },
    ],
  }),
  component: Index,
});

// -----------------------------------------------------------------------------
// Data — conversion-focused homepage. Content lives here so the JSX stays clean.
// -----------------------------------------------------------------------------

const featuredProducts = [
  { name: "Track-Spec Intake Manifold", price: "$1,895", meta: "Intake · LT4 / LT2", img: prod1, badge: "Best Seller", rating: 5 },
  { name: "Forged Race Wheel 18×11", price: "$1,240", meta: "Wheel · Forged", img: prod2, badge: "In Stock", rating: 5 },
  { name: "Carbon Front Splitter — C7", price: "$2,450", meta: "Aero · Carbon", img: prod3, badge: "New Arrival", rating: 5 },
  { name: "Long-Tube Headers 1⅞\"", price: "$1,780", meta: "Exhaust · 304 SS", img: prod4, badge: "Ships Today", rating: 5 },
];

const productCategories: { title: string; img: string; count: string }[] = [
  { title: "Aero",              img: build2,         count: "48 products" },
  { title: "Suspension",        img: catC7,          count: "62 products" },
  { title: "Brakes",            img: catC6,          count: "37 products" },
  { title: "Drivetrain",        img: svcEngine,      count: "54 products" },
  { title: "Safety",            img: catSafety,      count: "29 products" },
  { title: "Wheels",            img: prod2,          count: "41 products" },
  { title: "Engine Performance", img: svcDyno,       count: "76 products" },
];

const bestSellers = [
  { name: "C8 Cold Air Intake",         price: "$780",   meta: "C8 · Intake",        img: catC8,   rating: 5, badge: "Best Seller" },
  { name: "Track-Ready Corner Package", price: "$8,450", meta: "Suspension · Full",  img: build3,  rating: 5, badge: "Popular" },
  { name: "MoTeC C127 Dash Logger",     price: "$4,995", meta: "Electronics · Data", img: catElectronics, rating: 5, badge: "Pro" },
  { name: "Stilo ST5F Carbon Helmet",   price: "$1,899", meta: "Safety · SA2020",    img: catSafety, rating: 5, badge: "Popular" },
];


const whyCards = [
  { big: "20+", label: "Years Experience" },
  { big: "★",   label: "Track Tested" },
  { big: "⚙",   label: "Professional Installation" },
  { big: "◆",   label: "Engineering Expertise" },
  { big: "▲",   label: "Race Proven" },
  { big: "●",   label: "Performance Focused" },
];

const recentBuilds = [
  { title: "Porsche GT3 · Roll Cage",           tag: "Fabrication",    img: build1 },
  { title: "GR Corolla · Suspension Overhaul",  tag: "Suspension",     img: build3 },
  { title: "Civic Type R · Brake Upgrade",      tag: "Brakes",         img: userShop },
  { title: "BMW G87 · Aero Package",            tag: "Aero",           img: build2 },
];

const testimonials = [
  { rating: 5, name: "Marcus Reilly",  vehicle: "C7 Z06",         quote: "Championship-winning engine build. Two seasons, zero rebuilds." },
  { rating: 5, name: "Elena Vasquez",  vehicle: "TA2 Camaro",     quote: "Fabrication is OEM-grade. Every weld, every bracket, dialed." },
  { rating: 5, name: "Derek Chen",     vehicle: "GT4 Corvette",   quote: "Trackside at 6am, in the pit box by qualifying. Real racers." },
];

const instagramPosts: { url: string; img: string }[] = [
  { url: "https://www.instagram.com/p/DZLgP7NknMk/?img_index=1", img: social1 },
  { url: "https://www.instagram.com/p/DYP_6aaj_c1/?img_index=1", img: social2 },
  { url: "https://www.instagram.com/p/C7IlpECu9SG/",             img: social3 },
  { url: "https://www.instagram.com/p/C7uquXeyxmP/?img_index=1", img: social4 },
  { url: "https://www.instagram.com/p/CyyPbH-riUn/?img_index=1", img: whyTrack },
  { url: "https://www.instagram.com/p/CyoTg3EPxTY/?img_index=1", img: build1 },
];

const stats = [
  ["20+",       "Years Experience"],
  ["500+",      "Track Cars Built"],
  ["10,000+",   "Parts Installed"],
  ["100%",      "Performance Focused"],
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-race-red text-xs tracking-widest" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden>{i < n ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[10px] font-display uppercase tracking-widest text-foreground border border-white/10">
      {children}
    </span>
  );
}

const brandLogos: { name: string; domain: string }[] = [
  { name: "Brembo",      domain: "brembo.com" },
  { name: "Sparco",      domain: "sparco.com" },
  { name: "Recaro",      domain: "recaro-automotive.com" },
  { name: "Öhlins",      domain: "ohlins.com" },
  { name: "Motul",       domain: "motul.com" },
  { name: "AP Racing",   domain: "apracing.com" },
  { name: "HKS",         domain: "hks-power.co.jp" },
  { name: "Momo",        domain: "momo.com" },
  { name: "KW",          domain: "kwsuspensions.com" },
  { name: "Bilstein",    domain: "bilstein.com" },
];

function BrandStrip() {
  const token = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY as string | undefined;
  return (
    <section className="hairline-b bg-background">
      <div className="container-wide py-8 md:py-10">
        <p className="eyebrow text-center text-muted-foreground/80">Brands We Install · Track-Proven</p>
        <div className="mt-6 flex flex-nowrap items-center justify-between gap-x-4 md:gap-x-6 overflow-x-auto no-scrollbar">
          {brandLogos.map((b) => (
            <a
              key={b.name}
              href="/shop"
              aria-label={`Shop ${b.name}`}
              className="group opacity-80 hover:opacity-100 transition-opacity shrink-0"
              title={b.name}
            >
              {token ? (
                <img
                  src={`https://img.logo.dev/${b.domain}?token=${token}&format=png&size=400&retina=true`}
                  alt={`${b.name} logo`}
                  loading="lazy"
                  className="h-16 md:h-20 w-auto object-contain"
                />
              ) : (
                <span className="font-display text-sm md:text-base font-semibold tracking-tight text-white/85">
                  {b.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <SiteShell>
      {/* ============================================================
          1 · HERO — conversion-focused messaging, shop-first CTAs
         ============================================================ */}
      <section className="relative isolate min-h-screen -mt-24 md:-mt-28 flex items-start md:items-end overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-background" />
        {burnoutFrames.map((frame, i) => (
          <img
            key={frame.url}
            src={frame.url}
            alt={i === 0 ? "Corvette on-track kicking up tire smoke" : ""}
            className="hero-crossfade-slide absolute inset-0 h-full w-full object-contain md:object-cover object-center"
            style={{ animationDelay: `${(-CROSSFADE_CYCLE_S / burnoutFrames.length) * i}s` }}
            width={1920}
            height={1280}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/10 to-transparent" />

        <div className="relative container-wide pt-24 pb-24 md:pt-40 md:pb-32 w-full min-h-screen md:min-h-0 flex flex-col md:block">
          <div className="max-w-3xl flex flex-col items-center text-center md:items-start md:text-left mx-auto md:mx-0">
            <img src={twayLogoDark.url} alt="Tway Motorsports" className="w-[clamp(14rem,32vw,28rem)] h-auto" />
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <Badge>Performance Parts</Badge>
              <Badge>Track-Proven</Badge>
              <Badge>Pro Installation</Badge>
            </div>
            <h1 className="mt-6 font-display tracking-tight text-white text-[clamp(2rem,4.5vw,4rem)] leading-[0.95] font-medium">
              Race-Proven Parts.<br />
              <span className="font-bold">Ready to Ship.</span>
            </h1>
          </div>
          <div className="max-w-3xl mt-auto md:mt-0 flex flex-col items-center text-center md:items-start md:text-left mx-auto md:mx-0">
            <p className="mt-8 max-w-xl text-base md:text-lg text-white font-semibold leading-relaxed">
              Aero, suspension, brakes and drivetrain — engineered, installed and validated by a shop that races every weekend.
            </p>

            {/* Prominent search — vehicle / brand / part number */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 w-full max-w-xl flex items-center rounded-lg bg-background/70 backdrop-blur-xl border border-white/15 shadow-lg shadow-black/30 h-12 md:h-14 pl-4 pr-2"
              role="search"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-white/70 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search by vehicle, brand, part name or number…"
                className="flex-1 bg-transparent px-3 text-sm md:text-base text-white placeholder:text-white/60 focus:outline-none"
              />
              <button type="submit" className="h-9 md:h-10 rounded-md bg-foreground text-background px-4 font-display text-[11px] uppercase tracking-[0.18em] hover:bg-race-red hover:text-foreground transition-colors">
                Search
              </button>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link to="/shop" className="btn-primary">Shop Performance Parts</Link>
              <Link to="/services" className="btn-ghost">Book Services →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          1b · BRAND LOGO STRIP — trusted names, right below the hero
         ============================================================ */}
      <BrandStrip />

      {/* ============================================================
          2 · FEATURED PRODUCTS — real cards above the fold
         ============================================================ */}
      <section className="hairline-t">
        <div className="container-wide py-20 md:py-28">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] items-end">
            <div>
              <Eyebrow accent>Featured Products</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02]">Shop what wins races.</h2>
            </div>
            <Link to="/shop" className="btn-ghost">View All Products →</Link>
          </div>

          <div className="mt-14 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <div key={p.name} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
                  <Link to="/product" className="absolute inset-0 block" aria-label={p.name}>
                    <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  </Link>
                  <span className="absolute top-4 left-4 pointer-events-none"><Badge>{p.badge}</Badge></span>
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex gap-2">
                      <button type="button" className="flex-1 h-10 rounded-md bg-foreground text-background font-display text-[11px] uppercase tracking-[0.18em] hover:bg-race-red hover:text-foreground transition-colors">Quick Add</button>
                      <Link to="/product" className="h-10 px-3 grid place-items-center rounded-md border border-white/20 bg-background/70 backdrop-blur font-display text-[11px] uppercase tracking-[0.18em] text-white hover:border-race-red transition-colors">View</Link>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Stars n={p.rating} />
                  <p className="mt-2 eyebrow">{p.meta}</p>
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-medium leading-snug">{p.name}</h3>
                    <span className="font-display text-sm text-muted-foreground shrink-0">{p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3 · PRODUCT CATEGORIES — bold "movie poster" cards
         ============================================================ */}
      <section className="hairline-t bg-carbon-texture">
        <div className="container-wide py-24 md:py-32">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] items-end">
            <div>
              <Eyebrow>Shop by Category</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-2xl">Pick your platform. Pick your podium.</h2>
            </div>
            <Link to="/shop" className="btn-ghost">Full Catalog →</Link>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {productCategories.map((c, i) => (
              <Link
                to="/shop"
                key={c.title}
                className={`group relative overflow-hidden rounded-xl bg-surface ${i === 0 ? "col-span-2 row-span-2 aspect-[4/5] md:aspect-auto" : "aspect-[3/4]"} transition-transform duration-500 hover:scale-[1.015]`}
              >
                <img src={c.img} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <p className="eyebrow">{c.count}</p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold leading-tight">{c.title}</h3>
                  <div className="mt-3 flex items-center gap-2 text-xs font-display uppercase tracking-widest text-muted-foreground group-hover:text-race-red transition-colors">
                    Shop {c.title} <span aria-hidden>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          4 · BEST SELLERS
         ============================================================ */}
      <section className="hairline-t">
        <div className="container-wide py-20 md:py-28">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] items-end">
            <div>
              <Eyebrow accent>Best Sellers</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02]">What our customers keep buying.</h2>
            </div>
            <Link to="/shop" className="btn-ghost">Shop Best Sellers →</Link>
          </div>

          <div className="mt-14 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((p) => (
              <div key={p.name} className="group flex flex-col">
                <Link to="/product" className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface block">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  <span className="absolute top-4 left-4"><Badge>{p.badge}</Badge></span>
                </Link>
                <div className="mt-4">
                  <Stars n={p.rating} />
                  <p className="mt-2 eyebrow">{p.meta}</p>
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-medium leading-snug">{p.name}</h3>
                    <span className="font-display text-sm text-muted-foreground shrink-0">{p.price}</span>
                  </div>
                  <Link to="/product" className="mt-4 inline-flex h-9 items-center rounded-md border border-white/15 px-3 font-display text-[11px] uppercase tracking-[0.18em] text-foreground hover:border-race-red hover:text-race-red transition-colors">
                    Quick Shop →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          6 · WHY TWAY — scannable trust icon cards
         ============================================================ */}
      <section className="hairline-t">
        <div className="container-wide py-24 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow accent className="justify-center">Why Tway</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02]">Built by racers. Trusted by builders.</h2>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {whyCards.map((c) => (
              <div key={c.label} className="card-glass p-6 md:p-7 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="font-display text-3xl md:text-4xl font-semibold text-race-red">{c.big}</div>
                <div className="mt-3 eyebrow leading-tight">{c.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map(([big, label]) => (
              <div key={label} className="border border-hairline rounded-xl p-6 md:p-8 text-center">
                <div className="font-display text-4xl md:text-5xl font-semibold tracking-tight">{big}</div>
                <div className="mt-2 eyebrow">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          7 · RECENT BUILDS
         ============================================================ */}
      <section className="hairline-t bg-carbon-texture">
        <div className="container-wide py-24 md:py-32">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] items-end">
            <div>
              <Eyebrow>Recent Builds</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-2xl">Real cars. Real customers. Real results.</h2>
            </div>
            <Link to="/about" className="btn-ghost">See the Shop →</Link>
          </div>

          <div className="mt-14 grid gap-6 md:gap-8 md:grid-cols-2">
            {recentBuilds.map((b) => (
              <Link key={b.title} to="/product" className="group relative overflow-hidden rounded-xl bg-surface aspect-[16/10]">
                <img src={b.img} alt={b.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <p className="eyebrow">{b.tag}</p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold">{b.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          8 · SERVICES — teaser strip
         ============================================================ */}
      <section className="hairline-t">
        <div className="container-wide py-20 md:py-28 grid gap-10 lg:grid-cols-[1fr_1.2fr] items-center">
          <div>
            <Eyebrow accent>Professional Installation</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-[1.05] max-w-lg">
              Don't just buy the part. <span className="text-muted-foreground">Have it installed right.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground leading-relaxed">
              Fabrication, dyno tuning, engine builds and trackside support — all done in-house by the team that races your platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className="btn-primary">Book Services</Link>
              <Link to="/contact" className="btn-ghost">Request a Quote →</Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { img: svcFab,    label: "Fabrication" },
              { img: svcDyno,   label: "Dyno Tuning" },
              { img: svcEngine, label: "Engine Builds" },
            ].map((s) => (
              <Link key={s.label} to="/services" className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-surface">
                <img src={s.img} alt={s.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="font-display text-sm md:text-base font-semibold">{s.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          9 · TESTIMONIALS — compact and scannable
         ============================================================ */}
      <section className="hairline-t bg-carbon-texture">
        <div className="container-wide py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow className="justify-center">Customer Reviews</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-[1.05]">The paddock talks. We listen.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card-glass p-6 md:p-8 flex flex-col">
                <Stars n={t.rating} />
                <blockquote className="mt-4 font-display text-base md:text-lg leading-snug">"{t.quote}"</blockquote>
                <figcaption className="mt-6 pt-4 border-t border-hairline">
                  <div className="font-display font-medium text-sm">{t.name}</div>
                  <div className="eyebrow mt-1">{t.vehicle}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          10 · INSTAGRAM FEED
         ============================================================ */}
      <section className="hairline-t">
        <div className="container-wide py-20 md:py-28">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] items-end">
            <div>
              <Eyebrow>@tway.motorsports</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-[1.05]">From the shop floor.</h2>
            </div>
            <a href="https://www.instagram.com/twaymotorsports/" target="_blank" rel="noopener noreferrer" className="btn-ghost">Follow on Instagram →</a>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {instagramPosts.map((p, i) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram post ${i + 1}`}
                className="relative aspect-square overflow-hidden rounded-lg bg-surface group"
              >
                <img
                  src={p.img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors grid place-items-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity font-display text-[11px] uppercase tracking-widest text-white">
                    View Post →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          11 · FINAL CTA — shopping-focused
         ============================================================ */}
      <section className="relative overflow-hidden">
        <img src={build3} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="relative container-wide py-28 md:py-40 text-center">
          <Eyebrow accent className="justify-center">Ready?</Eyebrow>
          <h2 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] max-w-4xl mx-auto">
            Ready to Upgrade<br />Your Build?
          </h2>
          <p className="mt-6 max-w-lg mx-auto text-muted-foreground">
            Start with the parts that make the biggest difference — or let our team spec the whole package.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="btn-primary">Shop All Products</Link>
            <Link to="/shop" className="btn-ghost">Shop Suspension →</Link>
            <Link to="/shop" className="btn-ghost">Shop Aero →</Link>
            <Link to="/shop" className="btn-ghost">Shop Brakes →</Link>
            <Link to="/services" className="btn-ghost">Book Installation →</Link>
          </div>
        </div>
      </section>

      {/* Sticky mobile bottom nav — Shop / Services / Call */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-hairline bg-background/90 backdrop-blur-xl">
        <div className="grid grid-cols-3">
          <Link to="/shop" className="flex flex-col items-center justify-center gap-1 py-3 font-display text-[11px] uppercase tracking-widest text-foreground active:bg-white/5">
            <span aria-hidden className="text-base">🛒</span> Shop
          </Link>
          <Link to="/services" className="flex flex-col items-center justify-center gap-1 py-3 font-display text-[11px] uppercase tracking-widest text-foreground active:bg-white/5 border-x border-hairline">
            <span aria-hidden className="text-base">🔧</span> Services
          </Link>
          <a href="tel:+17144101820" className="flex flex-col items-center justify-center gap-1 py-3 font-display text-[11px] uppercase tracking-widest text-race-red active:bg-white/5">
            <span aria-hidden className="text-base">📞</span> Call
          </a>
        </div>
      </div>
      {/* spacer so content isn't hidden behind sticky mobile nav */}
      <div className="md:hidden h-16" aria-hidden />
    </SiteShell>
  );
}

