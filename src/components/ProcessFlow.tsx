"use client";

// Ambient "Process" section (home-test only).
// 3 panels, each with a looping mini-demo, joined by animated branch connectors.
// Pure CSS animations — no scroll trigger, lightweight. Brand-red themed.

const IconBolt = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L4.5 13.5H11L9.5 22L18.5 9.5H12L13 2z" />
  </svg>
);
const IconLinkedin = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.94 5A1.94 1.94 0 113.06 5a1.94 1.94 0 013.88 0zM3.4 8.5h3.1V21H3.4V8.5zm5.2 0h2.97v1.7h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.73V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H8.6V8.5z" />
  </svg>
);
const IconPhone = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4h2.1c.6 0 1.13.4 1.29.99l.9 3.2a1.35 1.35 0 01-.35 1.31l-1.2 1.2a12 12 0 005.06 5.06l1.2-1.2c.35-.35.86-.48 1.31-.35l3.2.9c.59.16.99.69.99 1.29v2.1c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 014 5.5z" />
  </svg>
);

const Connector = () => (
  <div className="pf-connector" aria-hidden="true">
    <svg viewBox="0 0 80 220" preserveAspectRatio="none">
      <g fill="none" stroke="var(--pf-line)" strokeWidth="1.4" strokeDasharray="4 5" className="pf-dash">
        <path d="M0 70 C22 70 26 110 40 110" />
        <path d="M0 110 L40 110" />
        <path d="M0 150 C22 150 26 110 40 110" />
        <path d="M40 110 C54 110 58 70 80 70" />
        <path d="M40 110 L80 110" />
        <path d="M40 110 C54 110 58 150 80 150" />
      </g>
      <circle r="2.6" fill="var(--pf-glow)" className="pf-spark">
        <animateMotion dur="2.6s" repeatCount="indefinite" path="M0 110 L40 110 L80 110" />
      </circle>
    </svg>
  </div>
);

const steps = [
  { day: "Day 1", label: "Email", icon: IconBolt, color: "#ff5b56" },
  { day: "Day 3", label: "LinkedIn", icon: IconLinkedin, color: "#4f8bff" },
  { day: "Day 6", label: "Call", icon: IconPhone, color: "#22c98a" },
];

const sources = ["Apollo", "Sales Navigator", "Prospeo", "Apify", "Serper"];

const bars = [
  { h: 44, kind: "control" },
  { h: 74, kind: "variant" },
  { h: 38, kind: "control" },
  { h: 96, kind: "variant" },
];

const panelMeta = [
  { step: "01", title: "// sourced · enriched · verified", caption: "We Find The Right Buyers" },
  { step: "02", title: "// email · linkedin · calls, in sync", caption: "We Run Every Channel" },
  { step: "03", title: "// testing every message we ship", caption: "We Optimize To Win" },
];

