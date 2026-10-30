"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/Reveal";
import SlotChip from "@/components/slots/SlotChip";
import { useInView, useReducedMotion, useTypewriter } from "./useHomeMotion";

/* Signature demos: the kind of work a slot produces, drawn in code. Every example uses invented companies. */

function Tile({ title, line, slot, children }: { title: string; line: string; slot: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#1f1f30] bg-[linear-gradient(170deg,#141420,#0b0b14)] p-4 sm:p-5">
      <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a12]">
        <span className="absolute right-2.5 top-2.5 z-10 rounded-full border border-white/10 bg-black/50 px-2 py-[2px] text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#9099b8]">
          Example
        </span>
        {children}
      </div>
      <h3 className="font-display mt-4 text-[18px] font-bold leading-tight text-white">{title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#9099b8]">{line}</p>
      <div className="mt-3">
        <SlotChip id={slot} size="sm" />
      </div>
    </div>
  );
}

const ASSISTANTS = [
  { name: "ChatGPT", verdict: "Named you, 1st", ok: true },
  { name: "Claude", verdict: "Named you, 2nd", ok: true },
  { name: "Perplexity", verdict: "Named you, 1st", ok: true },
  { name: "Google AI", verdict: "Not yet, on the fix list", ok: false },
];

function ShortlistedCheck() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const reduce = useReducedMotion();
  const q = "Best payroll software for a 30 person startup?";
  const typed = useTypewriter(q, inView, 30, reduce);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (typed.length < q.length) return;
    if (reduce) {
      setShown(ASSISTANTS.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= ASSISTANTS.length) clearInterval(id);
    }, 550);
    return () => clearInterval(id);
  }, [typed, reduce]);
  const named = ASSISTANTS.slice(0, shown).filter((a) => a.ok).length;
  return (
    <div ref={ref} className="flex h-full flex-col p-4 pt-10">
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7d84a3]">Buyer question</div>
      <div className="mt-1 min-h-[38px] text-[13px] font-medium leading-snug text-white">
        {typed}
        {typed.length < q.length && <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-white/70" />}
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        {ASSISTANTS.map((a, i) => {
          const on = i < shown;
          return (
            <div key={a.name} className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
              <span className="text-[12px] font-semibold text-white/90">{a.name}</span>
              <span
                className={`truncate text-[11px] font-semibold transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"} ${
                  a.ok ? "text-[#34d399]" : "text-[#f5b544]"
                }`}
              >
                {a.ok ? "✓ " : ""}
                {a.verdict}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-auto pt-3 text-[12px] text-[#9099b8]">
        Named in <span className="font-display text-[18px] font-bold text-white">{named}</span> of {ASSISTANTS.length} assistants
      </div>
    </div>
  );
}

function InteractiveArticle() {
  const [days, setDays] = useState(21);
  const invoice = 8000;
  const cost = Math.round(invoice * 0.0006 * days + days * 9);
  const pct = Math.min(100, (cost / 600) * 100);
  return (
    <div className="flex h-full flex-col p-4 pt-10">
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7d84a3]">northwind.com/blog</div>
      <div className="font-display mt-1 text-[15px] font-bold leading-snug text-white">What a late invoice really costs a 20 person agency</div>
      <p className="mt-2 text-[12px] leading-relaxed text-[#b4b9cf]">
        If clients pay you <span className="font-semibold text-white">{days} days</span> late, every {"$8,000"} invoice costs you about{" "}
        <span className="font-semibold text-[#34d399]">${cost.toLocaleString("en-US")}</span> in cash you cannot use and time spent chasing.
      </p>
      <div className="mt-auto pt-4">
        <label className="flex items-center justify-between text-[11px] text-[#9099b8]" htmlFor="demo-days">
          <span>Days late, on average</span>
          <span className="font-mono-bai text-white">{days}</span>
        </label>
        <input
          id="demo-days"
          type="range"
          min={0}
          max={60}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="mt-1.5 w-full accent-[#B1130F]"
        />
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#B1130F] to-[#ff5a3c] transition-all duration-200" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-1.5 text-[10.5px] text-[#7d84a3]">Drag it. The article does the maths for the reader.</div>
      </div>
    </div>
  );
}

function LeadMagnetCalc() {
  const [team, setTeam] = useState(12);
  const [hours, setHours] = useState(4);
  const yearly = team * hours * 48;
  const cost = yearly * 45;
  return (
    <div className="flex h-full flex-col p-4 pt-10">
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7d84a3]">Reporting time calculator</div>
      <div className="mt-3 flex flex-col gap-3">
        <div>
          <label className="flex justify-between text-[11px] text-[#9099b8]" htmlFor="demo-team">
            <span>People on the team</span>
            <span className="font-mono-bai text-white">{team}</span>
          </label>
          <input id="demo-team" type="range" min={2} max={60} value={team} onChange={(e) => setTeam(Number(e.target.value))} className="mt-1 w-full accent-[#B1130F]" />
        </div>
        <div>
          <label className="flex justify-between text-[11px] text-[#9099b8]" htmlFor="demo-hours">
            <span>Hours each on reports, weekly</span>
            <span className="font-mono-bai text-white">{hours}</span>
          </label>
          <input id="demo-hours" type="range" min={1} max={12} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="mt-1 w-full accent-[#B1130F]" />
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-[#B1130F]/35 bg-[#B1130F]/[0.08] p-3">
        <div className="text-[11px] text-[#c3c8dc]">Your team spends</div>
        <div className="font-display text-[24px] font-bold leading-none text-white">
          {yearly.toLocaleString("en-US")} <span className="text-[13px] font-semibold text-[#9099b8]">hours a year</span>
        </div>
        <div className="mt-1 text-[11px] text-[#ff8a85]">About ${cost.toLocaleString("en-US")} in salary</div>
      </div>
      <div className="mt-auto pt-3">
        <div className="flex gap-1.5">
          <div className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/30 px-2 py-1.5 text-[11px] text-white/30">Work email</div>
          <span className="shrink-0 rounded-md bg-[#B1130F] px-2.5 py-1.5 text-[11px] font-semibold text-white">Get the report</span>
        </div>
      </div>
    </div>
  );
}

const REEL_LINES = ["Most founders post.", "Few get booked.", "Here is the gap."];

function ReelMock() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setLine((l) => (l + 1) % REEL_LINES.length), 1800);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <div className="flex h-full items-center justify-center p-4 pt-9">
      <div className="relative aspect-[9/16] h-[270px] overflow-hidden rounded-[22px] border-[3px] border-[#262638] bg-[radial-gradient(ellipse_at_30%_20%,#4a1210,#12121d_60%,#07070d)] shadow-[0_20px_50px_-20px_rgba(177,19,15,0.6)]">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 pt-2.5 text-[9px] font-semibold text-white/70">
          <span>Video</span>
          <span className="font-mono-bai">0:30</span>
        </div>
        <div className="absolute left-1/2 top-[30%] h-16 w-16 -translate-x-1/2 rounded-full border border-white/15 bg-[linear-gradient(135deg,#2a2a3e,#141420)]">
          <span className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-white/80">DR</span>
          <span className="reel-ring absolute -inset-1.5 rounded-full border-2 border-[#ff5a3c]/60" />
        </div>
        <div className="absolute inset-x-3 bottom-[22%] text-center">
          <span key={line} className="reel-cap inline-block rounded-md bg-white px-2 py-1 font-display text-[15px] font-bold leading-tight text-black">
            {REEL_LINES[line]}
          </span>
        </div>
        <div className="absolute inset-x-3 bottom-3 h-[3px] overflow-hidden rounded-full bg-white/15">
          <div className="reel-bar h-full rounded-full bg-[#ff5a3c]" />
        </div>
      </div>
      <style jsx global>{`
        .reel-bar {
          width: 62%;
          animation: reelBar 5.4s linear infinite;
        }
        .reel-cap {
          animation: reelCap 0.35s cubic-bezier(0.2, 0.9, 0.25, 1.2) both;
        }
        .reel-ring {
          animation: reelRing 1.8s ease-in-out infinite;
        }
        @keyframes reelBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @keyframes reelCap {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes reelRing {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.3;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .reel-bar,
          .reel-cap,
          .reel-ring {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function Demos() {
  return (
    <section id="demos" className="relative border-y border-[#1f1f30] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="sec-label">Not an agency shop</Reveal>
        <Reveal as="h2" className="font-display mb-4 max-w-3xl text-[32px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px]">
          Work your buyers <em className="hd-em">actually stop for.</em>
        </Reveal>
        <Reveal as="p" className="mb-12 max-w-2xl text-[16px] leading-relaxed text-[#9099b8]" delay={60}>
          Not another blog post nobody reads. These are the kinds of things your slots make. All four run today, so try them.
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Reveal className="h-full">
            <Tile title="The Shortlisted check" line="Your buyers' real questions, asked to every AI assistant, every month. You see who gets named." slot="ai-search">
              <ShortlistedCheck />
            </Tile>
          </Reveal>
          <Reveal className="h-full" delay={70}>
            <Tile title="Interactive articles" line="Articles your reader can play with, so they stay, share and remember who wrote it." slot="articles">
              <InteractiveArticle />
            </Tile>
          </Reveal>
          <Reveal className="h-full" delay={140}>
            <Tile title="Lead magnet apps" line="A small tool on your site that gives a real answer, and asks for an email to send the full one." slot="lead-magnet-app">
              <LeadMagnetCalc />
            </Tile>
          </Reveal>
          <Reveal className="h-full" delay={210}>
            <Tile title="Video" line="Idea, script and editing handled for you. You spend about 10 minutes reading the script." slot="video">
              <ReelMock />
            </Tile>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
