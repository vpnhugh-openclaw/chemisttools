import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { submitLead, type LeadPayload } from "@/lib/leads";
import { MODULES, siteConfig } from "@/lib/siteConfig";

export const Route = createFileRoute("/book-walkthrough")({
  head: () => ({
    meta: [
      { title: "Book a walkthrough — Chemist Care Tools" },
      { name: "description", content: "Book a workflow walkthrough. We'll learn how your pharmacy runs and show the modules that fit." },
      { property: "og:title", content: "Book a walkthrough — Chemist Care Tools" },
      { property: "og:description", content: "A short qualification wizard, then a walkthrough with the builders." },
    ],
  }),
  component: BookWalkthrough,
});

const ROLES = ["Pharmacy owner", "Pharmacist in charge", "Pharmacist manager", "Pharmacist", "Operations or admin", "Group or franchise management", "Other"];
const STORE_COUNTS = ["1", "2-3", "4-10", "10+"];
const DISPENSE = ["Fred NXT", "Z Dispense", "Minfos", "Dispense Works", "Other", "Not sure"];
const AREAS = [
  { id: "today", label: "Today & daily operations" },
  { id: "knowledge", label: "Knowledge & Ask" },
  { id: "compliance", label: "Compliance & QSPP" },
  { id: "special-orders", label: "Special orders" },
  { id: "daa-planner", label: "DAA planner" },
  { id: "staged-supply", label: "Staged supply" },
  { id: "pbs-intelligence", label: "PBS intelligence" },
  { id: "loyalty", label: "Loyalty & offers" },
  { id: "expiries", label: "Expiries" },
  { id: "stock-locations", label: "Stock locations" },
  { id: "connected-stores", label: "Connected stores" },
  { id: "compounding", label: "Compounding" },
];
const INTERRUPTS = ["Rarely", "A few times per day", "Constantly"] as const;
const KNOWLEDGE = ["Very little", "Some", "A lot", "Most of it"] as const;
const TIMELINES = ["This month", "Within 3 months", "Within 6 months", "Just researching"];

interface State {
  name: string;
  pharmacy_name: string;
  email: string;
  phone: string;
  role: string;
  store_count: string;
  dispense_software: string;
  consent: boolean;
  modules: string[];
  priority: string;
  interrupts: (typeof INTERRUPTS)[number] | "";
  procedureConfidence: number;
  knowledgeDependency: (typeof KNOWLEDGE)[number] | "";
  daa: boolean;
  multi: boolean;
  compounding: boolean;
  challenge: string;
  success_12m: string;
  timeline: string;
}

const initialState: State = {
  name: "",
  pharmacy_name: "",
  email: "",
  phone: "",
  role: "",
  store_count: "",
  dispense_software: "",
  consent: false,
  modules: [],
  priority: "",
  interrupts: "",
  procedureConfidence: 3,
  knowledgeDependency: "",
  daa: false,
  multi: false,
  compounding: false,
  challenge: "",
  success_12m: "",
  timeline: "",
};

