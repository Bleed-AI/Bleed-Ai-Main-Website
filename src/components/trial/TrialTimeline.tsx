"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { slotById, TRIAL } from "@/lib/slots";
import { GENERIC_BEATS, SHARED_BEATS, TRIAL_BEATS } from "./trialData";

const DAYS = 14;
const STEP_MS = 520;

interface Beat {
  day: number;
  text: string;
  lane: number; // -1 = shared, 0/1 = slot index
}

const LANE_COLORS = ["#ff3d38", "#a78bfa"];

/**
 * The signature piece of /trial: the 14 days played out, day by day, with the
 * chosen slots producing their outputs. Plays when in view, restarts when the
 * picks change, ends on day 14 with everything delivered.
 */
export default function TrialTimeline({ picked }: { picked: string[] }) {
  const beats = useMemo<Beat[]>(() => {
    const all: Beat[] = SHARED_BEATS.map(([day, text]) => ({ day, text, lane: -1 }));
    picked.forEach((id, lane) => {
      (TRIAL_BEATS[id] ?? GENERIC_BEATS).forEach(([day, text]) => all.push({ day, text, lane }));
    });
    return all.sort((a, b) => a.day - b.day || a.lane - b.lane);
  }, [picked]);

  const [day, setDay] = useState(DAYS);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = () => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDay(DAYS);
      return;
    }
    if (timer.current) clearInterval(timer.current);
    setDay(0);
    timer.current = setInterval(() => {
      setDay((d) => {
        if (d >= DAYS) {
          if (timer.current) clearInterval(timer.current);
          return DAYS;
        }
        return d + 1;
      });
    }, STEP_MS);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (seen) play();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, picked.join(",")]);

  const pct = (day / DAYS) * 100;

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0a0a12)] p-5 sm:p-6">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#ff6b67]">Your {TRIAL.length}</div>
          <div className="mt-1 font-display text-[28px] font-bold leading-none text-white">
            {day === 0 ? "Day 1" : `Day ${day}`}
            <span className="text-[16px] font-semibold text-[#505570]"> of {DAYS}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={play}
          className="rounded-full border border-[#2a2a3e] px-3 py-1.5 text-[12px] font-semibold text-white/80 transition-colors hover:border-white/30"
        >
          Replay
        </button>
      </div>

      {/* day track */}
      <div className="relative mb-5">
        <div className="grid grid-cols-14 gap-[3px]" style={{ gridTemplateColumns: `repeat(${DAYS}, minmax(0, 1fr))` }}>
          {Array.from({ length: DAYS }, (_, i) => (
            <span
              key={i}
              className="h-2 rounded-full transition-colors duration-300"
              style={{ background: i < day ? (i === DAYS - 1 ? "#10b981" : "#B1130F") : "#1f1f30" }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-[#505570]">
          <span>Day 1</span>
          <span>Day 7</span>
          <span>Day 14</span>
        </div>
        <span className="sr-only">{Math.round(pct)}% through the trial</span>
      </div>

      {/* lanes legend */}
      <div className="mb-4 flex flex-wrap gap-2">
        {picked.length === 0 ? (
          <span className="text-[12.5px] text-[#9099b8]">Pick a service to see what it produces in the {TRIAL.length}.</span>
        ) : (
          picked.map((id, i) => (
            <span key={id} className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2a3e] bg-[#0d0d16] px-2.5 py-1 text-[12px] font-semibold text-white/90">
              <span className="h-2 w-2 rounded-full" style={{ background: LANE_COLORS[i] }} />
              {slotById(id).name}
            </span>
          ))
        )}
      </div>

      <ol className="relative flex flex-col gap-2">
        {beats.map((b, i) => {
          const done = day >= b.day;
          const color = b.lane === -1 ? "#9099b8" : LANE_COLORS[b.lane];
          return (
            <li
              key={`${b.lane}-${b.day}-${i}`}
              className="flex items-start gap-3 rounded-xl border px-3 py-2.5 transition-all duration-500"
              style={{
                borderColor: done ? `${color}55` : "#1a1a28",
                background: done ? `${color}12` : "transparent",
                opacity: done ? 1 : 0.38,
                transform: done ? "none" : "translateY(4px)",
              }}
            >
              <span className="mt-[1px] w-12 flex-shrink-0 text-[11px] font-bold uppercase tracking-wide" style={{ color: done ? color : "#505570" }}>
                Day {b.day}
              </span>
              <span className="min-w-0 flex-1 text-[13px] leading-snug text-white/90">{b.text}</span>
              <span
                className="mt-[1px] flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300"
                style={{ background: done ? color : "transparent", border: done ? "none" : "1px solid #2a2a3e" }}
                aria-hidden
              >
                {done && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#07070d" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      <div
        className="mt-4 rounded-xl border border-[#10b981]/40 bg-[#10b981]/[0.07] px-4 py-3 text-[13px] leading-snug text-[#c9f2e1] transition-opacity duration-500"
        style={{ opacity: day >= DAYS ? 1 : 0.35 }}
      >
        <span className="font-semibold text-[#34d399]">After day 14:</span> keep what worked and pick your plan at the founding price, swap what did not, or walk away.
      </div>
    </div>
  );
}
