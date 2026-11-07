import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `The terms that apply when you use the ${site.legalName} website or request a table through it.`,
  alternates: { canonical: "/legal/terms" },
};

const PROSE = {
  heading: "mt-10 font-display text-2xl font-semibold text-espresso",
  paragraph: "mt-3 text-sm leading-relaxed text-clay",
  list: "mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-clay",
};

export default function TermsPage() {
  return (
    <article>
      <p className="text-caramel text-[10px] font-semibold tracking-[0.28em] uppercase">Legal</p>
      <h1 className="font-display text-espresso mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
        Terms of use
      </h1>
      <p className="text-clay/70 mt-3 text-xs tracking-[0.14em] uppercase">
        Last updated {site.legal.termsUpdated}
      </p>

      {!site.legal.reviewedByCounsel ? (
        <p className="border-caramel/30 bg-caramel/5 text-clay mt-8 rounded-lg border px-4 py-3 text-xs leading-relaxed">
          <strong className="text-espresso font-semibold">Template note:</strong> these terms are
          starting-point boilerplate, not legal advice. Adjust them to your jurisdiction and
          business — especially the governing-law section — and have them reviewed by a qualified
          professional before publishing.
        </p>
      ) : null}

      <p className={PROSE.paragraph}>
        These terms apply when you use this website and when you send us a reservation request. By
        using the site you agree to them. If you do not agree, please do not use the site.
      </p>

      <h2 className={PROSE.heading}>Using this website</h2>
      <ul className={PROSE.list}>
        <li>You may browse, print and share pages for your own personal use.</li>
        <li>
          You must not attempt to disrupt the site, submit false or automated reservation requests,
          or use the site in a way that breaks the law.
        </li>
        <li>
          You must not copy, scrape or republish substantial parts of the site without our written
          permission.
        </li>
      </ul>

      <h2 className={PROSE.heading}>Reservations</h2>
      <p className={PROSE.paragraph}>
        A reservation request submitted through this site is a request, not a confirmed booking. We
        confirm bookings by email or phone. Tables are held for 15 minutes past the reserved time,
        after which we may release them.
      </p>
      <p className={PROSE.paragraph}>
        Please tell us about cancellations as early as you can so we can offer the table to someone
        else. Groups larger than six should call us directly rather than using the form.
      </p>

      <h2 className={PROSE.heading}>Menu, prices and availability</h2>
      <p className={PROSE.paragraph}>
        Menu items, prices and opening hours are shown for information and may change without
        notice. Seasonal items may be unavailable on the day. Prices shown do not include any taxes
        or service charges that may apply in venue.
      </p>

      <h2 className={PROSE.heading}>Allergies and dietary needs</h2>
      <p className={PROSE.paragraph}>
        Our kitchen handles nuts, dairy, gluten, eggs and sesame. We take reasonable care, but we
        cannot guarantee an allergen-free environment. Please tell our team about any allergy before
        you order, and note that information sent through this form may not reach the kitchen before
        your visit.
      </p>

      <h2 className={PROSE.heading}>Intellectual property</h2>
      <p className={PROSE.paragraph}>
        The {site.legalName} name, logo, photography and written content on this site are owned by
        us or used with permission, and are protected by applicable intellectual property law.
      </p>

      <h2 className={PROSE.heading}>Third-party links</h2>
      <p className={PROSE.paragraph}>
        This site may link to third-party services such as maps or social networks. We do not
        control those services and are not responsible for their content or privacy practices.
      </p>

      <h2 className={PROSE.heading}>Limitation of liability</h2>
      <p className={PROSE.paragraph}>
        The site is provided “as is”. To the extent permitted by law, we are not liable for indirect
        or consequential loss arising from your use of the site, or from any inaccuracy in its
        content. Nothing in these terms limits liability that cannot lawfully be limited.
      </p>

      <h2 className={PROSE.heading}>Governing law</h2>
      <p className={PROSE.paragraph}>
        These terms are governed by the laws of [your jurisdiction], and any dispute will be subject
        to the exclusive jurisdiction of its courts.
      </p>

      <h2 className={PROSE.heading}>Changes</h2>
      <p className={PROSE.paragraph}>
        We may update these terms from time to time. The date at the top of the page shows when they
        last changed. Continuing to use the site after a change means you accept the updated terms.
      </p>

      <h2 className={PROSE.heading}>Contact</h2>
      <p className={PROSE.paragraph}>
        Questions about these terms? Email{" "}
        <a
          href={`mailto:${site.contact.email}`}
          className="text-espresso decoration-caramel/50 font-medium underline underline-offset-2"
        >
          {site.contact.email}
        </a>
        .
      </p>

      <p className="border-line text-clay mt-12 border-t pt-6 text-sm">
        <Link
          href="/legal/privacy"
          className="text-espresso decoration-caramel/50 font-medium underline underline-offset-2"
        >
          Read our privacy policy
        </Link>
      </p>
    </article>
  );
}
