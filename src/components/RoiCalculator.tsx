"use client";

import { useState } from "react";

// Cost follows volume via our real tiers - never a slider the prospect can drag down.
function planFor(leads: number): { key: string; price: number } {
  if (leads <= 15000) return { key: "pilot", price: 1500 };
  if (leads <= 40000) return { key: "growth", price: 2450 };
  return { key: "scale", price: 3450 };
}

const PLANS = [
  { key: "pilot", name: "Pilot", sub: "10k emails/mo", price: "$1,500/mo", emails: 10000 },
  { key: "growth", name: "Growth", sub: "25k emails/mo", price: "$2,450/mo", emails: 25000 },
  { key: "scale", name: "Scale", sub: "55k emails/mo", price: "$3,450/mo", emails: 55000 },
];

const money = (n: number): string =>
  n >= 1e6
    ? "$" + (n / 1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.0+$/, "") + "M"
    : "$" + Math.round(n).toLocaleString();
const moneyK = (n: number): string =>
  n >= 1e6
    ? "$" + (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
    : n >= 1000
    ? "$" + Math.round(n / 1000) + "K"
    : "$" + Math.round(n);
const int = (n: number): string => Math.round(n).toLocaleString();

function Arrow() {
  return (
    <div className="arrow">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function Slider({ label, value, display, min, max, step, onChange }: SliderProps) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="field">
      <div className="field-top">
        <span className="field-label">{label}</span>
        <span className="field-val mono">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` } as React.CSSProperties}
      />
    </div>
  );
}

export default function RoiCalculator() {
  const [leads, setLeads] = useState(25000);
  const [deal, setDeal] = useState(5000);
  const [closeRate, setCloseRate] = useState(18);
  const [margin, setMargin] = useState(70);
  const [pos, setPos] = useState(0.5);
  const [book, setBook] = useState(25);

  const plan = planFor(leads);
  const replies = leads * (pos / 100);
  const meetings = replies * (book / 100);
  const clients = meetings * (closeRate / 100);
  const revMonth = clients * deal;
  const revYear = revMonth * 12;
  const grossYear = revYear * (margin / 100);
  const roi = grossYear / (plan.price * 12);
  const cpm = meetings > 0 ? plan.price / meetings : 0;

  const pipe = [
    { n: int(leads), l: "LEADS / MO" },
    { n: int(replies), l: "REPLIES" },
    { n: int(meetings), l: "MEETINGS" },
    { n: clients < 10 ? clients.toFixed(1) : int(clients), l: "NEW CLIENTS" },
    { n: moneyK(revMonth), l: "REVENUE / MO", out: true },
  ];

  return (
    <div className="roi-calc">
      <div className="roi-hero">
        <div className="roi-badge">
          <span className="old">$297 strategy session</span>
          <span>·</span>
          <span className="new">FREE TODAY</span>
        </div>
        <h1>
          Feed it cold emails.<br />
          <span className="hd-em">Watch revenue come out.</span>
        </h1>
        <p className="roi-sub">Set your numbers and see what a campaign could realistically return. Everything updates live.</p>
      </div>

      {/* RESULT STAGE */}
      <div className="stage">
        <div className="stage-head">
          <div className="stage-cap">Projected new revenue / year</div>
          <div className="bigrev mono">{money(revYear)}</div>
          <div className="stage-meta">
            <span className="chip roi">
              Return&nbsp;<b className="mono">{(roi >= 10 ? Math.round(roi) : roi.toFixed(1)) + "x"}</b>
            </span>
            <span className="chip profit">
              Gross profit / yr&nbsp;<b className="mono">{money(grossYear)}</b>
            </span>
            <span className="chip">
              Cost / meeting&nbsp;<b className="mono">{money(cpm)}</b>
            </span>
          </div>
        </div>

        <div className="pipe">
          {pipe.map((node, i) => (
            <div key={node.l} style={{ display: "contents" }}>
              <div className={`node${node.out ? " out" : ""}`}>
                <div className="n mono">{node.n}</div>
                <div className="l">{node.l}</div>
              </div>
              {i < pipe.length - 1 && <Arrow />}
            </div>
          ))}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="controls">
        <div className="ctrl-head">Tune your numbers</div>

        <div className="plans">
          {PLANS.map((p) => (
            <button
              key={p.key}
              className={`plan${p.key === plan.key ? " on" : ""}`}
              onClick={() => setLeads(p.emails)}
            >
              <div className="plan-name">{p.name}</div>
              <div className="plan-sub">{p.sub}</div>
              <div className="plan-price">{p.price}</div>
            </button>
          ))}
        </div>

        <div className="sliders">
          <Slider label="Leads contacted / month" value={leads} display={leads.toLocaleString()} min={2000} max={60000} step={1000} onChange={setLeads} />
          <Slider label="Customer lifetime value" value={deal} display={"$" + deal.toLocaleString()} min={1000} max={25000} step={500} onChange={setDeal} />
          <Slider label="Your close rate" value={closeRate} display={closeRate + "%"} min={5} max={45} step={1} onChange={setCloseRate} />
          <Slider label="Gross profit margin" value={margin} display={margin + "%"} min={40} max={90} step={5} onChange={setMargin} />
          <Slider label="Positive reply rate" value={pos} display={pos + "%"} min={0.2} max={1.5} step={0.1} onChange={setPos} />
          <Slider label="Appointment booking rate" value={book} display={book + "%"} min={10} max={50} step={1} onChange={setBook} />
        </div>
      </div>

      <div className="cta-row">
        <a className="btn btn-red" href="/book-call/">Book a strategy call →</a>
        <a className="btn btn-ghost" href="https://calculator.bleedai.com/trials" target="_blank" rel="noopener noreferrer">Start with a trial</a>
      </div>

      <div className="disc">
        Honest estimates to sanity-check the opportunity, not a guarantee. Real results depend on your offer, market, list
        quality, and how fast your team follows up. Everything updates live as you move the sliders.
      </div>

      <style>{`
        .roi-calc { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; padding: 40px 24px 72px; }
        .roi-calc .mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace; font-variant-numeric: tabular-nums; }

        .roi-hero { text-align: center; padding: 8px 0 4px; }
        .roi-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.25); border-radius: 999px; padding: 5px 14px; margin-bottom: 18px; font-size: 12px; }
        .roi-badge .old { color: var(--muted); text-decoration: line-through; }
        .roi-badge .new { font-weight: 800; color: var(--green); }
        .roi-calc h1 { font-family: 'Inter', system-ui, sans-serif; font-size: clamp(30px,4.6vw,52px); font-weight: 900; line-height: 1.04; letter-spacing: -1.6px; color: var(--text); margin: 0; }
        .roi-sub { font-size: 14px; color: var(--sub); max-width: 500px; margin: 12px auto 0; line-height: 1.6; }

        .roi-calc .stage { margin: 20px 0 12px; background: linear-gradient(165deg,#15151f,#0f0f18); border: 1px solid var(--border2); border-radius: 18px; padding: 18px 22px; position: relative; overflow: hidden; }
        .roi-calc .stage::before { content: ''; position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 520px; height: 320px; background: radial-gradient(ellipse, rgba(177,19,15,.15), transparent 62%); pointer-events: none; }
        .roi-calc .stage-head { text-align: center; position: relative; margin-bottom: 12px; }
        .roi-calc .stage-cap { font-size: 11px; letter-spacing: 1.6px; text-transform: uppercase; color: var(--muted); font-weight: 700; margin-bottom: 4px; }
        .roi-calc .bigrev { font-size: clamp(42px,5.6vw,62px); font-weight: 900; letter-spacing: -2px; line-height: 1; background: linear-gradient(180deg,#ffffff,#c9d2e6); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 22px rgba(255,255,255,.10)); }
        .roi-calc .stage-meta { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
        .roi-calc .chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; border-radius: 999px; padding: 6px 13px; border: 1px solid var(--border2); background: var(--bg3); color: var(--sub); }
        .roi-calc .chip b { color: var(--text); }
        .roi-calc .chip.roi { border-color: rgba(177,19,15,.4); background: rgba(177,19,15,.12); color: #fff; }
        .roi-calc .chip.roi b { font-size: 15px; color: var(--red2); }
        .roi-calc .chip.profit b { color: var(--green); }

        .roi-calc .pipe { display: flex; align-items: stretch; gap: 0; position: relative; margin-top: 10px; }
        .roi-calc .node { flex: 1; text-align: center; background: var(--bg3); border: 1px solid var(--border); border-radius: 11px; padding: 9px 6px; position: relative; z-index: 1; }
        .roi-calc .node .n { font-size: clamp(16px,2.2vw,22px); font-weight: 900; letter-spacing: -.5px; color: var(--text); }
        .roi-calc .node .l { font-size: 9.5px; color: var(--sub); margin-top: 3px; letter-spacing: .3px; }
        .roi-calc .node.out { border-color: rgba(16,185,129,.35); background: linear-gradient(160deg, rgba(16,185,129,.08), var(--bg3)); }
        .roi-calc .node.out .n { color: var(--green); }
        .roi-calc .arrow { display: flex; align-items: center; justify-content: center; width: 26px; color: var(--muted); flex-shrink: 0; z-index: 1; }
        .roi-calc .arrow svg { width: 16px; height: 16px; }

        .roi-calc .controls { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 16px 22px; margin-bottom: 12px; }
        .roi-calc .ctrl-head { font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
        .roi-calc .plans { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; margin-bottom: 16px; }
        .roi-calc .plan { cursor: pointer; border: 1px solid var(--border2); background: var(--bg3); border-radius: 12px; padding: 8px 8px; text-align: center; transition: all .18s; }
        .roi-calc .plan:hover { border-color: rgba(177,19,15,.4); }
        .roi-calc .plan.on { border-color: var(--red); background: rgba(177,19,15,.1); }
        .roi-calc .plan-name { font-weight: 800; font-size: 14px; color: var(--text); }
        .roi-calc .plan-sub { font-size: 11px; color: var(--sub); margin-top: 3px; }
        .roi-calc .plan-price { font-size: 11px; color: var(--muted); margin-top: 4px; }
        .roi-calc .plan.on .plan-price { color: var(--red2); }

        .roi-calc .sliders { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 24px; }
        .roi-calc .field-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
        .roi-calc .field-label { font-size: 13px; font-weight: 600; color: var(--text); }
        .roi-calc .field-val { font-size: 15px; font-weight: 800; color: var(--red2); }
        .roi-calc input[type=range] { -webkit-appearance: none; appearance: none; width: 100%; height: 5px; border-radius: 999px; background: linear-gradient(90deg, var(--red) var(--fill,40%), var(--border2) var(--fill,40%)); outline: none; }
        .roi-calc input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 3px solid var(--red); cursor: pointer; box-shadow: 0 2px 9px rgba(177,19,15,.45); transition: transform .12s; }
        .roi-calc input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.14); }
        .roi-calc input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 3px solid var(--red); cursor: pointer; }

        .roi-calc .cta-row { display: flex; gap: 10px; }
        .roi-calc .btn { flex: 1; text-align: center; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px; border-radius: 11px; transition: all .15s; border: none; cursor: pointer; }
        .roi-calc .btn-red { background: var(--red); color: #fff; }
        .roi-calc .btn-red:hover { background: var(--red2); transform: translateY(-1px); }
        .roi-calc .btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border2); }
        .roi-calc .btn-ghost:hover { border-color: var(--sub); }
        .roi-calc .disc { text-align: center; color: var(--muted); font-size: 11px; max-width: 620px; margin: 14px auto 0; line-height: 1.6; }

        @media (max-width: 760px) {
          .roi-calc .pipe { flex-direction: column; gap: 0; }
          .roi-calc .arrow { width: 100%; height: 24px; transform: rotate(90deg); }
          .roi-calc .sliders { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
