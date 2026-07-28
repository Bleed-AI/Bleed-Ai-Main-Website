import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata = genMeta({
  title: "Privacy Policy | Bleed AI",
  description:
    "How Bleed AI collects, uses, and protects personal information across bleedai.com — analytics, marketing, contact forms, and your rights under GDPR and CCPA.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "data protection", "GDPR", "CCPA", "cookies"],
});

const LAST_UPDATED = "July 28, 2026";
const CONTACT_EMAIL = "contact@bleedai.com";

export default function PrivacyPolicyPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />

      <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-white/85">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
              Legal
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm text-white/50">
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div className="prose-legal space-y-8 text-[15px] leading-[1.75]">
            <p>
              This Privacy Policy explains how <strong>Bleed AI</strong>{" "}
              (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects,
              uses, discloses, and protects information when you visit{" "}
              <a href="https://bleedai.com/" className="text-[#ff6b67] hover:underline">
                bleedai.com
              </a>{" "}
              (the &quot;Site&quot;), engage with our marketing, or become a
              client of our services (together, the &quot;Services&quot;).
            </p>

            <p>
              By using the Site or Services, you agree to the practices
              described here. If you do not agree, please do not use the Site.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              1. Who we are
            </h2>
            <p>
              Bleed AI is a business-to-business outbound growth agency that
              installs cold-to-sold revenue systems for B2B firms. For the
              purposes of applicable data-protection laws (including the EU/UK
              General Data Protection Regulation and the California Consumer
              Privacy Act), Bleed AI is the &quot;data controller&quot; of the
              personal information collected through this Site.
            </p>
            <p>
              You can reach us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#ff6b67] hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              2. Information we collect
            </h2>
            <p>We collect the following categories of information:</p>

            <h3 className="font-display text-lg font-semibold text-white mt-6 mb-2">
              a) Information you give us
            </h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Contact information you submit through forms, calendars, or
                email (e.g. name, work email, phone, company, role, message
                content).
              </li>
              <li>
                Information you submit when booking a strategy call or joining
                an outbound sprint (e.g. website URL, ICP, funnel details,
                revenue goals).
              </li>
              <li>
                Email address and any details you provide when subscribing to
                our newsletter or downloading a resource.
              </li>
              <li>
                Payment and billing details you provide when engaging our paid
                services (processed by our payment processors — we do not store
                full card numbers on our servers).
              </li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-white mt-6 mb-2">
              b) Information collected automatically
            </h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Usage &amp; device data:</strong> IP address, approximate
                location (derived from IP), browser and device type, operating
                system, referring URL, pages viewed, time on page, and
                interactions with the Site.
              </li>
              <li>
                <strong>Cookies and similar technologies:</strong> We and our
                third-party providers use cookies, local storage, and pixel
                tags. See Section 6.
              </li>
              <li>
                <strong>Visitor identification (RB2B):</strong> We use RB2B to
                identify certain U.S.-based business visitors and enrich them
                with publicly available professional information (e.g. name,
                job title, employer) to inform our outbound outreach. If you
                are located in the EU/UK, RB2B does not identify you.
              </li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-white mt-6 mb-2">
              c) Information from third parties
            </h3>
            <p>
              We may receive information about you from data-enrichment
              providers, analytics services, business social networks
              (e.g. LinkedIn), and partners who refer you to us. We use this
              information consistent with this Policy and applicable law.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              3. How we use your information
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>To provide, operate, and improve the Services.</li>
              <li>
                To respond to inquiries, schedule calls, and deliver
                consultations, campaigns, or reporting you request.
              </li>
              <li>
                To send you transactional messages (e.g. call confirmations,
                invoices, campaign updates).
              </li>
              <li>
                To send you marketing communications about our services, case
                studies, and events, where permitted by law. You can opt out at
                any time (see Section 8).
              </li>
              <li>To perform analytics and understand how the Site is used.</li>
              <li>
                To personalize the Site experience and remember your
                preferences.
              </li>
              <li>
                To detect, investigate, and prevent fraud, abuse, or unlawful
                activity, and to enforce our{" "}
                <a href="/terms/" className="text-[#ff6b67] hover:underline">
                  Terms &amp; Conditions
                </a>
                .
              </li>
              <li>
                To comply with legal obligations and to establish, exercise, or
                defend legal claims.
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              4. Legal bases (EU/UK visitors)
            </h2>
            <p>If GDPR or UK GDPR applies to you, we rely on the following:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Contract:</strong> to provide services you have engaged
                us for.
              </li>
              <li>
                <strong>Legitimate interests:</strong> to run and grow our
                business, secure the Site, understand our audience, and market
                our services to businesses in a proportionate way. We balance
                these interests against your rights.
              </li>
              <li>
                <strong>Consent:</strong> where required (e.g. non-essential
                cookies, certain email marketing). You can withdraw consent at
                any time.
              </li>
              <li>
                <strong>Legal obligation:</strong> to comply with applicable
                laws.
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              5. Who we share information with
            </h2>
            <p>
              We do not sell personal information for money. We share
              information only as described below:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Service providers &amp; sub-processors</strong> who help
                us run our business, including:
                <ul className="list-[circle] pl-6 mt-1.5 space-y-1">
                  <li>Hosting &amp; deployment (e.g. Vercel).</li>
                  <li>Analytics (e.g. Google Analytics).</li>
                  <li>Visitor identification (RB2B).</li>
                  <li>
                    Email, CRM, calendaring, and campaign platforms
                    (e.g. Google Workspace, Calendly-type tools, cold-email
                    infrastructure providers).
                  </li>
                  <li>Payment processors.</li>
                </ul>
              </li>
              <li>
                <strong>Professional advisors</strong> such as lawyers,
                accountants, and auditors, under obligations of confidence.
              </li>
              <li>
                <strong>Authorities</strong> when required by law, subpoena,
                court order, or other legal process, or to protect our rights,
                property, or safety.
              </li>
              <li>
                <strong>Corporate transactions:</strong> if we undergo a
                merger, acquisition, financing, or sale of assets, personal
                information may be disclosed as part of that transaction,
                subject to standard confidentiality safeguards.
              </li>
            </ul>
            <p>
              Under the CCPA/CPRA, our use of certain analytics and advertising
              cookies may be considered a &quot;sale&quot; or &quot;sharing&quot;
              of personal information. See Section 8 for how to opt out.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              6. Cookies &amp; similar technologies
            </h2>
            <p>
              Cookies are small text files stored on your device. We use them
              to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Keep the Site secure and functional (strictly necessary).</li>
              <li>
                Remember your preferences (e.g. theme selection stored in local
                storage).
              </li>
              <li>Measure Site performance and audience (analytics).</li>
              <li>Identify business visitors (RB2B, U.S. only).</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Blocking
              some cookies may break parts of the Site. Where legally required,
              we will present a consent banner before setting non-essential
              cookies.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              7. International transfers
            </h2>
            <p>
              We are a global business and use service providers located in
              multiple countries. If you are in the EU, UK, or Switzerland,
              your personal information may be transferred to countries whose
              data-protection laws differ from yours. Where required, we use
              lawful transfer mechanisms such as the EU Standard Contractual
              Clauses and, where applicable, the UK addendum.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              8. Your rights &amp; choices
            </h2>
            <p>Depending on where you live, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Access the personal information we hold about you.</li>
              <li>Correct or update inaccurate or incomplete information.</li>
              <li>
                Delete your personal information (subject to certain exceptions).
              </li>
              <li>Restrict or object to certain processing.</li>
              <li>Port your data to another provider.</li>
              <li>Withdraw consent, where processing is based on consent.</li>
              <li>
                Opt out of marketing emails (use the unsubscribe link in any
                message or email us).
              </li>
              <li>
                Opt out of the &quot;sale&quot; or &quot;sharing&quot; of your
                personal information (California residents).
              </li>
              <li>
                Not be discriminated against for exercising your privacy rights.
              </li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#ff6b67] hover:underline">
                {CONTACT_EMAIL}
              </a>
              . We will respond within the time frame required by applicable
              law and may need to verify your identity before acting on your
              request.
            </p>
            <p>
              You also have the right to lodge a complaint with your local
              data-protection authority.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              9. Data retention
            </h2>
            <p>
              We keep personal information only for as long as necessary to
              fulfill the purposes described in this Policy, comply with legal
              obligations (e.g. tax, accounting), resolve disputes, and enforce
              our agreements. When information is no longer needed, we delete
              or anonymize it.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              10. Security
            </h2>
            <p>
              We use administrative, technical, and physical safeguards
              designed to protect personal information. No method of
              transmission or storage is 100% secure, and we cannot guarantee
              absolute security. Please protect your own account credentials
              and notify us immediately at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#ff6b67] hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              if you suspect unauthorized use.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              11. Children
            </h2>
            <p>
              The Site and Services are intended for business users aged 18 and
              over. We do not knowingly collect personal information from
              children. If you believe a child has provided us with personal
              information, please contact us and we will delete it.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              12. Third-party links
            </h2>
            <p>
              The Site may contain links to third-party sites (e.g. YouTube
              videos, Calendly-style scheduling pages, our infrastructure
              subdomain, LinkedIn, Clutch). We are not responsible for the
              privacy practices of those sites. Please review their own privacy
              policies.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              13. Changes to this Policy
            </h2>
            <p>
              We may update this Policy from time to time. When we do, we will
              revise the &quot;Last updated&quot; date at the top. Material
              changes will be highlighted on the Site or communicated by email
              where appropriate. Your continued use of the Site after changes
              become effective constitutes acceptance of the updated Policy.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              14. Contact us
            </h2>
            <p>
              For any questions, concerns, or requests regarding this Privacy
              Policy or your personal information, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#ff6b67] hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
