import type { Metadata } from 'next';
import { generateMetadata as buildMeta } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';
import Navigation from '@/components/Navigation';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export const metadata: Metadata = buildMeta({
  title: 'Blog | Insights on AI Outbound & B2B Growth',
  description:
    'Practical breakdowns of AI-powered outbound, B2B prospecting strategy, and the campaigns moving pipeline in 2026.',
  path: '/blog',
  keywords: ['AI outbound blog', 'B2B prospecting', 'cold email strategy', 'sales automation'],
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="relative overflow-x-clip min-h-screen">
      <BackgroundOrbs />
      <Navigation />

      <section className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(177,19,15,0.1)] border border-[rgba(177,19,15,0.2)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B1130F]" />
            <span className="text-xs font-medium tracking-wider uppercase text-[var(--text-secondary)]">
              Blog
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-[var(--text-primary)] mb-5 tracking-tight">
            Insights on <span className="gradient-text">AI Outbound</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
            Practical breakdowns of what&apos;s working in B2B prospecting — straight from the campaigns we&apos;re running.
          </p>
        </div>
      </section>

      <section className="relative pb-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-24 text-[var(--text-muted)]">
              No posts yet. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="group relative flex flex-col rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] overflow-hidden transition-all duration-500 hover:border-[#B1130F]/50 hover:shadow-[0_0_40px_rgba(177,19,15,0.15)] hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-secondary)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.banner}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-elevated)]/40 to-transparent" />
                  </div>

                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                      <span>{post.author}</span>
                    </div>

                    <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-3 leading-tight group-hover:text-[#B1130F] transition-colors duration-300">
                      {post.title}
                    </h2>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-[#B1130F]">
                      Read article
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTopButton />
    </main>
  );
}
