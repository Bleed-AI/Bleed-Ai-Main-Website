/* eslint-disable react/no-unescaped-entities */
import { FREE_EVERY, MIN_SLOTS, money, OUTBOUND_SPECIALIST, PRICE_LINE, priceFor, PROCESSING_FEE_PCT, SLOT_PRICE, TRIAL, unitLabel } from "@/lib/slots";

const PRINT = [
  { h: "Month to month", b: `Billed monthly on a card subscription. No contract, no minimum term. Paying another way (bank transfer or invoice) adds a ${PROCESSING_FEE_PCT}% processing fee.` },
  { h: "Outside costs at cost", b: "A few services need outside software or postage, like a LinkedIn automation seat or printed cards. You pay what it costs us, no markup, and you see it before you start." },
  { h: "Change your plan monthly", b: "Swap any service for another, add services, drop services or pause. Changes start with your next month." },
  { h: "Free trial", b: `${TRIAL.length} on ${TRIAL.slots}, for qualified companies. We pick the services most likely to work for you, together.` },
  { h: "Founding price", b: `${money(SLOT_PRICE)} a service. ${PRICE_LINE}, with every ${FREE_EVERY}th service free on top.` },
];

const FAQ = [
  {
    q: "What exactly is a service?",
    a: "A full marketing service we run for you every month, with a clear monthly output: 8 LinkedIn posts, 2 articles, one targeted email campaign, and so on. Each one stands on its own. Your plan is the set of services you hold.",
  },
  {
    q: "What does swapping a service mean?",
    a: "Each service is a full service on its own. If one isn't pulling its weight, swap it for another next month. Articles not moving yet? Swap one for LinkedIn posts. Outbound working? Add more of it. Same price per service, no new agency to hire.",
  },
  {
    q: `Why is every ${FREE_EVERY}th service free?`,
    a: `Because the more of your marketing we run, the better each part works together, and we want growing your plan to always pay off. ${unitLabel(3)} and ${unitLabel(4)} both cost ${money(priceFor(3))} a month. ${unitLabel(8)} get 2 free.`,
  },
  {
    q: `Why is the minimum ${unitLabel(MIN_SLOTS)}?`,
    a: "One service on its own is rarely enough to see a result. Two services that support each other, like posts plus a buyer network, give you something you can judge.",
  },
  {
    q: "What happens if I remove the free service?",
    a: `Your price stays the same. Dropping from ${unitLabel(4)} to 3 saves nothing, because you only paid for 3. That is on purpose: it rewards keeping your 4th.`,
  },
  {
    q: "What does \"Soon\" mean on a service?",
    a: "It is on the menu but not live yet. You can still add it to your plan, and we agree a start date with you on the call.",
  },
  {
    q: "When is the Outbound Specialist plan a better fit?",
    a: `When outbound is already working and you want more of it: several markets, constant tests, a list built per account. It is one plan with three levels, starting with a ${money(OUTBOUND_SPECIALIST.launch.price)} launch month. You pick the level in the Outbound package above.`,
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
