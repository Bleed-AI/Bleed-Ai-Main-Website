import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { OUTCOMES, type OutcomeId } from "@/lib/slots";

/*
 * The four packages as clean text cards (round 2, 2026-10-30). The realistic examples of the work live in
 * Demos.tsx, one per package, so this section stays light. Visitor words: package (outcome), service (slot).
 */

const ICON: Record<OutcomeId, ReactNode> = {
  shortlisted: (
    <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15z" strokeLinejoin="round" />
  ),
  "linkedin-authority": (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16M8 7.6v.1M11.5 16v-3.2a2.3 2.3 0 014.5 0V16M11.5 10.5V16" strokeLinecap="round" />
    </>
  ),
  outbound: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" strokeLinejoin="round" />
    </>
  ),
  "inbound-engine": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 8.5h18M8 13h3M8 16h6" strokeLinecap="round" />
    </>
  ),
};

export default function Outcomes() {
  return (
    <section id="outcomes" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="sec-label">Pick a package</Reveal>
        <Reveal as="h2" className="font-display mb-4 max-w-4xl text-[32px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px]">
          Four results. <em className="hd-em">One team</em> behind all of them.
        </Reveal>
        <Reveal as="p" className="mb-12 max-w-2xl text-[16px] leading-relaxed text-[#9099b8]" delay={60}>
          Start with the result you want most. Each package is a set of services, and you can mix them, so you never have to juggle five agencies again.
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.id} delay={i * 70} className="h-full">
              <a
                href={o.href}
                className="group flex h-full flex-col rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B1130F]/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#B1130F]/35 bg-[#B1130F]/10 text-[#ff5a52]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    {ICON[o.id]}
                  </svg>
                </span>
                <span className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff5a52]">{o.name} package</span>
                <h3 className="font-display mt-1.5 text-[21px] font-bold leading-tight text-white">{o.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#9099b8]">{o.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-semibold text-white">
                  See the package
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
