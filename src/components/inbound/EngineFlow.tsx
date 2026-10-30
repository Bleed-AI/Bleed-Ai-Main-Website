"use client";

// Signature piece 3 for /inbound-engine: visitors flowing through the four slots into a leads counter.
// A simulation with example numbers, labelled as such. Slot names come from src/lib/slots.ts.

import { useEffect, useRef, useState } from "react";
import SlotChip from "@/components/slots/SlotChip";
import { ExampleTag, useInView, useReducedMotion } from "@/components/shortlisted/ui";

const STAGES = [
  { slot: "linkedin-posts", role: "Posts put you in your buyers' feed every week and send them to your articles.", extra: "" },
  { slot: "articles", role: "Articles answer the questions buyers type into Google and ChatGPT, then point to your tool.", extra: "+ visitors from Google and AI answers" },
  { slot: "lead-magnet-app", role: "The tool gives them a real answer and asks for an email in return.", extra: "" },
  { slot: "page-revamp", role: "Your homepage turns the interested ones into booked calls.", extra: "" },
];

const DUR = 9; // seconds for one visitor to cross the whole engine
const DOTS = 18;
// How far each visitor gets: 1 = drops after posts, 4 = becomes a lead.
const REACH = [4, 1, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 1, 4, 2, 1, 3, 2];

function keyframes(): string {
  // Where each kind of visitor stops, as a share of the track (0 = posts, 1 = the leads counter).
  const ends = [0.15, 0.4, 0.65, 1];
  let css = "";
  ends.forEach((e, idx) => {
    const r = idx + 1;
    const arrive = (e * 94).toFixed(1);
    const gone = (e * 94 + 5).toFixed(1);
    const pos = `${e * 100}%`;
    for (const [axis, prop] of [["x", "left"], ["y", "top"]] as const) {
      css += `@keyframes ef-${axis}-${r}{0%{${prop}:0%;opacity:0}3%{opacity:1}${arrive}%{${prop}:${pos};opacity:1}${gone}%{${prop}:${pos};opacity:0}100%{${prop}:${pos};opacity:0}}`;
    }
  });
  return css;
}

export default function EngineFlow({ extraLeads = 0 }: { extraLeads?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const seen = useInView(ref, 0.25);
  const reduce = useReducedMotion();
  const [leads, setLeads] = useState(0);
  const [pulse, setPulse] = useState(0);
  const running = seen && !reduce;
  const last = useRef<HTMLDivElement | null>(null);
  const [mobileBottom, setMobileBottom] = useState(120);

  // The vertical track ends at the leads counter's tick, whatever height that card ends up.
  useEffect(() => {
    const el = last.current;
    if (!el) return;
    const fit = () => setMobileBottom(Math.max(0, el.offsetHeight - 38));
    fit();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    REACH.forEach((r, i) => {
      if (r !== 4) return;
      // Dots start already in flight (negative delay), so the first leads arrive within seconds.
      const offset = (i * DUR) / DOTS;
      const first = (((DUR * 0.94 - offset) % DUR) + DUR) % DUR;
      timers.push(
        setTimeout(() => {
          setLeads((n) => n + 1);
          setPulse((p) => p + 1);
          intervals.push(
            setInterval(() => {
              setLeads((n) => n + 1);
              setPulse((p) => p + 1);
            }, DUR * 1000)
          );
        }, first * 1000)
      );
    });
    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [running]);

  const total = leads + extraLeads;

  return (
    <div ref={ref}>
      <style>{`
        ${keyframes()}
        .ef-dot { position: absolute; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 9999px; background: #34d399; box-shadow: 0 0 10px 2px rgba(52,211,153,.7); opacity: 0; animation-timing-function: linear; animation-iteration-count: infinite; animation-duration: ${DUR}s; left: 0; top: 0; }
        .ef-track-y .ef-dot { left: 50%; }
        .ef-track-x .ef-dot { top: 50%; }
        @keyframes ef-pop { 0% { transform: scale(1); } 40% { transform: scale(1.12); } 100% { transform: scale(1); } }
      `}</style>

      <div className="mb-4 flex justify-end">
        <ExampleTag>Simulation, example numbers</ExampleTag>
      </div>

      <div className="relative">
        {/* Desktop track (horizontal) */}
        <div className="ef-track-x pointer-events-none absolute left-[10%] right-[10%] top-[38px] hidden h-[2px] bg-gradient-to-r from-[#10b981]/10 via-[#10b981]/35 to-[#10b981]/60 lg:block" aria-hidden="true">
          {running &&
            REACH.map((r, i) => (
              <span key={i} className="ef-dot" style={{ animationName: `ef-x-${r}`, animationDelay: `-${(i * DUR) / DOTS}s` }} />
            ))}
        </div>
        {/* Mobile track (vertical) */}
        <div style={{ bottom: mobileBottom }}
          className="ef-track-y pointer-events-none absolute left-[19px] top-[38px] w-[2px] bg-gradient-to-b from-[#10b981]/10 via-[#10b981]/35 to-[#10b981]/60 lg:hidden" aria-hidden="true">
          {running &&
            REACH.map((r, i) => (
              <span key={i} className="ef-dot" style={{ animationName: `ef-y-${r}`, animationDelay: `-${(i * DUR) / DOTS}s` }} />
            ))}
        </div>

        <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-4">
          {STAGES.map((s, i) => (
            <div key={s.slot} className="relative pl-12 lg:pl-0">
              <div className="absolute left-[8px] top-[26px] flex h-6 w-6 items-center justify-center rounded-full border border-[#10b981]/50 bg-[#0b0b12] font-mono text-[11px] font-bold text-[#7af0bf] lg:static lg:mx-auto lg:mb-0 lg:mt-[26px] lg:h-6 lg:w-6">
                {i + 1}
              </div>
              <div className="rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-5 lg:mt-5 lg:min-h-[208px]">
                <div className="mb-3">
                  <SlotChip id={s.slot} size="sm" />
                </div>
                <p className="text-[13.5px] leading-snug text-white/70">{s.role}</p>
                {s.extra && <div className="mt-3 inline-block rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/55">{s.extra}</div>}
              </div>
            </div>
          ))}

          {/* Leads counter */}
          <div ref={last} className="relative pl-12 lg:pl-0">
            <div className="absolute left-[8px] top-[26px] flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981] text-[#04120c] lg:static lg:mx-auto lg:mt-[26px]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7" />
              </svg>
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-[#10b981]/40 bg-[linear-gradient(165deg,#0f1f1a,#0b0b12)] p-5 shadow-[0_0_50px_-20px_rgba(16,185,129,0.7)] lg:mt-5 lg:min-h-[208px]">
              <div className="text-[12px] font-semibold uppercase tracking-wide text-[#7af0bf]">Leads in your inbox</div>
              <div key={pulse} className="mt-1 font-display text-[44px] font-bold leading-none text-white tabular-nums" style={{ animation: running ? "ef-pop .5s ease" : "none" }}>
                {reduce ? "+" : total}
              </div>
              <p className="mt-2 text-[12px] leading-snug text-white/50">
                {extraLeads > 0 ? `${extraLeads === 1 ? "One is" : `${extraLeads} are`} yours, from the calculator above.` : "Each with their numbers and the question that brought them."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-dashed border-white/15 px-4 py-3.5 text-[13.5px] leading-snug text-white/65 sm:items-center">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#ff6b67] sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>
          Then it loops. What your leads ask, and which articles they read, decides next month's posts, articles and app. If one slot stops pulling its weight, swap it.
        </span>
      </div>
    </div>
  );
}
