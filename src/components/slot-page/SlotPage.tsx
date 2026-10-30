import Reveal from "@/components/Reveal";
import SlotChip from "@/components/slots/SlotChip";
import SlotMeter from "@/components/slots/SlotMeter";
import {
  FREE_EVERY,
  HYBRID_PACKAGE,
  MIN_SLOTS,
  OUTCOMES,
  PACKAGES,
  PRICE_LINE,
  SLOT_PRICE,
  SLOTS,
  SWAP_LINE,
  THEMES,
  TRIAL,
  customiseHref,
  itemsSlotCount,
  money,
  priceFor,
  slotById,
  slotHref,
  type PackageItem,
  unitLabel,
  type Slot,
} from "@/lib/slots";
import ServiceSample from "./ServiceSample";

function passThroughText(s: Slot): string | null {
  const p = s.passThrough;
  if (!p) return null;
  return p.unit === "month" ? `${money(p.amount)} a month` : `${money(p.amount)} a target`;
}

function stripPro(t: string): string {
  const r = t.replace(/^Pro:\s*/i, "");
  return r.charAt(0).toUpperCase() + r.slice(1);
}

interface PkgRef {
  id: string;
  name: string;
  pitch: string;
  items: PackageItem[];
  qty: number;
  outcomeName: string | null;
  outcomeHref: string | null;
}

function packagesWith(id: string): PkgRef[] {
  const out: PkgRef[] = [];
  for (const p of PACKAGES) {
    const it = p.items.find((x) => x.slot === id);
    if (!it) continue;
    const o = OUTCOMES.find((x) => x.id === p.outcome);
    out.push({ id: p.id, name: p.name, pitch: p.pitch, items: p.items, qty: it.qty ?? 1, outcomeName: o?.name ?? null, outcomeHref: o?.href ?? null });
  }
  const h = HYBRID_PACKAGE.items.find((x) => x.slot === id);
  if (h) {
    out.push({ id: HYBRID_PACKAGE.id, name: HYBRID_PACKAGE.name, pitch: HYBRID_PACKAGE.pitch, items: HYBRID_PACKAGE.items, qty: h.qty ?? 1, outcomeName: null, outcomeHref: null });
  }
  return out;
}

