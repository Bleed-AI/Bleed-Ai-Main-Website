import { customiseHref, itemsPassThroughMonthly, itemsSlotCount, money, monthlyFor, slotById, slotHref, TRIAL, type PackageItem } from "@/lib/slots";
import SlotMeter from "./SlotMeter";

/**
 * A PLAN (a preset set of services inside a package) as a card: what arrives every month as line items,
 * the price, a trial CTA and a customise link into the builder. Public words: plan, service (2026-10-30).
 */
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
          Our pick
        </span>
      )}
      <h3 className="font-display text-xl font-bold text-white">{name}</h3>
      <p className="mt-1.5 text-[14px] leading-snug text-[#9099b8]">{pitch}</p>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#505570]">What you get every month</p>
      <ul className="mt-3 flex flex-col gap-3">
        {items.map((it) => {
          const s = slotById(it.slot);
          return (
            <li key={it.slot} className="flex gap-2.5">
              <svg className="mt-[3px] h-4 w-4 flex-none text-[#ff3d38]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" />
              </svg>
              <span className="text-[13px] leading-snug text-[#c3c8dc]">
                <a href={slotHref(s.id)} className="font-semibold text-white hover:text-[#ff6b67]">
                  {(it.qty ?? 1) > 1 ? `${it.qty} x ` : ""}
                  {s.name}
                </a>
                {s.status === "soon" && (
                  <span className="ml-1.5 rounded-full bg-[#f59e0b]/15 px-1.5 py-[1px] text-[10px] font-semibold uppercase tracking-wide text-[#f5b544]">
                    Soon
                  </span>
                )}
                <span className="block text-[#9099b8]">
                  {monthlyFor(s.id, it.qty)}
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 border-t border-white/5 pt-5">
        <SlotMeter count={count} />
        {(pass > 0 || perTarget) && (
          <p className="mt-2 text-[11.5px] text-[#505570]">
            {pass > 0 ? `Plus ${money(pass)} a month in software at cost.` : ""}
            {perTarget ? " Postage at cost." : ""}
          </p>
        )}
      </div>
      <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row xl:flex-col">
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
