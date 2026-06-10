import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  banner: string;
  date: string;
  author: string;
  faqs?: FaqItem[];
  noindex?: boolean;
}

export interface PostSummary extends PostFrontmatter {
  slug: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Post extends PostSummary {
  html: string;
  toc: TocItem[];
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function readPostFile(slug: string): { data: PostFrontmatter; content: string } {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);
  return { data: parsed.data as PostFrontmatter, content: parsed.content };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getAllPosts(): PostSummary[] {
  return getAllPostSlugs()
    .map((slug) => {
      const { data } = readPostFile(slug);
      return { ...data, slug };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelatedPosts(currentSlug: string, limit = 3): PostSummary[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit);
}

function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split('\n');
  const toc: TocItem[] = [];
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      toc.push({ id: slugify(text), text, level });
    }
  }
  return toc;
}

export async function getPost(slug: string): Promise<Post> {
  const { data, content } = readPostFile(slug);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);
  return {
    ...data,
    slug,
    html: String(file),
    toc: extractToc(content),
  };
}
