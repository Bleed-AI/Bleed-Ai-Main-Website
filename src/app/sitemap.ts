import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SLOTS } from '@/lib/slots';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bleedai.com';

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/book-call/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Other free tools temporarily de-listed from the sitemap while being reworked/tested. Restore when re-added to nav.
    // /free-tools/cold-email-spam-checker, /free-tools/b2b-icp-builder, /free-tools/cold-email-domain-calculator, /free-tools/cold-email-generator
    {
      url: `${baseUrl}/free-tools/cold-email-roi-calculator/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { url: `${baseUrl}/pricing/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/shortlisted/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/linkedin-authority/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/outbound/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/inbound-engine/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/trial/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/services/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    // The service pages were missing from the sitemap (found 2026-11-11, AI search content plan); AI crawlers read it.
    ...SLOTS.map((s) => ({ url: `${baseUrl}/services/${s.id}/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 })),
    // /privacy-policy/ and /terms/ intentionally excluded, pages are set to noindex.
  ];

  const postEntries: MetadataRoute.Sitemap = getAllPosts()
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [...staticEntries, ...postEntries];
}
