"use client";

// Signature piece 2 for /inbound-engine: a lead magnet calculator that really computes,
// for an invented construction accounting firm. The email capture is a mock: it is not
// wired to anything, sends nothing and stores nothing. Labelled Example.

import { useMemo, useState } from "react";
import { ExampleTag } from "@/components/shortlisted/ui";

function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  show,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  show: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[13px] text-white/70">{label}</span>
        <span className="font-mono text-[13px] font-semibold text-white">{show}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lm-range h-2 w-full cursor-pointer appearance-none rounded-full"
        style={{ background: `linear-gradient(90deg,#10b981 ${pct}%,rgba(255,255,255,0.1) ${pct}%)` }}
      />
    </label>
  );
}

export default function LeadMagnetCalc({ onCapture }: { onCapture?: () => void }) {
  const [revenue, setRevenue] = useState(12); // $M a year
  const [pct, setPct] = useState(8); // retainage percent
  const [days, setDays] = useState(120); // days until released
  const [rate, setRate] = useState(9); // credit line percent
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const held = useMemo(() => revenue * 1_000_000 * (pct / 100) * (days / 365), [revenue, pct, days]);
  const cost = held * (rate / 100);
  const perJob = (pct / 100) * 1_000_000; // on a $1M job
  const monthShare = held / ((revenue * 1_000_000) / 12);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      <style>{`
        .lm-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 9999px; background: #eafff6; border: 3px solid #10b981; box-shadow: 0 0 12px rgba(16,185,129,.6); cursor: pointer; }
        .lm-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 9999px; background: #eafff6; border: 3px solid #10b981; cursor: pointer; }
      `}</style>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3 sm:px-6">
        <div>
          <div className="text-[14px] font-semibold text-white">Retainage cash calculator</div>
          <div className="text-[11.5px] text-white/45">On northlineadvisory, an invented firm</div>
        </div>
        <ExampleTag>Example lead magnet</ExampleTag>
      </div>

      <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-2">
        <div className="space-y-5">
          <Slider label="Yearly revenue" value={revenue} min={1} max={50} step={0.5} onChange={setRevenue} show={`$${revenue}M`} />
          <Slider label="Retainage held" value={pct} min={5} max={10} step={0.5} onChange={setPct} show={`${pct}%`} />
          <Slider label="Days until it is released" value={days} min={30} max={270} step={15} onChange={setDays} show={`${days} days`} />
          <Slider label="Your credit line rate" value={rate} min={5} max={15} step={0.5} onChange={setRate} show={`${rate}%`} />
        </div>

        <div className="flex flex-col">
          <div className="rounded-xl border border-[#10b981]/30 bg-[#10b981]/[0.06] p-4">
            <div className="text-[12px] text-white/60">Cash your retainage is holding, on average</div>
            <div className="mt-1 font-display text-[34px] font-bold leading-none text-white tabular-nums">{usd(held)}</div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#10b981] transition-[width] duration-300" style={{ width: `${Math.min(100, Math.max(2, monthShare * 100))}%` }} />
            </div>
            <div className="mt-1.5 text-[11.5px] text-white/50">That is {Math.round(monthShare * 100)}% of a month's revenue, sitting with your clients.</div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="font-display text-xl font-bold text-[#ff9d99] tabular-nums">{usd(cost)}</div>
              <div className="text-[11.5px] leading-snug text-white/50">a year, if you carry it on your credit line</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="font-display text-xl font-bold text-white tabular-nums">{usd(perJob)}</div>
              <div className="text-[11.5px] leading-snug text-white/50">held back on every $1M job</div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-[#0d0d16] p-4">
            {!sent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                  onCapture?.();
                }}
              >
                <div className="mb-2 text-[13px] font-semibold text-white">Get the full report by email</div>
                <div className="mb-3 text-[12px] leading-snug text-white/50">A release plan for each open job and the 3 fixes contractors use first.</div>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    aria-label="Email (example only, nothing is sent)"
                    className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#10b981]/60 focus:outline-none"
                  />
                  <button type="submit" className="rounded-full bg-[#10b981] px-4 py-2.5 text-[13px] font-semibold text-[#04120c] transition-transform hover:scale-[1.03]">
                    Send my report
                  </button>
                </div>
                <div className="mt-2 text-[11px] text-white/35">Example only. Nothing is sent or saved.</div>
              </form>
            ) : (
              <div aria-live="polite">
                <div className="mb-1 flex items-center gap-2 text-[13px] font-semibold text-[#7af0bf]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                  That is a lead.
                </div>
                <p className="text-[12.5px] leading-snug text-white/60">
                  On a real site, this person lands in your inbox with the numbers they entered, so you know their size and their problem before the first call. This one is an example: nothing was sent or saved.
                </p>
                <button type="button" onClick={() => setSent(false)} className="mt-2 text-[12px] font-semibold text-white/60 underline underline-offset-2 hover:text-white">
                  Try it again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
