"use client";

// The monthly AI search report, drawn in code: 20 buyer questions x 4 assistants,
// share of answers over time, share against competitors, and the fix list.
// Invented company and numbers, labelled Example.

import { useRef } from "react";
import { ExampleTag, useInView, useReducedMotion } from "./ui";

const ASSISTANTS = ["ChatGPT", "Claude", "Perplexity", "Google AI"];
const SHORT = ["GPT", "Cla", "Perp", "Ggl"];


// 1 = the client was named for that question on that assistant this month.
const ROWS: [string, string][] = [
  ["Construction CPA in Texas", "1100"],
  ["Retainage accounting help", "1100"],
  ["WIP schedule for contractors", "1001"],
  ["Job costing for subcontractors", "0000"],
  ["Accountant for GCs in Houston", "0100"],
  ["Contractor cash flow advisor", "1100"],
  ["When is retainage released in Texas", "0000"],
  ["Bonding capacity and financials", "0000"],
  ["Construction audit firm in Dallas", "0000"],
  ["Percentage of completion help", "1001"],
  ["Contractor tax planning in Texas", "0000"],
  ["Best construction accountants 2026", "0000"],
  ["Outsourced controller for builders", "0000"],
  ["Change order accounting", "0010"],
  ["Equipment depreciation for contractors", "0000"],
  ["Lien waiver tracking", "0000"],
  ["Construction bookkeeping in Austin", "1000"],
  ["Cash flow forecast for contractors", "1101"],
  ["Surety ready financial statements", "0000"],
  ["Fractional CFO for construction", "0000"],
];

const NAMED = ROWS.reduce((n, [, r]) => n + r.split("").filter((c) => c === "1").length, 0);
const ROWS_NAMED = ROWS.filter(([, r]) => r.includes("1")).length;
const SHARE = Math.round((NAMED / (ROWS.length * ASSISTANTS.length)) * 100);
// Month 0 is the baseline, taken before the first article goes live.
const TREND = [1, 3, 5, 9, 12, 16, SHARE];
const RIVALS = [
  { name: "Brickwell CPA", share: 34 },
  { name: "Summit Ledger", share: 26 },
  { name: "Northline Advisory", share: SHARE, you: true },
  { name: "Lone Pine Advisors", share: 11 },
];
const FIXES = [
  { q: "Q7", text: "No page answers when retainage is released in Texas. Article planned for next month." },
  { q: "Q12", text: "A roundup AI quotes lists 4 rivals and not you. Outreach to its editor is queued." },
  { q: "Q11", text: "Perplexity reads an old page of yours with 2023 numbers and names a rival instead. Refresh the page." },
];

