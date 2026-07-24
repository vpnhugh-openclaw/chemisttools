// Central marketing config for Chemist Care Tools.
// Everything marketing-critical lives here.

import heroVideoAsset from "@/assets/hero.mp4.asset.json";

export const siteConfig = {
  brand: {
    wordmarkPrimary: "Chemist Care",
    wordmarkSuffix: "Tools",
    tagline: "Run every pharmacy like your best pharmacy.",
    domain: "tools.chemistcare.com.au",
    contactEmail: "support@chemistcare.com.au",
    signInUrl: "https://tools.chemistcare.com.au/app",
    abn: "ABN 00 000 000 000",
    location: "Made in Melbourne. Data hosted in Australia.",
  },
  hero: {
    videoUrl: heroVideoAsset.url,
    posterUrl: "/hero-poster.jpg",
  },
  disclaimers: {
    qspp:
      "Chemist Care Tools is not affiliated with or endorsed by QSPP, QCPP, or the Pharmacy Guild of Australia. It helps you organise compliance work. It does not accredit or certify your pharmacy.",
    ai:
      "Chemist Care Tools supports pharmacist judgement. It does not replace it. AI answers are generated from your pharmacy's own documents and should be verified before acting.",
    data:
      "Your data is stored in Australia. It is never shared between pharmacies and never used to train shared AI models.",
  },
  pricing: {
    plans: [
      {
        id: "core",
        name: "Core",
        price: 99,
        tagline: "Everything a pharmacy needs to run the day.",
        includes: [
          "today",
          "operations",
          "knowledge",
          "special-orders",
          "deliveries",
          "stock",
          "daa-planner",
          "staged-supply",
          "approvals",
        ],
      },
      {
        id: "governance",
        name: "Governance",
        price: 199,
        tagline: "Recommended before October 2026.",
        note: "AS85000:2024 lands from 1 October 2026. Governance gives you one register, one audit calendar, one readiness view.",
        includes: [
          "today",
          "operations",
          "knowledge",
          "special-orders",
          "deliveries",
          "stock",
          "daa-planner",
          "staged-supply",
          "approvals",
          "compliance",
        ],
      },
    ],
    addons: [
      { id: "pbs-intelligence", name: "PBS intelligence", price: 99, priceLabel: "$99" },
      { id: "expiries", name: "Expiries", price: 99, priceLabel: "from $99" },
      { id: "loyalty", name: "Loyalty & local offers", price: 79, priceLabel: "$79" },
      { id: "stock-locations", name: "Stock locations", price: 49, priceLabel: "$49" },
      { id: "connected-stores", name: "Connected stores", price: 99, priceLabel: "from $99 (up to 3 stores)" },
      { id: "compounding", name: "Compounding suite", price: 149, priceLabel: "$149" },
    ],
    usage: [
      { label: "Order SMS", price: "$0.10 per message" },
      { label: "Marketing email", price: "$0.015 beyond included allowance" },
    ],
  },
} as const;

export type ModuleStatus = "available" | "early-access";
export type ModuleGroup = "Run the day" | "Clinical workflows" | "Stock and money" | "Grow and govern";

export interface ModuleDef {
  slug: string;
  name: string;
  group: ModuleGroup;
  status: ModuleStatus;
  h1: string;
  description: string;
  eyebrow: string;
  before: { title: string; rows: string[] };
  with: { title: string; rows: string[] };
  features: { title: string; body: string }[];
  queue: string[];
  pricingNote: string;
  faq: { q: string; a: string }[];
}

