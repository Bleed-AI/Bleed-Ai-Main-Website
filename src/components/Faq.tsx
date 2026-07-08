"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/Reveal";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Can I test cold email before committing to a package?",
    a: (
      <>
        <strong>Yes, that&apos;s what The Outbound Sprint is for.</strong> It&apos;s a fixed-price, 6-week engagement running up to 8 cold email experiments, so you see real results before committing to a full managed package. Use the Outbound Sprint button to get started.
      </>
    ),
  },
  {
    q: "What do I actually own?",
    a: (
      <>
        <strong>Everything we build for you.</strong> The sending domains, the inboxes, the lead lists we build, the copy we write, and the campaign SOPs are all yours. If we ever part ways, you keep the whole system and can run it in-house any time. You&apos;re never renting access to your own pipeline.
      </>
    ),
  },
  {
    q: "Is there a minimum commitment?",
    a: (
      <>
        <strong>No lock-in. Packages are month to month.</strong> We&apos;d rather earn the next month with results than trap you in a long contract. If it&apos;s working, you&apos;ll stay because the pipeline is full, not because a contract says you have to.
      </>
    ),
  },
  {
    q: "What's the difference between a managed package and a one-time campaign?",
    a: (
      <>
        <strong>Packages are ongoing monthly outbound - </strong>we run experiments, test segments, optimize continuously, and scale what&apos;s working. <strong>One-time campaigns</strong> are a single targeted push: a product launch, a new market test, or a specific list of accounts. Use the calculator to price a one-time campaign exactly.
      </>
    ),
  },
  {
    q: "How long until the first replies come in?",
    a: (
      <>
        Campaigns launch within <strong>48 hours</strong> of signing. Due to mailbox warmup (which we handle entirely), the first emails go out within 7–10 days, and replies typically start appearing within <strong>2–3 weeks</strong> from launch. We don&apos;t do &ldquo;90 days to see results&rdquo; - that&apos;s an excuse agencies use to protect retainers.
      </>
    ),
  },
  {
    q: "Does your main domain get used for sending?",
    a: (
      <>
        <strong>Never.</strong> We build a completely separate sending infrastructure: fresh domains, proper DNS (SPF, DKIM, DMARC), dedicated mailboxes. Your primary domain&apos;s reputation is untouched. This is one of the most common reasons cold email fails for companies that tried it before - they burned their main domain.
      </>
    ),
  },
  {
    q: "What industries work best with cold email?",
    a: (
      <>
        We&apos;ve run successful campaigns in <strong>12+ industries</strong> including SaaS, marketing agencies, coaching, video production, recruitment, paid events, and more. The common thread isn&apos;t the industry - it&apos;s the offer. If your offer clearly solves a known business problem for a definable group of companies, cold email works. We&apos;ll tell you honestly if yours doesn&apos;t fit.
      </>
    ),
  },
  {
    q: "Why does Taha's background in AI matter for cold email?",
    a: (
      <>
        Cold email in 2026 is as much an <strong>engineering problem</strong> as a copywriting problem. Deliverability is a technical discipline. List quality is a data problem. AI personalization at scale is a systems challenge. Most agency founders optimized these by trial and error over years. Taha built AI systems used by 1M+ students before touching cold email - and that changes how precisely the underlying mechanics are understood and controlled.
      </>
    ),
  },
];

export default function Faq() {
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