export default function ReportDemo() {
  const ref = useRef<HTMLDivElement | null>(null);
  const seen = useInView(ref, 0.15);
  const reduce = useReducedMotion();
  const on = seen || reduce;
  const anim = !reduce;

  // Line chart geometry.
  const W = 320;
  const H = 130;
  const pad = 8;
  const max = 40;
  const pts = TREND.map((v, i) => [pad + (i * (W - pad * 2)) / (TREND.length - 1), H - pad - (v / max) * (H - pad * 2)] as const);
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${path} L${pts[pts.length - 1][0].toFixed(1)},${H - pad} L${pad},${H - pad} Z`;

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3 sm:px-6">
        <div>
          <div className="text-[14px] font-semibold text-white">AI search report, month 6</div>
          <div className="text-[11.5px] text-white/45">Northline Advisory · 20 buyer questions · 4 assistants</div>
        </div>
        <ExampleTag>Example report</ExampleTag>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
        {/* Grid of questions x assistants */}
        <div className="border-b border-white/[0.06] p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="grid grid-cols-[minmax(0,1fr)_repeat(4,30px)] items-center gap-x-1.5 pb-2 font-mono text-[9.5px] uppercase tracking-normal text-white/40 sm:grid-cols-[minmax(0,1fr)_repeat(4,60px)]">
            <span>Buyer question</span>
            {ASSISTANTS.map((a, i) => (
              <span key={a} className="text-center">
                <span className="sm:hidden">{SHORT[i]}</span>
                <span className="hidden sm:inline">{a.replace(" AI", "")}</span>
              </span>
            ))}
          </div>
          <div className="space-y-[3px]">
            {ROWS.map(([q, r], ri) => (
              <div key={q} className="grid grid-cols-[minmax(0,1fr)_repeat(4,30px)] items-center gap-x-1.5 sm:grid-cols-[minmax(0,1fr)_repeat(4,60px)]">
                <span className="truncate text-[11.5px] text-white/60">
                  <span className="mr-1.5 font-mono text-[10px] text-white/30">{String(ri + 1).padStart(2, "0")}</span>
                  {q}
                </span>
                {r.split("").map((c, ci) => (
                  <span
                    key={ci}
                    className={`mx-auto block h-[14px] w-full rounded-[4px] ${
                      c === "1" ? "bg-[#10b981] shadow-[0_0_10px_-2px_rgba(16,185,129,0.8)]" : "bg-white/[0.06]"
                    }`}
                    style={{
                      transform: on ? "scale(1)" : "scale(0.2)",
                      opacity: on ? 1 : 0,
                      transition: anim ? "transform .4s cubic-bezier(0.34,1.56,0.64,1), opacity .3s ease" : "none",
                      transitionDelay: anim ? `${200 + ri * 45 + ci * 30}ms` : "0ms",
                    }}
                    aria-label={`${ASSISTANTS[ci]}: ${c === "1" ? "named" : "not named"}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-white/45">
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-[#10b981]" />Named</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-white/[0.08]" />Not named</span>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6 p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="font-display text-2xl font-bold text-white">{ROWS_NAMED} of 20</div>
              <div className="text-[11.5px] leading-snug text-white/50">questions where you are named at least once</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="font-display text-2xl font-bold text-[#6fe3b0]">{SHARE}%</div>
              <div className="text-[11.5px] leading-snug text-white/50">share of all 80 answers ({NAMED} of 80)</div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[12.5px] font-semibold text-white/85">Your share of answers</span>
              <span className="font-mono text-[10px] text-white/35">month 0 to 6</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Share of answers rising from ${TREND[0]}% to ${SHARE}% (example)`}>
              <defs>
                <linearGradient id="rep-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 10, 20, 30, 40].map((g) => {
                const y = H - pad - (g / max) * (H - pad * 2);
                return <line key={g} x1={pad} x2={W - pad} y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
              })}
              <path d={area} fill="url(#rep-area)" style={{ opacity: on ? 1 : 0, transition: anim ? "opacity 1s ease 1.1s" : "none" }} />
              <path
                d={path}
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray="1"
                style={{ strokeDashoffset: on ? 0 : 1, transition: anim ? "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s" : "none" }}
              />
              {pts.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i === pts.length - 1 ? 4.5 : 2.5}
                  fill={i === pts.length - 1 ? "#6fe3b0" : "#34d399"}
                  style={{ opacity: on ? 1 : 0, transition: anim ? `opacity .3s ease ${0.4 + i * 0.18}s` : "none" }}
                />
              ))}
            </svg>
          </div>

          <div>
            <div className="mb-2 text-[12.5px] font-semibold text-white/85">Share against competitors</div>
            <div className="space-y-2">
              {RIVALS.map((r, i) => (
                <div key={r.name} className="grid grid-cols-[minmax(0,130px)_1fr_34px] items-center gap-2 text-[11.5px]">
                  <span className={`truncate ${r.you ? "font-semibold text-[#7af0bf]" : "text-white/55"}`}>{r.name}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                    <span
                      className={`block h-full rounded-full ${r.you ? "bg-[#10b981]" : "bg-white/25"}`}
                      style={{
                        width: on ? `${(r.share / 40) * 100}%` : "0%",
                        transition: anim ? `width .9s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.12}s` : "none",
                      }}
                    />
                  </span>
                  <span className="text-right font-mono text-white/50">{r.share}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[12.5px] font-semibold text-white/85">Fix list for next month</div>
            <ul className="space-y-2">
              {FIXES.map((f) => (
                <li key={f.q} className="flex gap-2.5 text-[12px] leading-snug text-white/65">
                  <span className="mt-[1px] shrink-0 rounded bg-[#B1130F]/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#ff9d99]">{f.q}</span>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
