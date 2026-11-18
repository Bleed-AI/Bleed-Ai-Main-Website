"use client";

/** The call to action on /trial (2026-10-30; since 2026-11-18 it sends the visitor to the self-serve start form in the
 *  client app, campaign-master services-2026-11 DECISIONS #17): they give their website, we read it, set up their own
 *  space, and their first pieces are waiting at first sign-in. */
const START = "https://app.bleedai.com/start";
export default function TrialInline() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[680px] rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-6 text-center sm:p-10">
        <h2 className="text-[26px] font-semibold leading-tight text-white sm:text-[30px]">Start your 2 free weeks</h2>
        <p className="mx-auto mt-3 max-w-[460px] text-[15px] leading-relaxed text-white/70">
          Two minutes from you: your name, work email and website. We read your site, set up your own space, and your first pieces are waiting when you sign in. No card.
        </p>
        <a href={START} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B1130F] px-7 py-3.5 text-[15px] font-semibold text-white hover:opacity-90">
          Start my trial
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <p className="mt-4 text-[13px] text-white/50">Prefer to talk first? <a href="/book-call/" className="underline">Book a call with Taha</a>.</p>
      </div>
    </section>
  );
}
