// RSS 2.0 feed of every indexable blog post, full content, canonical links.
// Served at https://bleedai.com/blog/rss.xml (static export: written to out/blog/rss.xml at build).
// Why: syndication (LinkedIn Article, Medium import, any RSS tool) reads it; built 2026-11-18,
// campaign-master Notion 41addcc6 / brand-2026-11 DECISIONS C10.
import { getAllPosts, getPost } from '@/lib/blog';

export const dynamic = 'force-static';

const SITE = 'https://bleedai.com';

function esc(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Relative src/href ("/images/x.png", "/book-call") become absolute so readers outside the site work.
function absolutize(html: string): string {
  return html.replace(/\b(href|src)="\/(?!\/)/g, `$1="${SITE}/`);
}

// "]]>" inside content would end the CDATA block early.
function cdata(s: string): string {
  return `<![CDATA[${s.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

export async function GET() {
  // Newest first; same-day ties broken by slug (descending) so the order never changes between builds.
  const posts = getAllPosts()
    .filter((p) => !p.noindex)
    .sort((a, b) => (a.date === b.date ? b.slug.localeCompare(a.slug) : a.date < b.date ? 1 : -1));

  const items = await Promise.all(
    posts.map(async (summary) => {
      const post = await getPost(summary.slug);
      const url = `${SITE}/blog/${post.slug}/`;
      const banner = post.banner ? `<p><img src="${SITE}${post.banner}" alt="${esc(post.title)}" /></p>` : '';
      const faqs = (post.faqs || []).length
        ? `<h2>Frequently asked questions</h2>` +
          (post.faqs || []).map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('')
        : '';
      const canonicalNote = `<p>This article first appeared on <a href="${url}">bleedai.com</a>.</p>`;
      const content = absolutize(banner + post.html + faqs + canonicalNote);
      return [
        '<item>',
        `<title>${esc(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        `<dc:creator>${esc(post.author || 'BleedAI')}</dc:creator>`,
        `<description>${esc(post.excerpt || '')}</description>`,
        `<content:encoded>${cdata(content)}</content:encoded>`,
        '</item>',
      ].join('');
    })
  );

  const lastBuild = posts[0] ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString() : new Date().toUTCString();
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">' +
    '<channel>' +
    '<title>BleedAI Blog</title>' +
    `<link>${SITE}/blog/</link>` +
    `<atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />` +
    '<description>How B2B companies get found and booked: cold email, AI search, LinkedIn and websites, from the BleedAI team.</description>' +
    '<language>en-us</language>' +
    `<lastBuildDate>${lastBuild}</lastBuildDate>` +
    items.join('') +
    '</channel></rss>\n';

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
