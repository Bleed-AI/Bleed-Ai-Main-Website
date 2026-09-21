"use client";

import { useEffect, useRef } from "react";

// --- tiny step icons -------------------------------------------------------
const IconSend = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);
const IconReply = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 17l-5-5 5-5" />
    <path d="M4 12h11a5 5 0 015 5v1" />
  </svg>
);
const IconCalendar = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M8 3v3M16 3v3" />
    <path d="M9 14.5l2 2 4-4" />
  </svg>
);
const IconConnect = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0111 0" />
    <path d="M18 7v6M15 10h6" />
  </svg>
);
const IconMessage = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.5 8.5 0 01-11.9 7.8L3 21l1.7-6A8.5 8.5 0 1121 11.5z" />
  </svg>
);
const IconPhone = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4h2.1c.6 0 1.13.4 1.29.99l.9 3.2a1.35 1.35 0 01-.35 1.31l-1.2 1.2a12 12 0 005.06 5.06l1.2-1.2c.35-.35.86-.48 1.31-.35l3.2.9c.59.16.99.69.99 1.29v2.1c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 014 5.5z" />
  </svg>
);
const IconCheck = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.5 2.5L16 9.5" />
  </svg>
);

type Step = { label: string; icon: React.ReactNode };
type Channel = {
  n: string;
  day: string;
  title: string;
  desc: string;
  points: string[];
  accent: string;
  accent2: string;
  icon: React.ReactNode;
  flow: Step[];
};

const channels: Channel[] = [
  {
    n: "01",
    day: "Day 1",
    title: "Email Outreach",
    desc: "Hyper-personalized cold email at scale — engineered to land in the primary inbox, so every send actually gets seen.",
    points: ["Primary-inbox deliverability", "Personalized at scale", "Reply-ready sequences"],
    accent: "#B1130F",
    accent2: "#ff6b67",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="M3 6.5l9 6 9-6" />
      </svg>
    ),
    flow: [
      { label: "Email sent", icon: IconSend },
      { label: "Smart follow-up", icon: IconReply },
      { label: "Call booked", icon: IconCalendar },
    ],
  },
  {
    n: "02",
    day: "Day 3",
    title: "LinkedIn Outreach",
    desc: "Warm, human touches that build familiarity before the ask — turning cold profiles into real conversations.",
    points: ["Profile-to-conversation flow", "Human, non-spammy touches", "Builds trust before the pitch"],
    accent: "#0A66C2",
    accent2: "#4f8bff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 5A1.94 1.94 0 113.06 5a1.94 1.94 0 013.88 0zM3.4 8.5h3.1V21H3.4V8.5zm5.2 0h2.97v1.7h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.73V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H8.6V8.5z" />
      </svg>
    ),
    flow: [
      { label: "Connect with leads", icon: IconConnect },
      { label: "Personal message", icon: IconMessage },
      { label: "Follow-up & reply", icon: IconReply },
    ],
  },
  {
    n: "03",
    day: "Ongoing",
    title: "CRM & Infrastructure",
    desc: "Every reply and warm lead lands in the CRM we set up for you — the infrastructure your team uses to follow up, call, and close. We build it; you work the pipeline.",
    points: ["Done-for-you CRM app", "You follow up & call inside it", "Full infra, set up by us"],
    accent: "#10b981",
    accent2: "#34e6a8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M9 9v11" />
      </svg>
    ),
    flow: [
      { label: "Lead lands in CRM", icon: IconConnect },
      { label: "Follow-up & call", icon: IconPhone },
      { label: "Deal closed", icon: IconCheck },
    ],
  },
];

