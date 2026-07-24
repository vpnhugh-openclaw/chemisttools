import type { ReactNode } from "react";

// Infinite ticker strip. Children are rendered twice for a seamless loop.
export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track">
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
