"use client";

// A real looking LinkedIn feed post (light theme): avatar, name, headline, "1d", text with
// "...see more", a document carousel you can click through, the reaction row and counts.
// Shared by /shortlisted, /linkedin-authority and /inbound-engine (round 2, 2026-10-30).
// All people and companies are invented; the parent labels it Example.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SYS_FONT } from "./BrowserFrame";
import { useInView, useReducedMotion } from "./ui";

export type Slide = { kicker?: string; title: string; body?: string; big?: string; foot?: string };

function Reactions() {
  return (
    <span className="flex -space-x-1" aria-hidden="true">
      <span className="relative z-[3] flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#378fe9] ring-2 ring-white">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff">
          <path d="M2 21h3V9H2v12zm20-11a2 2 0 00-2-2h-6.3l1-4.6v-.3a1.5 1.5 0 00-.4-1L13.2 1 7.6 6.6A2 2 0 007 8v11a2 2 0 002 2h9a2 2 0 001.8-1.2l3-7a2 2 0 00.2-.8v-2z" />
        </svg>
      </span>
      <span className="relative z-[2] flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#44a35a] ring-2 ring-white">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff">
          <path d="M9 3l1.5 4.5L15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5zM17 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
        </svg>
      </span>
      <span className="relative z-[1] flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#df704d] ring-2 ring-white">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.3 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.7 0 6 3.8 4.5 7.3C19.5 16.4 12 21 12 21z" />
        </svg>
      </span>
    </span>
  );
}

function ActionIcon({ d, label }: { d: string; label: string }) {
  return (
    <span className="flex flex-1 items-center justify-center gap-1.5 rounded py-2.5 text-[13px] font-semibold text-[#666666]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
      <span className="hidden min-[400px]:inline">{label}</span>
    </span>
  );
}

