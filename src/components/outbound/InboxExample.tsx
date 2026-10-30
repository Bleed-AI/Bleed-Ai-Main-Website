"use client";

import { useState, type ReactNode } from "react";
import { useOnceInView, useStepper } from "./useOnceInView";

/**
 * Signature piece for /outbound/ (round 2, 2026-10-30): a real looking mail client.
 * The sent email sits in the thread, then the buyer's reply arrives, we answer it, and the meeting lands.
 * Invented companies, labelled Example. Plays once on view, holds the final frame, honours reduced motion.
 */

// 1 reply arrives · 2 drafting · 3 our answer · 4 buyer accepts · 5 invite
const TOTAL = 5;
const GAPS = [1100, 1300, 1200, 1100, 700];

function Avatar({ init, bg }: { init: string; bg: string }) {
  return (
    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-[12px] font-semibold text-white" style={{ background: bg }}>
      {init}
    </span>
  );
}

function Message({
  init,
  bg,
  name,
  addr,
  to,
  time,
  fresh,
  children,
  show = true,
  note,
}: {
  init: string;
  bg: string;
  name: string;
  addr: string;
  to: string;
  time: string;
  fresh?: boolean;
  children: ReactNode;
  show?: boolean;
  note?: ReactNode;
}) {
  return (
    <div
      className={`ib-msg border-t border-[#eceef3] px-4 py-4 sm:px-6 ${show ? "ib-in" : "ib-hidden"} ${fresh ? "bg-[#f6f9ff]" : ""}`}
      aria-hidden={!show}
    >
      <div className="flex items-start gap-3">
        <Avatar init={init} bg={bg} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <div className="min-w-0">
              <span className="text-[14px] font-semibold text-[#1f1f1f]">{name}</span>{" "}
              <span className="hidden text-[12px] text-[#5f6368] sm:inline">&lt;{addr}&gt;</span>
            </div>
            <span className="flex items-center gap-1.5 text-[12px] text-[#5f6368]">
              {fresh && <span className="rounded bg-[#1a73e8] px-1.5 py-[1px] text-[10px] font-bold uppercase text-white">New</span>}
              {time}
            </span>
          </div>
          <div className="text-[12px] text-[#5f6368]">to {to}</div>
          <div className="mt-3 space-y-2.5 text-[14px] leading-[1.55] text-[#202124]">{children}</div>
          {note && <div className="mt-3">{note}</div>}
        </div>
      </div>
    </div>
  );
}

