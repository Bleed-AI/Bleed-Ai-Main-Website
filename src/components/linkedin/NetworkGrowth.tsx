"use client";

import { useEffect, useMemo, useState } from "react";
import { slotById } from "@/lib/slots";
import { useOnceInView } from "@/components/outbound/useOnceInView";
import SlotChip from "@/components/slots/SlotChip";

/**
 * A network graph that fills with buyers week by week. The weekly pace is read from the
 * network-growth slot in the config; the graph itself is illustrative.
 */

const MAX_WEEKS = 12;
const PER_WEEK_NODES = 6;
const W = 640;
const H = 440;
const CX = W / 2;
const CY = H / 2;

function pace(monthly: string): [number, number] {
  const m = monthly.match(/(\d[\d,]*)\s*to\s*(\d[\d,]*)/);
  if (!m) return [0, 0];
  return [Number(m[1].replace(/,/g, "")), Number(m[2].replace(/,/g, ""))];
}

const round = (n: number) => Math.round(n * 10) / 10;

// Deterministic pseudo random so server and client agree.
function rand(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export default function NetworkGrowth() {
  const slot = slotById("network-growth");
  const [lo, hi] = pace(slot.monthly);
  const { ref, seen, reduced } = useOnceInView<HTMLDivElement>(0.3);
  const [week, setWeek] = useState(0);
  const [touched, setTouched] = useState(false);

  // Auto-play to week 8 once, unless the visitor already moved the slider.
  useEffect(() => {
    if (!seen || touched) return;
    if (reduced) {
      setWeek(8);
      return;
    }
    let w = 0;
    const id = setInterval(() => {
      w += 1;
      setWeek(w);
      if (w >= 8) clearInterval(id);
    }, 420);
    return () => clearInterval(id);
  }, [seen, reduced, touched]);

  const nodes = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: MAX_WEEKS * PER_WEEK_NODES }, (_, i) => {
      const a = i * golden + rand(i) * 0.5;
      const r = 62 + Math.sqrt(i + 1) * 19 + rand(i + 7) * 14;
      return {
        x: round(CX + Math.cos(a) * r * 1.35),
        y: round(CY + Math.sin(a) * r * 0.82),
        r: round(3.2 + rand(i + 3) * 2.6),
        wk: Math.floor(i / PER_WEEK_NODES) + 1,
      };
    }).filter((n) => n.x > 14 && n.x < W - 14 && n.y > 14 && n.y < H - 14);
  }, []);

  const existing = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = rand(i + 101) * Math.PI * 2;
        const r = 70 + rand(i + 202) * 150;
        return { x: round(CX + Math.cos(a) * r * 1.4), y: round(CY + Math.sin(a) * r * 0.8), r: 3 };
      }).filter((n) => n.x > 14 && n.x < W - 14 && n.y > 14 && n.y < H - 14),
    []
  );

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff5a52]">Buyer network growth</div>
        <h2 className="font-display text-[30px] font-bold leading-[1.1] text-white sm:text-[42px]">
          Your posts only work if <em className="hd-em">buyers see them.</em>
        </h2>
        <p className="mt-4 text-[15.5px] leading-relaxed text-[#9099b8] sm:text-[17px]">
          Most founders post to a network of old classmates, recruiters and vendors. We grow yours with the exact people you sell to, every week, so each post lands in front of a buyer.
        </p>
        <div className="mt-6 rounded-2xl border border-[#1f1f30] bg-[#0d0d16] p-5">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9099b8]">Every month</div>
          <p className="mt-1.5 text-[15px] leading-snug text-white">{slot.monthly}.</p>
          <div className="mt-3">
            <SlotChip id="network-growth" size="sm" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1f1f30] bg-[radial-gradient(ellipse_at_center,#14101a,#0a0a12_70%)] p-4 sm:p-6">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wide text-[#9099b8]">Week {week}</div>
            <div className="font-display text-[26px] font-bold leading-none text-white tabular-nums sm:text-[30px]">
              {lo && hi ? `${(week * lo).toLocaleString("en-US")} to ${(week * hi).toLocaleString("en-US")}` : week}
            </div>
            <div className="mt-1 text-[12px] text-[#9099b8]">buyers reached with a connection request, at that pace</div>
          </div>
          <div className="flex flex-col gap-1 text-[11.5px] text-[#9099b8]">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff4b45] shadow-[0_0_8px_#ff4b45]" /> A buyer you sell to
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3a3f58]" /> Your network today
            </span>
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Illustration: your network after ${week} weeks, filled with buyers`}>
          <defs>
            <radialGradient id="ng-you" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff5a3c" />
              <stop offset="100%" stopColor="#B1130F" />
            </radialGradient>
          </defs>
          {existing.map((n, i) => (
            <g key={`e${i}`}>
              <line x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="#2a2a3e" strokeWidth={0.8} />
              <circle cx={n.x} cy={n.y} r={n.r} fill="#3a3f58" />
            </g>
          ))}
          {nodes.map((n, i) => {
            const on = n.wk <= week;
            return (
              <g key={i} style={{ opacity: on ? 1 : 0, transition: reduced ? "none" : "opacity 500ms ease" }}>
                <line x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="#B1130F" strokeOpacity={0.22} strokeWidth={0.8} />
                <circle cx={n.x} cy={n.y} r={n.r} fill="#ff4b45" style={{ filter: "drop-shadow(0 0 4px rgba(255,75,69,0.6))" }} />
              </g>
            );
          })}
          <circle cx={CX} cy={CY} r={34} fill="url(#ng-you)" />
          <circle cx={CX} cy={CY} r={42} fill="none" stroke="#ff5a3c" strokeOpacity={0.35} />
          <text x={CX} y={CY + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill="#fff" fontFamily="inherit">
            You
          </text>
        </svg>

        <div className="mt-3">
          <label htmlFor="ng-week" className="mb-1 flex justify-between text-[11.5px] text-[#9099b8]">
            <span>Drag to see the weeks pass</span>
            <span>Illustration, one dot stands for many buyers</span>
          </label>
          <input
            id="ng-week"
            type="range"
            min={0}
            max={MAX_WEEKS}
            value={week}
            onChange={(e) => {
              setTouched(true);
              setWeek(Number(e.target.value));
            }}
            className="ng-range w-full"
          />
        </div>
      </div>

      <style jsx>{`
        .ng-range {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(90deg, #b1130f ${(week / MAX_WEEKS) * 100}%, #1f1f30 ${(week / MAX_WEEKS) * 100}%);
          outline: none;
        }
        .ng-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #b1130f;
          cursor: pointer;
        }
        .ng-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #b1130f;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
