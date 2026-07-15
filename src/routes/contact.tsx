import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Eyebrow } from "@/components/site-layout";
import contactHeroAsset from "@/assets/contact-hero.png.asset.json";
const contactHero = contactHeroAsset.url;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Request a Quote · Tway Motorsports" },
      { name: "description", content: "Talk to a racer, not a call center. Request a quote, book shop time or arrange trackside support with Tway Motorsports." },
      { property: "og:title", content: "Contact — Tway Motorsports" },
      { property: "og:description", content: "Talk to a racer, not a call center. Request a quote or visit the shop." },
      { property: "og:image", content: contactHero },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={contactHero} alt="" className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.14 0.005 260 / 0.75) 0%, oklch(0.14 0.005 260 / 0.55) 40%, oklch(0.14 0.005 260 / 0.7) 70%, oklch(0.14 0.005 260) 100%)",
            }}
          />
        </div>
        <div className="container-wide pt-20 md:pt-32 pb-16 md:pb-20 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-end">
          <div>
            <Eyebrow accent>Get in touch</Eyebrow>
            <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
              Talk to a racer.<br /><span className="text-muted-foreground">Not a call center.</span>
            </h1>
          </div>
          <p className="max-w-md text-muted-foreground leading-relaxed">
            Every message goes to a technician who has actually built cars — not a sales queue. We reply inside one business day.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="container-wide pb-24 md:pb-32 grid gap-10 lg:gap-16 lg:grid-cols-[1.15fr_1fr] items-start">
        {/* FORM */}
        <form className="card-glass p-8 md:p-12">
          <Eyebrow>Request a Quote</Eyebrow>
          <h2 className="mt-6 font-display text-3xl md:text-4xl font-semibold">Tell us about the build.</h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Field label="First Name" placeholder="Jordan" />
            <Field label="Last Name" placeholder="Reilly" />
            <Field label="Email" placeholder="you@team.com" type="email" />
            <Field label="Phone" placeholder="+1 (704) 555 0110" />
            <div className="sm:col-span-2">
              <label className="eyebrow">Platform</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {["C5", "C6", "C7", "C8", "Other"].map((c, i) => (
                  <button
                    type="button"
                    key={c}
                    className={`px-5 py-3 rounded-lg border text-xs font-display uppercase tracking-widest ${i === 2 ? "border-foreground bg-foreground/5" : "border-border text-muted-foreground hover:text-foreground"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="eyebrow">Service</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Fabrication", "Tuning", "Race Prep", "Engine", "Coaching", "Parts"].map((c) => (
                  <button
                    type="button"
                    key={c}
                    className="px-5 py-3 rounded-lg border border-border text-xs font-display uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="eyebrow">Project Brief</label>
              <textarea
                rows={5}
                placeholder="Class, calendar, budget, goals…"
                className="mt-3 w-full rounded-lg bg-background/50 border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-race-red transition-colors"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <p className="text-xs text-muted-foreground max-w-xs">We respond within one business day. All quotes are hand-written by a technician.</p>
            <button type="button" className="btn-primary">Send Request →</button>
          </div>
        </form>

        {/* CONTACT INFO */}
        <div className="space-y-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <img src={contactHero} alt="Inside the Tway race bay" className="h-full w-full object-cover" loading="lazy" />
          </div>

          <div className="card-glass p-8">
            <Eyebrow>The Shop</Eyebrow>
            <address className="not-italic mt-6 font-display text-xl leading-snug">
              1420 Pit Lane Drive<br />
              Charlotte, NC 28217
            </address>
            <div className="mt-8 space-y-3 text-sm">
              <InfoRow k="Sales" v="+1 (704) 555 0110" />
              <InfoRow k="Race Line" v="+1 (704) 555 0111" />
              <InfoRow k="Email" v="race@tway.com" />
            </div>
          </div>

          <div className="card-glass p-8">
            <Eyebrow>Hours</Eyebrow>
            <dl className="mt-6 space-y-3 text-sm">
              <InfoRow k="Mon – Fri" v="8:00 – 18:00" />
              <InfoRow k="Saturday" v="By appointment" />
              <InfoRow k="Sunday" v="Closed" />
              <InfoRow k="Race Weekends" v="24/7 on-call" accent />
            </dl>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="eyebrow">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full rounded-lg bg-background/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-race-red transition-colors"
      />
    </div>
  );
}

function InfoRow({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4 items-baseline">
      <dt className="eyebrow">{k}</dt>
      <dd className={accent ? "font-display text-race-red" : "text-foreground"}>{v}</dd>
    </div>
  );
}