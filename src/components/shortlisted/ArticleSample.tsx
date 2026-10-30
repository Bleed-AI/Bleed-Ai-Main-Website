"use client";

// A real looking article page in a browser frame (round 2, 2026-10-30): site header, headline, author line,
// a custom hero image, a short answer, a small working calculator, a looping GIF style chart and a
// comparison table. Red pins name each feature an article from us carries. Invented firm, labelled Example.
// Shared by /shortlisted and /inbound-engine.

import { useState } from "react";
import BrowserFrame from "./BrowserFrame";
import { useReducedMotion } from "./ui";

const INK = "#14213d";
const ACCENT = "#0f4c81";

function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/** Red label pinned on a feature of the article, so a visitor sees what comes with every article. */
function Pin({ children }: { children: string }) {
  return (
    <span
      className="absolute -top-2.5 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-[#B1130F] px-2.5 py-[3px] text-[10.5px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_6px_16px_-4px_rgba(177,19,15,0.7)]"
      style={{ fontFamily: "inherit" }}
    >
      {children}
    </span>
  );
}

function HeroImage() {
  return (
    <svg viewBox="0 0 640 300" className="block h-auto w-full" role="img" aria-label="Illustration of a building going up beside a crane at sunset">
      <defs>
        <linearGradient id="as-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b3a5c" />
          <stop offset="0.55" stopColor="#e07a4f" />
          <stop offset="1" stopColor="#f6c48a" />
        </linearGradient>
        <linearGradient id="as-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2d42" />
          <stop offset="1" stopColor="#14151f" />
        </linearGradient>
      </defs>
      <rect width="640" height="300" fill="url(#as-sky)" />
      <circle cx="470" cy="210" r="46" fill="#ffd9a3" opacity="0.9" />
      {/* far skyline */}
      <path d="M0 230 L40 230 L40 196 L78 196 L78 214 L112 214 L112 180 L150 180 L150 222 L196 222 L196 205 L236 205 L236 230 L640 230 L640 300 L0 300Z" fill="#7a4a52" opacity="0.55" />
      {/* building under construction: floor slabs and columns */}
      <g fill="#1d2433">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="250" y={150 + i * 22} width="170" height="5" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`c${i}`} x={252 + i * 33} y="150" width="4" height="100" />
        ))}
        <rect x="250" y="236" width="170" height="16" />
      </g>
      <g fill="#ffd38a" opacity="0.85">
        <rect x="290" y="221" width="22" height="9" />
        <rect x="356" y="199" width="22" height="9" />
      </g>
      {/* crane */}
      <g stroke="#1d2433" strokeWidth="3" fill="none">
        <path d="M478 252 L478 52 M490 252 L490 52 M478 72 L490 92 M490 92 L478 112 M478 112 L490 132 M490 132 L478 152 M478 152 L490 172 M490 172 L478 192 M478 192 L490 212 M490 212 L478 232" />
        <path d="M380 52 L610 52 M484 30 L384 52 M484 30 L600 52" />
        <path d="M410 52 L410 120" strokeWidth="1.6" />
      </g>
      <rect x="402" y="118" width="16" height="10" fill="#e07a4f" />
      <rect x="590" y="52" width="22" height="16" fill="#1d2433" />
      <rect y="250" width="640" height="50" fill="url(#as-ground)" />
    </svg>
  );
}

function MiniCalc() {
  const [job, setJob] = useState(1_500_000);
  const [pct, setPct] = useState(10);
  const [days, setDays] = useState(120);
  const held = job * (pct / 100);
  const carry = held * 0.09 * (days / 365);
  const row = (label: string, value: number, min: number, max: number, step: number, set: (v: number) => void, show: string) => (
    <label className="block">
      <span className="mb-1 flex items-baseline justify-between text-[12.5px] text-[#3d4659]">
        {label}
        <span className="font-semibold tabular-nums text-[#14213d]">{show}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: ACCENT }}
        aria-label={label}
      />
    </label>
  );
  return (
    <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr]">
      <div className="space-y-3">
        {row("Contract value", job, 250_000, 5_000_000, 50_000, setJob, usd(job))}
        {row("Retainage held", pct, 5, 10, 1, setPct, `${pct}%`)}
        {row("Days until it is released", days, 30, 270, 10, setDays, `${days} days`)}
      </div>
      <div className="flex flex-col justify-center rounded-lg bg-[#0f4c81] p-4 text-white">
        <span className="text-[11.5px] text-white/75">Cash held back on this job</span>
        <span className="text-[26px] font-bold tabular-nums leading-tight">{usd(held)}</span>
        <span className="mt-2 text-[11.5px] leading-snug text-white/80">
          About <b className="text-white">{usd(carry)}</b> to carry it on a 9% credit line until it is paid.
        </span>
      </div>
    </div>
  );
}

const WEEKS = [38, 30, 26, 41, 35, 52, 48, 63];
const WEEKS_OLD = [38, 27, 19, 22, 16, 21, 14, 18];

