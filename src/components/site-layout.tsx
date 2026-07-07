import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "@/assets/tway-logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/product", label: "Product" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/70 backdrop-blur-xl hairline-b">
      <div className="container-wide grid grid-cols-[auto_1fr_auto] items-center gap-6 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Tway Motorsports" className="h-8 md:h-9 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center justify-center gap-10">
          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="font-display text-[11px] tracking-[0.24em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 justify-end">
          <Link to="/contact" className="hidden md:inline-flex btn-ghost !py-2.5 !px-4 !text-[10px]">
            Request Quote
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden h-10 w-10 grid place-items-center border border-border rounded-md"
          >
            <div className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden hairline-t bg-background">
          <div className="container-wide py-6 flex flex-col gap-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-display text-sm tracking-[0.18em] uppercase text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 hairline-t bg-background">
      <div className="container-wide py-20">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <img src={logo} alt="Tway Motorsports" className="h-10 w-auto" />
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Family-owned race shop. Twenty-five years of Corvette engineering, fabrication and trackside experience — engineered for the podium.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {["IG", "YT", "FB", "TT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="h-10 w-10 grid place-items-center border border-border rounded-full font-display text-[10px] tracking-widest text-muted-foreground hover:text-foreground hover:border-race-red transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Explore" links={[
            ["Shop All", "/shop"],
            ["C8 Corvette", "/shop"],
            ["C7 Corvette", "/shop"],
            ["Services", "/services"],
            ["Race Builds", "/about"],
          ]} />
          <FooterCol title="Company" links={[
            ["About", "/about"],
            ["Our Shop", "/about"],
            ["Careers", "/contact"],
            ["Contact", "/contact"],
          ]} />
          <div>
            <p className="eyebrow">Visit the Shop</p>
            <address className="not-italic mt-6 text-sm text-muted-foreground leading-relaxed">
              1420 Pit Lane Drive<br />
              Charlotte, NC 28217<br />
              <a href="tel:+17045550110" className="text-foreground hover:text-race-red transition-colors">+1 (704) 555 0110</a>
            </address>
            <p className="eyebrow mt-8">Hours</p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Mon – Fri · 8:00 – 18:00<br />
              Sat · By appointment<br />
              Sun · Closed
            </p>
          </div>
        </div>

        <div className="mt-20 hairline-t pt-8 grid gap-4 md:grid-cols-[1fr_auto] items-center">
          <p className="text-xs text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} Tway Motorsports. All rights reserved. Built by racers.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-6 space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Eyebrow({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={accent ? "h-px w-8 bg-race-red" : "h-px w-8 bg-foreground/40"} />
      <span className="eyebrow">{children}</span>
    </div>
  );
}