import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CTABand } from "@/components/CTABand";
import { siteConfig } from "@/lib/siteConfig";
import { ShieldCheck, Server, Lock, FileLock2 } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — Chemist Care Tools" },
      { name: "description", content: "Data hosted in Australia, per-pharmacy isolation, role-based access, AI grounded only in your own documents." },
      { property: "og:title", content: "Security — Chemist Care Tools" },
      { property: "og:description", content: "How Chemist Care Tools handles your pharmacy's data." },
    ],
  }),
  component: Page,
});

const POINTS = [
  { icon: Server, title: "Australian hosting", body: "Your data is stored in Australia. It never leaves." },
  { icon: Lock, title: "Per-pharmacy isolation", body: "Each pharmacy's data is isolated. Nothing is shared between pharmacies." },
  { icon: FileLock2, title: "Role-based access", body: "Every action carries a name and a timestamp. Access is scoped by role." },
  { icon: ShieldCheck, title: "Grounded AI, your documents only", body: "Ask reads only your published documents. Your data is never used to train shared models." },
];

function Page() {
  return (
    <div style={{ background: "var(--paper)" }}>
      <Navbar />
      <main className="pt-28 md:pt-32">
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 pb-8">
          <Reveal><div className="eyebrow mb-3">Security</div></Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)" }} className="max-w-3xl">
              Your data stays yours. Stored in Australia.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-[var(--navy-700)] prose-measure">{siteConfig.disclaimers.data}</p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12">
          <div className="grid sm:grid-cols-2 gap-4">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="card-surface p-6 h-full">
                  <p.icon size={22} strokeWidth={1.5} color="var(--navy)" />
                  <h3 className="mt-3" style={{ fontSize: 22 }}>{p.title}</h3>
                  <p className="mt-2 text-sm text-[var(--navy-700)]">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-12 space-y-8">
          <Reveal>
            <div>
              <h2 style={{ fontSize: 28 }}>What we hold</h2>
              <p className="mt-3 text-[var(--navy-700)] prose-measure">
                Operational records: tasks, orders, packs, deliveries, staged supply schedules, credentials, incidents, and store knowledge. Stock on hand read from your dispensing system. Approval documents you upload. Full patient clinical records are not required.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <h2 style={{ fontSize: 28 }}>Subprocessors</h2>
              <p className="mt-3 text-[var(--navy-700)] prose-measure">
                We share the minimum data required with named providers for SMS and email delivery. Providers are named in your workspace settings and are configurable. Marketing sender is separate from operational notifications.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <h2 style={{ fontSize: 28 }}>AI</h2>
              <p className="mt-3 text-[var(--navy-700)] prose-measure">{siteConfig.disclaimers.ai}</p>
            </div>
          </Reveal>
        </section>
      </main>
      <CTABand heading="Have a specific data question? Book a walkthrough." />
      <Footer />
    </div>
  );
}