function Note({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "red" }) {
  const c = tone === "green" ? "border-[#bfe8d6] bg-[#ecfaf3] text-[#0b7a4f]" : "border-[#f3c9c7] bg-[#fdf0ef] text-[#a3120e]";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold ${c}`}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7" />
      </svg>
      {children}
    </span>
  );
}

export default function InboxExample() {
  const { ref, seen, reduced } = useOnceInView<HTMLDivElement>(0.3);
  const [run, setRun] = useState(0);
  const step = useStepper(seen, TOTAL, GAPS, reduced, run);

  const folders = [
    { n: "Inbox", c: step >= 1 ? 1 : 0, on: true },
    { n: "Starred" },
    { n: "Sent" },
    { n: "Drafts" },
    { n: "Meetings", c: step >= 5 ? 1 : 0 },
  ];

  return (
    <div ref={ref} className="relative">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full border border-[#f59e0b]/50 bg-[#f59e0b]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#f5b544]">
          Example
        </span>
        {!reduced && (
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2a3e] px-3 py-1 text-[12px] font-semibold text-[#c3c8dc] hover:border-white/30"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
            </svg>
            Replay
          </button>
        )}
      </div>

      {/* The mail client window */}
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)]"
        style={{ fontFamily: "'Instrument Sans', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-[#e3e5ea] bg-[#f6f8fc] px-3 py-2.5 sm:px-4">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#e9eef6] px-3 py-1.5 text-[12.5px] text-[#5f6368]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
            <span className="truncate">Search mail</span>
          </div>
          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#7c4dff] text-[11px] font-semibold text-white">SP</span>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-[168px] flex-none border-r border-[#eceef3] bg-[#f6f8fc] px-2.5 py-3 md:block" aria-hidden="true">
            <div className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-[#c2e7ff] px-4 py-2.5 text-[13px] font-semibold text-[#001d35]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
              </svg>
              Compose
            </div>
            {folders.map((f) => (
              <div
                key={f.n}
                className={`flex items-center justify-between rounded-full px-3 py-1.5 text-[13px] ${f.on ? "bg-[#d3e3fd] font-semibold text-[#001d35]" : "text-[#444746]"}`}
              >
                {f.n}
                {f.c ? <span className="text-[12px] font-bold">{f.c}</span> : null}
              </div>
            ))}
          </aside>

          {/* Thread */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 px-4 pb-3 pt-4 sm:px-6">
              <h3 className="text-[17px] font-normal text-[#1f1f1f] sm:text-[19px]">Your new Head of Sales Ops</h3>
              <span className="rounded bg-[#eceef3] px-1.5 py-[1px] text-[11px] text-[#444746]">Inbox</span>
            </div>

            <Message
              init="SP"
              bg="#7c4dff"
              name="Sam Patel"
              addr="sam@acmerouting.com"
              to="Dana Reyes"
              time="Tue, 9:14 AM"
              note={<Note tone="red">Sent because Northwind just posted a Head of Sales Ops role</Note>}
            >
              <p>Hi Dana,</p>
              <p>Saw Northwind is hiring a Head of Sales Operations. That usually means pipeline is the thing to fix this quarter.</p>
              <p>We help freight teams book more shipper meetings without adding headcount. Worth a 15 minute look?</p>
              <p>Sam</p>
            </Message>

            <Message init="DR" bg="#0b8043" name="Dana Reyes" addr="dana@northwindfreight.com" to="me" time="11:02 AM" fresh={step === 1 || step === 2} show={step >= 1}>
              <p>Funny timing, we are hiring for exactly this. What would it look like for us?</p>
            </Message>

            {step === 2 && (
              <div className="flex items-center gap-2 border-t border-[#eceef3] px-4 py-3 text-[12.5px] text-[#5f6368] sm:px-6">
                <span className="ib-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                Drafting a reply in Sam&apos;s voice
              </div>
            )}

            <Message
              init="SP"
              bg="#7c4dff"
              name="Sam Patel"
              addr="sam@acmerouting.com"
              to="Dana Reyes"
              time="11:09 AM"
              show={step >= 3}
              note={<Note>Answered in 7 minutes, checked by a person</Note>}
            >
              <p>Happy to show you. It takes 20 minutes. Does Tuesday at 10 or Wednesday at 2 work?</p>
            </Message>

            <Message init="DR" bg="#0b8043" name="Dana Reyes" addr="dana@northwindfreight.com" to="me" time="11:31 AM" fresh={step === 4} show={step >= 4}>
              <p>Tuesday at 10 works. Send the invite.</p>
            </Message>

            {/* Calendar invite */}
            <div className={`border-t border-[#eceef3] px-4 pb-5 pt-4 sm:px-6 ${step >= 5 ? "ib-in" : "ib-hidden"}`} aria-hidden={step < 5}>
              <div className="flex items-center gap-3 rounded-lg border border-[#dadce0] bg-white p-3 shadow-[0_1px_2px_rgba(60,64,67,0.15)] sm:max-w-[420px]">
                <div className="flex h-12 w-12 flex-none flex-col items-center justify-center overflow-hidden rounded-md border border-[#dadce0]">
                  <span className="w-full bg-[#1a73e8] text-center text-[9px] font-bold uppercase leading-[14px] text-white">Tue</span>
                  <span className="text-[17px] font-semibold leading-[30px] text-[#1f1f1f]">14</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-semibold text-[#1f1f1f]">Intro call: Northwind x Acme Routing</div>
                  <div className="text-[12px] text-[#5f6368]">Tuesday, 10:00 to 10:20 AM</div>
                </div>
                <span className="flex-none rounded-full bg-[#e6f4ea] px-2.5 py-1 text-[11.5px] font-semibold text-[#137333]">Accepted</span>
              </div>
            </div>
          </div>
        </div>

        {/* New mail toast */}
        <div
          className={`pointer-events-none absolute bottom-4 left-1/2 w-[min(320px,calc(100%-32px))] -translate-x-1/2 rounded-lg bg-[#202124] px-4 py-3 text-[13px] text-white shadow-xl transition-all duration-500 ${
            step === 1 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          aria-hidden="true"
        >
          <span className="font-semibold">Dana Reyes</span> replied: &ldquo;Funny timing, we are hiring...&rdquo;
        </div>
      </div>

      <style jsx global>{`
        .ib-msg,
        .ib-in,
        .ib-hidden {
          transition: opacity 0.5s ease, transform 0.5s ease, max-height 0.6s ease;
        }
        .ib-in {
          opacity: 1;
          transform: none;
          max-height: 600px;
        }
        .ib-hidden {
          opacity: 0;
          transform: translateY(8px);
          max-height: 0;
          overflow: hidden;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          border-width: 0 !important;
        }
        .ib-dots {
          display: inline-flex;
          gap: 3px;
        }
        .ib-dots i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #9aa0a6;
          animation: ibDot 1s infinite ease-in-out;
        }
        .ib-dots i:nth-child(2) {
          animation-delay: 0.15s;
        }
        .ib-dots i:nth-child(3) {
          animation-delay: 0.3s;
        }
        @keyframes ibDot {
          0%,
          80%,
          100% {
            opacity: 0.3;
          }
          40% {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ib-msg,
          .ib-in,
          .ib-hidden {
            transition: none;
          }
          .ib-dots i {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
