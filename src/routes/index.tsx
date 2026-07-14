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
      { title: "Tway Motorsports — Race-Proven Performance. Built by Racers." },
      { name: "description", content: "Family-owned Corvette race shop. 25+ years of engineering, fabrication, dyno tuning and trackside support. Real racing experience — no theory." },
      { property: "og:title", content: "Tway Motorsports — Race-Proven Performance. Built by Racers." },
      { property: "og:description", content: "Family-owned Corvette race shop. 25+ years of engineering, fabrication, dyno tuning and trackside support. Real racing experience — no theory." },
    ],
  }),
  component: Index,
});

const categories = [
  { title: "C8 Corvette", meta: "Mid-Engine Era", img: catC8 },
  { title: "C7 Corvette", meta: "Stingray · Z06 · ZR1", img: catC7 },
  { title: "C6 Corvette", meta: "Z06 · ZR1 · Grand Sport", img: catC6 },
  { title: "C5 Corvette", meta: "The Track Weapon", img: catC5 },
  { title: "Safety Equipment", meta: "SFI · FIA · SA2020", img: catSafety },
];

const services = [
  {
    n: "01",
    title: "Custom Fabrication",
    desc: "TIG-welded stainless headers, roll cages, splitters and one-off race components. If it doesn't exist, we build it.",
    img: svcFab,
  },
  {
    n: "02",
    title: "Dyno Tuning",
    desc: "In-house Mustang chassis dyno. Every calibration is validated with data before it leaves the building.",
    img: svcDyno,
  },
  {
    n: "03",
    title: "Race Engine Building",
    desc: "Blueprinted LT and LS assemblies with balanced rotating assemblies and CNC-ported heads.",
    img: svcEngine,
  },
];

const products = [
  { name: "Track-Spec Intake Manifold", price: "$1,895", meta: "Billet · LT4 / LT2", img: prod1 },
  { name: "Forged Race Wheel — 18×11", price: "$1,240", meta: "Track weight · gunmetal", img: prod2 },
  { name: "Carbon Front Splitter", price: "$2,450", meta: "C7 · pre-preg carbon", img: prod3 },
  { name: "Long-Tube Headers", price: "$1,780", meta: "1⅞\" 304 stainless", img: prod4 },
];

const testimonials = [
  { quote: "Tway built the engine that carried us to the class championship. Two full seasons, zero rebuilds.", name: "Marcus Reilly", role: "SCCA T1 · Corvette Racing" },
  { quote: "Their fabrication is on another level. Every weld, every bracket — done like an OEM.", name: "Elena Vasquez", role: "Trans Am · TA2 Team Principal" },
  { quote: "You call, they answer. Trackside at 6am, in the pit box by qualifying. That's who they are.", name: "Derek Chen", role: "GT4 America · Bronze Driver" },
];

