"use client";

const TRIAL_URL = "https://calculator.bleedai.com/trials";

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
          Start with a niche check. Takes 5 minutes. We&apos;ll tell you honestly if cold email will work for your offer - and what results you should realistically expect.
        </p>
        <a
          href={TRIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-red"
          style={{ fontSize: 15.5, padding: "15px 32px", margin: "0 auto" }}
        >
          Start My Trial Campaign →
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
