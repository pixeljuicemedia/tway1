import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logoAsset from "@/assets/tway-logo-darkbg.png.asset.json";
import { CartDrawer } from "@/components/cart-drawer";
import { useCartSync } from "@/hooks/use-cart-sync";
import { useCatalogFacets, GEN_META } from "@/hooks/use-catalog-facets";
const logo = logoAsset.url;

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const shopMenu = {
  generations: [
    { label: "C5 Corvette", years: "1997 – 2004", hash: "C5" },
    { label: "C6 Corvette", years: "2005 – 2013", hash: "C6" },
    { label: "C7 Corvette", years: "2014 – 2019", hash: "C7" },
    { label: "C8 Stingray", years: "2020 – Present", hash: "C8" },
    { label: "C8 Z06", years: "2023 – Present", hash: "Z06" },
    { label: "C8 E-Ray", years: "2024 – Present", hash: "E-Ray" },
  ],
  categories: [
    "Aero",
    "Suspension",
    "Brakes",
    "Wheels",
    "Interior",
    "Engine",
    "Exterior",
  ],
  featured: [
    { label: "Best Sellers", hash: "best-sellers" },
    { label: "New Arrivals", hash: "new-arrivals" },
    { label: "Track Essentials", hash: "track-essentials" },
  ],
} as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="container-wide pt-4 md:pt-5 flex items-center gap-3">
        {/* Floating pill: logo + nav */}
        <div className="flex-1 min-w-0 flex items-center gap-6 md:gap-10 rounded-lg bg-background/60 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20 pl-5 pr-6 md:pl-6 md:pr-8 h-11 md:h-12">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Tway Motorsports" className="h-7 md:h-8 w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center justify-center gap-10 flex-1">
            {nav.slice(1).map((n) =>
              n.to === "/shop" ? (
                <ShopMenu key={n.to} />
              ) : (
                <Link
                  key={n.to}
                  to={n.to}
                  className="font-display text-[15px] font-semibold tracking-wide text-white/90 hover:text-white transition-colors"
                  activeProps={{ className: "text-white" }}
                >
                  {n.label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Search + Quote */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <form
            role="search"
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              const q = searchInput.trim();
              if (!q) return;
              navigate({ to: "/search", search: { q } });
            }}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search parts…"
              className="h-11 md:h-12 w-44 lg:w-56 rounded-lg bg-background/60 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20 pl-10 pr-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors"
            />
          </form>
          <Link
            to="/contact"
            className="h-11 md:h-12 inline-flex items-center rounded-lg bg-foreground text-background px-5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors"
          >
            Request Quote
          </Link>
          <CartDrawer />
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden h-11 w-11 grid place-items-center rounded-lg bg-background/60 backdrop-blur-xl border border-white/10"
        >
          <div className="flex flex-col gap-1">
            <span className="block h-px w-4 bg-white" />
            <span className="block h-px w-4 bg-white" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden mt-3 mx-4 rounded-2xl bg-background/90 backdrop-blur-xl border border-white/10">
          <div className="p-6 flex flex-col gap-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-display text-sm font-semibold tracking-[0.18em] uppercase text-white"
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

function ShopMenu() {
  const [open, setOpen] = useState(false);
  const { generations, categories, loading } = useCatalogFacets();
  const genList = generations.map((key) => ({
    hash: key,
    label: GEN_META[key]?.label ?? key,
    years: GEN_META[key]?.years ?? "",
  }));
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to="/shop"
        className="font-display text-[15px] font-semibold tracking-wide text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5"
        activeProps={{ className: "text-white" }}
      >
        Shop
        <svg aria-hidden viewBox="0 0 24 24" className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {open && (
        <>
          {/* Bridge so hover doesn't drop between trigger and panel */}
          <div aria-hidden className="absolute left-1/2 -translate-x-1/2 top-full h-4 w-[640px]" />
          <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.75rem)] w-[640px] rounded-xl bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 p-6 animate-fade-in">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-8">
              {/* Generations */}
              <div>
                <p className="eyebrow text-race-red">Shop by Generation</p>
                <ul className="mt-4 space-y-2.5">
                  {shopMenu.generations.map((g) => (
                    <li key={g.hash}>
                      <Link
                        to="/category"
                        search={{ gen: g.hash, cat: "All", sort: "Featured" }}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between gap-3"
                      >
                        <span className="font-display text-[15px] font-semibold text-white group-hover:text-race-red transition-colors">
                          {g.label}
                        </span>
                        <span className="text-[10px] font-display uppercase tracking-widest text-muted-foreground">
                          {g.years}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <p className="eyebrow">Categories</p>
                <ul className="mt-4 space-y-2.5">
                  {shopMenu.categories.map((c) => (
                    <li key={c}>
                      <Link
                        to="/category"
                        search={{ gen: "All", cat: c, sort: "Featured" }}
                        onClick={() => setOpen(false)}
                        className="font-display text-[15px] font-semibold text-white/85 hover:text-race-red transition-colors"
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured */}
              <div>
                <p className="eyebrow">Featured</p>
                <ul className="mt-4 space-y-2.5">
                  {shopMenu.featured.map((f) => (
                    <li key={f.hash}>
                      <Link
                        to="/category"
                        search={{ gen: "All", cat: "All", sort: "Featured" }}
                        onClick={() => setOpen(false)}
                        className="font-display text-[15px] font-semibold text-white/85 hover:text-race-red transition-colors"
                      >
                        {f.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 hairline-t pt-4">
                  <Link
                    to="/shop"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-widest text-white hover:text-race-red transition-colors"
                  >
                    View All Parts
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
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
              210 W Katella Ave, Ste B<br />
              Orange, CA 92867<br />
              <a href="tel:+17144101820" className="text-foreground hover:text-race-red transition-colors">(714) 410-1820</a>
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
  useCartSync();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 pt-24 md:pt-28">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Eyebrow({ children, accent = false, className = "" }: { children: ReactNode; accent?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={accent ? "h-px w-8 bg-race-red" : "h-px w-8 bg-foreground/40"} />
      <span className="eyebrow">{children}</span>
    </div>
  );
}