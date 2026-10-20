"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Pass = { n: string; day: string; title: string; door: string; color: string };
const passes: Pass[] = [
  { n: "1", day: "Day 0", title: "Warm on LinkedIn", door: "LinkedIn", color: "#4f8bff" },
  { n: "2", day: "Day 3", title: "The give", door: "Email", color: "#ff5b56" },
  { n: "3", day: "Day 12", title: "Inside the team", door: "Email + LinkedIn", color: "#a855f7" },
  { n: "4", day: "Day 20", title: "Every door", door: "Mail + Phone", color: "#f5a623" },
];

type Branch = { label: string; color: string };
const branches: Branch[] = [
  { label: "Yes", color: "#22c98a" },
  { label: "Yes, then quiet", color: "#4f8bff" },
  { label: "Not now", color: "#f5a623" },
  { label: "Remove me", color: "#9099b8" },
];

export default function PassSystem() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop with motion: pin + scrub. Everything else keeps the CSS
      // finished state (no pin), per the reduced-motion / touch rule.
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(".ps-line-fill", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".ps-pass", { opacity: 0.3 });
        gsap.set(".ps-branch-line", { scaleY: 0, transformOrigin: "top center" });
        gsap.set(".ps-branch-chip", { opacity: 0, y: 12 });
        gsap.set(".ps-fork-reply", { opacity: 0.3, scale: 0.94 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: pinRef.current,
            scrub: 0.5,
            anticipatePin: 1,
          },
        });

        tl.to(".ps-line-fill", { scaleX: 1, ease: "none", duration: 4 }, 0);
        passes.forEach((_, i) => {
          tl.to(`.ps-pass-${i}`, { opacity: 1, ease: "power2.out", duration: 0.7 }, i * 0.9);
        });
        tl.to(".ps-fork-reply", { opacity: 1, scale: 1, ease: "power2.out", duration: 0.5 }, 3.4);
        tl.to(".ps-branch-line", { scaleY: 1, stagger: 0.09, ease: "power2.out", duration: 0.4 }, 3.7);
        tl.to(".ps-branch-chip", { opacity: 1, y: 0, stagger: 0.09, ease: "power2.out", duration: 0.4 }, 3.9);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="pass-system">
      <div ref={pinRef} className="ps-pin">
        <div className="ps-head">
          <div className="sec-label">The Pass System</div>
          <h2 className="ps-title">
            One email is easy to ignore.
            <br />
            <em>Four doors in 30 days is not.</em>
          </h2>
          <p className="ps-sub">
            We work your target accounts in passes. Each pass uses a new door and a better reason,
            so the person who signs actually sees you.
          </p>
        </div>

        <div className="ps-stage">
          <div className="ps-nodes">
            <span className="ps-line">
              <span className="ps-line-fill" />
            </span>
            {passes.map((p, i) => (
              <div className={`ps-pass ps-pass-${i}`} key={p.n} style={{ ["--c" as string]: p.color } as React.CSSProperties}>
                <span className="ps-dot">{p.n}</span>
                <span className="ps-day">{p.day}</span>
                <span className="ps-pass-title">{p.title}</span>
                <span className="ps-door">{p.door}</span>
              </div>
            ))}
          </div>

          <div className="ps-fork">
            <span className="ps-fork-reply">A reply lands. It can go four ways.</span>
            <div className="ps-branches">
              {branches.map((b) => (
                <div className="ps-branch" key={b.label} style={{ ["--c" as string]: b.color } as React.CSSProperties}>
                  <span className="ps-branch-line" />
                  <span className="ps-branch-chip">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        #pass-system {
          position: relative;
        }
        .ps-pin {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 46px;
          padding: 70px 22px;
        }
        .ps-head {
          text-align: center;
          max-width: 680px;
        }
        .ps-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(28px, 4.2vw, 48px);
          font-weight: 400;
          line-height: 1.08;
          color: #eaeef8;
          margin-bottom: 14px;
        }
        .ps-title em {
          font-style: italic;
          background: linear-gradient(90deg, #ff3d38, #ff8a86);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .ps-sub {
          font-size: 15.5px;
          line-height: 1.6;
          color: #9099b8;
          max-width: 560px;
          margin: 0 auto;
        }

        .ps-stage {
          width: 100%;
          max-width: 1000px;
        }
        .ps-nodes {
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }
        .ps-line {
          position: absolute;
          top: 16px;
          left: 12.5%;
          right: 12.5%;
          height: 3px;
          background: linear-gradient(
            90deg,
            rgba(79, 139, 255, 0.4),
            rgba(255, 91, 86, 0.4),
            rgba(168, 85, 247, 0.4),
            rgba(245, 166, 35, 0.4)
          );
          border-radius: 3px;
          overflow: hidden;
          z-index: 0;
        }
        .ps-line-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #4f8bff, #ff5b56, #a855f7, #f5a623);
          transform-origin: left center;
        }
        .ps-pass {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
        }
        .ps-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 800;
          font-size: 14px;
          color: #fff;
          background: var(--c);
          box-shadow: 0 0 0 5px #0a0a10, 0 0 20px -2px var(--c);
          margin-bottom: 4px;
        }
        .ps-day {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 700;
          color: var(--c);
          letter-spacing: 0.5px;
        }
        .ps-pass-title {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #eaeef8;
        }
        .ps-door {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11.5px;
          color: #6a7192;
        }

        .ps-fork {
          margin-top: 54px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ps-fork-reply {
          display: inline-flex;
          padding: 9px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.03);
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 13px;
          color: #c7cbe0;
        }
        .ps-branches {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 26px;
          margin-top: 6px;
        }
        .ps-branch {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ps-branch-line {
          width: 2px;
          height: 24px;
          background: linear-gradient(var(--c), transparent);
          transform-origin: top center;
        }
        .ps-branch-chip {
          margin-top: 2px;
          padding: 7px 14px;
          border-radius: 9px;
          border: 1px solid color-mix(in srgb, var(--c) 45%, transparent);
          background: color-mix(in srgb, var(--c) 10%, transparent);
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 12.5px;
          font-weight: 700;
          color: var(--c);
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .ps-pin {
            min-height: 0;
            gap: 32px;
            padding: 60px 20px;
          }
          .ps-nodes {
            flex-direction: column;
            gap: 20px;
          }
          .ps-line {
            display: none;
          }
          .ps-pass {
            flex-direction: row;
            text-align: left;
            align-items: center;
            gap: 12px;
            padding: 12px 14px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.09);
            background: #12121b;
          }
          .ps-dot {
            margin-bottom: 0;
            box-shadow: 0 0 20px -2px var(--c);
            flex-shrink: 0;
          }
          .ps-pass > .ps-day,
          .ps-pass > .ps-pass-title,
          .ps-pass > .ps-door {
            display: inline;
            margin-right: 8px;
          }
          .ps-branches {
            gap: 14px;
          }
        }
      `}</style>
    </section>
  );
}
