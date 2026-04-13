import type { Metadata } from 'next';
import { generateMetadata, generateServiceSchema } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Consultation & System Audit | Expert Outbound Analysis",
  description: "Expert outbound system analysis. $79 consultation or $400 full audit. Identify gaps, optimize deliverability, get actionable recommendations.",
  path: "/services/consultation",
  keywords: [
    "outbound consultation",
    "system audit",
    "email deliverability",
    "outbound strategy",
    "campaign audit",
    "expert analysis"
  ],
});

import Navigation from '@/components/Navigation';

const serviceSchema = generateServiceSchema({
  name: "Consultation & System Audit",
  description: "Expert analysis and strategic roadmap for your outbound system",
  url: "https://bleedai.com/services/consultation",
  price: "150",
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
    id: 'consultation-call',
    title: 'Consultation Call',
    price: '$79',
    priceSubtext: '30 minutes',
    description: 'Quick consultation to discuss your outbound strategy and get expert advice.',
    features: [
      '30-minute consultation call',
      'Quick system overview',
      'Identify key opportunities',
      'Expert recommendations',
      'Q&A session',
      'Next steps guidance'
    ],
    ctaText: 'Book Consultation',
    ctaLink: '#book-call'
  },
  {
    id: 'call-system-audit',
    title: 'Call + System Audit',
    price: '$400',
    description: 'Comprehensive review of your entire outbound system with detailed recommendations.',
    features: [
      '1-hour consultation call',
      'Review of your entire system',
      'Highlight all issues & gaps',
      'Detailed recommendations on fixes',
      '1 week of support',
      'Bonus templates included',
      'Action plan & next steps'
    ],
    ctaText: 'Book Full Audit',
    ctaLink: '#book-call',
    popular: true
  }
];

export default function ConsultationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="relative overflow-hidden">
        <Navigation />

      <ServiceHero
        badge="Expert Analysis"
        title="Get Expert Analysis &"
        gradientText="Strategic Roadmap"
        subtitle="for Your Outbound System"
        description="Uncover hidden opportunities and fix critical gaps in your outbound infrastructure with expert guidance from operators who've scaled 100+ campaigns."
        highlights={[
          'Expert Operators',
          'Actionable Insights',
          'Custom Strategy'
        ]}
        ctaText="Book Your Audit"
        ctaLink="#book-call"
      />

      <PackageCards
        packages={packages}
        title="Choose Your Audit Level"
        subtitle="Get the insights you need to scale your outbound effectively"
      />

      <CalendlyEmbed
        url="https://calendly.com/bleedai/consultation-call-and-system-audit?embed_type=Inline&text_color=000000&primary_color=b1130f&month=2026-02"
        title="Book Your Consultation Call"
        subtitle="Schedule your expert consultation and system audit"
        benefits={[
          "Deep dive into your current outbound setup",
          "Identify critical gaps and quick wins",
          "Get actionable recommendations from experts",
          "Review deliverability and infrastructure health",
          "Discuss scaling strategies for your business",
          "Receive detailed action plan and next steps"
        ]}
      />

      <ServiceCta
        title="Stop Guessing. Start Scaling."
        description="Get clarity on what's working, what's broken, and exactly what to do next with expert analysis tailored to your business."
        ctaText="Schedule Your Audit"
        ctaLink="#book-call"
        trustIndicators={[
          '100+ Audits Completed',
          'Money-Back Guarantee',
          'Same-Week Availability'
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
