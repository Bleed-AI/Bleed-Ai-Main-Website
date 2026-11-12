"use client";

import { useEffect, useRef, useState } from "react";
import { CropMarks } from "@/components/print/Print";

/**
 * The homepage hero animation (2026-11-12). It SHOWS the product instead of decorating it: one example month, where
 * four services each produce something a buyer can see, and a receipt underneath ticks off each result:
 *   1. a buyer asks ChatGPT and "Your company" is named,  2. a LinkedIn post lands with the buyers,
 *   3. a reply arrives from the email campaign,          4. a call is booked on your calendar.
 * The footer shows the swap (the thing no single-channel agency offers).
 * Bar it was built against: the Shortlist Loop section (bleedai-campaign-master clients/bleedai/content/shortlist-loop),
 * services sending signals into an AI answer until the company is stamped NAMED.
 *
 * Rules: the first paint (and reduced motion, and a still screenshot) is the COMPLETE state: the booked call and a
 * fully ticked receipt, so the story reads in five seconds. Then it replays scene by scene. Fixed heights, so nothing
 * shifts; transform and opacity only; pauses off screen and in a hidden tab. Everything is labelled Example, and the
 * client is always "Your company", never an invented name.
 */

const LEDGER = [
  { label: "Named by ChatGPT", when: "WK 1" },
  { label: "LinkedIn post seen by buyers", when: "WK 2" },
  { label: "Reply from a VP of Operations", when: "WK 3" },
  { label: "Intro call booked", when: "THU 2PM" },
];

const SERVICE = ["Articles + Get cited", "LinkedIn posts", "Email campaign", "Every reply handled"];

// [delay before the step, step]. A step either shows a scene or ticks the receipt.
type Step = { scene?: number; done?: number };
const SCHEDULE: [number, Step][] = [
  [3200, { scene: 0, done: 0 }],
  [2700, { done: 1 }],
  [900, { scene: 1 }],
  [2900, { done: 2 }],
  [900, { scene: 2 }],
  [2700, { done: 3 }],
  [900, { scene: 3 }],
  [2200, { done: 4 }],
  [4200, {}], // hold the full picture, then loop
];

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    setR(m.matches);
    const on = () => setR(m.matches);
    m.addEventListener?.("change", on);
    return () => m.removeEventListener?.("change", on);
  }, []);
  return r;
}

