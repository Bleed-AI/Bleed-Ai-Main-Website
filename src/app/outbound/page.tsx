import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StatsStrip from "@/components/StatsStrip";
import InfraLine from "@/components/InfraLine";
import OutcomePackages from "@/components/slots/OutcomePackages";
import { RoiBand } from "@/components/home/HomeFinalCta";
import InboxExample from "@/components/outbound/InboxExample";
import EmailLineItems from "@/components/outbound/EmailLineItems";
import CostCalcBand from "@/components/outbound/CostCalcBand";
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
  noindex: false,
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
    a: "We swap the service. A new market, a new angle, or a different service altogether, like LinkedIn posts or articles, from the start of the next month. No new contract, no starting over.",
  },
  {
    q: "Is there a contract?",
    a: "No. It is month to month on a card subscription. Add, drop or swap services at the start of any month.",
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

      {/* Signature: a real looking inbox, next to what the service delivers every month */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <SectionHead
          label="What a campaign looks like"
          title={
            <>
              One email. <em className="hd-em">One meeting.</em>
            </>
          }
          sub="The email goes out from you to a buyer showing the right signal. When they reply, we answer within minutes and book the call. You just show up."
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <InboxExample />
          </div>
          <div className="min-w-0 lg:pt-11">
            <EmailLineItems />
          </div>
        </div>
      </section>

      {/* Proof */}
      <OutboundProof />
      <OutboundQuotes />

      <InfraLine />

      {/* Plans */}
      <section id="packages" className="scroll-mt-24 px-5 pb-6 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            label="Plans"
            title={
              <>
                Start with a test. <em className="hd-em">Keep what works.</em>
              </>
            }
            sub={`Test one market on two services, or run email and LinkedIn on the same buyers with four, where the fourth is free. ${PRICE_LINE}.`}
          />
          <OutcomePackages outcome={OUTCOME} />
          <p className="mx-auto mt-8 max-w-3xl text-center text-[14px] leading-relaxed text-[#9099b8]">
            Most clients start on a plan, find the market that bites, then step up to the{" "}
            <a href="#specialist" className="font-semibold text-white underline decoration-[#B1130F] underline-offset-4 hover:text-[#ff5a52]">
              Outbound Specialist
            </a>{" "}
            plan for several markets and constant tests.
          </p>
          <div className="mx-auto max-w-5xl">
            <SwapIns ids={["direct-mail", "website-visitors", "job-signals", "reactivation"]} />
          </div>
        </div>
      </section>

      {/* Calculators: the ROI calculator moved here from the nav, plus the one-off campaign cost calculator */}
      <section className="pt-16 sm:pt-24">
        <div className="px-5 sm:px-8">
          <SectionHead
            label="Run the numbers"
            title={
              <>
                What could outbound <em className="hd-em">return for you?</em>
              </>
            }
            sub="Put in your deal size and close rate and see what a campaign could bring back. Or price one campaign on its own."
          />
        </div>
        <div className="mx-auto -mt-10 max-w-5xl [&>section]:pb-4">
          <RoiBand />
          <CostCalcBand />
        </div>
      </section>

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
