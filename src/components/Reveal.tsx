import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

// Single shared observer for scroll-triggered blurFadeUp reveals.
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function getObserver(): IntersectionObserver {
  if (typeof window === "undefined") return null as unknown as IntersectionObserver;
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cb = callbacks.get(entry.target);
          if (cb) cb();
          observer!.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18 },
  );
  return observer;
}

export function Reveal({ children, delay = 0, as = "div", className = "" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [play, setPlay] = useState(false);
  const Comp = as as unknown as "div";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setPlay(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    callbacks.set(el, () => setPlay(true));
    obs.observe(el);
    return () => {
      obs.unobserve(el);
    };
  }, []);

  return (
    <Comp
      ref={ref as never}
      className={`${play ? "animate-blur-fade-up is-inview" : "opacity-0"} ${className}`}
      style={play ? { animationDelay: `${Math.min(delay, 480)}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}

// Reveal a group of siblings with automatic staggered delays (80ms apart, capped at 480ms).
export function RevealGroup({ children, className = "" }: { children: ReactNode[]; className?: string }) {
  return (
    <div className={className}>
      {children.map((c, i) => (
        <Reveal key={i} delay={i * 80}>
          {c}
        </Reveal>
      ))}
    </div>
  );
}
