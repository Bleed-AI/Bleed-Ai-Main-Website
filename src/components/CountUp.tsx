"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

// Counts up from 0 to `end` the first time it scrolls into view.
export default function CountUp({ end, suffix = "", duration = 2600, className }: Props) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(end);
      return;
    }

    const run = () => {
      if (ran.current) return;
      ran.current = true;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * end));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}
