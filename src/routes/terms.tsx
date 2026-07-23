import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Chemist Care Tools" },
      { name: "description", content: "Terms of use for Chemist Care Tools." },
    ],
  }),
  component: () => (
    <div style={{ background: "var(--paper)" }}>
      <Navbar />
      <main className="pt-28 md:pt-32 mx-auto max-w-[800px] px-4 sm:px-6 md:px-12 pb-24">
        <div className="eyebrow mb-3">Terms</div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>Terms of use.</h1>
        <p className="mt-6 text-[var(--navy-700)]">
          By using Chemist Care Tools you agree to the terms available in your service agreement. Subscriptions run month to month with no lock-in contract and 30 days notice to cancel. Data hosted in Australia. Full patient clinical records are not required or held by Chemist Care Tools.
        </p>
        <p className="mt-4 text-[var(--navy-700)]">
          Chemist Care Tools supports pharmacist judgement. It does not replace it. AI answers are generated from your pharmacy's own documents and should be verified before acting.
        </p>
        <p className="mt-4 text-[var(--navy-700)]">
          For the full service agreement, contact <a href="mailto:support@chemistcare.com.au" className="underline">support@chemistcare.com.au</a>.
        </p>
      </main>
      <Footer />
    </div>
  ),
});
