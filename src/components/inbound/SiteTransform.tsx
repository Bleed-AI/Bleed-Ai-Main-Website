"use client";

// Signature piece 1 for /inbound-engine: an old homepage wiped into a revamped one.
// Drag the handle, or use the Before / After buttons. Invented company, labelled Example.

import { useEffect, useRef, useState } from "react";
import { ExampleTag, useInView, useReducedMotion } from "@/components/shortlisted/ui";

const FIXES = [
  { before: "Says nothing about who it is for", after: "One clear promise, for one buyer" },
  { before: "\"Learn more\" goes nowhere", after: "One next step: book a call" },
  { before: "Nothing for a visitor to use", after: "A calculator that collects emails" },
  { before: "Slow and hard for crawlers to read", after: "Fast, and readable by Google and AI" },
];

function Chrome({ url, tone }: { url: string; tone: "old" | "new" }) {
  return (
    <div className={`flex items-center gap-1.5 border-b px-3 py-2 ${tone === "old" ? "border-black/10 bg-[#e9e9ec]" : "border-white/[0.06] bg-[#0f0f18]"}`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`h-2.5 w-2.5 rounded-full ${tone === "old" ? "bg-black/15" : "bg-white/15"}`} />
      ))}
      <span className={`ml-2 truncate rounded-md px-3 py-1 font-mono text-[10px] ${tone === "old" ? "bg-white text-black/45" : "bg-white/[0.05] text-white/45"}`}>{url}</span>
    </div>
  );
}

function OldSite() {
  return (
    <div className="h-full bg-[#f4f4f6] text-[#4b4b55]">
      <Chrome url="northlineadvisory / home" tone="old" />
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-4 py-3 sm:px-6">
        <span className="font-serif text-[15px] font-bold text-[#2a2a33]">NORTHLINE</span>
        <span className="hidden gap-4 text-[11px] text-[#777] sm:flex">
          <span>Home</span><span>About Us</span><span>Services</span><span>Blog</span><span>Contact</span>
        </span>
        <span className="text-[18px] leading-none text-[#999] sm:hidden">=</span>
      </div>
      <div className="relative flex min-h-[210px] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#9aa3ad,#c7ccd2)] px-6 py-10 text-center sm:min-h-[250px]">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0 2px,transparent 2px 14px)" }} />
        <div className="relative font-serif text-[22px] font-bold text-white drop-shadow sm:text-[28px]">Welcome to Northline Advisory</div>
        <div className="relative mt-2 max-w-md text-[12px] text-white/90 sm:text-[13px]">
          We provide innovative, client focused accounting solutions for businesses of all sizes.
        </div>
        <span className="relative mt-4 rounded bg-[#5b6470] px-4 py-1.5 text-[11px] text-white">Learn more</span>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4 sm:gap-4 sm:p-6">
        {["Quality", "Integrity", "Service"].map((t) => (
          <div key={t} className="rounded bg-white p-3 text-center shadow-sm">
            <div className="mx-auto mb-2 h-6 w-6 rounded-full bg-[#d5d8dd]" />
            <div className="text-[11px] font-semibold text-[#555]">{t}</div>
            <div className="mx-auto mt-1.5 h-1.5 w-4/5 rounded bg-[#e3e5e8]" />
            <div className="mx-auto mt-1 h-1.5 w-3/5 rounded bg-[#e3e5e8]" />
          </div>
        ))}
      </div>
      <div className="px-4 pb-6 sm:hidden">
        <div className="mb-2 font-serif text-[13px] font-bold text-[#555]">About Us</div>
        {["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-2/3"].map((w, i) => (
          <div key={i} className={`mt-1.5 h-1.5 rounded bg-[#dfe1e5] ${w}`} />
        ))}
        <div className="mt-4 flex justify-center">
          <span className="rounded border border-[#c9ccd1] px-3 py-1 text-[10px] text-[#888]">Contact Us</span>
        </div>
      </div>
    </div>
  );
}

