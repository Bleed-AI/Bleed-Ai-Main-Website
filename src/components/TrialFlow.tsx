"use client";

import { useEffect, useRef, useState } from "react";

type Step = { label: string; detail: string };
const steps: Step[] = [
  { label: "Apply", detail: "Tell us your product and goal. Just three questions." },
  { label: "We build the list", detail: "About 1,500 of your real buyers, found by signal." },
  { label: "You approve the copy", detail: "We write the campaign with you on one short call." },
  { label: "You see every reply", detail: "We send it, and hand you every response that comes back." },
  { label: "You decide", detail: "Keep going on a monthly plan, or walk away. No pressure." },
];

export default function TrialFlow() {
  const [active, setActive] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % steps.length);
    }, 2600);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <section id="trial-flow">
      <div className="tf-inner">
        <div className="sec-label">The trial</div>
        <h2 className="tf-title">
          See the replies
          <br />
          <em>before you pay us.</em>
        </h2>
        <p className="tf-sub">
          If your product already sells, we build a list of about 1,500 of your buyers,
          write the campaign with you, send it, and hand you every reply. Then you decide.
        </p>

        <div className="tf-steps">
          {steps.map((s, i) => (
            <button
              type="button"
              key={s.label}
              className={`tf-step${i === active ? " on" : ""}`}
              onClick={() => setActive(i)}
              aria-label={s.label}
            >
              <span className="tf-num">{i + 1}</span>
              <span className="tf-label">{s.label}</span>
              <span className="tf-detail">{s.detail}</span>
            </button>
          ))}
        </div>

        <a href="/trial" className="tf-cta">
          Apply for a trial
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <style jsx>{`
        #trial-flow {
          position: relative;
          padding: 90px 22px;
          text-align: center;
        }
        .tf-inner {
          max-width: 1060px;
          margin: 0 auto;
        }
        .tf-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(30px, 4.6vw, 52px);
          font-weight: 400;
          line-height: 1.06;
          color: #eaeef8;
          margin: 6px 0 14px;
        }
        .tf-title em {
          font-style: italic;
          background: linear-gradient(90deg, #ff3d38, #ff8a86);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .tf-sub {
          font-size: 15.5px;
          line-height: 1.65;
          color: #9099b8;
          max-width: 560px;
          margin: 0 auto 44px;
        }

        .tf-steps {
          display: flex;
          gap: 12px;
          align-items: stretch;
          margin-bottom: 40px;
          min-height: 150px;
        }
        .tf-step {
          flex: 0 0 96px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 10px;
          padding: 20px 18px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          cursor: pointer;
          overflow: hidden;
          transition: flex-basis 0.6s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.5s, background 0.5s;
          color: inherit;
          font: inherit;
        }
        .tf-step.on {
          flex: 1 1 0;
          border-color: rgba(255, 90, 80, 0.45);
          background: linear-gradient(160deg, #1a1016 0%, #0b0b12 100%);
          box-shadow: 0 0 44px -14px rgba(255, 61, 56, 0.5);
        }
        .tf-num {
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 800;
          font-size: 14px;
          color: #9099b8;
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: color 0.4s, background 0.4s, border-color 0.4s;
        }
        .tf-step.on .tf-num {
          color: #fff;
          background: linear-gradient(135deg, #b1130f, #ff3d38);
          border-color: transparent;
        }
        .tf-label {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          color: #eaeef8;
          white-space: nowrap;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          transition: writing-mode 0s;
        }
        .tf-step.on .tf-label {
          writing-mode: horizontal-tb;
          transform: none;
        }
        .tf-detail {
          font-size: 14px;
          line-height: 1.55;
          color: #9099b8;
          opacity: 0;
          max-width: 0;
          transition: opacity 0.4s 0.15s;
        }
        .tf-step.on .tf-detail {
          opacity: 1;
          max-width: 340px;
        }

        .tf-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 999px;
          background: #b1130f;
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .tf-cta:hover {
          transform: scale(1.04);
          box-shadow: 0 0 40px rgba(177, 19, 15, 0.5);
        }

        @media (max-width: 760px) {
          .tf-steps {
            flex-direction: column;
            min-height: 0;
          }
          .tf-step {
            flex: 0 0 auto;
            flex-direction: row;
            align-items: center;
            gap: 14px;
          }
          .tf-label {
            writing-mode: horizontal-tb;
            transform: none;
            white-space: normal;
          }
          .tf-detail {
            display: none;
            max-width: none;
          }
          .tf-step.on .tf-detail {
            display: block;
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tf-step { flex: 1 1 0; }
          .tf-label { writing-mode: horizontal-tb; transform: none; }
          .tf-detail { opacity: 1; max-width: 340px; }
        }
      `}</style>
    </section>
  );
}
