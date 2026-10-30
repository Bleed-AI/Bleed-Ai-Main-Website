"use client";

import { useState } from "react";
import { MIN_SLOTS, money, priceFor, slotById, unitLabel } from "@/lib/slots";

// Webhook that records the lead in our CRM and posts to the
// #trial-applications Slack channel.
const WEBHOOK_URL = "https://bleedai.app.n8n.cloud/webhook/bleedai-trial";

const CALENDLY = "https://calendly.com/bleedai/vip-invite-only?hide_gdpr_banner=1";
// Not a fit for a free trial yet: a paid start on the smallest board.
const PAID_START_URL = "/pricing/#builder";

// All routing thresholds live here so they are easy to change (slot model, 2026-10-30).
// Free trial = B2B, already selling to real customers, a customer worth $2K+ a year,
// and room for at least the smallest board. Everyone else is offered a paid start.
// The route values ("fit" | "sprint" | "calculator") are kept so the webhook branches still match:
// "sprint" now means "has customers, below the trial bar", "calculator" means "no customers or consumer only".
const ROUTING = {
  fitCustomers: ["few", "repeat"],
  acvTooLow: ["u2k"],
  budgetOk: ["1to3", "3plus"],
  notB2b: ["b2c"],
};

type Answers = { customers: string; acv: string; budget: string; sells_to: string; website: string; email: string };
type QKey = "customers" | "acv" | "budget" | "sells_to";
type Question = { key: QKey; label: string; grid?: boolean; options: { v: string; l: string }[] };

const questions: Question[] = [
  {
    key: "sells_to",
    label: "Who do you sell to?",
    options: [
      { v: "b2b", l: "Other businesses" },
      { v: "both", l: "Businesses and consumers" },
      { v: "b2c", l: "Consumers only" },
    ],
  },
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
    label: "Once it works, what could you put into marketing each month?",
    options: [
      { v: "u1k", l: "Under $1K" },
      { v: "1to3", l: "$1K to $3K" },
      { v: "3plus", l: "$3K+" },
    ],
  },
];

function routeFor(a: Answers): "fit" | "sprint" | "calculator" {
  const hasCustomers = ROUTING.fitCustomers.includes(a.customers);
  if (!hasCustomers || ROUTING.notB2b.includes(a.sells_to)) return "calculator";
  if (!ROUTING.acvTooLow.includes(a.acv) && ROUTING.budgetOk.includes(a.budget)) return "fit";
  return "sprint";
}

export default function TrialApply({
  picked = [],
  outcome = "",
  pkg = "",
}: {
  /** Slot ids picked for the trial (1 to 2). Empty means "help me pick". */
  picked?: string[];
  outcome?: string;
  pkg?: string;
}) {
  const [a, setA] = useState<Answers>({ customers: "", acv: "", budget: "", sells_to: "", website: "", email: "" });
  const [result, setResult] = useState<"fit" | "sprint" | "calculator" | null>(null);
  const [sending, setSending] = useState(false);

  const ready = a.customers && a.acv && a.budget && a.sells_to && a.website.trim() && a.email.trim();

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
          body: JSON.stringify({
            ...a,
            route,
            source: "bleedai.com/trial",
            // slot model fields (2026-10-30), added alongside the original ones
            trial_slots: picked,
            slots: picked.map((id) => `${id}:1`).join(","),
            outcome,
            package: pkg,
          }),
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
            <h3 className="ta-result-title">Let&apos;s book your 15 minute call.</h3>
            <p className="ta-result-sub">
              Pick a time that works. On the call we agree what {picked.length ? picked.map((id) => slotById(id).name).join(" and ") : "your trial services"} should do for you, then we start.
            </p>
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
              We keep free trials for B2B companies that already sell to repeat customers. You can still start now, month to month, and swap any service whenever you like.
            </p>
            <div className="ta-cards">
              <a href={PAID_START_URL} className="ta-card primary">
                <span className="ta-card-k">Start with {unitLabel(MIN_SLOTS)}</span>
                <span className="ta-card-v">{money(priceFor(MIN_SLOTS))} a month. Pick any {unitLabel(MIN_SLOTS)} and swap them as you learn what works.</span>
                <span className="ta-card-cta">Build your own plan &rarr;</span>
              </a>
              <a href="/services/" className="ta-card">
                <span className="ta-card-k">See every service</span>
                <span className="ta-card-v">What each service delivers every month, and what it costs.</span>
                <span className="ta-card-cta">Browse the services &rarr;</span>
              </a>
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
        <div className="ta-services-head">Your trial services</div>
        {picked.length ? (
          <div className="ta-services-grid">
            {picked.map((id) => (
              <span className="ta-service" key={id}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
                {slotById(id).name}
              </span>
            ))}
          </div>
        ) : (
          <p className="ta-services-empty">None picked yet. That is fine, we will suggest two on the call.</p>
        )}
        <a href="#pick" className="ta-services-change">Change services</a>
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
        .ta-services { position: relative; }
        .ta-services-empty { font-size: 13.5px; color: #9099b8; }
        .ta-services-change {
          position: absolute;
          top: 16px;
          right: 18px;
          font-size: 12px;
          font-weight: 600;
          color: #ff6b67;
        }
        .ta-services-change:hover { color: #ff9d99; }
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
