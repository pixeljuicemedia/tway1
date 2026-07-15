import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import svcFab from "@/assets/svc-fab.jpg";
import svcDyno from "@/assets/svc-dyno.jpg";
import svcEngine from "@/assets/svc-engine.jpg";
import build1 from "@/assets/build-1.jpg";
import build3 from "@/assets/build-3.jpg";
import whyTrack from "@/assets/why-track.jpg";
import userShop from "@/assets/tway-user-photo.jpg";
import servicesHero from "@/assets/services-hero.jpg.asset.json";
import racePrep from "@/assets/race-prep.jpg.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Fabrication, Tuning & Race Prep · Tway Motorsports" },
      { name: "description", content: "Custom fabrication, engine building, dyno tuning, race prep, trackside support, engineering and driver development — all in-house." },
      { property: "og:title", content: "Services — Tway Motorsports" },
      { property: "og:description", content: "Fabrication, tuning, race prep and trackside support — everything a race car needs, in-house." },
      { property: "og:image", content: svcDyno },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { n: "01", t: "Custom Fabrication", d: "TIG-welded stainless headers, roll cages, splitters, brackets — one-off race components engineered around your platform.", img: svcFab },
  { n: "02", t: "Engine Building", d: "Blueprinted LT and LS assemblies. Balanced rotating assemblies, CNC-ported heads, race-spec valvetrains.", img: svcEngine },
  { n: "03", t: "Dyno Tuning", d: "In-house Mustang chassis dyno. Every calibration is validated with data, not guessed at.", img: svcDyno },
  { n: "04", t: "Race Prep", d: "Corner weights, alignment, brake bleeds, tire prep. We ship your car race-ready — every session.", img: racePrep.url },
  { n: "05", t: "Trackside Support", d: "Full pit-lane presence. Diagnostics, setup changes, fabrication repairs — we don't leave until you finish.", img: build1 },
  { n: "06", t: "Engineering", d: "Vehicle dynamics, aero simulation, damper development. Engineering-backed decisions, not opinions.", img: whyTrack },
  { n: "07", t: "Driver Development", d: "Coaching, data review, sim programs. From HPDE novice to championship contender.", img: userShop },
];

function ServicesPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden hairline-b">
        <img src={servicesHero.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.14 0.005 260 / 0.2) 0%, oklch(0.14 0.005 260 / 0.4) 60%, oklch(0.14 0.005 260) 100%)",
          }}
          aria-hidden
        />
        <div className="relative container-wide pt-24 md:pt-40 pb-24 md:pb-32">
          <Eyebrow accent>Services · Seven Disciplines</Eyebrow>
          <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] max-w-4xl">
            Everything a race car needs.<br /><span className="text-muted-foreground">All under one roof.</span>
          </h1>
          <p className="mt-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Seven disciplines. One shop. One team. From the first sketch to the checkered flag, every process is in-house — because racing doesn't wait on a supplier.
          </p>
        </div>
      </section>

      {/* SERVICE LIST */}
      <section className="container-wide py-24 md:py-32 space-y-24 md:space-y-32">
        {services.map((s, i) => (
          <article key={s.n} className={`grid gap-10 lg:gap-16 items-center ${i % 2 === 0 ? "lg:grid-cols-[1.2fr_1fr]" : "lg:grid-cols-[1fr_1.2fr] lg:[&>*:first-child]:order-2"}`}>
            <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-surface">
              <img src={s.img} alt={s.t} className="h-full w-full object-cover" loading="lazy" />
              <span className="absolute top-6 left-6 font-display text-race-red text-xs tracking-[0.3em]">{s.n} / 07</span>
            </div>
            <div className="max-w-lg">
              <Eyebrow>Service · {s.n}</Eyebrow>
              <h2 className="mt-6 font-display text-3xl md:text-5xl font-semibold leading-[1.02]">{s.t}</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">{s.d}</p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {["Consultation", "Design", "Fabrication", "Validation"].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-race-red" />
                    {x}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-10 inline-flex btn-ghost">Request a Quote →</Link>
            </div>
          </article>
        ))}
      </section>

      {/* PROCESS */}
      <section className="hairline-t bg-surface/40">
        <div className="container-wide py-24 md:py-32">
          <Eyebrow>Our Process</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-3xl">
            Four stages. No shortcuts.
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Discovery", "Deep-dive consult. Goals, budget, class, calendar."],
              ["02", "Design", "CAD, spec sheets, part sourcing. Signed off before we cut metal."],
              ["03", "Build", "In-house fabrication, machining and assembly. Documented."],
              ["04", "Validate", "Corner weighted, dyno-mapped and shakedown tested."],
            ].map(([n, t, d]) => (
              <div key={n} className="card-glass p-8">
                <div className="font-display text-race-red text-xs tracking-[0.3em]">{n} / 04</div>
                <h3 className="mt-6 font-display text-xl font-semibold">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}