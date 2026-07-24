import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CTABand } from "@/components/CTABand";
import { siteConfig, MODULES } from "@/lib/siteConfig";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Chemist Care Tools" },
      { name: "description", content: "Three plans plus add-ons, per store per month. Core $99, Business Optimiser $199, Elite $399. No setup fees, no lock-in, live in days." },
      { property: "og:title", content: "Pricing — Chemist Care Tools" },
      { property: "og:description", content: "Two plans plus add-ons for Australian community pharmacies. Live in days." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Chemist Care Tools",
          description: "Operations platform for Australian community pharmacies.",
          offers: siteConfig.pricing.plans.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.price,
            priceCurrency: "AUD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: p.price,
              priceCurrency: "AUD",
              unitText: "MONTH",
            },
          })),
        }),
      },
    ],
  }),
  component: Pricing,
});

const CORE_INCLUDES = ["today", "operations", "knowledge", "special-orders", "deliveries", "stock", "daa-planner", "staged-supply", "approvals"];
const OPTIMISER_ONLY = ["compliance"];
const ELITE_ONLY = ["pbs-intelligence", "expiries"];
const ELITE_EXTRAS = [
  "On-site AI hardware, rented and managed by us",
  "AI stock, pricing, and workflow optimisation",
  "Priority support",
];

