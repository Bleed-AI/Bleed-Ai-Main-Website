import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
}

export function generateMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = '/images/og-image.jpg'
}: SEOProps): Metadata {
  const siteName = 'BleedAI';
  const baseUrl = 'https://bleedai.com'; // Update with your actual domain
  const fullUrl = `${baseUrl}${path}`;
  const fullTitle = path === '/' ? title : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'BleedAI' }],
    creator: 'BleedAI',
    publisher: 'BleedAI',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${baseUrl}${ogImage}`],
      creator: '@bleedai', // Update with your actual Twitter handle
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#B1130F',
};

// Structured Data for Organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BleedAI',
  description: 'AI-powered outbound marketing and lead generation that drives measurable results',
  url: 'https://bleedai.com',
  logo: 'https://bleedai.com/images/bleed-ai-logo.svg',
  sameAs: [
    'https://twitter.com/bleedai',
    'https://linkedin.com/company/bleedai',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    url: 'https://bleedai.com/book-call',
  },
};

// Structured Data for Services
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  price?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'BleedAI',
      url: 'https://bleedai.com',
    },
    url: service.url,
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'USD',
      },
    }),
  };
}
