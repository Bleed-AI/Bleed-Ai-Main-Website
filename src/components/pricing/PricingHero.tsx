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
  SWAP_LINE,
  TRIAL,
  unitLabel,
} from "@/lib/slots";
import BoardBoxes from "./BoardBoxes";
import { prefersReducedMotion, useCountUp } from "./useCountUp";

const DEMO_TO = FREE_EVERY * 2;

/** Hero: the whole pricing idea in one look. A plan fills to 8 services on load and settles. */
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
    <section className="sec relative !pt-32 sm:!pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(177,19,15,0.22),transparent_70%)]" />
      <div className="sec-inner grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="sec-label">Pricing</div>
          <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[58px]">
            {money(SLOT_PRICE)} a service.
            <br />
            <em className="hd-em pr-1">Every 4th one free.</em>
          </h1>
          <p className="mt-5 max-w-[520px] text-[16.5px] leading-relaxed text-[#9099b8]">
            {SWAP_LINE} Each service is a full marketing service on its own, done for you every month. Buy 3 and the 4th is on us.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-[13px]">
            {[PRICE_LINE, "Month to month", `Minimum ${unitLabel(MIN_SLOTS)}`, "Swap any service, any month"].map((t) => (
              <li key={t} className="flex items-center gap-1.5 rounded-full border border-[#2a2a3e] bg-[#141420]/80 px-3 py-1.5 text-[#c3c8dc]">
                <span className="text-[#34d399]">&#10003;</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={TRIAL.href} className="btn-glow rounded-full bg-[#B1130F] px-7 py-3.5 text-center text-[15px] font-semibold text-white">
              {TRIAL.label}
            </a>
            <a
              href="#builder"
              className="rounded-full border border-[#2a2a3e] px-7 py-3.5 text-center text-[15px] font-semibold text-white/90 transition-colors hover:border-white/30"
            >
              Build your own
            </a>
          </div>
        </div>

        <div className="relative rounded-3xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-6 shadow-[0_40px_120px_-40px_rgba(177,19,15,0.45)] sm:p-8">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#505570]">
            <span>A plan of {unitLabel(n)}</span>
            <span className={free ? "text-[#34d399]" : ""}>{free} free</span>
          </div>
          <div className="mt-5">
            <BoardBoxes count={n} size="lg" minCells={DEMO_TO} />
          </div>
          <div className="mt-7 flex items-baseline gap-2">
            <span key={free} className={`font-display text-5xl font-bold text-white ${free ? "pr-glow" : ""}`}>
              {money(price)}
            </span>
            <span className="text-[14px] text-[#9099b8]">a month</span>
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
      </div>
    </section>
  );
}