function Pricing() {
  return (
    <div style={{ background: "var(--paper)" }}>
      <Navbar />
      <main className="pt-28 md:pt-32">
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 pb-8">
          <Reveal><div className="eyebrow mb-3">Pricing</div></Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)" }} className="max-w-3xl">
              Three plans. Add-ons for the workflows unique to you.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-[var(--navy-700)] prose-measure">
              Per store per month. No setup fees. No lock-in contracts. Cancel anytime. Live in days.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <div className="grid md:grid-cols-3 gap-5">
            {siteConfig.pricing.plans.map((p, i) => {
              const isFeatured = p.id === "business-optimiser";
              const extras = "extras" in p ? p.extras : [];
              const note = "note" in p ? p.note : undefined;
              return (
                <Reveal key={p.id} delay={i * 80}>
                  <div
                    className="card-surface p-6 md:p-8 h-full flex flex-col"
                    style={isFeatured ? { border: "1.5px solid var(--crimson)" } : undefined}
                  >
                    {isFeatured && (
                      <div className="inline-flex self-start mb-3 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(199,138,26,0.10)", color: "var(--warning)" }}>
                        Recommended before October 2026
                      </div>
                    )}
                    <h2 style={{ fontSize: 30, marginBottom: 4 }}>{p.name}</h2>
                    <p className="text-sm text-[var(--navy-700)]">{p.tagline}</p>
                    <div className="mt-5 flex items-baseline gap-1">
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: 48, color: "var(--navy)", lineHeight: 1 }}>${p.price}</span>
                      <span className="text-sm text-[var(--navy-500)]">/store/month</span>
                    </div>
                    {note && (
                      <p className="mt-4 text-sm text-[var(--navy-700)]">{note}</p>
                    )}
                    <ul className="mt-6 space-y-2 text-sm text-[var(--navy-700)]">
                      {p.includes.map((slug) => {
                        const mod = MODULES.find((m) => m.slug === slug);
                        return (
                          <li key={slug} className="flex gap-2">
                            <Check size={16} strokeWidth={1.5} className="shrink-0 mt-0.5" color="var(--navy)" />
                            <span>{mod?.name ?? slug}</span>
                          </li>
                        );
                      })}
                      {extras.map((x) => (
                        <li key={x} className="flex gap-2">
                          <Check size={16} strokeWidth={1.5} className="shrink-0 mt-0.5" color="var(--crimson)" />
                          <span className="font-medium">{x}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/book-walkthrough"
                      className="mt-8 inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold text-white"
                      style={{ background: isFeatured ? "var(--crimson)" : "var(--navy)" }}
                    >
                      Book a walkthrough
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Comparison */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <Reveal><div className="eyebrow mb-3">Compare</div></Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>Compare the plans.</h2>
          </Reveal>
          <div className="mt-8 card-surface overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: 560 }}>
              <thead>
                <tr style={{ background: "var(--navy-50)" }}>
                  <th className="text-left px-4 py-3 font-semibold">Module</th>
                  <th className="text-left px-4 py-3 font-semibold">Core</th>
                  <th className="text-left px-4 py-3 font-semibold">Business Optimiser</th>
                  <th className="text-left px-4 py-3 font-semibold">Elite</th>
                </tr>
              </thead>
              <tbody>
                {[...CORE_INCLUDES, ...OPTIMISER_ONLY, ...ELITE_ONLY].map((slug) => {
                  const m = MODULES.find((x) => x.slug === slug)!;
                  const inCore = CORE_INCLUDES.includes(slug);
                  const inOptimiser = inCore || OPTIMISER_ONLY.includes(slug);
                  const tick = <Check size={16} strokeWidth={1.5} color="var(--navy)" />;
                  const dash = <Minus size={16} strokeWidth={1.5} color="var(--navy-300)" />;
                  return (
                    <tr key={slug} className="border-t border-[var(--navy-100)]">
                      <td className="px-4 py-3 font-medium">{m.name}</td>
                      <td className="px-4 py-3">{inCore ? tick : dash}</td>
                      <td className="px-4 py-3">{inOptimiser ? tick : dash}</td>
                      <td className="px-4 py-3">{tick}</td>
                    </tr>
                  );
                })}
                {ELITE_EXTRAS.map((label) => (
                  <tr key={label} className="border-t border-[var(--navy-100)]">
                    <td className="px-4 py-3 font-medium">{label}</td>
                    <td className="px-4 py-3"><Minus size={16} strokeWidth={1.5} color="var(--navy-300)" /></td>
                    <td className="px-4 py-3"><Minus size={16} strokeWidth={1.5} color="var(--navy-300)" /></td>
                    <td className="px-4 py-3"><Check size={16} strokeWidth={1.5} color="var(--crimson)" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add-ons */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <Reveal><div className="eyebrow mb-3">Add-ons</div></Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>Switch on what you need.</h2>
          </Reveal>
          <div className="mt-8 card-surface overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--navy-50)" }}>
                  <th className="text-left px-4 py-3 font-semibold">Add-on</th>
                  <th className="text-left px-4 py-3 font-semibold">Price /store/month</th>
                </tr>
              </thead>
              <tbody>
                {siteConfig.pricing.addons.map((a) => (
                  <tr key={a.id} className="border-t border-[var(--navy-100)]">
                    <td className="px-4 py-3 font-medium">{a.name}</td>
                    <td className="px-4 py-3">{a.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 card-surface p-6">
            <div className="eyebrow mb-3">Usage</div>
            <ul className="space-y-2 text-sm text-[var(--navy-700)]">
              {siteConfig.pricing.usage.map((u) => (
                <li key={u.label}>
                  <span className="font-semibold">{u.label}:</span> {u.price}
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={80}>
            <div className="mt-6 card-surface p-6">
              <div className="eyebrow mb-2">Groups and franchises</div>
              <p className="text-sm text-[var(--navy-700)]">
                Custom pricing for groups and franchises. <Link to="/book-walkthrough" className="underline">Book a walkthrough for your group.</Link>
              </p>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-16">
          <Reveal><div className="eyebrow mb-3">Pricing FAQ</div></Reveal>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--navy)" }}>{f.q}</div>
                  <p className="mt-2 text-sm text-[var(--navy-700)]">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <CTABand heading="See it in a working pharmacy." sub="Book a walkthrough. Live pricing tailored to your setup." />
      <Footer />
    </div>
  );
}

const FAQ = [
  { q: "Is there a setup fee?", a: "No. No setup fee, no lock-in contract. Cancel anytime with 30 days notice." },
  { q: "What does the Elite hardware actually do?", a: "A small unit we install in your pharmacy that runs the AI analysis locally, against your own data. It watches stock, pricing, and workflow patterns and feeds recommendations into your portal. Rental, installation, and management are all included in the plan." },
  { q: "How long does it take to go live?", a: "Most stores are running Today and one workflow within a week. Add the rest as they earn their place." },
  { q: "What counts as a store?", a: "One trading pharmacy address. Connected stores adds visibility across sister sites." },
  { q: "How are SMS charged?", a: "$0.10 per order SMS, invoiced monthly with a per-store breakdown. Marketing email is $0.015 beyond the 5,000 monthly allowance included with Loyalty." },
  { q: "Do we need to move all our data on day one?", a: "No. Start with Today and load knowledge as you go. Modules switch on when your data is ready for them." },
];
