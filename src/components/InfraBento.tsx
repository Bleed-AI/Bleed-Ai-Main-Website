"use client";

import Reveal from "@/components/Reveal";

const ico = (d: string | string[]) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    {(Array.isArray(d) ? d : [d]).map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
);

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

          <div className="infra-grid">
            <Reveal className="infra-card wide tall" delay={60}>
              <span className="infra-ping" />
              <div className="infra-top">
                <div className="infra-ico">{ico("M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z")}</div>
                <span className="infra-num">01</span>
              </div>
              <div className="infra-title">Deliverability Engine</div>
              <div className="infra-gauge">
                <div className="gauge-ring">
                  <div className="gauge-val"><b>98.2%</b><span>Inbox rate</span></div>
                </div>
                <div className="gauge-meta">
                  <div><span className="gm-dot" /> SPF / DKIM / DMARC aligned</div>
                  <div><span className="gm-dot" /> Domain-to-volume ratios enforced</div>
                  <div><span className="gm-dot" /> Safe ramp schedules, never spiked</div>
                </div>
              </div>
              <div className="infra-desc">
                The reputation guardrails that keep you in the primary inbox instead of spam - the single biggest reason cold email quietly fails for everyone else.
              </div>
            </Reveal>

            <Reveal className="infra-card" delay={120}>
              <span className="infra-ping" />
              <div className="infra-top">
                <div className="infra-ico">{ico(["M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z", "M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"])}</div>
                <span className="infra-num">02</span>
              </div>
              <div className="infra-title">Warmup &amp; Placement</div>
              <div className="infra-desc">Best-practice mailbox warmups plus continuous placement checks - so you stay out of spam and in the inbox that converts.</div>
            </Reveal>

            <Reveal className="infra-card" delay={180}>
              <span className="infra-ping" />
              <div className="infra-top">
                <div className="infra-ico">{ico("M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z")}</div>
                <span className="infra-num">03</span>
              </div>
              <div className="infra-title">Health Monitoring</div>
              <div className="infra-signals">
                {Array.from({ length: 8 }).map((_, i) => <span className="sig-dot" key={i} />)}
              </div>
              <div className="infra-desc">We watch 8 early-warning signals that predict deliverability drops before your results ever move.</div>
            </Reveal>

            <Reveal className="infra-card" delay={60}>
              <span className="infra-ping" />
              <div className="infra-top">
                <div className="infra-ico">{ico("M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75")}</div>
                <span className="infra-num">04</span>
              </div>
              <div className="infra-title">Data Sourcing &amp; Validation</div>
              <div className="infra-desc">Tooling that sources leads, validates every email, and strips risky addresses before a single send goes out.</div>
            </Reveal>

            <Reveal className="infra-card" delay={120}>
              <span className="infra-ping" />
              <div className="infra-top">
                <div className="infra-ico">{ico("M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z")}</div>
                <span className="infra-num">05</span>
              </div>
              <div className="infra-title">Enrichment Layer</div>
              <div className="infra-desc">We add the data points your targeting and personalization need - firmographics, tech stack, and live buying signals.</div>
            </Reveal>

            <Reveal className="infra-card" delay={60}>
              <span className="infra-ping" />
              <div className="infra-top">
                <div className="infra-ico">{ico("M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75")}</div>
                <span className="infra-num">06</span>
              </div>
              <div className="infra-title">Inbox &amp; Domain Rotation</div>
              <div className="infra-desc">Systematic swapping of tired inboxes and domains, with clear rules for scaling volume up or down without risk.</div>
            </Reveal>

            <Reveal className="infra-card wide" delay={120}>
              <span className="infra-ping" />
              <div className="infra-top">
                <div className="infra-ico">{ico(["M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", "M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"])}</div>
                <span className="infra-num">07</span>
              </div>
              <div className="infra-title">AI Personalization</div>
              <div className="infra-perso">
                <span className="tok">{"{{first_name}}"}</span> at <span className="tok">{"{{company}}"}</span>
                <span className="arr">→</span>
                <span className="out">&ldquo;Hey Sarah, saw Veevo just raised your Series A...&rdquo;</span>
              </div>
              <div className="infra-desc">Hyper-relevant emails at scale - tailored hooks, context, and positioning for each prospect, without ever sounding like a template.</div>
            </Reveal>

            <Reveal className="infra-card" delay={180}>
              <span className="infra-ping" />
              <div className="infra-top">
                <div className="infra-ico">{ico("M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5")}</div>
                <span className="infra-num">08</span>
              </div>
              <div className="infra-title">Automation That Books Calls</div>
              <div className="infra-desc">Automations keep the system running and route confirmed-interest replies straight into a clean booking flow, follow-ups included.</div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
