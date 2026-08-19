import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import b9406 from "@/assets/build-c8gt3-9406.jpg.asset.json";
import b2931 from "@/assets/build-c8gt3-2931.jpg.asset.json";
import b2945 from "@/assets/build-c8gt3-2945.jpg.asset.json";
import b2940 from "@/assets/build-c8gt3-2940.jpg.asset.json";
import b2933 from "@/assets/build-c8gt3-2933.jpg.asset.json";
import b2944 from "@/assets/build-c8gt3-2944.jpg.asset.json";
import g9236 from "@/assets/build-img-9236.jpg.asset.json";
import g2939 from "@/assets/build-img-2939-2.jpg.asset.json";
import g0507 from "@/assets/build-img-0507.jpg.asset.json";
import g9164 from "@/assets/build-img-9164.jpg.asset.json";
import g9545 from "@/assets/build-img-9545.jpg.asset.json";
import g9212 from "@/assets/build-img-9212.jpg.asset.json";
import g1858 from "@/assets/build-img-1858.jpg.asset.json";
import g1452 from "@/assets/build-img-1452.jpg.asset.json";
import g3906 from "@/assets/build-img-3906.jpg.asset.json";
import g3930 from "@/assets/build-img-3930.jpg.asset.json";
import k0605 from "@/assets/blue05-img_0605.jpg.asset.json";
import k6707 from "@/assets/blue05-img_6707.jpg.asset.json";
import k6708 from "@/assets/blue05-img_6708.jpg.asset.json";
import k9348 from "@/assets/blue05-img_9348.jpg.asset.json";
import k9366 from "@/assets/blue05-img_9366.jpg.asset.json";
import k2915 from "@/assets/blue05-img_2915.jpg.asset.json";

export const Route = createFileRoute("/builds")({
  head: () => ({
    meta: [
      { title: "Builds — Corvette Race Car Gallery · Tway Motorsports" },
      { name: "description", content: "A gallery of Tway Motorsports builds — Corvette race cars prepped, tuned and campaigned by our shop, photographed on track." },
      { property: "og:title", content: "Builds — Corvette Race Car Gallery · Tway Motorsports" },
      { property: "og:description", content: "A gallery of Tway Motorsports builds — Corvette race cars prepped, tuned and campaigned by our shop, photographed on track." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BuildsPage,
});

type Photo = { img: string; alt: string };
type BuildSet = { title: string; tag: string; blurb: string; photos: Photo[] };

const buildSets: BuildSet[] = [
  {
    title: "C8 Z06 GT3.R",
    tag: "Race Prep · Trackside",
    blurb: "Fanatec-liveried C8 Z06 GT3.R campaigned across SoCal and desert circuits — prep, setup and trackside engineering by Tway.",
    photos: [
      { img: b9406.url, alt: "Blue C8 Corvette Z06 GT3.R exiting a corner" },
      { img: b2931.url, alt: "Blue C8 Corvette Z06 GT3.R at speed on track" },
      { img: b2945.url, alt: "Blue C8 Corvette Z06 GT3.R on a desert circuit" },
      { img: b2940.url, alt: "Blue C8 Corvette Z06 GT3.R cornering at Willow Springs" },
      { img: b2933.url, alt: "Blue C8 Corvette Z06 GT3.R on a desert straight" },
      { img: b2944.url, alt: "Blue C8 Corvette Z06 GT3.R heading toward the camera" },
    ],
  },
  {
    title: "#55 C5 Corvette · Super Corvette",
    tag: "Full Build · Arrive & Drive",
    blurb: "The green #55 C5 — our in-house built Super Corvette class car. Cage, aero, brakes, suspension and electronics, all developed at the shop and proven on track.",
    photos: [
      { img: g2939.url, alt: "Green #55 Tway Motorsports C5 Corvette cornering hard" },
      { img: g0507.url, alt: "Green #55 C5 Corvette on track with mountains behind" },
      { img: g9236.url, alt: "Green #55 C5 Corvette on a desert circuit" },
      { img: g9164.url, alt: "Close-up of the #55 Tway Motorsports livery on the C5 door" },
      { img: g9545.url, alt: "Green #55 C5 Corvette battling a red Civic on track" },
      { img: g9212.url, alt: "Green #55 C5 Corvette head-on at speed" },
      { img: g1858.url, alt: "Green #55 C5 Corvette on a desert track behind sponsor barriers" },
      { img: g1452.url, alt: "Green #55 C5 Corvette on the lift inside the Tway Motorsports shop" },
    ],
  },
  {
    title: "#07 C5 Corvette · ST-2 / GT-2",
    tag: "Race Prep · Fabrication",
    blurb: "Pacific Auto Recycling / American Heritage Performance #07 C5 — 3000 lb ST-2 and GT-2 spec build, prepped and serviced trackside.",
    photos: [
      { img: g3930.url, alt: "Green and black #07 C5 Corvette race car in the paddock" },
      { img: g3906.url, alt: "Crew working on the #07 C5 Corvette on jack stands at the track" },
    ],
  },
  {
    title: "#05 C5 Corvette · K Racing ST1",
    tag: "Race Prep · Trackside",
    blurb: "The blue K Racing 'Total Kontrol' #05 C5 — an ST1-spec Corvette we prep, service and support at the track, from aero and cooling to full trackside engineering.",
    photos: [
      { img: k0605.url, alt: "Blue #05 K Racing C5 Corvette at speed on a desert circuit" },
      { img: k6707.url, alt: "Front clip removed on the blue #05 C5 Corvette during trackside service" },
      { img: k6708.url, alt: "Crew working on the blue #05 C5 Corvette in the paddock" },
      { img: k9348.url, alt: "Blue #05 K Racing C5 Corvette prepped at the track" },
      { img: k9366.url, alt: "Blue #05 K Racing C5 Corvette during a race weekend" },
      { img: k2915.url, alt: "Detail of the blue #05 C5 Corvette race car" },
    ],
  },
];

function BuildsPage() {
  const [active, setActive] = useState<Photo | null>(null);

  return (
    <SiteShell>
      <section className="hairline-t bg-carbon-texture">
        <div className="container-wide py-20 md:py-28">
          <Eyebrow accent>Builds</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] max-w-3xl">
            Real cars. Real customers. <span className="text-muted-foreground">Real results.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            A look at the cars we build, prep and campaign — photographed where it counts.
          </p>

          <div className="mt-16 space-y-20 md:space-y-24">
            {buildSets.map((set) => (
              <article key={set.title}>
                <div className="hairline-t pt-8">
                  <p className="eyebrow text-race-red">{set.tag}</p>
                  <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold">{set.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm md:text-base text-muted-foreground">{set.blurb}</p>
                </div>

                <div className="mt-8 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {set.photos.map((p) => (
                    <button
                      key={p.img}
                      type="button"
                      onClick={() => setActive(p)}
                      className="group relative overflow-hidden rounded-xl bg-surface aspect-[4/3]"
                    >
                      <img
                        src={p.img}
                        alt={p.alt}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl border-white/10 bg-background p-2">
          {active && (
            <figure>
              <img src={active.img} alt={active.alt} className="w-full rounded-lg object-contain max-h-[80vh]" />
              <figcaption className="px-2 py-3 text-sm text-muted-foreground">{active.alt}</figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </SiteShell>
  );
}