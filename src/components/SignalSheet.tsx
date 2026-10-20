"use client";

import Reveal from "@/components/Reveal";

type Row = { company: string; signal: string; who: string };
const rows: Row[] = [
  { company: "Northwind Health", signal: "Hiring 3 RevOps", who: "VP RevOps" },
  { company: "Cobalt Freight", signal: "New funding round", who: "Head of Growth" },
  { company: "Vantage Dental", signal: "Opening 2 locations", who: "Practice Owner" },
];

export default function SignalSheet() {
  return (
    <section id="signal-sheet">
      <div className="ss-inner">
        <div className="ss-copy">
          <Reveal className="sec-label">Before a single send</Reveal>
          <Reveal as="h2" className="ss-title">
            We find your buyers
            <br />
            <em>before they reply.</em>
          </Reveal>
          <Reveal as="p" className="ss-sub" delay={80}>
            Every row starts as a signal in the wild: a job post, a raise, a new location.
            We read it, find the company and the person who signs, and it lands in your sheet.
          </Reveal>
        </div>

        <Reveal className="ss-demo" delay={120}>
          <div className="ss-scan">
            <span className="ss-scan-dot" />
            <span className="ss-scan-text">Reading signals</span>
            <span className="ss-caret" />
          </div>

          <div className="ss-sheet" aria-hidden="true">
            <div className="ss-head">
              <span>Company</span>
              <span>Signal</span>
              <span>Who signs</span>
              <span />
            </div>
            {rows.map((r, i) => (
              <div className="ss-row" key={r.company} style={{ animationDelay: `${i * 1.4}s` }}>
                <span className="ss-company">{r.company}</span>
                <span className="ss-signal">{r.signal}</span>
                <span className="ss-who">{r.who}</span>
                <span className="ss-check">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        #signal-sheet {
          position: relative;
          padding: 90px 22px;
        }
        .ss-inner {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 48px;
          align-items: center;
        }
        .ss-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 400;
          line-height: 1.08;
          color: #eaeef8;
          margin: 6px 0 14px;
        }
        .ss-title em {
          font-style: italic;
          background: linear-gradient(90deg, #ff3d38, #ff8a86);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .ss-sub {
          font-size: 15.5px;
          line-height: 1.65;
          color: #9099b8;
          max-width: 440px;
        }

        .ss-demo {
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.9);
          padding: 18px;
        }
        .ss-scan {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 13px;
          border-radius: 8px;
          border: 1px solid rgba(255, 61, 56, 0.25);
          background: rgba(255, 61, 56, 0.06);
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          color: #ff9d99;
          margin-bottom: 14px;
        }
        .ss-scan-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ff6b67;
          box-shadow: 0 0 10px #ff6b67;
          animation: ssPulse 1.3s ease-in-out infinite;
        }
        @keyframes ssPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .ss-caret {
          width: 7px;
          height: 14px;
          background: #ff9d99;
          animation: ssBlink 1s steps(2) infinite;
        }
        @keyframes ssBlink {
          0%, 50% { opacity: 1; }
          50.1%, 100% { opacity: 0; }
        }

        .ss-sheet {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.07);
        }
        .ss-head,
        .ss-row {
          display: grid;
          grid-template-columns: 1.3fr 1.3fr 1.1fr 34px;
          gap: 10px;
          align-items: center;
          padding: 12px 14px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12.5px;
        }
        .ss-head {
          background: rgba(255, 255, 255, 0.03);
          color: #6a7192;
          font-size: 10.5px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }
        .ss-row {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: #e4e7f2;
          opacity: 0;
          transform: translateX(-10px);
          animation: ssRow 4.5s ease-in-out infinite;
        }
        @keyframes ssRow {
          0%, 6% { opacity: 0; transform: translateX(-10px); }
          16%, 88% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-10px); }
        }
        .ss-company {
          color: #c7cbe0;
          filter: blur(3.5px);
          user-select: none;
        }
        .ss-signal {
          display: inline-flex;
          align-items: center;
          padding: 3px 9px;
          border-radius: 6px;
          border: 1px solid rgba(255, 61, 56, 0.3);
          background: rgba(255, 61, 56, 0.08);
          color: #ff9d99;
          font-weight: 600;
          width: fit-content;
        }
        .ss-who {
          color: #9aa2c4;
        }
        .ss-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #3ecf8e;
        }

        @media (max-width: 860px) {
          .ss-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        @media (max-width: 560px) {
          #signal-sheet { padding: 64px 18px; }
          .ss-head,
          .ss-row {
            grid-template-columns: 1.1fr 1.1fr 0.9fr 24px;
            gap: 6px;
            padding: 10px 10px;
            font-size: 10.5px;
          }
          .ss-signal { padding: 2px 6px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ss-row { animation: none; opacity: 1; transform: none; }
          .ss-scan-dot, .ss-caret { animation: none; }
        }
      `}</style>
    </section>
  );
}
