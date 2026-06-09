import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as buildMeta } from '@/lib/seo';
import { getAllPostSlugs, getPost, getRelatedPosts } from '@/lib/blog';
import Navigation from '@/components/Navigation';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import Footer from '@/components/Footer';
import BlogToc from '@/components/BlogToc';
import BlogShareButtons from '@/components/BlogShareButtons';
import BlogFaq from '@/components/BlogFaq';
import InlineCta from '@/components/InlineCta';
import EmailSubscribe from '@/components/EmailSubscribe';
import RelatedPosts from '@/components/RelatedPosts';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return buildMeta({
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      path: `/blog/${slug}`,
      keywords: post.keywords,
      ogImage: post.banner,
    });
  } catch {
    return buildMeta({
      title: 'Post not found',
      description: 'This article could not be loaded.',
      path: `/blog/${slug}`,
    });
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Split rendered HTML into section chunks at each <h2 boundary so we can splice
// inline CTAs between sections without re-rendering the markdown.
function splitIntoSections(html: string): string[] {
  return html.split(/(?=<h2 )/);
}

const PROSE_CLASSES =
  'prose prose-lg dark:prose-invert max-w-none ' +
  'prose-headings:font-display prose-headings:tracking-tight ' +
  'prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-24 ' +
  'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-24 ' +
  'prose-p:leading-relaxed prose-p:text-[var(--text-secondary)] ' +
  'prose-strong:text-[var(--text-primary)] ' +
  'prose-a:text-[#B1130F] prose-a:no-underline hover:prose-a:underline ' +
  'prose-li:text-[var(--text-secondary)] ' +
  'prose-code:text-[#B1130F] prose-code:before:content-none prose-code:after:content-none ' +
  'prose-blockquote:border-l-[#B1130F] prose-blockquote:text-[var(--text-secondary)] ' +
  'prose-img:rounded-xl prose-img:border prose-img:border-[var(--border-color)]';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = getAllPostSlugs();
  if (!slugs.includes(slug)) notFound();

  const post = await getPost(slug);
  const relatedPosts = getRelatedPosts(slug, 3);
  const sections = splitIntoSections(post.html);
  // Insert an inline CTA after every 3rd section that starts with an <h2.
  const CTA_EVERY_N_SECTIONS = 3;

  const canonicalUrl = `https://bleedai.com/blog/${slug}/`;
  const absoluteBanner = post.banner.startsWith('http')
    ? post.banner
    : `https://bleedai.com${post.banner}`;

  // Article structured data — tells Google this is a blog post for rich results
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: absoluteBanner,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BleedAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bleedai.com/images/bleed-ai-logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  // FAQ structured data for rich results
  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <main className="relative overflow-x-clip min-h-screen">
        <BackgroundOrbs />
        <Navigation />
        <BlogShareButtons title={post.title} slug={slug} />

        {/* Header */}
        <section className="relative pt-32 pb-12 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <a
              href="/blog/"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[#B1130F] transition-colors duration-300 mb-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to blog
            </a>

            <div className="flex items-center justify-center gap-3 text-xs text-[var(--text-muted)] uppercase tracking-wider mb-5">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
              <span>{post.author}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight tracking-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Banner */}
        <section className="relative px-6 lg:px-8 mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--border-strong)] shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.banner} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Content + TOC */}
        <section className="relative pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
              {/* Sticky TOC */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <BlogToc items={post.toc} />
                </div>
              </aside>

              {/* Mobile TOC (collapsible) */}
              {post.toc.length > 0 && (
                <details className="lg:hidden mb-8 rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] overflow-hidden">
                  <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between text-sm font-semibold text-[var(--text-primary)]">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#B1130F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      On this page
                    </span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-1">
                    <BlogToc items={post.toc} />
                  </div>
                </details>
              )}

              {/* Article */}
              <article className="mx-auto w-full max-w-2xl">
                {sections.map((chunk, i) => {
                  // Insert an inline CTA after the (i+1)th chunk if it's a multiple of N
                  // and not the very last chunk (avoid duplicate end-of-article CTA collision).
                  const showInlineCta =
                    i >= CTA_EVERY_N_SECTIONS - 1 &&
                    (i + 1) % CTA_EVERY_N_SECTIONS === 0 &&
                    i < sections.length - 1;
                  return (
                    <div key={i}>
                      <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: chunk }} />
                      {showInlineCta && <InlineCta />}
                    </div>
                  );
                })}

                {/* End-of-article CTA */}
                <div className="mt-16 pt-12 border-t border-[var(--border-color)] text-center">
                  <p className="text-[var(--text-secondary)] mb-6 text-base">
                    Ready to put this into practice?
                  </p>
                  <a
                    href="https://calculator.bleedai.com/trials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#B1130F] text-white font-semibold text-base rounded-full overflow-hidden transition-all duration-500 btn-glow"
                  >
                    <span className="relative z-10">Start My Trial Campaign</span>
                    <svg
                      className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* FAQ */}
                {post.faqs && post.faqs.length > 0 && <BlogFaq items={post.faqs} />}
              </article>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />

        {/* Email Subscribe — before footer */}
        <EmailSubscribe blogTitle={post.title} />

        <Footer />
        <ScrollToTopButton />
      </main>
    </>
  );
}
