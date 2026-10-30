import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TrialInline from "@/components/start/TrialInline";
import { FREE_EVERY, MIN_SLOTS, PRICE_LINE, SLOT_PRICE, SWAP_LINE, TRIAL, money, priceFor, unitLabel } from "@/lib/slots";

export const metadata: Metadata = buildMeta({
  title: "Start a free trial",
  description: "A free 2 week trial on 1 to 2 services for B2B companies that already sell. Pick what you want to try, we run it, and you see the work before you pay.",
  path: "/trial",
  noindex: false,
});

const steps = [
  { t: "Apply", d: "Pick 1 or 2 services and leave your details. One minute." },
  { t: "15 minute call", d: "We agree what each service should do for you, and what good looks like at day 14." },
  { t: "We start your services", d: "Research, drafts for your approval, then the work goes live. You approve, we do the rest." },
  { t: "Readout at 2 weeks", d: "What each service produced, what we would keep and what we would swap." },
  { t: "Pick your plan", d: `Keep going at the founding price, ${money(SLOT_PRICE)} a service, every ${FREE_EVERY}th service free. Or walk away.` },
];

const whoFor = [
  "B2B companies: you sell to other businesses",
  "Already selling, with real customers who pay you",
  "Ready to keep what works after the 2 weeks",
];
const weNeed = [
  "A 15 minute call at the start",
  "Quick approvals on drafts",
  "Someone to take the conversations we start",
];

function Dot({ tone }: { tone: "good" | "muted" }) {
  return (
    <span
      className={`mt-[7px] h-[7px] w-[7px] flex-shrink-0 rounded-full ${tone === "good" ? "bg-[#10b981] shadow-[0_0_8px_#10b981]" : "bg-[#4a4f68]"}`}
    />
  );
}

export default function TrialPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />

      {/* Hero */}
      <section className="px-4 pt-28 pb-10 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="sec-label">Free trial</div>
          <h1 className="font-display text-[36px] font-bold leading-[1.08] text-white sm:text-6xl">
            See the work <em className="hd-em">before you pay us.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[#c3c8dc]">
            Free for {TRIAL.length} on {TRIAL.slots}, for B2B companies that already sell. Pick what you want to try, we run it, and at day 14 you decide what stays.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[12.5px]">
            <span className="rounded-full border border-[#2a2a3e] bg-[#141420] px-3 py-1.5 text-white/85">{TRIAL.length}, free</span>
            <span className="rounded-full border border-[#2a2a3e] bg-[#141420] px-3 py-1.5 text-white/85">{TRIAL.slots}</span>
            <span className="rounded-full border border-[#2a2a3e] bg-[#141420] px-3 py-1.5 text-white/85">You approve everything</span>
          </div>
          <p className="mt-5 text-[13px] text-[#9099b8]">
            No customers yet?{" "}
            <a href="/pricing/#builder" className="font-semibold text-[#ff6b67] underline decoration-[#ff6b67]/40 underline-offset-4 hover:text-[#ff9d99]">
              Start with {unitLabel(MIN_SLOTS)} at {money(priceFor(MIN_SLOTS))} a month
            </a>
          </p>
        </div>
      </section>

      <TrialInline />

      {/* What happens */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8 text-center">
            <div className="sec-label">What happens</div>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">From apply to your plan in five steps</h2>
          </Reveal>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 80} className="relative min-w-0 rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold ${
                      i === steps.length - 1 ? "bg-[#10b981] text-[#07070d]" : "bg-[#B1130F] text-white"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && <span className="h-px flex-1 bg-gradient-to-r from-[#B1130F]/60 to-transparent" />}
                </div>
                <h3 className="font-display text-[17px] font-bold text-white">{s.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-snug text-[#9099b8]">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it is for + the paid path */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <Reveal className="min-w-0 rounded-2xl border border-[#1f1f30] bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-7">
            <h3 className="mb-4 text-[15px] font-semibold text-white">Who the free trial is for</h3>
            <ul className="flex flex-col gap-3">
              {whoFor.map((it) => (
                <li key={it} className="flex items-start gap-3 text-[14px] leading-snug text-white/75">
                  <Dot tone="good" />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="min-w-0 rounded-2xl border border-[#1f1f30] bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-7">
            <h3 className="mb-4 text-[15px] font-semibold text-white">What we need from you</h3>
            <ul className="flex flex-col gap-3">
              {weNeed.map((it) => (
                <li key={it} className="flex items-start gap-3 text-[14px] leading-snug text-white/75">
                  <Dot tone="muted" />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={160} className="min-w-0 rounded-2xl border border-[#B1130F]/50 bg-[linear-gradient(165deg,#1a0d10,#0d0d16_60%)] p-7">
            <h3 className="text-[15px] font-semibold text-white">Not a fit for a free trial yet?</h3>
            <p className="mt-2 text-[14px] leading-snug text-white/75">
              Still building your first customers? Start with {unitLabel(MIN_SLOTS)} at {money(priceFor(MIN_SLOTS))} a month, month to month. {SWAP_LINE}
            </p>
            <a
              href="/pricing/#builder"
              className="mt-5 inline-flex items-center justify-center rounded-full border border-[#B1130F]/70 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#B1130F]/20"
            >
              Build your own plan &rarr;
            </a>
            <p className="mt-3 text-[11.5px] text-[#9099b8]">{PRICE_LINE}.</p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
