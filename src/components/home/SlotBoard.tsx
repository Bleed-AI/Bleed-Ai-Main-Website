"use client";

import { useEffect, useState } from "react";
import { slotById, SWAP_LINE, type ThemeId } from "@/lib/slots";
import SlotMeter from "@/components/slots/SlotMeter";
import { useReducedMotion } from "./useHomeMotion";

/**
 * THE signature piece of the homepage: a board of 4 slots running. One slot's line goes flat,
 * it swaps out, a new slot slides in and starts rising. Same board, same price.
 * Example data only (labelled on the board). The resting frame (first paint, reduced motion,
 * a still screenshot) is the post-swap state, so the swap reads even without motion.
 */

type Phase = 0 | 1 | 2 | 3; // 0 running, 1 one slot flat, 2 swapping, 3 swapped in

interface Scenario {
  board: string[];
  flatIdx: number;
  swapTo: string;
  monthBefore: number;
  monthAfter: number;
}

const SCENARIOS: Scenario[] = [
  { board: ["linkedin-posts", "articles", "email-campaign", "linkedin-outreach"], flatIdx: 3, swapTo: "lead-magnet-app", monthBefore: 2, monthAfter: 3 },
  { board: ["linkedin-posts", "articles", "email-campaign", "lead-magnet-app"], flatIdx: 1, swapTo: "linkedin-outreach", monthBefore: 5, monthAfter: 6 },
];

const METRIC: Record<string, string> = {
  "linkedin-posts": "Post reach",
  articles: "Search visits",
  "email-campaign": "Replies",
  "linkedin-outreach": "Conversations",
  "lead-magnet-app": "Leads captured",
  "post-engagers": "Warm conversations",
};

const THEME_SHORT: Record<ThemeId, string> = {
  linkedin: "LinkedIn",
  website: "Website",
  outbound: "Outbound",
};

const THEME_COLOR: Record<ThemeId, string> = {
  linkedin: "#4f8cff",
  website: "#a78bfa",
  outbound: "#ff4d48",
};

const RISING: number[][] = [
  [3, 5, 4, 7, 8, 7, 10, 12, 11, 14, 16, 19],
  [2, 3, 5, 5, 7, 9, 9, 11, 13, 14, 17, 18],
  [4, 4, 6, 8, 7, 9, 12, 13, 15, 15, 18, 21],
];
const PLATEAU = [3, 6, 8, 10, 11, 11, 11, 10, 11, 11, 10, 11];
const STARTING = [1, 2, 2, 4, 5, 7, 8, 10, 12, 15, 17, 20];

const DUR: Record<Phase, number> = { 0: 2800, 1: 2700, 2: 1000, 3: 5600 };

function paths(data: number[], w = 120, h = 44) {
  const max = 22;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 3 - (v / max) * (h - 8)] as const);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return { line, area, last: pts[pts.length - 1] };
}

type TileState = "working" | "flat" | "leaving" | "new";

function Tile({ slotId, state, seed, animate }: { slotId: string; state: TileState; seed: number; animate: boolean }) {
  const s = slotById(slotId);
    const flat = state === "flat" || state === "leaving";
  const color = flat ? "#f5b544" : state === "new" ? "#34d399" : THEME_COLOR[s.theme];
  const data = state === "new" ? STARTING : flat ? PLATEAU : RISING[seed % RISING.length];
  const { line, area, last } = paths(data);
  const gid = `sbg-${slotId}-${state}`;
  const status =
    state === "new" ? "Swapped in, producing" : flat ? "Flat for 3 weeks" : "Working";
  return (
    <div
      className={`sb-tile relative flex flex-col rounded-2xl border p-3 sm:p-4 ${
        state === "leaving" ? "sb-leave" : state === "new" && animate ? "sb-enter" : ""
      } ${
        state === "new"
          ? "border-[#10b981]/55 bg-[linear-gradient(160deg,rgba(16,185,129,0.12),#11111c_60%)] shadow-[0_0_0_1px_rgba(16,185,129,0.2),0_18px_50px_-20px_rgba(16,185,129,0.45)]"
          : flat
          ? "border-[#f59e0b]/55 bg-[linear-gradient(160deg,rgba(245,158,11,0.10),#11111c_60%)] sb-flat-ring"
          : "border-[#262638] bg-[linear-gradient(160deg,#161624,#0e0e18)]"
      }`}
    >
      {state === "new" && (
        <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full bg-[#10b981] px-2 py-[3px] text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#04150e]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <path d="M4 7h13l-3-3M20 17H7l3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Swapped
        </span>
      )}
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: THEME_COLOR[s.theme], boxShadow: `0 0 8px ${THEME_COLOR[s.theme]}` }} />
        <span className="truncate text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#7d84a3]">{THEME_SHORT[s.theme]}</span>
      </div>
      <div className="mt-1.5 font-display text-[13.5px] font-semibold leading-tight text-white sm:text-[15px]">{s.name}</div>
      <div className="mt-0.5 text-[11px] text-[#9099b8]">{METRIC[slotId] ?? "Results"}</div>
      <svg viewBox="0 0 120 44" className="mt-2 h-10 w-full overflow-visible sm:h-12" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gid})`} className={state === "new" && animate ? "sb-fade" : ""} />
        <path
          d={line}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className={state === "new" && animate ? "sb-draw" : ""}
        />
        {flat && <line x1="58" x2="120" y1={last[1]} y2={last[1]} stroke="#f5b544" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" opacity="0.7" />}
        <circle cx={last[0]} cy={last[1]} r="2.6" fill={color} className={state === "new" && animate ? "sb-fade" : ""} />
      </svg>
      <div className="mt-2 flex items-center gap-1.5 text-[10.5px] font-semibold" style={{ color }}>
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${flat ? "" : "animate-pulse-dot"}`} style={{ background: color }} />
        <span className="truncate">{status}</span>
      </div>
    </div>
  );
}

