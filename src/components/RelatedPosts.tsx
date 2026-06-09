import type { PostSummary } from '@/lib/blog';

interface Props {
  posts: PostSummary[];
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="relative pt-20 pb-12 px-6 lg:px-8 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#B1130F] mb-2">
              Keep reading
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] tracking-tight">
              More from the blog
            </h2>
          </div>
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#B1130F] hover:gap-3 transition-all duration-300"
          >
            View all articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <div className="flex-1 flex flex-col p-5">
                <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                  <span>{post.author}</span>
                </div>

                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-2 leading-tight group-hover:text-[#B1130F] transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
