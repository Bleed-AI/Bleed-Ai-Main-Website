"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
const IconSms = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.5 8.5 0 01-11.9 7.8L3 21l1.7-6A8.5 8.5 0 1121 11.5z" />
    <path d="M8 10h8M8 13.5h5" />
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
    day: "Day 6",
    title: "Call & SMS Outreach",
    desc: "Direct voice and text follow-up that closes the loop — reaching prospects where the response is instant.",
    points: ["Instant, direct contact", "Voice + text follow-up", "Closes the loop to booked calls"],
    accent: "#10b981",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5.5C4 4.7 4.7 4 5.5 4h2.1c.6 0 1.13.4 1.29.99l.9 3.2a1.35 1.35 0 01-.35 1.31l-1.2 1.2a12 12 0 005.06 5.06l1.2-1.2c.35-.35.86-.48 1.31-.35l3.2.9c.59.16.99.69.99 1.29v2.1c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 014 5.5z" />
      </svg>
    ),
    flow: [
      { label: "SMS sent", icon: IconSms },
      { label: "Direct call", icon: IconPhone },
      { label: "Deal booked", icon: IconCheck },
    ],
  },
];

export default function ChannelStack() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;

      const panels = gsap.utils.toArray<HTMLElement>(".chan-panel");
      const dots = dotsRef.current
        ? gsap.utils.toArray<HTMLElement>(dotsRef.current.children)
        : [];
      const n = panels.length;

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        track.style.flexDirection = "column";
        gsap.set(panels, { width: "100%", flex: "0 0 auto", marginBottom: 20 });
        dots.forEach((d, i) => d.classList.toggle("on", i === 0));
        return;
      }

      const accents = channels.map((c) => c.accent);
      const setActive = (idx: number) =>
        dots.forEach((d, i) => {
          const on = i === idx;
          d.classList.toggle("on", on);
          d.style.background = on ? accents[idx] : "";
        });
      setActive(0);

      gsap.to(track, {
        x: () => -(track.scrollWidth - viewport.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + (track.scrollWidth - viewport.clientWidth),
          pin: pinRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.round(self.progress * (n - 1))),
        },
      });

      panels.forEach((panel, i) => {
        const card = panel.querySelector(".chan-card");
        if (!card || i === 0) return;
        gsap.fromTo(
          card,
          { scale: 0.92, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => "top+=" + (i - 0.85) * viewport.clientWidth + " top",
              end: () => "top+=" + i * viewport.clientWidth + " top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="channels">
      <div ref={pinRef} className="chan-pin">
        <div className="chan-head">
          <div className="sec-label">Every Channel, One System</div>
          <h2 className="sec-h2">
            We don&apos;t just send emails.
            <br />
            <em>We reach them everywhere.</em>
          </h2>
        </div>

        <div ref={viewportRef} className="chan-viewport">
          <div ref={trackRef} className="chan-track">
            {channels.map((c) => (
              <div key={c.n} className="chan-panel">
                <article className="chan-card" style={{ "--acc": c.accent } as React.CSSProperties}>
                  <span className="chan-watermark">{c.n}</span>
                  {/* LEFT: copy */}
                  <div className="chan-card-left">
                    <div className="chan-card-top">
                      <span className="chan-icon">{c.icon}</span>
                      <span className="chan-day">
                        <span className="chan-day-dot" />
                        {c.day}
                      </span>
                    </div>
                    <h3 className="chan-title">{c.title}</h3>
                    <p className="chan-desc">{c.desc}</p>
                    <ul className="chan-points">
                      {c.points.map((p) => (
                        <li key={p}>
                          <span className="chan-bullet" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* RIGHT: animated mini-sequence */}
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
                </article>
              </div>
            ))}
          </div>
        </div>

        <div ref={dotsRef} className="chan-progress">
          {channels.map((c) => (
            <span key={c.n} className="chan-pd" />
          ))}
        </div>
      </div>

      <style jsx>{`
        #channels {
          position: relative;
        }
        .chan-pin {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
          padding: 60px 22px;
          overflow: hidden;
        }
        .chan-head {
          text-align: center;
          max-width: 640px;
        }
        .chan-viewport {
          width: 100%;
          max-width: 1180px;
          overflow: hidden;
        }
        .chan-track {
          display: flex;
          will-change: transform;
        }
        .chan-panel {
          flex: 0 0 100%;
          display: flex;
          justify-content: center;
          padding: 0 8px;
        }
        .chan-card {
          position: relative;
          width: 100%;
          max-width: 960px;
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 30px;
          padding: 38px 40px 36px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          box-shadow: 0 30px 80px -24px rgba(0, 0, 0, 0.85);
          overflow: hidden;
          will-change: transform, opacity;
          transition: border-color 0.35s, box-shadow 0.35s;
        }
        .chan-card:hover {
          border-color: color-mix(in srgb, var(--acc) 45%, rgba(255, 255, 255, 0.1));
          box-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.9),
            0 0 44px -10px color-mix(in srgb, var(--acc) 45%, transparent);
        }
        .chan-watermark {
          position: absolute;
          top: -34px;
          right: 18px;
          z-index: 0;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 190px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -6px;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.05);
          pointer-events: none;
          user-select: none;
        }
        .chan-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--acc);
        }
        .chan-card::after {
          content: "";
          position: absolute;
          top: -70px;
          right: -70px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--acc) 0%, transparent 68%);
          opacity: 0.14;
          pointer-events: none;
        }
        .chan-card-left {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .chan-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .chan-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          border: 1px solid color-mix(in srgb, var(--acc) 28%, rgba(255, 255, 255, 0.1));
          background: linear-gradient(
            150deg,
            color-mix(in srgb, var(--acc) 26%, transparent),
            color-mix(in srgb, var(--acc) 7%, transparent)
          );
          box-shadow: inset 0 0 16px color-mix(in srgb, var(--acc) 16%, transparent);
          color: var(--acc);
        }
        .chan-icon :global(svg) {
          width: 26px;
          height: 26px;
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
          color: var(--acc);
        }
        .chan-day-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--acc);
          box-shadow: 0 0 8px var(--acc);
        }
        .chan-title {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 27px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #eaeef8;
          margin-bottom: 10px;
        }
        .chan-desc {
          font-size: 15px;
          line-height: 1.6;
          color: #9099b8;
          margin-bottom: 20px;
        }
        .chan-points {
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin-top: auto;
        }
        .chan-points li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #c7cbe0;
        }
        .chan-bullet {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--acc);
          flex-shrink: 0;
          box-shadow: 0 0 10px var(--acc);
        }

        /* ---- animated mini-sequence (right) ---- */
        .chan-flow {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding: 22px 22px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--acc) 6%, rgba(255, 255, 255, 0.02)),
            rgba(255, 255, 255, 0.015)
          );
        }
        .chan-flow-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #6a7192;
          margin-bottom: 2px;
        }
        .flow-step {
          position: relative;
          display: flex;
          align-items: center;
          gap: 13px;
          opacity: 0.4;
          animation: flowStep 3s ease-in-out infinite;
        }
        .flow-ico {
          position: relative;
          z-index: 1;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          border: 1px solid color-mix(in srgb, var(--acc) 30%, rgba(255, 255, 255, 0.08));
          background: #0d0d15;
          color: var(--acc);
          transition: box-shadow 0.3s;
        }
        .flow-ico :global(svg) {
          width: 19px;
          height: 19px;
        }
        .flow-text {
          font-size: 14.5px;
          font-weight: 600;
          color: #e4e7f2;
        }
        .flow-line {
          position: absolute;
          left: 19px;
          top: 40px;
          width: 2px;
          height: 18px;
          background: linear-gradient(var(--acc), transparent);
          opacity: 0.4;
          transform-origin: top;
        }
        .flow-step:nth-child(2) .flow-line {
          animation: flowLine 3s ease-in-out infinite;
          animation-delay: 0.35s;
        }
        .flow-step:nth-child(3) .flow-line {
          animation: flowLine 3s ease-in-out infinite;
          animation-delay: 1.35s;
        }
        @keyframes flowLine {
          0%,
          20% {
            transform: scaleY(0.2);
            opacity: 0.25;
          }
          35%,
          58% {
            transform: scaleY(1);
            opacity: 0.9;
          }
          75%,
          100% {
            transform: scaleY(0.2);
            opacity: 0.25;
          }
        }
        @keyframes flowStep {
          0%,
          100% {
            opacity: 0.4;
          }
          8% {
            opacity: 1;
          }
          28% {
            opacity: 1;
          }
          40% {
            opacity: 0.4;
          }
        }
        .flow-step:nth-child(2) .flow-ico {
          animation: flowGlow 3s ease-in-out infinite;
          animation-delay: 0s;
        }
        .flow-step:nth-child(3) .flow-ico {
          animation: flowGlow 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        .flow-step:nth-child(4) .flow-ico {
          animation: flowGlow 3s ease-in-out infinite;
          animation-delay: 2s;
        }
        @keyframes flowGlow {
          0%,
          40%,
          100% {
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            transform: scale(1);
            background: #0d0d15;
            color: var(--acc);
            border-color: color-mix(in srgb, var(--acc) 30%, rgba(255, 255, 255, 0.08));
          }
          12%,
          26% {
            box-shadow: 0 0 24px color-mix(in srgb, var(--acc) 60%, transparent);
            transform: scale(1.08);
            background: var(--acc);
            color: #fff;
            border-color: var(--acc);
          }
        }

        .chan-progress {
          display: flex;
          gap: 8px;
        }
        .chan-pd {
          width: 26px;
          height: 4px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.14);
          transition: background 0.3s, width 0.3s;
        }
        .chan-progress :global(.chan-pd.on) {
          width: 40px;
        }

        @media (max-width: 760px) {
          .chan-card {
            grid-template-columns: 1fr;
            gap: 22px;
            padding: 26px 22px;
          }
          .chan-title {
            font-size: 22px;
          }
        }
      `}</style>
    </section>
  );
}
