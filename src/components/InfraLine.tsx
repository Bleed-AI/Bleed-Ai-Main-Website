"use client";

import Reveal from "@/components/Reveal";

const points = [
  "Run on our own warmed domains",
  "Inbox health watched daily",
  "Your main domain stays clean",
];

export default function InfraLine() {
  return (
    <section id="infra-line">
      <Reveal className="il-inner">
        <span className="il-lead">
          We handle the sending setup, so you never risk your domain.
        </span>
        <span className="il-points">
          {points.map((p) => (
            <span className="il-point" key={p}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
              {p}
            </span>
          ))}
        </span>
      </Reveal>

      <style jsx global>{`
        #infra-line {
          padding: 10px 22px 40px;
        }
        #infra-line .il-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 14px 26px;
          padding: 18px 26px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          text-align: center;
        }
        #infra-line .il-lead {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #eaeef8;
        }
        #infra-line .il-points {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px 20px;
        }
        #infra-line .il-point {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          color: #9099b8;
        }
        #infra-line .il-point svg {
          color: #22c98a;
          flex-shrink: 0;
        }
        @media (max-width: 560px) {
          #infra-line .il-inner { flex-direction: column; gap: 14px; }
        }
      `}</style>
    </section>
  );
}
