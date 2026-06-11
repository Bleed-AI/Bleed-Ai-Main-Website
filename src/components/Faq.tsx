"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/Reveal";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Do you offer a trial before committing to a package?",
    a: (
      <>
        <strong>Yes - for qualified companies, we offer a trial campaign.</strong> We first check that your offer, niche, and ICP are a good fit. If they are, we run a trial campaign so you can see real results before committing to a full managed package. Use the &ldquo;Check If Your Niche Is Available&rdquo; button to start that conversation.
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
                {open === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
