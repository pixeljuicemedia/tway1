import catBrakePads from "@/assets/cat-brake-pads.jpg";
import catBrakeLines from "@/assets/cat-brake-lines.jpg";
import catBrakeFluid from "@/assets/cat-brake-fluid.jpg";
import catTools from "@/assets/cat-tools.jpg";
import catGeneric from "@/assets/cat-generic-parts.jpg";
import prodBrakes from "@/assets/prod-brakes.jpg";
import prodAero from "@/assets/prod-aero.jpg";
import prodSuspension from "@/assets/prod-suspension.jpg";
import prodWheels from "@/assets/prod-wheels.jpg";
import prodInterior from "@/assets/prod-interior.jpg";
import prodEngine from "@/assets/prod-engine.jpg";
import catSafety from "@/assets/cat-safety.jpg";
import catElectronics from "@/assets/cat-electronics.jpg";

import whiteEngine from "@/assets/white-engine.jpg";
import whiteSuspension from "@/assets/white-suspension.jpg";
import whiteInterior from "@/assets/white-interior.jpg";
import whiteAero from "@/assets/white-aero.jpg";
import whiteBrakes from "@/assets/white-brakes.jpg";
import whiteTools from "@/assets/white-tools.jpg";
import whiteFluids from "@/assets/white-fluids.jpg";
import whiteElectronics from "@/assets/white-electronics.jpg";

/** Keyword → stock/generated imagery. Never product photography. */
const RULES: { match: RegExp; img: string }[] = [
  { match: /^fluids?$/i, img: catBrakeFluid },
  { match: /^tools?$/i, img: catTools },
  { match: /^brakes?$/i, img: prodBrakes },
  { match: /pad/i, img: catBrakePads },
  { match: /(line|hose)/i, img: catBrakeLines },
  { match: /(fluid|oil|coolant|grease|lubricant)/i, img: catBrakeFluid },
  { match: /(tool|wrench|spreader|socket|jack)/i, img: catTools },
  { match: /(brake|caliper|rotor)/i, img: prodBrakes },
  { match: /(aero|splitter|wing|diffuser|spoiler)/i, img: prodAero },
  { match: /(suspension|coilover|sway|shock|spring)/i, img: prodSuspension },
  { match: /(wheel|tire)/i, img: prodWheels },
  { match: /(interior|seat|harness|cage)/i, img: prodInterior },
  { match: /(engine|intake|exhaust|header|drivetrain|supercharger|cooling)/i, img: prodEngine },
  { match: /exterior/i, img: prodAero },
  { match: /(safety|helmet|fire)/i, img: catSafety },
  { match: /(electronic|data|gauge|dash)/i, img: catElectronics },
];

export function categoryImage(name: string): string {
  return RULES.find((r) => r.match.test(name))?.img ?? catGeneric;
}

/** White-background (studio) variants used on the homepage category grid. */
const WHITE_RULES: { match: RegExp; img: string }[] = [
  { match: /^fluids?$/i, img: whiteFluids },
  { match: /^tools?$/i, img: whiteTools },
  { match: /^brakes?$/i, img: whiteBrakes },
  { match: /(fluid|oil|coolant|grease|lubricant)/i, img: whiteFluids },
  { match: /(tool|wrench|spreader|socket|jack)/i, img: whiteTools },
  { match: /(brake|pad|caliper|rotor)/i, img: whiteBrakes },
  { match: /(suspension|coilover|sway|shock|spring|wheel|tire)/i, img: whiteSuspension },
  { match: /(interior|seat|harness|cage)/i, img: whiteInterior },
  { match: /(electronic|data|gauge|dash)/i, img: whiteElectronics },
  { match: /(engine|intake|exhaust|header|drivetrain|supercharger|cooling)/i, img: whiteEngine },
  { match: /(exterior|aero|splitter|wing|diffuser|spoiler)/i, img: whiteAero },
];

export function categoryImageWhite(name: string): string {
  return WHITE_RULES.find((r) => r.match.test(name))?.img ?? whiteEngine;
}