export default function SlotBoard() {
  const reduce = useReducedMotion();
  const [si, setSi] = useState(0);
  const [phase, setPhase] = useState<Phase>(3);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      setAnimate(true);
      if (phase === 3) {
        setSi((v) => (v + 1) % SCENARIOS.length);
        setPhase(0);
      } else {
        setPhase((phase + 1) as Phase);
      }
    }, DUR[phase]);
    return () => clearTimeout(t);
  }, [phase, si, reduce]);

  const sc = SCENARIOS[si];
  const prev = SCENARIOS[(si + SCENARIOS.length - 1) % SCENARIOS.length];
  const month = phase === 3 ? sc.monthAfter : sc.monthBefore;
  const outName = slotById(sc.board[sc.flatIdx]).name;
  const inName = slotById(sc.swapTo).name;
  const logSc = phase === 3 ? sc : prev;
  const logOut = slotById(logSc.board[logSc.flatIdx]).name;
  const logIn = slotById(logSc.swapTo).name;

  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(177,19,15,0.22),transparent_65%)] blur-2xl" />
      <div
        className="relative rounded-3xl border border-[#262638] bg-[linear-gradient(170deg,#12121d,#0a0a12)] p-3.5 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)] sm:p-5"
        role="img"
        aria-label={`Example: four services running. ${logOut} went flat and was swapped for ${logIn} the next month. Same price.`}
      >
        {/* header */}
        <div className="mb-3.5 flex items-center justify-between gap-2 sm:mb-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
            </span>
            <span className="truncate text-[12px] font-semibold text-white sm:text-[13px]">Your services</span>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9099b8]">
              Example
            </span>
          </div>
          <span key={month} className="sb-month shrink-0 font-mono-bai text-[11px] text-[#9099b8]">
            Month {month}
          </span>
        </div>

        {/* the board */}
        <div key={si} className={`relative grid grid-cols-2 gap-2.5 sm:gap-3.5 ${animate ? "sb-board-in" : ""}`}>
          {sc.board.map((id, i) => {
            const isFlat = i === sc.flatIdx;
            let slotId = id;
            let state: TileState = "working";
            if (isFlat) {
              if (phase === 1) state = "flat";
              else if (phase === 2) state = "leaving";
              else if (phase === 3) {
                slotId = sc.swapTo;
                state = "new";
              }
            }
            return <Tile key={`${slotId}-${state === "new" ? "n" : "o"}`} slotId={slotId} state={state} seed={i} animate={animate} />;
          })}

          {phase === 2 && (
            <div className="sb-swap-pop pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#0b0b14]/95 px-3.5 py-2 text-[11.5px] font-semibold text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur sm:text-[13px]">
                <svg className="sb-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.6" aria-hidden="true">
                  <path d="M4 7h13l-3-3M20 17H7l3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Swapping {outName} for {inName}
              </div>
            </div>
          )}
        </div>

        {/* swap log */}
        <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 sm:mt-4">
          <span className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10b981]/15">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3.2" aria-hidden="true">
              <path d="M4 7h13l-3-3M20 17H7l3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="text-[11.5px] leading-snug text-[#b4b9cf] sm:text-[12.5px]">
            <span className="font-semibold text-white">Month {logSc.monthAfter}:</span> {logOut} wasn&apos;t pulling its weight, so we swapped it for{" "}
            <span className="font-semibold text-[#34d399]">{logIn}</span>. Same price, no new agency.
          </p>
        </div>

        {/* price */}
        <div className="mt-3.5 flex flex-wrap items-end justify-between gap-3 border-t border-white/[0.06] pt-3.5 sm:mt-4 sm:pt-4">
          <SlotMeter count={4} compact />
          <span className="text-[11px] text-[#7d84a3] sm:max-w-[150px] sm:text-right">{SWAP_LINE}</span>
        </div>
      </div>

      <style jsx global>{`
        .sb-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: sbDraw 1.6s cubic-bezier(0.3, 0.7, 0.2, 1) 0.35s forwards;
        }
        .sb-fade {
          opacity: 0;
          animation: sbFade 0.6s ease 1.5s forwards;
        }
        .sb-enter {
          animation: sbEnter 0.7s cubic-bezier(0.2, 0.9, 0.25, 1.15) both;
        }
        .sb-leave {
          animation: sbLeave 0.75s ease forwards;
        }
        .sb-board-in {
          animation: sbFade 0.5s ease both;
          opacity: 1;
        }
        .sb-flat-ring {
          animation: sbRing 1.4s ease-in-out infinite;
        }
        .sb-swap-pop {
          animation: sbPop 0.35s ease both;
        }
        .sb-spin {
          animation: sbSpin 1s linear infinite;
        }
        .sb-month {
          animation: sbFade 0.5s ease both;
        }
        @keyframes sbDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes sbFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes sbEnter {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes sbLeave {
          to {
            opacity: 0.15;
            transform: scale(0.9);
            filter: blur(3px);
          }
        }
        @keyframes sbRing {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.35);
          }
          50% {
            box-shadow: 0 0 0 5px rgba(245, 158, 11, 0);
          }
        }
        @keyframes sbPop {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes sbSpin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-draw,
          .sb-fade,
          .sb-enter,
          .sb-flat-ring,
          .sb-board-in,
          .sb-month {
            animation: none;
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