/** A LinkedIn document carousel: grey title bar, square slide, arrows and a page count. */
export function DocCarousel({ title, slides, accent = "#0f4c81", accent2 = "#0b2f52" }: { title: string; slides: Slide[]; accent?: string; accent2?: string }) {
  const [i, setI] = useState(0);
  const s = slides[i];
  const cover = i === 0;
  return (
    <div className="border-y border-[#e8e8e8] bg-[#f3f2ef]">
      <div className="flex items-center justify-between bg-[#1d2226] px-3 py-1.5 text-[11.5px] text-white/85">
        <span className="truncate">
          {title} <span className="text-white/50">· {slides.length} pages</span>
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M4 14v6h6M20 10V4h-6M4 20l7-7M20 4l-7 7" />
        </svg>
      </div>
      <div className="relative mx-auto aspect-[4/5] max-h-[440px] w-full overflow-hidden" style={{ background: cover ? `linear-gradient(155deg, ${accent}, ${accent2})` : "#fbfaf7" }}>
        <div key={i} className="li-slide absolute inset-0 flex flex-col justify-between p-[7%]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: cover ? "rgba(255,255,255,0.75)" : accent }}>
              {s.kicker}
            </span>
            <span className="text-[11px] font-semibold" style={{ color: cover ? "rgba(255,255,255,0.6)" : "#8a8a8a" }}>
              {i + 1}/{slides.length}
            </span>
          </div>
          <div>
            {s.big && (
              <div className="mb-2 text-[clamp(44px,13vw,76px)] font-extrabold leading-none tracking-tight" style={{ color: cover ? "#fff" : accent }}>
                {s.big}
              </div>
            )}
            <div className="text-[clamp(21px,5.6vw,31px)] font-extrabold leading-[1.12] tracking-tight" style={{ color: cover ? "#fff" : "#141414" }}>
              {s.title}
            </div>
            {s.body && (
              <p className="mt-3 text-[clamp(13px,3.4vw,16px)] leading-snug" style={{ color: cover ? "rgba(255,255,255,0.82)" : "#4a4a4a" }}>
                {s.body}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-semibold" style={{ color: cover ? "rgba(255,255,255,0.8)" : "#555" }}>
              {s.foot ?? "Sarah Bennett · Northline Advisory"}
            </span>
            {cover && <span className="text-[12px] font-bold text-white">Swipe &rarr;</span>}
          </div>
        </div>
        {i > 0 && (
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => setI(i - 1)}
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        {i < slides.length - 1 && (
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setI(i + 1)}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
      <style jsx>{`
        .li-slide {
          animation: liIn 0.35s ease-out;
        }
        @keyframes liIn {
          from {
            opacity: 0;
            transform: translateX(14px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .li-slide {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function LinkedInFeedPost({
  name,
  headline,
  initials,
  avatarColor = "#5b6b8c",
  time = "1d",
  lines,
  visibleLines = 3,
  media,
  reactions,
  reactLead,
  comments,
  reposts,
  className = "",
}: {
  name: string;
  headline: string;
  initials: string;
  avatarColor?: string;
  time?: string;
  /** Post text, one entry per paragraph line. */
  lines: string[];
  /** Lines shown before "...see more". */
  visibleLines?: number;
  media?: ReactNode;
  reactions: number;
  /** e.g. "Mark Reyes and" shown before the count. */
  reactLead?: string;
  comments: number;
  reposts: number;
  className?: string;
}) {
  const [more, setMore] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const seen = useInView(ref, 0.35);
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);

  // Counts tick up once the post is on screen, then hold.
  useEffect(() => {
    if (!seen) return;
    if (reduce) {
      setP(1);
      return;
    }
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const x = Math.min((t - t0) / 1600, 1);
      setP(1 - Math.pow(1 - x, 3));
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduce]);

  const shown = more ? lines : lines.slice(0, visibleLines);
  const n = Math.round(reactions * p);

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-xl bg-white text-[#191919] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(0,0,0,0.08)] ${className}`}
      style={{ fontFamily: SYS_FONT }}
    >
      {/* Header */}
      <div className="flex items-start gap-2.5 px-4 pt-3">
        <span
          className="flex h-12 w-12 flex-none items-center justify-center rounded-full text-[15px] font-semibold text-white"
          style={{ background: avatarColor }}
        >
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[14px] font-semibold leading-tight text-[#191919]">
            <span className="truncate">{name}</span>
            <span className="flex-none text-[12.5px] font-normal text-[#666]">· 1st</span>
          </div>
          <div className="truncate text-[12px] leading-snug text-[#666]">{headline}</div>
          <div className="flex items-center gap-1 text-[12px] text-[#666]">
            {time} ·
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#666" aria-hidden="true">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 6h-3a15.6 15.6 0 00-1.4-3.6A8 8 0 0118.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8.2 8.2 0 010-4h3.4a16.5 16.5 0 000 4H4.3zm.8 2h3a15.6 15.6 0 001.4 3.6A8 8 0 015.1 16zm3-8h-3a8 8 0 014.3-3.6C8.9 5.5 8.4 6.7 8.1 8zM12 20c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 010-4h4.6a14.7 14.7 0 010 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h3a8 8 0 01-4.4 3.6zm1.7-5.6a16.5 16.5 0 000-4h3.4a8.2 8.2 0 010 4h-3.4z" />
            </svg>
          </div>
        </div>
        <span className="flex-none pt-1 text-[#666]" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.7" />
            <circle cx="12" cy="12" r="1.7" />
            <circle cx="19" cy="12" r="1.7" />
          </svg>
        </span>
      </div>

      {/* Text */}
      <div className="px-4 pb-3 pt-2 text-[14px] leading-[1.45] text-[#191919]">
        {shown.map((l, i) => (
          <p key={i} className={l === "" ? "h-3" : ""}>
            {!more && i === shown.length - 1 && lines.length > visibleLines ? l.replace(/[.!?]$/, "") : l}
            {!more && i === shown.length - 1 && lines.length > visibleLines && (
              <>
                <span className="text-[#666]">...</span>
                <button type="button" onClick={() => setMore(true)} className="ml-1 font-normal text-[#666] hover:underline">
                  see more
                </button>
              </>
            )}
          </p>
        ))}
      </div>

      {media}

      {/* Counts */}
      <div className="flex items-center justify-between px-4 py-2 text-[12px] text-[#666]">
        <span className="flex items-center gap-1.5">
          <Reactions />
          <span className="tabular-nums">
            {reactLead ? (
              <>
                <span className="hidden sm:inline">{`${reactLead} ${Math.max(0, n - 1)} others`}</span>
                <span className="sm:hidden">{n}</span>
              </>
            ) : (
              n
            )}
          </span>
        </span>
        <span className="whitespace-nowrap tabular-nums">
          {Math.round(comments * p)} comments · {Math.round(reposts * p)} reposts
        </span>
      </div>

      {/* Actions */}
      <div className="mx-3 flex border-t border-[#e8e8e8] pb-1">
        <ActionIcon label="Like" d="M7 10v11H4a1 1 0 01-1-1v-9a1 1 0 011-1h3zm0 0l4-8a2.6 2.6 0 014 2.6L14 9h5.6a2 2 0 012 2.3l-1.3 7.6A2.5 2.5 0 0117.8 21H7" />
        <ActionIcon label="Comment" d="M21 12a8 8 0 01-11.6 7.1L4 20l1.1-4.6A8 8 0 1121 12z" />
        <ActionIcon label="Repost" d="M17 2l4 4-4 4M3 11V9a3 3 0 013-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 01-3 3H3" />
        <ActionIcon label="Send" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </div>
    </div>
  );
}
