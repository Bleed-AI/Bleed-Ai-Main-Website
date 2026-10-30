"use client";

import type { ReactNode } from "react";
import SlotChip from "@/components/slots/SlotChip";
import { SWAP_LINE } from "@/lib/slots";

/**
 * Services a client can swap in on /linkedin-authority/, as chips with the swap line.
 * Own copy of the outbound kit's SwapIns so the visitor words stay "service" (round 2, 2026-10-30).
 */
export default function SwapInServices({ ids, note }: { ids: string[]; note?: ReactNode }) {
  return (
    <div className="mt-10 rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#11111b,#0a0a12)] p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-display text-lg font-bold text-white">Swap in any time</h3>
        <span className="text-[13px] text-[#9099b8]">{SWAP_LINE}</span>
      </div>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#9099b8]">
        Each service is a full service on its own. If one isn&apos;t pulling its weight, swap it for one of these next month, or for anything else on the menu.
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
