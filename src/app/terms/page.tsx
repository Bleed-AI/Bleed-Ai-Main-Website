import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata = genMeta({
  title: "Terms & Conditions | Bleed AI",
  description:
    "The terms that govern your use of bleedai.com and Bleed AI's outbound marketing services — eligibility, engagements, payments, IP, disclaimers, and liability.",
  path: "/terms",
  keywords: [
    "terms and conditions",
    "terms of service",
    "user agreement",
    "service agreement",
  ],
  noindex: true,
});

const LAST_UPDATED = "July 28, 2026";
const CONTACT_EMAIL = "contact@bleedai.com";

export default function TermsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-white/50">
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div className="prose-legal space-y-8 text-[15px] leading-[1.75]">
            <p>
              These Terms &amp; Conditions (&quot;Terms&quot;) govern your
              access to and use of the website{" "}
              <a href="https://bleedai.com/" className="text-[#ff6b67] hover:underline">
                bleedai.com
              </a>{" "}
              (the &quot;Site&quot;) and any marketing, consulting, or outbound
              services provided by <strong>Bleed AI</strong> (&quot;Bleed
              AI&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
              (together, the &quot;Services&quot;). By accessing the Site or
              engaging our Services, you agree to be bound by these Terms. If
              you do not agree, do not use the Site or Services.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              1. Eligibility
            </h2>
            <p>
              The Site and Services are intended for business use by individuals
              aged 18 or older who have the authority to bind their organization
              to a contract. By using the Site or engaging our Services, you
              represent and warrant that you meet these requirements.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              2. Our Services
            </h2>
            <p>
              Bleed AI provides business-to-business outbound growth services,
              which may include cold-email infrastructure setup, campaign
              strategy and execution, consultation, and other related
              deliverables described on the Site or in a signed proposal, order
              form, or statement of work (an &quot;SOW&quot;). In the event of
              a conflict between these Terms and an SOW, the SOW controls for
              that engagement.
            </p>
            <p>
              We may modify, suspend, or discontinue any part of the Site or
              Services at any time, with or without notice. We are not liable to
              you or any third party for any modification, suspension, or
              discontinuance.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              3. Engagements &amp; payments
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Scope &amp; fees:</strong> The scope, fees, and payment
                schedule for each paid engagement will be set out in your SOW,
                invoice, or the checkout flow you complete.
              </li>
              <li>
                <strong>Payment terms:</strong> Fees are payable in advance
                unless otherwise agreed in writing. All fees are exclusive of
                applicable taxes, which you are responsible for.
              </li>
              <li>
                <strong>Late payments:</strong> Overdue amounts may accrue
                interest at the lesser of 1.5% per month or the maximum rate
                allowed by law, and we may suspend Services until amounts are
                paid.
              </li>
              <li>
                <strong>Refunds:</strong> Refund policy is stated in the
                applicable SOW or checkout page. Unless expressly stated
                otherwise, fees are non-refundable once work has begun.
              </li>
              <li>
                <strong>Third-party costs:</strong> You are responsible for any
                third-party costs incurred at your request (e.g. list, data,
                inbox, or tooling costs), unless included in your SOW.
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              4. Your responsibilities
            </h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Provide accurate, complete, and timely information, materials,
                assets, approvals, and access needed for us to deliver the
                Services.
              </li>
              <li>
                Comply with all laws applicable to your business and to any
                outbound outreach we perform on your behalf, including
                anti-spam, telemarketing, data-protection, and consumer laws
                (e.g. CAN-SPAM, GDPR, CCPA/CPRA).
              </li>
              <li>
                Ensure you have all rights, consents, and lawful bases needed
                for any data, contact lists, brand assets, or content you
                provide to us.
              </li>
              <li>
                Not use the Site or Services to send spam, harass or defraud
                anyone, promote illegal goods or services, or infringe
                intellectual-property rights.
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              5. Prohibited use of the Site
            </h2>
            <p>You will not:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Reverse engineer, scrape, harvest, or systematically extract
                content from the Site.
              </li>
              <li>
                Interfere with, disrupt, or attempt to gain unauthorized access
                to the Site, our systems, or the accounts of other users.
              </li>
              <li>
                Use the Site or its content to build a competing product or
                service.
              </li>
              <li>
                Introduce viruses, worms, malware, or any other malicious code.
              </li>
              <li>
                Use the Site or Services in violation of any applicable law or
                regulation.
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              6. Intellectual property
            </h2>
            <p>
              The Site and all content, features, and functionality on it
              (including text, graphics, logos, images, videos, code, and case
              studies) are owned by Bleed AI or our licensors and are protected
              by copyright, trademark, and other intellectual-property laws.
              Except as expressly permitted by these Terms or an SOW:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                We grant you a limited, non-exclusive, non-transferable,
                revocable license to view the Site for lawful, non-commercial
                and legitimate business purposes.
              </li>
              <li>
                Deliverables prepared under an SOW are licensed or assigned to
                you on the terms stated in that SOW, contingent on full payment.
              </li>
              <li>
                We retain ownership of our pre-existing tools, frameworks,
                templates, playbooks, know-how, and any general improvements
                to them, and may re-use them for other clients.
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              7. Testimonials, case studies &amp; publicity
            </h2>
            <p>
              We may reference our engagement with your organization (name,
              logo, high-level results, and non-confidential summaries) in
              marketing materials, case studies, and on the Site, unless we
              agree otherwise in writing. On written request, we will remove
              such references from future materials.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              8. No guaranteed results
            </h2>
            <p>
              Outbound marketing outcomes depend on many factors outside our
              control, including your offer, market, ICP, sales process, and
              response capacity. While we bring proven playbooks and best
              effort to every engagement, we do not guarantee any specific
              number of meetings, leads, opportunities, pipeline, revenue, or
              return on investment. Any figures, results, or examples shown on
              the Site or in marketing materials are illustrative of past
              performance and are not a promise of future results.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              9. Third-party services &amp; links
            </h2>
            <p>
              The Site and Services may include or link to third-party
              services, tools, or content (e.g. video hosts, scheduling
              platforms, cold-email infrastructure providers, review sites).
              We are not responsible for those third parties, their terms, or
              their performance. Your use of any third-party service is at
              your own risk and subject to that third party&apos;s terms.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              10. Disclaimers
            </h2>
            <p>
              THE SITE AND SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
              IMPLIED WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, AND UNINTERRUPTED
              OR ERROR-FREE OPERATION.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              11. Limitation of liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL BLEED AI
              OR ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, PIPELINE,
              GOODWILL, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR IN
              CONNECTION WITH YOUR USE OF THE SITE OR SERVICES, EVEN IF ADVISED
              OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR
              RELATING TO THESE TERMS, THE SITE, OR THE SERVICES WILL NOT
              EXCEED THE AMOUNTS YOU HAVE ACTUALLY PAID TO US IN THE
              TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM,
              OR ONE HUNDRED U.S. DOLLARS (USD $100) IF YOU HAVE NOT PAID US
              ANY AMOUNTS, WHICHEVER IS GREATER.
            </p>
            <p>
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
              CERTAIN DAMAGES. IN THOSE JURISDICTIONS, OUR LIABILITY IS LIMITED
              TO THE FULLEST EXTENT PERMITTED BY LAW.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              12. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless Bleed AI, its
              officers, directors, employees, agents, and contractors from and
              against any claims, damages, liabilities, losses, and expenses
              (including reasonable legal fees) arising from or related to
              (a) your violation of these Terms; (b) your violation of any
              third-party right, including intellectual-property or privacy
              rights; (c) any content, data, or materials you provide to us;
              or (d) your use of the Site or Services in violation of law.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              13. Confidentiality
            </h2>
            <p>
              Each party may access non-public information of the other in
              connection with the Services. Each party will use the other
              party&apos;s confidential information only to perform its
              obligations under these Terms or an SOW, and will protect it
              using at least reasonable care. This section does not apply to
              information that is public, independently developed, rightfully
              received from a third party, or required to be disclosed by law.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              14. Term &amp; termination
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                These Terms apply while you use the Site or Services and
                continue for provisions that by their nature should survive
                (e.g. IP, disclaimers, limitations, indemnification, dispute
                resolution).
              </li>
              <li>
                We may suspend or terminate your access to the Site or
                Services at any time if you breach these Terms, misuse the
                Services, or if we are required to do so by law.
              </li>
              <li>
                Paid engagements may be terminated as set out in the applicable
                SOW. Fees earned or committed prior to termination remain
                payable.
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              15. Governing law &amp; disputes
            </h2>
            <p>
              These Terms are governed by the laws of the jurisdiction in which
              Bleed AI is registered, without regard to conflict-of-law
              principles. The parties will first attempt to resolve any dispute
              in good faith through informal discussion. If unresolved within
              thirty (30) days, the dispute will be submitted to the exclusive
              jurisdiction of the courts of that jurisdiction, unless
              applicable consumer-protection law grants you the right to bring
              a claim in your local courts.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              16. Changes to these Terms
            </h2>
            <p>
              We may update these Terms from time to time. When we do, we will
              revise the &quot;Last updated&quot; date above. If changes are
              material, we will make reasonable efforts to notify you. Your
              continued use of the Site or Services after changes take effect
              constitutes acceptance of the updated Terms.
            </p>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              17. Miscellaneous
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Entire agreement:</strong> These Terms, together with
                our{" "}
                <a href="/privacy-policy/" className="text-[#ff6b67] hover:underline">
                  Privacy Policy
                </a>{" "}
                and any applicable SOW, constitute the entire agreement between
                you and Bleed AI regarding the Site and Services.
              </li>
              <li>
                <strong>Severability:</strong> If any provision is held
                unenforceable, the remaining provisions will remain in full
                force.
              </li>
              <li>
                <strong>No waiver:</strong> Our failure to enforce any
                provision is not a waiver of our right to do so later.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign these Terms
                without our written consent; we may assign them to an affiliate
                or in connection with a merger, acquisition, or sale of assets.
              </li>
              <li>
                <strong>Force majeure:</strong> We are not liable for delays or
                failures caused by events beyond our reasonable control.
              </li>
              <li>
                <strong>Notices:</strong> Legal notices to us must be sent to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#ff6b67] hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-3">
              18. Contact us
            </h2>
            <p>
              Questions about these Terms? Contact us at{" "}
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
