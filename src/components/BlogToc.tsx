"use client";

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/blog';

interface Props {
  items: TocItem[];
}

export default function BlogToc({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <div className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)] mb-4">
        On this page
      </div>
      <ul className="space-y-2 border-l border-[var(--border-color)]">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} style={{ paddingLeft: item.level === 3 ? '1.25rem' : '0.75rem' }}>
              <a
                href={`#${item.id}`}
                className={`block py-1 -ml-px border-l-2 pl-3 transition-colors duration-200 ${
                  isActive
                    ? 'border-[#B1130F] text-[#B1130F] font-medium'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
