"use client";

const items: [string, string][] = [
  ["SaaS Trial:", "529 opportunities · 8.32% reply rate"],
  ["Video Production:", "45 leads · 10.17% reply rate"],
  ["Coaching CRM:", "241 opportunities · 5.11% reply rate"],
  ["Paid Events:", "102 opportunities · $107K pipeline"],
  ["Recruitment Agency:", "24,486 contacts reached"],
  ["Marketing Agency:", "22.17% positive reply rate"],
];

export default function Ticker() {
  return (
    <div className="marquee-track">
      <div className="marquee-inner">
        {[...items, ...items].map(([label, text], i) => (
          <div className="marquee-item" key={i} aria-hidden={i >= items.length}>
            <span className="dot">●</span> <strong>{label}</strong> {text}
          </div>
        ))}
      </div>
    </div>
  );
}
