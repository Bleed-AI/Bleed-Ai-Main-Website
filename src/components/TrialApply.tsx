"use client";

import { useState } from "react";

// n8n webhook that records the lead and posts to Slack.
// Fill this in with the URL from the Automations-Builder-n8n project.
// Left empty for now: the form still works and shows the right next step;
// it just skips the post until the URL is set.
const WEBHOOK_URL = "";

const CALENDLY = "https://calendly.com/bleedai/vip-invite-only?hide_gdpr_banner=1";
const SPRINT_URL = "https://calculator.bleedai.com/sprint";
const CALC_URL = "https://calculator.bleedai.com";

// All routing thresholds live here so they are easy to change.
const ROUTING = {
  fit: { customers: "repeat", acvOk: ["5to20", "20plus"], budget: "3plus" },
  someCustomers: ["few", "repeat"],
  budgetAtLeast1k: ["1to3", "3plus"],
};

type Answers = { customers: string; acv: string; budget: string; website: string; email: string };

const questions = [
  {
    key: "customers" as const,
    label: "How many customers pay you today, and do they keep paying?",
    options: [
      { v: "none", l: "None yet" },
      { v: "few", l: "A few, mostly one-off" },
      { v: "repeat", l: "3+ paying, coming back or on contract" },
    ],
  },
  {
    key: "acv" as const,
    label: "What is a typical customer worth to you in a year?",
    options: [
      { v: "u5k", l: "Under $5K" },
      { v: "5to20", l: "$5K to $20K" },
      { v: "20plus", l: "$20K+" },
    ],
  },
  {
    key: "budget" as const,
    label: "Once outbound works, what could you put into it each month?",
    options: [
      { v: "u1k", l: "Under $1K" },
      { v: "1to3", l: "$1K to $3K" },
      { v: "3plus", l: "$3K+" },
    ],
  },
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

  if (result) {
    return (
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
    );
  }

  return (
    <form className="ta-form" onSubmit={submit}>
      {questions.map((q) => (
        <div className="ta-q" key={q.key}>
          <div className="ta-q-label">{q.label}</div>
          <div className="ta-opts">
            {q.options.map((o) => (
              <button
                type="button"
                key={o.v}
                className={`ta-opt${a[q.key] === o.v ? " on" : ""}`}
                onClick={() => setA((prev) => ({ ...prev, [q.key]: o.v }))}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>
      ))}

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

      <style jsx>{`
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
        .ta-opt {
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
    </form>
  );
}
