import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Package, Snowflake, Bell } from "lucide-react";
import { BrowserFrame, PortalShell } from "./BrowserFrame";

interface QueueItem {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  title: string;
  meta: string;
}

const INITIAL: QueueItem[] = [
  { id: "1", icon: Package, title: "3 DAA packs ready to check", meta: "Mon cycle · pharmacist sign-off" },
  { id: "2", icon: Bell, title: "Special order overdue", meta: "Mrs Nguyen · 6 days since ordered" },
  { id: "3", icon: Snowflake, title: "Fridge log due", meta: "PM check · missed by 40 min" },
  { id: "4", icon: Bell, title: "Announcement unread", meta: "Locum roster for Sat" },
];

export function ActionQueueDemo() {
  const [items, setItems] = useState<QueueItem[]>(INITIAL);
  const [removing, setRemoving] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = frameRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const tick = (id: string) => {
    setRemoving(id);
    setTimeout(() => {
      setItems((prev) => {
        const rest = prev.filter((p) => p.id !== id);
        if (rest.length === 0) return INITIAL;
        return rest;
      });
      setRemoving(null);
    }, 350);
  };

  return (
    <div ref={frameRef}>
      <BrowserFrame caption="Live portal UI. Styled to your pharmacy's branding when deployed.">
        <PortalShell title="Today">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow mb-1">Wednesday, 8 April</div>
              <h3 style={{ fontSize: 22, margin: 0 }}>Today</h3>
            </div>
            <div className="text-xs text-[var(--navy-500)]">On duty · S. Nguyen</div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-3 mb-5">
            {[
              { l: "Tasks", n: 7 },
              { l: "Orders pending", n: 12 },
              { l: "Packs to check", n: 3 },
            ].map((s) => (
              <div key={s.l} className="card-surface p-3">
                <div className="text-xs text-[var(--navy-500)]">{s.l}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, color: "var(--navy)" }}>{s.n}</div>
              </div>
            ))}
          </div>

          <div className="card-surface">
            <div className="px-4 py-2.5 border-b border-[var(--navy-100)] flex items-center justify-between">
              <div className="text-sm font-semibold">Action queue</div>
              <div className="text-xs text-[var(--navy-500)]">{items.length} items</div>
            </div>
            <ul>
              {items.map((it, i) => {
                const Icon = it.icon;
                const isRemoving = removing === it.id;
                return (
                  <li
                    key={it.id}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      i < items.length - 1 ? "border-b border-[var(--navy-100)]" : ""
                    } ${isRemoving ? "animate-slide-out" : visible ? "animate-fade-in" : "opacity-0"}`}
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <button
                      aria-label={`Complete: ${it.title}`}
                      onClick={() => tick(it.id)}
                      className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center hover:bg-[var(--navy-50)] transition-colors"
                      style={{ borderColor: "var(--navy-300)" }}
                    >
                      <CheckCircle2 size={14} strokeWidth={1.5} color="transparent" />
                    </button>
                    <span style={{ color: "var(--navy)" }}>
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{it.title}</div>
                      <div className="text-xs text-[var(--navy-500)] truncate">{it.meta}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </PortalShell>
      </BrowserFrame>
    </div>
  );
}
