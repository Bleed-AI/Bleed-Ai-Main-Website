import Reveal from "@/components/Reveal";

// Verbatim from the live site (PROOF-AND-CREDIBILITY.md section 3). Never paraphrase.
const QUOTES = [
  {
    q: "Over 100 opportunities in December alone. The targeting was precise - these were real companies that matched our ICP exactly.",
    who: "Martijn Versteeg",
    role: "Group Effort",
  },
  {
    q: "Great job on the emails boss. I have a letter of intent coming from a big player!",
    who: "John Speights",
    role: "JAMS Media",
  },
  {
    q: "From a 40% spam rate to near-zero. The technical understanding Taha brings to cold email is genuinely unlike any other agency I've used.",
    who: "Ahmad Jabbir",
    role: "TEDx Speaker and Coach",
  },
];

export default function OutboundQuotes() {
  return (
    <section className="px-5 pb-10 pt-2 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {QUOTES.map((x, i) => (
          <Reveal
            key={x.who + i}
            delay={i * 80}
            as="figure"
            className="flex flex-col rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#131320,#0b0b14)] p-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#B1130F" aria-hidden="true">
              <path d="M9.5 6C6.5 7.2 4.5 10 4.5 13.5V18h6v-6h-3c0-2 1-3.6 3-4.4L9.5 6zm9 0c-3 1.2-5 4-5 7.5V18h6v-6h-3c0-2 1-3.6 3-4.4L18.5 6z" />
            </svg>
            <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-[#dfe3f0]">&ldquo;{x.q}&rdquo;</blockquote>
            <figcaption className="mt-4 text-[13px]">
              <span className="font-semibold text-white">{x.who}</span>
              <span className="text-[#9099b8]">, {x.role}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
