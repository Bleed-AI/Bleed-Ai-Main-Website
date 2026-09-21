"use client";

import Reveal from "@/components/Reveal";

// --- tiny step icons -------------------------------------------------------
const IconSend = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);
const IconReply = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 17l-5-5 5-5" />
    <path d="M4 12h11a5 5 0 015 5v1" />
  </svg>
);
const IconCalendar = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M8 3v3M16 3v3" />
    <path d="M9 14.5l2 2 4-4" />
  </svg>
);
const IconConnect = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0111 0" />
    <path d="M18 7v6M15 10h6" />
  </svg>
);
const IconMessage = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.5 8.5 0 01-11.9 7.8L3 21l1.7-6A8.5 8.5 0 1121 11.5z" />
  </svg>
);
const IconPhone = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4h2.1c.6 0 1.13.4 1.29.99l.9 3.2a1.35 1.35 0 01-.35 1.31l-1.2 1.2a12 12 0 005.06 5.06l1.2-1.2c.35-.35.86-.48 1.31-.35l3.2.9c.59.16.99.69.99 1.29v2.1c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 014 5.5z" />
  </svg>
);
const IconCheck = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.5 2.5L16 9.5" />
  </svg>
);

type Step = { label: string; icon: React.ReactNode };
type Channel = {
  n: string;
  day: string;
  title: string;
  desc: string;
  points: string[];
  accent: string;
  accent2: string;
  icon: React.ReactNode;
  flow: Step[];
};

const channels: Channel[] = [
  {
    n: "01",
    day: "Day 1",
    title: "Email Outreach",
    desc: "Hyper-personalized cold email at scale — engineered to land in the primary inbox, so every send actually gets seen.",
    points: ["Primary-inbox deliverability", "Personalized at scale", "Reply-ready sequences"],
    accent: "#B1130F",
    accent2: "#ff6b67",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="M3 6.5l9 6 9-6" />
      </svg>
    ),
    flow: [
      { label: "Email sent", icon: IconSend },
      { label: "Smart follow-up", icon: IconReply },
      { label: "Call booked", icon: IconCalendar },
    ],
  },
  {
    n: "02",
    day: "Day 3",
    title: "LinkedIn Outreach",
    desc: "Warm, human touches that build familiarity before the ask — turning cold profiles into real conversations.",
    points: ["Profile-to-conversation flow", "Human, non-spammy touches", "Builds trust before the pitch"],
    accent: "#0A66C2",
    accent2: "#4f8bff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 5A1.94 1.94 0 113.06 5a1.94 1.94 0 013.88 0zM3.4 8.5h3.1V21H3.4V8.5zm5.2 0h2.97v1.7h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.73V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H8.6V8.5z" />
      </svg>
    ),
    flow: [
      { label: "Connect with leads", icon: IconConnect },
      { label: "Personal message", icon: IconMessage },
      { label: "Follow-up & reply", icon: IconReply },
    ],
  },
  {
    n: "03",
    day: "Ongoing",
    title: "CRM & Follow-ups",
    desc: "Every reply and warm lead lands in the CRM we set up for you — where our team runs the follow-ups and calls that turn interest into booked, closed deals.",
    points: ["Done-for-you CRM app", "Follow-ups & calls handled", "Every lead worked to a close"],
    accent: "#10b981",
    accent2: "#34e6a8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M9 9v11" />
      </svg>
    ),
    flow: [
      { label: "Lead lands in CRM", icon: IconConnect },
      { label: "Follow-up & call", icon: IconPhone },
      { label: "Deal closed", icon: IconCheck },
    ],
  },
];

