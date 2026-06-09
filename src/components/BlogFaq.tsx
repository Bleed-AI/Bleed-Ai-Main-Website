"use client";

import { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

export default function BlogFaq({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-[var(--border-color)]">
      <div className="text-center mb-10">
        <div className="text-xs font-semibold tracking-wider uppercase text-[#B1130F] mb-2">
          FAQ
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-xl border bg-[var(--surface-elevated)] overflow-hidden transition-all duration-300 ${
                isOpen
                  ? 'border-[#B1130F]/40 shadow-[0_0_30px_rgba(177,19,15,0.1)]'
                  : 'border-[var(--border-color)] hover:border-[var(--border-strong)]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-[var(--text-primary)] text-base sm:text-lg leading-snug">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-45 text-[#B1130F]' : 'text-[var(--text-muted)]'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 sm:px-6 pb-5 text-[var(--text-secondary)] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
