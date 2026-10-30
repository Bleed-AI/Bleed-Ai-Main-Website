import Reveal from "@/components/Reveal";
import { FREE_EVERY, MIN_SLOTS, TRIAL, unitLabel } from "@/lib/slots";

/** Three steps: trial, pick a plan, swap monthly. Text only (round 2: fewer, cleaner visuals on the homepage). */
const STEPS = [
  {
    n: "1",
    title: "Try it free",
    body: `${TRIAL.length} on ${TRIAL.slots}, picked for what will work for you first. Posts, an article, an AI search check or a campaign, made for you to judge.`,
  },
  {
    n: "2",
    title: "Pick a plan",
    body: `Start with a ready-made plan or build your own from ${unitLabel(MIN_SLOTS)} up. Every ${FREE_EVERY}th service is free. Month to month, no contract.`,
  },
  {
    n: "3",
    title: "Swap any month",
    body: "Each service is a full service on its own. Your monthly report shows what each one did, and if one isn't pulling its weight, we swap it for another next month. Same team, same price.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="sec-label">How it works</Reveal>
        <Reveal as="h2" className="font-display mb-12 max-w-3xl text-[32px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px]">
          Three steps. <em className="hd-em">No juggling.</em>
        </Reveal>
        <div className="relative grid gap-5 md:grid-cols-3">
          <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-[48px] hidden h-px bg-gradient-to-r from-[#10b981]/40 via-[#B1130F]/50 to-[#10b981]/40 md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="relative h-full">
              <div className="flex h-full flex-col rounded-2xl border border-[#1f1f30] bg-[linear-gradient(170deg,#141420,#0b0b14)] p-6">
                <span className="font-display relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#B1130F]/50 bg-[#1a0d10] text-[18px] font-bold text-white shadow-[0_0_30px_rgba(177,19,15,0.35)]">
                  {s.n}
                </span>
                <h3 className="font-display mt-5 text-[21px] font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#9099b8]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
