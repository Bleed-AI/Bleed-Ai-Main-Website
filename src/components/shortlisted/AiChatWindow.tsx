"use client";

// Signature piece for /shortlisted (round 2, 2026-10-30): a real looking AI chat window.
// A buyer asks a question, the assistant types a numbered answer with source chips.
// "Not named" shows the answer today, "Named" shows it after the work. Switch the skin between a
// ChatGPT style dark window and a Claude style light window. No official logos, only the names in text.
// Every company is invented and the piece is labelled Example.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { slotById } from "@/lib/slots";
import { SYS_FONT } from "./BrowserFrame";
import { ExampleTag, useInView, useReducedMotion } from "./ui";

type Item = { name: string; you?: boolean; desc: string; chips: string[] };
type Scene = { intro: string; items: Item[]; outro: string };

const QUESTION = "Who are the best accounting firms for construction companies in Texas?";
const CLIENT = "Northline Advisory";

const SCENES: Record<"before" | "after", Scene> = {
  before: {
    intro: "Here are firms that come up often for construction accounting in Texas:",
    items: [
      { name: "Brickwell CPA", desc: "Strong on contractor tax and job costing, with a dedicated construction team.", chips: ["brickwellcpa.com"] },
      { name: "Summit Ledger", desc: "Popular with general contractors for retainage, audits and bonding packages.", chips: ["contractorfinanceweekly.com"] },
      { name: "Lone Pine Advisors", desc: "Known for WIP schedules and percentage of completion reporting.", chips: ["lonepineadvisors.com"] },
    ],
    outro: "Ask each one for a construction client you can call before you decide.",
  },
  after: {
    intro: "Here are firms that come up often for construction accounting in Texas:",
    items: [
      {
        name: CLIENT,
        you: true,
        desc: "Focused on construction cash flow and retainage. Their 2026 Texas retainage guide is widely referenced.",
        chips: ["northlineadvisory.com", "contractorfinanceweekly.com"],
      },
      { name: "Brickwell CPA", desc: "Strong on contractor tax and job costing, with a dedicated construction team.", chips: ["brickwellcpa.com"] },
      { name: "Summit Ledger", desc: "Popular with general contractors for audits and bonding packages.", chips: ["contractorfinanceweekly.com"] },
    ],
    outro: "If cash flow is your main worry, Northline is a good first call.",
  },
};

type Skin = "chatgpt" | "claude";

const SKIN = {
  chatgpt: {
    label: "ChatGPT",
    bg: "#212121",
    text: "#ececec",
    sub: "#b4b4b4",
    bubble: "#303030",
    chipBg: "#303030",
    chipText: "#b4b4b4",
    chipYouBg: "rgba(16,185,129,0.18)",
    chipYouText: "#7af0bf",
    border: "rgba(255,255,255,0.08)",
    composer: "#303030",
    answerFont: SYS_FONT,
    mark: "rgba(16,185,129,0.28)",
  },
  claude: {
    label: "Claude",
    bg: "#faf9f5",
    text: "#1f1e1d",
    sub: "#6b6a64",
    bubble: "#f0eee6",
    chipBg: "#ecebe4",
    chipText: "#5e5d59",
    chipYouBg: "rgba(16,185,129,0.16)",
    chipYouText: "#067a55",
    border: "rgba(0,0,0,0.08)",
    composer: "#ffffff",
    answerFont: 'Georgia, "Times New Roman", serif',
    mark: "rgba(16,185,129,0.22)",
  },
} as const;

/** Flatten a scene into typed segments so the answer can be revealed character by character. */
function segLengths(s: Scene): { intro: number; items: number[]; outro: number; total: number } {
  const items = s.items.map((it) => it.name.length + it.desc.length + 2);
  const total = s.intro.length + items.reduce((a, b) => a + b, 0) + s.outro.length;
  return { intro: s.intro.length, items, outro: s.outro.length, total };
}

function Sparkle({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2zm7 13l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" />
    </svg>
  );
}