export default function ChannelStack() {
  return (
    <section id="channels">
      <div className="chan-inner">
        <div className="chan-head">
          <div className="sec-label">Every Channel, One System</div>
          <h2 className="sec-h2">
            We don&apos;t just send emails.
            <br />
            <em>We reach them everywhere.</em>
          </h2>
        </div>

        <div className="chan-timeline">
          <span className="chan-spine" aria-hidden="true">
            <span className="chan-spark" />
          </span>

          {channels.map((c, idx) => (
            <Reveal className="chan-row" key={c.n} delay={idx * 90}>
              <div
                className="chan-rowinner"
                style={{ "--acc": c.accent, "--acc2": c.accent2 } as React.CSSProperties}
              >
                <span className="chan-node">
                  <span className="chan-node-ring" />
                  {c.icon}
                </span>

                <article className="chan-card">
                  <span className="chan-watermark">{c.n}</span>

                  <div className="chan-card-head">
                    <span className="chan-day">
                      <span className="chan-day-dot" />
                      {c.day}
                    </span>
                  </div>
                  <h3 className="chan-title">{c.title}</h3>
                  <p className="chan-desc">{c.desc}</p>

                  <div className="chan-card-body">
                    <ul className="chan-points">
                      {c.points.map((p) => (
                        <li key={p}>
                          <span className="chan-bullet" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="chan-flow" aria-hidden="true">
                      <div className="chan-flow-label">The sequence</div>
                      {c.flow.map((s, i) => (
                        <div key={s.label} className="flow-step" style={{ animationDelay: `${i * 1}s` }}>
                          <span className="flow-ico">{s.icon}</span>
                          <span className="flow-text">{s.label}</span>
                          {i < c.flow.length - 1 && <span className="flow-line" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style jsx>{`
        #channels {
          position: relative;
          padding: 80px 22px;
        }
        .chan-inner {
          max-width: 980px;
          margin: 0 auto;
        }
        .chan-head {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 48px;
        }

        /* ---- timeline spine ---- */
        .chan-timeline {
          position: relative;
        }
        .chan-spine {
          position: absolute;
          left: 31px;
          top: 24px;
          bottom: 24px;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(180deg, #B1130F 0%, #0A66C2 50%, #10b981 100%);
          opacity: 0.5;
          overflow: visible;
        }
        .chan-spark {
          position: absolute;
          left: 50%;
          top: 0;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #fff;
          transform: translate(-50%, 0);
          box-shadow: 0 0 12px 3px rgba(255, 255, 255, 0.6);
          animation: chanSpark 6s ease-in-out infinite;
        }
        @keyframes chanSpark {
          0% { top: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .chan-row + .chan-row {
          margin-top: 22px;
        }
        .chan-rowinner {
          position: relative;
          padding-left: 82px;
        }

        /* ---- node on the spine ---- */
        .chan-node {
          position: absolute;
          left: 10px;
          top: 30px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(150deg, var(--acc), var(--acc2));
          color: #fff;
          box-shadow: 0 0 0 5px rgba(10, 10, 16, 1), 0 0 22px -2px var(--acc);
          z-index: 2;
        }
        .chan-node :global(svg) {
          width: 21px;
          height: 21px;
        }
        .chan-node-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1.5px solid var(--acc);
          opacity: 0.5;
          animation: chanRing 2.6s ease-out infinite;
        }
        @keyframes chanRing {
          0% { transform: scale(0.8); opacity: 0.6; }
          70%, 100% { transform: scale(1.35); opacity: 0; }
        }

        /* ---- card ---- */
        .chan-card {
          position: relative;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(160deg, #13131d 0%, #0b0b12 100%);
          box-shadow: 0 28px 70px -26px rgba(0, 0, 0, 0.85);
          padding: 30px 34px 32px;
          overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
        }
        .chan-card:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--acc) 50%, rgba(255, 255, 255, 0.1));
          box-shadow: 0 34px 90px -24px rgba(0, 0, 0, 0.92),
            0 0 46px -10px color-mix(in srgb, var(--acc) 50%, transparent);
        }
        .chan-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, var(--acc), var(--acc2));
        }
        .chan-card::after {
          content: "";
          position: absolute;
          top: -80px;
          right: -80px;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--acc) 0%, transparent 68%);
          opacity: 0.16;
          pointer-events: none;
        }
        .chan-watermark {
          position: absolute;
          top: -30px;
          right: 20px;
          z-index: 0;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 170px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -6px;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.05);
          pointer-events: none;
          user-select: none;
        }
        .chan-card-head {
          position: relative;
          z-index: 1;
          margin-bottom: 12px;
        }
        .chan-day {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--acc) 40%, transparent);
          background: color-mix(in srgb, var(--acc) 12%, transparent);
          font-size: 12.5px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--acc2);
        }
        .chan-day-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--acc2);
          box-shadow: 0 0 8px var(--acc2);
        }
        .chan-title {
          position: relative;
          z-index: 1;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -0.6px;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #ffffff, color-mix(in srgb, var(--acc2) 70%, #ffffff));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .chan-desc {
          position: relative;
          z-index: 1;
          font-size: 15px;
          line-height: 1.6;
          color: #9099b8;
          max-width: 620px;
          margin-bottom: 22px;
        }
        .chan-card-body {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
          align-items: start;
        }
        .chan-points {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }
        .chan-points li {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 14.5px;
          color: #c7cbe0;
        }
        .chan-bullet {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--acc2);
          flex-shrink: 0;
          box-shadow: 0 0 10px var(--acc2);
        }

        /* ---- animated mini-sequence ---- */
        .chan-flow {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px 20px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--acc) 7%, rgba(255, 255, 255, 0.02)),
            rgba(255, 255, 255, 0.015)
          );
        }
        .chan-flow-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #6a7192;
        }
        .flow-step {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0.4;
          animation: flowStep 3s ease-in-out infinite;
        }
        .flow-ico {
          position: relative;
          z-index: 1;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          border: 1px solid color-mix(in srgb, var(--acc) 30%, rgba(255, 255, 255, 0.08));
          background: #0d0d15;
          color: var(--acc2);
        }
        .flow-ico :global(svg) {
          width: 18px;
          height: 18px;
        }
        .flow-text {
          font-size: 14px;
          font-weight: 600;
          color: #e4e7f2;
        }
        .flow-line {
          position: absolute;
          left: 18px;
          top: 38px;
          width: 2px;
          height: 16px;
          background: linear-gradient(var(--acc), transparent);
          opacity: 0.4;
          transform-origin: top;
        }
        .flow-step:nth-child(2) .flow-line { animation: flowLine 3s ease-in-out infinite; animation-delay: 0.35s; }
        .flow-step:nth-child(3) .flow-line { animation: flowLine 3s ease-in-out infinite; animation-delay: 1.35s; }
        @keyframes flowLine {
          0%, 20% { transform: scaleY(0.2); opacity: 0.25; }
          35%, 58% { transform: scaleY(1); opacity: 0.9; }
          75%, 100% { transform: scaleY(0.2); opacity: 0.25; }
        }
        @keyframes flowStep {
          0%, 100% { opacity: 0.4; }
          8% { opacity: 1; }
          28% { opacity: 1; }
          40% { opacity: 0.4; }
        }
        .flow-step:nth-child(2) .flow-ico { animation: flowGlow 3s ease-in-out infinite; animation-delay: 0s; }
        .flow-step:nth-child(3) .flow-ico { animation: flowGlow 3s ease-in-out infinite; animation-delay: 1s; }
        .flow-step:nth-child(4) .flow-ico { animation: flowGlow 3s ease-in-out infinite; animation-delay: 2s; }
        @keyframes flowGlow {
          0%, 40%, 100% {
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            transform: scale(1);
            background: #0d0d15;
            color: var(--acc2);
            border-color: color-mix(in srgb, var(--acc) 30%, rgba(255, 255, 255, 0.08));
          }
          12%, 26% {
            box-shadow: 0 0 24px color-mix(in srgb, var(--acc) 60%, transparent);
            transform: scale(1.08);
            background: linear-gradient(150deg, var(--acc), var(--acc2));
            color: #fff;
            border-color: var(--acc);
          }
        }

        @media (max-width: 760px) {
          .chan-spine { left: 21px; }
          .chan-rowinner { padding-left: 58px; }
          .chan-node { left: 2px; width: 38px; height: 38px; top: 26px; }
          .chan-card { padding: 24px 20px 26px; }
          .chan-title { font-size: 23px; }
          .chan-card-body { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </section>
  );
}
