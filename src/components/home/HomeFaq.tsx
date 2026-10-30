"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { FREE_EVERY, freeSlots, MIN_SLOTS, money, PRICE_LINE, priceFor, PROCESSING_FEE_PCT, SLOT_PRICE, slotById, TRIAL } from "@/lib/slots";

/** The first clause of a slot's monthly line, e.g. "8 high quality LinkedIn posts a month". */
const first = (id: string) => slotById(id).monthly.split(/[,:]/)[0].trim();

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What is a slot?",
    a: (
      <>
        <strong>One marketing service with a fixed amount of work every month.</strong> For example: {first("linkedin-posts")}, {first("articles")}, or {first("email-campaign").toLowerCase()}. You can hover any slot on the site to see exactly what arrives each month.
      </>
    ),
  },
  {
    q: "Can I really swap a slot?",
    a: (
      <>
        <strong>Yes, any slot, every month.</strong> Your monthly report shows what each slot produced. If one has gone flat, we move it to something that is working for you, and your price stays the same. That is the whole point: one team, no juggling agencies when a channel stalls.
      </>
    ),
  },
  {
    q: "What does it cost?",
    a: (
      <>
        <strong>
          {money(SLOT_PRICE)} a slot a month, and every {FREE_EVERY}th slot is free.
        </strong>{" "}
        The minimum is {MIN_SLOTS} slots ({money(priceFor(MIN_SLOTS))} a month). A board of 4 is {money(priceFor(4))}, a board of 8 is {money(priceFor(8))} with {freeSlots(8)} free. A few slots need software we pass through at cost, and we show it before you start. {PRICE_LINE}.
      </>
    ),
  },
  {
    q: "Is there a contract?",
    a: (
      <>
        <strong>No. It is month to month on a card subscription.</strong> Cancel whenever you like. If you need to pay another way, such as a bank invoice, that adds a {PROCESSING_FEE_PCT}% processing fee.
      </>
    ),
  },
  {
    q: "What does the free trial include?",
    a: (
      <>
        <strong>
          {TRIAL.length} on {TRIAL.slots}, free.
        </strong>{" "}
        We pick the slots most likely to show you something real fast: your first posts, an article, an AI search check or a first campaign. You judge the work, then decide.
      </>
    ),
  },
  {
    q: "Who is this for?",
    a: (
      <>
        <strong>B2B companies that already sell, from 2 to 60 people.</strong> You have paying customers and a product people buy, but no time or team to run every channel well. If you are still finding your first customer, we are probably not the right fit yet.
      </>
    ),
  },
  {
    q: "Some slots say “Soon”. What does that mean?",
    a: (
      <>
        <strong>We are still finishing them, so you cannot run them yet.</strong> We never sell a Soon slot as live. Tell us which one you want and we will let you know the moment it opens, so you can swap it in.
      </>
    ),
  },
  {
    q: "Do you still do cold email?",
    a: (
      <>
        <strong>Yes, it is where our track record comes from.</strong> Outbound is one outcome on the board now, next to LinkedIn, articles and AI search.{" "}
        <a href="/outbound/" className="text-white underline decoration-[#B1130F]/70 underline-offset-2">
          See Outbound
        </a>
        .
      </>
    ),
  },
];

export default function HomeFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq">
      <div className="sec">
        <div className="sec-inner" style={{ textAlign: "center" }}>
          <Reveal className="sec-label">Common questions</Reveal>
          <Reveal as="h2" className="sec-h2" style={{ marginBottom: 8 }}>
            Straight answers.
            <br />
            <em>No small print.</em>
          </Reveal>
          <Reveal as="p" delay={80} style={{ color: "var(--sub)", fontSize: 15, marginBottom: 36, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
            How slots, swaps, pricing and the free trial actually work.
          </Reveal>
          <Reveal className="faq-list" style={{ margin: "0 auto" }}>
            {faqs.map((f, i) => (
              <div className={`faq-item${open === i ? " open" : ""}`} key={f.q}>
                <button type="button" className="faq-q w-full" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  {f.q}
                  <span className="faq-ico" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
