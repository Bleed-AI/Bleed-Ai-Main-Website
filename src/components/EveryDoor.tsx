"use client";

import Reveal from "@/components/Reveal";

type Door = { name: string; desc: string; color: string; icon: React.ReactNode };

const doors: Door[] = [
  {
    name: "Email",
    color: "#ff5b56",
    desc: "Personalized at scale, engineered to land in the primary inbox.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="M3 6.5l9 6 9-6" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    color: "#4f8bff",
    desc: "Warm, human touches that open a conversation before the ask.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 5A1.94 1.94 0 113.06 5a1.94 1.94 0 013.88 0zM3.4 8.5h3.1V21H3.4V8.5zm5.2 0h2.97v1.7h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.73V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H8.6V8.5z" />
      </svg>
    ),
  },
  {
    name: "Direct mail",
    color: "#f5a623",
    desc: "Physical cards sent to the accounts that matter most.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="1.5" y="6" width="12.5" height="9" rx="1.5" />
        <path d="M14 9h3.5l3 3v3H14z" />
        <circle cx="5.5" cy="17.5" r="1.6" />
        <circle cx="17" cy="17.5" r="1.6" />
      </svg>
    ),
  },
  {
    name: "Phone, warm only",
    color: "#10b981",
    desc: "A call only after someone has already engaged. Never cold.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5.5C4 4.7 4.7 4 5.5 4h2.1c.6 0 1.13.4 1.29.99l.9 3.2a1.35 1.35 0 01-.35 1.31l-1.2 1.2a12 12 0 005.06 5.06l1.2-1.2c.35-.35.86-.48 1.31-.35l3.2.9c.59.16.99.69.99 1.29v2.1c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 014 5.5z" />
      </svg>
    ),
  },
  {
    name: "Website forms",
    color: "#a855f7",
    desc: "We reach teams through their own contact forms, in context.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 9h10M7 13h6M7 17h4" />
      </svg>
    ),
  },
  {
    name: "CRM that stays yours",
    color: "#22c98a",
    desc: "Every lead in one place. We run the follow-up; the data stays yours.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M9 9v11" />
      </svg>
    ),
  },
];

export default function EveryDoor() {
  return (
    <section id="every-door">
      <div className="ed-inner">
        <Reveal className="sec-label" style={{ textAlign: "center" }}>
          Every door
        </Reveal>
        <Reveal as="h2" className="ed-title">
          We run the doors.
          <br />
          <em>You take the meetings.</em>
        </Reveal>

        <div className="ed-grid">
          {doors.map((d, i) => (
            <Reveal className="ed-card" key={d.name} delay={i * 60} style={{ ["--c" as string]: d.color } as React.CSSProperties}>
              <span className="ed-ico">{d.icon}</span>
              <h3 className="ed-name">{d.name}</h3>
              <p className="ed-desc">{d.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <style jsx global>{`
        #every-door {
          position: relative;
          padding: 90px 22px;
        }
        .ed-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .ed-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(28px, 4.2vw, 48px);
          font-weight: 400;
          line-height: 1.08;
          text-align: center;
          color: #eaeef8;
          margin: 6px auto 50px;
        }
        .ed-title em {
          font-style: italic;
          background: linear-gradient(90deg, #ff3d38, #ff8a86);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .ed-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .ed-card {
          position: relative;
          padding: 26px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          overflow: hidden;
        }
        .ed-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 3px;
          background: var(--c);
        }
        .ed-card:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--c) 45%, transparent);
          box-shadow: 0 24px 60px -30px rgba(0, 0, 0, 0.9),
            0 0 36px -14px color-mix(in srgb, var(--c) 50%, transparent);
        }
        .ed-ico {
          display: inline-flex;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid color-mix(in srgb, var(--c) 30%, rgba(255, 255, 255, 0.1));
          background: linear-gradient(150deg, color-mix(in srgb, var(--c) 24%, transparent), color-mix(in srgb, var(--c) 6%, transparent));
          color: var(--c);
          margin-bottom: 16px;
        }
        .ed-ico :global(svg) {
          width: 22px;
          height: 22px;
        }
        .ed-name {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #eaeef8;
          margin-bottom: 8px;
        }
        .ed-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #9099b8;
        }

        @media (max-width: 900px) {
          .ed-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          #every-door { padding: 64px 18px; }
          .ed-grid { grid-template-columns: 1fr; }
          .ed-title { margin-bottom: 36px; }
        }
      `}</style>
    </section>
  );
}