export default function ChannelStack() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const dotsRef = useRef<(HTMLElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const n = channels.length;
    const reduce =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 760);

    if (reduce) {
      track.style.height = "auto";
      cardsRef.current.forEach((c) => {
        if (!c) return;
        c.style.position = "relative";
        c.style.top = "auto";
        c.style.opacity = "1";
        c.style.transform = "none";
        c.style.marginBottom = "22px";
      });
      dotsRef.current.forEach((d, i) => d?.classList.toggle("on", i === 0));
      return;
    }

    let raf = 0;
    let idle = 0;
    let target = 0;
    let current = 0;

    const computeTarget = () => {
      const scrollable = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), Math.max(scrollable, 1));
      target = scrollable > 0 ? scrolled / scrollable : 0;
    };

    // accent colors per channel, for the ambient glow that shifts as you scroll
    const accents = channels.map((c) => c.accent);
    const hexRgb = (h: string): [number, number, number] => {
      const v = parseInt(h.slice(1), 16);
      return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
    };
    const mix = (a: string, b: string, t: number) => {
      const A = hexRgb(a);
      const B = hexRgb(b);
      const c = (j: number) => Math.round(A[j] + (B[j] - A[j]) * t);
      return `${c(0)}, ${c(1)}, ${c(2)}`;
    };

    const render = (seg: number) => {
      const active = Math.round(seg);

      // ambient glow: interpolate between the two nearest channel accents
      const i0 = Math.max(0, Math.min(n - 1, Math.floor(seg)));
      const i1 = Math.max(0, Math.min(n - 1, i0 + 1));
      const rgb = mix(accents[i0], accents[i1], seg - i0);
      if (glowRef.current) {
        glowRef.current.style.background =
          `radial-gradient(closest-side at 50% 42%, rgba(${rgb}, 0.22), rgba(${rgb}, 0.05) 55%, transparent 72%)`;
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const d = seg - i; // 0 = centered/active
        const ad = Math.abs(d);
        const y = -d * 40;
        const z = -ad * 60; // recede in 3D
        const rot = Math.max(-16, Math.min(16, -d * 11)); // tilt as it passes
        const op = Math.max(0, 1 - ad * 1.2);
        const scale = 1 - Math.min(ad * 0.06, 0.16);
        card.style.transform =
          `translate3d(0, calc(-50% + ${y.toFixed(2)}px), ${z.toFixed(1)}px) rotateX(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.style.opacity = op.toFixed(3);
        card.style.zIndex = String(Math.round(100 - ad * 10));
        card.style.pointerEvents = ad < 0.5 ? "auto" : "none";
      });
      dotsRef.current.forEach((dot, i) => dot?.classList.toggle("on", i === active));
    };

    // Continuous easing loop: current glides toward the scroll target every
    // frame, so motion stays buttery on wheel and trackpad alike.
    const loop = () => {
      current += (target - current) * 0.11;
      if (Math.abs(target - current) < 0.00025) {
        current = target;
        idle += 1;
      } else {
        idle = 0;
      }
      render(current * (n - 1));
      raf = idle < 12 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      computeTarget();
      idle = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    computeTarget();
    current = target;
    render(current * (n - 1));
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="channels">
      <div className="chan-track" ref={trackRef}>
        <div className="chan-sticky">
          <div className="chan-glow" ref={glowRef} aria-hidden="true" />
          <div className="chan-head">
            <div className="sec-label">Every Channel, One System</div>
            <h2 className="sec-h2">
              We don&apos;t just send emails.
              <br />
              <em>We reach them everywhere.</em>
            </h2>
          </div>

          <div className="chan-stage">
            {channels.map((c, idx) => (
              <article
                key={c.n}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="chan-card"
                style={{ "--acc": c.accent, "--acc2": c.accent2 } as React.CSSProperties}
              >
                <span className="chan-watermark">{c.n}</span>

                <div className="chan-card-top">
                  <span className="chan-icon">{c.icon}</span>
                  <span className="chan-day">
                    <span className="chan-day-dot" />
                    {c.day}
                  </span>
                </div>
                <h3 className="chan-title">{c.title}</h3>
                <p className="chan-desc">{c.desc}</p>

                <div className="chan-card-body">
                  <ul className="chan-points">
                    {c.points.map((p) => (
                      <li key={p}>
                        <span className="chan-bullet" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="chan-flow" aria-hidden="true">
                    <div className="chan-flow-label">The sequence</div>
                    {c.flow.map((s, i) => (
                      <div key={s.label} className="flow-step" style={{ animationDelay: `${i * 1}s` }}>
                        <span className="flow-ico">{s.icon}</span>
                        <span className="flow-text">{s.label}</span>
                        {i < c.flow.length - 1 && <span className="flow-line" />}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="chan-progress">
            {channels.map((c, i) => (
              <span
                key={c.n}
                ref={(el) => { dotsRef.current[i] = el; }}
                className="chan-pd"
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        #channels {
          position: relative;
        }
        /* pinned: section holds one screen of scroll; cards transition within */
        .chan-track {
          position: relative;
          height: 210vh;
        }
        .chan-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 46px 22px 34px;
          overflow: hidden;
        }
        .chan-glow {
          position: absolute;
          inset: -12%;
          z-index: 0;
          pointer-events: none;
          filter: blur(30px);
          transition: background 0.25s linear;
        }
        .chan-head {
          position: relative;
          z-index: 2;
          flex: 0 0 auto;
          text-align: center;
          max-width: 640px;
          margin: 0 auto;
        }
        .chan-stage {
          position: relative;
          z-index: 1;
          flex: 1 1 auto;
          width: 100%;
          max-width: 900px;
          align-self: center;
          perspective: 1300px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 7%, #000 93%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0, #000 7%, #000 93%, transparent 100%);
        }
        .chan-card {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          opacity: 0;
          transform: translate3d(0, -50%, 0);
          transform-style: preserve-3d;
          will-change: transform, opacity;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(160deg, #14141e 0%, #0b0b12 100%);
          box-shadow: 0 34px 90px -26px rgba(0, 0, 0, 0.92);
          padding: 28px 32px;
          overflow: hidden;
        }
        .chan-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--acc), var(--acc2));
        }
        .chan-card::after {
          content: "";
          position: absolute;
          top: -90px;
          right: -90px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--acc) 0%, transparent 68%);
          opacity: 0.16;
          pointer-events: none;
        }
        .chan-watermark {
          position: absolute;
          top: -34px;
          right: 22px;
          z-index: 0;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 200px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -6px;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.05);
          pointer-events: none;
          user-select: none;
        }
        .chan-card-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .chan-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          border: 1px solid color-mix(in srgb, var(--acc) 28%, rgba(255, 255, 255, 0.1));
          background: linear-gradient(150deg, var(--acc), var(--acc2));
          color: #fff;
          box-shadow: 0 0 24px -4px var(--acc);
        }
        .chan-icon :global(svg) {
          width: 28px;
          height: 28px;
        }
        .chan-day {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 15px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--acc) 40%, transparent);
          background: color-mix(in srgb, var(--acc) 12%, transparent);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--acc2);
        }
        .chan-day-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--acc2);
          box-shadow: 0 0 8px var(--acc2);
        }
        .chan-title {
          position: relative;
          z-index: 1;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.6px;
          margin-bottom: 8px;
          background: linear-gradient(90deg, #ffffff, color-mix(in srgb, var(--acc2) 70%, #ffffff));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .chan-desc {
          position: relative;
          z-index: 1;
          font-size: 15px;
          line-height: 1.55;
          color: #9099b8;
          max-width: 640px;
          margin-bottom: 18px;
        }
        .chan-card-body {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          align-items: start;
        }
        .chan-points {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .chan-points li {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 15px;
          color: #c7cbe0;
        }
        .chan-bullet {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--acc2);
          flex-shrink: 0;
          box-shadow: 0 0 10px var(--acc2);
        }

        /* ---- animated mini-sequence ---- */
        .chan-flow {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 13px;
          padding: 16px 18px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--acc) 7%, rgba(255, 255, 255, 0.02)),
            rgba(255, 255, 255, 0.015)
          );
        }
        .chan-flow-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #6a7192;
        }
        .flow-step {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0.4;
          animation: flowStep 3s ease-in-out infinite;
        }
        .flow-ico {
          position: relative;
          z-index: 1;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          border: 1px solid color-mix(in srgb, var(--acc) 30%, rgba(255, 255, 255, 0.08));
          background: #0d0d15;
          color: var(--acc2);
        }
        .flow-ico :global(svg) {
          width: 18px;
          height: 18px;
        }
        .flow-text {
          font-size: 14px;
          font-weight: 600;
          color: #e4e7f2;
        }
        .flow-line {
          position: absolute;
          left: 18px;
          top: 38px;
          width: 2px;
          height: 16px;
          background: linear-gradient(var(--acc), transparent);
          opacity: 0.4;
          transform-origin: top;
        }
        .flow-step:nth-child(2) .flow-line { animation: flowLine 3s ease-in-out infinite; animation-delay: 0.35s; }
        .flow-step:nth-child(3) .flow-line { animation: flowLine 3s ease-in-out infinite; animation-delay: 1.35s; }
        @keyframes flowLine {
          0%, 20% { transform: scaleY(0.2); opacity: 0.25; }
          35%, 58% { transform: scaleY(1); opacity: 0.9; }
          75%, 100% { transform: scaleY(0.2); opacity: 0.25; }
        }
        @keyframes flowStep {
          0%, 100% { opacity: 0.4; }
          8% { opacity: 1; }
          28% { opacity: 1; }
          40% { opacity: 0.4; }
        }
        .flow-step:nth-child(2) .flow-ico { animation: flowGlow 3s ease-in-out infinite; animation-delay: 0s; }
        .flow-step:nth-child(3) .flow-ico { animation: flowGlow 3s ease-in-out infinite; animation-delay: 1s; }
        .flow-step:nth-child(4) .flow-ico { animation: flowGlow 3s ease-in-out infinite; animation-delay: 2s; }
        @keyframes flowGlow {
          0%, 40%, 100% {
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            transform: scale(1);
            background: #0d0d15;
            color: var(--acc2);
            border-color: color-mix(in srgb, var(--acc) 30%, rgba(255, 255, 255, 0.08));
          }
          12%, 26% {
            box-shadow: 0 0 24px color-mix(in srgb, var(--acc) 60%, transparent);
            transform: scale(1.08);
            background: linear-gradient(150deg, var(--acc), var(--acc2));
            color: #fff;
            border-color: var(--acc);
          }
        }

        /* progress dots */
        .chan-progress {
          flex: 0 0 auto;
          display: flex;
          gap: 9px;
          margin-top: 18px;
        }
        .chan-pd {
          width: 28px;
          height: 4px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.14);
          transition: width 0.3s, background 0.3s;
        }
        .chan-pd.on {
          width: 44px;
          background: #ff6b67;
        }

        @media (max-width: 760px) {
          .chan-track { height: auto; }
          .chan-sticky { position: static; height: auto; overflow: visible; padding: 60px 20px; }
          .chan-stage { height: auto; }
          .chan-card { padding: 24px 20px; margin-bottom: 22px; }
          .chan-title { font-size: 24px; }
          .chan-card-body { grid-template-columns: 1fr; gap: 18px; }
          .chan-progress { display: none; }
        }
      `}</style>
    </section>
  );
}
