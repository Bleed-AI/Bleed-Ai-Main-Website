"use client";

import Reveal from "@/components/Reveal";

// Multi-channel engine (home-test only). Self-contained SVG with SMIL
// animation so it doesn't depend on the old email-machine CSS.
// Live InfraBento is untouched — revert = point home-test back to it.
const ENGINE_SVG = `
  <!-- glow behind core -->
  <ellipse cx="410" cy="125" rx="100" ry="62" fill="#b1130f" opacity="0.12">
    <animate attributeName="opacity" values="0.08;0.2;0.08" dur="3s" repeatCount="indefinite"/>
  </ellipse>

  <!-- input label -->
  <text x="100" y="18" fill="#9099b8" font-size="10" font-family="monospace" text-anchor="middle">cold outreach in</text>

  <!-- INPUT: Email -->
  <g>
    <rect x="16" y="28" width="168" height="44" rx="11" fill="#12121c" stroke="#ff5b56" stroke-opacity="0.4"/>
    <rect x="30" y="37" width="26" height="26" rx="7" fill="#ff5b56"/>
    <rect x="36" y="45" width="14" height="10" rx="2" fill="none" stroke="#fff" stroke-width="1.2"/>
    <path d="M36.5 45.6 L43 50.5 L49.5 45.6" fill="none" stroke="#fff" stroke-width="1.2"/>
    <text x="66" y="55" fill="#e4e7f2" font-size="13" font-family="monospace">Email</text>
  </g>

  <!-- INPUT: LinkedIn -->
  <g>
    <rect x="16" y="103" width="168" height="44" rx="11" fill="#12121c" stroke="#4f8bff" stroke-opacity="0.4"/>
    <rect x="30" y="112" width="26" height="26" rx="7" fill="#4f8bff"/>
    <text x="43" y="130" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif">in</text>
    <text x="66" y="130" fill="#e4e7f2" font-size="13" font-family="monospace">LinkedIn</text>
  </g>

  <!-- INPUT: Call & SMS -->
  <g>
    <rect x="16" y="178" width="168" height="44" rx="11" fill="#12121c" stroke="#22c98a" stroke-opacity="0.4"/>
    <rect x="30" y="187" width="26" height="26" rx="7" fill="#22c98a"/>
    <path d="M36 191.5c0-.5.4-.9.9-.9h2c.4 0 .75.28.85.66l.55 2.1c.08.3-.02.6-.24.82l-.8.8a8 8 0 003.5 3.5l.8-.8c.22-.22.52-.32.82-.24l2.1.55c.38.1.66.45.66.85v2c0 .5-.4.9-.9.9A10.5 10.5 0 0136 191.5z" fill="#fff"/>
    <text x="66" y="205" fill="#e4e7f2" font-size="13" font-family="monospace">Call &amp; SMS</text>
  </g>

  <!-- feed lines into core -->
  <g fill="none" stroke="#ffffff" stroke-opacity="0.13" stroke-width="1.4" stroke-dasharray="4 5">
    <path d="M184 50 C262 50 272 106 330 108"/>
    <path d="M184 125 L330 125"/>
    <path d="M184 200 C262 200 272 144 330 142"/>
  </g>

  <!-- travelling pulses in -->
  <circle r="3.2" fill="#ff5b56"><animateMotion dur="2.4s" repeatCount="indefinite" path="M184 50 C262 50 272 106 330 108"/></circle>
  <circle r="3.2" fill="#4f8bff"><animateMotion dur="2.4s" begin="0.4s" repeatCount="indefinite" path="M184 125 L330 125"/></circle>
  <circle r="3.2" fill="#22c98a"><animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M184 200 C262 200 272 144 330 142"/></circle>

  <!-- CORE engine -->
  <rect x="330" y="86" width="160" height="78" rx="16" fill="#16161f" stroke="#b1130f" stroke-width="1.5"/>
  <rect x="330" y="86" width="160" height="3" rx="1.5" fill="#ff6b67"/>
  <text x="410" y="118" fill="#ff8a86" font-size="12.5" font-weight="bold" text-anchor="middle" font-family="monospace">BLEED AI ENGINE</text>
  <text x="410" y="136" fill="#9099b8" font-size="8" text-anchor="middle" font-family="monospace">deliverability · warm-up · AI copy</text>
  <g>
    <circle cx="392" cy="148" r="2.4" fill="#ff6b67"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite"/></circle>
    <circle cx="410" cy="148" r="2.4" fill="#ff6b67"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin="0.47s" repeatCount="indefinite"/></circle>
    <circle cx="428" cy="148" r="2.4" fill="#ff6b67"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin="0.94s" repeatCount="indefinite"/></circle>
  </g>

  <!-- output line -->
  <path d="M490 125 L604 125" fill="none" stroke="#ffffff" stroke-opacity="0.13" stroke-width="1.4" stroke-dasharray="4 5"/>
  <circle r="3.2" fill="#ff6b67"><animateMotion dur="1.8s" repeatCount="indefinite" path="M490 125 L604 125"/></circle>
  <circle r="3.2" fill="#3ecf8e"><animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite" path="M490 125 L604 125"/></circle>

  <!-- OUTPUT: booked call -->
  <rect x="604" y="102" width="198" height="46" rx="11" fill="#0e1a14" stroke="#10b981" stroke-opacity="0.55"/>
  <circle cx="628" cy="125" r="11" fill="none" stroke="#3ecf8e" stroke-width="1.6"/>
  <path d="M623 125.5 l3.2 3.2 l6 -6.4" fill="none" stroke="#3ecf8e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="650" y="130" fill="#3ecf8e" font-size="13" font-weight="bold" font-family="monospace">BOOKED CALL</text>
`;

