"use client";

import { useState, type ReactNode } from "react";
import { useOnceInView, useStepper } from "./useOnceInView";

/**
 * Signature piece for /outbound/: a signal appears, the right people at that company are found,
 * email and LinkedIn reach them, a reply arrives and is answered, a meeting lands on the calendar.
 * Illustrative example content. Plays once on view and holds the final frame.
 */

const STAGES = ["Signal", "People", "Outreach", "Reply", "Meeting"];

const PEOPLE = [
  { init: "VS", role: "VP of Sales", note: "Signs the deal", color: "#ff5a52" },
  { init: "RO", role: "Head of Revenue Ops", note: "Feels the pain", color: "#a855f7" },
  { init: "CO", role: "COO", note: "Approves the budget", color: "#4f8bff" },
];

const TOUCHES = [
  { day: "Day 1", ch: "Email", to: "VP of Sales", what: "A short note about the new role", color: "#ff5a52" },
  { day: "Day 2", ch: "LinkedIn", to: "VP of Sales", what: "Connection request with a line for them", color: "#4f8bff" },
  { day: "Day 3", ch: "Email", to: "Head of Revenue Ops", what: "A different angle, same problem", color: "#ff5a52" },
  { day: "Day 6", ch: "Email", to: "VP of Sales", what: "One useful follow-up", color: "#ff5a52" },
];

// 1 signal · 2-4 people · 5-8 touches · 9 reply in · 10 drafting · 11 reply out · 12 meeting
const TOTAL = 12;
const GAPS = [350, 450, 250, 250, 450, 280, 280, 280, 550, 550, 650, 650];

function stageOf(s: number) {
  if (s >= 12) return 4;
  if (s >= 9) return 3;
  if (s >= 5) return 2;
  if (s >= 2) return 1;
  return s >= 1 ? 0 : -1;
}

