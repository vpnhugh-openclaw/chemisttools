import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { ScrollProgress } from "./ScrollProgress";

const CENTER_LINKS = [
  { to: "/product/today", label: "Product" },
  { to: "/pricing", label: "Pricing" },
  { to: "/getting-started", label: "Getting started" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

interface NavbarProps {
  overHero?: boolean;
}

export function Navbar({ overHero = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  const isDark = overHero && !scrolled;

  return (
    <>
      <ScrollProgress />
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-4 md:py-6 transition-all duration-300"
        style={{
          background: isDark ? "transparent" : "color-mix(in oklab, var(--paper) 92%, transparent)",
          backdropFilter: isDark ? undefined : "blur(12px)",
          WebkitBackdropFilter: isDark ? undefined : "blur(12px)",
          borderBottom: isDark ? "none" : "1px solid var(--navy-100)",
        }}
      >
        <div className="mx-auto max-w-[1200px] flex items-center justify-between gap-6">
          <Link
            to="/"
            className="animate-blur-fade-up flex items-baseline gap-1"
            style={{ animationDelay: "0ms", color: isDark ? "#fff" : "var(--navy)" }}
          >
            <span style={{ fontFamily: "var(--font-serif)" }} className="text-xl md:text-2xl leading-none">
              {siteConfig.brand.wordmarkPrimary}
            </span>
            <span className="text-sm md:text-base font-semibold tracking-wide">
              {siteConfig.brand.wordmarkSuffix}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {CENTER_LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className="animate-blur-fade-up text-sm transition-colors"
                style={{
                  animationDelay: `${100 + i * 50}ms`,
                  color: isDark ? "rgba(255,255,255,0.85)" : "var(--navy)",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/book-walkthrough"
              className={
                isDark
                  ? "rounded-full px-4 py-2 text-sm font-semibold bg-white text-[var(--navy)] hover:bg-white/90 transition-colors animate-blur-fade-up"
                  : "rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors animate-blur-fade-up"
              }
              style={{
                animationDelay: "400ms",
                background: isDark ? undefined : "var(--crimson)",
              }}
            >
              Book a walkthrough
            </Link>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className={
              isDark
                ? "lg:hidden liquid-glass rounded-full p-2.5"
                : "lg:hidden rounded-full p-2.5 border border-[var(--navy-100)] bg-[var(--paper)] text-[var(--navy)]"
            }
          >
            <span className="relative block w-5 h-5">
              <Menu
                className="absolute inset-0 transition-all duration-500 ease-out"
                strokeWidth={1.5}
                style={{
                  opacity: open ? 0 : 1,
                  transform: open ? "rotate(180deg) scale(0.5)" : "rotate(0) scale(1)",
                }}
              />
              <X
                className="absolute inset-0 transition-all duration-500 ease-out"
                strokeWidth={1.5}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "rotate(0) scale(1)" : "rotate(-180deg) scale(0.5)",
                }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className="fixed left-0 right-0 z-40 lg:hidden transition-all duration-500 ease-out"
        style={{
          top: "72px",
          background: "color-mix(in oklab, var(--navy) 95%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-16px)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="px-4 sm:px-6 py-4 flex flex-col">
          {CENTER_LINKS.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3 px-3 rounded-md text-white/90 hover:bg-white/5 transition-colors"
              style={{
                transitionDelay: open ? `${i * 50}ms` : "0ms",
              }}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 pt-4 border-t border-white/10 flex flex-col gap-2 sm:hidden">

            <Link
              to="/book-walkthrough"
              className="py-3 px-3 rounded-md text-white text-center font-semibold"
              style={{ background: "var(--crimson)" }}
            >
              Book a walkthrough
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
