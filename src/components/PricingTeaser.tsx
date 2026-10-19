"use client";

import Reveal from "@/components/Reveal";

const lines = [
  {
    k: "Trial",
    v: "Start with a trial if you qualify. See the replies before you pay us.",
  },
  {
    k: "Sprint",
    v: "Or run a Sprint: $2,950 once. Your market mapped and tested in six weeks.",
  },
  {
    k: "Monthly",
    v: "Then stay monthly. No lock-in, and you keep the domains, lists and threads.",
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
            <Reveal className="pt-line" key={l.k} delay={i * 80}>
              <span className="pt-k">{l.k}</span>
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

      <style jsx>{`
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
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: left;
          margin-bottom: 36px;
        }
        .pt-line {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
        }
        .pt-k {
          flex-shrink: 0;
          width: 86px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #ff9d99;
        }
        .pt-v {
          font-size: 15px;
          line-height: 1.5;
          color: #c7cbe0;
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

        @media (max-width: 560px) {
          #pricing-teaser { padding: 64px 18px; }
          .pt-line { flex-direction: column; align-items: flex-start; gap: 6px; }
          .pt-k { width: auto; }
        }
      `}</style>
    </section>
  );
}
