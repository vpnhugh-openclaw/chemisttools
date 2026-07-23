import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CTABand } from "@/components/CTABand";

export const Route = createFileRoute("/getting-started")({
  head: () => ({
    meta: [
      { title: "Getting started — Chemist Care Tools" },
      { name: "description", content: "Four steps to a live portal. Set up your portal, load your knowledge, switch on your workflows, start every shift on Today." },
      { property: "og:title", content: "Getting started — Chemist Care Tools" },
      { property: "og:description", content: "Four steps to a live pharmacy portal." },
    ],
  }),
  component: Page,
});

const STEPS = [
  { n: "01", title: "Set up your portal", body: "We create your workspace, brand it with your logo and colours, and connect it to your dispensing system.", when: "Day 1" },
  { n: "02", title: "Load your knowledge", body: "Store guide starter templates plus any SOPs and policies you already have. Staff-contributed drafts, reviewed by the pharmacist.", when: "Day 2" },
  { n: "03", title: "Switch on your workflows", body: "Special orders, deliveries, DAA planner, staged supply, approvals. Turn on the ones that fit. Add the rest as they earn their place.", when: "Week 1" },
  { n: "04", title: "Start every shift on Today", body: "Staff open one screen. The action queue tells them what to do. Everything else feeds it.", when: "Week 2 and forever" },
];

function Page() {
  return (
    <div style={{ background: "var(--paper)" }}>
      <Navbar />
      <main className="pt-28 md:pt-32">
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 pb-8">
          <Reveal><div className="eyebrow mb-3">Getting started</div></Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)" }} className="max-w-3xl">
              Live in days. Not months.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-[var(--navy-700)] prose-measure">
              You keep your dispensing system, your packing software, and your wholesaler portals. This is the layer that connects them.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <div className="space-y-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="card-surface p-6 md:p-8 flex flex-col md:flex-row gap-6">
                  <div className="md:w-40 shrink-0">
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 44, color: "var(--navy)", lineHeight: 1 }}>
                      {s.n}
                    </div>
                    <div className="mt-1 eyebrow">{s.when}</div>
                  </div>
                  <div className="flex-1">
                    <h3 style={{ fontSize: 26 }}>{s.title}</h3>
                    <p className="mt-3 text-[var(--navy-700)]">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <CTABand heading="Live in a week. Walked through in an hour." sub="Book a walkthrough and we'll map your rollout." />
      <Footer />
    </div>
  );
}
