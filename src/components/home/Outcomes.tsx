"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { OUTCOMES, type OutcomeId } from "@/lib/slots";
import { useInView, useReducedMotion, useTypewriter } from "./useHomeMotion";

/* Each outcome card carries a tiny live visual of the work. All content is an invented example. */

function ExampleTag() {
  return (
    <span className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-black/40 px-2 py-[2px] text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#9099b8]">
      Example
    </span>
  );
}

function AiAnswer({ go, reduce }: { go: boolean; reduce: boolean }) {
  const name = "Northwind Audit";
  const full = `For a mid-size shipper, start with ${name}. They publish their recovery numbers and focus on carriers like yours.`;
  const typed = useTypewriter(full, go, 24, reduce);
  const at = full.indexOf(name);
  const before = typed.slice(0, Math.min(typed.length, at));
  const hit = typed.length > at ? typed.slice(at, Math.min(typed.length, at + name.length)) : "";
  const after = typed.length > at + name.length ? typed.slice(at + name.length) : "";
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-4 py-4">
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#2a2a3e] px-3 py-2 text-[12px] text-white/90">
        Who should we hire for freight invoice audits?
      </div>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">AI</span>
        <p className="min-h-[54px] text-[12px] leading-relaxed text-[#c3c8dc]">
          {before}
          {hit && <span className="rounded bg-[#10b981]/20 px-0.5 font-semibold text-[#34d399]">{hit}</span>}
          {after}
          {typed.length < full.length && <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 animate-pulse bg-white/70" />}
        </p>
      </div>
    </div>
  );
}

