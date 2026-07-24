import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CTABand } from "@/components/CTABand";
import { StatusBadge } from "@/components/StatusBadge";
import { MODULES } from "@/lib/siteConfig";
import { Building2, Beaker } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Chemist Care Tools" },
      { name: "description", content: "Developed by real community pharmacists who run their own stores. The operator story, honest roadmap, and reference sites." },
      { property: "og:title", content: "About — Chemist Care Tools" },
      { property: "og:description", content: "Developed by real community pharmacists who run their own stores." },
    ],
  }),
  component: About,
});

function About() {
  const available = MODULES.filter((m) => m.status === "available");
  const early = MODULES.filter((m) => m.status === "early-access");
  return (
    <div style={{ background: "var(--paper)" }}>
      <Navbar />
      <main className="pt-28 md:pt-32">
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 pb-8">
          <Reveal><div className="eyebrow mb-3">About</div></Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", maxWidth: "18ch" }}>
              Built by pharmacists. Used in our own stores every day.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-[var(--navy-700)] prose-measure">
              Chemist Care Tools was born on the dispensary floor, not in a slide deck. We are community pharmacists who run our own stores and a portfolio of pharmacy data tools. What did not exist as a product, we built for ourselves. What worked, we kept.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal>
              <div className="card-surface p-6 h-full">
                <div className="flex items-center gap-2 mb-3 text-[var(--navy-500)] text-xs">
                  <Building2 size={14} strokeWidth={1.5} /> High-volume night chemist
                </div>
                <h3 style={{ fontSize: 24 }}>Melbourne's west.</h3>
                <p className="mt-3 text-sm text-[var(--navy-700)]">
                  Six-day trading, extended hours, high foot traffic. Every module tested against the reality of a busy retail dispensary.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="card-surface p-6 h-full">
                <div className="flex items-center gap-2 mb-3 text-[var(--navy-500)] text-xs">
                  <Beaker size={14} strokeWidth={1.5} /> Specialist compounding
                </div>
                <h3 style={{ fontSize: 24 }}>Camberwell.</h3>
                <p className="mt-3 text-sm text-[var(--navy-700)]">
                  Compounding pharmacy pricing 30 dosage forms daily. Every calibration in the compounding suite comes from real production.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <Reveal><div className="eyebrow mb-3">Roadmap</div></Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>Honest about what ships when.</h2>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div>
              <div className="eyebrow mb-3">Available now</div>
              <ul className="space-y-2">
                {available.map((m) => (
                  <li key={m.slug} className="flex items-center gap-2 text-sm">
                    <StatusBadge status={m.status} />
                    <span className="font-medium">{m.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-3">Early access</div>
              <ul className="space-y-2">
                {early.map((m) => (
                  <li key={m.slug} className="flex items-center gap-2 text-sm">
                    <StatusBadge status={m.status} />
                    <span className="font-medium">{m.name}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[var(--navy-500)]">
                In pilot at our own pharmacies. Join the early access list from the walkthrough.
              </p>
            </div>
          </div>
        </section>
      </main>
      <CTABand heading="Meet the people who built it, running the pharmacies that use it." />
      <Footer />
    </div>
  );
}
