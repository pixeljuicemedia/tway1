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

const builds = [
  { title: "C8 Z06 GT3.R · Fanatec Livery", tag: "Race Prep", img: b9406.url, alt: "Blue C8 Corvette Z06 GT3.R race car exiting a corner" },
  { title: "C8 Z06 GT3.R · Sonoma", tag: "Trackside", img: b2931.url, alt: "Blue C8 Corvette Z06 GT3.R at speed on track" },
  { title: "C8 Z06 GT3.R · Desert Test", tag: "Performance Tuning", img: b2945.url, alt: "Blue C8 Corvette Z06 GT3.R on a desert circuit" },
  { title: "C8 Z06 GT3.R · Willow Springs", tag: "Race Prep", img: b2940.url, alt: "Blue C8 Corvette Z06 GT3.R cornering at Willow Springs" },
  { title: "C8 Z06 GT3.R · Chuckwalla", tag: "Arrive & Drive", img: b2933.url, alt: "Blue C8 Corvette Z06 GT3.R on a desert straight" },
  { title: "C8 Z06 GT3.R · Pit Exit", tag: "Trackside", img: b2944.url, alt: "Blue C8 Corvette Z06 GT3.R heading toward the camera" },
];

function BuildsPage() {
  const [active, setActive] = useState<number | null>(null);

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

          <div className="mt-14 grid gap-6 md:gap-8 md:grid-cols-2">
            {builds.map((b, i) => (
              <button
                key={b.title}
                type="button"
                onClick={() => setActive(i)}
                className="group relative overflow-hidden rounded-xl bg-surface aspect-[16/10] text-left"
              >
                <img
                  src={b.img}
                  alt={b.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <p className="eyebrow">{b.tag}</p>
                  <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">{b.title}</h2>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl border-white/10 bg-background p-2">
          {active !== null && (
            <figure>
              <img src={builds[active].img} alt={builds[active].alt} className="w-full rounded-lg object-contain max-h-[80vh]" />
              <figcaption className="px-2 py-3 text-sm text-muted-foreground">
                <span className="eyebrow mr-3">{builds[active].tag}</span>
                {builds[active].title}
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </SiteShell>
  );
}