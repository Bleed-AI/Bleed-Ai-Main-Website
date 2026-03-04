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
    id: 'starter',
    title: 'Starter Infrastructure',
    price: '$2,500',
    description: 'Essential infrastructure for businesses starting their outbound journey.',
    features: [
      '5 email domains setup',
      '15 email accounts configured',
      'DNS & deliverability optimization',
      'Basic CRM integration',
      'Email warming protocol',
      'Campaign monitoring dashboard',
      '30-day technical support',
      '48-hour deployment'
    ],
    ctaText: 'Get Starter Setup',
    ctaLink: '#book-call'
  },
  {
    id: 'premium',
    title: 'Premium Infrastructure',
    price: '$5,000',
    description: 'Advanced setup for scaling teams with multi-channel capabilities.',
    features: [
      '10 email domains setup',
      '30 email accounts configured',
      'Advanced deliverability suite',
      'Multi-tool CRM integration',
      'LinkedIn automation setup',
      'Custom tracking & attribution',
      'A/B testing framework',
      'Dedicated onboarding specialist',
      '90-day priority support',
      '24-hour deployment'
    ],
    ctaText: 'Get Premium Setup',
    ctaLink: '#book-call',
    popular: true
  },
  {
    id: 'enterprise',
    title: 'Enterprise Infrastructure',
    price: 'Custom',
    priceSubtext: 'starting at $10,000',
    description: 'White-glove deployment for large teams with complex requirements.',
    features: [
      'Unlimited domains & accounts',
      'Custom infrastructure design',
      'Enterprise security & compliance',
      'Multi-region deployment',
      'Custom integrations & APIs',
      'Dedicated infrastructure team',
      'White-label options',
      'SLA guarantees',
      'Unlimited support',
      'Same-day deployment available'
    ],
    ctaText: 'Contact Sales',
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
          "Review integration needs (CRM, tools, etc.)",
          "Understand deployment timeline and process",
          "Get clarity on pricing and package options",
          "Plan for scalability and future growth"
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
