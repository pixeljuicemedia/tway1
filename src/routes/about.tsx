import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import aboutTeam from "@/assets/about-team.jpg";
import whyTrack from "@/assets/why-track.jpg";
import build1 from "@/assets/build-1.jpg";
import build2 from "@/assets/build-2.jpg";
import build3 from "@/assets/build-3.jpg";
import svcFab from "@/assets/svc-fab.jpg";
import userShop from "@/assets/tway-user-photo.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — 25 Years of Racing Corvettes · Tway Motorsports" },
      { name: "description", content: "Family-owned since 1999. Three generations of racers, engineers and fabricators building championship-level Corvettes." },
      { property: "og:title", content: "About — Tway Motorsports" },
      { property: "og:description", content: "Family-owned since 1999. Three generations of racers building championship-level Corvettes." },
      { property: "og:image", content: aboutTeam },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="container-wide pt-20 md:pt-32 pb-20 md:pb-24">
        <Eyebrow accent>Est. 1999 · Charlotte, NC</Eyebrow>
        <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight max-w-5xl">
          A family. A shop.<br />
          <span className="text-muted-foreground">A quarter-century of laps.</span>
        </h1>
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <img src={aboutTeam} alt="Tway family team" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="max-w-md">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tway started as a father-and-son project in a two-bay garage. Twenty-five years later, it's a full-service race shop that still runs like a family.
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              We don't hire clock-punchers. Every technician on the floor has raced, fabricated, tuned or engineered — usually all four. That's why the paddock trusts us.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="hairline-t hairline-b bg-surface/40">
        <div className="container-wide py-16 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-y-10">
          {[
            ["25+", "Years Racing"],
            ["4", "National Championships"],
            ["10,000+", "Track Hours"],
            ["3", "Generations"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-4xl md:text-6xl font-semibold tracking-tight">{n}</div>
              <div className="mt-3 eyebrow">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container-wide py-24 md:py-32">
        <Eyebrow>Timeline</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-2xl">The long way to the podium.</h2>
        <div className="mt-16 grid gap-x-10 md:grid-cols-[auto_1fr]">
          {[
            ["1999", "The First Bay", "Two lifts, one Corvette, a father-son handshake."],
            ["2006", "First Championship", "SCCA T1 class title — car built and driven in-house."],
            ["2012", "The Race Shop", "Ground-up move to a purpose-built 20,000 sq ft facility."],
            ["2018", "Engineering Division", "Full-time vehicle dynamics and aero programs added."],
            ["2024", "Third Generation", "The next kids in the family now on the tools."],
          ].map(([y, t, d]) => (
            <div key={y} className="contents">
              <div className="hairline-t md:hairline-t py-8 md:py-10 md:pr-8 font-display text-2xl md:text-4xl font-semibold text-race-red">{y}</div>
              <div className="hairline-t py-8 md:py-10 md:pl-8">
                <h3 className="font-display text-xl md:text-2xl font-semibold">{t}</h3>
                <p className="mt-3 text-muted-foreground max-w-lg leading-relaxed">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP GALLERY */}
      <section className="hairline-t bg-surface/40">
        <div className="container-wide py-24 md:py-32">
          <Eyebrow>Inside the Shop</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-2xl">Where the work happens.</h2>
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <img src={userShop} alt="Corvette on the lift" className="col-span-2 row-span-2 h-full w-full object-cover rounded-lg aspect-square lg:aspect-auto" loading="lazy" />
            <img src={svcFab} alt="Fabrication" className="h-full w-full object-cover rounded-lg aspect-square" loading="lazy" />
            <img src={build2} alt="Build overhead" className="h-full w-full object-cover rounded-lg aspect-square" loading="lazy" />
            <img src={build1} alt="Pit lane" className="h-full w-full object-cover rounded-lg aspect-square" loading="lazy" />
            <img src={whyTrack} alt="On track" className="h-full w-full object-cover rounded-lg aspect-square" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide py-24 md:py-32 text-center hairline-t">
        <Eyebrow accent>Come by the shop</Eyebrow>
        <h2 className="mt-8 font-display text-4xl md:text-6xl font-semibold leading-[1] max-w-3xl mx-auto">
          Meet the team. See the builds.
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-primary">Book a Visit</Link>
          <Link to="/services" className="btn-ghost">Our Services</Link>
        </div>
      </section>

      <img src={build3} alt="" aria-hidden className="hidden" />
    </SiteShell>
  );
}