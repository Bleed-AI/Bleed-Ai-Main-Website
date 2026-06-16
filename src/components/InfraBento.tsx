"use client";

import Reveal from "@/components/Reveal";

// Email Machine SVG injected as static markup so native SVG attributes and the
// per-envelope `--d` custom properties keep working. The .bai-scoped CSS in
// globals.css drives every animation (transform/opacity only, lightweight).
const MACHINE_SVG = `
      <!-- top feed pipe -->
      <path d="M70 60 H636" fill="none" stroke="#23233a" stroke-width="3"/>
      <text x="70" y="34" fill="#9099b8" font-size="10" font-family="monospace" text-anchor="middle">cold emails in</text>
      <g transform="translate(48,40)"><rect width="18" height="11" rx="1.5" fill="#e6e9f2" stroke="#c2c8da"/><path d="M1 1.5 L9 7 L17 1.5" fill="none" stroke="#9aa2bd" stroke-width="1"/></g>
      <g class="drop-env"><rect width="16" height="11" rx="1.5" fill="#e6e9f2" stroke="#c2c8da"/><path d="M1 1.5 L8 7 L15 1.5" fill="none" stroke="#9aa2bd" stroke-width="1"/></g>
      <path d="M36 56 H104 L86 98 H54 Z" fill="#181826" stroke="#2a2a3e"/>
      <path d="M70 98 V178" stroke="#2a2a3e" stroke-width="6" stroke-linecap="round"/>
      <!-- conveyor belt -->
      <rect x="30" y="192" width="752" height="16" rx="8" fill="#16161f" stroke="#2a2a3e"/>
      <circle cx="38" cy="200" r="11" fill="#1a1a28" stroke="#2a2a3e"/>
      <circle cx="774" cy="200" r="11" fill="#1a1a28" stroke="#2a2a3e"/>
      <g stroke="#2a2a3e" stroke-width="1.5"><line x1="90" y1="200" x2="100" y2="200"/><line x1="170" y1="200" x2="180" y2="200"/><line x1="250" y1="200" x2="260" y2="200"/><line x1="330" y1="200" x2="340" y2="200"/><line x1="410" y1="200" x2="420" y2="200"/><line x1="490" y1="200" x2="500" y2="200"/><line x1="570" y1="200" x2="580" y2="200"/><line x1="650" y1="200" x2="660" y2="200"/><line x1="720" y1="200" x2="730" y2="200"/></g>
      <!-- STATION 1: Deliverability (gauge) -->
      <text x="168" y="80" fill="#9099b8" font-size="8.5" font-family="monospace" text-anchor="middle">DELIVERABILITY</text>
      <rect class="cap-pulse" x="160" y="84" width="16" height="12" rx="2.5" fill="#b1130f"/>
      <ellipse class="st-glow" style="animation-delay:-1.49s" cx="168" cy="132" rx="58" ry="50" fill="#b1130f"/>
      <rect x="126" y="96" width="84" height="72" rx="12" fill="#181826" stroke="#2a2a3e"/>
      <path d="M150 148 A20 20 0 0 1 186 148" fill="none" stroke="#3a3a52" stroke-width="4" stroke-linecap="round"/>
      <path d="M150 148 A20 20 0 0 1 181 132" fill="none" stroke="#e8302c" stroke-width="4" stroke-linecap="round"/>
      <g class="gauge-needle"><line x1="168" y1="148" x2="180" y2="135" stroke="#eaeef8" stroke-width="2" stroke-linecap="round"/></g>
      <!-- STATION 2: Warm-up (gears) -->
      <text x="318" y="80" fill="#9099b8" font-size="8.5" font-family="monospace" text-anchor="middle">WARM-UP</text>
      <rect class="cap-pulse" style="animation-delay:-1s" x="310" y="84" width="16" height="12" rx="2.5" fill="#b1130f"/>
      <ellipse class="st-glow" style="animation-delay:-0.24s" cx="318" cy="132" rx="58" ry="50" fill="#b1130f"/>
      <rect x="276" y="96" width="84" height="72" rx="12" fill="#181826" stroke="#2a2a3e"/>
      <g class="gear-a"><circle cx="308" cy="130" r="13" fill="none" stroke="#3a3a52" stroke-width="4"/><path d="M308 118 V142 M296 130 H320" stroke="#3a3a52" stroke-width="2.5"/><circle cx="308" cy="130" r="3" fill="#9099b8"/></g>
      <g class="gear-b"><circle cx="338" cy="144" r="10" fill="none" stroke="#e8302c" stroke-width="4"/><path d="M338 134 V154 M328 144 H348" stroke="#e8302c" stroke-width="2"/><circle cx="338" cy="144" r="2.5" fill="#e8302c"/></g>
      <!-- STATION 3: Personalization (stamp) -->
      <text x="468" y="80" fill="#9099b8" font-size="8" font-family="monospace" text-anchor="middle">PERSONALIZATION</text>
      <rect class="cap-pulse" style="animation-delay:-2s" x="460" y="84" width="16" height="12" rx="2.5" fill="#b1130f"/>
      <ellipse class="st-glow" style="animation-delay:-2.98s" cx="468" cy="132" rx="58" ry="50" fill="#b1130f"/>
      <rect x="426" y="96" width="84" height="72" rx="12" fill="#181826" stroke="#2a2a3e"/>
      <rect x="442" y="138" width="36" height="22" rx="2" fill="#e6e9f2" stroke="#c2c8da"/>
      <line x1="448" y1="146" x2="472" y2="146" stroke="#9aa2bd" stroke-width="1.4"/><line x1="448" y1="151" x2="466" y2="151" stroke="#9aa2bd" stroke-width="1.4"/>
      <g class="stamp"><rect x="484" y="114" width="16" height="14" rx="2" fill="#b1130f"/><line x1="492" y1="128" x2="492" y2="138" stroke="#b1130f" stroke-width="3"/></g>
      <!-- STATION 4: Bleed AI Secret Sauce (gold) -->
      <ellipse cx="618" cy="132" rx="58" ry="50" fill="#f5c54214"/>
      <text x="618" y="80" fill="#f5c542" font-size="8.5" font-family="monospace" text-anchor="middle">SECRET SAUCE</text>
      <rect class="cap-pulse" style="animation-delay:-3s" x="610" y="84" width="16" height="12" rx="2.5" fill="#f5c542"/>
      <ellipse class="st-glow" style="animation-delay:-1.72s" cx="618" cy="132" rx="58" ry="50" fill="#f5c542"/>
      <rect x="576" y="96" width="84" height="72" rx="12" fill="#181826" stroke="#4a3a16"/>
      <g class="gold-pulse"><g class="twinkle"><path d="M618 116 L621.9 126.1 L632 130 L621.9 133.9 L618 144 L614.1 133.9 L604 130 L614.1 126.1 Z" fill="#f5c542"/></g><circle cx="636" cy="119" r="2.4" fill="#f5c542"/><circle cx="601" cy="143" r="2" fill="#f5c542"/></g>
      <text x="618" y="161" fill="#caa83a" font-size="7" font-family="monospace" text-anchor="middle">the Bleed AI edge</text>
      <g class="hero-env" style="--d:0s">
        <ellipse class="fx-warm" cx="15" cy="10" rx="25" ry="18" fill="#ff7a1a"/>
        <rect width="30" height="20" rx="2.5" fill="#e7eaf3" stroke="#c2c8da"/>
        <path d="M1 2 L15 12 L29 2" fill="none" stroke="#9aa2bd" stroke-width="1.1"/>
        <g class="fx-pers"><line x1="6" y1="9" x2="24" y2="9" stroke="#b1130f" stroke-width="1.4"/><line x1="6" y1="13" x2="18" y2="13" stroke="#9aa2bd" stroke-width="1.4"/></g>
        <g class="fx-check"><circle cx="27" cy="2.5" r="5.5" fill="#3ecf8e"/><path d="M24.6 2.6 L26.3 4.3 L29.4 1" fill="none" stroke="#06281a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g class="fx-gold"><rect x="-1" y="-1" width="32" height="22" rx="3" fill="#f5c542" stroke="#fff3c4"/><path d="M0 1 L15 12 L30 1" fill="none" stroke="#b8860b" stroke-width="1.1"/><text x="15" y="14.5" fill="#7a5a00" font-size="10" font-weight="bold" text-anchor="middle">★</text></g>
      </g>
      <g class="hero-env" style="--d:-4s">
        <ellipse class="fx-warm" cx="15" cy="10" rx="25" ry="18" fill="#ff7a1a"/>
        <rect width="30" height="20" rx="2.5" fill="#e7eaf3" stroke="#c2c8da"/>
        <path d="M1 2 L15 12 L29 2" fill="none" stroke="#9aa2bd" stroke-width="1.1"/>
        <g class="fx-pers"><line x1="6" y1="9" x2="24" y2="9" stroke="#b1130f" stroke-width="1.4"/><line x1="6" y1="13" x2="18" y2="13" stroke="#9aa2bd" stroke-width="1.4"/></g>
        <g class="fx-check"><circle cx="27" cy="2.5" r="5.5" fill="#3ecf8e"/><path d="M24.6 2.6 L26.3 4.3 L29.4 1" fill="none" stroke="#06281a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g class="fx-gold"><rect x="-1" y="-1" width="32" height="22" rx="3" fill="#f5c542" stroke="#fff3c4"/><path d="M0 1 L15 12 L30 1" fill="none" stroke="#b8860b" stroke-width="1.1"/><text x="15" y="14.5" fill="#7a5a00" font-size="10" font-weight="bold" text-anchor="middle">★</text></g>
      </g>
      <g class="hero-env" style="--d:-8s">
        <ellipse class="fx-warm" cx="15" cy="10" rx="25" ry="18" fill="#ff7a1a"/>
        <rect width="30" height="20" rx="2.5" fill="#e7eaf3" stroke="#c2c8da"/>
        <path d="M1 2 L15 12 L29 2" fill="none" stroke="#9aa2bd" stroke-width="1.1"/>
        <g class="fx-pers"><line x1="6" y1="9" x2="24" y2="9" stroke="#b1130f" stroke-width="1.4"/><line x1="6" y1="13" x2="18" y2="13" stroke="#9aa2bd" stroke-width="1.4"/></g>
        <g class="fx-check"><circle cx="27" cy="2.5" r="5.5" fill="#3ecf8e"/><path d="M24.6 2.6 L26.3 4.3 L29.4 1" fill="none" stroke="#06281a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g class="fx-gold"><rect x="-1" y="-1" width="32" height="22" rx="3" fill="#f5c542" stroke="#fff3c4"/><path d="M0 1 L15 12 L30 1" fill="none" stroke="#b8860b" stroke-width="1.1"/><text x="15" y="14.5" fill="#7a5a00" font-size="10" font-weight="bold" text-anchor="middle">★</text></g>
      </g>
      <!-- golden output + tray -->
      <rect x="690" y="158" width="84" height="44" rx="10" fill="#12121c" stroke="#2a2a3e"/>
      <g class="gold-pulse" transform="translate(716,162)"><rect width="32" height="20" rx="2.5" fill="#f5c542" stroke="#fff3c4" stroke-width="1.2"/><path d="M1.5 3 L16 12.5 L30.5 3" fill="none" stroke="#b8860b" stroke-width="1.2"/><text x="16" y="15" fill="#7a5a00" font-size="9" font-weight="bold" text-anchor="middle">★</text></g>
      <text x="732" y="224" fill="#3ecf8e" font-size="9" font-family="monospace" text-anchor="middle">BOOKED CALL</text>
      <g class="cal-notif">
        <rect x="678" y="108" width="138" height="44" rx="9" fill="#16161f" stroke="#2a2a3e"/>
        <rect x="688" y="118" width="22" height="22" rx="4" fill="#ffffff"/>
        <rect x="688" y="118" width="22" height="7" rx="4" fill="#4285F4"/>
        <text x="699" y="136" fill="#1a73e8" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui,sans-serif">15</text>
        <text x="718" y="126" fill="#eaeef8" font-size="9" font-weight="600" font-family="system-ui,sans-serif">Google Calendar</text>
        <text x="718" y="139" fill="#9099b8" font-size="8" font-family="system-ui,sans-serif">New meeting booked</text>
        <circle cx="806" cy="119" r="4.5" fill="#3ecf8e"/>
      </g>
`;

export default function InfraBento() {
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
            Anyone can send emails. Landing in the primary inbox, at scale, without burning domains is an engineering problem. Here&apos;s the system we run on every account - monitored, instrumented, and tuned like a production pipeline.
          </Reveal>

          <Reveal className="tpill">
            <div className="tpill-stars">★★★★★</div>
            <div className="tpill-quote">
              &ldquo;Clear step-by-step guidance, practical tips, and real hands-on help. My spam rate dropped and I finally started seeing results.&rdquo;
            </div>
            <div className="tpill-author">Ahmad Jabbir · TEDx Speaker &amp; Coach</div>
          </Reveal>

          <Reveal className="infra-status">
            <span className="seg"><span className="infra-livedot" /> All systems operational</span>
            <span className="seg-div" />
            <span className="seg"><b>98.2%</b> inbox placement</span>
            <span className="seg-div" />
            <span className="seg"><b>8/8</b> health signals green</span>
          </Reveal>

          <div className="machine">
            <svg viewBox="0 0 820 250" role="img" aria-label="Bleed AI email machine" dangerouslySetInnerHTML={{ __html: MACHINE_SVG }} />
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
