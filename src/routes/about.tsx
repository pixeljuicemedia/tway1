import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import aboutTeam from "@/assets/about-team-family.jpg";
import racertsAsset from "@/assets/racerts.jpg.asset.json";
import build3 from "@/assets/build-3.jpg";
import insideShop1 from "@/assets/inside-shop-1.png.asset.json";
import insideShop2 from "@/assets/inside-shop-2.png.asset.json";
import insideShop3 from "@/assets/inside-shop-3.png.asset.json";
import insideShop4 from "@/assets/inside-shop-4.png.asset.json";
import insideShop5 from "@/assets/inside-shop-5.png.asset.json";
import insideShop6 from "@/assets/inside-shop-6.png.asset.json";
import insideShop7 from "@/assets/inside-shop-7.png.asset.json";
import insideShop8 from "@/assets/inside-shop-8.png.asset.json";
import insideShop9 from "@/assets/inside-shop-9.png.asset.json";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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

const shopGallery = [
  { src: insideShop1.url, alt: "Wide overhead view of the Tway Motorsports shop floor" },
  { src: insideShop2.url, alt: "Engineer working on a stripped race car chassis in the shop" },
  { src: insideShop3.url, alt: "Two mechanics working under the rear of a black race car" },
  { src: insideShop4.url, alt: "Green Corvette on the lift inside the race shop" },
  { src: insideShop5.url, alt: "Mechanics working on a blue Corvette engine bay" },
  { src: insideShop6.url, alt: "Engine install underway on a blue Corvette in the service bay" },
  { src: insideShop7.url, alt: "Mechanic working under a lifted black car in the shop" },
  { src: insideShop8.url, alt: "Mechanic working under a blue Corvette with the shop dog nearby" },
  { src: insideShop9.url, alt: "Fabrication work happening inside a blue race car cockpit" },
];

function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<(typeof shopGallery)[number] | null>(null);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="container-wide pt-20 md:pt-32 pb-20 md:pb-24">
        <Eyebrow accent>Est. 2015 · Orange, CA</Eyebrow>
        <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight max-w-5xl text-white">
          A family. A shop.<br />
          <span className="text-race-red">A decade of podium finishes.</span>
        </h1>
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
          <div className="space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <img src={aboutTeam} alt="Tway family team" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <img src={racertsAsset.url} alt="Tway Motorsports race team and Corvettes on track" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="max-w-md space-y-8 text-white">
            <div>
              <h2 className="font-display text-xl font-semibold text-race-red">Founding</h2>
              <p className="mt-3 leading-relaxed">
                Jim Tway founded and incorporated Tway Motorsports in 2015 while working as an aerospace engineer in Southern California. After a modest start, Tway Motorsports grew from a side gig in the garage to a full-time venture in 2022.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-race-red">Early Days</h2>
              <p className="mt-3 leading-relaxed">
                Tway Motorsports began offering a product line of aerodynamic parts for late-model Corvettes, all designed in-house. Shortly thereafter, trackside tuning and support of Corvettes became a major growth opportunity.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-race-red">Current Offerings</h2>
              <p className="mt-3 leading-relaxed">
                Tway Motorsports offers a full complement of automotive racing services and parts. We offer custom-designed parts and the best racing retail parts from around the world, engineering and driver development solutions for amateur enthusiasts and pro racing drivers, installation services, and trackside mechanical and engineering support including technical inspection. We also bring an expansive knowledge base of modern racing electrical systems and software, providing parts, programming and tuning.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-race-red">Position</h2>
              <p className="mt-3 leading-relaxed">
                Tway Motorsports leverages a 15-year career in advanced vehicle systems including programs such as the Boeing 787, Minuteman III ICBM, and numerous Phantom Works prototype unmanned planes and helicopters. Combined with Jim's 20-year racing career in SCCA Road Racing, NASA Pro Racing and a collegiate Formula SAE race team, this has uniquely positioned Tway Motorsports as a leading race shop operating in SoCal.
              </p>
            </div>
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
            {shopGallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={index === 0 ? "col-span-2 row-span-2 overflow-hidden rounded-lg aspect-square lg:aspect-auto text-left" : "overflow-hidden rounded-lg aspect-square text-left"}
                aria-label={`Open photo: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[92vw] border-border bg-background/95 p-2 sm:p-3">
          {selectedImage && (
            <>
              <DialogTitle className="sr-only">{selectedImage.alt}</DialogTitle>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[85vh] w-full rounded-md object-contain"
              />
            </>
          )}
        </DialogContent>
      </Dialog>

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