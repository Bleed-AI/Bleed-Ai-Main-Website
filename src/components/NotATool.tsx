"use client";

import Reveal from "@/components/Reveal";

type Card = { title: string; desc: string; icon: React.ReactNode };

const cards: Card[] = [
  {
    title: "Buyers found by signal",
    desc: "We target accounts showing they need you right now, not a stale static list.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    title: "Ten angles on one list",
    desc: "One list, many reasons to reach out, so the message always fits the account.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5M3 17l9 5 9-5" />
      </svg>
    ),
  },
  {
    title: "Four doors, one account",
    desc: "Email, LinkedIn, mail and phone on the same account, worked in sync.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="7" height="8" rx="1" />
        <rect x="13" y="3" width="7" height="8" rx="1" />
        <rect x="4" y="13" width="7" height="8" rx="1" />
        <rect x="13" y="13" width="7" height="8" rx="1" />
      </svg>
    ),
  },
  {
    title: "Every reply answered in minutes",
    desc: "An AI agent replies in your voice, fast, and chases every yes that goes quiet.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.5 8.5 0 01-11.9 7.8L3 21l1.7-6A8.5 8.5 0 1121 11.5z" />
        <path d="M12 7l-1.5 4.5L8 13" />
      </svg>
    ),
  },
  {
    title: "Deliverability we measure ourselves",
    desc: "We run the inbox infrastructure and watch it like a production system.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path d="M12 12l4-2.5" />
        <path d="M12 7v1M7 12H6M18 12h-1" />
      </svg>
    ),
  },
  {
    title: "It runs before you pay",
    desc: "See the replies from a real campaign built for you, then decide.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function NotATool() {
  return (
    <section id="not-a-tool">
      <div className="nat-inner">
        <Reveal className="sec-label" style={{ textAlign: "center" }}>
          Tools are not the gap
        </Reveal>
        <Reveal as="h2" className="nat-title">
          You already have the tools.
          <br />
          <em>You don&apos;t have the hands.</em>
        </Reveal>

        <div className="nat-grid">
          {cards.map((c, i) => (
            <Reveal className="nat-card" key={c.title} delay={i * 60}>
              <span className="nat-ico">{c.icon}</span>
              <h3 className="nat-card-title">{c.title}</h3>
              <p className="nat-card-desc">{c.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <style jsx global>{`
        #not-a-tool {
          position: relative;
          padding: 90px 22px;
        }
        .nat-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .nat-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(28px, 4.2vw, 48px);
          font-weight: 400;
          line-height: 1.08;
          text-align: center;
          color: #eaeef8;
          margin: 6px auto 50px;
        }
        .nat-title em {
          font-style: italic;
          background: linear-gradient(90deg, #ff3d38, #ff8a86);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .nat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .nat-card {
          padding: 26px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .nat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 90, 80, 0.4);
          box-shadow: 0 24px 60px -30px rgba(0, 0, 0, 0.9), 0 0 36px -14px rgba(255, 61, 56, 0.4);
        }
        .nat-ico {
          display: inline-flex;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid rgba(255, 61, 56, 0.28);
          background: linear-gradient(150deg, rgba(255, 61, 56, 0.2), rgba(255, 61, 56, 0.05));
          color: #ff6b67;
          margin-bottom: 16px;
        }
        .nat-ico :global(svg) {
          width: 22px;
          height: 22px;
        }
        .nat-card-title {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #eaeef8;
          margin-bottom: 8px;
        }
        .nat-card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #9099b8;
        }

        @media (max-width: 900px) {
          .nat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          #not-a-tool {
            padding: 64px 18px;
          }
          .nat-grid {
            grid-template-columns: 1fr;
          }
          .nat-title {
            margin-bottom: 36px;
          }
        }
      `}</style>
    </section>
  );
}
