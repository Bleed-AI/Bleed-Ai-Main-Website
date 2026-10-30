"use client";

import { useState } from "react";
import { money, OUTBOUND_SPECIALIST } from "@/lib/slots";

/**
 * Outbound Specialist as a plan card that sits in the Outbound plan grid (pricing page and /outbound),
 * next to the service-built plans and the build-your-own card. Level picked from a dropdown (Taha 2026-10-30).
 */
export default function SpecialistPlanCard() {
  const S = OUTBOUND_SPECIALIST;
  const [pick, setPick] = useState(S.monthly[0].id);
  const level = S.monthly.find((m) => m.id === pick) ?? S.monthly[0];

  return (
    <div
      id="specialist"
      className="relative flex h-full scroll-mt-24 flex-col rounded-2xl border border-[#2a2a3e] bg-[linear-gradient(165deg,#17111c,#0b0b14_60%)] p-6 sm:p-7"
    >
      <span className="absolute -top-3 left-6 rounded-full border border-[#B1130F]/60 bg-[#0d0d16] px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#ff6b67]">
        When outbound already works
      </span>
      <h3 className="font-display text-xl font-bold text-white">{S.name}</h3>
      <p className="mt-1.5 text-[14px] leading-snug text-[#9099b8]">{S.pitch}</p>

      <label htmlFor="specialist-level" className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#505570]">
        Pick your level
      </label>
      <div className="relative mt-2">
        <select
          id="specialist-level"
          value={pick}
          onChange={(e) => setPick(e.target.value)}
          className="w-full appearance-none rounded-lg border border-[#2a2a3e] bg-[#141420] py-2.5 pl-3.5 pr-10 text-[14px] font-semibold text-white outline-none focus:border-[#B1130F]"
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

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#505570]">What you get every month</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {level.items.map((t) => (
          <li key={t} className="flex gap-2.5 text-[13px] leading-snug text-[#c3c8dc]">
            <svg className="mt-[3px] h-4 w-4 flex-none text-[#ff3d38]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" />
            </svg>
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-white/5 pt-5">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-2xl font-bold text-white">{money(level.price)}</span>
          <span className="text-[13px] text-[#9099b8]">a month</span>
        </div>
        <p className="mt-1.5 text-[12px] leading-snug text-[#9099b8]">
          After a {money(S.launch.price)} launch month: {S.launch.items.join(", ").toLowerCase()}.
        </p>
      </div>
      <div className="mt-auto pt-6">
        <a
          href="/book-call/"
          className="block rounded-full bg-white px-5 py-3 text-center text-[14px] font-semibold text-[#07070d] transition-transform hover:scale-[1.02]"
        >
          Book a call
        </a>
      </div>
    </div>
  );
}
