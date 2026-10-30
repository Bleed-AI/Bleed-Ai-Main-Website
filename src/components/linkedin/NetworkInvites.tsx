"use client";

// Network growth section for /linkedin-authority/ (round 2, 2026-10-30). Replaces the abstract dot graph
// with what the client actually sees: LinkedIn's "Manage invitations" page, sent to buyers only,
// with some accepting. Weekly volume comes from the network-growth service in src/lib/slots.ts.
// Invented people, labelled Example.

import { useEffect, useState } from "react";
import SlotChip from "@/components/slots/SlotChip";
import { slotById } from "@/lib/slots";
import { SYS_FONT } from "@/components/shortlisted/BrowserFrame";
import { ExampleTag } from "@/components/shortlisted/ui";
import { useOnceInView } from "@/components/outbound/useOnceInView";

const PEOPLE = [
  { init: "JL", color: "#0f6b5c", name: "James Liu", head: "CFO at Northgate Clinics", when: "2 days ago", accepts: true },
  { init: "AS", color: "#a8579a", name: "Amira Saleh", head: "Controller at Harbor Logistics Group", when: "2 days ago", accepts: true },
  { init: "TB", color: "#5b6b8c", name: "Tom Becker", head: "Head of Finance at Fernway Retail", when: "3 days ago", accepts: false },
  { init: "PR", color: "#c26a2d", name: "Priya Raman", head: "VP Finance at Orbitly Software", when: "3 days ago", accepts: true },
  { init: "MK", color: "#3d6fb6", name: "Marcus King", head: "Finance Director at Kestrel Foods", when: "4 days ago", accepts: false },
];

/** Pull "150 to 200" style numbers out of the service copy, so the page follows the config. */
function weekly(text: string): [number, number] | null {
  const m = text.match(/(\d[\d,]*)\s+to\s+(\d[\d,]*)/);
  return m ? [Number(m[1].replace(/,/g, "")), Number(m[2].replace(/,/g, ""))] : null;
}

export default function NetworkInvites() {
  const s = slotById("network-growth");
  const range = weekly(s.monthly);
  const sentThisWeek = range ? Math.round((range[0] + range[1]) / 2) : null;
  const { ref, seen, reduced } = useOnceInView<HTMLDivElement>(0.3);
  const [accepted, setAccepted] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const order = PEOPLE.map((p, i) => (p.accepts ? i : -1)).filter((i) => i >= 0);
    if (reduced) {
      setAccepted(order.length);
      return;
    }
    const t = order.map((_, k) => setTimeout(() => setAccepted(k + 1), 700 + k * 650));
    return () => t.forEach(clearTimeout);
  }, [seen, reduced]);

  let shownAccepted = 0;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff5a52]">Buyer network growth</div>
        <h2 className="font-display text-[30px] font-bold leading-[1.1] text-white sm:text-[42px]">
          Your posts only work if <em className="hd-em">buyers see them.</em>
        </h2>
        <p className="mt-4 text-[15.5px] leading-relaxed text-[#9099b8] sm:text-[17px]">
          Most founders post to a network of old classmates, recruiters and vendors. We grow yours with the exact people you sell to, every week, so each post lands in front of a buyer.
        </p>
        <div className="mt-6 rounded-2xl border border-[#1f1f30] bg-[#0d0d16] p-5">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9099b8]">Every week</div>
          <p className="mt-1.5 text-[15px] leading-snug text-white">{s.monthly}.</p>
          <div className="mt-3">
            <SlotChip id="network-growth" size="sm" />
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-white">What you see on your LinkedIn</span>
          <ExampleTag>Example</ExampleTag>
        </div>
        <div
          className="overflow-hidden rounded-xl bg-white text-[#191919] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(0,0,0,0.08)]"
          style={{ fontFamily: SYS_FONT }}
        >
          <div className="flex items-center justify-between px-4 pb-0 pt-3.5">
            <span className="text-[16px] font-semibold">Manage invitations</span>
            {sentThisWeek && <span className="text-[12px] text-[#666]">{sentThisWeek} sent this week</span>}
          </div>
          <div className="mt-2 flex gap-5 border-b border-[#e8e8e8] px-4 text-[13.5px] font-semibold">
            <span className="pb-2.5 text-[#666]">Received</span>
            <span className="border-b-2 border-[#01754f] pb-2.5 text-[#01754f]">Sent</span>
          </div>
          <ul>
            {PEOPLE.map((p) => {
              const isAccepted = p.accepts && shownAccepted++ < accepted;
              return (
                <li key={p.name} className="flex items-center gap-3 border-b border-[#f0f0f0] px-4 py-3 last:border-b-0">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full text-[14px] font-semibold text-white" style={{ background: p.color }}>
                    {p.init}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold">{p.name}</span>
                    <span className="block truncate text-[12px] text-[#666]">{p.head}</span>
                    <span className="block text-[11.5px] text-[#666]">{isAccepted ? "Accepted your invitation" : `Sent ${p.when}`}</span>
                  </span>
                  {isAccepted ? (
                    <span className="flex-none rounded-full border border-[#0a66c2] px-3.5 py-1 text-[13px] font-semibold text-[#0a66c2]">Message</span>
                  ) : (
                    <span className="flex-none rounded-full px-2 py-1 text-[13px] font-semibold text-[#666]">Withdraw</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <p className="text-[12.5px] text-white/50">Every invitation goes to someone who fits your buyer. A short note goes with each one.</p>
      </div>
    </div>
  );
}
