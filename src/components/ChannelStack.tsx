"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Channel = {
  n: string;
  day: string;
  title: string;
  desc: string;
  points: string[];
  accent: string;
  icon: React.ReactNode;
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
        // Accessible fallback: simple vertical stack, no pin, no horizontal move.
        track.style.flexDirection = "column";
        gsap.set(panels, { width: "100%", flex: "0 0 auto", marginBottom: 20 });
        dots.forEach((d, i) => d.classList.toggle("on", i === 0));
        return;
      }

      const setActive = (idx: number) =>
        dots.forEach((d, i) => d.classList.toggle("on", i === idx));
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

      // Subtle depth: inactive cards sit slightly back until they slide in.
      panels.forEach((panel, i) => {
        const card = panel.querySelector(".chan-card");
        if (!card || i === 0) return;
        gsap.fromTo(
          card,
          { scale: 0.9, opacity: 0.55 },
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
                        <span className="chan-dot" />
                        {p}
                      </li>
                    ))}
                  </ul>
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
          max-width: 1120px;
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
          max-width: 600px;
          display: flex;
          flex-direction: column;
          padding: 34px 34px 30px;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(160deg, #12121b 0%, #0b0b12 100%);
          box-shadow: 0 30px 80px -24px rgba(0, 0, 0, 0.85);
          overflow: hidden;
          will-change: transform, opacity;
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
          top: -60px;
          right: -60px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--acc) 0%, transparent 68%);
          opacity: 0.14;
          pointer-events: none;
        }
        .chan-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }
        .chan-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: color-mix(in srgb, var(--acc) 14%, transparent);
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
          font-size: 26px;
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
          max-width: 92%;
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
        .chan-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--acc);
          flex-shrink: 0;
          box-shadow: 0 0 10px var(--acc);
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
          background: #B1130F;
        }
        @media (max-width: 640px) {
          .chan-card {
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
