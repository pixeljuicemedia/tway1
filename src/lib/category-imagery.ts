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

/** Keyword → stock/generated imagery. Never product photography. */
const RULES: { match: RegExp; img: string }[] = [
  { match: /pad/i, img: catBrakePads },
  { match: /(line|hose)/i, img: catBrakeLines },
  { match: /fluid/i, img: catBrakeFluid },
  { match: /(tool|kit tool|wrench)/i, img: catTools },
  { match: /(brake|caliper|rotor)/i, img: prodBrakes },
  { match: /(aero|splitter|wing|diffuser|spoiler)/i, img: prodAero },
  { match: /(suspension|coilover|sway|shock|spring)/i, img: prodSuspension },
  { match: /(wheel|tire)/i, img: prodWheels },
  { match: /(interior|seat|harness|cage)/i, img: prodInterior },
  { match: /(engine|intake|exhaust|header|drivetrain|supercharger|cooling)/i, img: prodEngine },
  { match: /(safety|helmet|fire)/i, img: catSafety },
  { match: /(electronic|data|gauge|dash)/i, img: catElectronics },
];

export function categoryImage(name: string): string {
  return RULES.find((r) => r.match.test(name))?.img ?? catGeneric;
}
