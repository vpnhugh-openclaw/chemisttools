import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Calendar, UserCheck } from "lucide-react";
import { BrowserFrame, PortalShell } from "../BrowserFrame";

const AUDITS = [
  { d: "M", label: "Premises", state: "done" },
  { d: "T", label: "Infection", state: "done" },
  { d: "W", label: "Security", state: "due" },
  { d: "T", label: "Module", state: "upcoming" },
  { d: "F", label: "Fridge", state: "upcoming" },
];

export function ComplianceDemo() {
  const [approved, setApproved] = useState(false);
  const [readiness, setReadiness] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            let v = 0;
            const target = 82;
            const id = setInterval(() => {
              v += 3;
              if (v >= target) {
                setReadiness(target);
                clearInterval(id);
              } else {
                setReadiness(v);
              }
            }, 24);
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (readiness / 100) * circumference;

  return (
    <div ref={ref}>
      <BrowserFrame caption="Live portal UI. Styled to your pharmacy's branding when deployed.">
        <PortalShell title="Compliance">
          <div className="eyebrow mb-1">Compliance</div>
          <h3 style={{ fontSize: 22, margin: "0 0 16px" }}>Ready for the audit that walks in tomorrow.</h3>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="card-surface p-4">
              <div className="flex items-center gap-2 mb-2 text-[var(--navy-500)] text-xs">
                <UserCheck size={14} strokeWidth={1.5} /> Credential
              </div>
              <div className="text-sm font-semibold">AHPRA registration</div>
              <div className="text-xs text-[var(--navy-500)]">S. Nguyen · expires in 21 days</div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setApproved(true)}
                  disabled={approved}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-colors disabled:opacity-70"
                  style={{ background: approved ? "var(--success)" : "var(--navy)" }}
                >
                  {approved ? "Approved" : "Approve renewal"}
                </button>
                <button className="rounded-full px-3 py-1.5 text-xs border border-[var(--navy-100)] text-[var(--navy)]">
                  Request document
                </button>
              </div>
            </div>

            <div className="card-surface p-4 flex items-center gap-4">
              <div className="relative w-[110px] h-[110px] shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="44" stroke="var(--navy-100)" strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    stroke="var(--navy)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.4s ease-out" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "var(--navy)", lineHeight: 1 }}>
                    {readiness}%
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--navy-500)] mt-1">Readiness</div>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1.5 mb-1 text-[var(--navy-500)] text-xs">
                  <ShieldCheck size={14} strokeWidth={1.5} /> QSPP
                </div>
                <div className="font-semibold">On track for October 2026.</div>
                <div className="text-xs text-[var(--navy-500)] mt-1">Governance · 3 items overdue.</div>
              </div>
            </div>
          </div>

          <div className="card-surface p-4 mt-3">
            <div className="flex items-center gap-2 mb-3 text-[var(--navy-500)] text-xs">
              <Calendar size={14} strokeWidth={1.5} /> Audit calendar · this week
            </div>
            <div className="grid grid-cols-5 gap-2">
              {AUDITS.map((a, i) => (
                <div
                  key={i}
                  className="rounded-md p-2 text-center border"
                  style={{
                    borderColor: "var(--navy-100)",
                    background: a.state === "due" ? "rgba(199,138,26,0.10)" : "var(--white)",
                  }}
                >
                  <div className="text-[10px] uppercase tracking-wider text-[var(--navy-500)]">{a.d}</div>
                  <div className="text-xs font-semibold mt-1" style={{ color: "var(--navy)" }}>{a.label}</div>
                  <div
                    className="text-[10px] mt-1"
                    style={{
                      color:
                        a.state === "done"
                          ? "var(--success)"
                          : a.state === "due"
                            ? "var(--warning)"
                            : "var(--navy-500)",
                    }}
                  >
                    {a.state === "done" ? "Signed" : a.state === "due" ? "Due" : "Scheduled"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PortalShell>
      </BrowserFrame>
    </div>
  );
}
