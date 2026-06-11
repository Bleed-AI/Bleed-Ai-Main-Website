"use client";

import Reveal from "@/components/Reveal";

const BOOK_URL = "/book-call/";

const pains = [
  { icon: "🔄", title: "Relying on Referrals", desc: "Unpredictable pipeline that dries up at random." },
  { icon: "💸", title: "Expensive Ads", desc: "Rising CAC quietly eating into your margins." },
  { icon: "👥", title: "Underperforming SDRs", desc: "An in-house team that isn't hitting targets." },
  { icon: "📉", title: "Agencies That Don't Deliver", desc: "Empty promises and zero pipeline to show." },
];

const industries = [
  { icon: "🏢", title: "B2B Agencies", desc: "Marketing, creative, dev, ops - you have retainer clients but your pipeline dries up when one leaves. We keep it full.", tag: "Marketing · Creative · Development" },
  { icon: "💻", title: "SaaS Companies", desc: "Your product sells itself on a demo. The problem is getting the right people on that demo. We solve that exact problem.", tag: "SMB · Mid-Market · B2B SaaS" },
  { icon: "🎯", title: "Consultants & Coaches", desc: "High-ticket offer, proven methodology, but referrals aren't scaling. We build you a cold outbound machine that runs without you.", tag: "Consulting · Coaching · Advisory" },
  { icon: "📋", title: "Recruitment Agencies", desc: "Client acquisition is a volume game. Our systems reach thousands of qualified companies per month with precision targeting.", tag: "Staffing · Executive Search · HR" },
  { icon: "🎬", title: "Media & Production", desc: "Video, podcast, content - your work speaks for itself but clients don't find you. We put you in front of companies actively spending on content.", tag: "Video · Podcast · Content" },
];

export default function WhoIsThisFor() {
  return (
    <section id="for-section">
      <div className="sec">
        <div className="sec-inner">
          <Reveal className="sec-label">Who Is This For</Reveal>
          <Reveal as="h2" className="sec-h2">
            Your offer works.
            <br />
            <em>You just need the right people to see it.</em>
          </Reveal>
          <Reveal as="p" className="sec-sub" delay={80}>
            We work with B2B companies that have a proven offer and need a predictable pipeline - not another agency promising results in &ldquo;3–6 months.&rdquo;
          </Reveal>

          <Reveal className="pain-intro">Stuck with one of these?</Reveal>
          <div className="pain-row">
            {pains.map((p, i) => (
              <Reveal className="pain-card" key={i} delay={i * 80}>
                <div className="pain-icon">{p.icon}</div>
                <div className="pain-ptitle">{p.title}</div>
                <div className="pain-desc">{p.desc}</div>
              </Reveal>
            ))}
          </div>
          <Reveal className="pain-bridge">
            If any of these sound familiar, here&apos;s exactly who we fix it for -
          </Reveal>

          <div className="for-grid">
            {industries.map((c, i) => (
              <Reveal className="for-card" key={i} delay={(i % 3) * 80}>
                <div className="for-icon">{c.icon}</div>
                <div className="for-title">{c.title}</div>
                <div className="for-desc">{c.desc}</div>
                <div className="for-tag">{c.tag}</div>
              </Reveal>
            ))}
            <Reveal
              className="for-card"
              delay={160}
              style={{
                borderStyle: "dashed",
                background: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 28,
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 10, opacity: 0.4 }}>?</div>
              <div className="for-title" style={{ fontSize: 13 }}>Not sure if your niche works?</div>
              <div className="for-desc" style={{ fontSize: 12, margin: "8px 0 14px" }}>
                We&apos;ll tell you honestly. Takes 5 minutes.
              </div>
              <a href={BOOK_URL} className="btn-red" style={{ fontSize: 12, padding: "9px 18px" }}>
                Check Niche Availability →
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