/** A looping animated chart, styled like an embedded GIF. */
function GifChart() {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden rounded-lg border border-[#e3e6ee] bg-[#fbfcfe] p-4">
      <div className="mb-3 pt-1 text-[12.5px] font-semibold text-[#14213d]">Cash on hand over 8 weeks, same jobs</div>
      <div className="flex h-[120px] items-end gap-[6%] px-1">
        {WEEKS.map((v, i) => (
          <div key={i} className="flex h-full flex-1 items-end gap-[3px]">
            <span
              className={`flex-1 rounded-t-sm bg-[#c9ced9] ${reduce ? "" : "as-grow"}`}
              style={{ height: `${WEEKS_OLD[i]}%`, animationDelay: `${i * 0.18}s` }}
            />
            <span
              className={`flex-1 rounded-t-sm bg-[#0f4c81] ${reduce ? "" : "as-grow"}`}
              style={{ height: `${v}%`, animationDelay: `${i * 0.18 + 0.08}s` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#5a6375]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-[#c9ced9]" /> Billed on invoice dates
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-[#0f4c81]" /> Billed on draw dates
        </span>
      </div>
      <style jsx>{`
        .as-grow {
          transform-origin: bottom;
          animation: asGrow 4.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        @keyframes asGrow {
          0% {
            transform: scaleY(0.04);
          }
          28%,
          86% {
            transform: scaleY(1);
          }
          100% {
            transform: scaleY(0.04);
          }
        }
      `}</style>
    </div>
  );
}

const TABLE = [
  { way: "Bill it all at the end", back: "Slowest", work: "Least", fit: "Short jobs under 3 months" },
  { way: "Bill it per phase", back: "Faster", work: "Some", fit: "Jobs with clear milestones" },
  { way: "Agree a release schedule", back: "Fastest", work: "Most up front", fit: "Long jobs and repeat clients" },
];

export default function ArticleSample() {
  return (
    <BrowserFrame url="northlineadvisory.com/insights/texas-retainage-2026" tab="How Texas contractors should handle retainage" favicon="N" faviconColor={ACCENT}>
      <div className="bg-white text-[#1f2633]">
        {/* Site header */}
        <div className="flex items-center justify-between border-b border-[#eef0f4] px-4 py-3 sm:px-7">
          <span className="flex items-center gap-2 text-[15px] font-bold tracking-tight" style={{ color: INK }}>
            <span className="flex h-6 w-6 items-center justify-center rounded-md text-[12px] text-white" style={{ background: ACCENT }}>
              N
            </span>
            Northline
          </span>
          <span className="hidden items-center gap-5 text-[12.5px] text-[#4a5468] sm:flex">
            <span>Services</span>
            <span className="font-semibold text-[#14213d]">Insights</span>
            <span>About</span>
          </span>
          <span className="rounded-full px-3 py-1.5 text-[11.5px] font-semibold text-white" style={{ background: ACCENT }}>
            Book a call
          </span>
        </div>

        <article className="px-4 pb-7 pt-5 sm:px-7 sm:pt-7">
          <div className="text-[11.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: ACCENT }}>
            Insights · Cash flow
          </div>
          <h3 className="mt-2 text-[22px] font-bold leading-[1.2] tracking-tight sm:text-[27px]" style={{ color: INK, fontFamily: 'Georgia, "Times New Roman", serif' }}>
            How Texas contractors should handle retainage in 2026
          </h3>
          <div className="mt-3 flex items-center gap-2.5 text-[12px] text-[#5a6375]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5b6b8c] text-[10.5px] font-semibold text-white">SB</span>
            <span>
              <b className="font-semibold text-[#1f2633]">Sarah Bennett, CPA</b> · Updated Oct 2026 · 7 min read
            </span>
          </div>

          <div className="relative mt-5">
            <Pin>Custom image</Pin>
            <div className="overflow-hidden rounded-lg">
              <HeroImage />
            </div>
          </div>

          <div className="mt-5 rounded-lg border-l-4 bg-[#f4f7fb] px-4 py-3" style={{ borderColor: ACCENT }}>
            <div className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: ACCENT }}>
              Short answer
            </div>
            <p className="mt-1 text-[13.5px] leading-relaxed text-[#2c3445]">
              Retainage can hold back 5 to 10 percent of a job for months. Contractors who agree a release schedule up front, and bill on draw dates, get that cash back weeks sooner. Run your own numbers below.
            </p>
          </div>

          <div className="relative mt-7 rounded-lg border border-[#e3e6ee] p-4 pt-5">
            <Pin>Interactive</Pin>
            <div className="mb-3 text-[14px] font-bold" style={{ color: INK }}>
              How much cash is your retainage holding?
            </div>
            <MiniCalc />
          </div>

          <div className="relative mt-7">
            <Pin>GIF</Pin>
            <GifChart />
          </div>

          <div className="relative mt-7">
            <Pin>Comparison table</Pin>
            <div className="overflow-hidden rounded-lg border border-[#e3e6ee]">
              <table className="w-full border-collapse text-left text-[12px] sm:text-[12.5px]">
                <thead>
                  <tr className="bg-[#f4f7fb] text-[#14213d]">
                    <th className="px-3 py-2.5 pt-4 font-semibold">Way to bill retainage</th>
                    <th className="px-3 py-2.5 pt-4 font-semibold">Cash back</th>
                    <th className="hidden px-3 py-2.5 pt-4 font-semibold sm:table-cell">Admin</th>
                    <th className="px-3 py-2.5 pt-4 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map((r, i) => (
                    <tr key={r.way} className="border-t border-[#eef0f4] align-top text-[#3d4659]">
                      <td className="px-3 py-2.5 font-medium text-[#1f2633]">{r.way}</td>
                      <td className={`px-3 py-2.5 ${i === 2 ? "font-semibold text-[#0b7a4b]" : ""}`}>{r.back}</td>
                      <td className="hidden px-3 py-2.5 sm:table-cell">{r.work}</td>
                      <td className="px-3 py-2.5">{r.fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#eef0f4] pt-4 text-[11.5px] text-[#6b7385]">
            <span className="font-semibold text-[#3d4659]">Sources (4)</span>
            <span>State statute</span>
            <span>·</span>
            <span>Industry survey</span>
            <span>·</span>
            <span>Lender guidance</span>
            <span>·</span>
            <span>Client data, anonymised</span>
          </div>
        </article>
      </div>
    </BrowserFrame>
  );
}
