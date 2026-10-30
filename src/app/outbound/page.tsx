import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StatsStrip from "@/components/StatsStrip";
import AiFollowUp from "@/components/AiFollowUp";
import InfraLine from "@/components/InfraLine";
import OutcomePackages from "@/components/slots/OutcomePackages";
import SignalToMeeting from "@/components/outbound/SignalToMeeting";
import SpecialistStepUp from "@/components/outbound/SpecialistStepUp";
import OutboundQuotes from "@/components/outbound/OutboundQuotes";
import OutboundProof from "@/components/outbound/OutboundProof";
import { OutcomeHero, PageCta, PageFaq, SectionHead, SwapIns } from "@/components/outbound/OutcomeKit";
import { outcomeById, PRICE_LINE } from "@/lib/slots";

const OUTCOME = "outbound" as const;
const outcome = outcomeById(OUTCOME);

export const metadata: Metadata = buildMeta({
  title: `${outcome.name}: ${outcome.title}`,
  description:
    "Meetings with buyers you picked. We find the companies showing the right signals, reach the people who decide by email and LinkedIn, and handle every reply.",
  path: "/outbound",
  // New service page, hidden from search until go-live.
  noindex: true,
});

const faqs = [
  {
    q: "Do you send from my domain?",
    a: "No. We send from separate domains we set up and warm ourselves, so your main domain stays clean.",
  },
  {
    q: "Who handles the replies?",
    a: "We do. Every reply is answered in minutes, in your voice, and a person checks what goes out until you trust it. When a buyer is interested, you get the conversation and the meeting.",
  },
  {
    q: "How fast is the first send?",
    a: "We launch within 48 hours of sign-off. The first emails go out once the sending accounts are warmed, and replies typically start 2 to 3 weeks from launch.",
  },
  {
    q: "What if a market does not bite?",
    a: "We swap the slot. A new market, a new angle, or a different slot altogether, like LinkedIn posts or articles, from the start of the next month. No new contract, no starting over.",
  },
  {
    q: "Is there a contract?",
    a: "No. It is month to month on a card subscription. Add, drop or swap slots at the start of any month.",
  },
];

export default function OutboundPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />

      <OutcomeHero
        outcome={OUTCOME}
        name={outcome.name}
        title={
          <>
            Book meetings with <em className="hd-em">buyers you picked.</em>
          </>
        }
        sub="We find the companies showing the signals your best customers showed, reach the people who decide by email and LinkedIn, and handle every reply until a call is on your calendar."
        points={["Buyers found by signal", "Email and LinkedIn on the same people", "Every reply handled for you"]}
      />

      <StatsStrip />

      {/* Signature: signal to meeting */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <SectionHead
          label="From signal to meeting"
          title={
            <>
              One signal. <em className="hd-em">One meeting.</em>
            </>
          }
          sub="Here is the whole path for a single account. We run it for every company on your list, every week."
        />
        <SignalToMeeting />
      </section>

      {/* Proof */}
      <OutboundProof />
      <OutboundQuotes />

      {/* Replies and sending, kept from today's site */}
      <AiFollowUp />
      <InfraLine />

      {/* Packages */}
      <section id="packages" className="scroll-mt-24 px-5 pb-6 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            label="Packages"
            title={
              <>
                Start with a test. <em className="hd-em">Keep what works.</em>
              </>
            }
            sub={`Test one market on two slots, or run email and LinkedIn on the same buyers with four, where the fourth is free. ${PRICE_LINE}.`}
          />
          <OutcomePackages outcome={OUTCOME} />
          <SwapIns ids={["direct-mail", "website-visitors", "job-signals", "reactivation"]} />
        </div>
      </section>

      <SpecialistStepUp />

      <PageFaq items={faqs} />

      <PageCta
        outcome={OUTCOME}
        title={
          <>
            See the replies <em className="hd-em">before you pay.</em>
          </>
        }
        sub="Two weeks free. We pick the buyers with you, write the emails, send them and hand you every reply."
      />

      <Footer />
    </main>
  );
}
