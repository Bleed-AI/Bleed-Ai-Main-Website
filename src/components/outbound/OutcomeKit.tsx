"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/Reveal";
import SlotChip from "@/components/slots/SlotChip";
import { MIN_SLOTS, money, priceFor, PRICE_LINE, SWAP_LINE, TRIAL } from "@/lib/slots";

/**
 * Shared building blocks for the outcome pages /outbound/ and /linkedin-authority/ (2026-10-30).
 * Prices, slot names and the trial link all come from src/lib/slots.ts.
 */

export function trialHref(outcome: string) {
  return `${TRIAL.href}?outcome=${outcome}`;
}

function Arrow() {
  return (
    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export function TrialButton({ outcome, label = TRIAL.label, className = "" }: { outcome: string; label?: string; className?: string }) {
  return (
    <a
      href={trialHref(outcome)}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[#B1130F] px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(177,19,15,0.5)] btn-glow ${className}`}
    >
      {label}
      <Arrow />
    </a>
  );
}

export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-[#2a2a3e] px-7 py-3.5 text-[15px] font-semibold text-white/90 transition-colors hover:border-white/30"
    >
      {children}
    </a>
  );
}

export function SectionHead({
  label,
  title,
  sub,
  center = true,
}: {
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 sm:mb-12 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      <Reveal className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff5a52]">{label}</Reveal>
      <Reveal as="h2" className="font-display text-[30px] font-bold leading-[1.1] text-white sm:text-[42px]">
        {title}
      </Reveal>
      {sub && (
        <Reveal as="p" delay={80} className="mt-4 text-[15.5px] leading-relaxed text-[#9099b8] sm:text-[17px]">
          {sub}
        </Reveal>
      )}
    </div>
  );
}

export function OutcomeHero({
  outcome,
  name,
  title,
  sub,
  points,
  aside,
}: {
  outcome: string;
  name: string;
  title: ReactNode;
  sub: ReactNode;
  points: string[];
  aside?: ReactNode;
}) {
  return (
    <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-[#B1130F]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2a2a3e] bg-[#141420]/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#c3c8dc]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff3d38] shadow-[0_0_8px_#ff3d38]" />
          {name}
        </Reveal>
        <Reveal as="h1" className="font-display text-[40px] font-bold leading-[1.04] tracking-tight text-white sm:text-[64px]">
          {title}
        </Reveal>
        <Reveal as="p" delay={80} className="mx-auto mt-6 max-w-2xl text-[16.5px] leading-relaxed text-[#9099b8] sm:text-[19px]">
          {sub}
        </Reveal>
        <Reveal delay={140} className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <TrialButton outcome={outcome} />
          <GhostButton href="#packages">See the packages</GhostButton>
        </Reveal>
        <Reveal delay={200} className="mt-6 text-[13px] text-[#9099b8]">
          From <span className="font-semibold text-white">{money(priceFor(MIN_SLOTS))} a month</span> · {PRICE_LINE} · {TRIAL.length} free to start
        </Reveal>
        <Reveal delay={240} className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2.5">
          {points.map((p) => (
            <span key={p} className="inline-flex items-center gap-2 text-[13.5px] text-[#c3c8dc]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
              {p}
            </span>
          ))}
        </Reveal>
      </div>
      {aside}
    </section>
  );
}

/** Swap-in slots for this outcome, as chips, with the swap line. */
export function SwapIns({ ids, note }: { ids: string[]; note?: ReactNode }) {
  return (
    <div className="mt-10 rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#11111b,#0a0a12)] p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-display text-lg font-bold text-white">Swap in any time</h3>
        <span className="text-[13px] text-[#9099b8]">{SWAP_LINE}</span>
      </div>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#9099b8]">
        Every slot on your board can change at the start of a month. If one stops pulling its weight, we move it to one of these, or to anything else on the menu.
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {ids.map((id) => (
          <SlotChip key={id} id={id} />
        ))}
      </div>
      {note && <div className="mt-5 border-t border-white/5 pt-4 text-[13.5px] leading-relaxed text-[#9099b8]">{note}</div>}
    </div>
  );
}

export function PageFaq({ items }: { items: { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHead label="Questions" title={<>The things people <em className="hd-em">ask first.</em></>} />
        <div className="flex flex-col gap-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`rounded-2xl border transition-colors ${isOpen ? "border-[#B1130F]/40 bg-[#141420]" : "border-[#1f1f30] bg-[#0d0d16]"}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-[15.5px] font-semibold text-white sm:text-[16.5px]">{f.q}</span>
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#2a2a3e] text-[#ff5a52] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-[#9099b8] sm:px-6">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PageCta({ outcome, title, sub }: { outcome: string; title: ReactNode; sub: ReactNode }) {
  return (
    <section className="px-5 pb-24 pt-6 sm:px-8">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#B1130F]/40 bg-[linear-gradient(160deg,#1a0d10,#0b0b14_60%)] px-6 py-14 text-center sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] max-w-full -translate-x-1/2 rounded-full bg-[#B1130F]/25 blur-[100px]" />
        <h2 className="relative font-display text-[30px] font-bold leading-[1.1] text-white sm:text-[46px]">{title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-[#9099b8] sm:text-[17px]">{sub}</p>
        <div className="relative mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <TrialButton outcome={outcome} />
          <GhostButton href="/pricing/">See pricing</GhostButton>
        </div>
        <p className="relative mt-5 text-[12.5px] text-[#9099b8]">
          {TRIAL.length} free on {TRIAL.slots}. Then month to month, from {money(priceFor(MIN_SLOTS))}.
        </p>
      </Reveal>
    </section>
  );
}

/** Watches an element and fires once when it scrolls into view. Respects reduced motion. */
export { useOnceInView } from "./useOnceInView";
