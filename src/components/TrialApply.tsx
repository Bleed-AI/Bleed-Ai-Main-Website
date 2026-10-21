"use client";

import { useState } from "react";

// n8n webhook that records the lead in Supabase and posts to the
// #trial-applications Slack channel.
const WEBHOOK_URL = "https://bleedai.app.n8n.cloud/webhook/bleedai-trial";

const CALENDLY = "https://calendly.com/bleedai/vip-invite-only?hide_gdpr_banner=1";
const SPRINT_URL = "https://calculator.bleedai.com/sprint";
const CALC_URL = "https://calculator.bleedai.com";

// All routing thresholds live here so they are easy to change.
// Under $2K a year is too low for outbound to pay back, so it never counts as a fit.
const ROUTING = {
  fit: { customers: "repeat", acvOk: ["5to10", "10to20", "20to50", "50to100", "100plus"], budget: "3plus" },
  someCustomers: ["few", "repeat"],
  budgetAtLeast1k: ["1to3", "3plus"],
};

type Answers = { customers: string; acv: string; budget: string; website: string; email: string };
type QKey = "customers" | "acv" | "budget";
type Question = { key: QKey; label: string; grid?: boolean; options: { v: string; l: string }[] };

const questions: Question[] = [
  {
    key: "customers",
    label: "How many customers pay you today, and do they keep paying?",
    options: [
      { v: "none", l: "None yet" },
      { v: "few", l: "A few, mostly one-off" },
      { v: "repeat", l: "3+ paying, coming back or on contract" },
    ],
  },
  {
    key: "acv",
    label: "What is a typical customer worth to you in a year?",
    grid: true,
    options: [
      { v: "u2k", l: "Under $2K" },
      { v: "2to5", l: "$2K to $5K" },
      { v: "5to10", l: "$5K to $10K" },
      { v: "10to20", l: "$10K to $20K" },
      { v: "20to50", l: "$20K to $50K" },
      { v: "50to100", l: "$50K to $100K" },
      { v: "100plus", l: "$100K+" },
    ],
  },
  {
    key: "budget",
    label: "Once outbound works, what could you put into it each month?",
    options: [
      { v: "u1k", l: "Under $1K" },
      { v: "1to3", l: "$1K to $3K" },
      { v: "3plus", l: "$3K+" },
    ],
  },
];

const services = [
  "Email outreach",
  "LinkedIn outreach",
  "Direct mail",
  "Warm phone follow-up",
  "AI follow-up on every reply",
  "Blog posts for SEO",
];

function routeFor(a: Answers): "fit" | "sprint" | "calculator" {
  const acvOk = ROUTING.fit.acvOk.includes(a.acv);
  const budget3 = a.budget === ROUTING.fit.budget;
  if (a.customers === ROUTING.fit.customers && acvOk && budget3) return "fit";
  const someCustomers = ROUTING.someCustomers.includes(a.customers);
  const budget1 = ROUTING.budgetAtLeast1k.includes(a.budget);
  if (someCustomers && budget1) return "sprint";
  return "calculator";
}

