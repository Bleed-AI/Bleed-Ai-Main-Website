"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { money, OUTBOUND_SPECIALIST } from "@/lib/slots";

/** The Outbound Specialist step up, for outbound that already works. Anchor: #specialist. */
export default function SpecialistStepUp() {
  const tiers = OUTBOUND_SPECIALIST.monthly;
  const [pick, setPick] = useState(tiers[1]?.id ?? tiers[0].id);
  const tier = tiers.find((t) => t.id === pick) ?? tiers[0];

  return (
    <section id="specialist" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#2a2a3e] bg-[linear-gradient(160deg,#151522,#09090f_65%)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#B1130F]/15 blur-[90px]" />
        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#f5b544]">
              Step up
            </span>
            <h2 className="mt-4 font-display text-[28px] font-bold leading-[1.1] text-white sm:text-[38px]">
              {OUTBOUND_SPECIALIST.name}
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-[#c3c8dc]">{OUTBOUND_SPECIALIST.pitch}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#9099b8]">
              This is not where you start. Most clients begin with a slot board, find the market that bites, then step up here when they want more of it.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {[
                "Several markets worked at once",
                "New experiments every month, the winners scaled",
                "Lists built account by account",
                "Every reply handled for you",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[14px] text-[#c3c8dc]">
                  <svg className="mt-[3px] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-2xl border border-[#1f1f30] bg-[#0b0b12] p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-4">
              <span className="text-[14px] font-semibold text-white">{OUTBOUND_SPECIALIST.launch.label}</span>
              <span className="font-display text-[26px] font-bold text-white">{money(OUTBOUND_SPECIALIST.launch.price)}</span>
            </div>
            <div className="pt-4">
              <div className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9099b8]">Then, every month</div>
              <div role="radiogroup" aria-label="Monthly scale" className="grid grid-cols-3 gap-1 rounded-full border border-[#2a2a3e] bg-[#0d0d16] p-1">
                {tiers.map((t) => {
                  const on = t.id === pick;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setPick(t.id)}
                      className={`whitespace-nowrap rounded-full px-1 py-2 text-[12.5px] font-semibold transition-all sm:px-2 sm:text-[13.5px] ${
                        on ? "bg-[#B1130F] text-white shadow-[0_6px_20px_-6px_rgba(177,19,15,0.8)]" : "text-[#9099b8] hover:text-white"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <span key={tier.id} className="sp-pop font-display text-[40px] font-bold leading-none text-white">
                  {money(tier.price)}
                </span>
                <span className="text-[14px] text-[#9099b8]">a month</span>
              </div>
              <p className="mt-2 text-[14.5px] text-[#c3c8dc]">{tier.reach}</p>
              <p className="mt-1 text-[12.5px] text-[#9099b8]">Month to month. Move between levels as the results move.</p>
            </div>
            <a
              href="/book-call/"
              className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0b0b12] transition-all hover:bg-[#f1f1f6]"
            >
              Book a call
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </Reveal>
      <style jsx>{`
        .sp-pop {
          animation: spPop 0.35s ease-out;
        }
        @keyframes spPop {
          from {
            opacity: 0.3;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sp-pop {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
