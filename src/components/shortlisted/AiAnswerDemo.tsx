"use client";

// Signature piece for /shortlisted: an AI answer that types itself out for a buyer question,
// with the sources it read lighting up underneath, and a Not named / Named toggle.
// Every company here is invented and the card is labelled Example.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { slotById } from "@/lib/slots";
import { ExampleTag, useInView, useReducedMotion } from "./ui";

type Part = { t: string; k?: "b" | "you" | "cite"; src?: number };
type Source = { id: number; site: string; title: string; slot?: string; you?: boolean };
type Scene = { lines: Part[][]; sources: Source[] };

const QUESTION = "Who are the best accounting firms for construction companies in Texas?";
const CLIENT = "Northline Advisory";

const SCENES: Record<"before" | "after", Scene> = {
  before: {
    lines: [
      [{ t: "A few firms come up often for construction accounting in Texas:" }],
      [{ t: "Brickwell CPA", k: "b" }, { t: ", strong on contractor tax and job costing." }, { t: "1", k: "cite", src: 1 }],
      [{ t: "Summit Ledger", k: "b" }, { t: ", popular with general contractors for retainage and audits." }, { t: "2", k: "cite", src: 2 }],
      [{ t: "Lone Pine Advisors", k: "b" }, { t: ", known for WIP schedules and bonding support." }, { t: "3", k: "cite", src: 3 }],
      [{ t: "Ask each one for a construction client you can call." }],
    ],
    sources: [
      { id: 1, site: "brickwellcpa", title: "Construction tax services" },
      { id: 2, site: "Contractor Finance Weekly", title: "Top construction CPAs in Texas" },
      { id: 3, site: "lonepineadvisors", title: "What is a WIP schedule?" },
    ],
  },
  after: {
    lines: [
      [{ t: "A few firms come up often for construction accounting in Texas:" }],
      [
        { t: CLIENT, k: "you" },
        { t: ", known for construction cash flow and retainage. Their 2026 retainage guide is widely referenced." },
        { t: "1", k: "cite", src: 1 },
        { t: "2", k: "cite", src: 2 },
      ],
      [{ t: "Brickwell CPA", k: "b" }, { t: ", strong on contractor tax and job costing." }, { t: "3", k: "cite", src: 3 }],
      [{ t: "Summit Ledger", k: "b" }, { t: ", popular with general contractors for audits." }, { t: "2", k: "cite", src: 2 }],
      [{ t: "If cash flow is the worry, start with Northline." }],
    ],
    sources: [
      { id: 1, site: "northlineadvisory", title: "How Texas contractors should handle retainage in 2026", slot: "articles", you: true },
      { id: 2, site: "Contractor Finance Weekly", title: "Top construction CPAs in Texas (now lists Northline)", slot: "citations", you: true },
      { id: 3, site: "brickwellcpa", title: "Construction tax services" },
    ],
  },
};

const ASSISTANTS = ["ChatGPT", "Claude", "Perplexity", "Google AI"];

function sceneLength(s: Scene): number {
  return s.lines.reduce((sum, line) => sum + line.reduce((a, p) => a + (p.k === "cite" ? 1 : p.t.length), 0), 0);
}

/** Character index at which each source's first citation appears. */
function citeAt(s: Scene): Record<number, number> {
  const out: Record<number, number> = {};
  let i = 0;
  s.lines.forEach((line) =>
    line.forEach((p) => {
      const len = p.k === "cite" ? 1 : p.t.length;
      if (p.k === "cite" && p.src && out[p.src] === undefined) out[p.src] = i + 1;
      i += len;
    })
  );
  return out;
}

