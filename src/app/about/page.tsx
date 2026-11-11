import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { generateMetadata as genMeta } from "@/lib/seo";

// About page (2026-11-11, Get cited part 2). One location story everywhere, Taha's ruling 2026-11-07:
// "we're a Wyoming-registered LLC and the team works remotely". AI assistants read this page too, so it
// states plain facts that match bleedai.com/pricing and the directory profiles.
export const metadata = genMeta({
  title: "About Bleed AI | A done-for-you marketing team for small B2B companies",
  description:
    "Who runs Bleed AI, what we do, how we price it and where we are: a Wyoming-registered LLC with a remote team, running cold email, LinkedIn, articles and AI search visibility for small B2B companies.",
  path: "/about",
  keywords: ["about bleed ai", "bleed ai team", "bleed ai founder", "taha anwar", "done for you marketing team"],
});

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bleed AI",
  alternateName: "BleedAI",
  url: "https://bleedai.com",
  logo: "https://bleedai.com/images/bleed-ai-logo.svg",
  foundingDate: "2021",
  founder: { "@type": "Person", name: "Taha Anwar", jobTitle: "Founder", sameAs: ["https://www.linkedin.com/in/taha-outbound"] },
  address: { "@type": "PostalAddress", addressRegion: "WY", addressCountry: "US" },
  description:
    "A done-for-you marketing team for small B2B companies. Cold email, LinkedIn content, articles and AI search visibility as monthly services you can swap, from $495 a month per service, month to month.",
  sameAs: ["https://www.linkedin.com/company/bleedai", "https://clutch.co/profile/bleed-ai"],
};

const facts: [string, string][] = [
  ["What we are", "A done-for-you marketing team for small B2B companies, about 2 to 50 staff."],
  ["What we run", "Cold email campaigns with replies handled, LinkedIn outreach and founder posts, articles, and AI search visibility (getting named by ChatGPT, Claude, Perplexity and Google AI)."],
  ["How we price it", "$495 a service a month, every 4th service free, month to month, minimum 2 services. A free trial comes first."],
  ["Where we are", "We're a Wyoming-registered LLC and the team works remotely."],
  ["Founded", "2021"],
];

const team: { name: string; role: string; line: string }[] = [
  { name: "Taha Anwar", role: "Founder", line: "Built AI systems and taught them to more than a million students before Bleed AI. Runs strategy, offers and every client's direction." },
  { name: "Sophiya Imran", role: "Commercial and client strategy", line: "Onboarding, campaign strategy, client reporting and the commercial side." },
  { name: "Shahwaiz", role: "Infrastructure", line: "Sending domains and mailboxes, deliverability, automations and the systems the campaigns run on." },
];

export default function AboutPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-white/85">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">About</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            A small team that runs your marketing for you
          </h1>
          <p className="text-[17px] leading-[1.75] mb-10">
            Bleed AI is a done-for-you marketing team for small B2B companies. We pick the services that fit where you are,
            run them every month, and swap out whatever is not moving for the next best one. AI agents do most of the
            production; a person on our team approves everything before it goes out.
          </p>

          <dl className="divide-y divide-white/10 border-y border-white/10 mb-14">
            {facts.map(([k, v]) => (
              <div key={k} className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-4">
                <dt className="text-sm uppercase tracking-[0.12em] text-white/45">{k}</dt>
                <dd className="text-[15px] leading-[1.7] text-white/85">{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="font-display text-2xl font-semibold text-white mb-6">The team</h2>
          <div className="grid gap-6 mb-14">
            {team.map((p, i) => (
              <div key={p.name} className="flex gap-5 items-start rounded-2xl border border-white/10 p-5">
                {i === 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/images/taha-anwar.png" alt="Taha Anwar, founder of Bleed AI" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white/70 font-semibold">
                    {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div>
                  <p className="text-white font-semibold">
                    {p.name} <span className="text-white/45 font-normal">· {p.role}</span>
                  </p>
                  <p className="text-[15px] leading-[1.7] text-white/75 mt-1">{p.line}</p>
                  {i === 0 && (
                    <a href="https://www.linkedin.com/in/taha-outbound" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ff6b67] hover:underline mt-2 inline-block">
                      Taha on LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-semibold text-white mb-4">Where to check us</h2>
          <ul className="space-y-2 text-[15px] leading-[1.7] mb-14">
            <li>Pricing, in full: <a className="text-[#ff6b67] hover:underline" href="/pricing/">bleedai.com/pricing</a></li>
            <li>Client results and video testimonials: <a className="text-[#ff6b67] hover:underline" href="/#results-section">bleedai.com, results</a></li>
            <li>Reviews: <a className="text-[#ff6b67] hover:underline" href="https://clutch.co/profile/bleed-ai" target="_blank" rel="noopener noreferrer">Clutch</a></li>
            <li>Company page: <a className="text-[#ff6b67] hover:underline" href="https://www.linkedin.com/company/bleedai" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>

          <a href="/trial/" className="inline-block rounded-full bg-[#ff6b67] text-white font-semibold px-6 py-3 hover:opacity-90">
            Start a free trial
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
