"use client";

import { useEffect, useRef, useState } from "react";

const IconApply = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 3.5V2.5a1 1 0 011-1h4a1 1 0 011 1v1M9 12l2 2 4-4" />
  </svg>
);
const IconList = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6h12M8 12h12M8 18h12" />
    <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconApprove = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
    <path d="M8 12l2.5 2.5L16 9" />
  </svg>
);
const IconReply = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.5 8.5 0 01-11.9 7.8L3 21l1.7-6A8.5 8.5 0 1121 11.5z" />
    <path d="M8 11h8M8 14h5" />
  </svg>
);
const IconDecide = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21V4M5 4l9 2-2 5 2 5-9-2" />
  </svg>
);

type Step = { label: string; detail: string; icon: React.ReactNode };
const steps: Step[] = [
  { label: "Apply", detail: "Tell us your product and goal. Just three questions.", icon: IconApply },
  { label: "We build the list", detail: "About 1,500 of your real buyers, found by signal.", icon: IconList },
  { label: "You approve the copy", detail: "We write the campaign with you on one short call.", icon: IconApprove },
  { label: "You see every reply", detail: "We send it, and hand you every response that comes back.", icon: IconReply },
  { label: "You decide", detail: "Keep going on a monthly plan, or walk away. No pressure.", icon: IconDecide },
];

export default function TrialFlow() {
  const [active, setActive] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    timer.current = setInterval(() => setActive((a) => (a + 1) % steps.length), 2800);
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
              onMouseEnter={() => setActive(i)}
              aria-label={s.label}
            >
              <span className="tf-num">{i + 1}</span>
              <span className="tf-body">
                <span className="tf-head">
                  <span className="tf-ico">{s.icon}</span>
                  <span className="tf-label">{s.label}</span>
                </span>
                <span className="tf-detail">{s.detail}</span>
              </span>
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
          height: 150px;
        }
        .tf-step {
          position: relative;
          flex: 0 0 84px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          cursor: pointer;
          overflow: hidden;
          transition: flex-basis 0.6s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.5s, background 0.5s, box-shadow 0.5s;
          color: inherit;
          font: inherit;
        }
        .tf-step.on {
          flex: 1 1 0;
          justify-content: flex-start;
          border-color: rgba(255, 90, 80, 0.45);
          background: linear-gradient(160deg, #1a1016 0%, #0b0b12 100%);
          box-shadow: 0 0 46px -16px rgba(255, 61, 56, 0.55);
        }
        .tf-num {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: #9099b8;
          border: 1px solid rgba(255, 255, 255, 0.14);
          transition: color 0.4s, background 0.4s, border-color 0.4s, box-shadow 0.4s;
        }
        .tf-step.on .tf-num {
          color: #fff;
          background: linear-gradient(135deg, #b1130f, #ff3d38);
          border-color: transparent;
          box-shadow: 0 0 20px -2px rgba(255, 61, 56, 0.6);
        }

        /* Absolute + fixed width so the text never reflows while collapsing. */
        .tf-body {
          position: absolute;
          left: 72px;
          right: 22px;
          top: 50%;
          transform: translateY(-50%) translateX(-6px);
          display: flex;
          flex-direction: column;
          gap: 9px;
          text-align: left;
          min-width: 280px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .tf-step.on .tf-body {
          opacity: 1;
          transform: translateY(-50%);
          transition-delay: 0.16s;
        }
        .tf-head {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .tf-ico {
          width: 30px;
          height: 30px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          color: #ff6b67;
          background: rgba(255, 61, 56, 0.12);
          border: 1px solid rgba(255, 61, 56, 0.3);
        }
        .tf-ico :global(svg) { width: 17px; height: 17px; }
        .tf-label {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #eaeef8;
          white-space: nowrap;
        }
        .tf-detail {
          font-size: 14px;
          line-height: 1.55;
          color: #9099b8;
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
          .tf-steps { flex-direction: column; height: auto; }
          .tf-step {
            flex: 0 0 auto;
            justify-content: flex-start;
            gap: 14px;
            min-height: 60px;
          }
          .tf-body {
            position: static;
            transform: none;
            min-width: 0;
            opacity: 0;
            display: none;
          }
          .tf-step.on .tf-body { display: flex; opacity: 1; transform: none; }
          .tf-label { white-space: normal; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tf-steps { flex-direction: column; height: auto; }
          .tf-step { flex: 0 0 auto; justify-content: flex-start; gap: 14px; min-height: 60px; }
          .tf-body { position: static; transform: none; min-width: 0; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
