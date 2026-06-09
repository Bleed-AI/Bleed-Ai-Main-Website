"use client";

import { useState } from 'react';

// Paste your Google Apps Script Web App URL here once deployed.
// Looks like: https://script.google.com/macros/s/AKfycb.../exec
const SUBSCRIBE_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycby_WJm2RihnWgt8dHP3YQrO3nBvlFoEbfaq2eyzbfZBFUgkU5VGiOvvDMARr-wIkYba/exec';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Props {
  blogTitle?: string;
}

export default function EmailSubscribe({ blogTitle }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'submitting') return;
    setStatus('submitting');

    try {
      if (SUBSCRIBE_WEBHOOK_URL) {
        await fetch(SUBSCRIBE_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            email,
            blogTitle: blogTitle || '',
            sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
          }),
        });
      } else {
        // No webhook configured yet — silently no-op so the UI still feels responsive.
        await new Promise((r) => setTimeout(r, 400));
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#B1130F]/10 blur-[120px] rounded-full" />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#B1130F]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#B1130F]/5 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(177,19,15,0.1)] border border-[rgba(177,19,15,0.2)] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B1130F] animate-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase text-[var(--text-secondary)]">
                Newsletter
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-3 tracking-tight">
              Get the next post in your inbox
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto leading-relaxed">
              Hands-on breakdowns of AI outbound campaigns, sent occasionally. No fluff, no spam.
            </p>

            {status === 'success' ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 font-medium">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Thanks — you&apos;re on the list.
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto"
              >
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 px-5 py-3 rounded-full bg-[var(--bg-primary)] border border-[var(--border-strong)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#B1130F] transition-colors duration-200"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B1130F] text-white font-semibold text-sm rounded-full overflow-hidden transition-all duration-300 btn-glow disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
                  </span>
                  {status !== 'submitting' && (
                    <svg
                      className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="text-sm text-red-500 mt-4">
                Something went wrong. Try again in a moment.
              </p>
            )}

            <p className="text-xs text-[var(--text-muted)] mt-4">
              We&apos;ll never share your email. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
