import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

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
    // /privacy-policy/ and /terms/ intentionally excluded — pages are set to noindex.
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
