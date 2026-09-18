"use client";

import { useEffect, useState } from "react";

// Ambient "Process" section (home-test only).
// 3 columns; each column CROSSFADES through multiple mini-demos on a loop,
// joined by animated branch connectors. Pure CSS demos, brand-red themed.

/* ---------------- shared tiny icons ---------------- */
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

/* ---------------- demo: account selection ---------------- */
const accounts = ["Vantage Peak", "Halcyon Labs", "Cobalt & Rowe"];
const DemoAccounts = () => (
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
);

/* ---------------- demo: value proposition V1 -> V2 ---------------- */
const DemoValueProp = () => (
  <div className="pf-vp">
    <div className="pf-vp-row v1">
      <span className="pf-vp-tag">V1</span>
      <span>We help teams grow revenue faster.</span>
    </div>
    <div className="pf-vp-row v2">
      <span className="pf-vp-tag">V2</span>
      <span>Stop paying three reps to clean the CRM.</span>
    </div>
  </div>
);

/* ---------------- demo: multi-channel sequence ---------------- */
const steps = [
  { day: "Day 1", label: "Email", icon: IconBolt, color: "#ff5b56" },
  { day: "Day 3", label: "LinkedIn", icon: IconLinkedin, color: "#4f8bff" },
  { day: "Day 6", label: "Call", icon: IconPhone, color: "#22c98a" },
];
const DemoSequence = () => (
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
);

/* ---------------- demo: lead enrichment ---------------- */
const enrich = [
  { label: "Title", value: "VP RevOps", badge: "in", bg: "#0A66C2" },
  { label: "Stack", value: "HubSpot", badge: "H", bg: "#ff7a59" },
  { label: "Signal", value: "Hiring 3 AEs", badge: "+", bg: "#B1130F" },
];
const DemoEnrich = () => (
  <div className="pf-enrich">
    {enrich.map((e, i) => (
      <div key={e.label} className="pf-enrich-row" style={{ animationDelay: `${i * 0.5}s` }}>
        <span className="pf-enrich-label">{e.label}</span>
        <span className="pf-enrich-value">{e.value}</span>
        <span className="pf-enrich-badge" style={{ background: e.bg }}>{e.badge}</span>
      </div>
    ))}
  </div>
);

/* ---------------- demo: bar chart ---------------- */
const bars = [
  { h: 44, kind: "control" },
  { h: 74, kind: "variant" },
  { h: 38, kind: "control" },
  { h: 96, kind: "variant" },
];
const DemoBars = () => (
  <div className="pf-chart">
    <div className="pf-bars">
      {bars.map((b, i) => (
        <span key={i} className={`pf-bar ${b.kind}`} style={{ height: `${b.h}%`, animationDelay: `${i * 0.18}s` }} />
      ))}
    </div>
    <div className="pf-baseline" />
    <div className="pf-legend">
      <span><i className="dot control" /> Control</span>
      <span><i className="dot variant" /> Winner</span>
    </div>
  </div>
);

/* ---------------- demo: line chart (spend vs pipeline) ---------------- */
const DemoLines = () => (
  <div className="pf-chart">
    <svg className="pf-lines" viewBox="0 0 300 150" preserveAspectRatio="none">
      <line x1="10" y1="60" x2="290" y2="60" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <line x1="10" y1="105" x2="290" y2="105" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <polyline className="pf-line-path spend" points="10,128 70,128 70,116 150,116 150,104 220,104 220,98 290,98" />
      <polyline className="pf-line-path pipe" points="10,124 60,124 60,96 130,96 130,66 200,66 200,40 290,26" />
    </svg>
    <div className="pf-baseline" />
    <div className="pf-legend">
      <span><i className="dot spend" /> Spend</span>
      <span><i className="dot pipe" /> Pipeline</span>
    </div>
  </div>
);

/* ---------------- columns: each cycles through slides ---------------- */
type Slide = { title: string; render: React.ReactNode };
const columns: { step: string; caption: string; slides: Slide[] }[] = [
  {
    step: "01",
    caption: "We Find The Right Buyers",
    slides: [
      { title: "// selecting best-fit accounts", render: <DemoAccounts /> },
      { title: "// sharpening your value prop", render: <DemoValueProp /> },
    ],
  },
  {
    step: "02",
    caption: "We Run Every Channel",
    slides: [
      { title: "// email · linkedin · calls, in sync", render: <DemoSequence /> },
      { title: "// automated lead enrichment", render: <DemoEnrich /> },
    ],
  },
  {
    step: "03",
    caption: "We Optimize To Win",
    slides: [
      { title: "// a/b testing every message", render: <DemoBars /> },
      { title: "// weekly performance analysis", render: <DemoLines /> },
    ],
  },
];

