"use client";

import { useEffect, useRef, useState } from "react";

const CALENDLY = "https://calendly.com/bleedai/vip-invite-only";
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function BookWidget() {
  const [open, setOpen] = useState(false);
  const [secs, setSecs] = useState(4 * 60 + 59);
  const [days, setDays] = useState<{ d: string; n: string }[]>([]);
  const [active, setActive] = useState(-1);
  const autoOpened = useRef(false);

  // Build the next 5 days (client-side; Date is fine in the browser)
  useEffect(() => {
    const now = new Date();
    const arr = [];
    for (let i = 1; i <= 5; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      arr.push({ d: dayNames[d.getDay()], n: `${d.getDate()} ${monthNames[d.getMonth()]}` });
    }
    setDays(arr);
  }, []);

  // Auto-open once the visitor scrolls ~40% down
  useEffect(() => {
    const onScroll = () => {
      if (autoOpened.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.4) {
        autoOpened.current = true;
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Countdown while open
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [open]);

  const timer = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
  const goCalendly = () => window.open(CALENDLY, "_blank", "noopener");

  return (
    <>
      <button
        className="book-widget-toggle"
        onClick={() => setOpen(true)}
        style={{ display: open ? "none" : "flex" }}
        title="Book a call with Taha"
        aria-label="Book a call with Taha"
      >
        <svg width="23" height="23" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M12 2.2s-6.6 7.35-6.6 12.1A6.6 6.6 0 0 0 12 20.9a6.6 6.6 0 0 0 6.6-6.6C18.6 9.55 12 2.2 12 2.2z" />
        </svg>
      </button>

      <div className={`book-widget${open ? " open" : ""}`}>
        <div className="book-widget-bar" />
        <div className="book-widget-body">
          <div className="book-widget-head">
            <div className="book-widget-avatar-placeholder">T</div>
            <div className="book-widget-who">
              <div className="book-widget-name">Taha Anwar</div>
              <div className="book-widget-title">Founder · Bleed AI</div>
            </div>
            <button className="book-widget-close" onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
          </div>
          <div className="book-widget-headline">Book a 1-1 Strategy Call</div>
          <div className="book-widget-desc">
            30 min. We&apos;ll map your pipeline gaps and show you exactly what a campaign would look like for your niche.
          </div>
          <div className="book-widget-urgency">
            <span className="book-widget-urgency-txt">Only a few slots left.</span>
            <span className="book-widget-timer">{timer}</span>
          </div>
          <div className="book-widget-days">
            {days.map((d, i) => (
              <button
                className={`book-widget-day${active === i ? " active" : ""}`}
                key={i}
                onClick={() => {
                  setActive(i);
                  goCalendly();
                }}
              >
                <span className="d1">{d.d}</span>
                <span className="d2">{d.n}</span>
              </button>
            ))}
          </div>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="book-widget-cta">
            Schedule My Strategy Session →
          </a>
          <div className="book-widget-powered">Powered by Calendly</div>
        </div>
      </div>
    </>
  );
}
