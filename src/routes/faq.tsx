import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CTABand } from "@/components/CTABand";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Chemist Care Tools" },
      { name: "description", content: "Twenty questions about Chemist Care Tools: getting started, fit, day-to-day, AI, PBS, multi-store, pricing, security." },
      { property: "og:title", content: "FAQ — Chemist Care Tools" },
      { property: "og:description", content: "Twenty questions we get most often." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Page,
});

const GROUPS: { name: string; items: { q: string; a: string }[] }[] = [
  {
    name: "Getting started",
    items: [
      { q: "How long does implementation take?", a: "Most stores are live in days. Start with Today and one workflow, then switch on the rest as you go." },
      { q: "Do we need new hardware?", a: "No. Any modern browser on the counter's computer or a tablet is enough." },
      { q: "Do we replace our dispensing system?", a: "No. Dispensing, POS, and packing software stay. Chemist Care Tools is the operational layer around them." },
    ],
  },
  {
    name: "Fit",
    items: [
      { q: "Is this a good fit for a single independent?", a: "Yes. Core is designed to run one shop. Add-ons switch on where they earn their place." },
      { q: "Is this a good fit for a group of pharmacies?", a: "Yes. Each store keeps its own workspace. Connected stores adds group-wide visibility. Groups get custom pricing." },
      { q: "Is this a good fit for compounding pharmacies?", a: "Yes. Compounding suite is built inside a working compounding pharmacy and covers 30 dosage forms." },
    ],
  },
  {
    name: "Day-to-day",
    items: [
      { q: "What does a staff member see when they log in?", a: "The Today screen: tasks, orders, packs, and the action queue for their role. Everything else lives one click away." },
      { q: "Can locums pick this up quickly?", a: "Yes. The store guide, patient notes on DAA, and staged supply patterns give locums the context they need at the counter." },
      { q: "Can staff use it on a phone?", a: "Yes. The portal is responsive. Delivery drivers can also mark stops as complete on their phone." },
    ],
  },
  {
    name: "AI and knowledge",
    items: [
      { q: "Where do Ask's answers come from?", a: "Only from documents your pharmacy has uploaded and published. Every answer carries clickable citations." },
      { q: "Is my pharmacy's knowledge shared with anyone else?", a: "No. Each pharmacy's knowledge is isolated. It is not used to train shared models." },
      { q: "What if Ask does not know the answer?", a: "It says so, and offers to create a task or knowledge draft to fill the gap." },
    ],
  },
  {
    name: "PBS intelligence",
    items: [
      { q: "How is PBS intelligence different from what my POS reports?", a: "POS reports the sale. PBS intelligence reconciles the claim, the recovery, and the exposure ahead of the price change." },
      { q: "Which government file formats do you support?", a: "Barcode matching and file parsing are proven across the current PBS formats, updated as new ones ship." },
      { q: "How reconciled are the revenue figures?", a: "Within half a percent of till figures at working pharmacies. The model uses patient price plus government recovery." },
    ],
  },
  {
    name: "Multi-store",
    items: [
      { q: "Can staff see stock at sister stores?", a: "With Connected stores, yes. Read-only, with the location shown in every search." },
      { q: "Can head office publish policies once?", a: "Yes. Head office publishes. Every store reads the same version. Local edits are still allowed where you choose to permit them." },
    ],
  },
  {
    name: "Pricing",
    items: [
      { q: "Is there a setup fee?", a: "No setup fee. No lock-in contract. Cancel anytime with 30 days notice." },
      { q: "What is included in Governance?", a: "Everything in Core, plus Compliance & QSPP readiness. Recommended before October 2026." },
    ],
  },
  {
    name: "Data and security",
    items: [
      { q: "Where is our data stored?", a: "In Australia. Never shared between pharmacies. Never used to train shared AI models." },
      { q: "Do you hold full patient clinical records?", a: "No. Chemist Care Tools holds operational records and the stock, approval, and knowledge data needed to run the workflows. Full clinical records stay in your dispensing system." },
    ],
  },
];

const FAQ = GROUPS.flatMap((g) => g.items);

function Page() {
  return (
    <div style={{ background: "var(--paper)" }}>
      <Navbar />
      <main className="pt-28 md:pt-32">
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 pb-8">
          <Reveal><div className="eyebrow mb-3">FAQ</div></Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)" }} className="max-w-3xl">
              Twenty questions we get most often.
            </h1>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12 space-y-12">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.name} delay={gi * 40}>
              <div>
                <div className="eyebrow mb-4">{g.name}</div>
                <div className="card-surface divide-y divide-[var(--navy-100)]">
                  {g.items.map((it, i) => (
                    <FAQItem key={i} q={it.q} a={it.a} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </section>
      </main>
      <CTABand heading="Question we didn't answer? Book a walkthrough." />
      <Footer />
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-[var(--navy-50)] transition-colors"
        aria-expanded={open}
      >
        <span style={{ fontFamily: "var(--font-serif)", fontSize: 19, color: "var(--navy)" }}>{q}</span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          color="var(--navy-500)"
          className="transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>
      {/* Always in DOM for SEO */}
      <div className={open ? "px-5 pb-5 text-sm text-[var(--navy-700)]" : "sr-only"}>
        {a}
      </div>
    </div>
  );
}