export default function ProcessFlow() {
  return (
    <section id="process">
      <div className="pf-inner">
        <div className="pf-head">
          <div className="sec-label">The Cold-to-Sold Process</div>
          <h2 className="pf-title">
            From a cold list to <em>booked calls.</em>
          </h2>
          <p className="pf-sub">Three moves. One system. Fully done-for-you.</p>
        </div>

        <div className="pf-grid">
          {/* PANEL 1 — account selection */}
          <div className="pf-col">
            <div className="pf-card">
              <span className="pf-step">{panelMeta[0].step}</span>
              <div className="pf-card-title">{panelMeta[0].title}</div>
              <div className="pf-src">
                <div className="pf-src-cap">12+ sources</div>
                <div className="pf-src-chips">
                  {sources.map((s, i) => (
                    <span key={s} className="pf-src-chip" style={{ animationDelay: `${i * 0.3}s` }}>
                      {s}
                    </span>
                  ))}
                  <span className="pf-src-chip more" style={{ animationDelay: `${sources.length * 0.3}s` }}>
                    +7
                  </span>
                </div>

                <span className="pf-src-pipe" />

                <div className="pf-src-node enrich">
                  <span className="pf-src-dot" />
                  <span>Enrich — Clay · 35 fields</span>
                </div>

                <span className="pf-src-pipe" />

                <div className="pf-src-node verify">
                  <span className="pf-src-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  </span>
                  <span>Verified buyer</span>
                </div>
              </div>
            </div>
            <div className="pf-caption">{panelMeta[0].caption}</div>
          </div>

          <Connector />

          {/* PANEL 2 — multi-channel sequence */}
          <div className="pf-col">
            <div className="pf-card">
              <span className="pf-step">{panelMeta[1].step}</span>
              <div className="pf-card-title">{panelMeta[1].title}</div>
              <div className="pf-seq">
                <span className="pf-seq-rail">
                  <span className="pf-seq-fill" />
                </span>
                {steps.map((s, i) => (
                  <div key={s.label} className="pf-seq-row" style={{ animationDelay: `${i * 0.9}s`, ["--c" as string]: s.color } as React.CSSProperties}>
                    <span className="pf-seq-day">{s.day}</span>
                    <span className="pf-seq-ico">{s.icon}</span>
                    <span className="pf-seq-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pf-caption">{panelMeta[1].caption}</div>
          </div>

          <Connector />

          {/* PANEL 3 — A/B testing chart */}
          <div className="pf-col">
            <div className="pf-card">
              <span className="pf-step">{panelMeta[2].step}</span>
              <div className="pf-card-title">{panelMeta[2].title}</div>
              <div className="pf-chart">
                <div className="pf-bars">
                  {bars.map((b, i) => (
                    <span
                      key={i}
                      className={`pf-bar ${b.kind}`}
                      style={{ height: `${b.h}%`, animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
                <div className="pf-baseline" />
                <div className="pf-legend">
                  <span><i className="dot control" /> Control</span>
                  <span><i className="dot variant" /> Winner</span>
                </div>
              </div>
            </div>
            <div className="pf-caption">{panelMeta[2].caption}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        #process {
          --pf-line: rgba(255, 90, 80, 0.38);
          --pf-glow: #ff6b67;
          position: relative;
          padding: 90px 22px;
        }
        .pf-inner {
          max-width: 1216px;
          margin: 0 auto;
        }
        .pf-head {
          text-align: center;
          margin-bottom: 54px;
        }
        .pf-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(32px, 5vw, 58px);
          font-weight: 400;
          letter-spacing: -0.5px;
          line-height: 1.05;
          color: #eaeef8;
        }
        .pf-title em {
          font-style: italic;
          background: linear-gradient(90deg, #ff3d38, #ff8a86);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .pf-sub {
          margin-top: 14px;
          font-size: 15.5px;
          color: #9099b8;
        }
        .pf-grid {
          display: grid;
          grid-template-columns: 1fr 78px 1fr 78px 1fr;
          align-items: stretch;
          gap: 0;
        }
        .pf-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .pf-card {
          position: relative;
          flex: 1;
          padding: 30px 24px 26px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(165deg, #14141f 0%, #0b0b12 100%);
          box-shadow: 0 24px 60px -28px rgba(0, 0, 0, 0.8);
          overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.35s;
        }
        .pf-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #B1130F, #ff6b67);
        }
        .pf-card:hover {
          border-color: rgba(255, 90, 80, 0.4);
          box-shadow: 0 24px 70px -24px rgba(0, 0, 0, 0.9),
            0 0 40px -12px rgba(255, 61, 56, 0.4);
        }
        .pf-step {
          position: absolute;
          top: 16px;
          right: 18px;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 107, 103, 0.4);
        }
        .pf-card-title {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12.5px;
          letter-spacing: 0.2px;
          color: #ff9d99;
          margin-bottom: 22px;
          padding-right: 34px;
        }
        .pf-caption {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: 26px;
          font-style: italic;
          text-align: center;
          color: #f0f2fa;
        }

        /* ---------- Panel 1: sources pipeline ---------- */
        .pf-src {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
        }
        .pf-src-cap {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #6a7192;
        }
        .pf-src-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 7px;
          max-width: 270px;
        }
        .pf-src-chip {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11.5px;
          font-weight: 600;
          color: #c7cbe0;
          padding: 5px 10px;
          border-radius: 7px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #0d0d15;
          opacity: 0;
          animation: srcChip 4s ease-in-out infinite;
        }
        .pf-src-chip.more {
          color: #ff9d99;
          border-color: rgba(255, 61, 56, 0.3);
          background: rgba(255, 61, 56, 0.08);
        }
        @keyframes srcChip {
          0%, 6% { opacity: 0; transform: translateY(-6px) scale(0.9); }
          20%, 88% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-6px) scale(0.9); }
        }
        .pf-src-pipe {
          width: 2px;
          height: 15px;
          background: linear-gradient(#ff3d38, transparent);
          opacity: 0.5;
        }
        .pf-src-node {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: #0d0d15;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12.5px;
          font-weight: 600;
          color: #e4e7f2;
        }
        .pf-src-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ff6b67;
          box-shadow: 0 0 10px #ff6b67;
          animation: srcPulse 1.6s ease-in-out infinite;
        }
        @keyframes srcPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .pf-src-node.verify {
          border-color: rgba(62, 207, 142, 0.4);
          background: rgba(62, 207, 142, 0.08);
        }
        .pf-src-check {
          display: flex;
          color: #3ecf8e;
          animation: srcCheck 4s ease-in-out infinite;
        }
        @keyframes srcCheck {
          0%, 55% { opacity: 0; transform: scale(0.5); }
          70%, 92% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.5); }
        }

        /* ---------- Panel 2: sequence ---------- */
        .pf-seq {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-left: 16px;
        }
        .pf-seq-rail {
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          overflow: hidden;
        }
        .pf-seq-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(#ff3d38, #B1130F);
          transform: scaleY(0);
          transform-origin: top;
          animation: seqFill 3s ease-in-out infinite;
        }
        @keyframes seqFill {
          0% { transform: scaleY(0); }
          75%, 100% { transform: scaleY(1); }
        }
        .pf-seq-row {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px 15px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: #0d0d15;
          opacity: 0;
          animation: seqRow 3s ease-in-out infinite;
        }
        @keyframes seqRow {
          0%, 10% { opacity: 0; transform: translateX(-8px); }
          30%, 100% { opacity: 1; transform: translateX(0); }
        }
        .pf-seq-day {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12.5px;
          color: #6a7192;
          min-width: 42px;
        }
        .pf-seq-ico {
          display: flex;
          color: var(--c);
        }
        .pf-seq-label {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 14px;
          font-weight: 600;
          color: #e4e7f2;
        }

        /* ---------- Panel 3: chart ---------- */
        .pf-chart {
          position: relative;
        }
        .pf-bars {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 16px;
          height: 150px;
        }
        .pf-bar {
          width: 34px;
          border-radius: 5px 5px 0 0;
          transform: scaleY(0);
          transform-origin: bottom;
          animation: barGrow 3.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        .pf-bar.control {
          background: linear-gradient(#3a4160, #2a2f47);
        }
        .pf-bar.variant {
          background: linear-gradient(#ff5b56, #B1130F);
          box-shadow: 0 0 22px rgba(255, 61, 56, 0.3);
        }
        @keyframes barGrow {
          0% { transform: scaleY(0); }
          40%, 88% { transform: scaleY(1); }
          100% { transform: scaleY(0); }
        }
        .pf-baseline {
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
          margin-top: 2px;
        }
        .pf-legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 16px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12.5px;
          color: #9099b8;
        }
        .pf-legend span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }
        .pf-legend .dot {
          width: 10px;
          height: 10px;
          border-radius: 3px;
        }
        .pf-legend .dot.control { background: #3a4160; }
        .pf-legend .dot.variant { background: #ff3d38; }

        /* ---------- connectors ---------- */
        .pf-connector {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pf-connector svg {
          width: 100%;
          height: 220px;
        }
        .pf-dash {
          animation: dashFlow 1.4s linear infinite;
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -18; }
        }

        @media (max-width: 900px) {
          .pf-grid {
            grid-template-columns: 1fr;
            gap: 26px;
          }
          .pf-connector {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-dash,
          .pf-spark,
          .pf-seq-fill,
          .pf-seq-row,
          .pf-bar,
          .pf-acct,
          .pf-acct .pf-acct-name::after,
          .pf-acct .pf-acct-check {
            animation: none !important;
          }
          .pf-seq-row { opacity: 1; }
          .pf-bar { transform: scaleY(1); }
          .pf-acct.sel { border-color: rgba(255, 61, 56, 0.5); background: rgba(255, 61, 56, 0.09); }
          .pf-acct.sel .pf-acct-check { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
