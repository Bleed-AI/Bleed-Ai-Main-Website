import type { Metadata } from 'next';
import { generateMetadata, generateServiceSchema } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Infrastructure Setup | Complete Outbound Deployment in 48 Hours",
  description: "Done-for-you outbound infrastructure. Domains, emails, deliverability, CRM integrations—ready in 48 hours. Starter to Enterprise packages.",
  path: "/services/infrastructure-setup",
  keywords: [
    "outbound infrastructure",
    "email infrastructure",
    "domain setup",
    "deliverability optimization",
    "CRM integration",
    "email warming",
    "infrastructure deployment"
  ],
});

import Navigation from '@/components/Navigation';

const serviceSchema = generateServiceSchema({
  name: "Infrastructure Setup",
  description: "Complete system deployment in 48 hours - turnkey outbound infrastructure",
  url: "https://bleedai.com/services/infrastructure-setup",
  price: "2500",
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
    id: 'full-dfy-infrastructure',
    title: 'Full DFY Infrastructure Setup',
    price: '$400',
    description: 'Build in Instantly.ai with Zapmail Domains & Inboxes',
    features: [
      'Complete Instantly.ai setup',
      'Branded domains and inboxes',
      'DKIM/SPF/DMARC configuration',
      'Profile names, photos & signatures',
      'Account warm-up',
      'SOPs for running the system',
      'Bonus: 10 Million Free tech leads'
    ],
    ctaText: 'Get Started',
    ctaLink: '#book-call'
  }
];

export default function InfrastructureSetupPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="relative overflow-hidden">
        <Navigation />

      <ServiceHero
        badge="Turnkey Solution"
        title="Complete System Deployment"
        gradientText="in 48 Hours"
        description="Skip months of technical setup. We'll build your entire outbound infrastructure from scratch—domains, emails, deliverability, integrations, and monitoring—all ready to send."
        highlights={[
          'Done-For-You Setup',
          'Enterprise-Grade',
          'Launch in 2 Days'
        ]}
        ctaText="Get Your Infrastructure Built"
        ctaLink="#book-call"
      />

      <PackageCards
        packages={packages}
        title="Infrastructure Packages"
        subtitle="Choose the setup that matches your scale and ambition"
      />

      <CalendlyEmbed
        url="https://calendly.com/bleedai/full-outbound-infra-setup?embed_type=Inline&text_color=000000&primary_color=b1130f&month=2026-02"
        title="Book Your Infrastructure Setup"
        subtitle="Schedule a call to discuss your infrastructure requirements"
        benefits={[
          "Assess your current infrastructure needs",
          "Discuss domain and email account requirements",
          "Understand your timelines"
        ]}
      />

      <ServiceCta
        title="Stop Wrestling with Technical Setup"
        description="Let our infrastructure experts handle the complex work so you can focus on sending campaigns that convert."
        ctaText="Deploy Your Infrastructure"
        ctaLink="#book-call"
        trustIndicators={[
          '500+ Infrastructures Deployed',
          '99.9% Uptime Guarantee',
          'Money-Back Promise'
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
