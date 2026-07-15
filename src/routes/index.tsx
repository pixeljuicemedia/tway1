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

