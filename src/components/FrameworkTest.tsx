"use client";

import Reveal from "@/components/Reveal";

type Channel = { label: string; color: string; icon: React.ReactNode };
type Step = {
  num: string;
  tag: string;
  name: string;
  desc: string;
  tools: { src: string; label: string }[];
  channels?: Channel[];
  pill?: string;
  active?: boolean;
};

const EmailIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3 6.5l9 6 9-6" />
  </svg>
);
const LinkedinIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.94 5A1.94 1.94 0 113.06 5a1.94 1.94 0 013.88 0zM3.4 8.5h3.1V21H3.4V8.5zm5.2 0h2.97v1.7h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.73V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H8.6V8.5z" />
  </svg>
);
const TruckIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.5" y="6" width="12.5" height="9" rx="1.5" />
    <path d="M14 9h3.5l3 3v3H14z" />
    <circle cx="5.5" cy="17.5" r="1.6" />
    <circle cx="17" cy="17.5" r="1.6" />
  </svg>
);
const PhoneIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4h2.1c.6 0 1.13.4 1.29.99l.9 3.2a1.35 1.35 0 01-.35 1.31l-1.2 1.2a12 12 0 005.06 5.06l1.2-1.2c.35-.35.86-.48 1.31-.35l3.2.9c.59.16.99.69.99 1.29v2.1c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 014 5.5z" />
  </svg>
);

const steps: Step[] = [
  {
    num: "01",
    tag: "Target",
    name: "Profile",
    desc: "AI analyzes your best existing clients and builds a lookalike list of companies that fit the same profile. Surgical, not spray-and-pray.",
    tools: [
      { src: "/images/logo-clay.png", label: "Clay" },
      { src: "/images/logo-apollo.png", label: "Apollo" },
      { src: "/images/logo-linkedin.png", label: "LinkedIn" },
    ],
  },
  {
    num: "02",
    tag: "Infrastructure",
    name: "Build",
    desc: "Fresh sending domains, proper DNS setup (SPF/DKIM/DMARC), 3–4 week mailbox warmup. 98%+ inbox placement before a single email goes out.",
    tools: [
      { src: "/images/logo-smartlead.png", label: "Smartlead" },
      { src: "/images/logo-instantly.png", label: "Instantly" },
      { src: "/images/logo-mailreach.png", label: "Mailreach" },
    ],
  },
  {
    num: "03",
    tag: "Outreach",
    name: "Reach",
    desc: "AI-personalized outreach across email, LinkedIn, and direct mail. Every reply is qualified and lands in your CRM — only confirmed interest reaches your calendar.",
    tools: [],
    channels: [
      { label: "Email", color: "#ff5b56", icon: EmailIcon },
      { label: "LinkedIn", color: "#4f8bff", icon: LinkedinIcon },
      { label: "Direct Mail", color: "#f5a623", icon: TruckIcon },
    ],
  },
  {
    num: "04",
    tag: "Conversion",
    name: "Sell",
    desc: "Replies land in your CRM, where your team follows up by call & SMS and books the meeting. You show up, close, and grow — everything before this step, we handled.",
    pill: "Your job starts here",
    active: true,
    channels: [
      { label: "Call & SMS", color: "#10b981", icon: PhoneIcon },
    ],
    tools: [
      { src: "/images/logo-calendly.png", label: "Calendly" },
      { src: "/images/logo-hubspot.png", label: "HubSpot" },
    ],
  },
];

export default function FrameworkTest() {
  return (
    <section id="framework">
      <div className="framework-wrap">
        <div className="framework-inner">
          <div style={{ textAlign: "center" }}>
            <Reveal className="tpill" style={{ margin: "0 auto 20px" }}>
              <div className="tpill-stars">★★★★★</div>
              <div className="tpill-quote">
                &ldquo;Strong understanding of cold email infrastructure, copy rotation, and best practices. Responds quickly, stays highly knowledgeable.&rdquo;
              </div>
              <div className="tpill-author">Verified Upwork review</div>
            </Reveal>
            <Reveal className="sec-label" style={{ textAlign: "center" }}>The Cold-to-Sold System</Reveal>
            <Reveal as="h2" className="sec-h2" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 12px" }}>
              Four engineered steps.
              <br />
              <em>One outcome: a booked calendar.</em>
            </Reveal>
            <Reveal
              as="p"
              delay={80}
              style={{ color: "var(--sub)", fontSize: 15, maxWidth: 500, margin: "0 auto", textAlign: "center" }}
            >
              Not improvised. Not guesswork. Built by an AI engineer and refined across 85+ client campaigns in 12+ industries.
            </Reveal>
          </div>

          <div className="steps-row">
            {steps.map((s, i) => (
              <Reveal className={`step${s.active ? " active" : ""}`} key={i} delay={i * 90}>
                <div className="step-num">{s.num}</div>
                <div className="step-tag">{s.tag}</div>
                <div className="step-name">{s.name}</div>
                <div className="step-desc">{s.desc}</div>
                {s.pill && <div className="step-pill">{s.pill}</div>}
                <div className="step-tools">
                  {s.channels?.map((c, j) => (
                    <span className="step-tool" key={`c${j}`}>
                      <span style={{ color: c.color, display: "inline-flex", alignItems: "center" }}>{c.icon}</span>
                      {c.label}
                    </span>
                  ))}
                  {s.tools.map((t, j) => (
                    <span className="step-tool" key={`t${j}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.src} alt={`${t.label} logo`} />
                      {t.label}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
