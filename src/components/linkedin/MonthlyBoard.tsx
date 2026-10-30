import Reveal from "@/components/Reveal";
import SlotChip from "@/components/slots/SlotChip";
import { slotById, type PackageItem } from "@/lib/slots";

/** What arrives every month for a package: one card per slot, copy read from the config. */
export default function MonthlyBoard({ items }: { items: PackageItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((it, i) => {
        const s = slotById(it.slot);
        return (
          <Reveal
            key={it.slot}
            delay={i * 70}
            className="group relative flex flex-col rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-6 transition-colors hover:border-[#B1130F]/40"
          >
            <span className="font-mono text-[11px] text-[#ff8a86]">0{i + 1}</span>
            <h3 className="mt-2 font-display text-[19px] font-bold leading-snug text-white">{s.title}</h3>
            <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-[#9099b8]">{s.monthly}.</p>
            <div className="mt-4">
              <SlotChip id={it.slot} size="sm" />
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
