"use client";

import Reveal from "@/components/Reveal";

const lines = [
  {
    k: "Trial",
    price: "Apply",
    v: "Start if you qualify. See the replies before you pay us.",
  },
  {
    k: "Sprint",
    price: "$2,950",
    unit: "once",
    v: "Your market mapped and tested in six weeks.",
    featured: true,
  },
];

export default function PricingTeaser() {
  return (
    <section id="pricing-teaser">
      <div className="pt-inner">
        <Reveal className="sec-label">How we work with you</Reveal>
        <Reveal as="h2" className="pt-title">
          Start with a trial.
          <br />
          <em>Stay because it works.</em>
        </Reveal>

        <div className="pt-lines">
          {lines.map((l, i) => (
            <Reveal className={`pt-line${l.featured ? " featured" : ""}`} key={l.k} delay={i * 80}>
              <span className="pt-k">{l.k}</span>
              <span className="pt-price">
                {l.price}
                {l.unit && <span className="pt-unit">{l.unit}</span>}
              </span>
              <span className="pt-v">{l.v}</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="pt-cta-row" delay={260}>
          <a href="/pricing" className="pt-cta">
            See full pricing
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </Reveal>
      </div>

      <style jsx global>{`
        #pricing-teaser {
          position: relative;
          padding: 90px 22px;
          text-align: center;
        }
        .pt-inner {
          max-width: 760px;
          margin: 0 auto;
        }
        .pt-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(28px, 4.2vw, 48px);
          font-weight: 400;
          line-height: 1.08;
          color: #eaeef8;
          margin: 6px 0 40px;
        }
        .pt-title em {
          font-style: italic;
          background: linear-gradient(90deg, #ff3d38, #ff8a86);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .pt-lines {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          text-align: left;
          margin-bottom: 36px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        .pt-line {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 26px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .pt-line:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 90, 80, 0.4);
          box-shadow: 0 24px 60px -30px rgba(0, 0, 0, 0.9), 0 0 36px -14px rgba(255, 61, 56, 0.4);
        }
        .pt-line.featured {
          border-color: rgba(255, 90, 80, 0.5);
          box-shadow: 0 0 44px -16px rgba(255, 61, 56, 0.5);
        }
        .pt-k {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #ff9d99;
        }
        .pt-price {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -1px;
          color: #eaeef8;
        }
        .pt-unit {
          font-size: 13px;
          font-weight: 600;
          color: #6a7192;
          margin-left: 4px;
        }
        .pt-from {
          font-size: 14px;
          font-weight: 600;
          color: #6a7192;
        }
        .pt-v {
          font-size: 14px;
          line-height: 1.5;
          color: #9099b8;
        }
        .pt-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 999px;
          background: #b1130f;
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .pt-cta:hover {
          transform: scale(1.04);
          box-shadow: 0 0 40px rgba(177, 19, 15, 0.5);
        }

        @media (max-width: 760px) {
          .pt-lines { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          #pricing-teaser { padding: 64px 18px; }
        }
      `}</style>
    </section>
  );
}
