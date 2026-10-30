"use client";

import { useState } from "react";
import { money, OUTBOUND_SPECIALIST } from "@/lib/slots";
import { useCountUp } from "./useCountUp";

/** The Outbound Specialist plan: a launch month, then one of three monthly levels picked from a dropdown. */
export default function SpecialistCard() {
  const S = OUTBOUND_SPECIALIST;
  const [pick, setPick] = useState(S.monthly[0].id);
  const level = S.monthly.find((m) => m.id === pick) ?? S.monthly[0];
  const shown = useCountUp(level.price, 420);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#2a2a3e] bg-[linear-gradient(120deg,#16101a,#0d0d16_60%)] p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#B1130F]/15 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="inline-block rounded-full border border-[#B1130F]/50 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#ff6b67]">
            Step up when outbound works
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-white">{S.name}</h3>
          <p className="mt-2 max-w-[460px] text-[14.5px] leading-relaxed text-[#9099b8]">{S.pitch}</p>
          <p className="mt-3 text-[12.5px] text-[#505570]">Not a slot board. Priced as one plan, month to month after launch.</p>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#0b0b14]/80 p-5">
          <div className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-4">
            <span className="text-[13px] text-[#9099b8]">{S.launch.label}</span>
            <span className="font-display text-xl font-bold text-white">{money(S.launch.price)}</span>
          </div>
          <label htmlFor="specialist-level" className="mt-4 block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#505570]">
            Then every month
          </label>
          <div className="relative mt-2">
            <select
              id="specialist-level"
              value={pick}
              onChange={(e) => setPick(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#2a2a3e] bg-[#141420] py-3 pl-4 pr-10 text-[14.5px] font-semibold text-white outline-none focus:border-[#B1130F]"
            >
              {S.monthly.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}, {money(m.price)} a month
                </option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9099b8]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
            </svg>
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-3">
            <span className="text-[13.5px] text-[#c3c8dc]">{level.reach}</span>
            <span className="whitespace-nowrap font-display text-2xl font-bold text-white">
              {money(shown)}
              <span className="ml-1 text-[12px] font-normal text-[#9099b8]">/mo</span>
            </span>
          </div>
          <a
            href="/book-call/"
            className="mt-5 block rounded-full bg-white px-5 py-3 text-center text-[14px] font-semibold text-[#07070d] transition-transform hover:scale-[1.02]"
          >
            Book a call
          </a>
        </div>
      </div>
    </div>
  );
}
