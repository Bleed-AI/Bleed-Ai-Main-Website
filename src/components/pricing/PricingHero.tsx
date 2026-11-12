"use client";

import { useEffect, useState } from "react";
import {
  FREE_EVERY,
  freeSlots,
  MIN_SLOTS,
  money,
  PRICE_LINE,
  priceFor,
  SLOT_PRICE,
  BOOK,
  SWAP_LINE,
  TRIAL,
  unitLabel,
} from "@/lib/slots";
import BoardBoxes from "./BoardBoxes";
import { BookButton, CropMarks, FreeWeeksLink, SlugLine } from "@/components/print/Print";
import { prefersReducedMotion, useCountUp } from "./useCountUp";

const DEMO_TO = FREE_EVERY * 2;

/** Hero: the whole pricing idea in one look. A plan fills to 8 services on load and settles.
 *  2026-11-12: print proof (slug line, crop marks around the plan sheet, no glow), and the sub says what a service IS. */
export default function PricingHero() {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setN(DEMO_TO);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= DEMO_TO) window.clearInterval(id);
    }, 330);
    return () => window.clearInterval(id);
  }, []);

  const price = useCountUp(priceFor(n), 300);
  const free = freeSlots(n);

  return (
    <section className="sec relative overflow-hidden !pt-28 sm:!pt-36">
      <div aria-hidden="true" className="ink-gradient" />
      <div aria-hidden="true" className="grain-layer" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#07070d]" />
      <div className="sec-inner relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SlugLine parts={["02", "Pricing", `${money(SLOT_PRICE)} a service`]} className="mb-6" />
          <h1 className="font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.012em] text-white sm:text-[58px]">
            {money(SLOT_PRICE)} a service.
            <br />
            <em className="hd-em pr-1">Every 4th one free.</em>
          </h1>
          <p className="mt-5 max-w-[540px] text-[16.5px] leading-relaxed text-[#c3c6d4]">
            A service is one piece of marketing we do for you every month, like 8 LinkedIn posts, 2 articles on your site or 1,500 outreach emails
            with every reply handled. Pick the ones you want, from {unitLabel(MIN_SLOTS)}. Buy 3 and the 4th is on us.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono-bai text-[11.5px] uppercase tracking-[0.08em] text-[#9a9fb8]">
            {[PRICE_LINE, "Month to month", `Minimum ${unitLabel(MIN_SLOTS)}`, "Swap any service, any month"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-[5px] w-[5px] bg-[#ff5a52]" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <BookButton />
            <a
              href="#builder"
              className="text-center text-[14.5px] font-semibold text-white/85 underline decoration-white/25 underline-offset-4 hover:text-white sm:text-left"
            >
              Build your own plan
            </a>
          </div>
          <FreeWeeksLink className="mt-4 max-w-[540px]" />
        </div>

        <CropMarks className="mx-3 sm:mx-4 lg:mx-0">
        <div className="relative rounded-[4px] border border-[rgba(234,238,248,0.14)] bg-[linear-gradient(180deg,rgba(18,18,28,0.94),rgba(11,11,20,0.96))] p-6 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] sm:p-8">
          <div className="flex items-center justify-between font-mono-bai text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#9a9fb8]">
            <span>A plan of {unitLabel(n)}</span>
            <span className={free ? "text-[#34d399]" : ""}>{free} free</span>
          </div>
          <div className="mt-5">
            <BoardBoxes count={n} size="lg" minCells={DEMO_TO} />
          </div>
          <div className="mt-7 flex items-baseline gap-2">
            <span key={free} className="font-display text-5xl font-semibold tabular-nums text-white">
              {money(price)}
            </span>
            <span className="font-serif-it text-[19px] text-[#ff5a52]">a month</span>
          </div>
          <p className="mt-2 text-[13px] text-[#9099b8]">
            {unitLabel(n)}, you pay for {n - free}. {PRICE_LINE}.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-5 text-[12.5px]">
            <div>
              <div className="text-[#505570]">{unitLabel(3)}</div>
              <div className="font-semibold text-white">{money(priceFor(3))}</div>
            </div>
            <div>
              <div className="text-[#505570]">{unitLabel(4)}, 1 free</div>
              <div className="font-semibold text-[#34d399]">{money(priceFor(4))}, same price</div>
            </div>
          </div>
        </div>
        </CropMarks>
      </div>
    </section>
  );
}
