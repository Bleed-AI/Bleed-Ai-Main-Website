"use client";

import { useState } from "react";
import { slotById, slotHref } from "@/lib/slots";

/** A slot as a pill with a hover / tap tooltip. Shared by every slot-model page (2026-10-30). */
export default function SlotChip({
  id,
  qty = 1,
  link = true,
  size = "md",
}: {
  id: string;
  qty?: number;
  link?: boolean;
  size?: "sm" | "md";
}) {
  const s = slotById(id);
  const [open, setOpen] = useState(false);
  const pad = size === "sm" ? "px-2.5 py-1 text-[12px]" : "px-3 py-1.5 text-[13px]";
  const body = (
    <>
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff3d38] shadow-[0_0_8px_#ff3d38]" />
      <span className="font-medium text-white/90">
        {qty > 1 ? `${qty} x ` : ""}
        {s.name}
      </span>
      {s.status === "soon" && (
        <span className="rounded-full bg-[#f59e0b]/15 px-1.5 py-[1px] text-[10px] font-semibold uppercase tracking-wide text-[#f5b544]">
          Soon
        </span>
      )}
    </>
  );
  const cls = `relative inline-flex items-center gap-2 rounded-full border border-[#2a2a3e] bg-[#141420] ${pad} transition-colors hover:border-[#B1130F]/60`;
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {link ? (
        <a href={slotHref(id)} className={cls}>
          {body}
        </a>
      ) : (
        <button type="button" className={cls} onClick={() => setOpen((v) => !v)}>
          {body}
        </button>
      )}
      {open && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-0 top-full z-40 mt-2 block w-[260px] rounded-xl border border-[#2a2a3e] bg-[#0d0d16] p-3 text-left text-[12.5px] leading-snug text-[#c3c8dc] shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
        >
          <span className="mb-1 block font-semibold text-white">{s.title}</span>
          <span className="mb-1.5 block text-[#9099b8]">{s.monthly}</span>
          {s.tooltip}
        </span>
      )}
    </span>
  );
}
