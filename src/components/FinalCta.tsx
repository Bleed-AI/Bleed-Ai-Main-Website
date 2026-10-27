"use client";

const TRIAL_URL = "/trial";

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
          <em>reaching your buyers.</em>
        </h2>
        <p>
          We find the buyers who need you, reach them on email, LinkedIn and mail, and answer every reply. You see the replies before you pay us.
        </p>
        <a
          href={TRIAL_URL}
          className="btn-red"
          style={{ fontSize: 15.5, padding: "15px 32px", margin: "0 auto" }}
        >
          Apply for a trial &rarr;
        </a>
        <div className="cta-trust">
          <span>No setup fee</span>
          <span>See replies first</span>
          <span>98%+ inbox placement</span>
          <span>5.0★ across 3 platforms</span>
        </div>
      </div>
    </section>
  );
}
