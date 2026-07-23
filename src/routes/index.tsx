import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ActionQueueDemo } from "@/components/demos/ActionQueueDemo";
import { AskDemo } from "@/components/demos/AskDemo";
import { ComplianceDemo } from "@/components/demos/ComplianceDemo";
import { QueueAssembly } from "@/components/QueueAssembly";
import { CountUp } from "@/components/CountUp";
import { CTABand } from "@/components/CTABand";
import { StatusBadge } from "@/components/StatusBadge";
import { MODULE_GROUPS, MODULES, modulesByGroup, siteConfig } from "@/lib/siteConfig";
import { ArrowRight, Building2, Beaker } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chemist Care Tools — Run every pharmacy like your best pharmacy" },
      { name: "description", content: "One staff portal for tasks, orders, packs, compliance, and stock. Built by pharmacists running two Melbourne pharmacies." },
      { property: "og:title", content: "Chemist Care Tools — Run every pharmacy like your best pharmacy" },
      { property: "og:description", content: "One staff portal for tasks, orders, packs, compliance, and stock. Built by pharmacists running two Melbourne pharmacies." },
      {
        // JSON-LD Organization
        // Rendered via meta hack: we output as script below instead.
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Chemist Care Tools",
          url: `https://${siteConfig.brand.domain}`,
          areaServed: "AU",
          slogan: "Run every pharmacy like your best pharmacy.",
          email: siteConfig.brand.contactEmail,
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div style={{ background: "var(--paper)" }}>
      <Navbar overHero />
      <Hero />

      {/* Visibility problem + queue assembly */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <QueueAssembly />
          </div>
          <div>
            <Reveal>
              <div className="eyebrow mb-3">The problem</div>
            </Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}>
                Pharmacy work is scattered. One queue puts it back in view.
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4 text-[17px] text-[var(--navy-700)] prose-measure">
              <Reveal delay={160}>
                <p>
                  Pharmacy work is visible only to whoever did it. Orders, checks, credentials, and expiries live in notebooks, folders, and memory.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p>
                  Knowledge lives in the most senior person's head, and staff interrupt the pharmacist to get at it.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <p>
                  From 1 October 2026, community pharmacies transition from QCPP to QSPP accreditation under AS85000:2024. Most pharmacies will re-paper their quality systems in spreadsheets and folders. Chemist Care Tools gives them one register, one audit calendar, and one readiness view instead.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Action queue demo */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 pb-24">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="eyebrow mb-3">The action queue</div>
            </Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
                Every module feeds one screen.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-[var(--navy-700)] prose-measure">
                Today shows what needs attention across orders, packs, compliance, stock, and staff. Staff open one screen and start working. Nothing sits in a folder waiting to be remembered.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <Link to="/product/today" className="inline-flex mt-6 items-center gap-1.5 text-sm font-semibold text-[var(--navy)]">
                See the Today module <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-3">
            <Reveal>
              <ActionQueueDemo />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Module groups */}
      <section id="module-groups" className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-24">
        <Reveal>
          <div className="eyebrow mb-3">The modules</div>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }} className="max-w-3xl">
            One product. Four groups. Sixteen modules.
          </h2>
        </Reveal>
        <div className="mt-14 space-y-16">
          {MODULE_GROUPS.map((g) => (
            <div key={g.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
                <div>
                  <div className="eyebrow mb-1">{g.name}</div>
                  <h3 style={{ fontSize: 24 }}>{g.description}</h3>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {modulesByGroup(g.name).map((m, i) => (
                  <Reveal key={m.slug} delay={i * 80}>
                    <Link
                      to="/product/$slug"
                      params={{ slug: m.slug }}
                      className="card-surface block p-5 h-full transition-colors hover:bg-[var(--navy-50)]"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--navy)" }}>
                          {m.name}
                        </div>
                        <StatusBadge status={m.status} />
                      </div>
                      <p className="text-sm text-[var(--navy-700)]">{m.description}</p>
                      <div className="mt-4 text-xs font-semibold text-[var(--navy)] inline-flex items-center gap-1">
                        Explore <ArrowRight size={12} strokeWidth={1.5} />
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ask demo */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-24">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Reveal><AskDemo /></Reveal>
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Reveal><div className="eyebrow mb-3">Knowledge & Ask</div></Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
                A grounded assistant that answers from your own documents.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-[var(--navy-700)] prose-measure">
                Ask reads your store guide, SOPs, and clinical calculators. Every answer cites the source. Named after your pharmacy: staff at Example Pharmacy talk to Example Assist.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 text-sm text-[var(--navy-500)] prose-measure">{siteConfig.disclaimers.ai}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-24">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-2">
            <Reveal><div className="eyebrow mb-3">Compliance & QSPP readiness</div></Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
                One register, one audit calendar, one readiness view.
              </h2>
            </Reveal>
            <div className="mt-6 space-y-3 text-[var(--navy-700)] prose-measure">
              <Reveal delay={160}>
                <p>From 1 October 2026, community pharmacies transition from QCPP to QSPP under AS85000:2024.</p>
              </Reveal>
              <Reveal delay={240}>
                <p>Most pharmacies will re-paper their quality systems in spreadsheets and folders.</p>
              </Reveal>
              <Reveal delay={320}>
                <p>Governance replaces that with a live register, a scheduled audit programme, credential tracking, and a readiness view mapped to the four domains of the standard.</p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-3">
            <Reveal><ComplianceDemo /></Reveal>
          </div>
        </div>
      </section>

      {/* Reference pharmacies */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-24">
        <Reveal><div className="eyebrow mb-3">Reference pharmacies</div></Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }} className="max-w-3xl">
            Built and used daily across two working Melbourne pharmacies.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <Reveal>
            <div className="card-surface p-6 h-full">
              <div className="flex items-center gap-2 mb-3 text-[var(--navy-500)] text-xs">
                <Building2 size={14} strokeWidth={1.5} /> High-volume night chemist
              </div>
              <h3 style={{ fontSize: 22 }}>Proven in a high-volume night chemist in Melbourne's west.</h3>
              <ul className="mt-5 space-y-2 text-sm text-[var(--navy-700)]">
                <li>Six-day trading, extended hours, three pharmacists on the floor.</li>
                <li>Live stock pipeline against the dispensing system, reconciled to till figures.</li>
                <li>Special orders, deliveries, and DAA planner all feed the same Today queue.</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-surface p-6 h-full">
              <div className="flex items-center gap-2 mb-3 text-[var(--navy-500)] text-xs">
                <Beaker size={14} strokeWidth={1.5} /> Specialist compounding
              </div>
              <h3 style={{ fontSize: 22 }}>Proven in a specialist compounding pharmacy in Camberwell.</h3>
              <ul className="mt-5 space-y-2 text-sm text-[var(--navy-700)]">
                <li>Compounding suite built inside the pharmacy that runs on it every day.</li>
                <li>30 dosage forms, ingredient-level costing, calibrated make-times.</li>
                <li>Quotes to dispatch tracked on one lifecycle, not three whiteboards.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <section style={{ background: "var(--navy-50)" }}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: 16, s: "modules" },
              { n: 2, s: "working pharmacies" },
              { n: 18, s: "audited calculators" },
              { n: 100, s: "% Australian-hosted", suffix: "%" },
            ].map((t) => (
              <Reveal key={t.s}>
                <div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 44, color: "var(--navy)" }}>
                    {t.suffix ? <CountUp to={t.n} /> : <CountUp to={t.n} />}
                    {t.suffix && "%"}
                  </div>
                  <div className="mt-1 text-sm text-[var(--navy-500)]">{t.s.replace("%", "")}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Condensed pricing */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-24">
        <Reveal><div className="eyebrow mb-3">Pricing</div></Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }} className="max-w-3xl">
            Two plans. Add-ons for the workflows unique to you.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {siteConfig.pricing.plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <div className="card-surface p-6 h-full">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 style={{ fontSize: 26 }}>{p.name}</h3>
                  <div>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "var(--navy)" }}>${p.price}</span>
                    <span className="text-sm text-[var(--navy-500)]"> /store /month</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--navy-700)]">{p.tagline}</p>
                {p.id === "governance" && (
                  <div className="inline-flex mt-3 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(199,138,26,0.10)", color: "var(--warning)" }}>
                    Recommended before October 2026
                  </div>
                )}
                <Link to="/pricing" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--navy)]">
                  See what's included <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={160}>
          <p className="mt-6 text-sm text-[var(--navy-500)]">
            Add-ons from $49. See the full breakdown on the <Link to="/pricing" className="underline">pricing page</Link>.
          </p>
        </Reveal>
      </section>

      {/* FAQ condensed */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-24">
        <Reveal><div className="eyebrow mb-3">FAQ</div></Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }} className="max-w-3xl">
            Six questions we get most often.
          </h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {HOME_FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--navy)" }}>{f.q}</div>
                <p className="mt-2 text-sm text-[var(--navy-700)]">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={240}>
          <Link to="/faq" className="inline-flex mt-8 items-center gap-1.5 text-sm font-semibold text-[var(--navy)]">
            All 20 questions <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </Reveal>
      </section>

      <CTABand
        heading="See what needs attention before anyone asks."
        sub="Book a walkthrough. We'll learn how your pharmacy runs, show the modules that fit, and tell you honestly if we're not the right tool."
      />
      <Footer />
    </div>
  );
}

const HOME_FAQ = [
  { q: "Does Chemist Care Tools replace our dispensing system?", a: "No. Dispensing, POS, and packing software stay. Chemist Care Tools is the operational layer around them." },
  { q: "How long does implementation take?", a: "Most stores are live in days, not months. Start with Today and one workflow, then switch on the rest as you go." },
  { q: "Where is our data stored?", a: "In Australia. Each pharmacy's data is isolated. Nothing is shared between pharmacies or used to train shared AI models." },
  { q: "Which dispensing systems are supported?", a: "Live pipelines against Z Dispense and APSS today. Fred NXT, Minfos, and Dispense Works are in early access." },
  { q: "Do you help us prepare for QSPP?", a: "Governance gives you the register, the audit calendar, and the readiness view. We don't accredit you. Your assessor does." },
  { q: "Can we start with one module?", a: "Yes. Core is one price for the run-the-day set. Add Governance and add-ons when they earn their place." },
];
