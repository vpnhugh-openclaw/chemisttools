import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { StatusBadge } from "@/components/StatusBadge";
import { CTABand } from "@/components/CTABand";
import { ActionQueueDemo } from "@/components/demos/ActionQueueDemo";
import { AskDemo } from "@/components/demos/AskDemo";
import { ComplianceDemo } from "@/components/demos/ComplianceDemo";
import { findModule, MODULES } from "@/lib/siteConfig";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const m = findModule(params.slug);
    if (!m) return { meta: [{ title: "Module — Chemist Care Tools" }] };
    return {
      meta: [
        { title: `${m.name} — Chemist Care Tools` },
        { name: "description", content: m.description },
        { property: "og:title", content: `${m.name} — Chemist Care Tools` },
        { property: "og:description", content: m.description },
      ],
    };
  },
  component: ModulePage,
  notFoundComponent: () => <div className="p-24 text-center">Module not found.</div>,
});

function ModulePage() {
  const { slug } = Route.useParams();
  const m = findModule(slug);
  if (!m) throw notFound();

  const Demo =
    m.slug === "today"
      ? ActionQueueDemo
      : m.slug === "knowledge"
        ? AskDemo
        : m.slug === "compliance"
          ? ComplianceDemo
          : null;

  return (
    <div style={{ background: "var(--paper)" }}>
      <Navbar />
      <main className="pt-28 md:pt-32">
        {/* Header */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 pb-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="eyebrow">{m.eyebrow}</div>
              <StatusBadge status={m.status} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", maxWidth: "18ch" }}>{m.h1}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-[var(--navy-700)] prose-measure">{m.description}</p>
          </Reveal>
          {m.status === "early-access" && (
            <Reveal delay={240}>
              <p className="mt-4 text-sm text-[var(--warning)]">
                In pilot at our own pharmacies. Join the early access list.
              </p>
            </Reveal>
          )}
        </section>

        {/* Before / With */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal>
              <div className="card-surface p-6" style={{ background: "var(--navy-50)" }}>
                <div className="eyebrow mb-3">{m.before.title}</div>
                <ul className="space-y-3">
                  {m.before.rows.map((r) => (
                    <li key={r} className="flex gap-3 text-[var(--navy-700)]">
                      <Minus size={18} strokeWidth={1.5} className="shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="card-surface p-6" style={{ background: "var(--navy)", color: "#fff" }}>
                <div className="eyebrow mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>{m.with.title}</div>
                <ul className="space-y-3">
                  {m.with.rows.map((r) => (
                    <li key={r} className="flex gap-3 text-white/90">
                      <Check size={18} strokeWidth={1.5} className="shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Demo or mockup */}
        {Demo && (
          <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
            <Reveal><Demo /></Reveal>
          </section>
        )}

        {/* Features */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-16">
          <Reveal><div className="eyebrow mb-3">What you get</div></Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }} className="max-w-3xl">
              The features that make this module worth the seat.
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {m.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="card-surface p-5 h-full">
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--navy)" }}>{f.title}</div>
                  <p className="mt-2 text-sm text-[var(--navy-700)]">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Feeds queue strip */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <Reveal>
            <div className="card-surface p-6" style={{ background: "var(--navy-50)" }}>
              <div className="eyebrow mb-3">Feeds the action queue</div>
              <div className="flex flex-wrap gap-2">
                {m.queue.map((q) => (
                  <span
                    key={q}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-sm"
                    style={{ border: "1px solid var(--navy-100)", color: "var(--navy)" }}
                  >
                    {q}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-[var(--navy-500)]">
                Every module surfaces the items above on the portal home. Staff open Today and start working.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Pricing note */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="eyebrow mb-1">Pricing</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, color: "var(--navy)" }}>{m.pricingNote}</div>
              </div>
              <Link to="/pricing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--navy)]">
                See full pricing <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <Reveal><div className="eyebrow mb-3">Common questions</div></Reveal>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            {m.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--navy)" }}>{f.q}</div>
                  <p className="mt-2 text-sm text-[var(--navy-700)]">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Other modules */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <div className="eyebrow mb-4">More modules</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MODULES.filter((x) => x.slug !== m.slug).slice(0, 4).map((o) => (
              <Link
                key={o.slug}
                to="/product/$slug"
                params={{ slug: o.slug }}
                className="card-surface p-4 text-sm hover:bg-[var(--navy-50)] transition-colors"
              >
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--navy)" }}>{o.name}</div>
                <div className="mt-1 text-xs text-[var(--navy-500)]">{o.eyebrow}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <CTABand
        heading="See this in a working pharmacy."
        sub="Book a walkthrough. We'll show you how it runs in ours."
      />
      <Footer />
    </div>
  );
}
