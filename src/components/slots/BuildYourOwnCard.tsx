/** The last card in every plan grid: open the builder and pick any services (2026-10-30). */
export default function BuildYourOwnCard({ href = "/pricing/#builder" }: { href?: string }) {
  return (
    <a
      href={href}
      className="group flex h-full min-h-[220px] flex-col justify-between rounded-2xl border border-dashed border-[#2a2a3e] p-6 transition-colors hover:border-[#B1130F]/60 sm:p-7"
    >
      <div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2a2a3e] text-2xl text-[#ff6b67] transition-transform group-hover:rotate-90">
          +
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-white">Build your own</h3>
        <p className="mt-1.5 text-[14px] leading-snug text-[#9099b8]">
          Pick any services from the full menu. Mix LinkedIn, your website and outbound in one plan, and swap any service any month.
        </p>
      </div>
      <span className="mt-6 block rounded-full border border-[#2a2a3e] px-5 py-3 text-center text-[14px] font-semibold text-white transition-colors group-hover:border-[#B1130F]/60">Open the builder &rarr;</span>
    </a>
  );
}
