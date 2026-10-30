"use client";

import { useEffect, useState } from "react";
import { useOnceInView, useStepper } from "@/components/outbound/useOnceInView";

/**
 * Signature piece for /linkedin-authority/: research notes become a finished post with a carousel,
 * reactions arrive, and the engagers who fit the buyer move into a follow-up lane.
 * All content is an illustrative example. Plays once on view and holds the final frame.
 */

const NOTES = [
  { tag: "Competitor post", body: "The post that got the most comments in your market this month: month-end close horror stories." },
  { tag: "Buyer question", body: "\"How do we close the books faster without hiring?\" keeps coming up in your buyers' comments." },
  { tag: "Your call notes", body: "You cut a client's close from two weeks to four days. Nobody in your market is talking about how." },
];

const POST = `Month-end close is slow for the same three reasons.

1. Receipts chased by email
2. Reconciling in spreadsheets
3. One person approving everything

We fixed all three for a client last quarter. Swipe for the checklist we now give every new client.`;

const ENGAGERS = [
  { init: "MR", role: "VP Finance", co: "220 person software company", fit: true, color: "#4f8bff" },
  { init: "TK", role: "Recruiter", co: "Staffing agency", fit: false, color: "#6b7194" },
  { init: "AS", role: "Controller", co: "Logistics group", fit: true, color: "#a855f7" },
  { init: "JL", role: "CFO", co: "Healthcare clinics", fit: true, color: "#10b981" },
  { init: "PN", role: "Student", co: "Accounting course", fit: false, color: "#6b7194" },
  { init: "DO", role: "Head of Operations", co: "Online retail brand", fit: true, color: "#f59e0b" },
];

const STAGES = ["Research", "Post", "Reactions", "Follow-up"];

// Step map: 1-3 notes, 4 post, 5 carousel, 6 reactions, 7-12 engagers, 13 lane.
const TOTAL = 13;
const GAPS = [300, 300, 300, 450, 1300, 450, 250, 250, 250, 250, 250, 250, 500];

function stageOf(step: number) {
  if (step >= 13) return 3;
  if (step >= 6) return 2;
  if (step >= 4) return 1;
  return step >= 1 ? 0 : -1;
}

