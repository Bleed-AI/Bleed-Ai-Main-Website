"use client";

import Reveal from "@/components/Reveal";

const TRIAL_URL = "https://calculator.bleedai.com/trials";

const rows: [string, string, string][] = [
  ["Who built it", "AI engineer - 1M+ technical students taught", "Salesperson who got good at cold email"],
  ["Deliverability", "Built at the DNS/infrastructure level - 98%+ inbox", "Template warmup tools, reactive fixes when spam climbs"],
  ["Your commitment", "Low-cost trial campaign first - no monthly retainer lock-in", "Upfront retainer required, results promised but not guaranteed"],
  ["Go-live speed", "48 hours from sign-off to first sends", "2–4 week onboarding before anything moves"],
  ["ICP targeting", "AI lookalike modeling from your best existing clients", "Generic job title + industry filters from a list tool"],
  ["Reply handling", "AI screens every reply - only confirmed interest reaches you", "Raw replies forwarded, you filter manually"],
  ["Your domain", "Separate sending infrastructure - your domain never touched", "Often uses your primary domain, reputation at risk"],
];

export default function VsTable() {
  return (
    <section id="vs-section">
      <div className="sec">
        <div className="sec-inner">
          <Reveal className="sec-label">The Real Difference</Reveal>
          <Reveal as="h2" className="sec-h2">
            Built differently.
            <br />
            <em>Because it has to work differently.</em>
          </Reveal>
          <Reveal as="p" className="sec-sub" delay={80}>
            Most agencies hire salespeople who got good at cold email. We were built by an AI engineer. That one difference compounds across every step of your campaign.
          </Reveal>

          <Reveal className="vs-wrap">
            <table className="vs-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="bleed-col">★ Bleed AI</th>
                  <th>Typical Cold Email Agency</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([feature, bleed, other], i) => (
                  <tr key={i}>
                    <td>{feature}</td>
                    <td className="bleed-val"><span className="vs-chk">✓</span>{bleed}</td>
                    <td><span className="vs-x">✗</span>{other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a href={TRIAL_URL} target="_blank" rel="noopener noreferrer" className="btn-red">
              Start Your Trial Campaign →
            </a>
            <div style={{ marginTop: 10, fontSize: 11.5, color: "var(--muted)" }}>
              No monthly commitment. One-time trial campaign, priced upfront. You see results before you scale.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
