"use client";

import Reveal from "@/components/Reveal";

const without = [
  "Chasing leads manually, calendar half-empty",
  "Paying a retainer whether or not meetings happen",
  "Copy-paste sequences that land in spam",
  "No visibility into what's working or why",
  "Talking to people who aren't your ICP",
  "Pipeline depends entirely on referrals and luck",
];

const withBleed = [
  "Qualified meetings booked while you focus on delivery",
  "Prove it with a low-cost trial campaign before you commit",
  "98%+ inbox placement, engineered at the DNS level",
  "Full campaign data: reply rates, pipeline value, conversion",
  "Laser-targeted ICP lists built from your best existing clients",
  "Pipeline that runs and compounds month after month",
];

export default function BeforeAfter() {
  return (
    <section id="ba-section">
      <div className="sec dark">
        <div className="sec-inner">
          <Reveal className="sec-label">Before vs. After</Reveal>
          <Reveal as="h2" className="sec-h2">
            What changes when you stop guessing
            <br />
            <em>and start engineering.</em>
          </Reveal>
          <div className="ba-wrap">
            <Reveal className="ba-col ba-before" delay={80}>
              <div className="ba-head">Without Bleed AI</div>
              <ul className="ba-list">
                {without.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </Reveal>
            <Reveal className="ba-col ba-after" delay={160}>
              <div className="ba-head">With Bleed AI</div>
              <ul className="ba-list">
                {withBleed.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
