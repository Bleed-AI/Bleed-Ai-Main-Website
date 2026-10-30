"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { SectionHead } from "./OutcomeKit";

// Numbers and screenshots exactly as published in today's Campaign Snapshots on bleedai.com
// (PROOF-AND-CREDIBILITY.md section 1a). Never edit a number without a source.
const CAMPAIGNS = [
  {
    title: "SaaS signup trial offer",
    opps: "529",
    stats: [
      { v: "11,436", l: "Sequences started" },
      { v: "8.32%", l: "Reply rate" },
      { v: "55.57%", l: "Positive replies" },
    ],
    image: "/images/saas-signup-trial-offer.png",
  },
  {
    title: "Coaching offer",
    opps: "241",
    stats: [
      { v: "14,687", l: "Sequences started" },
      { v: "5.11%", l: "Reply rate" },
      { v: "32.13%", l: "Positive replies" },
    ],
    image: "https://calculator.bleedai.com/campaign-results/coaching-offer.png",
  },
  {
    title: "Paid events tickets offer",
    opps: "102",
    stats: [
      { v: "17,181", l: "Sequences started" },
      { v: "2%", l: "Reply rate" },
      { v: "65.8%", l: "Positive replies" },
    ],
    image: "/images/onezerotwo-oppurtunity-snaps.png",
  },
  {
    title: "SaaS and tech, video production",
    opps: "45",
    stats: [
      { v: "423", l: "Sequences started" },
      { v: "10.17%", l: "Reply rate" },
      { v: "46%", l: "Positive replies" },
    ],
    image: "/images/video-production-camp.png",
  },
];

export default function OutboundProof() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Proof"
          title={
            <>
              Real campaigns. <em className="hd-em">Real numbers.</em>
            </>
          }
          sub="Outbound is where we started. These are screenshots from campaigns we ran, straight from the sending dashboard. Tap one to see it full size."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAMPAIGNS.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 70}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] transition-colors hover:border-[#B1130F]/40"
            >
              <div className="p-5">
                <div className="text-[13px] font-semibold text-[#c3c8dc]">{c.title}</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-[44px] font-bold leading-none text-white">{c.opps}</span>
                  <span className="text-[13px] text-[#9099b8]">opportunities</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/5 pt-3">
                  {c.stats.map((s) => (
                    <div key={s.l}>
                      <div className="text-[14.5px] font-bold text-white tabular-nums">{s.v}</div>
                      <div className="text-[10.5px] leading-tight text-[#9099b8]">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(c.image)}
                className="group mt-auto block border-t border-white/5 bg-[#0b0b12] p-3"
                aria-label={`Open the ${c.title} screenshot`}
              >
                <span className="block overflow-hidden rounded-lg border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={`${c.title} campaign dashboard`} loading="lazy" className="h-[120px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button type="button" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open} alt="Campaign dashboard" className="max-h-[85vh] max-w-full rounded-xl bg-white object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
