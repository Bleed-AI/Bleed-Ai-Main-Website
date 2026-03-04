import type { Metadata } from 'next';
import { generateMetadata, generateServiceSchema } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Free Pilot Campaign | Test Your Market Fit",
  description: "Free or $800 pilot campaign to validate your offer. Reach 1k-5k prospects, test messaging, get real market data before scaling. Start in 1 week.",
  path: "/services/pilot-campaign",
  keywords: [
    "pilot campaign",
    "free pilot",
    "market validation",
    "test offer",
    "outbound pilot",
    "campaign launch",
    "market fit testing"
  ],
});

import Navigation from '@/components/Navigation';

const serviceSchema = generateServiceSchema({
  name: "Pilot Campaign Launch",
  description: "Test your offer with real market validation through pilot campaigns",
  url: "https://bleedai.com/services/pilot-campaign",
  price: "0",
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
    id: 'free-pilot',
    title: 'Free Pilot',
    price: '$0',
    description: 'Reach out to 1-2k prospects with 1 campaign launch. Check if you\'re eligible.',
    features: [
      'Reach 1,000-2,000 prospects in your ICP',
      '1 Campaign launch',
      'Eligibility: Must have existing customers',
      'LTV requirement: At least $3-5k',
      'TAM requirement: At least 20k+',
      'Unique offer or strong branding required',
      'Perfect for validating market interest'
    ],
    ctaText: 'Check Eligibility',
    ctaLink: '#book-call'
  },
  {
    id: 'standard-pilot',
    title: 'Standard Pilot',
    price: '$800',
    description: 'Start in 1 week. Reach 4-5k prospects with 2-3 campaign launches and offer angles.',
    features: [
      'Start in 1 week',
      'Reach 4,000-5,000 of your ICP',
      '2-3 Campaign launches',
      '2-3 Offer angles testing',
      'Our proven system and tactics',
      'Test market interest at fraction of cost',
      'Expert strategy & execution'
    ],
    ctaText: 'Launch Standard Pilot',
    ctaLink: '#book-call',
    popular: true
  },
  {
    id: 'scale',
    title: 'Find Best Message/Market Fit',
    price: 'Custom',
    priceSubtext: 'Scale Package',
    description: 'Fully managed outbound service with complete strategy and execution handling.',
    features: [
      'Fully managed outbound service',
      'Branded inboxes setup',
      'Complete strategy & execution',
      'Standard AI relevance campaigns',
      'Advanced signal campaigns & workflows',
      'CRM integrations',
      'Automated LinkedIn connections with MQLs',
      'Dedicated account management'
    ],
    ctaText: 'Scale with Us',
    ctaLink: '#book-call'
  }
];

export default function PilotCampaignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="relative overflow-hidden">
        <Navigation />

      <ServiceHero
        badge="Pilot Campaign"
        title="Test Your Offer with"
        gradientText="Real Market Validation"
        subtitle="Launch campaigns that prove market interest before scaling"
        description="From free pilots to fully managed campaigns—test your offer angles, validate messaging, and discover what resonates with your ICP before investing in scale."
        highlights={[
          'Start Free or $800',
          'Launch in 1 Week',
          'Real Market Data'
        ]}
        ctaText="Launch Your Pilot"
        ctaLink="#book-call"
      />

      <PackageCards
        packages={packages}
        title="Choose Your Pilot Campaign"
        subtitle="From free validation to fully managed campaigns—find the right fit for your business"
      />

      <CalendlyEmbed
        url="https://calendly.com/bleedai/pilot-campaign-launch?embed_type=Inline&text_color=000000&primary_color=b1130f&month=2026-02"
        title="Book Your Pilot Campaign Launch"
        subtitle="Select a time to discuss your campaign strategy and get started"
        benefits={[
          "Review your ICP and target market fit",
          "Discuss offer angles and messaging strategy",
          "Understand campaign setup and timeline",
          "Get expert recommendations for your pilot",
          "Clarify eligibility requirements (for free pilot)",
          "Q&A about deliverables and expectations"
        ]}
      />

      <ServiceCta
        title="Ready to Test Your Market Fit?"
        description="Launch a pilot campaign and discover what messaging resonates with your ICP. Get real data before committing to scale."
        ctaText="Launch Your Pilot Campaign"
        ctaLink="#book-call"
        trustIndicators={[
          'Free Pilot Available',
          'Start in 1 Week',
          'Expert Strategy Included'
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
