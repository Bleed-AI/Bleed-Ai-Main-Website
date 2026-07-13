"use client";

import { useState, useEffect } from "react";

const SPRINT_URL = "https://calculator.bleedai.com/sprint";
const VIDEO_ID = "S0Oeg0sbB6k";
const PLAYBOOK_DOC =
  "https://docs.google.com/document/u/4/d/1h_PuevKWA6JWJ1tsGOaIdS1jcaRMBCNLE-XotSEWpMg/edit";

export default function Hero() {
  const [playing, setPlaying] = useState(false);
  // Client spots: starts at 4, counts down through the month, resets monthly.
  // Computed in an effect so SSR/CSR markup matches (no hydration mismatch).
  const [spots, setSpots] = useState(3);
  useEffect(() => {
    const now = new Date();
    const dim = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    setSpots(Math.max(1, Math.ceil(4 * (1 - now.getDate() / dim))));
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-grid" />
      <div className="hero-orb1" />
      <div className="hero-orb2" />
      <div className="hero-orb3" />

      <div className="hero-inner">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Cold-to-Sold System&nbsp;·&nbsp;Live in 48 Hours
        </div>

        <h1>
          We Install Revenue Systems
          <br />
          <em>that Scale B2B Firms in Weeks</em>
        </h1>

        <p className="hero-sub">
          Not a lead-gen agency. A full-service growth partner with a Cold-to-Sold
          system that turns strangers into customers.
        </p>

        <div className="hero-scarcity">
          <span className="scarcity-dot" />
          Only {spots} more client spots open this month
        </div>

        <div className="hero-ctas">
          <a href={SPRINT_URL} target="_blank" rel="noopener noreferrer" className="btn-red">
            Start Your Sprint →
          </a>
        </div>
        <div className="cta-trust">
          <span>Launch in 48 hours</span>
          <span>No commitment required</span>
        </div>

        <div className="hero-trust">
          <div className="trust-pill">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/upwork-icon.svg" alt="Upwork" className="trust-logo" />
            <span className="trust-plat-name">
              Upwork / 5.0 <span className="trust-stars">★</span>
            </span>
          </div>
          <a
            href="https://clutch.co/profile/bleed-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="trust-pill"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/clutch-icon.svg" alt="Clutch" className="trust-logo" />
            <span className="trust-plat-name">
              Clutch / 5.0 <span className="trust-stars">★</span>
            </span>
          </a>
          <a
            href="https://techreviewer.co/companies/bleed-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="trust-pill"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/techr-icon.svg" alt="TechReviewer" className="trust-logo" />
            <span className="trust-plat-name">
              TechReviewer / 5.0 <span className="trust-stars">★</span>
            </span>
          </a>
        </div>

        <div className="press-line">
          <span className="press-line-label">Featured in</span>
          <a
            href="https://usawire.com/cold-to-sold-how-bleed-ai-creates-predictable-b2b-pipeline-in-2025/"
            className="press-badge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <strong>USAWire</strong>
          </a>
        </div>
      </div>

      <div className="video-wrap">
        <div className="video-frame" onClick={() => setPlaying(true)}>
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Bleed AI playbook video"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="video-thumb"
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Watch the Bleed AI playbook video"
              />
              <div className="video-overlay">
                <div className="video-play">
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        <a href={PLAYBOOK_DOC} target="_blank" rel="noopener noreferrer" className="video-textlink">
          Check out the text version ↗
        </a>
      </div>
    </section>
  );
}
