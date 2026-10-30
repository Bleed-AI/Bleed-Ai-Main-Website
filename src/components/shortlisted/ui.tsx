"use client";

// Small shared pieces for the outcome pages built on 2026-10-30 (Shortlisted and Inbound Engine).
// Prices, slots and the trial come from src/lib/slots.ts, never from here.

import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { TRIAL } from "@/lib/slots";

/** True once the element has scrolled into view (never flips back). */
export function useInView(ref: RefObject<Element | null>, threshold = 0.25): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold, seen]);
  return seen;
}

export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduce(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduce;
}

export function trialHref(outcome: string, pkg?: string): string {
  return `${TRIAL.href}?outcome=${outcome}${pkg ? `&package=${pkg}` : ""}`;
}

export function TrialButton({ outcome, children, className = "" }: { outcome: string; children?: ReactNode; className?: string }) {
  return (
    <a
      href={trialHref(outcome)}
      className={`group btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-[#B1130F] px-7 py-3.5 text-[15px] font-semibold text-white ${className}`}
    >
      {children ?? TRIAL.label}
      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

export function GhostButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#2a2a3e] px-6 py-3.5 text-[15px] font-semibold text-white/90 transition-colors hover:border-white/30 ${className}`}
    >
      {children}
    </a>
  );
}

export function ExampleTag({ children = "Example", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/50 ${className}`}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff5b56]">{children}</div>
  );
}

/** Headline helper: wrap the accent words in <em className="hd-em">. */
export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-[30px] font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[44px] ${className}`}>
      {children}
    </h2>
  );
}
