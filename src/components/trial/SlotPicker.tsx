"use client";

import { THEMES } from "@/lib/slots";
import { TRIAL_MAX, TRIAL_SLOTS } from "./trialData";

/** Compact picker for the 1 to 2 trial slots (2026-10-30). Picking a third swaps out the oldest. */
export default function SlotPicker({ picked, onToggle }: { picked: string[]; onToggle: (id: string) => void }) {
  const full = picked.length >= TRIAL_MAX;
  return (
    <div className="flex flex-col gap-5">
      {THEMES.map((t) => {
        const slots = TRIAL_SLOTS.filter((s) => s.theme === t.id);
        if (!slots.length) return null;
        return (
          <div key={t.id}>
            <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#9099b8]">{t.name}</div>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((s) => {
                const on = picked.includes(s.id);
                const locked = !!s.parent && !picked.includes(s.parent);
                const order = picked.indexOf(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={locked}
                    aria-pressed={on}
                    onClick={() => onToggle(s.id)}
                    title={locked ? undefined : s.monthly}
                    className={`group relative flex min-w-0 items-start gap-3 rounded-xl border px-3 py-2.5 text-left sm:px-3.5 sm:py-3 transition-all duration-200 ${
                      on
                        ? "border-[#ff3d38] bg-[#B1130F]/15 shadow-[0_0_0_1px_rgba(255,61,56,0.25),0_10px_30px_-12px_rgba(177,19,15,0.6)]"
                        : locked
                          ? "cursor-not-allowed border-[#1a1a28] bg-[#0d0d16] opacity-50"
                          : `border-[#22223a] bg-[#11111b] hover:border-[#B1130F]/60 ${full ? "opacity-80" : ""}`
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border text-[10px] font-bold ${
                        on ? "border-[#ff3d38] bg-[#ff3d38] text-white" : "border-white/25 text-transparent"
                      }`}
                    >
                      {on ? order + 1 : ""}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-semibold leading-tight text-white">{s.name}</span>
                      <span className="mt-0.5 hidden text-[12px] leading-snug text-[#9099b8] sm:block">
                        {locked ? `Pick ${TRIAL_SLOTS.find((x) => x.id === s.parent)?.name ?? "its parent"} first` : s.title}
                      </span>
                      {s.passThrough && !locked && (
                        <span className="mt-1 hidden text-[10.5px] text-[#f5b544]/90 sm:inline-block">{s.passThrough.label}</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
