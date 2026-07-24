import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function CTABand({ heading, sub, children }: { heading: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden grain" style={{ background: "var(--navy)", color: "#fff" }}>
      {/* Aurora glow */}
      <div
        className="aurora-blob"
        style={{ width: 520, height: 520, top: "-40%", left: "8%", background: "rgba(192,57,43,0.28)" }}
      />
      <div
        className="aurora-blob"
        style={{ width: 460, height: 460, bottom: "-50%", right: "10%", background: "rgba(90,98,133,0.35)", animationDelay: "-9s" }}
      />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-20 md:py-28 text-center">
        <Reveal>
          <h2 className="text-white mx-auto" style={{ fontSize: "clamp(28px, 4vw, 48px)", maxWidth: "22ch" }}>{heading}</h2>
        </Reveal>
        {sub && (
          <Reveal delay={120}>
            <p className="mt-4 text-white/75 max-w-2xl mx-auto">{sub}</p>
          </Reveal>
        )}
        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/book-walkthrough"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold bg-white text-[var(--navy)] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)]"
            >
              Book a walkthrough <ArrowRight size={16} strokeWidth={1.5} className="cta-arrow" />
            </Link>
            <Link
              to="/pricing"
              className="liquid-glass rounded-full px-6 py-3.5 text-sm font-semibold"
            >
              See pricing
            </Link>
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
