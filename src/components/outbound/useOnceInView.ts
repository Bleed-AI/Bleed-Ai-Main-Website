"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref, whether the element has been seen, and whether motion is reduced.
 * Fires once. Reduced motion counts as seen immediately so pieces render their final frame.
 */
export function useOnceInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    setReduced(r);
    if (r) {
      setSeen(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, seen, reduced };
}

/** Steps a counter from 0 to `total` with the given gaps (ms). Jumps to the end when `instant`. */
export function useStepper(start: boolean, total: number, gaps: number[], instant: boolean, runKey = 0) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (instant) {
      setStep(total);
      return;
    }
    setStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 0;
    for (let i = 1; i <= total; i++) {
      t += gaps[Math.min(i - 1, gaps.length - 1)];
      timers.push(setTimeout(() => setStep(i), t));
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, total, instant, runKey]);
  return step;
}
