import type { Metadata } from 'next';
import { generateMetadata, generateServiceSchema } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "The Outbound Sprint | Prove Cold Outreach Before You Scale",
  description: "A six-week, fixed-price proof engagement. We run up to 8 cold email experiments against your market, keep what books meetings, and hand you the whole system. You own all of it.",
  path: "/services/pilot-campaign",
  keywords: [
    "outbound sprint",
    "cold email campaign",
    "market validation",
    "test offer",
    "cold outreach",
    "b2b lead generation",
    "market fit testing"
  ],
  noindex: true,
});

import Navigation from '@/components/Navigation';

const serviceSchema = generateServiceSchema({
  name: "The Outbound Sprint",
  description: "A six-week, fixed-price proof engagement: up to 8 cold email experiments, a written success bar, and you keep the whole system.",
  url: "https://bleedai.com/services/pilot-campaign",
  price: "2950",
});
import ServiceHero from '@/components/ServiceHero';
import PackageCards, { Package } from '@/components/PackageCards';
import CalendlyEmbed from '@/components/CalendlyEmbed';
import ServiceCta from '@/components/ServiceCta';
import Testimonials from '@/components/Testimonials';
import CampaignSnapshots from '@/components/CampaignSnapshots';
import EmailThreads from '@/components/EmailThreads';
import Footer from '@/components/Footer';

const packages: Package[] = [
  {
    id: 'sprint',
    title: 'The Outbound Sprint',
    price: '$2,950',
    priceSubtext: 'one-time · 6 weeks',
    description: 'We map every method and buying signal that fits your market, then run up to 8 campaign experiments as a tournament. You keep everything we build.',
    features: [
      'Up to 8 campaign experiments run in parallel',
      'Every sourcing method + buying signal for your market',
      'A written success bar, agreed before we send',
      'AI reply agent booking your positive replies',
      'You keep the domains, inboxes, lists, copy & playbook',
      'Re-run promise: no arm hits the bar, one more round on us'
    ],
    ctaText: 'Start Your Sprint',
    ctaLink: 'https://calculator.bleedai.com/sprint',
    popular: true
  },
  {
    id: 'growth',
    title: 'Growth',
    price: '$3,350',
    priceSubtext: 'per month',
    description: 'The monthly program Sprint winners roll into. The whole outbound machine run for you, hunting new markets every month.',
    features: [
      'All domains and inbox fees covered',
      'Full DFY sourcing (Clay, Prospeo, directories)',
      'Multiple experiments every month',
      'Context-based sub-sequences that warm leads to booked calls',
      'AI reply agent on every inbound reply',
      'Dedicated Slack support, 5 days a week'
    ],
    ctaText: 'See Monthly Plans',
    ctaLink: 'https://calculator.bleedai.com/packages'
  },
  {
    id: 'scale',
    title: 'Scale',
    price: '$5,300',
    priceSubtext: 'per month',
    description: 'Multi-channel outbound at full strategic depth, for teams pressing the whole market at once.',
    features: [
      'Everything in Growth',
      'Multi-touch: LinkedIn, SMS & optional calls, CRM-orchestrated',
      'LinkedIn touchpoints on your interested leads',
      'Advanced signal-based campaigns & workflows',
      'Reverse lead magnets where a campaign calls for one',
      'Dedicated account management'
    ],
    ctaText: 'See Monthly Plans',
    ctaLink: 'https://calculator.bleedai.com/packages'
  }
];

export default function PilotCampaignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="relative overflow-x-clip">
        <Navigation />

      <ServiceHero
        badge="The Outbound Sprint"
        title="Prove Cold Outreach"
        gradientText="Before You Scale"
        subtitle="A six-week, fixed-price proof engagement. You keep everything we build."
        description="We map every method and buying signal that fits your market and run up to 8 campaign experiments against each other until one wins. Keep what books meetings and own the whole system."
        highlights={[
          '$2,950 One-Time',
          '6 Weeks',
          'You Own It All'
        ]}
        ctaText="Start Your Sprint"
        ctaLink="#book-call"
      />

      <PackageCards
        packages={packages}
        title="Prove It, Then Scale It"
        subtitle="One fixed-price Sprint to find what works, then a monthly program to run the winner at scale"
      />

      <CalendlyEmbed
        url="https://calendly.com/bleedai/pilot-campaign-launch?embed_type=Inline&text_color=000000&primary_color=b1130f&month=2026-02"
        title="Book Your Sprint Kickoff"
        subtitle="Select a time to scope your market, write your success bar, and get started"
        benefits={[
          "Review your ICP and target market fit",
          "Discuss offer angles and messaging strategy",
          "Write your success bar together, in your numbers",
          "Understand the 6-week timeline and what you keep",
          "See where the Sprint rolls into a monthly program",
          "Q&A about deliverables and expectations"
        ]}
      />

      <ServiceCta
        title="Ready to Prove Your Market Fit?"
        description="Run the Sprint, find the angle that books meetings, and get real data before you commit to a retainer."
        ctaText="Start Your Sprint"
        ctaLink="#book-call"
        trustIndicators={[
          'Fixed $2,950, One-Time',
          '6 Weeks, Start to Scale',
          'You Keep Everything'
        ]}
      />

      <Testimonials />
      <CampaignSnapshots />
      <EmailThreads />
      <Footer />
    </main>
    </>
  );
}
