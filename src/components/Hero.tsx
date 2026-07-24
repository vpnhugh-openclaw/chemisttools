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

// Headline split into words, each rising from behind a mask with a stagger.
function KineticHeadline({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${text}-${i}`} className="word-mask">
          <span className="word-rise" style={{ animationDelay: `${350 + i * 70}ms` }}>
            {word}
          </span>
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const [scene, setScene] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const listener = () => setReduced(m.matches);
    m.addEventListener("change", listener);
    return () => m.removeEventListener("change", listener);
  }, []);

  // Parallax: the video drifts slower than the page while the hero scrolls out.
  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    const video = videoRef.current;
    if (!video) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, window.innerHeight);
      video.style.transform = `translateY(${y * 0.28}px) scale(1.08)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

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

  const goTo = (i: number) => {
    if (i === scene) return;
    setPaused(true);
    setFading(true);
    setTimeout(() => {
      setScene(i);
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
      ref={sectionRef}
      className="relative isolate overflow-hidden text-white grain"
      style={{ minHeight: "100svh", background: "var(--navy)", display: "flex", flexDirection: "column" }}
    >
      {/* Designed fallback: shows while the video loads, if it fails,
          and for reduced-motion visitors. Never a flat colour. */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(90% 80% at 70% 15%, #1c2657 0%, var(--navy) 55%, var(--navy-900) 100%)",
        }}
      />
      <img
        src={siteConfig.hero.posterUrl}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ transform: "scale(1.08)" }}
        loading="eager"
        fetchPriority="high"
      />

      {!reduced && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            transform: "scale(1.08)",
            willChange: "transform",
            opacity: videoReady ? 1 : 0,
            transition: "opacity 1.2s ease-out",
          }}
          src={siteConfig.hero.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
        />
      )}

      {/* Cinematic grade: vignette + bottom anchor instead of a flat wash */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(10,16,48,0.88) 0%, rgba(16,24,63,0.35) 45%, rgba(16,24,63,0.45) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(120% 90% at 50% 10%, transparent 55%, rgba(10,16,48,0.55) 100%)",
        }}
      />
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
              key={scene}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white"
              style={{ letterSpacing: "-0.02em", maxWidth: "18ch" }}
            >
              {reduced ? current.headline : <KineticHeadline text={current.headline} />}
            </h1>

            <p
              key={`sub-${scene}`}
              className="mt-5 animate-blur-fade-up text-base sm:text-lg md:text-xl max-w-2xl"
              style={{ animationDelay: "700ms", color: "rgba(255,255,255,0.78)" }}
            >
              {current.subline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/book-walkthrough"
                className="animate-blur-fade-up inline-flex items-center gap-2 rounded-full bg-white text-[var(--navy)] px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)]"
                style={{ animationDelay: "850ms" }}
              >
                Book a walkthrough <ArrowRight size={16} strokeWidth={1.5} className="cta-arrow" />
              </Link>
              <button
                onClick={scrollToModules}
                className="liquid-glass animate-blur-fade-up rounded-full px-6 py-3.5 text-sm font-semibold"
                style={{ animationDelay: "950ms" }}
              >
                See the modules
              </button>
            </div>

            {/* Scene indicator dots */}
            <div className="mt-8 flex items-center gap-2 animate-blur-fade-up" style={{ animationDelay: "1050ms" }}>
              {SCENES.map((s, i) => (
                <button
                  key={s.headline}
                  aria-label={`Scene ${i + 1}`}
                  onClick={() => goTo(i)}
                  onMouseLeave={() => setPaused(false)}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === scene ? 28 : 8,
                    height: 8,
                    background: i === scene ? "#fff" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
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
