import Reveal from "@/components/Reveal";
import { FREE_EVERY, MIN_SLOTS, TRIAL } from "@/lib/slots";

/** Three steps: trial, pick your board, swap monthly. */
const STEPS = [
  {
    n: "1",
    title: "Try it free",
    body: `${TRIAL.length} on ${TRIAL.slots}, picked for what will work for you first. Posts, an article, an AI search check or a campaign, made for you to judge.`,
    visual: "trial",
  },
  {
    n: "2",
    title: "Pick your board",
    body: `Start with a package or build your own. At least ${MIN_SLOTS} slots, and every ${FREE_EVERY}th slot is free. Month to month, no contract.`,
    visual: "board",
  },
  {
    n: "3",
    title: "Swap every month",
    body: "Your monthly report shows what is working. Anything that has gone flat, we swap to something that is not. Same team, same price.",
    visual: "swap",
  },
] as const;

function StepVisual({ kind }: { kind: (typeof STEPS)[number]["visual"] }) {
  if (kind === "trial") {
    return (
      <div aria-hidden="true">
        <div className="flex items-center gap-1">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className="h-6 flex-1 rounded-[4px] bg-[#10b981]/25 ring-1 ring-[#10b981]/40" />
          ))}
        </div>
        <div className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#34d399]">{TRIAL.length} free</div>
      </div>
    );
  }
  if (kind === "board") {
    return (
      <div className="grid grid-cols-4 gap-1.5" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => (
          <span
            key={i}
            className={`flex h-6 items-center justify-center rounded-[5px] text-[8.5px] font-bold uppercase ${
              (i + 1) % FREE_EVERY === 0 ? "bg-[#10b981]/15 text-[#34d399] ring-1 ring-[#10b981]/50" : "bg-[#B1130F]/25 ring-1 ring-[#B1130F]/50"
            }`}
          >
            {(i + 1) % FREE_EVERY === 0 ? "Free" : ""}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="flex h-6 flex-1 items-center justify-center rounded-[5px] bg-[#f59e0b]/15 text-[9px] font-bold uppercase text-[#f5b544] ring-1 ring-[#f59e0b]/40">Flat</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.6">
        <path d="M4 7h13l-3-3M20 17H7l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="flex h-6 flex-1 items-center justify-center rounded-[5px] bg-[#10b981]/15 text-[9px] font-bold uppercase text-[#34d399] ring-1 ring-[#10b981]/50">Working</span>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="sec-label">How it works</Reveal>
        <Reveal as="h2" className="font-display mb-12 max-w-3xl text-[32px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px]">
          Three steps. <em className="hd-em">No juggling.</em>
        </Reveal>
        <div className="relative grid gap-5 md:grid-cols-3">
          <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-[42px] hidden h-px bg-gradient-to-r from-[#10b981]/40 via-[#B1130F]/50 to-[#10b981]/40 md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="relative h-full">
              <div className="flex h-full flex-col rounded-2xl border border-[#1f1f30] bg-[linear-gradient(170deg,#141420,#0b0b14)] p-6">
                <span className="font-display relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#B1130F]/50 bg-[#1a0d10] text-[18px] font-bold text-white shadow-[0_0_30px_rgba(177,19,15,0.35)]">
                  {s.n}
                </span>
                <h3 className="font-display mt-5 text-[21px] font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#9099b8]">{s.body}</p>
                <div className="mt-auto pt-6">
                  <StepVisual kind={s.visual} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
