"use client";

import { useEffect, useRef } from "react";

/**
 * Soft glow that sits under the pointer and follows it (background layer).
 * Lightweight: passive mousemove + rAF, transform/opacity only, off on touch.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover:none)").matches) return;
    const el = ref.current;
    if (!el) return;
    let x = 0;
    let y = 0;
    let pending = false;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!pending) {
        pending = true;
        requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x - 280}px, ${y - 280}px, 0)`;
          el.style.opacity = "1";
          pending = false;
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
