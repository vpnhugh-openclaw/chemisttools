import type { ReactNode } from "react";

// Browser-chrome frame styled as the actual portal.
export function BrowserFrame({
  children,
  caption,
  url = "portal.chemistcare.com.au",
}: {
  children: ReactNode;
  caption?: string;
  url?: string;
}) {
  return (
    <figure className="w-full">
      <div className="card-surface overflow-hidden">
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b"
          style={{ background: "var(--navy-50)", borderColor: "var(--navy-100)" }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#e0787a" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#e8c266" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#7bbf85" }} />
          <div
            className="ml-3 flex-1 text-xs px-3 py-1 rounded-md truncate"
            style={{ background: "var(--white)", color: "var(--navy-500)", border: "1px solid var(--navy-100)" }}
          >
            {url}
          </div>
        </div>
        {children}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-xs text-[var(--navy-500)]">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

// Fake portal shell used inside the browser frame.
export function PortalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex bg-white" style={{ minHeight: 360 }}>
      <aside
        className="hidden sm:flex flex-col gap-1 w-40 md:w-48 shrink-0 p-3"
        style={{ background: "var(--navy)", color: "rgba(255,255,255,0.9)", fontSize: 13 }}
      >
        <div className="px-2 py-2 mb-2 text-white" style={{ fontFamily: "var(--font-serif)", fontSize: 15 }}>
          Example Pharmacy
        </div>
        {["Today", "Operations", "Knowledge", "Orders", "Packs", "Stock", "Compliance"].map((item) => (
          <div
            key={item}
            className="px-2 py-1.5 rounded-md"
            style={{
              background: item === title ? "rgba(255,255,255,0.10)" : "transparent",
              color: item === title ? "#fff" : "rgba(255,255,255,0.7)",
            }}
          >
            {item}
          </div>
        ))}
      </aside>
      <div className="flex-1 min-w-0 p-4 md:p-6" style={{ background: "var(--paper)" }}>
        {children}
      </div>
    </div>
  );
}
