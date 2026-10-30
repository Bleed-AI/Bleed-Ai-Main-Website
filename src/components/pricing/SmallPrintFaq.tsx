/* eslint-disable react/no-unescaped-entities */
import { FREE_EVERY, MIN_SLOTS, money, OUTBOUND_SPECIALIST, PRICE_LINE, priceFor, PROCESSING_FEE_PCT, SLOT_PRICE, TRIAL } from "@/lib/slots";

const PRINT = [
  { h: "Month to month", b: `Billed monthly on a card subscription. No contract, no minimum term. Paying another way (bank transfer or invoice) adds a ${PROCESSING_FEE_PCT}% processing fee.` },
  { h: "Pass-through costs at cost", b: "A few slots need outside software or postage, like a LinkedIn automation seat or printed cards. You pay what it costs us, no markup, and you see it before you start." },
  { h: "Change your board monthly", b: "Swap any slot for another, add slots, drop slots or pause. Changes start with your next month." },
  { h: "Free trial", b: `${TRIAL.length} on ${TRIAL.slots}, for qualified companies. We pick the slots most likely to work for you, together.` },
  { h: "Founding price", b: `${money(SLOT_PRICE)} a slot. ${PRICE_LINE}, with every ${FREE_EVERY}th slot free on top.` },
];

const FAQ = [
  {
    q: "What exactly is a slot?",
    a: "A slot is one marketing job we do for you every month, with a clear monthly output: 8 LinkedIn posts, 2 articles, one email campaign, and so on. Your board is the set of slots you hold.",
  },
  {
    q: `Why is every ${FREE_EVERY}th slot free?`,
    a: `Because the more of your marketing we run, the better each part works together, and we want growing your board to always pay off. 3 slots and 4 slots both cost ${money(priceFor(3))} a month. 8 slots get 2 free.`,
  },
  {
    q: "What does swapping a slot mean?",
    a: "If a slot stops paying off, we move it to something that will. Articles not moving yet? Swap one for a LinkedIn slot. Outbound working? Add more of it. Same price per slot, no new agency to hire.",
  },
  {
    q: `Why is the minimum ${MIN_SLOTS} slots?`,
    a: "One slot on its own is rarely enough to see a result. Two slots that support each other, like posts plus a buyer network, give you something you can judge.",
  },
  {
    q: "What happens if I remove the free slot?",
    a: `Your price stays the same. Dropping from 4 slots to 3 saves nothing, because you only paid for 3. That is on purpose: it rewards keeping a full board.`,
  },
  {
    q: "What does \"Soon\" mean on a slot?",
    a: "It is on the menu but not live yet. You can still put it on your board, and we agree a start date with you on the call.",
  },
  {
    q: "When is the Outbound Specialist plan a better fit?",
    a: `When outbound is already working and you want more of it: several markets, constant tests, a list built per account. It is one plan, starting with a ${money(OUTBOUND_SPECIALIST.launch.price)} launch month.`,
  },
];

export default function SmallPrintFaq() {
  return (
    <section className="sec">
      <div className="sec-inner grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="sec-label">Small print</div>
          <h2 className="sec-h2">
            No catches. <em>Here it all is.</em>
          </h2>
          <ul className="mt-8 space-y-5">
            {PRINT.map((p) => (
              <li key={p.h} className="flex gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10b981]/15 text-[11px] text-[#34d399]">&#10003;</span>
                <div>
                  <div className="text-[15px] font-semibold text-white">{p.h}</div>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-[#9099b8]">{p.b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="sec-label">Questions</div>
          <h2 className="sec-h2 !mb-8">Pricing FAQ</h2>
          <div className="space-y-2.5">
            {FAQ.map((f, i) => (
              <details key={f.q} className="pr-faq group rounded-xl border border-[#1f1f30] bg-[#141420]/60 open:border-[#2a2a3e]" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-white">
                  {f.q}
                  <span className="pr-faq-plus shrink-0 text-[20px] font-light text-[#ff6b67] transition-transform duration-200">+</span>
                </summary>
                <p className="px-5 pb-5 text-[14px] leading-relaxed text-[#9099b8]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