export default function AiAnswerDemo({ onStateChange }: { onStateChange?: (s: "before" | "after") => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, 0.3);
  const reduce = useReducedMotion();

  const [state, setState] = useState<"before" | "after">("before");
  const [qChars, setQChars] = useState(0);
  const [aChars, setAChars] = useState(0);
  const [auto, setAuto] = useState(true);
  const [started, setStarted] = useState(false);
  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scene = SCENES[state];
  const total = useMemo(() => sceneLength(scene), [scene]);
  const cites = useMemo(() => citeAt(scene), [scene]);
  const done = aChars >= total;

  const clear = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (timer.current) clearTimeout(timer.current);
  };

  const play = useCallback(
    (which: "before" | "after", typeQuestion: boolean) => {
      clear();
      setState(which);
      onStateChange?.(which);
      const len = sceneLength(SCENES[which]);
      if (reduce) {
        setQChars(QUESTION.length);
        setAChars(len);
        return;
      }
      setAChars(0);
      if (typeQuestion) setQChars(0);
      const qSpeed = 0.07; // chars per ms
      const aSpeed = 0.16;
      const t0 = performance.now();
      const qTime = typeQuestion ? QUESTION.length / qSpeed + 350 : 250;
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

  // Autoplay once in view: Not named, a pause, then Named.
  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);
    play("before", true);
  }, [inView, started, play]);

  useEffect(() => {
    if (!auto || !started || state !== "before" || !done) return;
    timer.current = setTimeout(() => {
      setAuto(false);
      play("after", false);
    }, reduce ? 0 : 1800);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [auto, started, state, done, play, reduce]);

  useEffect(() => () => clear(), []);

  const pick = (which: "before" | "after") => {
    setAuto(false);
    play(which, false);
  };

  // Render the answer up to aChars.
  let budget = aChars;
  const rendered = scene.lines.map((line, li) => {
    if (budget <= 0) return null;
    const parts = line.map((p, pi) => {
      if (budget <= 0) return null;
      if (p.k === "cite") {
        budget -= 1;
        return (
          <sup
            key={pi}
            className={`ml-0.5 inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-full px-1 align-[2px] font-mono text-[9.5px] font-bold ${
              scene.sources.find((s) => s.id === p.src)?.you ? "bg-[#10b981]/20 text-[#5ee0ad]" : "bg-white/10 text-white/60"
            }`}
          >
            {p.t}
          </sup>
        );
      }
      const shown = p.t.slice(0, budget);
      budget -= p.t.length;
      if (p.k === "you")
        return (
          <span key={pi} className="rounded bg-[#10b981]/15 px-1 font-semibold text-[#6fe3b0] ring-1 ring-[#10b981]/40">
            {shown}
          </span>
        );
      if (p.k === "b")
        return (
          <span key={pi} className="font-semibold text-white">
            {shown}
          </span>
        );
      return <span key={pi}>{shown}</span>;
    });
    const isList = li > 0 && li < scene.lines.length - 1;
    return (
      <p key={li} className={isList ? "flex gap-2" : ""}>
        {isList && <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-white/40" />}
        <span>{parts}</span>
      </p>
    );
  });

  const typing = started && !done;

  return (
    <div ref={ref} className="w-full">
      {/* Toggle */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Show the answer before or after" className="inline-flex rounded-full border border-[#2a2a3e] bg-[#0d0d16] p-1">
          {(["before", "after"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={state === k}
              onClick={() => pick(k)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                state === k
                  ? k === "after"
                    ? "bg-[#10b981]/20 text-[#7af0bf]"
                    : "bg-[#B1130F]/25 text-[#ffb3b0]"
                  : "text-white/55 hover:text-white/85"
              }`}
            >
              {k === "before" ? "Not named" : "Named"}
            </button>
          ))}
        </div>
        <ExampleTag>Example, invented companies</ExampleTag>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
        {/* Header */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5 [scrollbar-width:none]">
          {ASSISTANTS.map((a, i) => (
            <span
              key={a}
              className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
                i === 0 ? "bg-white/10 text-white" : "text-white/40"
              }`}
            >
              {a}
            </span>
          ))}
        </div>

        <div className="space-y-4 p-4 sm:p-6">
          {/* Question */}
          <div className="flex justify-end">
            <div className="max-w-[88%] rounded-2xl rounded-br-sm bg-[#2a2a38] px-4 py-3 text-[14px] leading-relaxed text-white/90">
              {QUESTION.slice(0, Math.max(qChars, reduce ? QUESTION.length : 0)) || " "}
              {started && qChars < QUESTION.length && !reduce && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-white/70" />}
            </div>
          </div>

          {/* Answer */}
          <div className="min-h-[214px] space-y-2.5 text-[14px] leading-relaxed text-white/80 sm:min-h-[196px]">
            {aChars === 0 && started && qChars >= QUESTION.length && !reduce && (
              <div className="flex gap-1.5 pt-2" aria-label="Thinking">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-white/40" style={{ animationDelay: `${i * 120}ms` }} />
                ))}
              </div>
            )}
            {rendered}
            {typing && aChars > 0 && <span className="inline-block h-4 w-[7px] translate-y-[3px] bg-white/70" />}
          </div>

          {/* Sources */}
          <div className="border-t border-white/[0.06] pt-4">
            <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Sources it read</div>
            <div className="grid grid-cols-1 gap-2">
              {scene.sources.map((s) => {
                const lit = aChars >= (cites[s.id] ?? Infinity);
                return (
                  <div
                    key={`${state}-${s.id}`}
                    className={`flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border px-3 py-2.5 transition-all duration-500 ${
                      lit
                        ? s.you
                          ? "border-[#10b981]/45 bg-[#10b981]/[0.08] shadow-[0_0_24px_-8px_rgba(16,185,129,0.6)]"
                          : "border-white/15 bg-white/[0.04]"
                        : "border-white/[0.05] bg-transparent opacity-35"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                        s.you ? "bg-[#10b981]/25 text-[#7af0bf]" : "bg-white/10 text-white/60"
                      }`}
                    >
                      {s.id}
                    </span>
                    <span className="min-w-0 flex-1 basis-[180px]">
                      <span className="block truncate text-[12.5px] font-medium text-white/85">{s.title}</span>
                      <span className="block text-[11px] text-white/40">{s.site}</span>
                    </span>
                    {s.slot && lit && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-2.5 py-1 text-[11px] text-[#9df3cf]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
                        {slotById(s.slot).name} slot
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div
          className={`flex items-center gap-2.5 border-t px-4 py-3.5 transition-colors duration-500 sm:px-6 ${
            state === "after" ? "border-[#10b981]/25 bg-[#10b981]/[0.08]" : "border-[#B1130F]/20 bg-[#B1130F]/[0.08]"
          } ${done ? "opacity-100" : "opacity-0"}`}
          aria-live="polite"
        >
          {state === "after" ? (
            <>
              <svg className="h-4 w-4 shrink-0 text-[#34d399]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7" />
              </svg>
              <span className="text-[14px] font-semibold text-[#7af0bf]">{CLIENT}: named first, backed by 2 sources.</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4 shrink-0 text-[#ff5b56]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-[14px] font-semibold text-[#ff9d99]">{CLIENT}: not mentioned.</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
