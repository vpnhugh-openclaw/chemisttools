import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Chemist Care Tools" },
      { name: "description", content: "How Chemist Care Tools collects, uses, and protects information." },
    ],
  }),
  component: () => (
    <div style={{ background: "var(--paper)" }}>
      <Navbar />
      <main className="pt-28 md:pt-32 mx-auto max-w-[800px] px-4 sm:px-6 md:px-12 pb-24">
        <div className="eyebrow mb-3">Privacy</div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>Privacy.</h1>
        <p className="mt-6 text-[var(--navy-700)]">
          Chemist Care Tools collects and processes information under the Australian Privacy Principles. We store operational and business data submitted by pharmacies using our platform. Personal information collected via this website (name, email, phone, pharmacy details) is used to respond to enquiries and provide the platform.
        </p>
        <p className="mt-4 text-[var(--navy-700)]">
          Data is stored in Australia. It is never shared between pharmacies and never used to train shared AI models. Marketing sender is kept separate from operational notifications. Contact <a href="mailto:hugh@burkeroadpharmacy.com.au" className="underline">hugh@burkeroadpharmacy.com.au</a> to request access, correction, or deletion of your information.
        </p>
      </main>
      <Footer />
    </div>
  ),
});
