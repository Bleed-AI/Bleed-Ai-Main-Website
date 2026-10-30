"use client";

import Reveal from "@/components/Reveal";

/** Founder section for the slot model homepage. Claims as on the live site and the proof sheet. */
export default function HomeFounder() {
  return (
    <section id="founder">
      <div className="sec dark">
        <div className="sec-inner">
          <div className="founder-grid">
            <div className="founder-left">
              <Reveal className="founder-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/taha-anwar.png" alt="Taha Anwar, Founder of BleedAI" />
              </Reveal>
              <Reveal
                as="a"
                className="founder-linkedin"
                href="https://www.linkedin.com/in/taha-outbound"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
                Connect on LinkedIn
              </Reveal>
            </div>
            <div>
              <Reveal className="sec-label">The builder</Reveal>
              <Reveal as="h2" className="sec-h2" style={{ fontSize: 32, marginBottom: 20 }}>
                Marketing, run by an engineer,
                <br />
                not a <em>salesperson.</em>
              </Reveal>
              <Reveal as="p" className="founder-bio" delay={80}>
                I&apos;m <strong>Taha Anwar</strong>. Before BleedAI, I spent years building AI systems and teaching them to more than <strong>1 million students</strong> worldwide.
                <br />
                <br />
                That is why we run marketing like a system. Every slot is measured, every month is reported, and anything that stops working gets swapped for something that does.
                <br />
                <br />
                <strong>Most agencies sell you one channel and then defend it. We would rather move your money to what works.</strong>
              </Reveal>
              <Reveal className="founder-creds" delay={120}>
                <div className="cred"><div className="cred-num">1M<span>+</span></div><div className="cred-lbl">Students taught</div></div>
                <div className="cred-div" />
                <div className="cred"><div className="cred-num">85<span>+</span></div><div className="cred-lbl">5-star reviews</div></div>
                <div className="cred-div" />
                <div className="cred"><div className="cred-num">12<span>+</span></div><div className="cred-lbl">Industries served</div></div>
                <div className="cred-div" />
                <div className="cred"><div className="cred-num">5.0<span className="cred-star">★</span></div><div className="cred-lbl">Upwork · Clutch · TechReviewer</div></div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
