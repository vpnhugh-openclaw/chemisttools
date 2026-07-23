import { useEffect, useRef, useState } from "react";
import { Sparkles, FileText, MapPin } from "lucide-react";
import { BrowserFrame, PortalShell } from "../BrowserFrame";

const ANSWER =
  "If Z Dispense is offline, switch to manual scripts using the paper log in drawer 2. Continue dispensing with pharmacist double-check on every item. Ring IT support on the number in the store guide. Reconcile the log against dispense once the system is back.";

export function AskDemo() {
  const [typed, setTyped] = useState("");
  const [showCitations, setShowCitations] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const media =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (media) {
      setTyped(ANSWER);
      setShowCitations(true);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(ANSWER.slice(0, i));
      if (i >= ANSWER.length) {
        clearInterval(id);
        setTimeout(() => setShowCitations(true), 250);
      }
    }, 25);
    return () => clearInterval(id);
  }, [started]);

  return (
    <div ref={ref}>
      <BrowserFrame caption="Live portal UI. Styled to your pharmacy's branding when deployed.">
        <PortalShell title="Knowledge">
          <div className="eyebrow mb-1">Ask Example Assist</div>
          <h3 style={{ fontSize: 22, margin: "0 0 12px" }}>Grounded answers from your documents.</h3>

          <div className="card-surface p-3 mb-3 flex items-center gap-2">
            <Sparkles size={18} strokeWidth={1.5} color="var(--navy)" />
            <div className="text-sm">Our dispense system is down, what do we do?</div>
          </div>

          <div className="card-surface p-4 min-h-[140px]">
            <div className="text-sm leading-relaxed">
              {typed}
              {typed.length < ANSWER.length && <span className="inline-block w-2 h-4 align-middle bg-[var(--navy)] ml-0.5 animate-pulse" />}
            </div>
            {showCitations && (
              <div className="mt-4 flex flex-wrap gap-2 animate-fade-in">
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: "var(--navy-100)", background: "var(--navy-50)", color: "var(--navy)" }}>
                  <FileText size={12} strokeWidth={1.5} /> Store guide: dispense outage
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: "var(--navy-100)", background: "var(--navy-50)", color: "var(--navy)" }}>
                  <FileText size={12} strokeWidth={1.5} /> IT contacts
                </span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="text-xs text-[var(--navy-500)] mb-2">Try:</div>
            <div className="card-surface p-3">
              <div className="text-sm mb-2 text-[var(--navy-700)]">Do we have Panadol Osteo 96 in stock?</div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[var(--navy-500)]">
                    <th className="pb-1 font-normal">Product</th>
                    <th className="pb-1 font-normal">On hand</th>
                    <th className="pb-1 font-normal">Location</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--navy)]">
                  <tr className="border-t border-[var(--navy-100)]">
                    <td className="py-1.5 flex items-center gap-1.5"><MapPin size={12} strokeWidth={1.5} /> Panadol Osteo 96</td>
                    <td>18</td>
                    <td>Analgesics · Bay A2</td>
                  </tr>
                  <tr className="border-t border-[var(--navy-100)]">
                    <td className="py-1.5">Panadol Osteo 96 (upstairs)</td>
                    <td>12</td>
                    <td>Warehouse · Row 3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </PortalShell>
      </BrowserFrame>
    </div>
  );
}
