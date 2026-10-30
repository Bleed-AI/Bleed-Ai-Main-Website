"use client";

// Lead magnet app for /inbound-engine (round 2, 2026-10-30): a real looking calculator app on the client's
// own site, in a browser frame. It really computes. The email capture is a mock: it is not wired to anything,
// sends nothing and stores nothing. Invented firm, labelled Example by the page.

import { useMemo, useState } from "react";
import BrowserFrame from "@/components/shortlisted/BrowserFrame";

const NAVY = "#0f4c81";
const INK = "#14213d";

function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function Field({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  show,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  show: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium text-[#2c3445]">{label}</span>
        <span className="rounded-md border border-[#dfe3ea] bg-white px-2 py-0.5 text-[13px] font-semibold tabular-nums text-[#14213d]">{show}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
        style={{ accentColor: NAVY }}
        aria-label={label}
      />
      {hint && <span className="mt-0.5 block text-[11px] text-[#7a8293]">{hint}</span>}
    </label>
  );
}

export default function CalcApp({ onCapture }: { onCapture?: () => void }) {
  const [revenue, setRevenue] = useState(12);
  const [pct, setPct] = useState(8);
  const [days, setDays] = useState(120);
  const [rate, setRate] = useState(9);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const held = useMemo(() => revenue * 1_000_000 * (pct / 100) * (days / 365), [revenue, pct, days]);
  const cost = held * (rate / 100);
  const monthShare = held / ((revenue * 1_000_000) / 12);

  return (
    <BrowserFrame url="northlineadvisory.com/tools/retainage-check" tab="Retainage Cash Check | Northline" favicon="N" faviconColor={NAVY}>
      <div className="bg-[#f6f8fb] text-[#1f2633]">
        {/* App header */}
        <div className="flex items-center justify-between border-b border-[#e6e9ef] bg-white px-4 py-3 sm:px-6">
          <span className="flex items-center gap-2 text-[14.5px] font-bold tracking-tight" style={{ color: INK }}>
            <span className="flex h-6 w-6 items-center justify-center rounded-md text-[12px] text-white" style={{ background: NAVY }}>
              N
            </span>
            Northline
            <span className="ml-1 hidden font-normal text-[#7a8293] sm:inline">/ Free tools</span>
          </span>
          <span className="rounded-full border border-[#dfe3ea] px-3 py-1 text-[11.5px] font-semibold text-[#3d4659]">Book a call</span>
        </div>

        <div className="px-4 pb-5 pt-5 sm:px-6">
          <h3 className="text-[19px] font-bold leading-tight tracking-tight sm:text-[21px]" style={{ color: INK }}>
            Retainage Cash Check
          </h3>
          <p className="mt-1 text-[12.5px] text-[#5a6375]">See how much of your cash your clients are holding. Takes 30 seconds.</p>

          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr]">
            <div className="space-y-4 rounded-xl border border-[#e6e9ef] bg-white p-4">
              <Field label="Yearly revenue" value={revenue} min={1} max={50} step={0.5} onChange={setRevenue} show={`$${revenue}M`} />
              <Field label="Retainage held" value={pct} min={5} max={10} step={0.5} onChange={setPct} show={`${pct}%`} />
              <Field label="Days until it is released" value={days} min={30} max={270} step={15} onChange={setDays} show={`${days} days`} />
              <Field label="Your credit line rate" value={rate} min={5} max={15} step={0.5} onChange={setRate} show={`${rate}%`} />
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-xl p-4 text-white" style={{ background: NAVY }}>
                <div className="text-[12px] text-white/75">Cash your clients are holding, on average</div>
                <div className="mt-1 text-[32px] font-bold leading-none tabular-nums">{usd(held)}</div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white transition-[width] duration-300" style={{ width: `${Math.min(100, Math.max(2, monthShare * 100))}%` }} />
                </div>
                <div className="mt-1.5 text-[11.5px] text-white/80">{Math.round(monthShare * 100)}% of a month&apos;s revenue</div>
              </div>
              <div className="rounded-xl border border-[#e6e9ef] bg-white p-3.5">
                <div className="text-[20px] font-bold tabular-nums text-[#b42318]">{usd(cost)}</div>
                <div className="text-[11.5px] leading-snug text-[#5a6375]">a year to carry it on your credit line</div>
              </div>

              <div className="rounded-xl border border-[#e6e9ef] bg-white p-3.5">
                {!sent ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                      onCapture?.();
                    }}
                  >
                    <div className="text-[13px] font-semibold" style={{ color: INK }}>
                      Send me the full report
                    </div>
                    <div className="mt-0.5 text-[11.5px] leading-snug text-[#5a6375]">A release plan for each open job, as a PDF.</div>
                    <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        aria-label="Work email (example only, nothing is sent)"
                        className="min-w-0 flex-1 rounded-lg border border-[#d5dae3] bg-white px-3 py-2 text-[13px] text-[#1f2633] placeholder:text-[#9aa1ae] focus:border-[#0f4c81] focus:outline-none"
                      />
                      <button type="submit" className="rounded-lg px-4 py-2 text-[13px] font-semibold text-white" style={{ background: NAVY }}>
                        Send report
                      </button>
                    </div>
                  </form>
                ) : (
                  <div aria-live="polite">
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-[#0b7a4b]">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7" />
                      </svg>
                      Your report is on its way
                    </div>
                    <button type="button" onClick={() => setSent(false)} className="mt-1 text-[11.5px] font-semibold text-[#5a6375] underline underline-offset-2">
                      Run it again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
