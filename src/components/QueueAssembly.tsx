import { useEffect, useRef, useState } from "react";
import { ClipboardList, ShieldCheck, PackageCheck, AlarmClock } from "lucide-react";

const CHIPS = [
  { icon: ClipboardList, label: "Orders", from: "top-left" },
  { icon: ShieldCheck, label: "Compliance", from: "top-right" },
  { icon: PackageCheck, label: "Packs", from: "bottom-left" },
  { icon: AlarmClock, label: "Expiries", from: "bottom-right" },
] as const;

const OFFSETS: Record<string, string> = {
  "top-left": "translate(-140px, -100px)",
  "top-right": "translate(140px, -100px)",
  "bottom-left": "translate(-140px, 100px)",
  "bottom-right": "translate(140px, 100px)",
};

export function QueueAssembly() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [play, setPlay] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { setPlay(true); obs.disconnect(); }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto" style={{ width: "100%", maxWidth: 520, height: 320 }}>
      {CHIPS.map((c, i) => {
        const Icon = c.icon;
        const settled = reduced || play;
        return (
          <div
            key={c.label}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transition: "transform 700ms ease-out, opacity 500ms ease-out",
              transitionDelay: `${i * 80}ms`,
              transform: settled
                ? `translate(-50%, -50%) translate(0, ${(i - 1.5) * 46}px)`
                : `translate(-50%, -50%) ${OFFSETS[c.from]}`,
              opacity: settled ? 1 : 0,
            }}
          >
            <div
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm bg-white"
              style={{ border: "1px solid var(--navy-100)", boxShadow: "0 6px 20px rgba(16, 24, 63, 0.06)" }}
            >
              <Icon size={16} strokeWidth={1.5} color="var(--navy)" />
              <span style={{ color: "var(--navy)" }}>{c.label}</span>
            </div>
          </div>
        );
      })}
      <div
        className="absolute inset-x-8 top-1/2 -translate-y-1/2 rounded-2xl"
        style={{
          height: 220,
          border: "1px dashed var(--navy-100)",
          background: "rgba(16, 24, 63, 0.02)",
          opacity: play ? 1 : 0,
          transition: "opacity 500ms ease-out 400ms",
          pointerEvents: "none",
        }}
      >
        <div className="absolute -top-3 left-4 px-2 text-xs" style={{ background: "var(--paper)", color: "var(--navy-500)" }}>
          Action queue
        </div>
      </div>
    </div>
  );
}