export const MODULES: ModuleDef[] = [
  {
    slug: "today",
    name: "Today",
    group: "Run the day",
    status: "available",
    eyebrow: "Run the day",
    h1: "One screen to start every shift.",
    description:
      "Today is the portal home. Every module feeds it. Staff open one screen and know what to do.",
    before: {
      title: "Before",
      rows: [
        "Handover notes in a spiral notebook.",
        "Announcements taped to the kettle.",
        "Fridge log on a clipboard in the dispensary.",
        "Special orders in the back of a diary.",
        "New staff learn by watching.",
      ],
    },
    with: {
      title: "With Today",
      rows: [
        "Today's tasks, orders, and packs on one screen.",
        "The action queue lists what needs attention now.",
        "Pinned announcements track who has read them.",
        "Global search covers guides, stock, and patients.",
        "One-click start-of-day print for the counter.",
      ],
    },
    features: [
      { title: "Today snapshot", body: "Tasks, orders, notes, and packs due, counted at a glance." },
      { title: "Action queue", body: "One list of what needs attention across every module." },
      { title: "Pinned announcements", body: "Post once. See who has and has not read it." },
      { title: "Global search", body: "One search bar covers store guide, stock, patients, and Ask." },
      { title: "Start-of-day print", body: "Prints the day sheet the counter actually uses." },
      { title: "Quick links tiles", body: "The tools each role opens first, one tap away." },
      { title: "Embedded Ask", body: "Type a question without leaving the home screen." },
      { title: "White-label branding", body: "Your pharmacy's logo, colours, and optional custom domain." },
    ],
    queue: ["Tasks due today", "Announcements you have not read", "Notes flagged as urgent"],
    pricingNote: "Included in Core.",
    faq: [
      { q: "Does every staff member need a login?", a: "Yes. Each role sees the queue and tools relevant to them, and every action carries a name and timestamp." },
      { q: "Does Today replace our dispensing system?", a: "No. Dispensing, POS, and packing software stay. Today is the layer that connects them and shows the work happening around them." },
    ],
  },
  {
    slug: "operations",
    name: "Operations",
    group: "Run the day",
    status: "available",
    eyebrow: "Run the day",
    h1: "Tasks, checklists, and shift handovers with owners and history.",
    description:
      "The everyday work of a pharmacy, on the record. Openings and closings that always happen. Handovers that survive the shift change.",
    before: {
      title: "Before",
      rows: [
        "Opening checklist in three different formats.",
        "'Did anyone do the fridge check?' at 4pm.",
        "Handover means shouting across the dispensary.",
        "Urgent items lost between a text and a sticky note.",
        "Recurring routines rediscovered every week.",
      ],
    },
    with: {
      title: "With Operations",
      rows: [
        "Tasks with owners, due times, and history.",
        "Opening and closing checklists that lock the day.",
        "Recurring routines that generate themselves.",
        "Handover notes stored with the shift.",
        "Urgent flag surfaces the item on Today.",
      ],
    },
    features: [
      { title: "Tasks with owners and history", body: "Who picked it up, who finished it, when, and what they said." },
      { title: "Opening and closing checklists", body: "Sign off each step. The day locks when both are done." },
      { title: "Recurring routines", body: "Weekly, monthly, or seasonal. Generated automatically." },
      { title: "Announcements with seen-tracking", body: "Post once. See who has read it. Auto-expire when done." },
      { title: "Day notes and handovers", body: "Attach to the shift, not to a person." },
      { title: "Urgent flag", body: "Escalates to the top of the Today queue immediately." },
      { title: "Attachments", body: "Photos, PDFs, or a link, kept with the task." },
      { title: "Create task from Ask", body: "Turn a question into a task without switching screens." },
    ],
    queue: ["Overdue tasks", "Opening or closing steps not done", "Announcements unread by your role"],
    pricingNote: "Included in Core.",
    faq: [
      { q: "Can we assign a task to a role instead of a person?", a: "Yes. Assign to Pharmacist on duty, Retail lead, or any custom role and the person filling that role picks it up." },
      { q: "Do we get email reminders?", a: "Optional. Off by default. Enable at the role or individual level." },
    ],
  },
  {
    slug: "knowledge",
    name: "Knowledge & Ask",
    group: "Run the day",
    status: "available",
    eyebrow: "Run the day",
    h1: "Your pharmacy's knowledge, on tap for every staff member.",
    description:
      "Store guide, SOPs, and clinical calculators, plus a grounded AI assistant that answers from your own documents and cites the source.",
    before: {
      title: "Before",
      rows: [
        "SOPs in a folder no one opens.",
        "'Ask Sarah' is the search function.",
        "New starters interrupt the pharmacist all afternoon.",
        "Store guide lives in the manager's head.",
        "Calculators printed from unknown websites.",
      ],
    },
    with: {
      title: "With Knowledge & Ask",
      rows: [
        "Store guide with draft, review, and publish.",
        "Grounded AI answers with citations you can click.",
        "18 audited clinical calculators built in.",
        "Staff-contributed drafts, reviewed by the pharmacist.",
        "Ask can create a task or an incident draft.",
      ],
    },
    features: [
      { title: "Store guide", body: "Draft, review, publish. Version history on every entry." },
      { title: "Document library", body: "SOPs, policies, and reference PDFs, searchable by page." },
      { title: "Grounded Ask", body: "Answers come from your own documents. Every claim is cited." },
      { title: "Pharmacy starter templates", body: "Common policies and procedures pre-written for community pharmacy." },
      { title: "Staff-contributed drafts", body: "Anyone can draft. Only reviewers publish." },
      { title: "Clinical calculator pack", body: "18 audited calculators: dosing, renal, conversion." },
      { title: "Ask creates work", body: "Turn a question into a task or an incident draft in one click." },
      { title: "Your pharmacy, your assistant", body: "Named after your store. Staff at Example Pharmacy talk to Example Assist." },
    ],
    queue: ["Store guide entries flagged for review", "New drafts awaiting approval"],
    pricingNote: "Included in Core.",
    faq: [
      { q: "Where do the answers come from?", a: "Only from documents your pharmacy has uploaded and published. Ask never invents facts and always shows citations." },
      { q: "Is my knowledge shared with other pharmacies?", a: "No. Each pharmacy's knowledge is isolated and never used to train shared models." },
    ],
  },
  {
    slug: "special-orders",
    name: "Special orders",
    group: "Clinical workflows",
    status: "available",
    eyebrow: "Clinical workflows",
    h1: "Every special order tracked from log to collection.",
    description:
      "One lifecycle, one contact history, one place to see what is on the shelf waiting for a patient.",
    before: {
      title: "Before",
      rows: [
        "Special orders diary with three different codes.",
        "'Did anyone call the patient?' loop.",
        "Backordered items reordered by accident.",
        "SMS threads scattered across three phones.",
        "Collections written on the bag, not the record.",
      ],
    },
    with: {
      title: "With Special orders",
      rows: [
        "Full lifecycle: logged to collected.",
        "Supplier-aware ETAs on every line.",
        "SMS on arrival, per-order message history.",
        "Not-contacted queue surfaces the ones going stale.",
        "Direct handoff to Deliveries with one tap.",
      ],
    },
    features: [
      { title: "Full lifecycle statuses", body: "Logged, needs ordering, ordered, backordered, arrived, contacted, collected or delivered." },
      { title: "Supplier-aware ETAs", body: "Uses your wholesaler cutoffs so ETAs are realistic." },
      { title: "Arrival and collection SMS", body: "Templated messages, sent from the pharmacy's number." },
      { title: "Per-order message history", body: "Every SMS and note lives on the order, not the phone." },
      { title: "Not-contacted tracking", body: "Arrived but no message sent, in one queue." },
      { title: "Quick SMS", body: "Free-text SMS on any order, logged automatically." },
      { title: "Deliveries handoff", body: "Send an order straight to today's delivery run." },
      { title: "Full audit trail", body: "Who moved it, when, and why." },
    ],
    queue: ["Orders arrived but patient not contacted", "Orders ready to collect", "Backordered items over 5 days"],
    pricingNote: "Included in Core.",
    faq: [
      { q: "Do we need to change how we place orders with wholesalers?", a: "No. Log and track the order here. Continue ordering through your wholesaler portal or dispense system." },
      { q: "How are SMS charged?", a: "$0.10 per SMS, invoiced monthly with a per-store breakdown." },
    ],
  },
  {
    slug: "deliveries",
    name: "Deliveries",
    group: "Clinical workflows",
    status: "early-access",
    eyebrow: "Clinical workflows",
    h1: "Delivery runs staff can actually finish.",
    description:
      "Named and recurring runs, ad-hoc stops, and a printable sheet the driver signs. Failed stops roll to the next run automatically.",
    before: {
      title: "Before",
      rows: [
        "Delivery list retyped every morning.",
        "Driver rings back for the access note.",
        "Failed stops rediscovered the next week.",
        "'Did that get signed?' with no way to check.",
        "Route planned by memory and hope.",
      ],
    },
    with: {
      title: "With Deliveries",
      rows: [
        "Named and recurring runs.",
        "One-tap route optimisation with Google Maps handoff.",
        "Address and access notes on every stop.",
        "Timestamped outcomes and sign-off.",
        "Failed stops roll to the next run.",
      ],
    },
    features: [
      { title: "Named and recurring runs", body: "Tuesday north, Friday hills, or ad-hoc." },
      { title: "Ad-hoc stops", body: "Add a stop from Special orders or DAA in one tap." },
      { title: "Route optimisation", body: "Optimise the run, hand off to Google Maps for turn-by-turn." },
      { title: "Address and access notes", body: "Snapshotted per stop so a change never breaks the run." },
      { title: "Timestamped outcomes", body: "Delivered, no answer, refused. All time-stamped." },
      { title: "Printable run sheet", body: "Driver signs the sheet. Scanned back in for the record." },
      { title: "Failed stops roll forward", body: "Automatically added to the next scheduled run." },
      { title: "Pulls from other modules", body: "Special orders and DAA planner feed the run directly." },
    ],
    queue: ["Deliveries scheduled for today", "Failed stops from the last run"],
    pricingNote: "Included in Core.",
    faq: [
      { q: "Do drivers need the app?", a: "No. The printed run sheet works. Drivers with a phone can also mark outcomes live." },
      { q: "Do you handle the actual navigation?", a: "We optimise the order and hand off to Google Maps. Drivers keep the app they already know." },
    ],
  },
  {
    slug: "daa-planner",
    name: "DAA planner",
    group: "Clinical workflows",
    status: "early-access",
    eyebrow: "Clinical workflows",
    h1: "DAA packing with a pharmacist sign-off you can trust.",
    description:
      "Weekly, fortnightly, and 28-day cycles. Generate, print, pack, check, hand off, reconcile. Suspensions for hospital and holidays without breaking the cycle.",
    before: {
      title: "Before",
      rows: [
        "Packing week tracked on a wall chart.",
        "Reconcile means a stocktake at 6pm.",
        "Hospital admission breaks the cycle for a month.",
        "Notes for a pack live on a sticky note.",
        "Script requests written and forgotten.",
      ],
    },
    with: {
      title: "With DAA planner",
      rows: [
        "Weekly, fortnightly, and 28-day cycles.",
        "Pharmacist sign-off at check.",
        "Suspensions for hospital and holidays.",
        "Three layers of notes: patient, run, handoff.",
        "Script requests with clinic email preview.",
      ],
    },
    features: [
      { title: "Multiple cycle lengths", body: "Weekly, fortnightly, or 28-day, per patient." },
      { title: "Run workflow", body: "Generate, print, pack, check, hand off, reconcile." },
      { title: "Pharmacist sign-off", body: "Explicit sign-off at the check step, kept with the pack." },
      { title: "Pickup, delivery, or post", body: "Choose per run, per patient." },
      { title: "Suspensions", body: "Hospital and holiday suspensions that resume the cycle cleanly." },
      { title: "Reconcile queue", body: "Separates never-finished from ready-too-long, so nothing sits." },
      { title: "Three note layers", body: "Patient standing notes, run notes, handoff notes." },
      { title: "Script requests", body: "Preview and send the clinic email in one place." },
    ],
    queue: ["DAA packs ready to check", "Packs handed off but not reconciled", "Script requests due"],
    pricingNote: "Included in Core.",
    faq: [
      { q: "Do we replace our packing software?", a: "No. DAA planner runs the workflow around your packing software. Packing itself stays where it is." },
      { q: "How is a hospital admission handled?", a: "Suspend the patient's cycle, add a note, and resume on discharge. The reconcile queue tracks anything in flight." },
    ],
  },
  {
    slug: "staged-supply",
    name: "Staged supply",
    group: "Clinical workflows",
    status: "early-access",
    eyebrow: "Clinical workflows",
    h1: "One continuous record for every staged patient.",
    description:
      "Flexible schedules, digital consent, and counter pickup signatures. Corrections never overwrite history.",
    before: {
      title: "Before",
      rows: [
        "Staged supply card for each patient in a drawer.",
        "Consent lives on paper somewhere.",
        "Early pickup happens with no reason recorded.",
        "Corrections are made by crossing out.",
        "New staff have no way to see the pattern.",
      ],
    },
    with: {
      title: "With Staged supply",
      rows: [
        "One continuous per-patient record.",
        "Digital consent with signature or upload.",
        "Counter signatures on a tablet.",
        "Early-pickup reasons captured at the counter.",
        "Corrections stored as an audit event, not an overwrite.",
      ],
    },
    features: [
      { title: "Per-patient record", body: "Every dose, every date, on one timeline." },
      { title: "Flexible schedules", body: "Weekly, fortnightly, custom, or manual." },
      { title: "Flexible quantities", body: "Fixed, calculated, or entered each time." },
      { title: "Digital consent", body: "Signature, uploaded agreement, or paper-on-file flag." },
      { title: "Counter pickup signatures", body: "Signed on a tablet at the counter." },
      { title: "Early-pickup reasons", body: "Captured in one tap. Reviewable per patient." },
      { title: "Corrections without overwrite", body: "History stays. Corrections are events." },
      { title: "Handoff-friendly", body: "Locum sees the pattern in seconds." },
    ],
    queue: ["Staged patients due today", "Missed pickups", "Consent expiring"],
    pricingNote: "Included in Core.",
    faq: [
      { q: "Is digital consent legally accepted?", a: "Yes, when the patient signs or the agreement is uploaded. The paper-on-file flag remains available." },
      { q: "Does it replace the dispensing record?", a: "No. It runs alongside dispensing to keep the pattern and consent in one place." },
    ],
  },
  {
    slug: "approvals",
    name: "Approvals",
    group: "Clinical workflows",
    status: "early-access",
    eyebrow: "Clinical workflows",
    h1: "SAS and medicinal cannabis approvals staff can find at the counter.",
    description:
      "Store TGA approvals with structured metadata, linked to patient and prescriber, surfaced during reorder so staff pick the right approval first time.",
    before: {
      title: "Before",
      rows: [
        "Approvals in an email folder.",
        "Reorder guesses which approval applies.",
        "Expiries discovered when they matter.",
        "Prescriber and pathway retyped every time.",
        "'Which SAS category was this?' at every fill.",
      ],
    },
    with: {
      title: "With Approvals",
      rows: [
        "Structured metadata on every approval.",
        "Linked to patient and prescriber.",
        "Surfaced during reorder automatically.",
        "Expiry queue on Today.",
        "Search by product, patient, or approval number.",
      ],
    },
    features: [
      { title: "Structured metadata", body: "Approval number, pathway (SAS A, SAS B, AP, ARTG), product, prescriber, expiry." },
      { title: "Patient and prescriber links", body: "Approval attached to the record, not to a folder." },
      { title: "Surfaced during reorder", body: "Right approval offered when the order is created." },
      { title: "Expiry queue", body: "Approvals near expiry appear on the Today queue." },
      { title: "Search", body: "By product, patient, prescriber, or approval number." },
      { title: "Attachments", body: "The original approval PDF, kept with the record." },
      { title: "Audit trail", body: "Every access and edit logged." },
      { title: "Category-wide approvals", body: "Support for AP and product-category approvals." },
    ],
    queue: ["Approvals expiring in 30 days", "Reorders missing an approval"],
    pricingNote: "Included in Core.",
    faq: [
      { q: "Can we upload historical approvals?", a: "Yes. Bulk upload with metadata capture, then link to patients as they present." },
      { q: "Does it lodge approvals with the TGA?", a: "No. It stores and organises the approvals your prescribers obtain." },
    ],
  },
  {
    slug: "stock",
    name: "Stock & shelf",
    group: "Stock and money",
    status: "available",
    eyebrow: "Stock and money",
    h1: "Stock on hand, in one search bar, from your dispensing system.",
    description:
      "Chemist Care Tools is built by the team that already runs live pipelines against Z Dispense and APSS. Dispense connectivity is engineering we have already done, not a roadmap promise.",
    before: {
      title: "Before",
      rows: [
        "Stock check means walking to the shelf.",
        "'Do we have it?' answered by memory.",
        "Bay locations known only to the manager.",
        "Ask reception, ask dispense, ask again.",
        "Shelf audits done once a year.",
      ],
    },
    with: {
      title: "With Stock & shelf",
      rows: [
        "Stock on hand synced from the dispensing system.",
        "Barcode and SKU search.",
        "Shelf and bay locations on every result.",
        "Natural-language stock questions through Ask.",
        "Revenue reconciled to within 0.5% of till figures.",
      ],
    },
    features: [
      { title: "Live stock on hand", body: "Synced from your dispensing system. No manual counts." },
      { title: "Barcode and SKU search", body: "Scan or type. Instant result." },
      { title: "Shelf and bay locations", body: "Every result tells staff where to walk." },
      { title: "Natural-language search", body: "'Do we have Panadol Osteo 96?' returns stock and location." },
      { title: "Proven pipelines", body: "Live against Z Dispense and APSS databases in working pharmacies." },
      { title: "Reconciled revenue model", body: "Within half a percent of till figures at working pharmacies." },
      { title: "Every module aware", body: "Special orders, DAA, and Ask all read the same stock." },
      { title: "Multi-store visibility", body: "With Connected stores, search across sister pharmacies." },
    ],
    queue: ["Stock searches surfaced from Ask"],
    pricingNote: "Included in Core.",
    faq: [
      { q: "Which dispensing systems are supported?", a: "Z Dispense and APSS are live in working pharmacies today. Fred NXT, Minfos, and Dispense Works integrations are in the early access programme." },
      { q: "Does stock update in real time?", a: "Stock refreshes every few minutes and on demand. Barcode scans return the latest available value." },
    ],
  },
  {
    slug: "stock-locations",
    name: "Stock locations",
    group: "Stock and money",
    status: "early-access",
    eyebrow: "Stock and money",
    h1: "Know where the stock actually lives.",
    description:
      "Warehouse, upstairs, back room. Transfers with a record. Pick lists for floor restocking.",
    before: {
      title: "Before",
      rows: [
        "Stock says 12. Shelf says 2. Rest is upstairs.",
        "Transfers between rooms are word-of-mouth.",
        "Restocking done from memory.",
        "Location breakdown never lines up.",
        "Same product counted twice.",
      ],
    },
    with: {
      title: "With Stock locations",
      rows: [
        "Counts by warehouse, upstairs, and back room.",
        "Transfers with a record.",
        "Pick lists for floor restocking.",
        "Location breakdown in every search.",
        "Reconciles against the dispensing total.",
      ],
    },
    features: [
      { title: "Per-location counts", body: "Warehouse, upstairs, back room, or any location you define." },
      { title: "Recorded transfers", body: "Move stock between locations with an event on the record." },
      { title: "Pick lists", body: "Generate a list for floor restocking, tick as you go." },
      { title: "Location in every result", body: "Search returns stock and where in the building." },
      { title: "Reconciliation", body: "Sum of locations reconciles against dispensing total." },
      { title: "Multi-room support", body: "Any number of storage areas, per store." },
      { title: "Bay-aware", body: "Optional bay-level detail per location." },
      { title: "Audit trail", body: "Every transfer, every count, every adjustment." },
    ],
    queue: ["Restock pick list waiting", "Transfer reconciliation flagged"],
    pricingNote: "Add-on. $49 per store per month.",
    faq: [
      { q: "Can we define our own locations?", a: "Yes. Add and rename locations to match how you actually store stock." },
      { q: "Does it count stock for us?", a: "It records counts you enter. Automated bay scanning is on the roadmap." },
    ],
  },
  {
    slug: "expiries",
    name: "Expiries",
    group: "Stock and money",
    status: "early-access",
    eyebrow: "Stock and money",
    h1: "Catch expiring stock before you write it off.",
    description:
      "Bay-level expiry capture, tiered alerts, and markdown playbooks. Expired and disposed stock syncs to the Compliance register.",
    before: {
      title: "Before",
      rows: [
        "Expiry check once a quarter, if that.",
        "Disposal written on a form nobody keeps.",
        "Short-dated stock discovered by the customer.",
        "Markdown decided in the moment.",
        "Compliance record retyped from memory.",
      ],
    },
    with: {
      title: "With Expiries",
      rows: [
        "Bay-level capture by scan or CSV.",
        "Tier alerts from 3 months to 2 weeks.",
        "Markdown playbooks, per bay.",
        "Bay ownership and role-based alerts.",
        "Auto-sync to Compliance on disposal.",
      ],
    },
    features: [
      { title: "Bay-level capture", body: "Scan or CSV upload. Track expiries where they sit." },
      { title: "Tiered alerts", body: "3 months, 2 months, 1 month, 2 weeks. Escalated automatically." },
      { title: "Markdown playbooks", body: "20% at 3 months, stepping to 50% at 2 weeks. Configure per bay." },
      { title: "Bay ownership", body: "Assign a bay to a staff member. Alerts go to them." },
      { title: "Role-based alerts", body: "Notify the retail lead, the pharmacist, or the manager." },
      { title: "Bay states", body: "Critical, warning, or good. Visible at a glance." },
      { title: "Compliance sync", body: "Expired and disposed stock rolls into the Compliance register." },
      { title: "Trend reporting", body: "See which bays quietly cost the most every year." },
    ],
    queue: ["Bays in critical state", "Disposal event needs sign-off"],
    pricingNote: "Add-on. From $99 per store per month.",
    faq: [
      { q: "Do we need barcode scanners?", a: "No. CSV upload works. Barcode scanners speed things up if you have them." },
      { q: "Does markdown apply automatically at the till?", a: "The playbook tells staff what to mark down. Actual POS pricing stays under your control." },
    ],
  },
  {
    slug: "pbs-intelligence",
    name: "PBS intelligence",
    group: "Stock and money",
    status: "available",
    eyebrow: "Stock and money",
    h1: "Know your PBS exposure before the first of the month.",
    description:
      "Three tools in one module. Price change exposure, claim reconciliation, and reconciled revenue analytics. Built on data pipelines already running in working pharmacies.",
    before: {
      title: "Before",
      rows: [
        "PBS price changes discovered by dispense on the 1st.",
        "Claim reconciliation is a spreadsheet nobody enjoys.",
        "Owner reports built from three different exports.",
        "Revenue numbers argued about, not agreed on.",
        "Barcode matching done by eye.",
      ],
    },
    with: {
      title: "With PBS intelligence",
      rows: [
        "Dollar exposure before the price change lands.",
        "Line-by-line claim reconciliation.",
        "Owner dashboards on a reconciled revenue model.",
        "Reconciled against till figures at working pharmacies.",
        "Proven barcode matching across government file formats.",
      ],
    },
    features: [
      { title: "Price change exposure", body: "Match stock on hand against each month's PBS files. Dollar exposure before the 1st." },
      { title: "Claim reconciliation", body: "Parse PBS payment advices. Reconcile against expected claim values line by line." },
      { title: "Owner revenue dashboards", body: "Patient price plus government recovery, reconciled to till figures." },
      { title: "Proven barcode matching", body: "Across government file formats, in production today." },
      { title: "Monthly exposure alert", body: "Emailed to the owner before the first of the month." },
      { title: "Historical trend", body: "See exposure and claim variance across months." },
      { title: "Multi-store roll-up", body: "One dashboard across a group of pharmacies." },
      { title: "Export for accountant", body: "Reconciled figures your accountant will use as is." },
    ],
    queue: ["Exposure alert this month", "Claim variance to review"],
    pricingNote: "Add-on. $99 per store per month.",
    faq: [
      { q: "How is this different from what my POS reports?", a: "POS reports the sale. PBS intelligence reconciles the claim, the recovery, and the exposure ahead of the price change." },
      { q: "Do you handle multiple government file formats?", a: "Yes. Barcode matching and file parsing are proven across the current formats, updated as new ones ship." },
    ],
  },
  {
    slug: "connected-stores",
    name: "Connected stores",
    group: "Stock and money",
    status: "early-access",
    eyebrow: "Stock and money",
    h1: "Read-only stock visibility across sister stores.",
    description:
      "Each store keeps its own workspace. Head office shares documents and policies. Staff answer 'do we have it?' about the group, not just the shelf.",
    before: {
      title: "Before",
      rows: [
        "'Ring the other store' to check stock.",
        "Head office policies emailed and lost.",
        "Group announcement goes to nobody.",
        "Every store has its own version of the SOP.",
        "Transfer requests happen on WhatsApp.",
      ],
    },
    with: {
      title: "With Connected stores",
      rows: [
        "Read-only stock across sister stores.",
        "Cross-store Ask.",
        "Shared documents and policies from head office.",
        "Each store keeps its own workspace.",
        "One place to see the group.",
      ],
    },
    features: [
      { title: "Read-only stock visibility", body: "See stock in sister stores. Placing an order stays local." },
      { title: "Cross-store Ask", body: "'Which store has this in stock?' with an answer and a location." },
      { title: "Shared documents", body: "Head office publishes once. Every store reads the same version." },
      { title: "Store isolation", body: "Each store still owns its own data and workflows." },
      { title: "Group announcements", body: "Post once. Tracked reads per store." },
      { title: "Roll-up dashboards", body: "Aggregate across the group without losing store detail." },
      { title: "Transfer requests", body: "Request a transfer with a record, not a WhatsApp." },
      { title: "Group-level QSPP view", body: "One readiness score per store, one for the group." },
    ],
    queue: ["Group announcements unread", "Transfer requests waiting"],
    pricingNote: "Add-on. From $99 per store per month, includes up to 3 stores.",
    faq: [
      { q: "Can we hide certain stores from each other?", a: "Yes. Visibility is configured per store and per module." },
      { q: "Does it change how each store runs?", a: "No. Store workspaces are independent. Connected stores adds visibility across them." },
    ],
  },
  {
    slug: "compliance",
    name: "Compliance & QSPP readiness",
    group: "Grow and govern",
    status: "early-access",
    eyebrow: "Grow and govern",
    h1: "One register, one audit calendar, one readiness view.",
    description:
      "From 1 October 2026, community pharmacies transition from QCPP to QSPP under AS85000:2024. Compliance gives you one place to be ready.",
    before: {
      title: "Before",
      rows: [
        "Policies in a folder last reviewed 2019.",
        "Credentials on a spreadsheet on someone's laptop.",
        "Incidents remembered, not recorded.",
        "Fridge log lost between shifts.",
        "Audit day is a scramble.",
      ],
    },
    with: {
      title: "With Compliance",
      rows: [
        "Policy register pre-seeded with pharmacy policy types.",
        "Scheduled audits with sign-off history.",
        "Credential tracking with staff upload and manager verify.",
        "Incident and fridge log registers.",
        "Readiness score against AS85000:2024.",
      ],
    },
    features: [
      { title: "Policy register", body: "Pre-seeded with standard pharmacy policy types and review cycles." },
      { title: "Scheduled audit programme", body: "Premises, infection control, security, module reviews. Sign-off history." },
      { title: "Credential tracking", body: "Staff and pharmacy credentials with expiry queues. Staff upload, manager verify." },
      { title: "Incident register", body: "Incidents and near-misses on the record." },
      { title: "Feedback and complaints", body: "One register. Trending, closed, and open, at a glance." },
      { title: "Fridge logs", body: "AM/PM checks. Alerts if a check is missed." },
      { title: "Compliance stock records", body: "Recalls, disposal, expired stock. All in one place." },
      { title: "QSPP readiness view", body: "Evidence mapped against the four domains of AS85000:2024." },
    ],
    queue: ["Credentials expiring in 30 days", "Overdue audits", "Fridge log missed", "Incidents awaiting review"],
    pricingNote: "Included in Governance. Recommended before October 2026.",
    faq: [
      { q: "Does this accredit our pharmacy?", a: "No. Chemist Care Tools organises the compliance work. Your assessor still accredits your pharmacy." },
      { q: "Do we need to move existing evidence?", a: "Upload as you go. The pre-seeded register tells you what to organise first." },
    ],
  },
  {
    slug: "loyalty",
    name: "Loyalty & local offers",
    group: "Grow and govern",
    status: "early-access",
    eyebrow: "Grow and govern",
    h1: "Local marketing that respects the counter.",
    description:
      "Birthdays, goodwill offers, and campaigns with a counter redemption flow. Consent-aware. Marketing sender kept separate from operational notifications.",
    before: {
      title: "Before",
      rows: [
        "Birthday cards printed and forgotten.",
        "Goodwill offer written on the back of the receipt.",
        "Campaign send list built by copy-paste.",
        "Marketing and reminders sent from the same number.",
        "'Did we already send that?' with no answer.",
      ],
    },
    with: {
      title: "With Loyalty & local offers",
      rows: [
        "Birthday rewards, sent automatically.",
        "Goodwill offers with per-customer redemption links.",
        "Counter redemption flow (apply in POS, mark redeemed).",
        "Consent-aware audiences.",
        "Marketing sender separate from operations.",
      ],
    },
    features: [
      { title: "Birthday rewards", body: "Sent on the day, from your pharmacy's marketing sender." },
      { title: "Goodwill offers", body: "Unique per-customer links. One redemption per link." },
      { title: "Counter redemption flow", body: "Apply in POS, mark redeemed in the portal. Simple." },
      { title: "Campaign builder", body: "Type, audience, content, schedule, review. In one place." },
      { title: "Consent-aware audiences", body: "Only patients who have opted in receive marketing." },
      { title: "Send activity log", body: "Every send, on the record." },
      { title: "Separate marketing sender", body: "Never mixed with operational SMS and email." },
      { title: "Included email allowance", body: "5,000 marketing emails included per month." },
    ],
    queue: ["Campaign drafts awaiting review", "Redemptions to reconcile"],
    pricingNote: "Add-on. $79 per store per month.",
    faq: [
      { q: "How is consent managed?", a: "Consent is captured at the counter or during onboarding, stored on the patient, and honoured across every send." },
      { q: "Can we run a group-wide campaign?", a: "Yes, with Connected stores. Otherwise campaigns run per store." },
    ],
  },
  {
    slug: "compounding",
    name: "Compounding suite",
    group: "Grow and govern",
    status: "available",
    eyebrow: "Grow and govern",
    h1: "The operations layer built inside a working compounding pharmacy.",
    description:
      "Script pricing across 30 dosage forms, a 10-status order lifecycle, and an ingredient and supplier price database. Nothing like it in the market.",
    before: {
      title: "Before",
      rows: [
        "Pricing calculated by memory, then corrected.",
        "Order status kept on a whiteboard.",
        "Make-times guessed for every quote.",
        "Ingredient prices from three suppliers, rekeyed.",
        "Dispatch tracked by the person who took the call.",
      ],
    },
    with: {
      title: "With Compounding suite",
      rows: [
        "Script pricing engine across 30 dosage forms.",
        "Ingredient-level costing and calibrated make-times.",
        "10-status order lifecycle from quote to dispatch.",
        "Ingredient and supplier price database.",
        "Built inside a working compounding pharmacy.",
      ],
    },
    features: [
      { title: "Script pricing engine", body: "30 dosage forms with ingredient-level costing." },
      { title: "Calibrated make-times", body: "Times set from actual production, not estimates." },
      { title: "10-status lifecycle", body: "Quote, approved, in production, checked, dispatched, and more." },
      { title: "Ingredient database", body: "Every ingredient, every supplier, every price." },
      { title: "Supplier price tracking", body: "Price movements captured over time." },
      { title: "Reorder awareness", body: "Ingredients running low, surfaced early." },
      { title: "Patient-safe versioning", body: "Formula changes tracked with reason and approver." },
      { title: "Built by operators", body: "Designed in a working specialist compounding pharmacy." },
    ],
    queue: ["Quotes awaiting approval", "Orders in production over target time"],
    pricingNote: "Add-on. $149 per store per month.",
    faq: [
      { q: "Does it replace our compounding record?", a: "It runs the operational and pricing layer around the compounding record you already keep." },
      { q: "Can we tune make-times?", a: "Yes. Calibrate from your own production data. The system re-learns as you record." },
    ],
  },
];

export const MODULE_GROUPS: {
  name: ModuleGroup;
  description: string;
}[] = [
  { name: "Run the day", description: "The screens staff open every shift." },
  { name: "Clinical workflows", description: "The work that actually needs the pharmacist's judgement." },
  { name: "Stock and money", description: "What is on the shelf, what it earned, what it costs." },
  { name: "Grow and govern", description: "The layer that keeps the pharmacy accredited and growing." },
];

export function modulesByGroup(group: ModuleGroup): ModuleDef[] {
  return MODULES.filter((m) => m.group === group);
}

export function findModule(slug: string): ModuleDef | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/product/today", label: "Product" },
  { to: "/pricing", label: "Pricing" },
  { to: "/getting-started", label: "Getting started" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];
