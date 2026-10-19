"use client";

import Reveal from "@/components/Reveal";

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
            that goes quiet. A person approves what it sends until you trust it.
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
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
            </span>
            Approved by a person · replied in 3 min
          </div>
        </Reveal>
      </div>

      <style jsx>{`
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
          gap: 14px;
          padding: 24px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.9);
          min-height: 280px;
        }
        .fu-bubble {
          max-width: 78%;
          padding: 12px 16px;
          font-size: 14px;
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
        .fu-prospect { animation: fuProspect 7s ease-in-out infinite; }
        .fu-ai { animation: fuAi 7s ease-in-out infinite; }

        .fu-typing {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 14px;
          background: #15151f;
          border: 1px solid rgba(255, 255, 255, 0.07);
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11.5px;
          color: #9099b8;
          opacity: 0;
          animation: fuTyping 7s ease-in-out infinite;
        }
        .fu-dots {
          display: inline-flex;
          gap: 3px;
        }
        .fu-dots i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ff6b67;
          animation: fuDot 1s ease-in-out infinite;
        }
        .fu-dots i:nth-child(2) { animation-delay: 0.15s; }
        .fu-dots i:nth-child(3) { animation-delay: 0.3s; }

        .fu-badge {
          align-self: flex-end;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(62, 207, 142, 0.4);
          background: rgba(62, 207, 142, 0.08);
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          color: #3ecf8e;
          opacity: 0;
          animation: fuBadge 7s ease-in-out infinite;
        }
        .fu-check { display: inline-flex; }

        @keyframes fuProspect {
          0%, 4% { opacity: 0; transform: translateY(8px); }
          9%, 94% { opacity: 1; transform: none; }
          100% { opacity: 0; }
        }
        @keyframes fuTyping {
          0%, 16% { opacity: 0; }
          20%, 38% { opacity: 1; }
          44%, 100% { opacity: 0; }
        }
        @keyframes fuAi {
          0%, 44% { opacity: 0; transform: translateY(8px); }
          50%, 94% { opacity: 1; transform: none; }
          100% { opacity: 0; }
        }
        @keyframes fuBadge {
          0%, 58% { opacity: 0; transform: translateY(6px); }
          64%, 94% { opacity: 1; transform: none; }
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
          .fu-prospect, .fu-ai, .fu-badge { opacity: 1; animation: none; transform: none; }
          .fu-typing { display: none; }
          .fu-dots i { animation: none; }
        }
      `}</style>
    </section>
  );
}
