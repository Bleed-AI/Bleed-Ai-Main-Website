"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/Reveal";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What is a pass?",
    a: (
      <>
        <strong>A pass is one coordinated round of outreach on a target account:</strong> a new door and a better reason to reach out. We run four passes over about 30 days, so the person who signs actually sees you instead of ignoring a single cold email.
      </>
    ),
  },
  {
    q: "Which channels do you run?",
    a: (
      <>
        <strong>Email, LinkedIn and direct mail for outreach,</strong> with warm phone and website forms where they fit. Every reply lands in the CRM we set up, and we run the follow-up to a booked meeting. Follow-up is our job, not yours.
      </>
    ),
  },
  {
    q: "Who qualifies for a trial?",
    a: (
      <>
        <strong>Products that already sell.</strong> You have paying customers you can name, a real sales conversation before the deal, and a market of thousands of possible buyers. If that is not you yet, we point you to a Sprint or a single campaign instead.
      </>
    ),
  },
  {
    q: "What happens after the trial?",
    a: (
      <>
        <strong>You see every reply from a real campaign we built for you.</strong> If it works, you move to a monthly plan. If not, you walk away. No lock-in, and you keep everything we built.
      </>
    ),
  },
  {
    q: "How does pricing work?",
    a: (
      <>
        <strong>It starts with a trial.</strong> If your product already sells, you qualify, and you see the replies before you pay us. From there you can run a one-time Sprint at $2,950, or launch a single campaign for under $1K on the calculator.
      </>
    ),
  },
  {
    q: "Whose domains and data are they, and what do I keep?",
    a: (
      <>
        <strong>Yours.</strong> We set up separate sending infrastructure so your main domain is never at risk, and the domains, lists, copy and every thread stay with you if we ever part ways.
      </>
    ),
  },
  {
    q: "How fast do we start?",
    a: (
      <>
        <strong>The build starts within 48 hours of signing.</strong> Due to mailbox warmup, which we handle, the first sends go out in about two weeks.
      </>
    ),
  },
];

export default function FaqV2() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq">
      <div className="sec">
        <div className="sec-inner" style={{ textAlign: "center" }}>
          <Reveal className="sec-label">Common Questions</Reveal>
          <Reveal as="h2" className="sec-h2" style={{ marginBottom: 8 }}>
            Straight answers.
            <br />
            <em>No funnel-speak.</em>
          </Reveal>
          <Reveal
            as="p"
            delay={80}
            style={{ color: "var(--sub)", fontSize: 15, marginBottom: 36, maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}
          >
            We&apos;d rather answer the hard question now than lose your trust later.
          </Reveal>

          <Reveal className="faq-list" style={{ margin: "0 auto" }}>
            {faqs.map((f, i) => (
              <div className={`faq-item${open === i ? " open" : ""}`} key={i}>
                <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  {f.q}
                  <span className="faq-ico">+</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
