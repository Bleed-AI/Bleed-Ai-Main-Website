import Reveal from "@/components/Reveal";
import {
  FREE_EVERY,
  MIN_SLOTS,
  PRICE_LINE,
  SLOT_PRICE,
  SLOTS,
  SWAP_LINE,
  THEMES,
  TRIAL,
  money,
  priceFor,
  slotById,
  slotHref,
} from "@/lib/slots";
import ThemeArt from "./ThemeArt";

/** The /slots/ catalogue: every slot, grouped by theme (2026-10-30). */
export default function SlotIndex() {
  const live = SLOTS.filter((s) => s.status === "live").length;
  return (
    <>
      <section className="px-4 pt-28 pb-10 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="sec-label">Every slot</div>
          <h1 className="font-display text-[36px] font-bold leading-[1.08] text-white sm:text-6xl">
            Pick your slots. <em className="hd-em">Swap any slot</em> to what&apos;s working.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-[#c3c8dc]">
            Each slot is one piece of marketing work that arrives every month. Put the ones you need on your board, and swap any of them next month if something else is working better.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[13px]">
            <span className="rounded-full border border-[#2a2a3e] bg-[#141420] px-3 py-1.5 text-white/90">{money(SLOT_PRICE)} a slot</span>
            <span className="rounded-full border border-[#10b981]/40 bg-[#10b981]/10 px-3 py-1.5 text-[#34d399]">Every {FREE_EVERY}th slot free</span>
            <span className="rounded-full border border-[#2a2a3e] bg-[#141420] px-3 py-1.5 text-white/90">From {MIN_SLOTS} slots, {money(priceFor(MIN_SLOTS))} a month</span>
          </div>
          <p className="mt-3 text-[12px] text-[#9099b8]">{PRICE_LINE}. {live} slots live today.</p>
          <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Themes">
            {THEMES.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="rounded-full border border-[#2a2a3e] px-4 py-2 text-[13.5px] font-semibold text-white/85 transition-colors hover:border-[#B1130F]/70 hover:text-white">
                {t.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {THEMES.map((t) => {
        const slots = SLOTS.filter((s) => s.theme === t.id);
        return (
          <section key={t.id} id={t.id} className="scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal className="mb-6 grid items-center gap-6 md:grid-cols-[1fr_340px]">
                <div className="min-w-0">
                  <div className="sec-label">{slots.length} slots</div>
                  <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{t.name}</h2>
                  <p className="mt-2 text-[15.5px] text-[#9099b8]">{t.blurb}</p>
                </div>
                <ThemeArt theme={t.id} className="hidden md:block" />
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {slots.map((s, i) => (
                  <Reveal key={s.id} delay={(i % 3) * 70} className="min-w-0">
                    <a
                      href={slotHref(s.id)}
                      className="group flex h-full flex-col rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B1130F]/60"
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ff3d38] shadow-[0_0_8px_#ff3d38]" />
                        <span className="text-[12.5px] font-semibold text-white/90">{s.name}</span>
                        {s.status === "soon" && (
                          <span className="rounded-full bg-[#f59e0b]/15 px-1.5 py-[1px] text-[10px] font-semibold uppercase tracking-wide text-[#f5b544]">Soon</span>
                        )}
                        <span className="ml-auto text-[11.5px] text-[#9099b8]">
                          {s.weight} {s.weight === 1 ? "slot" : "slots"}
                        </span>
                      </div>
                      <h3 className="font-display text-[19px] font-bold leading-snug text-white">{s.title}</h3>
                      <p className="mt-2 text-[13.5px] leading-snug text-[#9099b8]">{s.monthly}</p>
                      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 text-[11.5px]">
                        {s.parent && <span className="rounded-full border border-[#2a2a3e] px-2 py-0.5 text-[#9099b8]">Add on to {slotById(s.parent).name}</span>}
                        {s.pro && <span className="rounded-full border border-[#2a2a3e] px-2 py-0.5 text-[#9099b8]">Pro option</span>}
                        {s.volume && <span className="rounded-full border border-[#2a2a3e] px-2 py-0.5 text-[#9099b8]">More volume</span>}
                        {s.passThrough && <span className="rounded-full border border-[#2a2a3e] px-2 py-0.5 text-[#9099b8]">+ cost passed through</span>}
                        <span className="ml-auto font-semibold text-[#ff6b67] transition-transform group-hover:translate-x-0.5">See it &rarr;</span>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl rounded-3xl border border-[#B1130F]/40 bg-[radial-gradient(120%_120%_at_50%_0%,#2a0d0c_0%,#0d0d16_60%)] px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Not sure which slots? <em className="hd-em">Try two free.</em>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#c3c8dc]">
            Free for {TRIAL.length} on {TRIAL.slots}. {SWAP_LINE}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={TRIAL.href} className="inline-flex items-center justify-center rounded-full bg-[#B1130F] px-7 py-3.5 text-[15px] font-semibold text-white btn-glow">
              {TRIAL.label}
            </a>
            <a href="/pricing/#builder" className="inline-flex items-center justify-center rounded-full border border-[#2a2a3e] px-7 py-3.5 text-[15px] font-semibold text-white/90 hover:border-white/30">
              Build your board
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
