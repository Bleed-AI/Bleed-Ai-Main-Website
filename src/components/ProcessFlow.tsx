"use client";

// Ambient "Process" section (home-test only).
// 3 panels, each with a looping mini-demo, joined by animated branch connectors.
// Pure CSS animations — no scroll trigger, lightweight.

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
      <circle r="2.4" fill="var(--pf-glow)" className="pf-spark">
        <animateMotion dur="2.6s" repeatCount="indefinite" path="M0 110 L40 110 L80 110" />
      </circle>
    </svg>
  </div>
);

const steps = [
  { day: "Day 1", label: "Email", icon: IconBolt, color: "#B1130F" },
  { day: "Day 3", label: "LinkedIn", icon: IconLinkedin, color: "#2f6fed" },
  { day: "Day 6", label: "Call", icon: IconPhone, color: "#10b981" },
];

const accounts = ["Fieldstone Group", "Northwind Labs", "Bramble & Co"];

const bars = [
  { h: 46, kind: "control" },
  { h: 78, kind: "variant" },
  { h: 40, kind: "control" },
  { h: 96, kind: "variant" },
];

export default function ProcessFlow() {
  return (
    <section id="process">
      <div className="pf-inner">
        <div className="pf-head">
          <div className="sec-label">The Process</div>
          <h2 className="pf-title">
            What happens <em>once we start?</em>
          </h2>
        </div>

        <div className="pf-grid">
          {/* PANEL 1 — account selection */}
          <div className="pf-col">
            <div className="pf-card">
              <div className="pf-card-title">Target account selection criteria</div>
              <div className="pf-accounts">
                {accounts.map((a, i) => (
                  <div key={a} className={`pf-acct${i === 1 ? " sel" : ""}`}>
                    <span className="pf-acct-name">{a}</span>
                    <span className="pf-acct-check">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7" />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pf-caption">Identify Pain Points</div>
          </div>

          <Connector />

          {/* PANEL 2 — multi-channel sequence */}
          <div className="pf-col">
            <div className="pf-card">
              <div className="pf-card-title">Multi-channel outreach setup</div>
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
            <div className="pf-caption">Build &amp; Automate</div>
          </div>

          <Connector />

          {/* PANEL 3 — A/B testing chart */}
          <div className="pf-col">
            <div className="pf-card">
              <div className="pf-card-title">A/B testing of messaging</div>
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
                  <span><i className="dot variant" /> Variant B</span>
                </div>
              </div>
            </div>
            <div className="pf-caption">Improve &amp; Iterate</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        #process {
          --pf-line: rgba(120, 220, 170, 0.4);
          --pf-glow: #10b981;
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
          color: #ff6b67;
        }
        .pf-grid {
          display: grid;
          grid-template-columns: 1fr 80px 1fr 80px 1fr;
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
          padding: 26px 24px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(165deg, #12121b 0%, #0b0b12 100%);
          box-shadow: 0 24px 60px -28px rgba(0, 0, 0, 0.8);
          overflow: hidden;
        }
        .pf-card-title {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 13px;
          letter-spacing: 0.3px;
          color: #b9c0d8;
          text-align: center;
          margin-bottom: 22px;
        }
        .pf-caption {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: 25px;
          font-style: italic;
          text-align: center;
          color: #e8ebf5;
        }

        /* ---------- Panel 1: accounts ---------- */
        .pf-accounts {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pf-acct {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid transparent;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 14px;
          color: #6a7192;
          position: relative;
        }
        .pf-acct-name {
          position: relative;
        }
        .pf-acct-name::after {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
        }
        .pf-acct-check {
          opacity: 0;
          color: #10b981;
          display: flex;
        }
        /* unselected rows: strike-through pulse */
        .pf-acct:not(.sel) {
          animation: acctStrike 4.5s ease-in-out infinite;
        }
        .pf-acct:not(.sel) .pf-acct-name::after {
          animation: acctLine 4.5s ease-in-out infinite;
        }
        /* selected row: highlight + check */
        .pf-acct.sel {
          animation: acctSel 4.5s ease-in-out infinite;
        }
        .pf-acct.sel .pf-acct-name {
          color: #eef1fa;
        }
        .pf-acct.sel .pf-acct-check {
          animation: acctCheck 4.5s ease-in-out infinite;
        }
        @keyframes acctSel {
          0%, 20% {
            border-color: transparent;
            background: transparent;
          }
          35%, 92% {
            border-color: rgba(16, 185, 129, 0.55);
            background: rgba(16, 185, 129, 0.08);
          }
          100% {
            border-color: transparent;
            background: transparent;
          }
        }
        @keyframes acctCheck {
          0%, 25% { opacity: 0; transform: scale(0.6); }
          40%, 92% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.6); }
        }
        @keyframes acctStrike {
          0%, 25% { color: #6a7192; }
          45%, 92% { color: #3f455e; }
          100% { color: #6a7192; }
        }
        @keyframes acctLine {
          0%, 25% { transform: scaleX(0); }
          45%, 92% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
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
          background: linear-gradient(#B1130F, #10b981);
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
          background: linear-gradient(#12b981, #0c8f64);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.25);
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
        .pf-legend .dot.variant { background: #12b981; }

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
          .pf-acct.sel { border-color: rgba(16,185,129,0.5); background: rgba(16,185,129,0.08); }
          .pf-acct.sel .pf-acct-check { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