export default function PostEngine() {
  const { ref, seen, reduced } = useOnceInView<HTMLDivElement>(0.2);
  const [run, setRun] = useState(0);
  const step = useStepper(seen, TOTAL, GAPS, reduced, run);
  const stage = stageOf(step);

  // Type the post once step 4 is reached.
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (step < 4) {
      setChars(0);
      return;
    }
    if (reduced || step >= 6) {
      setChars(POST.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 5;
      setChars(Math.min(i, POST.length));
      if (i >= POST.length) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [step >= 4, step >= 6, reduced, run]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reactions count up at step 6.
  const [reacts, setReacts] = useState(0);
  useEffect(() => {
    if (step < 6) {
      setReacts(0);
      return;
    }
    if (reduced) {
      setReacts(1);
      return;
    }
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / 1400, 1);
      setReacts(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step >= 6, reduced, run]); // eslint-disable-line react-hooks/exhaustive-deps

  const shownEngagers = Math.max(0, Math.min(ENGAGERS.length, step - 6));
  const laneOn = step >= 13;
  const fits = ENGAGERS.filter((e) => e.fit);

  return (
    <div ref={ref} className="pe relative mx-auto max-w-6xl">
      {/* Header bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {STAGES.map((s, i) => (
            <span
              key={s}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold transition-all duration-500 ${
                stage >= i
                  ? "border-[#B1130F]/60 bg-[#B1130F]/15 text-white"
                  : "border-[#2a2a3e] bg-transparent text-[#6a7192]"
              }`}
            >
              <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[9.5px] ${stage >= i ? "bg-[#B1130F] text-white" : "bg-[#1f1f30] text-[#6a7192]"}`}>
                {i + 1}
              </span>
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#f5b544]">
            Example
          </span>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2a3e] px-3 py-1 text-[12px] font-semibold text-[#c3c8dc] transition-colors hover:border-white/30"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 109-9 9.7 9.7 0 00-6.7 2.8L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Replay
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr_1fr]">
        {/* 1. Research notes */}
        <div className="rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#12121c,#0a0a12)] p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9099b8]">Research notes</span>
            <span className="font-mono text-[10.5px] text-[#505570]">this week</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {NOTES.map((n, i) => (
              <div
                key={n.tag}
                className={`rounded-xl border border-[#262638] bg-[#0d0d16] p-3 transition-all duration-500 ${
                  step >= i + 1 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                } ${step >= 4 ? "border-l-2 border-l-[#B1130F]/70" : ""}`}
              >
                <span className="mb-1 inline-block rounded-md bg-[#B1130F]/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-[#ff8a86]">
                  {n.tag}
                </span>
                <p className="text-[13px] leading-snug text-[#c3c8dc]">{n.body}</p>
              </div>
            ))}
          </div>
          <div className={`mt-3 flex items-center gap-2 text-[12px] text-[#9099b8] transition-opacity duration-500 ${step >= 4 ? "opacity-100" : "opacity-0"}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff5a52" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="rotate-90 lg:rotate-0">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            Becomes one post, in your voice
          </div>
        </div>

        {/* 2. The post */}
        <div
          className={`rounded-2xl border border-[#2a2a3e] bg-[#11111a] p-4 transition-all duration-700 sm:p-5 ${
            step >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-30"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#B1130F,#ff5a3c)] text-[13px] font-bold text-white">
              YN
            </span>
            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold text-white">Your Name</div>
              <div className="truncate text-[11.5px] text-[#9099b8]">Founder at Example Finance Co. · 1d</div>
            </div>
            <span className="ml-auto text-[#4f8bff]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.94 5A1.94 1.94 0 113.06 5a1.94 1.94 0 013.88 0zM3.4 8.5h3.1V21H3.4V8.5zm5.2 0h2.97v1.7h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.73V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H8.6V8.5z" />
              </svg>
            </span>
          </div>
          <p className="mt-3 min-h-[180px] whitespace-pre-line text-[13.5px] leading-relaxed text-[#dfe3f0]">
            {POST.slice(0, chars)}
            {step >= 4 && chars < POST.length && <span className="pe-caret" />}
          </p>

          {/* Carousel */}
          <div className={`relative mt-3 h-[150px] transition-all duration-700 sm:h-[170px] ${step >= 5 ? "opacity-100" : "opacity-0"}`}>
            {[
              { n: "01", t: "Receipts by email", s: "Move them to one inbox the tool reads" },
              { n: "02", t: "Spreadsheet matching", s: "Let the bank feed do the first pass" },
            ].map((sl, i) => (
              <div
                key={sl.n}
                className="absolute top-0 h-full w-[62%] rounded-xl border border-[#2a2a3e] bg-[#0d0d16] p-3 transition-all duration-700"
                style={{
                  left: step >= 5 ? `${30 + i * 8}%` : "0%",
                  transform: `rotate(${step >= 5 ? 3 + i * 3 : 0}deg)`,
                  zIndex: 1 - i,
                  opacity: 0.8 - i * 0.3,
                }}
              >
                <span className="block text-right font-mono text-[11px] text-[#ff8a86]">{sl.n}</span>
                <span className="mt-3 ml-auto block h-2 w-1/2 rounded-full bg-white/15" />
                <span className="mt-2 ml-auto block h-2 w-1/3 rounded-full bg-white/10" />
              </div>
            ))}
            <div className="absolute left-0 top-0 z-10 flex h-full w-[62%] flex-col justify-between rounded-xl bg-[linear-gradient(150deg,#B1130F,#5e0a08)] p-3.5 shadow-[0_18px_40px_-12px_rgba(177,19,15,0.6)]">
              <span className="font-mono text-[10.5px] uppercase tracking-wide text-white/70">Checklist · 1 of 6</span>
              <div className="font-display text-[17px] font-bold leading-tight text-white sm:text-[19px]">
                3 things slowing your close
              </div>
              <span className="text-[11px] text-white/70">Swipe</span>
            </div>
          </div>

          {/* Reactions bar */}
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[12px] text-[#9099b8]">
            <span className="flex items-center gap-1.5">
              <span className="flex -space-x-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4f8bff] text-[8px] text-white">+</span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981] text-[8px] text-white">*</span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ff5a52] text-[8px] text-white">&#9829;</span>
              </span>
              <span className="tabular-nums text-white">{Math.round(reacts * 148)}</span>
            </span>
            <span className="tabular-nums">{Math.round(reacts * 37)} comments</span>
          </div>
        </div>

        {/* 3. Engagers and the follow-up lane */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#12121c,#0a0a12)] p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9099b8]">Who engaged</span>
              <span className="font-mono text-[10.5px] text-[#505570]">checked against your buyer</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {ENGAGERS.map((e, i) => {
                const on = i < shownEngagers;
                const moved = laneOn && e.fit;
                return (
                  <div
                    key={e.init}
                    className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-all duration-500 ${
                      on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                    } ${moved ? "bg-[#10b981]/[0.06]" : ""} ${on && !e.fit ? "opacity-50" : ""}`}
                  >
                    <span
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: e.color }}
                    >
                      {e.init}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-semibold text-white">{e.role}</span>
                      <span className="block truncate text-[11px] text-[#9099b8]">{e.co}</span>
                    </span>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        e.fit ? "bg-[#10b981]/15 text-[#34d399]" : "bg-white/5 text-[#6a7192]"
                      }`}
                    >
                      {e.fit ? "Fits your buyer" : "Not a buyer"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`rounded-2xl border p-4 transition-all duration-700 sm:p-5 ${
              laneOn ? "border-[#10b981]/40 bg-[linear-gradient(165deg,#0c1814,#0a0a12)] opacity-100" : "border-[#1f1f30] bg-[#0b0b12] opacity-40"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#34d399]">Follow-up lane</span>
              <span className="font-mono text-[10.5px] text-[#9099b8]">{laneOn ? fits.length : 0} buyers</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {fits.map((e, i) => (
                <span
                  key={e.init}
                  className={`inline-flex items-center gap-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 py-1 pl-1 pr-2.5 text-[11.5px] text-white transition-all duration-500 ${
                    laneOn ? "scale-100 opacity-100" : "scale-90 opacity-0"
                  }`}
                  style={{ transitionDelay: laneOn && !reduced ? `${i * 120}ms` : "0ms" }}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[8.5px] font-bold" style={{ background: e.color }}>
                    {e.init}
                  </span>
                  {e.role}
                </span>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11.5px]">
              <div className="rounded-lg border border-white/5 bg-black/20 p-2">
                <div className="font-semibold text-white">LinkedIn</div>
                <div className="text-[#9099b8]">A thank you and the checklist</div>
              </div>
              <div className="rounded-lg border border-white/5 bg-black/20 p-2">
                <div className="font-semibold text-white">Email</div>
                <div className="text-[#9099b8]">A short note a few days later</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pe-caret {
          display: inline-block;
          width: 7px;
          height: 14px;
          margin-left: 2px;
          vertical-align: -2px;
          background: #ff8a86;
          animation: peBlink 0.9s steps(2) infinite;
        }
        @keyframes peBlink {
          0%,
          50% {
            opacity: 1;
          }
          50.1%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
