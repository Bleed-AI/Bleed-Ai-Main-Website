import { customiseHref, itemsPassThroughMonthly, itemsSlotCount, money, slotById, TRIAL, type PackageItem } from "@/lib/slots";
import SlotChip from "./SlotChip";
import SlotMeter from "./SlotMeter";

/** A package (a preset slot board) with its slots, price, trial CTA and a customise link into the builder. */
export default function PackageCard({
  id,
  name,
  pitch,
  items,
  featured = false,
  trialOutcome,
}: {
  id: string;
  name: string;
  pitch: string;
  items: PackageItem[];
  featured?: boolean;
  trialOutcome?: string;
}) {
  const count = itemsSlotCount(items);
  const pass = itemsPassThroughMonthly(items);
  const perTarget = items.some((it) => slotById(it.slot).passThrough?.unit === "target");
  const trialHref = trialOutcome ? `${TRIAL.href}?outcome=${trialOutcome}&package=${id}` : `${TRIAL.href}?package=${id}`;
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${
        featured
          ? "border-[#B1130F]/60 bg-[linear-gradient(165deg,#1a0d10,#0d0d16_55%)] shadow-[0_0_0_1px_rgba(177,19,15,0.25),0_30px_80px_-30px_rgba(177,19,15,0.45)]"
          : "border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)]"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-[#B1130F] px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white">
          Most picked
        </span>
      )}
      <h3 className="font-display text-xl font-bold text-white">{name}</h3>
      <p className="mt-1.5 text-[14px] leading-snug text-[#9099b8]">{pitch}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((it) => (
          <SlotChip key={it.slot} id={it.slot} qty={it.qty} size="sm" />
        ))}
      </div>
      <div className="mt-6 border-t border-white/5 pt-5">
        <SlotMeter count={count} />
        {(pass > 0 || perTarget) && (
          <p className="mt-2 text-[11.5px] text-[#505570]">
            {pass > 0 ? `Plus ${money(pass)} a month in software at cost.` : ""}
            {perTarget ? " Postage at cost." : ""}
          </p>
        )}
      </div>
      <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
        <a
          href={trialHref}
          className="flex-1 rounded-full bg-[#B1130F] px-5 py-3 text-center text-[14px] font-semibold text-white btn-glow"
        >
          {TRIAL.label}
        </a>
        <a
          href={customiseHref(id)}
          className="flex-1 rounded-full border border-[#2a2a3e] px-5 py-3 text-center text-[14px] font-semibold text-white/90 hover:border-white/30"
        >
          Customise
        </a>
      </div>
    </div>
  );
}
