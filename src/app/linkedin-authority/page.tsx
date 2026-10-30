import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OutcomePackages from "@/components/slots/OutcomePackages";
import LinkedInShowcase from "@/components/linkedin/LinkedInShowcase";
import NetworkInvites from "@/components/linkedin/NetworkInvites";
import SwapInServices from "@/components/linkedin/SwapInServices";
import { OutcomeHero, PageCta, PageFaq, SectionHead } from "@/components/outbound/OutcomeKit";
import { MIN_SLOTS, outcomeById, PRICE_LINE, unitLabel } from "@/lib/slots";

// Round 2 (2026-10-30): visitor words are package, plan and service, never slot. The examples are a real
// looking LinkedIn feed post, a LinkedIn message thread and the invitations page, not diagrams.

const OUTCOME = "linkedin-authority" as const;
const outcome = outcomeById(OUTCOME);

export const metadata: Metadata = buildMeta({
  title: `${outcome.name}: ${outcome.title}`,
  description:
    "Buyers in your market know your name before you ever pitch them. Posts in your voice, a network made of buyers, and every person who engages followed up.",
  path: "/linkedin-authority",
  noindex: false,
});

const faqs = [
  {
    q: "Will it sound like me?",
    a: "Yes. We learn your voice from your past posts, your calls and a short kickoff, and every post is written to sound like you on a good day. If a line does not sound like you, it does not go out.",
  },
  {
    q: "Do I approve every post?",
    a: "Yes. You see each post before it is published and can edit or drop it. Nothing goes out under your name without your yes.",
  },
  {
    q: "Will it look automated?",
    a: "No. Posts are written for your market, with designed images and carousels, not templates. Connection requests and follow-ups go to people who fit your buyer, at a careful pace, with notes written for them.",
  },
  {
    q: "What does it need from me?",
    a: "One short call to start, so we learn your voice and your buyer. After that, about 10 minutes a week to approve posts, and someone to take the conversations we hand you.",
  },
  {
    q: "Is my LinkedIn account safe?",
    a: "We stay well under LinkedIn's limits and ramp up slowly, the way a careful person would.",
  },
  {
    q: "What if LinkedIn is not working for us?",
    a: "Then we swap it. Each service is a full service on its own, and any of them can change at the start of a month, to articles, AI search or outbound, without a new contract.",
  },
];

export default function LinkedinAuthorityPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />

      <OutcomeHero
        outcome={OUTCOME}
        name={outcome.name}
        title={
          <>
            Become the known name <em className="hd-em">on LinkedIn.</em>
          </>
        }
        sub="Buyers in your market know your name before you ever pitch them. We write the posts, grow a network made of buyers, and follow up everyone who engages."
        points={["Posts in your voice, approved by you", "A network made of buyers", "Every engager who fits, followed up"]}
      />

      {/* Signature: the post and the follow-up, as they look on LinkedIn */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <SectionHead
          label="What it looks like"
          title={
            <>
              Posts your buyers read. <em className="hd-em">Replies you can take.</em>
            </>
          }
          sub="We research what your market is reacting to, write the post in your voice and design the carousel. When a buyer comments, they get a follow-up, and the conversation lands with you."
        />
        <LinkedInShowcase />
      </section>

      {/* Network growth */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <NetworkInvites />
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            label="Plans"
            title={
              <>
                Pick a plan. <em className="hd-em">Swap any service.</em>
              </>
            }
            sub={`Start with ${unitLabel(MIN_SLOTS)} or go straight to four, where the fourth is free. ${PRICE_LINE}.`}
          />
          <OutcomePackages outcome={OUTCOME} />
          <SwapInServices
            ids={["competitor-engagers", "video", "video-repurpose", "smart-engagement"]}
            note={
              <>
                Want cold messages sent to buyers who have never seen you? That is LinkedIn outreach, and it lives in{" "}
                <a href="/outbound/" className="font-semibold text-white underline decoration-[#B1130F] underline-offset-4 hover:text-[#ff8a86]">
                  Outbound
                </a>
                .
              </>
            }
          />
        </div>
      </section>

      <PageFaq items={faqs} />

      <PageCta
        outcome={OUTCOME}
        title={
          <>
            Be the name they <em className="hd-em">already know.</em>
          </>
        }
        sub="Two weeks free. We write your first posts and start growing your network, you approve everything."
      />

      <Footer />
    </main>
  );
}
