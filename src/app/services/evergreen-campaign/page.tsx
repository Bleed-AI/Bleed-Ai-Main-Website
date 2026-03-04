import type { Metadata } from 'next';
import { generateMetadata, generateServiceSchema } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Signal Campaigns | Capture Every Lead Opportunity",
  description: "Automated signal campaigns that convert. Capture website visitors, job posts, LinkedIn activity into qualified leads. AI-powered workflows.",
  path: "/services/evergreen-campaign",
  keywords: [
    "signal campaigns",
    "lead capture",
    "website visitor tracking",
    "LinkedIn automation",
    "evergreen campaigns",
    "AI workflows",
    "automated outreach"
  ],
});

import Navigation from '@/components/Navigation';

const serviceSchema = generateServiceSchema({
  name: "Evergreen Signal Campaigns",
  description: "Capture every signal and convert to revenue with automated AI-powered campaigns",
  url: "https://bleedai.com/services/evergreen-campaign",
  price: "350",
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
    id: 'basic-setup',
    title: 'Basic Setup',
    price: '$350',
    description: 'Capture data using a criteria and a signal with basic workflow automation.',
    features: [
      'Capture data using 1 criteria & 1 signal',
      'Workflow setup included',
      'Push to Slack integration',
      'Push to Google Sheet integration',
      'Directly email your ICP with Gmail',
      'Basic signal monitoring',
      'Setup support included'
    ],
    ctaText: 'Get Basic Setup',
    ctaLink: '#book-call'
  },
  {
    id: 'pro-setup',
    title: 'Pro Setup (Single Signal)',
    price: '$2,450',
    description: 'Advanced single signal setup with AI agents, qualification workflows, and ongoing support.',
    features: [
      'Capture data using multiple criteria definitions',
      'Workflow to qualify & grade leads',
      'Further enrichment of prospects',
      'Push to Instantly sequencer',
      'Tailored copy & sequence strategy',
      'AI agents handling lead responses',
      '1 month of support to fine-tune results',
      'Optional future Slack support add-on'
    ],
    ctaText: 'Get Pro Setup',
    ctaLink: '#book-call',
    popular: true
  }
];

export default function EvergreenCampaignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="relative overflow-hidden">
        <Navigation />

      <ServiceHero
        badge="Signal Campaigns"
        title="Capture Every Signal &"
        gradientText="Convert to Revenue"
        subtitle="Turn website visitors, job posts, LinkedIn activity & events into reliable leads"
        description="Capture signals from your website visitors, jobs posted that you help with, LinkedIn group members, events and post interactions. We convert each of these into reliable signals that drive consistent outbound results."
        highlights={[
          'Multi-Signal Capture',
          'AI-Powered Workflows',
          'Automated Outreach'
        ]}
        ctaText="Setup Signal Campaigns"
        ctaLink="#book-call"
      />

      <PackageCards
        packages={packages}
        title="Signal Campaign Setup"
        subtitle="From basic automation to advanced AI-powered workflows—choose your level"
      />

      <CalendlyEmbed
        url="https://calendly.com/bleedai/evergreen-signal-campaign?embed_type=Inline&text_color=000000&primary_color=b1130f&month=2026-02"
        title="Book Your Signal Campaign Setup"
        subtitle="Schedule a call to set up your automated signal campaigns"
        benefits={[
          "Identify the best signals for your business",
          "Discuss signal sources (website, LinkedIn, jobs, events)",
          "Review workflow automation and AI agent setup",
          "Understand lead qualification and grading",
          "Plan integration with your existing tools",
          "Get timeline and support details explained"
        ]}
      />

      <ServiceCta
        title="Never Miss Another Signal"
        description="Automatically capture and convert signals from your website, LinkedIn, job boards, and events into qualified leads. Set it up once, run it forever."
        ctaText="Setup Your Signal Campaigns"
        ctaLink="#book-call"
        trustIndicators={[
          'Multi-Source Signals',
          'AI Lead Handling',
          'Ongoing Support'
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