function Column({ col, tick }: { col: (typeof columns)[0]; tick: number }) {
  const active = tick % col.slides.length;
  return (
    <div className="pf-col">
      <div className="pf-card">
        <span className="pf-step">{col.step}</span>
        <div className="pf-stage">
          {col.slides.map((s, i) => (
            <div key={i} className={`pf-slide${i === active ? " on" : ""}`}>
              <div className="pf-card-title">{s.title}</div>
              {s.render}
            </div>
          ))}
        </div>
      </div>
      <div className="pf-caption">{col.caption}</div>
    </div>
  );
}

export default function ProcessFlow() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4400);
    return () => clearInterval(id);
  }, []);

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
          <Column col={columns[0]} tick={tick} />
          <Connector />
          <Column col={columns[1]} tick={tick} />
          <Connector />
          <Column col={columns[2]} tick={tick} />
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
          background: linear-gradient(90deg, #b1130f, #ff6b67);
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
          z-index: 2;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 107, 103, 0.4);
        }
        .pf-stage {
          position: relative;
          min-height: 250px;
        }
        .pf-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          pointer-events: none;
        }
        .pf-slide.on {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
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

        /* Panel 1a: accounts */
        .pf-accounts { display: flex; flex-direction: column; gap: 12px; }
        .pf-acct {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; border-radius: 10px; border: 1px solid transparent;
          font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 14px;
          color: #6a7192; position: relative;
        }
        .pf-acct-name { position: relative; }
        .pf-acct-name::after {
          content: ""; position: absolute; left: 0; top: 50%; width: 100%; height: 1px;
          background: currentColor; transform: scaleX(0); transform-origin: left;
        }
        .pf-acct-check { opacity: 0; color: #ff6b67; display: flex; }
        .pf-acct:not(.sel) { animation: acctStrike 4.5s ease-in-out infinite; }
        .pf-acct:not(.sel) .pf-acct-name::after { animation: acctLine 4.5s ease-in-out infinite; }
        .pf-acct.sel { animation: acctSel 4.5s ease-in-out infinite; }
        .pf-acct.sel .pf-acct-name { color: #eef1fa; }
        .pf-acct.sel .pf-acct-check { animation: acctCheck 4.5s ease-in-out infinite; }
        @keyframes acctSel {
          0%, 20% { border-color: transparent; background: transparent; }
          35%, 92% { border-color: rgba(255, 61, 56, 0.5); background: rgba(255, 61, 56, 0.09); }
          100% { border-color: transparent; background: transparent; }
        }
        @keyframes acctCheck {
          0%, 25% { opacity: 0; transform: scale(0.6); }
          40%, 92% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.6); }
        }
        @keyframes acctStrike { 0%, 25% { color: #6a7192; } 45%, 92% { color: #3f455e; } 100% { color: #6a7192; } }
        @keyframes acctLine { 0%, 25% { transform: scaleX(0); } 45%, 92% { transform: scaleX(1); } 100% { transform: scaleX(0); } }

        /* Panel 1b: value prop */
        .pf-vp { display: flex; flex-direction: column; gap: 14px; }
        .pf-vp-row {
          display: flex; gap: 12px; align-items: flex-start;
          padding: 16px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.07);
          font-size: 15px; line-height: 1.4;
        }
        .pf-vp-tag {
          font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 11px;
          color: #6a7192; padding-top: 2px;
        }
        .pf-vp-row.v1 { color: #6a7192; }
        .pf-vp-row.v2 {
          color: #f0f2fa; font-weight: 600;
          border-color: rgba(255, 61, 56, 0.45);
          background: rgba(255, 61, 56, 0.08);
          animation: vpPop 4.5s ease-in-out infinite;
        }
        .pf-vp-row.v2 .pf-vp-tag { color: #ff6b67; }
        @keyframes vpPop {
          0%, 20% { border-color: rgba(255,255,255,0.07); background: transparent; }
          35%, 100% { border-color: rgba(255, 61, 56, 0.45); background: rgba(255, 61, 56, 0.08); }
        }

        /* Panel 2a: sequence */
        .pf-seq { position: relative; display: flex; flex-direction: column; gap: 12px; padding-left: 16px; }
        .pf-seq-rail {
          position: absolute; left: 0; top: 8px; bottom: 8px; width: 2px;
          background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden;
        }
        .pf-seq-fill {
          position: absolute; inset: 0; background: linear-gradient(#ff3d38, #b1130f);
          transform: scaleY(0); transform-origin: top; animation: seqFill 3s ease-in-out infinite;
        }
        @keyframes seqFill { 0% { transform: scaleY(0); } 75%, 100% { transform: scaleY(1); } }
        .pf-seq-row {
          display: flex; align-items: center; gap: 11px; padding: 13px 15px; border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08); background: #0d0d15; opacity: 0;
          animation: seqRow 3s ease-in-out infinite;
        }
        @keyframes seqRow { 0%, 10% { opacity: 0; transform: translateX(-8px); } 30%, 100% { opacity: 1; transform: translateX(0); } }
        .pf-seq-day { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 12.5px; color: #6a7192; min-width: 42px; }
        .pf-seq-ico { display: flex; color: var(--c); }
        .pf-seq-label { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 14px; font-weight: 600; color: #e4e7f2; }

        /* Panel 2b: enrichment */
        .pf-enrich { display: flex; flex-direction: column; gap: 12px; }
        .pf-enrich-row {
          display: flex; align-items: center; gap: 12px; padding: 14px 15px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08); background: #0d0d15; opacity: 0;
          animation: seqRow 3.4s ease-in-out infinite;
        }
        .pf-enrich-label {
          font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 12px; color: #6a7192; min-width: 48px;
        }
        .pf-enrich-value { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 14px; font-weight: 600; color: #e4e7f2; flex: 1; }
        .pf-enrich-badge {
          width: 26px; height: 26px; border-radius: 7px; display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: #fff;
        }

        /* Panel 3a: bars */
        .pf-chart { position: relative; }
        .pf-bars { display: flex; align-items: flex-end; justify-content: center; gap: 16px; height: 150px; }
        .pf-bar {
          width: 34px; border-radius: 5px 5px 0 0; transform: scaleY(0); transform-origin: bottom;
          animation: barGrow 3.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        .pf-bar.control { background: linear-gradient(#3a4160, #2a2f47); }
        .pf-bar.variant { background: linear-gradient(#ff5b56, #b1130f); box-shadow: 0 0 22px rgba(255, 61, 56, 0.3); }
        @keyframes barGrow { 0% { transform: scaleY(0); } 40%, 88% { transform: scaleY(1); } 100% { transform: scaleY(0); } }
        .pf-baseline { height: 1px; background: rgba(255, 255, 255, 0.12); margin-top: 2px; }
        .pf-legend {
          display: flex; justify-content: center; gap: 20px; margin-top: 16px;
          font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 12.5px; color: #9099b8;
        }
        .pf-legend span { display: inline-flex; align-items: center; gap: 7px; }
        .pf-legend .dot { width: 10px; height: 10px; border-radius: 3px; }
        .pf-legend .dot.control { background: #3a4160; }
        .pf-legend .dot.variant { background: #ff3d38; }
        .pf-legend .dot.spend { background: #4f8bff; }
        .pf-legend .dot.pipe { background: #ff3d38; }

        /* Panel 3b: line chart */
        .pf-lines { width: 100%; height: 150px; }
        .pf-line-path { fill: none; stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; stroke-dasharray: 640; stroke-dashoffset: 640; animation: drawLine 3.8s ease-in-out infinite; }
        .pf-line-path.spend { stroke: #4f8bff; }
        .pf-line-path.pipe { stroke: #ff3d38; filter: drop-shadow(0 0 6px rgba(255,61,56,0.4)); animation-delay: 0.25s; }
        @keyframes drawLine { 0% { stroke-dashoffset: 640; } 55%, 90% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 640; } }

        /* connectors */
        .pf-connector { display: flex; align-items: center; justify-content: center; }
        .pf-connector svg { width: 100%; height: 220px; }
        .pf-dash { animation: dashFlow 1.4s linear infinite; }
        @keyframes dashFlow { to { stroke-dashoffset: -18; } }

        @media (max-width: 900px) {
          .pf-grid { grid-template-columns: 1fr; gap: 26px; }
          .pf-connector { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-dash, .pf-spark, .pf-seq-fill, .pf-seq-row, .pf-enrich-row, .pf-bar,
          .pf-acct, .pf-acct .pf-acct-name::after, .pf-acct .pf-acct-check,
          .pf-vp-row.v2, .pf-line-path {
            animation: none !important;
          }
          .pf-seq-row, .pf-enrich-row { opacity: 1; }
          .pf-bar { transform: scaleY(1); }
          .pf-line-path { stroke-dashoffset: 0; }
          .pf-acct.sel { border-color: rgba(255, 61, 56, 0.5); background: rgba(255, 61, 56, 0.09); }
          .pf-acct.sel .pf-acct-check { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
