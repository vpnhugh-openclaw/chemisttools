import type { ModuleStatus } from "@/lib/siteConfig";

export function StatusBadge({ status }: { status: ModuleStatus }) {
  if (status === "available") {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
        style={{ background: "var(--navy-50)", color: "var(--navy)", border: "1px solid var(--navy-100)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--success)" }} />
        Available now
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
      style={{ background: "rgba(199,138,26,0.10)", color: "var(--warning)", border: "1px solid rgba(199,138,26,0.25)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--warning)" }} />
      Early access
    </span>
  );
}