function BookWalkthrough() {
  const [step, setStep] = useState(1);
  const [s, setS] = useState<State>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 7;

  const rec = useMemo(() => computeRecommendation(s), [s]);

  function update<K extends keyof State>(k: K, v: State[K]) {
    setS((p) => ({ ...p, [k]: v }));
  }

  function validateStep(): boolean {
    const e: Record<string, string> = {};
    if (step === 2) {
      if (!s.name.trim()) e.name = "Please enter your name.";
      if (!s.pharmacy_name.trim()) e.pharmacy_name = "Please enter your pharmacy name.";
      if (!s.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email)) e.email = "Please enter a valid email address.";
      if (!s.phone.trim()) e.phone = "Please enter a phone number.";
      if (!s.role) e.role = "Please choose your role.";
      if (!s.store_count) e.store_count = "Please choose the number of pharmacies.";
      if (!s.dispense_software) e.dispense_software = "Please choose your dispense software.";
      if (!s.consent) e.consent = "Please confirm consent to continue.";
    }
    if (step === 5) {
      if (!s.challenge.trim()) e.challenge = "Please describe your biggest challenge.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function nextStep() {
    if (!validateStep()) return;
    if (step === 2 && s.email && s.consent) {
      // save partial lead
      try {
        await submitLead(baseLead(s, false, rec));
      } catch { /* ignore */ }
    }
    setStep((p) => Math.min(totalSteps, p + 1));
  }

  function prevStep() {
    setErrors({});
    setStep((p) => Math.max(1, p - 1));
  }

  async function finish() {
    setSubmitting(true);
    try {
      await submitLead(baseLead(s, true, rec));
      setSubmitted(true);
    } catch (e) {
      setErrors({ submit: e instanceof Error ? e.message : "Something went wrong. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ background: "var(--paper)" }}>
      <Navbar />
      <main className="pt-28 md:pt-32 pb-24">
        <section className="mx-auto max-w-[840px] px-4 sm:px-6 md:px-12">
          <div className="eyebrow mb-3">Book a walkthrough</div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)" }} className="max-w-2xl">
            Seven short questions. One walkthrough.
          </h1>

          <div className="mt-8">
            <div className="h-1 rounded-full" style={{ background: "var(--navy-100)" }}>
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{ background: "var(--navy)", width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-[var(--navy-500)]">Step {step} of {totalSteps}</div>
          </div>

          <div className="card-surface p-6 md:p-8 mt-6 transition-all duration-300">
            {submitted ? (
              <div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--navy)", color: "#fff" }}>
                  <Check size={22} strokeWidth={1.5} />
                </div>
                <h2 style={{ fontSize: 28 }}>Thanks. We'll be in touch.</h2>
                <p className="mt-3 text-[var(--navy-700)]">A real human replies within one business day. In the meantime, you can email us at <a href={`mailto:${siteConfig.brand.contactEmail}`} className="underline">{siteConfig.brand.contactEmail}</a>.</p>
              </div>
            ) : (
              <>
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 s={s} update={update} errors={errors} />}
                {step === 3 && <Step3 s={s} update={update} />}
                {step === 4 && <Step4 s={s} update={update} />}
                {step === 5 && <Step5 s={s} update={update} errors={errors} />}
                {step === 6 && <Step6 s={s} update={update} />}
                {step === 7 && <Step7 s={s} rec={rec} />}

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm border border-[var(--navy-100)] disabled:opacity-40"
                  >
                    <ArrowLeft size={16} strokeWidth={1.5} /> Back
                  </button>
                  {step < totalSteps ? (
                    <button
                      onClick={nextStep}
                      className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                      style={{ background: "var(--navy)" }}
                    >
                      Continue <ArrowRight size={16} strokeWidth={1.5} />
                    </button>
                  ) : (
                    <button
                      onClick={finish}
                      disabled={submitting}
                      className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                      style={{ background: "var(--crimson)" }}
                    >
                      {submitting ? "Sending..." : "Book my walkthrough"} <ArrowRight size={16} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
                {errors.submit && <p className="mt-3 text-sm text-[var(--crimson)]">{errors.submit}</p>}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function baseLead(s: State, completed: boolean, rec: Recommendation): LeadPayload {
  return {
    type: "walkthrough",
    name: s.name,
    email: s.email,
    phone: s.phone,
    pharmacy_name: s.pharmacy_name,
    role: s.role,
    store_count: s.store_count,
    dispense_software: s.dispense_software,
    modules: s.modules,
    priority: s.priority,
    snapshot: {
      interrupts: s.interrupts,
      procedureConfidence: s.procedureConfidence,
      knowledgeDependency: s.knowledgeDependency,
      daa: s.daa,
      multi: s.multi,
      compounding: s.compounding,
    },
    challenge: s.challenge,
    success_12m: s.success_12m,
    timeline: s.timeline,
    score: rec.score,
    recommendation: rec as unknown as Record<string, unknown>,
    consent: s.consent,
    completed,
  };
}

interface Recommendation {
  plan: "Core" | "Business Optimiser";
  addons: string[];
  price: number;
  score: number;
}

function computeRecommendation(s: State): Recommendation {
  const interruptScore = s.interrupts === "Constantly" ? 2 : s.interrupts === "A few times per day" ? 1 : 0;
  const procScore = 5 - (s.procedureConfidence || 3);
  const knowledgeScore = { "Very little": 0, "Some": 1, "A lot": 2, "Most of it": 3 }[s.knowledgeDependency || "Some"] ?? 1;
  const score = interruptScore + procScore + knowledgeScore;
  const plan: "Core" | "Business Optimiser" = score >= 4 ? "Business Optimiser" : "Core";

  const addons: string[] = ["pbs-intelligence"];
  if (s.daa && !addons.includes("daa-planner")) addons.push("daa-planner");
  if (s.multi) addons.push("connected-stores");
  if (s.compounding) addons.push("compounding");

  const planPrice = plan === "Business Optimiser" ? 199 : 99;
  const addonPrice = addons.reduce((sum, id) => {
    const a = siteConfig.pricing.addons.find((x) => x.id === id);
    return sum + (a?.price ?? 0);
  }, 0);

  return { plan, addons, price: planPrice + addonPrice, score };
}

/* --------------------------- Step components ---------------------------- */

function Step1() {
  return (
    <div>
      <h2 style={{ fontSize: 26 }}>Book a workflow walkthrough.</h2>
      <p className="mt-4 text-[var(--navy-700)]">
        We'll learn how your pharmacy runs, show the modules that fit, and tell you honestly if we're not the right tool.
      </p>
      <ul className="mt-5 space-y-2 text-sm text-[var(--navy-700)]">
        <li>7 short questions. Around 3 minutes.</li>
        <li>A real human replies within one business day.</li>
        <li>No sales script. We're pharmacists.</li>
      </ul>
    </div>
  );
}

function Step2({ s, update, errors }: { s: State; update: <K extends keyof State>(k: K, v: State[K]) => void; errors: Record<string, string> }) {
  return (
    <div>
      <h2 style={{ fontSize: 24 }}>Tell us who you are.</h2>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <TextInput label="Your name" value={s.name} onChange={(v) => update("name", v)} error={errors.name} required />
        <TextInput label="Pharmacy name" value={s.pharmacy_name} onChange={(v) => update("pharmacy_name", v)} error={errors.pharmacy_name} required />
        <TextInput label="Email" type="email" value={s.email} onChange={(v) => update("email", v)} error={errors.email} required />
        <TextInput label="Phone" type="tel" value={s.phone} onChange={(v) => update("phone", v)} error={errors.phone} required />
        <SelectInput label="Role" value={s.role} onChange={(v) => update("role", v)} options={ROLES} error={errors.role} required />
        <SelectInput label="Number of pharmacies" value={s.store_count} onChange={(v) => update("store_count", v)} options={STORE_COUNTS} error={errors.store_count} required />
        <SelectInput label="Dispense software" value={s.dispense_software} onChange={(v) => update("dispense_software", v)} options={DISPENSE} error={errors.dispense_software} required />
      </div>
      <label className="mt-6 flex items-start gap-3 text-sm cursor-pointer">
        <input type="checkbox" className="mt-1" checked={s.consent} onChange={(e) => update("consent", e.target.checked)} />
        <span className="text-[var(--navy-700)]">
          I'm happy for Chemist Care Tools to contact me about a walkthrough using these details.
        </span>
      </label>
      {errors.consent && <p className="mt-2 text-sm text-[var(--crimson)]">{errors.consent}</p>}
    </div>
  );
}

function Step3({ s, update }: { s: State; update: <K extends keyof State>(k: K, v: State[K]) => void }) {
  const toggle = (id: string) => {
    const next = s.modules.includes(id) ? s.modules.filter((x) => x !== id) : [...s.modules, id];
    update("modules", next);
    if (!next.includes(s.priority)) update("priority", "");
  };
  return (
    <div>
      <h2 style={{ fontSize: 24 }}>Which areas matter most?</h2>
      <p className="mt-2 text-sm text-[var(--navy-500)]">Choose all that apply.</p>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {AREAS.map((a) => {
          const on = s.modules.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              className="text-left px-4 py-3 rounded-md text-sm transition-colors"
              style={{
                background: on ? "var(--navy)" : "var(--white)",
                color: on ? "#fff" : "var(--navy)",
                border: `1px solid ${on ? "var(--navy)" : "var(--navy-100)"}`,
              }}
            >
              {a.label}
            </button>
          );
        })}
      </div>
      {s.modules.length > 0 && (
        <div className="mt-6">
          <SelectInput
            label="Which is your biggest priority right now?"
            value={s.priority}
            onChange={(v) => update("priority", v)}
            options={s.modules.map((id) => AREAS.find((a) => a.id === id)!.label)}
          />
        </div>
      )}
    </div>
  );
}

function Step4({ s, update }: { s: State; update: <K extends keyof State>(k: K, v: State[K]) => void }) {
  return (
    <div>
      <h2 style={{ fontSize: 24 }}>A quick operational snapshot.</h2>
      <div className="mt-6 space-y-6">
        <RadioGroup
          label="How often are staff interrupting the pharmacist for a question?"
          options={INTERRUPTS as unknown as string[]}
          value={s.interrupts}
          onChange={(v) => update("interrupts", v as State["interrupts"])}
        />
        <div>
          <label className="block text-sm font-medium mb-2">
            How confident are you that opening and closing procedures happen consistently?
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => update("procedureConfidence", n)}
                className="w-10 h-10 rounded-md text-sm font-semibold transition-colors"
                style={{
                  background: s.procedureConfidence === n ? "var(--navy)" : "var(--white)",
                  color: s.procedureConfidence === n ? "#fff" : "var(--navy)",
                  border: "1px solid var(--navy-100)",
                }}
              >
                {n}
              </button>
            ))}
            <span className="ml-3 text-sm text-[var(--navy-500)]">1 = never · 5 = always</span>
          </div>
        </div>
        <RadioGroup
          label="If your most experienced staff member left tomorrow, how much knowledge would leave with them?"
          options={KNOWLEDGE as unknown as string[]}
          value={s.knowledgeDependency}
          onChange={(v) => update("knowledgeDependency", v as State["knowledgeDependency"])}
        />
        <div className="grid sm:grid-cols-3 gap-4">
          <YesNo label="DAA services?" value={s.daa} onChange={(v) => update("daa", v)} />
          <YesNo label="Multiple locations?" value={s.multi} onChange={(v) => update("multi", v)} />
          <YesNo label="Compounding services?" value={s.compounding} onChange={(v) => update("compounding", v)} />
        </div>
      </div>
    </div>
  );
}

function Step5({ s, update, errors }: { s: State; update: <K extends keyof State>(k: K, v: State[K]) => void; errors: Record<string, string> }) {
  return (
    <div>
      <h2 style={{ fontSize: 24 }}>What is the biggest operational challenge?</h2>
      <div className="mt-6">
        <label className="block text-sm font-medium mb-1.5">Your biggest challenge <span className="text-[var(--crimson)]">*</span></label>
        <textarea
          rows={5}
          value={s.challenge}
          onChange={(e) => update("challenge", e.target.value)}
          className="w-full rounded-md border border-[var(--navy-100)] bg-white px-3 py-2.5 text-sm"
        />
        {errors.challenge && <p className="mt-1 text-sm text-[var(--crimson)]">{errors.challenge}</p>}
      </div>
      <div className="mt-5">
        <label className="block text-sm font-medium mb-1.5">What would make this a clear win in 12 months?</label>
        <textarea
          rows={4}
          value={s.success_12m}
          onChange={(e) => update("success_12m", e.target.value)}
          className="w-full rounded-md border border-[var(--navy-100)] bg-white px-3 py-2.5 text-sm"
        />
      </div>
    </div>
  );
}

function Step6({ s, update }: { s: State; update: <K extends keyof State>(k: K, v: State[K]) => void }) {
  return (
    <div>
      <h2 style={{ fontSize: 24 }}>When do you want this live?</h2>
      <div className="mt-6 grid sm:grid-cols-2 gap-2">
        {TIMELINES.map((t) => {
          const on = s.timeline === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => update("timeline", t)}
              className="text-left px-4 py-3 rounded-md text-sm"
              style={{
                background: on ? "var(--navy)" : "var(--white)",
                color: on ? "#fff" : "var(--navy)",
                border: `1px solid ${on ? "var(--navy)" : "var(--navy-100)"}`,
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step7({ s, rec }: { s: State; rec: Recommendation }) {
  const recModuleNames = rec.addons
    .map((id) => MODULES.find((m) => m.slug === id)?.name || siteConfig.pricing.addons.find((a) => a.id === id)?.name)
    .filter(Boolean);
  return (
    <div>
      <div className="eyebrow mb-3">Founding pharmacy programme</div>
      <h2 style={{ fontSize: 26 }}>Early pricing locked in for 24 months.</h2>
      <p className="mt-4 text-[var(--navy-700)]">
        Founding pharmacies get a direct line to the builders and input on the roadmap. Pricing does not move for 24 months from your go-live date.
      </p>

      <div className="mt-6 card-surface p-6" style={{ background: "var(--navy-50)" }}>
        <div className="eyebrow mb-2">Based on what you told us</div>
        <div className="flex items-baseline justify-between mb-3">
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, color: "var(--navy)" }}>
            {rec.plan} plan
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "var(--navy)" }}>${rec.price}</span>
            <span className="text-sm text-[var(--navy-500)]"> /store /month</span>
          </div>
        </div>
        <ul className="text-sm text-[var(--navy-700)] space-y-1">
          <li className="flex gap-2"><Check size={16} strokeWidth={1.5} color="var(--navy)" /> {rec.plan === "Business Optimiser" ? "Everything in Core plus Compliance & QSPP readiness" : "The run-the-day set: Today, Operations, Knowledge & Ask, Orders, DAA, Stock and more"}</li>
          {recModuleNames.map((name) => (
            <li key={name} className="flex gap-2"><Check size={16} strokeWidth={1.5} color="var(--navy)" /> {name}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-[var(--navy-500)]">
          {s.name ? `${s.name.split(" ")[0]}, ` : ""}this is a starting recommendation. We'll refine it in the walkthrough.
        </p>
      </div>
    </div>
  );
}

/* -------------------------- Field primitives --------------------------- */

function TextInput({ label, value, onChange, type = "text", required, error }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; error?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}{required && <span className="text-[var(--crimson)]"> *</span>}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[var(--navy-100)] bg-white px-3 py-2.5 text-sm"
      />
      {error && <p className="mt-1 text-xs text-[var(--crimson)]">{error}</p>}
    </div>
  );
}

function SelectInput({ label, value, onChange, options, required, error }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean; error?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}{required && <span className="text-[var(--crimson)]"> *</span>}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[var(--navy-100)] bg-white px-3 py-2.5 text-sm"
      >
        <option value="">Choose...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p className="mt-1 text-xs text-[var(--crimson)]">{error}</p>}
    </div>
  );
}

function RadioGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="block text-sm font-medium mb-2">{label}</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
        {options.map((o) => {
          const on = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className="text-left px-3 py-2.5 rounded-md text-sm"
              style={{
                background: on ? "var(--navy)" : "var(--white)",
                color: on ? "#fff" : "var(--navy)",
                border: `1px solid ${on ? "var(--navy)" : "var(--navy-100)"}`,
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function YesNo({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div>
      <div className="block text-sm font-medium mb-2">{label}</div>
      <div className="flex gap-2">
        {[true, false].map((v) => {
          const on = value === v;
          return (
            <button
              key={String(v)}
              type="button"
              onClick={() => onChange(v)}
              className="flex-1 px-3 py-2 rounded-md text-sm"
              style={{
                background: on ? "var(--navy)" : "var(--white)",
                color: on ? "#fff" : "var(--navy)",
                border: `1px solid ${on ? "var(--navy)" : "var(--navy-100)"}`,
              }}
            >
              {v ? "Yes" : "No"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
