"use client";

const SPRINT_URL = "https://calculator.bleedai.com/sprint";

export default function FinalCta() {
  return (
    <section id="final-cta">
      <div className="final-cta">
        <div className="sec-label" style={{ textAlign: "center", marginBottom: 10 }}>
          What are you waiting for?
        </div>
        <h2>
          Your competitors are already
          <br />
          <em>in someone&apos;s inbox.</em>
        </h2>
        <p>
          We run The Outbound Sprint: up to 8 cold email experiments in 6 weeks, one fixed price, you keep everything.
        </p>
        <a
          href={SPRINT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-red"
          style={{ fontSize: 15.5, padding: "15px 32px", margin: "0 auto" }}
        >
          Start Your Sprint →
        </a>
        <div className="cta-trust">
          <span>No setup fee</span>
          <span>48-hour launch</span>
          <span>98%+ inbox placement</span>
          <span>5.0★ across 3 platforms</span>
        </div>
      </div>
    </section>
  );
}
