"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { outcomeById, type OutcomeId } from "@/lib/slots";
import { useInView, useReducedMotion } from "./useHomeMotion";

/*
 * Round 2 (2026-10-30): four realistic examples, one per package, drawn to look like the screens a buyer
 * actually sees (an AI chat, a LinkedIn feed post, an inbox, a calculator on a website). Every example uses
 * ONE invented client, Northwind Audit (a freight invoice audit firm), and is labelled "Example".
 * No real logos; the assistant's name appears as text only. Resting state (reduced motion, still
 * screenshot after scroll) is the finished frame.
 */

const SYS_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/** Runs `steps` timers once `go` turns true. Returns the current step (jumps to the last under reduced motion). */
function useSteps(go: boolean, delays: number[], reduce: boolean) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (reduce) {
      setStep(delays.length);
      return;
    }
    const ids = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => ids.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [go, reduce]);
  return step;
}

function Avatar({ initials, from, to, size = 40 }: { initials: string; from: string; to: string; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.36, background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

/* ------------------------------------------------------------------ 1. AI chat (Shortlisted) */

const FIRMS = [
  { name: "Northwind Audit", line: "Checks every invoice line against your carrier contracts and publishes its recovery numbers. A strong fit for mid-size shippers." },
  { name: "Cobalt Freight Review", line: "Good on parcel. Lighter on LTL and truckload." },
  { name: "Linehaul Audit Group", line: "Built for very large shippers with their own audit team." },
];

function AiChatExample() {
  const reduce = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const step = useSteps(inView, [900, 1500, 2100, 2700, 3200], reduce);
  return (
    <div ref={ref} className="w-full min-w-0 max-w-[480px] overflow-hidden rounded-2xl border border-white/10 bg-[#212121] text-[#ececec] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]" style={{ fontFamily: SYS_FONT }}>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="flex items-center gap-1 text-[15px] font-semibold text-[#ececec]">
          ChatGPT
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" strokeWidth="2.2" aria-hidden="true">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="px-4 pb-4">
        <div className="ml-auto w-fit max-w-[85%] rounded-3xl bg-[#303030] px-4 py-2.5 text-[14px] leading-snug">
          Who should a mid-size shipper hire to audit freight invoices?
        </div>

        <div className="mt-4 min-h-[262px] text-[14px] leading-relaxed">
          {step === 0 ? (
            <span className="ai-shimmer inline-flex items-center gap-2 text-[13.5px] text-[#9b9b9b]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
              </svg>
              Searching the web
            </span>
          ) : (
            <>
              <p className="ai-in">Here are three firms worth a look for a shipper your size:</p>
              <ol className="mt-2.5 flex flex-col gap-2.5">
                {FIRMS.map((f, i) =>
                  step >= i + 2 ? (
                    <li key={f.name} className="ai-in flex gap-2">
                      <span className="shrink-0 text-[#b4b4b4]">{i + 1}.</span>
                      <span>
                        <strong className="font-semibold text-white">{f.name}</strong>
                        <span className="text-[#d0d0d0]">: {f.line}</span>
                      </span>
                    </li>
                  ) : null
                )}
              </ol>
              {step >= 5 && (
                <div className="ai-in mt-3 flex flex-wrap items-center gap-1.5">
                  {["northwindaudit.com", "shipperweekly.com"].map((s) => (
                    <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-[#2f2f2f] px-2.5 py-1 text-[11.5px] text-[#b4b4b4]">
                      <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#5b6b8c] to-[#2c3550]" aria-hidden="true" />
                      {s}
                    </span>
                  ))}
                  <span className="rounded-full bg-[#2f2f2f] px-2.5 py-1 text-[11.5px] text-[#b4b4b4]">+4 sources</span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-full bg-[#303030] py-2 pl-4 pr-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b4b4b4" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          <span className="flex-1 text-[14px] text-[#8f8f8f]">Ask anything</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.6">
              <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2. LinkedIn post (LinkedIn Authority) */

function LiIcon({ d, label }: { d: ReactNode; label: string }) {
  return (
    <span className="flex flex-1 flex-col items-center gap-0.5 rounded-md py-1.5 text-[11.5px] font-semibold text-[#5e5e5e] sm:flex-row sm:justify-center sm:gap-1.5 sm:text-[13px]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5e5e5e" strokeWidth="1.7" aria-hidden="true">
        {d}
      </svg>
      {label}
    </span>
  );
}

function LinkedInExample() {
  const reduce = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const [n, setN] = useState(0);
  const TARGET = 147;
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(TARGET);
      return;
    }
    let v = 0;
    const id = setInterval(() => {
      v += 4;
      setN(Math.min(v, TARGET));
      if (v >= TARGET) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [inView, reduce]);
  return (
    <div ref={ref} className="w-full min-w-0 max-w-[480px] overflow-hidden rounded-xl bg-white text-[rgba(0,0,0,0.9)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]" style={{ fontFamily: SYS_FONT }}>
      {/* header */}
      <div className="flex items-start gap-2.5 px-4 pt-3.5">
        <Avatar initials="DR" from="#1e3a5f" to="#0f2440" size={46} />
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[14px] font-semibold">
            Dana Reyes <span className="font-normal text-[#666]">· 1st</span>
          </div>
          <div className="truncate text-[12px] text-[#666]">Founder, Northwind Audit | Freight invoice audits</div>
          <div className="mt-0.5 flex items-center gap-1 text-[12px] text-[#666]">
            1d ·
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
            </svg>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#666" aria-hidden="true">
          <circle cx="5" cy="12" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="19" cy="12" r="1.8" />
        </svg>
      </div>

      {/* text */}
      <div className="px-4 pt-2.5 text-[14px] leading-[1.45]">
        <p>We audited 4,000 freight invoices last quarter.</p>
        <p className="mt-2">
          1 in 9 had a billing error. Most were small. Together they came to 3.1% of spend. Here is the checklist we run on
          <span className="text-[#666]"> ...see more</span>
        </p>
      </div>

      {/* carousel slide */}
      <div className="relative mt-3 aspect-[1.45/1] overflow-hidden bg-[#0f2440] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(245,166,35,0.28),transparent_55%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-black/35 px-3 py-1.5 text-[11.5px] font-medium">
          <span className="truncate">The freight invoice checklist · 6 pages</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
            <path d="M4 14v6h6M20 10V4h-6M4 20l7-7M20 4l-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="relative flex h-full flex-col justify-between px-[7%] pb-[6%] pt-[13%]">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/75">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#f5a623] text-[11px] text-[#0f2440]">N</span>
            Northwind Audit
          </div>
          <div>
            <div className="font-display text-[clamp(44px,13vw,72px)] font-bold leading-none tracking-tight text-[#f5a623]">1 in 9</div>
            <div className="mt-1.5 max-w-[80%] text-[clamp(13px,3.6vw,17px)] font-semibold leading-snug">freight invoices we checked had a billing error</div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-white/70">
            <span>Swipe for the 6 checks</span>
            <span>1 / 6</span>
          </div>
        </div>
        <span className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f2440" strokeWidth="2.6">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* counts */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 text-[12px] text-[#666]">
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="flex shrink-0" aria-hidden="true">
            <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#378fe9] ring-2 ring-white">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff">
                <path d="M2 21h4V9H2v12zm20-11a2 2 0 00-2-2h-6.3l1-4.6V3a1.5 1.5 0 00-.4-1L13.2 1 7.6 6.6A2 2 0 007 8v11a2 2 0 002 2h9a2 2 0 001.8-1.2l3-7.1A2 2 0 0023 12v-2z" />
              </svg>
            </span>
            <span className="-ml-1 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#6dae4f] ring-2 ring-white">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 2l2.4 6.9H22l-6 4.4 2.3 7L12 16l-6.3 4.3 2.3-7-6-4.4h7.6z" />
              </svg>
            </span>
            <span className="-ml-1 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#f5bb5c] ring-2 ring-white">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff">
                <path d="M9 21h6v-2H9v2zm3-19a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
              </svg>
            </span>
          </span>
          <span className="truncate">
            <span className="sm:hidden">{n}</span>
            <span className="hidden sm:inline">Sam Okafor and {Math.max(0, n - 1)} others</span>
          </span>
        </span>
        <span className="shrink-0">{Math.round((n / TARGET) * 23)} comments · 6 reposts</span>
      </div>

      {/* actions */}
      <div className="mx-3 flex border-t border-black/10 py-1">
        <LiIcon label="Like" d={<path d="M7 11v9H4v-9h3zm0 0l4-8a2 2 0 012 2v4h5.5a2 2 0 012 2.3l-1.2 6A2 2 0 0117.3 19H7" strokeLinejoin="round" />} />
        <LiIcon label="Comment" d={<path d="M4 5h16v11H9l-5 4V5z" strokeLinejoin="round" />} />
        <LiIcon label="Repost" d={<path d="M7 7h11l-3-3M17 17H6l3 3" strokeLinecap="round" strokeLinejoin="round" />} />
        <LiIcon label="Send" d={<path d="M21 3L3 10.5l7 2.5 2.5 7L21 3zM10 13l5-5" strokeLinejoin="round" />} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3. Inbox (Outbound) */

function InboxExample() {
  const reduce = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const step = useSteps(inView, [1100], reduce);
  return (
    <div ref={ref} className="w-full min-w-0 max-w-[480px] overflow-hidden rounded-2xl bg-white text-[#1f1f1f] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]" style={{ fontFamily: SYS_FONT }}>
      {/* toolbar */}
      <div className="flex items-center gap-4 border-b border-black/[0.07] px-4 py-2.5 text-[#5f6368]" aria-hidden="true">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="4" rx="1" />
          <path d="M5 9v10h14V9M10 13h4" strokeLinecap="round" />
        </svg>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13" strokeLinejoin="round" />
        </svg>
        <span className="ml-auto text-[12px]">1 of 38</span>
      </div>

      <div className="px-4 pb-4 pt-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[17px] font-normal leading-snug text-[#1f1f1f]">Quick question about Kestrel&apos;s freight bills</p>
          <span className="rounded bg-[#ececec] px-1.5 py-[1px] text-[11px] text-[#444]">Inbox</span>
          {step >= 1 && <span className="ai-in rounded bg-[#d3f2df] px-1.5 py-[1px] text-[11px] font-medium text-[#137333]">Interested</span>}
        </div>

        {/* our sent email, collapsed */}
        <div className="mt-3.5 flex gap-3 border-b border-black/[0.07] pb-3">
          <Avatar initials="DR" from="#1e3a5f" to="#0f2440" size={36} />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[13.5px] font-semibold">
                Dana Reyes <span className="font-normal text-[#5f6368]">to Sam</span>
              </span>
              <span className="shrink-0 text-[11.5px] text-[#5f6368]">Oct 28</span>
            </div>
            <p className="truncate text-[13px] text-[#5f6368]">Hi Sam, saw Kestrel opened a second warehouse in Ohio. When volume jumps like that, carrier billing errors usually jump with it...</p>
          </div>
        </div>

        {/* the reply */}
        <div className={`mt-3 rounded-xl transition-colors duration-[1500ms] ${step >= 1 ? "ai-in" : "opacity-0"} ${step >= 1 && !reduce ? "inbox-flash" : ""}`}>
          <div className="flex gap-3">
            <Avatar initials="SO" from="#1a7f5a" to="#0e5a3f" size={36} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="min-w-0 truncate text-[13.5px] font-semibold">
                  Sam Okafor <span className="hidden font-normal text-[#5f6368] sm:inline">&lt;sam@kestrelsupply.com&gt;</span>
                </span>
                <span className="shrink-0 text-[11.5px] text-[#5f6368]">10:42 AM</span>
              </div>
              <div className="text-[12px] text-[#5f6368]">to Dana</div>
              <div className="mt-2.5 text-[14px] leading-relaxed text-[#222]">
                <p>Hi Dana,</p>
                <p className="mt-2">This is timely. We found two duplicate bills last month and I&apos;m sure there are more. Are you free Thursday at 10 for a quick call?</p>
                <p className="mt-2">Sam</p>
              </div>
            </div>
          </div>
          <div className="mt-3.5 flex gap-2 pl-12" aria-hidden="true">
            {["Reply", "Forward"].map((b) => (
              <span key={b} className="rounded-full border border-[#c4c7c5] px-4 py-1.5 text-[13px] font-medium text-[#444]">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. Lead magnet app (Inbound Engine) */

function CalculatorExample() {
  const [spend, setSpend] = useState(85000);
  const [invoices, setInvoices] = useState(420);
  const yearly = Math.round((spend * 12 * 0.031) / 100) * 100;
  const wrong = Math.round(invoices / 9);
  return (
    <div className="w-full min-w-0 max-w-[480px] overflow-hidden rounded-2xl bg-white text-[#0f172a] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]" style={{ fontFamily: SYS_FONT }}>
      {/* browser chrome */}
      <div className="flex items-center gap-2.5 bg-[#eceef1] px-3 py-2.5">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[11.5px] text-[#475569]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.4" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 018 0v4" />
          </svg>
          <span className="truncate">northwindaudit.com/overcharge-calculator</span>
        </span>
      </div>

      <div className="px-5 pb-5 pt-4">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f2440]">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#f5a623] text-[11px] text-[#0f2440]">N</span>
          Northwind Audit
        </div>
        <p className="mt-3 text-[19px] font-bold leading-tight tracking-tight">How much are carriers overcharging you?</p>
        <p className="mt-1 text-[13px] text-[#64748b]">Two numbers. About ten seconds.</p>

        <div className="mt-4 flex flex-col gap-3.5">
          <div>
            <label htmlFor="calc-spend" className="flex justify-between text-[12.5px] font-medium text-[#334155]">
              <span>Freight spend a month</span>
              <span className="font-semibold text-[#0f172a]">${spend.toLocaleString("en-US")}</span>
            </label>
            <input id="calc-spend" type="range" min={10000} max={400000} step={5000} value={spend} onChange={(e) => setSpend(Number(e.target.value))} className="mt-1.5 w-full accent-[#0f2440]" />
          </div>
          <div>
            <label htmlFor="calc-inv" className="flex justify-between text-[12.5px] font-medium text-[#334155]">
              <span>Carrier invoices a month</span>
              <span className="font-semibold text-[#0f172a]">{invoices.toLocaleString("en-US")}</span>
            </label>
            <input id="calc-inv" type="range" min={50} max={3000} step={10} value={invoices} onChange={(e) => setInvoices(Number(e.target.value))} className="mt-1.5 w-full accent-[#0f2440]" />
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#0f2440] p-4 text-white">
          <div className="text-[12px] text-white/70">You are likely overpaying</div>
          <div className="mt-0.5 text-[30px] font-bold leading-none tracking-tight text-[#f5a623]">
            ${yearly.toLocaleString("en-US")} <span className="text-[14px] font-semibold text-white/80">a year</span>
          </div>
          <div className="mt-1.5 text-[12px] text-white/70">About {wrong} invoices a month with a billing error.</div>
        </div>

        <div className="mt-3.5 text-[12.5px] font-medium text-[#334155]">Send me the full report</div>
        <div className="mt-1.5 flex gap-2">
          <span className="min-w-0 flex-1 truncate rounded-lg border border-[#cbd5e1] px-3 py-2 text-[13px] text-[#94a3b8]">you@company.com</span>
          <span className="shrink-0 rounded-lg bg-[#f5a623] px-3.5 py-2 text-[13px] font-semibold text-[#0f2440]">Send it</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ section */

const EXAMPLES: { outcome: OutcomeId; caption: string; tint: string; node: ReactNode }[] = [
  { outcome: "shortlisted", caption: "A buyer asks ChatGPT who to hire. Your name comes up first.", tint: "rgba(16,185,129,0.14)", node: <AiChatExample /> },
  { outcome: "outbound", caption: "An email to a buyer you picked. The reply lands in your inbox.", tint: "rgba(177,19,15,0.2)", node: <InboxExample /> },
  { outcome: "linkedin-authority", caption: "A post with a designed carousel, in your buyers' feed every week.", tint: "rgba(79,140,255,0.16)", node: <LinkedInExample /> },
  { outcome: "inbound-engine", caption: "A calculator on your site that answers a real question and asks for an email. Try it.", tint: "rgba(245,166,35,0.13)", node: <CalculatorExample /> },
];

export default function Demos() {
  return (
    <section id="demos" className="relative border-y border-[#1f1f30] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="sec-label">Examples</Reveal>
        <Reveal as="h2" className="font-display mb-4 max-w-3xl text-[32px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px]">
          What your buyers <em className="hd-em">actually see.</em>
        </Reveal>
        <Reveal as="p" className="mb-12 max-w-2xl text-[16px] leading-relaxed text-[#9099b8]" delay={60}>
          One example from each package, made for an invented client: Northwind Audit, a firm that audits freight invoices.
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {EXAMPLES.map((ex, i) => {
            const o = outcomeById(ex.outcome);
            return (
              <Reveal key={ex.outcome} delay={(i % 2) * 80} className="flex h-full min-w-0 flex-col">
                <div
                  className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-3xl border border-[#1f1f30] px-4 pb-6 pt-14 sm:px-10 sm:pb-10"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${ex.tint}, transparent 70%), linear-gradient(170deg,#121220,#0a0a12)` }}
                >
                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9099b8]">
                    Example
                  </span>
                  {ex.node}
                </div>
                <div className="px-1 pt-4">
                  <a href={o.href} className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff5a52]">
                    {o.name} package
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#c3c8dc]">{ex.caption}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .ai-in {
          animation: aiIn 0.45s ease both;
        }
        .ai-shimmer {
          background: linear-gradient(90deg, #8f8f8f 0%, #e8e8e8 50%, #8f8f8f 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: aiShimmer 1.4s linear infinite;
        }
        .ai-shimmer svg {
          stroke: #9b9b9b;
        }
        .inbox-flash {
          animation: aiIn 0.45s ease both, inboxFlash 2.4s ease 0.2s both;
        }
        @keyframes aiIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes aiShimmer {
          to {
            background-position: -200% 0;
          }
        }
        @keyframes inboxFlash {
          0% {
            background: rgba(26, 115, 232, 0.1);
            box-shadow: 0 0 0 8px rgba(26, 115, 232, 0.1);
          }
          100% {
            background: transparent;
            box-shadow: 0 0 0 8px transparent;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-in,
          .ai-shimmer,
          .inbox-flash {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