function Card({
  n,
  title,
  active,
  done,
  className = "",
  children,
}: {
  n: number;
  title: string;
  active: boolean;
  done: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative rounded-2xl border p-4 transition-all duration-700 sm:p-5 ${
        active
          ? "border-[#B1130F]/60 bg-[linear-gradient(165deg,#1a0e12,#0b0b14)] shadow-[0_20px_60px_-30px_rgba(177,19,15,0.7)]"
          : done
          ? "border-[#2a2a3e] bg-[linear-gradient(165deg,#131320,#0b0b14)]"
          : "border-[#1a1a28] bg-[#0b0b12] opacity-45"
      } ${className}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
            done || active ? "bg-[#B1130F] text-white" : "bg-[#1f1f30] text-[#6a7192]"
          }`}
        >
          {n}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c3c8dc]">{title}</span>
      </div>
      {children}
    </div>
  );
}

export default function SignalToMeeting() {
  const { ref, seen, reduced } = useOnceInView<HTMLDivElement>(0.2);
  const [run, setRun] = useState(0);
  const s = useStepper(seen, TOTAL, GAPS, reduced, run);
  const stage = stageOf(s);
  const pct = stage < 0 ? 0 : (stage / (STAGES.length - 1)) * 100;
  const shownPeople = Math.max(0, Math.min(PEOPLE.length, s - 1));
  const shownTouches = Math.max(0, Math.min(TOUCHES.length, s - 4));

  return (
    <div ref={ref} className="mx-auto max-w-6xl">
      {/* Rail */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
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
      <div className="relative mb-8 px-2 sm:px-6">
        <div className="absolute left-4 right-4 top-[13px] h-[3px] rounded-full bg-[#1f1f30] sm:left-10 sm:right-10" />
        <div className="absolute left-4 right-4 top-[13px] h-[3px] sm:left-10 sm:right-10">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#B1130F,#ff5a3c)] shadow-[0_0_12px_rgba(255,90,60,0.6)]"
            style={{ width: `${pct}%`, transition: reduced ? "none" : "width 700ms ease" }}
          />
        </div>
        <div className="relative flex justify-between">
          {STAGES.map((label, i) => (
            <div key={label} className="flex w-14 flex-col items-center gap-2 sm:w-20">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-all duration-500 ${
                  stage >= i
                    ? "border-[#ff5a3c] bg-[#B1130F] text-white shadow-[0_0_14px_rgba(255,90,60,0.6)]"
                    : "border-[#2a2a3e] bg-[#0b0b12] text-[#6a7192]"
                }`}
              >
                {stage > i || (i === 4 && stage === 4) ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className={`text-[11px] font-semibold sm:text-[12.5px] ${stage >= i ? "text-white" : "text-[#6a7192]"}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-6">
        {/* 1. Signal */}
        <Card n={1} title="A signal appears" active={stage === 0} done={stage > 0} className="lg:col-span-2">
          <div className={`transition-all duration-500 ${s >= 1 ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-[#ff5a52] ${reduced ? "" : "animate-ping"} opacity-60`} />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff5a52]" />
              </span>
              <span className="font-mono text-[11px] text-[#ff8a86]">Job post · 2 days ago</span>
            </div>
            <div className="mt-2.5 font-display text-[18px] font-bold leading-snug text-white">Example Freight Co. is hiring a Head of Sales Operations</div>
            <p className="mt-2 text-[13px] leading-snug text-[#9099b8]">
              A new sales ops hire means their pipeline is a problem right now. That is the moment your offer is most relevant.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
              {["Logistics", "180 people", "Fits your buyer"].map((t, i) => (
                <span key={t} className={`rounded-md px-2 py-0.5 ${i === 2 ? "bg-[#10b981]/15 text-[#34d399]" : "bg-white/5 text-[#c3c8dc]"}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* 2. People */}
        <Card n={2} title="The right people" active={stage === 1} done={stage > 1} className="lg:col-span-2">
          <div className="flex flex-col gap-2">
            {PEOPLE.map((p, i) => (
              <div
                key={p.role}
                className={`flex items-center gap-2.5 rounded-xl border border-[#262638] bg-[#0d0d16] px-2.5 py-2 transition-all duration-500 ${
                  i < shownPeople ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                }`}
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[10.5px] font-bold text-white" style={{ background: p.color }}>
                  {p.init}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-white">{p.role}</span>
                  <span className="block truncate text-[11.5px] text-[#9099b8]">{p.note}</span>
                </span>
                <span className="flex flex-shrink-0 gap-1">
                  <span title="Email checked" className="rounded-md bg-[#ff5a52]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#ff8a86]">
                    Email
                  </span>
                  <span title="LinkedIn found" className="rounded-md bg-[#4f8bff]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#8fb4ff]">
                    in
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* 3. Outreach */}
        <Card n={3} title="Email and LinkedIn" active={stage === 2} done={stage > 2} className="lg:col-span-2">
          <div className="relative flex flex-col gap-2 pl-4">
            <span className="absolute bottom-2 left-[5px] top-2 w-px bg-[#2a2a3e]" />
            {TOUCHES.map((t, i) => (
              <div
                key={t.day + t.to}
                className={`relative transition-all duration-500 ${i < shownTouches ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
              >
                <span className="absolute -left-4 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-[#0b0b14]" style={{ background: t.color }} />
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10.5px] text-[#9099b8]">{t.day}</span>
                  <span className="text-[12.5px] font-semibold" style={{ color: t.color === "#4f8bff" ? "#8fb4ff" : "#ff8a86" }}>
                    {t.ch}
                  </span>
                  <span className="truncate text-[11.5px] text-[#9099b8]">to {t.to}</span>
                </div>
                <div className="text-[12.5px] leading-snug text-[#c3c8dc]">{t.what}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* 4. Reply */}
        <Card n={4} title="A reply, handled" active={stage === 3} done={stage > 3} className="lg:col-span-3">
          <div className="flex flex-col gap-2.5">
            <div className={`max-w-[88%] transition-all duration-500 ${s >= 9 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
              <div className="mb-1 text-[11px] text-[#9099b8]">VP of Sales, Example Freight Co.</div>
              <div className="rounded-2xl rounded-tl-md border border-[#2a2a3e] bg-[#161622] px-3.5 py-2.5 text-[13.5px] leading-snug text-[#e4e7f2]">
                Funny timing, we are hiring for exactly this. What would it look like for us?
              </div>
            </div>
            <div className={`flex items-center gap-2 self-end text-[11.5px] text-[#9099b8] transition-opacity duration-300 ${s === 10 ? "opacity-100" : "h-0 overflow-hidden opacity-0"}`}>
              Drafting a reply in your voice
              <span className="flex gap-0.5">
                <i className="ob-dot" />
                <i className="ob-dot" style={{ animationDelay: "0.15s" }} />
                <i className="ob-dot" style={{ animationDelay: "0.3s" }} />
              </span>
            </div>
            <div className={`ml-auto max-w-[88%] transition-all duration-500 ${s >= 11 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
              <div className="rounded-2xl rounded-tr-md bg-[linear-gradient(135deg,#B1130F,#7d0d0a)] px-3.5 py-2.5 text-[13.5px] leading-snug text-white">
                Happy to show you. It takes 20 minutes. Does Tuesday at 10 or Wednesday at 2 work?
              </div>
              <div className="mt-1.5 flex items-center justify-end gap-1.5 text-[11px] text-[#34d399]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
                Answered in minutes, checked by a person
              </div>
            </div>
            <div className={`mt-1 grid grid-cols-1 gap-1.5 border-t border-white/5 pt-3 text-[11.5px] transition-opacity duration-500 sm:grid-cols-3 ${s >= 11 ? "opacity-100" : "opacity-0"}`}>
              {[
                { k: "Interested", v: "Booked and handed to you", c: "#34d399" },
                { k: "Not now", v: "Parked, picked up later", c: "#f5b544" },
                { k: "Remove me", v: "Stopped at once", c: "#9099b8" },
              ].map((x) => (
                <div key={x.k} className="rounded-lg bg-black/20 px-2.5 py-1.5">
                  <span className="font-semibold" style={{ color: x.c }}>
                    {x.k}
                  </span>
                  <span className="text-[#9099b8]">: {x.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 5. Meeting */}
        <Card n={5} title="On your calendar" active={stage === 4} done={false} className="lg:col-span-3">
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
              <span key={d} className="text-[11px] font-semibold text-[#9099b8]">
                {d}
              </span>
            ))}
            {Array.from({ length: 15 }, (_, i) => {
              const day = i % 5;
              const row = Math.floor(i / 5);
              const isMeeting = day === 1 && row === 0;
              const busy = (day === 3 && row === 1) || (day === 0 && row === 2) || (day === 4 && row === 0);
              return (
                <span
                  key={i}
                  className={`relative h-12 rounded-lg border sm:h-14 ${
                    isMeeting && s >= 12
                      ? "border-[#10b981]/60 bg-[#10b981]/15"
                      : busy
                      ? "border-[#2a2a3e] bg-[#1a1a28]"
                      : "border-[#1a1a28] bg-[#0d0d16]"
                  }`}
                >
                  {isMeeting && (
                    <span
                      className={`absolute inset-0 flex flex-col items-center justify-center px-0.5 transition-all duration-500 ${
                        s >= 12 ? "scale-100 opacity-100" : "scale-75 opacity-0"
                      }`}
                    >
                      <span className="text-[10px] font-bold leading-tight text-[#34d399] sm:text-[11px]">10:00</span>
                      <span className="hidden text-[9.5px] leading-tight text-white sm:block">Intro call</span>
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div
            className={`mt-3 flex items-center gap-3 rounded-xl border border-[#10b981]/30 bg-[#10b981]/[0.07] px-3 py-2.5 transition-all duration-500 ${
              s >= 12 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#10b981] text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3.5" y="5" width="17" height="15" rx="2" />
                <path d="M8 3v4M16 3v4M3.5 10h17" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-[13.5px] font-semibold text-white">Intro call booked, Tuesday 10:00</span>
              <span className="block text-[12px] text-[#9099b8]">VP of Sales, Example Freight Co. You just show up.</span>
            </span>
          </div>
        </Card>
      </div>

      <style jsx>{`
        .ob-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ff8a86;
          animation: obDot 0.9s ease-in-out infinite;
        }
        @keyframes obDot {
          0%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
}