function Reactions({ active }: { active: boolean }) {
  const [n, setN] = useState(186);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0 - 500) / 1700, 1);
      setN(Math.max(0, Math.round(186 * (1 - Math.pow(1 - Math.max(p, 0), 3)))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    setN(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return <span className="tabular-nums">{n}</span>;
}

export default function ProofSheet() {
  const reduce = useReducedMotion();
  const [scene, setScene] = useState(3);
  const [done, setDone] = useState(4);
  const idx = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const visible = useRef(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) {
      setScene(3);
      setDone(4);
      return;
    }
    // One timer at a time. A repeat "visible" signal (resize, scroll jitter) must not restart the current step.
    let pending = false;
    const stop = () => {
      window.clearTimeout(timer.current);
      pending = false;
    };
    const run = () => {
      if (pending || !visible.current || document.hidden) return;
      const [delay, step] = SCHEDULE[idx.current];
      pending = true;
      timer.current = window.setTimeout(() => {
        pending = false;
        if (step.scene !== undefined) setScene(step.scene);
        if (step.done !== undefined) setDone(step.done);
        idx.current = (idx.current + 1) % SCHEDULE.length;
        run();
      }, delay);
    };
    const obs = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting) run();
        else stop();
      },
      { threshold: 0.2 }
    );
    if (root.current) obs.observe(root.current);
    const onVis = () => (document.hidden ? stop() : run());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      stop();
    };
  }, [reduce]);

  const on = (i: number) => scene === i;
  const sceneCls = (i: number) => `ps-scene ${on(i) ? "is-on" : ""}`;

  return (
    <div ref={root} className="ps relative">
      <p className="sr-only">
        Example month: a buyer asks ChatGPT and your company is named, a LinkedIn post reaches your buyers, a VP of Operations replies to the
        email campaign, and an intro call is booked. One service that was not pulling its weight is swapped for another at the same price.
      </p>
      <CropMarks>
        <div aria-hidden="true" className="ps-sheet">
          {/* header */}
          <div className="ps-head">
            <span>Example month</span>
            <span className="ps-sep hidden sm:block" />
            <span className="hidden sm:inline">Your company</span>
            <span className="ps-onair ml-auto">
              <i />
              Running
            </span>
          </div>

          {/* stage: one scene at a time, all four always in the DOM so nothing shifts */}
          <div className="ps-stage">
            <div className="ps-svc">
              <span className="ps-svc-k">Service</span>
              {SERVICE.map((s, i) => (
                <span key={s} className={`ps-svc-v ${on(i) ? "is-on" : ""}`}>
                  {s}
                </span>
              ))}
            </div>

            {/* 1. AI answer */}
            <div className={sceneCls(0)}>
              <div className="ps-chat-q">
                <span className="ps-tag">Your buyer asks ChatGPT</span>
                <p>&ldquo;Which fleet maintenance software should a 60 truck company use?&rdquo;</p>
              </div>
              <div className="ps-answer">
                <span className="ps-tag">The answer</span>
                <ol>
                  <li>
                    <span className="ps-n">1</span>
                    <span className="ps-type">Your company</span>
                  </li>
                  <li>
                    <span className="ps-n">2</span>
                    <span className="ps-bar w-[70%]" />
                  </li>
                  <li>
                    <span className="ps-n">3</span>
                    <span className="ps-bar w-[54%]" />
                  </li>
                </ol>
                <span className="ps-stamp">Named</span>
              </div>
              <div className="ps-also">
                <span className="ps-tag !mb-0">Checked every month on</span>
                {["ChatGPT", "Claude", "Perplexity", "Google AI"].map((a, i) => (
                  <span key={a} className="ps-ai" style={{ animationDelay: `${2.3 + i * 0.18}s` }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. LinkedIn post */}
            <div className={sceneCls(1)}>
              <div className="ps-post">
                <div className="ps-post-h">
                  <span className="ps-ava">YOU</span>
                  <span>
                    <b>You</b>
                    <small>Founder, Your company &middot; 1d</small>
                  </span>
                </div>
                <p>
                  Most fleet downtime starts with one alert nobody owned. Here is the 3 step check we run every Monday.
                </p>
                <div className="ps-post-img">
                  <span>The Monday check</span>
                  <i />
                  <i />
                  <i />
                </div>
                <div className="ps-post-f">
                  <span>
                    <Reactions active={on(1) && !reduce} /> reactions
                  </span>
                  <span>41 comments</span>
                </div>
              </div>
            </div>

            {/* 3. Reply lands */}
            <div className={sceneCls(2)}>
              <div className="ps-mail">
                <div className="ps-mail-row is-new">
                  <span className="ps-dot" />
                  <span className="ps-mail-from">VP of Operations</span>
                  <span className="ps-mail-t">9:41 AM</span>
                  <span className="ps-mail-s">Re: the Monday downtime check</span>
                  <span className="ps-mail-b">This is timely. We lost two trucks to exactly this last month. Can we talk Thursday?</span>
                </div>
                <div className="ps-mail-row">
                  <span className="ps-mail-from">Head of Fleet</span>
                  <span className="ps-mail-t">Mon</span>
                  <span className="ps-mail-s">Re: the Monday downtime check</span>
                </div>
                <div className="ps-mail-row ps-mail-3">
                  <span className="ps-mail-from">Operations Director</span>
                  <span className="ps-mail-t">Mon</span>
                  <span className="ps-mail-s">Re: quick question about your yard</span>
                </div>
              </div>
            </div>

            {/* 4. Call booked */}
            <div className={sceneCls(3)}>
              <div className="ps-cal">
                <div className="ps-cal-date">
                  <span>Thu</span>
                  <b>19</b>
                </div>
                <div className="ps-cal-body">
                  <span className="ps-tag">On your calendar</span>
                  <b>Intro call with the VP of Operations</b>
                  <span className="ps-cal-time">2:00 PM &middot; 30 min</span>
                  <span className="ps-cal-note">Booked from the reply. We handled the back and forth.</span>
                </div>
                <span className="ps-stamp ps-stamp-cal">Booked</span>
              </div>
            </div>
          </div>

          {/* the receipt */}
          <ul className="ps-ledger">
            {LEDGER.map((l, i) => (
              <li key={l.label} className={`${i < done ? "is-done" : ""} ${i === scene && i >= done ? "is-now" : ""}`}>
                <span className="ps-check" />
                <span className="ps-l">{l.label}</span>
                <span className="ps-lead" />
                <span className="ps-w">{l.when}</span>
              </li>
            ))}
          </ul>

          {/* the swap */}
          <div className="ps-swap">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M4 7h13l-3-3M20 17H7l3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              This month we swapped <s>Lead reactivation</s> for <b>Get cited</b>. Same price.
            </span>
          </div>
        </div>
      </CropMarks>

      <style jsx global>{`
        .ps-sheet {
          position: relative;
          border-radius: 4px;
          border: 1px solid rgba(234, 238, 248, 0.14);
          background: linear-gradient(180deg, rgba(18, 18, 28, 0.94), rgba(11, 11, 20, 0.96));
          box-shadow: 0 40px 90px -40px rgba(0, 0, 0, 0.9);
          padding: 16px 16px 14px;
          color: #eaeef8;
        }
        @media (min-width: 640px) {
          .ps-sheet {
            padding: 20px 22px 16px;
          }
        }
        .ps-head {
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 10px;
          font: 500 10.5px/1 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9a9fb8;
          padding-bottom: 12px;
          border-bottom: 1px dashed rgba(234, 238, 248, 0.14);
        }
        .ps-sep {
          width: 14px;
          height: 1px;
          background: rgba(234, 238, 248, 0.3);
        }
        .ps-onair {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #ff5a52;
        }
        .ps-onair i {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ff5a52;
        }
        .ps-onair i::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #ff5a52;
          animation: psOnair 2.4s cubic-bezier(0.2, 0.7, 0.1, 1) infinite;
        }
        @keyframes psOnair {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          70%,
          100% {
            transform: scale(3.2);
            opacity: 0;
          }
        }

        .ps-stage {
          position: relative;
          height: 252px;
          margin-top: 12px;
        }
        @media (min-width: 640px) {
          .ps-stage {
            height: 262px;
          }
        }
        .ps-svc {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 18px;
          display: flex;
          gap: 8px;
          font: 500 10.5px/18px 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .ps-svc-k {
          color: #6f7590;
        }
        .ps-svc-v {
          position: absolute;
          left: 72px;
          color: #eaeef8;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .ps-svc-v.is-on {
          opacity: 1;
          transform: none;
          transition: opacity 0.4s ease 0.26s, transform 0.4s ease 0.26s;
        }
        .ps-scene {
          position: absolute;
          top: 30px;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(8px);
          transition: opacity 0.22s ease, transform 0.3s ease, visibility 0s linear 0.22s;
        }
        .ps-scene.is-on {
          opacity: 1;
          visibility: visible;
          transform: none;
          transition: opacity 0.45s ease 0.26s, transform 0.6s cubic-bezier(0.2, 0.7, 0.1, 1) 0.26s, visibility 0s;
        }
        .ps-tag {
          display: block;
          font: 500 9.5px/1 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6f7590;
          margin-bottom: 7px;
        }

        /* 1. chat */
        .ps-chat-q {
          border-left: 2px solid rgba(234, 238, 248, 0.25);
          padding: 2px 0 2px 12px;
        }
        .ps-chat-q p {
          margin: 0;
          font-size: 14px;
          line-height: 1.45;
          color: #eaeef8;
          font-weight: 500;
        }
        .ps-answer {
          position: relative;
          margin-top: 14px;
          border-radius: 4px;
          background: #f3f2ee;
          color: #141110;
          padding: 12px 14px 10px;
        }
        .ps-answer .ps-tag {
          color: #6b6762;
        }
        .ps-answer ol {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ps-answer li {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 20px;
        }
        .ps-n {
          font: 500 11px 'JetBrains Mono', ui-monospace, monospace;
          color: #6b6762;
          width: 10px;
        }
        .ps-bar {
          height: 7px;
          border-radius: 2px;
          background: #d9d7d0;
        }
        .ps-type {
          font-family: 'Clash Display', 'Instrument Sans', sans-serif;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: -0.01em;
          box-shadow: inset 0 -2px 0 #b1130f;
          white-space: nowrap;
          overflow: hidden;
        }
        .ps-scene.is-on .ps-type {
          animation: psType 1s steps(12, end) 0.7s both;
        }
        @keyframes psType {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }
        .ps-stamp {
          position: absolute;
          right: 12px;
          bottom: 10px;
          font: 700 13px/1 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b1130f;
          border: 2px solid #b1130f;
          border-radius: 3px;
          padding: 6px 9px 5px;
          transform: rotate(-7deg);
        }
        .ps-scene.is-on .ps-stamp {
          animation: psStamp 0.45s cubic-bezier(0.3, 1.5, 0.5, 1) 1.9s both;
        }
        @keyframes psStamp {
          from {
            opacity: 0;
            transform: rotate(-7deg) scale(1.7);
          }
          to {
            opacity: 1;
            transform: rotate(-7deg) scale(1);
          }
        }

        .ps-also {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px 8px;
          margin-top: 12px;
        }
        .ps-also .ps-tag {
          margin-right: 2px;
        }
        .ps-ai {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          color: #c3c6d4;
          border: 1px solid rgba(234, 238, 248, 0.16);
          border-radius: 3px;
          padding: 3px 7px;
        }
        .ps-ai::before {
          content: '';
          width: 5px;
          height: 8px;
          margin-top: -2px;
          border: solid #ff5a52;
          border-width: 0 1.5px 1.5px 0;
          transform: rotate(45deg);
        }
        .ps-scene.is-on .ps-ai {
          animation: psFade 0.4s ease both;
        }
        @keyframes psFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        /* 2. post */
        .ps-post {
          border-radius: 4px;
          background: #f3f2ee;
          color: #141110;
          padding: 12px 14px;
        }
        .ps-post-h {
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .ps-post-h b {
          display: block;
          font-size: 13px;
          line-height: 1.2;
        }
        .ps-post-h small {
          display: block;
          font-size: 11px;
          color: #6b6762;
        }
        .ps-ava {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #141110;
          color: #f3f2ee;
          font: 600 9px/30px 'JetBrains Mono', monospace;
          text-align: center;
          flex: none;
        }
        .ps-post p {
          margin: 9px 0 0;
          font-size: 12.5px;
          line-height: 1.45;
          color: #2a2725;
        }
        .ps-post-img {
          margin-top: 9px;
          height: 54px;
          border-radius: 3px;
          background: #141110;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: end;
          gap: 6px;
          padding: 8px 10px;
          position: relative;
        }
        .ps-post-img span {
          position: absolute;
          left: 10px;
          top: 8px;
          font: 500 9px 'JetBrains Mono', monospace;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f3f2ee;
        }
        .ps-post-img i {
          height: 8px;
          border-radius: 2px;
          background: #3d3a37;
        }
        .ps-post-img i:nth-of-type(3) {
          background: #ff5a52;
        }
        .ps-post-f {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 11.5px;
          color: #6b6762;
        }

        /* 3. mail */
        .ps-mail {
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(234, 238, 248, 0.12);
        }
        .ps-mail-row {
          position: relative;
          display: grid;
          grid-template-columns: 1fr auto;
          column-gap: 10px;
          padding: 10px 12px 10px 24px;
          border-top: 1px solid rgba(234, 238, 248, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }
        .ps-mail-row:first-child {
          border-top: 0;
        }
        .ps-mail-row.is-new {
          background: #f3f2ee;
          color: #141110;
        }
        .ps-scene.is-on .ps-mail-row.is-new {
          animation: psDrop 0.6s cubic-bezier(0.2, 0.9, 0.25, 1.1) 0.5s both;
        }
        @keyframes psDrop {
          from {
            opacity: 0;
            transform: translateY(-18px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .ps-dot {
          position: absolute;
          left: 10px;
          top: 15px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b1130f;
        }
        .ps-mail-from {
          font-size: 12.5px;
          font-weight: 600;
        }
        .ps-mail-row:not(.is-new) .ps-mail-from {
          color: #c3c6d4;
          font-weight: 500;
        }
        .ps-mail-t {
          font: 500 10.5px 'JetBrains Mono', monospace;
          color: #6f7590;
        }
        .ps-mail-row.is-new .ps-mail-t {
          color: #6b6762;
        }
        .ps-mail-s {
          grid-column: 1 / -1;
          font-size: 12px;
          color: #9a9fb8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ps-mail-row.is-new .ps-mail-s {
          color: #141110;
          font-weight: 600;
        }
        .ps-mail-b {
          grid-column: 1 / -1;
          margin-top: 3px;
          font-size: 12.5px;
          line-height: 1.45;
          color: #3d3a37;
        }

        @media (max-width: 639px) {
          .ps-mail-3 {
            display: none !important;
          }
        }

        /* 4. calendar */
        .ps-cal {
          position: relative;
          display: flex;
          gap: 14px;
          border-radius: 4px;
          background: #f3f2ee;
          color: #141110;
          padding: 16px;
          min-height: 150px;
        }
        .ps-cal-date {
          flex: none;
          width: 58px;
          height: 64px;
          border: 1.5px solid #141110;
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .ps-cal-date span {
          font: 500 10px 'JetBrains Mono', monospace;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b1130f;
        }
        .ps-cal-date b {
          font-family: 'Clash Display', 'Instrument Sans', sans-serif;
          font-size: 28px;
          font-weight: 600;
          line-height: 1;
        }
        .ps-cal-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }
        .ps-cal-body .ps-tag {
          color: #6b6762;
          margin-bottom: 2px;
        }
        .ps-cal-body b {
          font-family: 'Clash Display', 'Instrument Sans', sans-serif;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.2;
        }
        .ps-cal-time {
          font: 500 12px 'JetBrains Mono', monospace;
          color: #3d3a37;
        }
        .ps-cal-note {
          font-size: 12px;
          color: #6b6762;
          margin-top: 2px;
        }
        .ps-stamp-cal {
          bottom: 12px;
          right: 14px;
        }
        @media (max-width: 639px) {
          .ps-cal {
            padding-bottom: 52px;
          }
          .ps-cal-body b {
            font-size: 15.5px;
          }
        }
        .ps-scene.is-on .ps-stamp-cal {
          animation-delay: 0.9s;
        }

        /* the receipt */
        .ps-ledger {
          list-style: none;
          margin: 14px 0 0;
          padding: 12px 0 0;
          border-top: 1px dashed rgba(234, 238, 248, 0.14);
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .ps-ledger li {
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 12.5px;
          color: #6f7590;
          transition: color 0.35s ease;
        }
        .ps-ledger li.is-done {
          color: #eaeef8;
        }
        .ps-check {
          position: relative;
          flex: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid #4a4f66;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .ps-ledger li.is-now .ps-check {
          border-color: #ff5a52;
        }
        .ps-ledger li.is-done .ps-check {
          background: #ff5a52;
          border-color: #ff5a52;
        }
        .ps-ledger li.is-done .ps-check::after {
          content: '';
          position: absolute;
          left: 3.5px;
          top: 1.5px;
          width: 3px;
          height: 6px;
          border: solid #0b0b14;
          border-width: 0 1.6px 1.6px 0;
          transform: rotate(45deg);
        }
        .ps-l {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ps-lead {
          flex: 1;
          min-width: 12px;
          border-bottom: 1px dotted rgba(234, 238, 248, 0.22);
          transform: translateY(3px);
        }
        .ps-w {
          font: 500 11px 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: 0.06em;
        }
        .ps-swap {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 12px;
          padding-top: 11px;
          border-top: 1px solid rgba(234, 238, 248, 0.08);
          font-size: 12px;
          line-height: 1.4;
          color: #9a9fb8;
        }
        .ps-swap svg {
          flex: none;
          margin-top: 2px;
          color: #ff5a52;
        }
        .ps-swap s {
          text-decoration-color: #ff5a52;
        }
        .ps-swap b {
          color: #eaeef8;
          font-weight: 600;
        }

        @media (prefers-reduced-motion: reduce) {
          .ps-scene,
          .ps-scene.is-on,
          .ps-svc-v {
            transition: none;
          }
          .ps-scene.is-on .ps-type,
          .ps-scene.is-on .ps-stamp,
          .ps-scene.is-on .ps-mail-row.is-new,
          .ps-scene.is-on .ps-ai,
          .ps-onair i::after {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
