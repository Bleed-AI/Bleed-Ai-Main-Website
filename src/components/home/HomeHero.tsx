import { TRIAL, SWAP_LINE } from "@/lib/slots";
import SlotBoard from "./SlotBoard";

const CHANNELS = ["ChatGPT's answers", "LinkedIn", "their inbox", "your website"];

const BADGES = [
  { icon: "/images/upwork-icon.svg", name: "Upwork", href: null },
  { icon: "/images/clutch-icon.svg", name: "Clutch", href: "https://clutch.co/profile/bleed-ai" },
  { icon: "/images/techr-icon.svg", name: "TechReviewer", href: "https://techreviewer.co/companies/bleed-ai" },
];

/** Homepage hero for the slot model (2026-10-30). The old cold email hero is HeroV2 (untouched). */
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-14 xl:gap-20">
          <div className="text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B1130F]/40 bg-[#B1130F]/10 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B1130F] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B1130F]" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-white/90">For B2B companies that already sell</span>
            </div>

            <h1 className="font-display mb-5 text-[2.6rem] font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]">
              The last marketing team <em className="hd-em pr-1">you&apos;ll ever hire.</em>
            </h1>

            <p className="mb-5 max-w-xl text-[17px] leading-relaxed text-white/70 lg:text-lg">
              One team running every channel your buyers use:{" "}
              {CHANNELS.map((c, i) => (
                <span key={c}>
                  <span className="font-medium text-white">{c}</span>
                  {i < CHANNELS.length - 2 ? ", " : i === CHANNELS.length - 2 ? " and " : ""}
                </span>
              ))}
              . Every month we move your slots to whatever is working.
            </p>

            <div className="mb-8 inline-flex max-w-full items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.6" className="shrink-0" aria-hidden="true">
                <path d="M4 7h13l-3-3M20 17H7l3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[13.5px] font-medium text-[#cfd4e8]">{SWAP_LINE}</span>
            </div>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={TRIAL.href}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#B1130F] px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(177,19,15,0.5)]"
              >
                <span className="relative z-10">{TRIAL.label}</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/pricing/#builder"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2a2a3e] px-7 py-3.5 text-base font-semibold text-white/90 transition-colors hover:border-white/30"
              >
                Build your board
              </a>
            </div>
            <p className="-mt-4 mb-8 text-[13px] text-[#9099b8]">
              {TRIAL.length} free on {TRIAL.slots}, picked to fit you.{" "}
              <a href="/pricing/" className="font-medium text-white/80 underline decoration-white/25 underline-offset-4 hover:text-white">
                See pricing
              </a>
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              {BADGES.map((p) => {
                const inner = (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt={`${p.name} logo`} className="h-5 w-5 shrink-0" />
                    <span className="text-xs font-medium text-white/80">
                      {p.name} / <span className="text-white">5.0</span>
                    </span>
                    <span className="text-sm leading-none text-[#ffb800]">★</span>
                  </>
                );
                return p.href ? (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={p.name} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <SlotBoard />
          </div>
        </div>
      </div>
    </section>
  );
}
