import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function CTABand({ heading, sub, children }: { heading: string; sub?: string; children?: ReactNode }) {
  return (
    <section style={{ background: "var(--navy)", color: "#fff" }}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-20 md:py-24 text-center">
        <h2 className="text-white" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>{heading}</h2>
        {sub && <p className="mt-4 text-white/75 max-w-2xl mx-auto">{sub}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/book-walkthrough"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-white text-[var(--navy)] hover:bg-white/90 transition-colors"
          >
            Book a walkthrough <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
          <Link
            to="/pricing"
            className="liquid-glass rounded-full px-5 py-3 text-sm font-semibold"
          >
            See pricing
          </Link>
          {children}
        </div>
      </div>
    </section>
  );
}
