import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/siteConfig";
import { submitLead } from "@/lib/leads";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Chemist Care Tools" },
      { name: "description", content: "Talk to the team. Email or send us a message." },
      { property: "og:title", content: "Contact — Chemist Care Tools" },
      { property: "og:description", content: "Get in touch with the Chemist Care Tools team." },
    ],
  }),
  component: Page,
});

function Page() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const payload = {
      type: "contact" as const,
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      pharmacy_name: String(fd.get("pharmacy") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      consent: true,
      completed: true,
    };
    if (!payload.email || !payload.message) {
      setState("error");
      setErr("Email and message are required.");
      return;
    }
    try {
      await submitLead(payload);
      setState("sent");
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Something went wrong. Try again.");
    }
  }

  return (
    <div style={{ background: "var(--paper)" }}>
      <Navbar />
      <main className="pt-28 md:pt-32">
        <section className="mx-auto max-w-[900px] px-4 sm:px-6 md:px-12 pb-8">
          <Reveal><div className="eyebrow mb-3">Contact</div></Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Talk to a real human.</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-[var(--navy-700)] prose-measure">
              Email <a href={`mailto:${siteConfig.brand.contactEmail}`} className="underline">{siteConfig.brand.contactEmail}</a> or send us a message. We reply within one business day.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[900px] px-4 sm:px-6 md:px-12 py-12">
          <div className="card-surface p-6 md:p-8">
            {state === "sent" ? (
              <div>
                <h2 style={{ fontSize: 24 }}>Thanks. Message received.</h2>
                <p className="mt-3 text-[var(--navy-700)]">A real human replies within one business day.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <Field label="Your name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Pharmacy name" name="pharmacy" />
                <div>
                  <label className="block text-sm font-medium mb-1.5" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full rounded-md border border-[var(--navy-100)] bg-white px-3 py-2.5 text-sm"
                  />
                </div>
                {state === "error" && <p className="text-sm text-[var(--crimson)]">{err}</p>}
                <button
                  disabled={state === "sending"}
                  className="rounded-full px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                  style={{ background: "var(--crimson)" }}
                >
                  {state === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" htmlFor={name}>{label}{required && <span className="text-[var(--crimson)]"> *</span>}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-[var(--navy-100)] bg-white px-3 py-2.5 text-sm"
      />
    </div>
  );
}
