"use client";

import Reveal from "@/components/Reveal";

type Step = {
  num: string;
  tag: string;
  name: string;
  desc: string;
  tools: { src: string; label: string }[];
  pill?: string;
  active?: boolean;
};

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
    desc: "AI-personalized sequences at scale. Every reply is handled and qualified by our team - only confirmed interest reaches your calendar.",
    tools: [
      { src: "/images/logo-instantly.png", label: "Instantly" },
      { src: "/images/logo-claude.png", label: "Claude AI" },
      { src: "/images/logo-clay.png", label: "Clay" },
    ],
  },
  {
    num: "04",
    tag: "Conversion",
    name: "Sell",
    desc: "A qualified prospect lands on your calendar. You show up, close, and grow. Everything before this step? We handled it.",
    pill: "Your job starts here",
    active: true,
    tools: [
      { src: "/images/logo-calendly.png", label: "Calendly" },
      { src: "/images/logo-hubspot.png", label: "HubSpot" },
    ],
  },
];

export default function Framework() {
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
                  {s.tools.map((t, j) => (
                    <span className="step-tool" key={j}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.src} alt="" />
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
