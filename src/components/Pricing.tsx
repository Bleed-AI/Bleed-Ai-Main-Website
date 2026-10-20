"use client";

import Reveal from "@/components/Reveal";

type Plan = {
  name: string;
  price: string;
  unit?: string;
  note: string;
  points: string[];
  cta: { label: string; href: string; external?: boolean };
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Trial",
    price: "Apply",
    note: "If you qualify",
    points: ["About 1,500 of your buyers", "Two emails, every reply handed to you", "A readout, then you decide"],
    cta: { label: "Apply for a trial", href: "/trial" },
  },
  {
    name: "Sprint",
    price: "$2,950",
    unit: "once",
    note: "Six weeks",
    points: ["Your market mapped and tested", "Several campaigns on email and LinkedIn", "The success bar written before we send"],
    cta: { label: "Start a Sprint", href: "https://calculator.bleedai.com/sprint", external: true },
    featured: true,
  },
  {
    name: "Growth",
    price: "$3,350",
    unit: "/month",
    note: "The core engine",
    points: ["The Pass System on email and LinkedIn", "The inside pass", "AI follow-up on every reply", "New segments every month", "CRM and Slack support"],
    cta: { label: "Book a call", href: "/book-call" },
  },
  {
    name: "Scale",
    price: "$5,300",
    unit: "/month",
    note: "Every door",
    points: ["Everything in Growth, plus every door", "Direct mail, 150 cards a month included", "Warm phone follow-up", "The website form door", "The most strategy time"],
    cta: { label: "Book a call", href: "/book-call" },
  },
];

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="pr-inner">
        <Reveal className="sec-label" style={{ textAlign: "center" }}>
          How we work with you
        </Reveal>
        <Reveal as="h2" className="pr-title">
          Start with a trial.
          <br />
          <em>Stay because it works.</em>
        </Reveal>
        <Reveal as="p" className="pr-sub" delay={80}>
          No lock-in, and you keep the domains, the lists and every thread.
        </Reveal>

        <div className="pr-grid">
          {plans.map((p, i) => (
            <Reveal className={`pr-card${p.featured ? " featured" : ""}`} key={p.name} delay={i * 70}>
              {p.featured && <span className="pr-flag">Most popular</span>}
              <div className="pr-name">{p.name}</div>
              <div className="pr-price">
                {p.price}
                {p.unit && <span className="pr-unit">{p.unit}</span>}
              </div>
              <div className="pr-note">{p.note}</div>
              <ul className="pr-points">
                {p.points.map((pt) => (
                  <li key={pt}>
                    <span className="pr-chk">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7" />
                      </svg>
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <a
                href={p.cta.href}
                {...(p.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`pr-cta${p.featured ? " solid" : ""}`}
              >
                {p.cta.label}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="pr-small" delay={120}>
          Smaller budget?{" "}
          <a href="https://calculator.bleedai.com" target="_blank" rel="noopener noreferrer">
            Launch a single campaign for under $1K on the calculator.
          </a>
        </Reveal>

        <Reveal className="pr-perf" delay={160}>
          <div className="pr-perf-head">Performance partnerships</div>
          <p>
            For the right fit, we also run pay per meeting, success fee and revenue share deals.
            These are priced on a call, never off a menu. If outbound is already proven for you and
            you want skin in the game, ask us.
          </p>
        </Reveal>
      </div>

      <style jsx global>{`
        #pricing {
          position: relative;
          padding: 100px 22px 90px;
        }
        .pr-inner {
          max-width: 1180px;
          margin: 0 auto;
          text-align: center;
        }
        .pr-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(30px, 4.6vw, 54px);
          font-weight: 400;
          line-height: 1.06;
          color: #eaeef8;
          margin: 6px 0 12px;
        }
        .pr-title em {
          font-style: italic;
          background: linear-gradient(90deg, #ff3d38, #ff8a86);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .pr-sub {
          font-size: 15.5px;
          color: #9099b8;
          margin-bottom: 46px;
        }
        .pr-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          text-align: left;
        }
        .pr-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 28px 24px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
        }
        .pr-card.featured {
          border-color: rgba(255, 90, 80, 0.5);
          box-shadow: 0 0 50px -16px rgba(255, 61, 56, 0.5);
        }
        .pr-flag {
          position: absolute;
          top: -11px;
          left: 24px;
          padding: 4px 11px;
          border-radius: 999px;
          background: linear-gradient(135deg, #b1130f, #ff3d38);
          color: #fff;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .pr-name {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 13px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #ff9d99;
          margin-bottom: 12px;
        }
        .pr-price {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -1px;
          color: #eaeef8;
        }
        .pr-unit {
          font-size: 14px;
          font-weight: 600;
          color: #6a7192;
          margin-left: 5px;
        }
        .pr-note {
          font-size: 13px;
          color: #6a7192;
          margin: 4px 0 20px;
        }
        .pr-points {
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin-bottom: 24px;
          flex: 1;
        }
        .pr-points li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 13.5px;
          line-height: 1.45;
          color: #c7cbe0;
        }
        .pr-chk {
          display: inline-flex;
          color: #3ecf8e;
          margin-top: 1px;
          flex-shrink: 0;
        }
        .pr-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #eaeef8;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s;
        }
        .pr-cta:hover {
          border-color: #ff6b67;
          color: #ff6b67;
        }
        .pr-cta.solid {
          background: #b1130f;
          border-color: transparent;
          color: #fff;
        }
        .pr-cta.solid:hover {
          color: #fff;
          box-shadow: 0 0 30px rgba(177, 19, 15, 0.5);
        }
        .pr-small {
          margin-top: 30px;
          font-size: 14px;
          color: #9099b8;
        }
        .pr-small a {
          color: #ff9d99;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .pr-perf {
          max-width: 640px;
          margin: 38px auto 0;
          padding: 24px 26px;
          border-radius: 16px;
          border: 1px dashed rgba(255, 255, 255, 0.14);
          text-align: center;
        }
        .pr-perf-head {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #eaeef8;
          margin-bottom: 8px;
        }
        .pr-perf p {
          font-size: 14px;
          line-height: 1.6;
          color: #9099b8;
        }

        @media (max-width: 980px) {
          .pr-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          #pricing { padding: 80px 18px 70px; }
          .pr-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
