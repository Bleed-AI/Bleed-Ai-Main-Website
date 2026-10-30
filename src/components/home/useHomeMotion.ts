"use client";

import { useEffect, useRef, useState } from "react";

/** True once the element has scrolled into view (fires once). */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        }),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** True when the visitor asked for reduced motion. Read after mount only. */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduce;
}

/** Types `text` out once `start` is true. Shows the full text at once under reduced motion. */
export function useTypewriter(text: string, start: boolean, speed = 22, reduce = false) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setOut(text);
      return;
    }
    let i = 0;
    setOut("");
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed, reduce]);
  return out;
}