export default function TrialApply() {
  const [a, setA] = useState<Answers>({ customers: "", acv: "", budget: "", website: "", email: "" });
  const [result, setResult] = useState<"fit" | "sprint" | "calculator" | null>(null);
  const [sending, setSending] = useState(false);

  const ready = a.customers && a.acv && a.budget && a.website.trim() && a.email.trim();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    setSending(true);
    const route = routeFor(a);
    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...a, route, source: "bleedai.com/trial" }),
        });
      } catch {
        // never block the visitor on a webhook error
      }
    }
    setSending(false);
    setResult(route);
  };

  return (
    <>
      {result ? (
      <div className="ta-result">
        {result === "fit" && (
          <>
            <div className="ta-result-badge good">Looks like a fit</div>
            <h3 className="ta-result-title">Let&apos;s book your copy call.</h3>
            <p className="ta-result-sub">Pick a time that works. We will map the trial on the call.</p>
            <div className="ta-cal">
              <iframe
                src={CALENDLY}
                title="Book a call"
                width="100%"
                height="640"
                frameBorder="0"
              />
            </div>
          </>
        )}

        {result !== "fit" && (
          <>
            <h3 className="ta-result-title">Here is the fastest way to start.</h3>
            <p className="ta-result-sub">
              We only run a few trials a month and keep them for products with repeat customers.
              You can start now with one of these.
            </p>
            <div className="ta-cards">
              {(result === "sprint"
                ? [
                    { k: "Sprint", v: "$2,950 once. Your market mapped and tested in six weeks.", href: SPRINT_URL, cta: "Start a Sprint" },
                    { k: "Single campaign", v: "Launch one campaign for under $1K on the calculator.", href: CALC_URL, cta: "Open the calculator" },
                  ]
                : [
                    { k: "Single campaign", v: "Launch one campaign for under $1K on the calculator.", href: CALC_URL, cta: "Open the calculator" },
                    { k: "Sprint", v: "$2,950 once. Your market mapped and tested in six weeks.", href: SPRINT_URL, cta: "Start a Sprint" },
                  ]
              ).map((c, i) => (
                <a key={c.k} href={c.href} target="_blank" rel="noopener noreferrer" className={`ta-card${i === 0 ? " primary" : ""}`}>
                  <span className="ta-card-k">{c.k}</span>
                  <span className="ta-card-v">{c.v}</span>
                  <span className="ta-card-cta">{c.cta} &rarr;</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
      ) : (
      <form className="ta-form" onSubmit={submit}>
      {questions.map((q) => (
        <div className="ta-q" key={q.key}>
          <div className="ta-q-label">{q.label}</div>
          <div className={`ta-opts${q.grid ? " grid" : ""}`}>
            {q.options.map((o) => (
              <button
                type="button"
                key={o.v}
                className={`ta-opt${a[q.key] === o.v ? " on" : ""}`}
                onClick={() => setA((prev) => ({ ...prev, [q.key]: o.v }))}
              >
                <span className="ta-radio" />
                <span>{o.l}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="ta-services">
        <div className="ta-services-head">What we help you run</div>
        <div className="ta-services-grid">
          {services.map((s) => (
            <span className="ta-service" key={s}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="ta-q">
        <div className="ta-q-label">Where can we see your product and reach you?</div>
        <div className="ta-inputs">
          <input
            type="text"
            placeholder="yourcompany.com"
            value={a.website}
            onChange={(e) => setA((prev) => ({ ...prev, website: e.target.value }))}
          />
          <input
            type="email"
            placeholder="you@yourcompany.com"
            value={a.email}
            onChange={(e) => setA((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>
      </div>

      <button type="submit" className="ta-submit" disabled={!ready || sending}>
        {sending ? "Sending..." : "See my next step"}
      </button>
      </form>
      )}

      <style jsx global>{`
        .ta-form, .ta-result {
          max-width: 640px;
          margin: 0 auto;
          text-align: left;
        }
        .ta-q { margin-bottom: 26px; }
        .ta-q-label {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #eaeef8;
          margin-bottom: 12px;
        }
        .ta-opts { display: flex; flex-direction: column; gap: 9px; }
        .ta-opts.grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
        }
        .ta-opt {
          display: flex;
          align-items: center;
          gap: 11px;
          text-align: left;
          padding: 13px 16px;
          border-radius: 11px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #12121b;
          color: #c7cbe0;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .ta-opt:hover { border-color: rgba(255, 90, 80, 0.4); }
        .ta-opt.on {
          border-color: #ff3d38;
          background: rgba(255, 61, 56, 0.1);
          color: #fff;
        }
        .ta-radio {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.28);
          position: relative;
          transition: border-color 0.2s;
        }
        .ta-opt.on .ta-radio { border-color: #ff3d38; }
        .ta-opt.on .ta-radio::after {
          content: "";
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: #ff3d38;
        }
        @media (max-width: 560px) {
          .ta-opts.grid { grid-template-columns: repeat(2, 1fr); }
        }
        .ta-services {
          margin-bottom: 26px;
          padding: 18px 20px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }
        .ta-services-head {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #ff9d99;
          margin-bottom: 14px;
        }
        .ta-services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px 18px;
        }
        .ta-service {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: #c7cbe0;
        }
        .ta-service svg { color: #3ecf8e; flex-shrink: 0; }
        @media (max-width: 560px) {
          .ta-services-grid { grid-template-columns: 1fr; }
        }

        .ta-inputs { display: flex; flex-direction: column; gap: 9px; }
        .ta-inputs input {
          padding: 13px 16px;
          border-radius: 11px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #12121b;
          color: #eaeef8;
          font-size: 14px;
          outline: none;
          transition: border-color 0.25s;
        }
        .ta-inputs input:focus { border-color: #ff6b67; }
        .ta-submit {
          width: 100%;
          padding: 15px;
          border-radius: 999px;
          border: none;
          background: #b1130f;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s, opacity 0.25s;
        }
        .ta-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 0 40px rgba(177, 19, 15, 0.5);
        }
        .ta-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .ta-result { text-align: center; }
        .ta-result-badge {
          display: inline-flex;
          padding: 6px 14px;
          border-radius: 999px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .ta-result-badge.good {
          color: #3ecf8e;
          border: 1px solid rgba(62, 207, 142, 0.4);
          background: rgba(62, 207, 142, 0.08);
        }
        .ta-result-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: 30px;
          font-weight: 400;
          color: #eaeef8;
          margin-bottom: 8px;
        }
        .ta-result-sub {
          font-size: 15px;
          line-height: 1.6;
          color: #9099b8;
          max-width: 480px;
          margin: 0 auto 26px;
        }
        .ta-cal {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #fff;
        }
        .ta-cards { display: flex; flex-direction: column; gap: 12px; text-align: left; }
        .ta-card {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 20px 22px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #12121b;
          transition: all 0.25s;
        }
        .ta-card:hover { transform: translateY(-2px); border-color: rgba(255, 90, 80, 0.4); }
        .ta-card.primary { border-color: rgba(255, 90, 80, 0.5); box-shadow: 0 0 40px -16px rgba(255, 61, 56, 0.5); }
        .ta-card-k {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #ff9d99;
        }
        .ta-card-v { font-size: 14.5px; color: #c7cbe0; }
        .ta-card-cta { font-size: 13px; font-weight: 600; color: #ff6b67; margin-top: 4px; }
      `}</style>
    </>
  );
}
