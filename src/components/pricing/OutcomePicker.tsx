"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import PackageCard from "@/components/slots/PackageCard";
import {
  HYBRID_PACKAGE,
  itemsSlotCount,
  money,
  OUTCOMES,
  packageById,
  packagesFor,
  priceFor,
  type OutcomeId,
} from "@/lib/slots";
import SpecialistCard from "./SpecialistCard";

const ICONS: Record<OutcomeId, ReactNode> = {
  shortlisted: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M4 5h16v11H9l-5 4V5z" strokeLinejoin="round" />
      <path d="M12 8.2l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3.9-1.9z" fill="currentColor" stroke="none" />
    </svg>
  ),
  "linkedin-authority": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <path d="M8 10.5V16M8 7.8v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6S16 11.4 16 13v3" strokeLinecap="round" />
    </svg>
  ),
  outbound: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
      <path d="M9 14.5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "inbound-engine": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M3 8h18M9 21h6M12 17v4" strokeLinecap="round" />
      <path d="M12 10.5v4M10.2 12.7l1.8 1.8 1.8-1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function fromPrice(o: OutcomeId): number {
  const counts = packagesFor(o).map((p) => itemsSlotCount(p.items));
  return priceFor(Math.min(...counts));
}

/** Pick an outcome first (#42): outcome cards, then that outcome's packages, then build your own. */
export default function OutcomePicker() {
  const [sel, setSel] = useState<OutcomeId | null>("shortlisted");
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const o = q.get("outcome");
    const pkg = q.get("package");
    if (o && OUTCOMES.some((x) => x.id === o)) setSel(o as OutcomeId);
    else if (pkg) {
      const p = packageById(pkg);
      if (p) setSel(p.outcome);
    }
  }, []);

  function choose(id: OutcomeId) {
    setSel(id);
    const url = new URL(window.location.href);
    url.searchParams.set("outcome", id);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    window.setTimeout(() => {
      const el = panelRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top > window.innerHeight * 0.7) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  const pkgs = sel ? packagesFor(sel) : [];
  const outcome = sel ? OUTCOMES.find((o) => o.id === sel)! : null;
  const hybridCount = itemsSlotCount(HYBRID_PACKAGE.items);

  return (
    <section id="outcomes" className="sec">
      <div className="sec-inner">
        <div className="sec-label">Step 1</div>
        <h2 className="sec-h2">
          What do you want <em>more of?</em>
        </h2>
        <p className="sec-sub !mb-10">Pick an outcome. We show you the boards that get it, and you can change any slot before you start.</p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-label="Outcomes">
          {OUTCOMES.map((o) => {
            const on = sel === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => choose(o.id)}
                className={`group relative flex flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
                  on
                    ? "border-[#B1130F] bg-[linear-gradient(165deg,#22100f,#0d0d16_70%)] shadow-[0_0_0_1px_rgba(177,19,15,0.35),0_24px_60px_-24px_rgba(177,19,15,0.6)]"
                    : "border-[#1f1f30] bg-[#141420]/70 hover:-translate-y-0.5 hover:border-[#2a2a3e]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                      on ? "bg-[#B1130F] text-white" : "bg-[#1a1a28] text-[#ff6b67]"
                    }`}
                  >
                    {ICONS[o.id]}
                  </span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                      on ? "border-[#B1130F] bg-[#B1130F]" : "border-[#2a2a3e]"
                    }`}
                  >
                    {on && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                </div>
                <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#505570]">{o.name}</span>
                <span className="mt-1 font-display text-[18px] font-bold leading-snug text-white">{o.title}</span>
                <span className="mt-2 text-[13px] leading-snug text-[#9099b8]">{o.summary}</span>
                <span className="mt-auto pt-4 text-[12.5px] text-[#c3c8dc]">
                  From <span className="font-semibold text-white">{money(fromPrice(o.id))}</span> a month
                </span>
              </button>
            );
          })}
        </div>

        <div ref={panelRef} className="scroll-mt-24">
          {outcome ? (
            <div key={outcome.id} className="pr-rise mt-10">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="sec-label !mb-1">Step 2</div>
                  <h3 className="font-display text-2xl font-bold text-white">Boards for {outcome.title.toLowerCase()}</h3>
                </div>
                <a href={outcome.href} className="text-[13.5px] font-semibold text-[#ff6b67] hover:text-white">
                  How {outcome.name} works &rarr;
                </a>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pkgs.map((p, i) => (
                  <div key={p.id} className="pr-rise" style={{ animationDelay: `${i * 80}ms` }}>
                    <PackageCard id={p.id} name={p.name} pitch={p.pitch} items={p.items} featured={p.featured} trialOutcome={outcome.id} />
                  </div>
                ))}
                <a
                  href="#builder"
                  className="pr-rise group flex min-h-[220px] flex-col justify-between rounded-2xl border border-dashed border-[#2a2a3e] p-6 transition-colors hover:border-[#B1130F]/60 sm:p-7"
                  style={{ animationDelay: `${pkgs.length * 80}ms` }}
                >
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2a2a3e] text-2xl text-[#ff6b67] transition-transform group-hover:rotate-90">
                      +
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold text-white">Build your own</h3>
                    <p className="mt-1.5 text-[14px] leading-snug text-[#9099b8]">
                      Pick any slots from the full menu. Mix LinkedIn, your website and outbound on one board.
                    </p>
                  </div>
                  <span className="mt-6 text-[14px] font-semibold text-white">Open the builder &darr;</span>
                </a>
              </div>
              {outcome.id === "outbound" && (
                <div className="pr-rise mt-6" style={{ animationDelay: "240ms" }}>
                  <SpecialistCard />
                </div>
              )}
            </div>
          ) : (
            <p className="mt-6 text-center text-[13.5px] text-[#505570]">Pick one above to see its boards.</p>
          )}
        </div>

        <div className="mt-14 grid gap-6 rounded-3xl border border-[#1f1f30] bg-[#0b0b14]/60 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-block rounded-full bg-[#10b981]/12 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#34d399]">
              The mix we suggest first
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-[28px]">Want more than one outcome?</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-[#9099b8]">
              Most companies need to be found by the buyers already searching and to reach the ones who are not searching yet. This board does both, at{" "}
              {hybridCount} slots for {money(priceFor(hybridCount))} a month, with the 4th slot free.
            </p>
          </div>
          <PackageCard id={HYBRID_PACKAGE.id} name={HYBRID_PACKAGE.name} pitch={HYBRID_PACKAGE.pitch} items={HYBRID_PACKAGE.items} />
        </div>
      </div>
    </section>
  );
}
