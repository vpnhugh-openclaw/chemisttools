import { useCallback, useRef } from "react";
import type { ReactNode } from "react";

// Tracks the cursor and feeds --spot-x/--spot-y to the .card-lift spotlight.
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);
  return { ref, onMouseMove };
}

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();
  return (
    <div ref={ref} onMouseMove={onMouseMove} className={`card-surface card-lift ${className}`}>
      {children}
    </div>
  );
}