function LinkedInPost({ go, reduce }: { go: boolean; reduce: boolean }) {
  const [n, setN] = useState(0);
  const [comment, setComment] = useState(false);
  useEffect(() => {
    if (!go) return;
    if (reduce) {
      setN(148);
      setComment(true);
      return;
    }
    let v = 0;
    const id = setInterval(() => {
      v += 7;
      setN(Math.min(v, 148));
      if (v >= 148) clearInterval(id);
    }, 45);
    const t = setTimeout(() => setComment(true), 1500);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, [go, reduce]);
  return (
    <div className="flex h-full flex-col justify-center px-4 py-4">
      <div className="rounded-xl border border-white/[0.08] bg-[#0f0f19] p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#4f8cff] to-[#2a4fb8] text-[10px] font-bold text-white">DR</span>
          <div className="leading-tight">
            <div className="text-[11.5px] font-semibold text-white">Dana Reyes</div>
            <div className="text-[10px] text-[#7d84a3]">Founder, Northwind</div>
          </div>
        </div>
        <p className="mt-2 text-[12px] leading-snug text-[#c3c8dc]">We checked 4,000 freight invoices. 1 in 9 was wrong. Here is the checklist we use.</p>
        <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-2 text-[10.5px] text-[#9099b8]">
          <span className="flex items-center gap-1">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#4f8cff] text-[7px] text-white">+</span>
            {n} reactions
          </span>
          <span>{Math.round(n / 6)} comments</span>
        </div>
      </div>
      <div className={`mt-2 flex items-start gap-2 transition-all duration-500 ${comment ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3a3a52] text-[8px] font-bold text-white">JK</span>
        <span className="rounded-xl rounded-tl-md bg-[#1d1d2c] px-2.5 py-1.5 text-[11px] text-white/85">Can you send me the checklist?</span>
      </div>
    </div>
  );
}

function ReplyThread({ go, reduce }: { go: boolean; reduce: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (reduce) {
      setStep(2);
      return;
    }
    const a = setTimeout(() => setStep(1), 500);
    const b = setTimeout(() => setStep(2), 2000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [go, reduce]);
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-4 py-4">
      <div className="rounded-xl border border-white/[0.08] bg-[#0f0f19] px-3 py-2">
        <div className="text-[10px] text-[#7d84a3]">You to Sam at Brightline</div>
        <div className="truncate text-[12px] font-semibold text-white">An idea for your Q1 hiring push</div>
      </div>
      {step === 1 && (
        <div className="flex items-center gap-1 pl-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9099b8]" style={{ animationDelay: `${i * 120}ms` }} />
          ))}
        </div>
      )}
      <div className={`rounded-xl border border-[#10b981]/40 bg-[#10b981]/[0.07] px-3 py-2 transition-all duration-500 ${step === 2 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#7d84a3]">Sam replied</span>
          <span className="rounded-full bg-[#10b981] px-1.5 py-[1px] text-[9px] font-bold uppercase text-[#04150e]">Interested</span>
        </div>
        <div className="mt-0.5 text-[12px] text-white">This is timely. Are you free Thursday at 10?</div>
      </div>
    </div>
  );
}

function LeadForm({ go, reduce }: { go: boolean; reduce: boolean }) {
  const email = "maria@acmefoods.com";
  const typed = useTypewriter(email, go, 55, reduce);
  const done = typed.length >= email.length;
  const [toast, setToast] = useState(false);
  useEffect(() => {
    if (!done) return;
    if (reduce) {
      setToast(true);
      return;
    }
    const t = setTimeout(() => setToast(true), 500);
    return () => clearTimeout(t);
  }, [done, reduce]);
  return (
    <div className="relative flex h-full flex-col justify-center px-4 py-4">
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0f0f19]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          <span className="ml-1.5 truncate text-[9.5px] text-[#7d84a3]">yoursite.com/savings-calculator</span>
        </div>
        <div className="p-3">
          <div className="text-[11.5px] font-semibold text-white">Get your full savings report</div>
          <div className="mt-2 flex gap-1.5">
            <div className="min-w-0 flex-1 truncate rounded-md border border-white/10 bg-black/30 px-2 py-1.5 text-[11px] text-white/85">
              {typed || <span className="text-white/30">Work email</span>}
            </div>
            <span className={`shrink-0 rounded-md px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors ${done ? "bg-[#B1130F]" : "bg-[#B1130F]/50"}`}>Send</span>
          </div>
        </div>
      </div>
      <div className={`mt-2 flex items-center gap-2 self-start rounded-full border border-[#10b981]/40 bg-[#0b1a14] px-2.5 py-1 text-[10.5px] font-semibold text-[#34d399] transition-all duration-500 ${toast ? "opacity-100" : "opacity-0"}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
        New lead: Acme Foods, Head of Ops
      </div>
    </div>
  );
}

const VISUAL: Record<OutcomeId, (p: { go: boolean; reduce: boolean }) => ReactNode> = {
  shortlisted: (p) => <AiAnswer {...p} />,
  "linkedin-authority": (p) => <LinkedInPost {...p} />,
  outbound: (p) => <ReplyThread {...p} />,
  "inbound-engine": (p) => <LeadForm {...p} />,
};

const ACCENT: Record<OutcomeId, string> = {
  shortlisted: "rgba(16,185,129,0.16)",
  "linkedin-authority": "rgba(79,140,255,0.18)",
  outbound: "rgba(177,19,15,0.22)",
  "inbound-engine": "rgba(167,139,250,0.16)",
};

export default function Outcomes() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const reduce = useReducedMotion();
  return (
    <section id="outcomes" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="sec-label">Pick the outcome</Reveal>
        <Reveal as="h2" className="font-display mb-4 max-w-4xl text-[32px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px]">
          Four results. <em className="hd-em">One team</em> behind all of them.
        </Reveal>
        <Reveal as="p" className="mb-12 max-w-2xl text-[16px] leading-relaxed text-[#9099b8]" delay={60}>
          Start with the result you want most. Each one is a set of slots, and you can mix them, so you never have to juggle five agencies again.
        </Reveal>

        <div ref={ref} className="grid gap-5 md:grid-cols-2">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.id} delay={i * 70} className="h-full">
              <a
                href={o.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B1130F]/50"
              >
                <div className="relative h-[220px] border-b border-white/[0.05] pt-7" style={{ background: `radial-gradient(ellipse at 30% 0%, ${ACCENT[o.id]}, transparent 70%)` }}>
                  <ExampleTag />
                  {VISUAL[o.id]({ go: inView, reduce })}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff5a52]">{o.name}</span>
                  <h3 className="font-display mt-1.5 text-[22px] font-bold leading-tight text-white">{o.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#9099b8]">{o.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-semibold text-white">
                    See how it works
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