function NewSite() {
  return (
    <div className="flex h-full flex-col bg-[#0b0b12] text-white">
      <Chrome url="northlineadvisory / home" tone="new" />
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-6">
        <span className="font-display text-[15px] font-bold tracking-tight">Northline<span className="text-[#34d399]">.</span></span>
        <span className="hidden gap-4 text-[11px] text-white/55 sm:flex">
          <span>Contractors</span><span>Guides</span><span>Calculator</span>
        </span>
        <span className="rounded-full bg-[#10b981] px-3 py-1 text-[10.5px] font-semibold text-[#04120c]">Book a call</span>
      </div>
      <div className="grid gap-5 px-4 py-6 sm:grid-cols-[1.3fr_1fr] sm:items-center sm:px-6 sm:py-8">
        <div>
          <div className="mb-2 inline-block rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#7af0bf]">For Texas contractors</div>
          <div className="font-display text-[21px] font-bold leading-[1.12] sm:text-[26px]">Construction accounting that keeps your cash moving.</div>
          <div className="mt-2 text-[12px] leading-snug text-white/60">Retainage, WIP schedules and cash flow for general contractors and subs, handled by people who only do construction.</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#10b981] px-3.5 py-1.5 text-[11px] font-semibold text-[#04120c]">Book a 15 minute call</span>
            <span className="rounded-full border border-white/15 px-3.5 py-1.5 text-[11px] font-semibold text-white/80">Run the calculator</span>
          </div>
        </div>
        <div className="rounded-xl border border-[#10b981]/30 bg-[#10b981]/[0.06] p-3.5">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-[#7af0bf]">Retainage calculator</div>
          <div className="mt-1 text-[11.5px] text-white/70">Cash your retainage is holding</div>
          <div className="mt-1 font-display text-[24px] font-bold text-white">$315,616</div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[62%] rounded-full bg-[#10b981]" /></div>
          <div className="mt-2.5 rounded-md bg-white/[0.06] px-2 py-1.5 text-[10px] text-white/45">Email me the full report</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 border-t border-white/[0.06] px-4 py-4 sm:grid-cols-3 sm:px-6">
        {["How Texas contractors should handle retainage in 2026", "WIP schedules, explained with a real job", "Bonding capacity: what a surety reads first"].map((t, i) => (
          <div key={t} className={`rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 ${i > 0 ? "hidden sm:block" : ""}`}>
            <div className="text-[9.5px] uppercase tracking-wide text-white/35">Guide</div>
            <div className="text-[11px] leading-snug text-white/75">{t}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-3 text-[10.5px] text-white/40 sm:px-6">
        <span>Houston · Dallas · Austin</span>
        <span className="text-[#7af0bf]">Reply within one working day</span>
      </div>
    </div>
  );
}

export default function SiteTransform() {
  const ref = useRef<HTMLDivElement | null>(null);
  const seen = useInView(ref, 0.35);
  const reduce = useReducedMotion();
  const [reveal, setReveal] = useState(0); // percent of the new site shown, from the left
  const [touched, setTouchedState] = useState(false);
  const touchedRef = useRef(false);
  const revealRef = useRef(0);
  const setTouched = (v: boolean) => {
    touchedRef.current = v;
    setTouchedState(v);
  };
  const raf = useRef<number | null>(null);
  const box = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const animateTo = (target: number, ms = 1400) => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (reduce) {
      setReveal(target);
      return;
    }
    const from = revealRef.current;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      setReveal(from + (target - from) * e);
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!seen || touched) return;
    const t = setTimeout(() => {
      if (!touchedRef.current) animateTo(100, 1800);
    }, reduce ? 0 : 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, reduce]);

  useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  revealRef.current = reveal;
  const after = reveal >= 50;

  const setFromPointer = (clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTouched(true);
    if (raf.current) cancelAnimationFrame(raf.current);
    setReveal(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div ref={ref}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-[#2a2a3e] bg-[#0d0d16] p-1">
          {[
            { k: "before", label: "Before", v: 0 },
            { k: "after", label: "After", v: 100 },
          ].map((b) => {
            const active = b.k === "after" ? after : !after;
            return (
              <button
                key={b.k}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setTouched(true);
                  animateTo(b.v, 900);
                }}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                  active ? (b.k === "after" ? "bg-[#10b981]/20 text-[#7af0bf]" : "bg-white/10 text-white") : "text-white/55 hover:text-white/85"
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
        <ExampleTag>Example homepage, invented company</ExampleTag>
      </div>

      <div
        ref={box}
        className="relative cursor-ew-resize select-none overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)]"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(e) => {
          dragging.current = true;
          setFromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div className="grid">
          <div className="[grid-area:1/1]">
            <OldSite />
          </div>
          <div className="[grid-area:1/1]" style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }} aria-hidden={!after}>
            <NewSite />
          </div>
        </div>
        {/* Wipe edge and handle */}
        <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${reveal}%`, opacity: reveal > 0.5 && reveal < 99.5 ? 1 : 0 }}>
          <div className="absolute inset-y-0 -left-px w-[2px] bg-[#34d399] shadow-[0_0_18px_3px_rgba(52,211,153,0.6)]" />
          <div className="absolute top-1/2 -left-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#34d399]/60 bg-[#0b0b12] text-[#7af0bf] shadow-lg">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(reveal)}
          onChange={(e) => {
            setTouched(true);
            if (raf.current) cancelAnimationFrame(raf.current);
            setReveal(Number(e.target.value));
          }}
          aria-label="Compare the old and the revamped homepage"
          className="sr-only"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {FIXES.map((f, i) => (
          <div
            key={f.after}
            className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[13px] leading-snug transition-all duration-500 ${
              after ? "border-[#10b981]/30 bg-[#10b981]/[0.06] text-white/85" : "border-white/[0.07] bg-white/[0.02] text-white/55"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {after ? (
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#34d399]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7" />
              </svg>
            ) : (
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#ff5b56]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {after ? f.after : f.before}
          </div>
        ))}
      </div>
    </div>
  );
}
