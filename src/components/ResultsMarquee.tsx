"use client";

import Reveal from "@/components/Reveal";

const TRIAL_URL = "https://calculator.bleedai.com/trials";

type Camp = {
  icon: string;
  title: string;
  sub: string;
  stats: { v: string; l: string; green?: boolean }[];
  img: string;
};

const campaigns: Camp[] = [
  {
    icon: "💻",
    title: "SaaS Signup Trial Offer",
    sub: "529 opportunities · $942K pipeline",
    stats: [
      { v: "11,436", l: "Sequences" },
      { v: "8.32%", l: "Reply Rate" },
      { v: "55.57%", l: "Positive Reply", green: true },
      { v: "529", l: "Opportunities" },
    ],
    img: "/images/saas-signup-trial-offer.png",
  },
  {
    icon: "🎟️",
    title: "Paid Events Tickets Offer",
    sub: "102 opportunities · $107K pipeline",
    stats: [
      { v: "17,181", l: "Sequences" },
      { v: "2%", l: "Reply Rate" },
      { v: "65.8%", l: "Positive Reply", green: true },
      { v: "102", l: "Opportunities" },
    ],
    img: "/images/onezerotwo-oppurtunity-snaps.png",
  },
  {
    icon: "🎥",
    title: "SaaS / Tech — Video Production",
    sub: "45 qualified leads from 423 sequences",
    stats: [
      { v: "423", l: "Sequences" },
      { v: "10.17%", l: "Reply Rate" },
      { v: "46%", l: "Positive Reply", green: true },
      { v: "45", l: "Qualified Leads" },
    ],
    img: "/images/video-production-camp.png",
  },
  {
    icon: "📊",
    title: "Marketing Agency",
    sub: "18 sales opportunities in 1 month",
    stats: [
      { v: "1,572", l: "Sequences" },
      { v: "2.4%", l: "Reply Rate" },
      { v: "43.2%", l: "Positive Reply", green: true },
      { v: "18", l: "Opportunities" },
    ],
    img: "/images/sixteen-oppurtunity-snapshot.png",
  },
];

function Card({ c, hidden }: { c: Camp; hidden?: boolean }) {
  return (
    <div className="camp-card" aria-hidden={hidden}>
      <div className="camp-head">
        <div className="camp-icon">{c.icon}</div>
        <div>
          <div className="camp-title">{c.title}</div>
          <div className="camp-sub">{c.sub}</div>
        </div>
      </div>
      <div className="camp-stats">
        {c.stats.map((s, i) => (
          <div key={i}>
            <div className="camp-stat-v" style={s.green ? { color: "var(--green)" } : undefined}>
              {s.v}
            </div>
            <div className="camp-stat-l">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="camp-shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.img} alt={`${c.title} campaign dashboard`} loading="lazy" />
      </div>
    </div>
  );
}

export default function ResultsMarquee() {
  return (
    <section id="results-section">
      <div className="sec dark">
        <div className="sec-inner">
          <Reveal className="tpill">
            <div className="tpill-stars">★★★★★</div>
            <div className="tpill-quote">
              &ldquo;Generated a lot of great leads with a very targeted list. Excellent work.&rdquo;
            </div>
            <div className="tpill-author">Verified Upwork review</div>
          </Reveal>
          <Reveal className="sec-label">Campaign Snapshots</Reveal>
          <Reveal as="h2" className="sec-h2">
            We Don&apos;t Hope for Replies.
            <br />
            <em>We Engineer Them.</em>
          </Reveal>
          <Reveal as="p" className="sec-sub" delay={80}>
            Real campaigns, real clients, real data. These aren&apos;t cherry-picked outliers - they&apos;re what happens when cold email is engineered, not improvised.
          </Reveal>

          <Reveal className="camp-marquee">
            <div className="camp-track">
              {[...campaigns, ...campaigns].map((c, i) => (
                <Card key={i} c={c} hidden={i >= campaigns.length} />
              ))}
            </div>
          </Reveal>
          <div className="results-fade" />

          <div style={{ textAlign: "center", marginTop: 12 }}>
            <a href={TRIAL_URL} target="_blank" rel="noopener noreferrer" className="btn-red" style={{ fontSize: 13, padding: "11px 24px" }}>
              Get Results Like These →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
