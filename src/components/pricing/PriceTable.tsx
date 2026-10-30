import { FREE_EVERY, freeSlots, MIN_SLOTS, money, paidSlots, priceFor, unitLabel } from "@/lib/slots";

const SIZES = [2, 3, 4, 5, 6, 8];

/** "What your plan costs": a worked table generated from priceFor, free services marked. */
export default function PriceTable() {
  return (
    <section className="sec dark">
      <div className="sec-inner">
        <div className="sec-label">The maths</div>
        <h2 className="sec-h2">
          What your plan <em>costs</em>
        </h2>
        <p className="sec-sub !mb-10">
          Every {FREE_EVERY}th service is free, so a plan never costs more when it grows into its free service. Minimum {unitLabel(MIN_SLOTS)}.
        </p>

        <div className="overflow-hidden rounded-2xl border border-[#1f1f30]">
          <div className="hidden grid-cols-[190px_1fr_140px_150px] gap-4 border-b border-[#1f1f30] bg-[#0b0b14] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#505570] md:grid">
            <span>Services</span>
            <span>Your plan</span>
            <span>You pay for</span>
            <span className="text-right">A month</span>
          </div>
          {SIZES.map((n, ri) => {
            const free = freeSlots(n);
            const same = ri > 0 && priceFor(n) === priceFor(SIZES[ri - 1]);
            return (
              <div
                key={n}
                className={`grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6 md:grid-cols-[190px_1fr_140px_150px] ${
                  ri % 2 ? "bg-[#0b0b14]/50" : "bg-[#141420]/40"
                } ${ri < SIZES.length - 1 ? "border-b border-[#1f1f30]" : ""}`}
              >
                <span className="col-start-1 row-start-1 font-display text-[17px] font-bold text-white md:col-start-auto md:row-start-auto">
                  {unitLabel(n)}
                  {free > 0 && <span className="ml-2 text-[12px] font-semibold text-[#34d399]">{free} free</span>}
                </span>
                <span className="col-span-2 row-start-2 flex flex-wrap gap-1 md:col-span-1 md:row-start-auto">
                  {Array.from({ length: n }, (_, i) => {
                    const isFree = (i + 1) % FREE_EVERY === 0;
                    return (
                      <span
                        key={i}
                        className={`flex h-6 w-8 items-center justify-center rounded-md border text-[7.5px] font-bold uppercase ${
                          isFree
                            ? "border-[#10b981]/60 bg-[#10b981]/15 text-[#34d399]"
                            : "border-[#B1130F]/55 bg-[#B1130F]/20 text-transparent"
                        } ${(i + 1) % FREE_EVERY === 0 && i + 1 < n ? "mr-1.5" : ""}`}
                      >
                        {isFree ? "Free" : ""}
                      </span>
                    );
                  })}
                </span>
                <span className="hidden text-[13.5px] text-[#9099b8] md:block">{unitLabel(paidSlots(n))}</span>
                <span className="col-start-2 row-start-1 text-right md:col-start-auto md:row-start-auto">
                  <span className="font-display text-[19px] font-bold text-white">{money(priceFor(n))}</span>
                  {same && <span className="block text-[11px] font-semibold text-[#34d399]">same as {SIZES[ri - 1]}</span>}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-[12.5px] text-[#505570]">Some services need outside software or postage, like a LinkedIn automation seat. Those are added at cost and shown before you start.</p>
      </div>
    </section>
  );
}
