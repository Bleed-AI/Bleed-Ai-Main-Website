import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OutcomePackages from "@/components/slots/OutcomePackages";
import PostEngine from "@/components/linkedin/PostEngine";
import NetworkGrowth from "@/components/linkedin/NetworkGrowth";
import MonthlyBoard from "@/components/linkedin/MonthlyBoard";
import { OutcomeHero, PageCta, PageFaq, SectionHead, SwapIns } from "@/components/outbound/OutcomeKit";
import { outcomeById, packagesFor, PRICE_LINE } from "@/lib/slots";

const OUTCOME = "linkedin-authority" as const;
const outcome = outcomeById(OUTCOME);

export const metadata: Metadata = buildMeta({
  title: `${outcome.name}: ${outcome.title}`,
  description:
    "Buyers in your market know your name before you ever pitch them. Posts in your voice, a network made of buyers, and every person who engages followed up.",
  path: "/linkedin-authority",
  // New service page, hidden from search until go-live.
  noindex: true,
});

const featured = packagesFor(OUTCOME).find((p) => p.featured) ?? packagesFor(OUTCOME)[0];

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
    a: "Then we swap the slot. Any slot on your board can move to something else at the start of a month, like articles, AI search or outbound, without a new contract.",
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

      {/* Signature: a post that builds itself */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <SectionHead
          label="One post, start to finish"
          title={
            <>
              A post that <em className="hd-em">builds itself.</em>
            </>
          }
          sub="We research what your market is reacting to, write the post in your voice, design the carousel, then sort everyone who engages. The ones who fit your buyer get a follow-up."
        />
        <PostEngine />
      </section>

      {/* Network growth */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <NetworkGrowth />
        </div>
      </section>

      {/* What arrives each month */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            label={`What arrives with ${featured.name}`}
            title={
              <>
                Four slots, <em className="hd-em">every month.</em>
              </>
            }
            sub="Each slot is a real piece of work that shows up on a schedule. You see all of it in a short monthly report."
          />
          <MonthlyBoard items={featured.items} />
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            label="Packages"
            title={
              <>
                Pick a board. <em className="hd-em">Swap any slot.</em>
              </>
            }
            sub={`Start with two slots or go straight to four, where the fourth is free. ${PRICE_LINE}.`}
          />
          <OutcomePackages outcome={OUTCOME} />
          <SwapIns
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