function Arrow() {
  return (
    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default function SlotPage({ id }: { id: string }) {
  const s = slotById(id);
  const theme = THEMES.find((t) => t.id === s.theme)!;
  const parent = s.parent ? slotById(s.parent) : null;
  const children = SLOTS.filter((x) => x.parent === s.id);
  const siblings = SLOTS.filter((x) => x.theme === s.theme && x.id !== s.id && x.id !== parent?.id && !children.some((c) => c.id === x.id));
  const pkgs = packagesWith(s.id);
  const soon = s.status === "soon";
  const pass = passThroughText(s);
  const addHref = `/pricing/?slots=${s.id}:1#builder`;
  const trialHref = soon ? TRIAL.href : `${TRIAL.href}?services=${s.id}:1`;

  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[12.5px] text-[#9099b8]">
              <a href="/services/" className="hover:text-white">Services</a>
              <span className="text-[#505570]">/</span>
              <a href={`/services/#${theme.id}`} className="hover:text-white">{theme.name}</a>
              <span className="text-[#505570]">/</span>
              <span className="text-white/80">{s.name}</span>
            </nav>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#2a2a3e] bg-[#141420] px-3 py-1 text-[12px] font-semibold text-white/90">
                {s.name}
              </span>
              <span className="rounded-full border border-[#B1130F]/40 bg-[#B1130F]/10 px-3 py-1 text-[12px] font-semibold text-[#ff9d99]">
                {s.weight === 1 ? "Full service" : unitLabel(s.weight)}
              </span>
              {soon && (
                <span className="rounded-full bg-[#f59e0b]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#f5b544]">Soon</span>
              )}
            </div>
            <h1 className="font-display text-[34px] font-bold leading-[1.08] text-white sm:text-5xl">{s.title}</h1>

            <div className="mt-6 rounded-2xl border border-[#1f1f30] bg-[#0d0d16]/80 p-4 sm:p-5">
              <div className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#ff6b67]">Every month</div>
              <p className="text-[15px] leading-snug text-white">{s.monthly}</p>
            </div>

            {soon ? (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/[0.06] p-4">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#f5b544] shadow-[0_0_10px_#f5b544]" />
                <p className="text-[14px] leading-snug text-[#f3d9a4]">
                  This service is coming soon and is not available yet. Start with a live service today, and ask about this one on your call.
                </p>
              </div>
            ) : null}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={trialHref} className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#B1130F] px-7 py-3.5 text-[15px] font-semibold text-white btn-glow">
                {soon ? TRIAL.label : `Try this service free`}
                <Arrow />
              </a>
              {!soon && (
                <a href={addHref} className="inline-flex items-center justify-center rounded-full border border-[#2a2a3e] px-7 py-3.5 text-[15px] font-semibold text-white/90 transition-colors hover:border-white/30">
                  Add it to your plan
                </a>
              )}
              {soon && (
                <a href="/pricing/#builder" className="inline-flex items-center justify-center rounded-full border border-[#2a2a3e] px-7 py-3.5 text-[15px] font-semibold text-white/90 transition-colors hover:border-white/30">
                  See the live services
                </a>
              )}
            </div>
            {!soon && (
              <p className="mt-3 text-[12.5px] text-[#9099b8]">
                Free for {TRIAL.length} on {TRIAL.slots}, for B2B companies that already sell.
              </p>
            )}
          </div>
          <div className="min-w-0">
            <ServiceSample id={s.id} theme={s.theme} />
          </div>
        </div>
      </section>

      {/* How it works + price */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal className="min-w-0 rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-6 sm:p-8">
            <div className="sec-label">How it works</div>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#c3c8dc]">
              <p>{s.tooltip}</p>
              <p>
                {s.name} is a full service on its own, part of our {theme.name} work. {theme.blurb}
                {parent && (
                  <>
                    {" "}It builds on <a className="font-semibold text-white underline decoration-[#B1130F]/60 underline-offset-4 hover:decoration-[#ff3d38]" href={slotHref(parent.id)}>{parent.name}</a>, so it runs once that service is in your plan.
                  </>
                )}
                {children.length > 0 && (
                  <>
                    {" "}When you want more from the same work, add{" "}
                    {children.map((c, i) => (
                      <span key={c.id}>
                        <a className="font-semibold text-white underline decoration-[#B1130F]/60 underline-offset-4 hover:decoration-[#ff3d38]" href={slotHref(c.id)}>{c.name}</a>
                        {i < children.length - 2 ? ", " : i === children.length - 2 ? " or " : ""}
                      </span>
                    ))}{" "}
                    on top of it.
                  </>
                )}
              </p>
              <p>
                Add it to any plan, on its own or next to other services. If it isn't pulling its weight, swap it for another service next month. Same team, same bill, no new agency to brief.
              </p>
            </div>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                "Run end to end by our team",
                "You approve the work before it goes out",
                "A short report every month on what it produced",
                "Swap it for any other service next month",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-white/85">
                  <svg className="mt-[2px] h-4 w-4 flex-none text-[#10b981]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" />
                  </svg>
                  {x}
                </li>
              ))}
            </ul>

            {(s.pro || s.volume || pass) && (
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {s.pro && (
                  <div className="rounded-xl border border-[#2a2a3e] bg-[#0d0d16] p-4">
                    <div className="mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff9d99]">
                      Pro <span className="rounded-full bg-[#B1130F]/20 px-2 py-[1px] text-[10px] text-[#ff9d99]">+1 service</span>
                    </div>
                    <p className="text-[14px] leading-snug text-white/90">{stripPro(s.pro)}</p>
                  </div>
                )}
                {s.volume && (
                  <div className="rounded-xl border border-[#2a2a3e] bg-[#0d0d16] p-4">
                    <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff9d99]">More volume</div>
                    <p className="text-[14px] leading-snug text-white/90">{s.volume}</p>
                  </div>
                )}
                {pass && s.passThrough && (
                  <div className="rounded-xl border border-[#2a2a3e] bg-[#0d0d16] p-4">
                    <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9099b8]">Passed through at cost</div>
                    <p className="text-[14px] leading-snug text-white/90">
                      {s.passThrough.label.replace(/, at cost$/i, "")}: {pass}
                    </p>
                  </div>
                )}
              </div>
            )}
          </Reveal>

          <Reveal delay={100} className="min-w-0 rounded-2xl border border-[#B1130F]/40 bg-[linear-gradient(165deg,#1a0d10,#0d0d16_60%)] p-6 sm:p-8">
            <div className="sec-label">What it costs</div>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-4xl font-bold text-white">{money(SLOT_PRICE * s.weight)}</span>
              <span className="text-[14px] text-[#9099b8]">a month for this {s.weight === 1 ? "service" : `${s.weight} service set`}</span>
            </div>
            <p className="mt-1 text-[12.5px] text-[#9099b8]">{money(SLOT_PRICE)} a service. {PRICE_LINE}.</p>
            {pass && <p className="mt-1 text-[12.5px] text-[#9099b8]">Plus {pass} passed through at cost.</p>}

            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="mb-3 text-[13.5px] leading-snug text-[#c3c8dc]">
                Plans start at {unitLabel(MIN_SLOTS)} ({money(priceFor(MIN_SLOTS))} a month). Every {ordinal(FREE_EVERY)} service is free, so a plan with {unitLabel(FREE_EVERY)} looks like this:
              </p>
              <SlotMeter count={FREE_EVERY} />
            </div>
            <p className="mt-5 text-[13px] leading-snug text-white/80">{SWAP_LINE}</p>
          </Reveal>
        </div>
      </section>

      {/* Packages + works with */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal className="min-w-0">
            <div className="sec-label">Plans with this service</div>
            {pkgs.length === 0 ? (
              <div className="rounded-2xl border border-[#1f1f30] bg-[#0d0d16] p-6 text-[14px] leading-relaxed text-[#9099b8]">
                Not in a ready made plan yet. {soon ? "Once it opens, you can add it to any plan." : "Add it to any plan in the builder, next to the services you already want."}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {pkgs.map((p) => {
                  const n = itemsSlotCount(p.items);
                  return (
                    <div key={p.id} className="flex flex-col rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-5">
                      {p.outcomeName && p.outcomeHref ? (
                        <a href={p.outcomeHref} className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff6b67] hover:text-[#ff9d99]">{p.outcomeName}</a>
                      ) : (
                        <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff6b67]">Mixed plan</span>
                      )}
                      <h3 className="font-display text-lg font-bold text-white">{p.name}</h3>
                      <p className="mt-1 text-[13px] leading-snug text-[#9099b8]">{p.pitch}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {p.items.map((it) => {
                          const on = it.slot === s.id;
                          const name = slotById(it.slot).name;
                          return (
                            <span
                              key={it.slot}
                              className={`rounded-full border px-2 py-0.5 text-[11px] ${on ? "border-[#B1130F] bg-[#B1130F]/20 font-semibold text-white" : "border-[#2a2a3e] text-[#9099b8]"}`}
                            >
                              {(it.qty ?? 1) > 1 ? `${it.qty} x ` : ""}
                              {name}
                            </span>
                          );
                        })}
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <span className="text-[13px] text-white">
                          <span className="font-display text-lg font-bold">{money(priceFor(n))}</span>
                          <span className="text-[#9099b8]"> a month, {unitLabel(n)}</span>
                        </span>
                        <a href={customiseHref(p.id)} className="text-[13px] font-semibold text-[#ff6b67] hover:text-[#ff9d99]">Customise &rarr;</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Reveal>

          <Reveal delay={100} className="min-w-0">
            <div className="sec-label">Works with</div>
            <div className="rounded-2xl border border-[#1f1f30] bg-[#0d0d16] p-5 sm:p-6">
              {parent && (
                <div className="mb-5">
                  <div className="mb-2 text-[12.5px] text-[#9099b8]">Needs this service in your plan</div>
                  <div className="flex flex-wrap gap-2"><SlotChip id={parent.id} /></div>
                </div>
              )}
              {children.length > 0 && (
                <div className="mb-5">
                  <div className="mb-2 text-[12.5px] text-[#9099b8]">Add ons that build on it</div>
                  <div className="flex flex-wrap gap-2">{children.map((c) => <SlotChip key={c.id} id={c.id} />)}</div>
                </div>
              )}
              <div>
                <div className="mb-2 text-[12.5px] text-[#9099b8]">More in {theme.name}</div>
                <div className="flex flex-wrap gap-2">{siblings.map((c) => <SlotChip key={c.id} id={c.id} size="sm" />)}</div>
              </div>
              <a href="/services/" className="mt-6 inline-block text-[13px] font-semibold text-[#ff6b67] hover:text-[#ff9d99]">See every service &rarr;</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl rounded-3xl border border-[#B1130F]/40 bg-[radial-gradient(120%_120%_at_50%_0%,#2a0d0c_0%,#0d0d16_60%)] px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Try it before you <em className="hd-em">pay for it.</em>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#c3c8dc]">
            Free for {TRIAL.length} on {TRIAL.slots}. If it works, keep it at the founding price. If it doesn't, swap it for another service.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={trialHref} className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#B1130F] px-7 py-3.5 text-[15px] font-semibold text-white btn-glow">
              {TRIAL.label}
              <Arrow />
            </a>
            <a href="/pricing/" className="inline-flex items-center justify-center rounded-full border border-[#2a2a3e] px-7 py-3.5 text-[15px] font-semibold text-white/90 hover:border-white/30">
              See pricing
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ordinal(n: number): string {
  if (n === 1) return "1st";
  if (n === 2) return "2nd";
  if (n === 3) return "3rd";
  return `${n}th`;
}
