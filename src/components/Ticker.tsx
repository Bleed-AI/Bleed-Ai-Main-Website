"use client";

// Topbar-style ticker: thin, ambient social proof above the navigation.
// Mixes real campaign results, testimonial snippets, ratings, and press.
const items: { label: string; value: string }[] = [
  { label: "SaaS Trial:", value: "529 opps · $942K pipeline" },
  { label: "★ 5.0", value: "across Upwork · Clutch · TechReviewer" },
  { label: "“100+ opps in December”", value: "— Martijn V., Group Effort" },
  { label: "Video Production:", value: "45 leads · 46% positive reply rate" },
  { label: "Featured in", value: "USAWire" },
  { label: "Paid Events:", value: "$107K pipeline · 65.8% positive reply rate" },
  { label: "“Spam rate from 40% to near zero”", value: "— Ahmad J., TEDx Speaker" },
  { label: "Coaching CRM:", value: "241 opps · 32% positive reply rate" },
];

export default function Ticker() {
  return (
    <div className="relative w-full bg-[#150708] border-b border-[#B1130F]/40 overflow-hidden">
      <div
        className="flex items-center h-9 sm:h-10 animate-marquee hover:[animation-play-state:paused]"
        style={{ width: "max-content", animationDuration: "60s" }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-5 sm:px-7 text-[11px] sm:text-xs whitespace-nowrap"
            aria-hidden={i >= items.length}
          >
            <span className="w-1 h-1 rounded-full bg-[#B1130F] flex-shrink-0" />
            <strong className="font-semibold text-white/90">{item.label}</strong>
            <span className="text-white/55">{item.value}</span>
          </div>
        ))}
      </div>
      {/* Edge fades for cinematic look */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#150708] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#150708] to-transparent pointer-events-none" />
    </div>
  );
}
