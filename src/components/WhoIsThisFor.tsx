"use client";

import Reveal from "@/components/Reveal";

const fit = [
  "Paying customers you can name",
  "A sales conversation before the deal",
  "Thousands of possible buyers",
  "A small sales team that already believes in outbound",
];

const notYet = [
  "Pre-revenue, still finding the product",
  "Self-serve tools at a few dollars a seat",
  "You want ads or SEO",
  "You sell outbound or lead generation yourself",
];

export default function WhoIsThisFor() {
  return (
    <section id="who-is-this-for">
      <div className="wf-inner">
        <Reveal className="sec-label" style={{ textAlign: "center" }}>
          Honest fit
        </Reveal>
        <Reveal as="h2" className="wf-title">
          Who this is <em>for.</em>
        </Reveal>

        <div className="wf-grid">
          <Reveal className="wf-col fit">
            <div className="wf-col-head">
              <span className="wf-col-ico good">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
              </span>
              Great fit
            </div>
            <ul>
              {fit.map((f) => (
                <li key={f}>
                  <span className="wf-dot good" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="wf-col no" delay={90}>
            <div className="wf-col-head">
              <span className="wf-col-ico bad">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
              Not yet
            </div>
            <ul>
              {notYet.map((f) => (
                <li key={f}>
                  <span className="wf-dot bad" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        #who-is-this-for {
          position: relative;
          padding: 90px 22px;
        }
        .wf-inner {
          max-width: 920px;
          margin: 0 auto;
        }
        .wf-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(28px, 4.2vw, 48px);
          font-weight: 400;
          text-align: center;
          color: #eaeef8;
          margin: 6px auto 46px;
        }
        .wf-title em {
          font-style: italic;
          background: linear-gradient(90deg, #ff3d38, #ff8a86);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .wf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .wf-col {
          padding: 28px 26px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
        }
        .wf-col.fit {
          border-color: rgba(62, 207, 142, 0.25);
        }
        .wf-col-head {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: #eaeef8;
          margin-bottom: 20px;
        }
        .wf-col-ico {
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
        }
        .wf-col-ico.good {
          color: #3ecf8e;
          background: rgba(62, 207, 142, 0.1);
          border: 1px solid rgba(62, 207, 142, 0.3);
        }
        .wf-col-ico.bad {
          color: #6a7192;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .wf-col ul {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .wf-col li {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          font-size: 14.5px;
          line-height: 1.5;
          color: #c7cbe0;
        }
        .wf-col.no li {
          color: #8089a6;
        }
        .wf-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 7px;
        }
        .wf-dot.good {
          background: #3ecf8e;
          box-shadow: 0 0 8px #3ecf8e;
        }
        .wf-dot.bad {
          background: #4a4f68;
        }

        @media (max-width: 680px) {
          #who-is-this-for { padding: 64px 18px; }
          .wf-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