export default function InfraBentoTest() {
  return (
    <section id="infra-section">
      <div className="sec dark">
        <div className="sec-inner" style={{ textAlign: "center" }}>
          <Reveal className="sec-label">Under The Hood</Reveal>
          <Reveal as="h2" className="sec-h2">
            2026-grade outbound infrastructure.
            <br />
            <em>The part other agencies can&apos;t build.</em>
          </Reveal>
          <Reveal as="p" className="sec-sub" delay={80} style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            We run outreach across email, LinkedIn, and calls &amp; SMS — all feeding one engine. Landing in the primary inbox, connecting on LinkedIn, and reaching the phone, at scale, without burning your name is an engineering problem. Here&apos;s the system we run on every account - monitored, instrumented, and tuned like a production pipeline.
          </Reveal>

          <Reveal className="tpill">
            <div className="tpill-stars">★★★★★</div>
            <div className="tpill-quote">
              &ldquo;Clear step-by-step guidance, practical tips, and real hands-on help. My spam rate dropped and I finally started seeing results.&rdquo;
            </div>
            <div className="tpill-author">Ahmad Jabbir · TEDx Speaker &amp; Coach</div>
          </Reveal>

          <Reveal className="infra-status">
            <span className="seg"><span className="infra-livedot" /> All channels operational</span>
            <span className="seg-div" />
            <span className="seg"><b>98.2%</b> inbox placement</span>
            <span className="seg-div" />
            <span className="seg"><b>8/8</b> health signals green</span>
          </Reveal>

          <div className="machine">
            <svg viewBox="0 0 820 250" role="img" aria-label="Bleed AI multi-channel engine" dangerouslySetInnerHTML={{ __html: ENGINE_SVG }} />
          </div>

          <Reveal className="mach-sauce">
            <div className="ss-star">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l2.3 6.3L21 11l-6.7 1.7L12 19l-2.3-6.3L3 11l6.7-1.7L12 3z" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <div>
              <div className="mach-sauce-t">✦ The Bleed AI Secret Sauce</div>
              <div className="mach-sauce-d">The proprietary layer we don&rsquo;t put on a spec sheet. It&rsquo;s the reason the same tools, in someone else&rsquo;s hands, don&rsquo;t get the same numbers.</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