export default function AiChatWindow({ onStateChange }: { onStateChange?: (s: "before" | "after") => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, 0.3);
  const reduce = useReducedMotion();

  const [skin, setSkin] = useState<Skin>("chatgpt");
  const [state, setState] = useState<"before" | "after">("before");
  const [qChars, setQChars] = useState(0);
  const [aChars, setAChars] = useState(0);
  const [started, setStarted] = useState(false);
  const [auto, setAuto] = useState(true);
  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scene = SCENES[state];
  const L = useMemo(() => segLengths(scene), [scene]);
  const done = aChars >= L.total;
  const k = SKIN[skin];

  const clear = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (timer.current) clearTimeout(timer.current);
  };

  const play = useCallback(
    (which: "before" | "after", typeQuestion: boolean) => {
      clear();
      setState(which);
      onStateChange?.(which);
      const len = segLengths(SCENES[which]).total;
      if (reduce) {
        setQChars(QUESTION.length);
        setAChars(len);
        return;
      }
      setAChars(0);
      if (typeQuestion) setQChars(0);
      const qSpeed = 0.06;
      const aSpeed = 0.2;
      const t0 = performance.now();
      const qTime = typeQuestion ? QUESTION.length / qSpeed + 600 : 500;
      const tick = (now: number) => {
        const dt = now - t0;
        if (typeQuestion) setQChars(Math.min(QUESTION.length, Math.floor(dt * qSpeed)));
        if (dt > qTime) setAChars(Math.min(len, Math.floor((dt - qTime) * aSpeed)));
        if (dt < qTime + len / aSpeed + 50) raf.current = requestAnimationFrame(tick);
        else setAChars(len);
      };
      raf.current = requestAnimationFrame(tick);
    },
    [onStateChange, reduce]
  );

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);
    play("before", true);
  }, [inView, started, play]);

  // After the "Not named" answer finishes, show the "Named" one once.
  useEffect(() => {
    if (!auto || !started || state !== "before" || !done) return;
    timer.current = setTimeout(() => {
      setAuto(false);
      play("after", false);
    }, reduce ? 0 : 2200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [auto, started, state, done, play, reduce]);

  useEffect(() => () => clear(), []);

  const pick = (which: "before" | "after") => {
    setAuto(false);
    play(which, false);
  };

  // Budgeted render.
  let budget = aChars;
  const take = (s: string) => {
    const shown = s.slice(0, Math.max(0, budget));
    budget -= s.length;
    return shown;
  };
  const intro = take(scene.intro);
  const items = scene.items.map((it) => {
    if (budget <= 0) return null;
    const name = take(it.name);
    budget -= 2;
    const desc = take(it.desc);
    const complete = budget >= 0;
    return { it, name, desc, complete };
  });
  const outro = take(scene.outro);
  const typing = started && !done && aChars > 0;
  const thinking = started && aChars === 0 && qChars >= QUESTION.length && !reduce;
  const question = reduce ? QUESTION : QUESTION.slice(0, qChars);

  const chip = (c: string, you: boolean) => (
    <span
      key={c}
      className="ml-1.5 inline-flex translate-y-[-1px] items-center gap-1 whitespace-nowrap rounded-full px-2 py-[1px] align-middle text-[11px] font-medium"
      style={{ background: you ? k.chipYouBg : k.chipBg, color: you ? k.chipYouText : k.chipText, fontFamily: SYS_FONT }}
    >
      {c.replace(".com", "")}
    </span>
  );

  return (
    <div ref={ref} className="w-full">
      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div role="tablist" aria-label="Before or after" className="inline-flex rounded-full border border-[#2a2a3e] bg-[#0d0d16] p-1">
            {(["before", "after"] as const).map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={state === v}
                onClick={() => pick(v)}
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                  state === v ? (v === "after" ? "bg-[#10b981]/20 text-[#7af0bf]" : "bg-[#B1130F]/25 text-[#ffb3b0]") : "text-white/55 hover:text-white/85"
                }`}
              >
                {v === "before" ? "Today: not named" : "After: named"}
              </button>
            ))}
          </div>
          <div role="tablist" aria-label="Assistant" className="inline-flex rounded-full border border-[#2a2a3e] bg-[#0d0d16] p-1">
            {(["chatgpt", "claude"] as const).map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={skin === v}
                onClick={() => setSkin(v)}
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                  skin === v ? "bg-white/10 text-white" : "text-white/55 hover:text-white/85"
                }`}
              >
                {SKIN[v].label}
              </button>
            ))}
          </div>
        </div>
        <ExampleTag>Example, invented companies</ExampleTag>
      </div>

      {/* Window */}
      <div
        className="overflow-hidden rounded-2xl shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08)] transition-colors duration-300"
        style={{ background: k.bg, color: k.text, fontFamily: SYS_FONT }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${k.border}` }}>
          <span className="flex items-center gap-1.5 text-[15px] font-semibold" style={{ color: k.text }}>
            {skin === "claude" ? (
              <span className="truncate text-[13.5px] font-medium">Construction accountants in Texas</span>
            ) : (
              <>
                {k.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={k.sub} strokeWidth={2.4} aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </>
            )}
          </span>
          <span className="flex items-center gap-3" style={{ color: k.sub }} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="1.8" />
              <circle cx="12" cy="12" r="1.8" />
              <circle cx="19" cy="12" r="1.8" />
            </svg>
          </span>
        </div>

        <div className="px-4 pb-4 pt-5 sm:px-7 sm:pt-6">
          {/* Question */}
          {skin === "chatgpt" ? (
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-3xl px-4 py-2.5 text-[14.5px] leading-relaxed" style={{ background: k.bubble }}>
                {question || " "}
                {started && qChars < QUESTION.length && !reduce && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-current" />}
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 rounded-xl px-3 py-2.5" style={{ background: k.bubble }}>
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#3d3929] text-[11px] font-semibold text-white">S</span>
              <span className="text-[14.5px] leading-relaxed">
                {question || " "}
                {started && qChars < QUESTION.length && !reduce && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-current" />}
              </span>
            </div>
          )}

          {/* Answer */}
          <div className="mt-5 min-h-[330px] text-[14.5px] leading-[1.7] sm:min-h-[300px]" style={{ fontFamily: k.answerFont }}>
            {skin === "claude" && (thinking || aChars > 0) && (
              <div className="mb-2">
                <Sparkle color="#d97757" />
              </div>
            )}
            {thinking && (
              <span className="inline-block h-3 w-3 animate-pulse rounded-full" style={{ background: k.text }} aria-label="Thinking" />
            )}
            {intro && <p className="mb-3">{intro}</p>}
            <ol className="space-y-2.5">
              {items.map((row, i) =>
                row ? (
                  <li key={`${state}-${i}`} className="flex gap-2">
                    <span className="flex-none font-semibold">{i + 1}.</span>
                    <span>
                      <strong
                        className="rounded-[3px] font-semibold"
                        style={row.it.you ? { background: k.mark, boxShadow: `0 0 0 2px ${k.mark}` } : undefined}
                      >
                        {row.name}
                      </strong>
                      {row.name.length === row.it.name.length && ": "}
                      {row.desc}
                      {row.complete && row.it.chips.map((c) => chip(c, !!row.it.you))}
                    </span>
                  </li>
                ) : null
              )}
            </ol>
            {outro && <p className="mt-3">{outro}</p>}
            {typing && <span className="ml-0.5 inline-block h-3 w-3 translate-y-[1px] rounded-full" style={{ background: k.text }} />}

            {done && (
              <div className="mt-3 flex items-center gap-3" style={{ color: k.sub }} aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V5a1 1 0 011-1h10" />
                </svg>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 10v11M15 5.9L14 10h5.5a2 2 0 012 2.3l-1.2 7A2 2 0 0118.3 21H7V10l4-8a2.6 2.6 0 014 3.9z" />
                </svg>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 14V3M9 18.1L10 14H4.5a2 2 0 01-2-2.3l1.2-7A2 2 0 015.7 3H17v11l-4 8a2.6 2.6 0 01-4-3.9z" />
                </svg>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M20 11a8 8 0 10-2.3 5.7M20 4v7h-7" />
                </svg>
              </div>
            )}
          </div>

          {/* Composer */}
          <div
            className="mt-4 flex items-center gap-3 rounded-3xl px-4 py-3"
            style={{ background: k.composer, border: skin === "claude" ? `1px solid ${k.border}` : "none", boxShadow: skin === "claude" ? "0 2px 8px rgba(0,0,0,0.05)" : "none" }}
          >
            <span className="text-[18px] leading-none" style={{ color: k.sub }} aria-hidden="true">
              +
            </span>
            <span className="flex-1 text-[14px]" style={{ color: k.sub }}>
              {skin === "claude" ? "Reply to Claude..." : "Ask anything"}
            </span>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: skin === "claude" ? "#d97757" : "#ececec", color: skin === "claude" ? "#fff" : "#212121" }}
              aria-hidden="true"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6}>
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Verdict, outside the window */}
      <div
        className={`mt-4 flex items-start gap-2.5 rounded-xl border px-4 py-3 transition-all duration-500 ${
          state === "after" ? "border-[#10b981]/30 bg-[#10b981]/[0.07]" : "border-[#B1130F]/25 bg-[#B1130F]/[0.07]"
        } ${done ? "opacity-100" : "opacity-0"}`}
        aria-live="polite"
      >
        {state === "after" ? (
          <p className="text-[13.5px] leading-snug text-[#c9f5e2]">
            <span className="font-semibold text-[#7af0bf]">{CLIENT} is named first.</span> Both pages the answer leans on are work from the package: their article ({slotById("articles").name}) and a roundup that now lists them ({slotById("citations").name}).
          </p>
        ) : (
          <p className="text-[13.5px] leading-snug text-[#ffd0ce]">
            <span className="font-semibold text-[#ff9d99]">{CLIENT} is not mentioned.</span> None of the pages the assistant read talk about them, so the buyer calls one of these three.
          </p>
        )}
      </div>
    </div>
  );
}
