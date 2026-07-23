import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Building2, MapPin, Shield, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const SCENES = [
  {
    headline: "Run every pharmacy like your best pharmacy.",
    subline:
      "One staff portal and one action queue for tasks, orders, packs, compliance, and stock. Built by pharmacists who run their own.",
  },
  {
    headline: "See what needs attention before anyone asks.",
    subline: "Every module feeds one queue. Staff open one screen and start working.",
  },
  {
    headline: "Ready for QSPP before October.",
    subline: "One register, one audit calendar, one readiness view for the new standard.",
  },
];

export function Hero() {
  const [scene, setScene] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const listener = () => setReduced(m.matches);
    m.addEventListener("change", listener);
    return () => m.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => cycle(1), 8000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, paused, scene]);

  const cycle = (dir: 1 | -1) => {
    setFading(true);
    setTimeout(() => {
      setScene((s) => (s + dir + SCENES.length) % SCENES.length);
      setFading(false);
    }, 400);
  };

  const scrollToModules = () => {
    const el = document.getElementById("module-groups");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const current = SCENES[scene];

  return (
    <section
      className="relative isolate overflow-hidden text-white"
      style={{ minHeight: "100svh", background: "var(--navy)", display: "flex", flexDirection: "column" }}
    >
      {!reduced && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={siteConfig.hero.videoUrl}
          poster={siteConfig.hero.posterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {/* Navy grade */}
      <div className="absolute inset-0 z-[1]" style={{ background: "rgba(16, 24, 63, 0.55)" }} />
      {/* Bottom blur overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none hero-bottom-blur" style={{ background: "rgba(16, 24, 63, 0.15)" }} />

      <div className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-10 md:pb-16 pt-32 mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
          <div className={`flex-1 min-w-0 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 animate-blur-fade-up" style={{ animationDelay: "300ms" }}>
              <MetaChip icon={Building2} label="Proven in 2 working pharmacies" />
              <MetaChip icon={MapPin} label="Melbourne, Australia" />
              <MetaChip icon={Shield} label="Data hosted in Australia" />
            </div>

            <h1
              className="animate-blur-fade-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white"
              style={{ animationDelay: "400ms", letterSpacing: "-0.02em", maxWidth: "18ch" }}
            >
              {current.headline}
            </h1>

            <p
              className="mt-5 animate-blur-fade-up text-base sm:text-lg md:text-xl max-w-2xl"
              style={{ animationDelay: "500ms", color: "rgba(255,255,255,0.75)" }}
            >
              {current.subline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/book-walkthrough"
                className="animate-blur-fade-up inline-flex items-center gap-2 rounded-full bg-white text-[var(--navy)] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
                style={{ animationDelay: "600ms" }}
              >
                Book a walkthrough <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <button
                onClick={scrollToModules}
                className="liquid-glass animate-blur-fade-up rounded-full px-5 py-3 text-sm font-semibold"
                style={{ animationDelay: "700ms" }}
              >
                See the modules
              </button>
            </div>
          </div>

          <div className="flex md:flex-col items-end gap-2">
            <button
              aria-label="Previous scene"
              onClick={() => { setPaused(true); cycle(-1); }}
              onMouseLeave={() => setPaused(false)}
              className="liquid-glass animate-blur-fade-up rounded-full p-3"
              style={{ animationDelay: "800ms" }}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Next scene"
              onClick={() => { setPaused(true); cycle(1); }}
              onMouseLeave={() => setPaused(false)}
              className="liquid-glass animate-blur-fade-up rounded-full p-3"
              style={{ animationDelay: "900ms" }}
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {!reduced && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <ChevronDown size={24} strokeWidth={1.5} className="animate-drift" style={{ color: "rgba(255,255,255,0.5)" }} />
        </div>
      )}
    </section>
  );
}

function MetaChip({ icon: Icon, label }: { icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-white">
      <Icon size={16} strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}
