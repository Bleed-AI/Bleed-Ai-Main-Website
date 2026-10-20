"use client";

import Reveal from "@/components/Reveal";

const IconLinkedin = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.94 5A1.94 1.94 0 113.06 5a1.94 1.94 0 013.88 0zM3.4 8.5h3.1V21H3.4V8.5zm5.2 0h2.97v1.7h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.73V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H8.6V8.5z" />
  </svg>
);
const IconMail = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3 6.5l9 6 9-6" />
  </svg>
);
const IconPhone = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4h2.1c.6 0 1.13.4 1.29.99l.9 3.2a1.35 1.35 0 01-.35 1.31l-1.2 1.2a12 12 0 005.06 5.06l1.2-1.2c.35-.35.86-.48 1.31-.35l3.2.9c.59.16.99.69.99 1.29v2.1c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 014 5.5z" />
  </svg>
);

const touches = [
  { icon: IconLinkedin, color: "#4f8bff", label: "LinkedIn", note: "a new angle", cls: "fu-t1" },
  { icon: IconMail, color: "#ff5b56", label: "Email", note: "a quick case study", cls: "fu-t2" },
  { icon: IconPhone, color: "#22c98a", label: "Warm call", note: "a time that fits", cls: "fu-t3" },
];

export default function AiFollowUp() {
  return (
    <section id="ai-followup">
      <div className="fu-inner">
        <div className="fu-copy">
          <Reveal className="sec-label">Follow-up is our job</Reveal>
          <Reveal as="h2" className="fu-title">
            No warm reply
            <br />
            <em>goes cold.</em>
          </Reveal>
          <Reveal as="p" className="fu-sub" delay={80}>
            An AI agent answers every reply in minutes, in your voice, and chases every yes
            that goes quiet across LinkedIn, email and phone. A person approves what it sends
            until you trust it.
          </Reveal>
        </div>

        <Reveal className="fu-chat" delay={120} aria-hidden="true">
          <div className="fu-bubble in fu-prospect">
            Interesting. Can you send a bit more detail?
          </div>

          <div className="fu-typing">
            <span className="fu-typing-label">Drafting reply</span>
            <span className="fu-dots"><i /><i /><i /></span>
          </div>

          <div className="fu-bubble out fu-ai">
            Happy to. Here is a two line summary and a couple of times that fit your week.
          </div>

          <div className="fu-badge">
            <span className="fu-check">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
            </span>
            Approved by a person · replied in 3 min
          </div>

          <div className="fu-divider fu-chase-label">Then they go quiet. The agent keeps going, automatically:</div>

          <div className="fu-touches">
            {touches.map((t) => (
              <div key={t.label} className={`fu-touch ${t.cls}`} style={{ ["--c" as string]: t.color } as React.CSSProperties}>
                <span className="fu-touch-ico">{t.icon}</span>
                <span className="fu-touch-text">
                  <b>{t.label}</b> {t.note}
                </span>
                <span className="fu-touch-tag">auto</span>
              </div>
            ))}
          </div>

          <div className="fu-reengaged">
            <span className="fu-check">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
            </span>
            Re-engaged. Meeting booked.
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        #ai-followup {
          position: relative;
          padding: 90px 22px;
        }
        .fu-inner {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 48px;
          align-items: center;
        }
        .fu-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 400;
          line-height: 1.08;
          color: #eaeef8;
          margin: 6px 0 14px;
        }
        .fu-title em {
          font-style: italic;
          background: linear-gradient(90deg, #ff3d38, #ff8a86);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .fu-sub {
          font-size: 15.5px;
          line-height: 1.65;
          color: #9099b8;
          max-width: 440px;
        }

        .fu-chat {
          display: flex;
          flex-direction: column;
          gap: 11px;
          padding: 22px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.9);
          min-height: 440px;
        }
        .fu-bubble {
          max-width: 80%;
          padding: 11px 15px;
          font-size: 13.5px;
          line-height: 1.5;
          border-radius: 14px;
          opacity: 0;
        }
        .fu-bubble.in {
          align-self: flex-start;
          background: #1b1b27;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #c7cbe0;
          border-bottom-left-radius: 4px;
        }
        .fu-bubble.out {
          align-self: flex-end;
          background: linear-gradient(150deg, #b1130f, #ff3d38);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .fu-prospect { animation: fuProspect 11s ease-in-out infinite; }
        .fu-ai { animation: fuAi 11s ease-in-out infinite; }

        .fu-typing {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border-radius: 14px;
          background: #15151f;
          border: 1px solid rgba(255, 255, 255, 0.07);
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          color: #9099b8;
          opacity: 0;
          animation: fuTyping 11s ease-in-out infinite;
        }
        .fu-dots { display: inline-flex; gap: 3px; }
        .fu-dots i {
          width: 5px; height: 5px; border-radius: 50%; background: #ff6b67;
          animation: fuDot 1s ease-in-out infinite;
        }
        .fu-dots i:nth-child(2) { animation-delay: 0.15s; }
        .fu-dots i:nth-child(3) { animation-delay: 0.3s; }

        .fu-badge {
          align-self: flex-end;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 13px;
          border-radius: 999px;
          border: 1px solid rgba(62, 207, 142, 0.4);
          background: rgba(62, 207, 142, 0.08);
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11.5px;
          color: #3ecf8e;
          opacity: 0;
          animation: fuBadge 11s ease-in-out infinite;
        }
        .fu-check { display: inline-flex; }

        .fu-divider {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          color: #6a7192;
          padding-top: 6px;
          margin-top: 2px;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
          opacity: 0;
          animation: fuLabel 11s ease-in-out infinite;
        }
        .fu-touches { display: flex; flex-direction: column; gap: 8px; }
        .fu-touch {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 13px;
          border-radius: 11px;
          border: 1px solid color-mix(in srgb, var(--c) 28%, rgba(255, 255, 255, 0.08));
          background: color-mix(in srgb, var(--c) 7%, #0d0d15);
          opacity: 0;
        }
        .fu-touch.fu-t1 { animation: fuT1 11s ease-in-out infinite; }
        .fu-touch.fu-t2 { animation: fuT2 11s ease-in-out infinite; }
        .fu-touch.fu-t3 { animation: fuT3 11s ease-in-out infinite; }
        .fu-touch-ico {
          width: 28px; height: 28px; flex-shrink: 0;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 8px; color: var(--c);
          background: color-mix(in srgb, var(--c) 14%, transparent);
        }
        .fu-touch-ico :global(svg) { width: 16px; height: 16px; }
        .fu-touch-text { flex: 1; font-size: 13px; color: #c7cbe0; }
        .fu-touch-text b { color: #eaeef8; font-weight: 700; }
        .fu-touch-tag {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
          color: var(--c);
          padding: 2px 7px; border-radius: 5px;
          background: color-mix(in srgb, var(--c) 12%, transparent);
        }

        .fu-reengaged {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(62, 207, 142, 0.45);
          background: rgba(62, 207, 142, 0.1);
          font-family: "Inter", system-ui, sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #3ecf8e;
          opacity: 0;
          animation: fuRe 11s ease-in-out infinite;
        }

        @keyframes fuProspect {
          0%, 3% { opacity: 0; transform: translateY(8px); }
          7%, 93% { opacity: 1; transform: none; }
          100% { opacity: 0; }
        }
        @keyframes fuTyping {
          0%, 11% { opacity: 0; }
          15%, 25% { opacity: 1; }
          29%, 100% { opacity: 0; }
        }
        @keyframes fuAi {
          0%, 27% { opacity: 0; transform: translateY(8px); }
          32%, 93% { opacity: 1; transform: none; }
          100% { opacity: 0; }
        }
        @keyframes fuBadge {
          0%, 37% { opacity: 0; transform: translateY(6px); }
          42%, 93% { opacity: 1; transform: none; }
          100% { opacity: 0; }
        }
        @keyframes fuLabel {
          0%, 47% { opacity: 0; }
          52%, 93% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes fuT1 {
          0%, 54% { opacity: 0; transform: translateX(-8px); }
          59%, 93% { opacity: 1; transform: none; }
          100% { opacity: 0; }
        }
        @keyframes fuT2 {
          0%, 61% { opacity: 0; transform: translateX(-8px); }
          66%, 93% { opacity: 1; transform: none; }
          100% { opacity: 0; }
        }
        @keyframes fuT3 {
          0%, 68% { opacity: 0; transform: translateX(-8px); }
          73%, 93% { opacity: 1; transform: none; }
          100% { opacity: 0; }
        }
        @keyframes fuRe {
          0%, 79% { opacity: 0; transform: translateY(6px); }
          84%, 93% { opacity: 1; transform: none; }
          100% { opacity: 0; }
        }
        @keyframes fuDot {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-2px); }
        }

        @media (max-width: 860px) {
          .fu-inner { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 560px) {
          #ai-followup { padding: 64px 18px; }
          .fu-bubble { max-width: 90%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fu-prospect, .fu-ai, .fu-badge, .fu-divider, .fu-touch, .fu-reengaged {
            opacity: 1 !important; animation: none !important; transform: none !important;
          }
          .fu-typing { display: none; }
          .fu-dots i { animation: none; }
        }
      `}</style>
    </section>
  );
}