function Index() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative isolate min-h-screen -mt-24 md:-mt-28 flex items-start md:items-end overflow-hidden">
        {/* Crossfading burnout frames — continuous smoke animation via image sequence */}
        <div aria-hidden className="absolute inset-0 bg-background" />
        {burnoutFrames.map((frame, i) => (
          <img
            key={frame.url}
            src={frame.url}
            alt={i === 0 ? "Black Corvette head-on doing a burnout with smoke filling the frame" : ""}
            className="hero-crossfade-slide absolute inset-0 h-full w-full object-cover"
            style={{ animationDelay: `${(-CROSSFADE_CYCLE_S / burnoutFrames.length) * i}s` }}
            width={1920}
            height={1280}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        {/* Subtle overlays — reduced for a punchier hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent" />

        <div className="relative container-wide pt-24 pb-20 md:pt-40 md:pb-28 lg:pb-32 w-full min-h-screen md:min-h-0 flex flex-col md:block">
          <div className="max-w-3xl flex flex-col items-center text-center md:items-start md:text-left mx-auto md:mx-0">
            <img
              src={twayLogoDark.url}
              alt="Tway Motorsports"
              className="w-[clamp(16rem,38vw,32rem)] h-auto"
            />
            <h1 className="mt-8 font-display tracking-tight text-white text-[clamp(2rem,4.5vw,4rem)] leading-[0.95] font-medium">
              Race-Proven<br />Performance.<br />
              <span className="font-bold">Built by racers.</span>
            </h1>
          </div>
          <div className="max-w-3xl mt-auto md:mt-0 flex flex-col items-center text-center md:items-start md:text-left mx-auto md:mx-0">
            <p className="mt-8 max-w-xl text-base md:text-lg text-white font-semibold leading-relaxed">
              Real racing experience. Professional engineering. Premium performance parts,
              custom fabrication and trackside support — all under one roof.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link to="/shop" className="btn-primary">Shop Performance Parts</Link>
              <Link to="/services" className="btn-ghost">Explore Services →</Link>
            </div>
          </div>
        </div>

        {/* Corner metadata */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 hidden md:flex flex-col items-end gap-2 text-right">
          <span className="eyebrow">Feature Build · N°07</span>
          <span className="font-display text-xs text-muted-foreground">C7 · Twin-Turbo · 1,140 whp</span>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="hairline-b">
        <div className="container-wide py-10 md:py-14 grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6">
          {[
            ["25+", "Years Racing"],
            ["100%", "Family Owned"],
            ["Authorized", "Race Shop"],
            ["Track", "Tested Parts"],
            ["Engineering", "Driven"],
          ].map(([big, label]) => (
            <div key={label} className="flex flex-col items-start md:items-center text-left md:text-center">
              <div className="font-display text-2xl md:text-3xl font-semibold tracking-tight">{big}</div>
              <div className="mt-2 eyebrow">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="container-wide py-24 md:py-36">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_auto] items-end">
          <div>
            <Eyebrow>01 · Shop by Platform</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-2xl">
              Parts built around the car — not the catalog.
            </h2>
          </div>
          <Link to="/shop" className="btn-ghost">View Full Catalog →</Link>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((c) => (
            <Link
              to="/shop"
              key={c.title}
              className="group relative overflow-hidden rounded-xl bg-surface aspect-[3/4]"
            >
              <img
                src={c.img}
                alt={c.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <p className="eyebrow">{c.meta}</p>
                <h3 className="mt-3 font-display text-2xl md:text-3xl font-semibold">{c.title}</h3>
                <div className="mt-4 flex items-center gap-2 text-xs font-display uppercase tracking-widest text-muted-foreground group-hover:text-race-red transition-colors">
                  Explore <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
          <Link
            to="/shop"
            className="group relative overflow-hidden rounded-xl bg-surface aspect-[3/4]"
          >
            <img
              src={catElectronics}
              alt="Motorsport electronics"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <p className="eyebrow">Data · Wideband · CAN</p>
              <h3 className="mt-3 font-display text-2xl md:text-3xl font-semibold">Electronics</h3>
              <div className="mt-4 flex items-center gap-2 text-xs font-display uppercase tracking-widest text-muted-foreground group-hover:text-race-red transition-colors">
                Explore <span aria-hidden>→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="hairline-t">
        <div className="container-wide py-24 md:py-36">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] items-end">
            <div>
              <Eyebrow>02 · Services</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-3xl">
                Everything a race car needs — under one roof.
              </h2>
            </div>
            <Link to="/services" className="btn-ghost">All Services →</Link>
          </div>

          <div className="mt-20 space-y-24 md:space-y-32">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`grid gap-10 lg:gap-16 items-center ${
                  i % 2 === 0 ? "lg:grid-cols-[1.15fr_1fr]" : "lg:grid-cols-[1fr_1.15fr] lg:[&>*:first-child]:order-2"
                }`}
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-surface">
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="max-w-lg">
                  <div className="font-display text-race-red text-xs tracking-[0.3em]">{s.n} / 07</div>
                  <h3 className="mt-6 font-display text-3xl md:text-5xl font-semibold leading-[1.05]">{s.title}</h3>
                  <p className="mt-6 text-muted-foreground leading-relaxed">{s.desc}</p>
                  <Link to="/services" className="mt-8 inline-flex items-center gap-2 eyebrow text-foreground hover:text-race-red transition-colors">
                    Learn more <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-wide py-24 md:py-36 hairline-t">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] items-end">
          <div>
            <Eyebrow>03 · Featured Products</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-3xl">
              Engineered. Fabricated. Track-validated.
            </h2>
          </div>
          <Link to="/shop" className="btn-ghost">Shop All →</Link>
        </div>

        <div className="mt-16 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Link key={p.name} to="/product" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
              </div>
              <div className="mt-6">
                <p className="eyebrow">{p.meta}</p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-medium leading-snug">{p.name}</h3>
                  <span className="font-display text-sm text-muted-foreground shrink-0">{p.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY TWAY */}
      <section className="hairline-t bg-surface/40">
        <div className="container-wide py-24 md:py-36 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <img src={whyTrack} alt="Corvette on track" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
          </div>
          <div>
            <Eyebrow accent>04 · Why Tway</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-lg">
              Our experience comes from actually racing — <span className="text-muted-foreground">not reading forums.</span>
            </h2>
            <p className="mt-8 max-w-md text-muted-foreground leading-relaxed">
              Three generations of racers, engineers and fabricators. Every recommendation
              we make has been beaten on by a driver we trained, on a car we built.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                ["25+", "Years of Experience"],
                ["10k+", "Track Hours Logged"],
                ["4", "National Championships"],
                ["100%", "Family Owned & Operated"],
              ].map(([n, l]) => (
                <div key={l} className="card-glass p-6">
                  <div className="font-display text-3xl font-semibold text-race-red">{n}</div>
                  <div className="mt-2 text-xs text-muted-foreground leading-tight">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RACE BUILDS — MAGAZINE */}
      <section className="container-wide py-24 md:py-36">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] items-end">
          <div>
            <Eyebrow>05 · Featured Race Builds</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-2xl">
              From the build book.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            A selection of the machines currently living in our race bay — each one designed, fabricated and calibrated in-house.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:gap-8 lg:grid-cols-12">
          <BuildCard className="lg:col-span-8 aspect-[16/10]" img={build1} eyebrow="Build N°07 · Team Livery" title="C7 GT3 · Twin-Turbo Program" />
          <BuildCard className="lg:col-span-4 aspect-[4/5]" img={userShop} eyebrow="Build N°11 · Time Attack" title="C5 · Fully Caged Track Weapon" />
          <BuildCard className="lg:col-span-4 aspect-[4/5]" img={build2} eyebrow="Build N°09 · Restomod" title="C7 Stripped · Frame-Up" />
          <BuildCard className="lg:col-span-8 aspect-[16/10]" img={build3} eyebrow="Build N°12 · Endurance" title="C8 GT4 · Class Contender" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="hairline-t">
        <div className="container-wide py-24 md:py-36">
          <Eyebrow>06 · Customers</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-3xl">
            The paddock talks. We listen.
          </h2>

          <div className="mt-16 grid gap-6 md:gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card-glass p-8 md:p-10 flex flex-col">
                <div className="flex gap-1 text-race-red text-xs tracking-widest">★ ★ ★ ★ ★</div>
                <blockquote className="mt-6 font-display text-xl md:text-2xl leading-snug">"{t.quote}"</blockquote>
                <figcaption className="mt-auto pt-10">
                  <div className="font-display font-medium">{t.name}</div>
                  <div className="eyebrow mt-1">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL / MASONRY */}
      <section className="container-wide py-24 md:py-36 hairline-t">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] items-end">
          <div>
            <Eyebrow>07 · @tway.motorsports</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-2xl">
              From the shop floor & the paddock.
            </h2>
          </div>
          <a href="#" className="btn-ghost">Follow on Instagram →</a>
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <img src={social1} alt="Corvette headlight" className="col-span-1 row-span-2 h-full w-full object-cover rounded-lg aspect-[3/4]" loading="lazy" />
          <img src={social2} alt="Track overhead" className="col-span-2 h-full w-full object-cover rounded-lg aspect-[4/3]" loading="lazy" />
          <img src={social3} alt="Suspension detail" className="col-span-1 h-full w-full object-cover rounded-lg aspect-square" loading="lazy" />
          <img src={social4} alt="Corvette taillights" className="col-span-1 h-full w-full object-cover rounded-lg aspect-[3/4]" loading="lazy" />
          <img src={build1} alt="Pit crew" className="col-span-2 h-full w-full object-cover rounded-lg aspect-[4/3]" loading="lazy" />
          <img src={svcFab} alt="Fabrication" className="col-span-1 h-full w-full object-cover rounded-lg aspect-square" loading="lazy" />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <img src={build3} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="relative container-wide py-32 md:py-48 text-center">
          <Eyebrow accent>The Next Build</Eyebrow>
          <h2 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] max-w-4xl mx-auto">
            Ready to build<br />something fast?
          </h2>
          <p className="mt-8 max-w-lg mx-auto text-muted-foreground">
            Whether it's a full race program, a weekend build or a single component — talk to a racer, not a call center.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Request a Quote</Link>
            <Link to="/shop" className="btn-ghost">Shop Parts</Link>
            <Link to="/contact" className="btn-ghost">Visit the Shop</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function BuildCard({ className, img, eyebrow, title }: { className?: string; img: string; eyebrow: string; title: string }) {
  return (
    <Link to="/product" className={`group relative overflow-hidden rounded-xl bg-surface ${className}`}>
      <img src={img} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="mt-3 font-display text-xl md:text-2xl font-semibold">{title}</h3>
      </div>
    </Link>
  );
}
