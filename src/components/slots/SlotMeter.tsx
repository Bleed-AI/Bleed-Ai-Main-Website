import { FREE_EVERY, freeSlots, money, PRICE_LINE, priceFor, SLOT_PRICE, unitLabel } from "@/lib/slots";

/**
 * Service boxes with every 4th one marked FREE, plus the monthly price.
 * Shared by plan cards, the builder and package pages (2026-10-30). Public word: "service", never "slot".
 */
export default function SlotMeter({
  count,
  showPrice = true,
  compact = false,
}: {
  count: number;
  showPrice?: boolean;
  compact?: boolean;
}) {
  const boxes = Array.from({ length: count }, (_, i) => (i + 1) % FREE_EVERY === 0);
  const free = freeSlots(count);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1.5" aria-label={`${unitLabel(count)}, ${free} free`}>
        {boxes.map((isFree, i) => (
          <span
            key={i}
            className={`flex items-center justify-center rounded-md border text-[9px] font-bold uppercase tracking-wide ${
              compact ? "h-5 w-7" : "h-7 w-10"
            } ${
              isFree
                ? "border-[#10b981]/60 bg-[#10b981]/15 text-[#34d399]"
                : "border-[#B1130F]/50 bg-[#B1130F]/20 text-transparent"
            }`}
          >
            {isFree ? "Free" : "."}
          </span>
        ))}
      </div>
      {showPrice && (
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-display text-2xl font-bold text-white">{money(priceFor(count))}</span>
          <span className="text-[13px] text-[#9099b8]">a month</span>
          <span className="text-[12px] text-[#505570]">
            {unitLabel(count)} at {money(SLOT_PRICE)}
            {free > 0 ? `, ${free} free` : ""}
          </span>
        </div>
      )}
      {showPrice && !compact && <span className="text-[11.5px] text-[#9099b8]">{PRICE_LINE}</span>}
    </div>
  );
}
