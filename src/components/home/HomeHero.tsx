import { FREE_EVERY, MIN_SLOTS, money, priceFor, SLOT_PRICE, SLOTS } from "@/lib/slots";
import { BookButton, FreeWeeksLink, SlugLine } from "@/components/print/Print";
import HeroShader from "./HeroShader";
import ProofSheet from "./ProofSheet";

const BADGES = [
  { icon: "/images/clutch-icon.svg", name: "Clutch", href: "https://clutch.co/profile/bleed-ai" },
  { icon: "/images/upwork-icon.svg", name: "Upwork", href: null },
  { icon: "/images/techr-icon.svg", name: "TechReviewer", href: "https://techreviewer.co/companies/bleed-ai" },
];

/**
 * Homepage hero (rebuilt 2026-11-12, print proof direction + the five second test). A first-time visitor must get,
 * in order: what this is (a done-for-you marketing team), who it is for (B2B companies), what they get (named
 * services in buyer words), how it is priced ($495 a service, every 4th free, from 2 services, month to month) and
 * what to do next (one primary button: book a call). The right side SHOWS an example month instead of describing it.
 * Previous version (the SlotBoard sparkline board) is in git history before this date.
 */
export default function HomeHero() {
  return (
    <section className="relative -mt-14 overflow-hidden pb-16 pt-10 sm:-mt-[58px] sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
      <div aria-hidden="true" className="relative h-14 sm:h-[58px]" />
      <div aria-hidden="true" className="ink-gradient" />
      <HeroShader />
      <div aria-hidden="true" className="grain-layer" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#07070d]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 xl:gap-20">
          <div className="text-white">
            <SlugLine parts={["01", "Done-for-you marketing", "For B2B companies"]} className="mb-6" />

            <h1 className="font-display mb-5 text-[2.55rem] font-semibold leading-[1.02] tracking-[-0.012em] sm:text-6xl lg:text-[4.1rem] xl:text-[4.45rem]">
              The last marketing team <em className="hd-em pr-1">you&apos;ll ever hire.</em>
            </h1>

            <p className="mb-7 max-w-xl text-[17px] leading-relaxed text-[#c3c6d4] lg:text-[18px]">
              The done-for-you marketing team for B2B companies. We get you <span className="font-semibold text-white">recommended by ChatGPT</span>,
              post on <span className="font-semibold text-white">LinkedIn</span> every week, publish <span className="font-semibold text-white">articles</span>{" "}
              that get found, rebuild your <span className="font-semibold text-white">website</span> and book meetings through{" "}
              <span className="font-semibold text-white">email outreach</span>. Pick from {SLOTS.length} services. We do the work every month, you approve it.
            </p>

            {/* the price, said plainly */}
            <div className="mb-8 flex max-w-xl flex-wrap items-baseline gap-x-4 gap-y-2 border-y border-white/10 py-4">
              <span className="whitespace-nowrap">
                <span className="font-display text-[34px] font-semibold leading-none tracking-[-0.02em] text-white">{money(SLOT_PRICE)}</span>{" "}
                <span className="font-serif-it text-[19px] text-[#ff5a52]">a month, per service</span>
              </span>
              <span className="font-mono-bai text-[12px] uppercase leading-relaxed tracking-[0.08em] text-[#9a9fb8]">
                Every {FREE_EVERY}th free &middot; From {MIN_SLOTS} services ({money(priceFor(MIN_SLOTS))}) &middot; No contract
              </span>
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <BookButton className="text-base sm:px-8" />
              <a href="/pricing/" className="text-center text-[14.5px] font-semibold text-white/85 underline decoration-white/25 underline-offset-4 hover:text-white sm:text-left">
                See all {SLOTS.length} services and prices
              </a>
            </div>
            <FreeWeeksLink className="mb-8 max-w-xl" />

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              <span className="font-mono-bai text-[11px] uppercase tracking-[0.14em] text-[#6f7590]">Rated 5.0 on</span>
              {BADGES.map((p) => {
                const inner = (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt="" className="h-[18px] w-[18px] shrink-0" />
                    <span className="text-[13px] font-medium text-white/85">{p.name}</span>
                    <span className="text-[12px] leading-none text-[#ffb800]" aria-label="5 stars">
                      ★★★★★
                    </span>
                  </>
                );
                return p.href ? (
                  <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-80">
                    {inner}
                  </a>
                ) : (
                  <span key={p.name} className="inline-flex items-center gap-2">
                    {inner}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px] px-3 sm:px-4 lg:max-w-none lg:px-0">
            <ProofSheet />
          </div>
        </div>
      </div>
    </section>
  );
}
