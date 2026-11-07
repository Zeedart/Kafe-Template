import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.legalName} collects, uses and protects the information you share when you book a table or get in touch.`,
  alternates: { canonical: "/legal/privacy" },
};

const PROSE = {
  heading: "mt-10 font-display text-2xl font-semibold text-espresso",
  paragraph: "mt-3 text-sm leading-relaxed text-clay",
  list: "mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-clay",
};

export default function PrivacyPolicyPage() {
  return (
    <article>
      <p className="text-caramel text-[10px] font-semibold tracking-[0.28em] uppercase">Legal</p>
      <h1 className="font-display text-espresso mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
        Privacy policy
      </h1>
      <p className="text-clay/70 mt-3 text-xs tracking-[0.14em] uppercase">
        Last updated {site.legal.privacyUpdated}
      </p>

      {!site.legal.reviewedByCounsel ? (
        <p className="border-caramel/30 bg-caramel/5 text-clay mt-8 rounded-lg border px-4 py-3 text-xs leading-relaxed">
          <strong className="text-espresso font-semibold">Template note:</strong> this policy is
          starting-point boilerplate, not legal advice. Replace the placeholders, confirm it matches
          how your site actually handles data, and have it reviewed by a qualified professional
          before you publish.
        </p>
      ) : null}

      <p className={PROSE.paragraph}>
        This policy explains what information {site.legalName} (“we”, “us”) collects through this
        website, why we collect it, and the choices you have. It applies to this site only — not to
        third-party sites we link to.
      </p>

      <h2 className={PROSE.heading}>Information we collect</h2>
      <p className={PROSE.paragraph}>
        We only collect what you choose to give us. When you submit a reservation request we
        receive:
      </p>
      <ul className={PROSE.list}>
        <li>Your name and email address</li>
        <li>Your phone number, if you provide one</li>
        <li>The date, time and party size you requested</li>
        <li>Any notes you add (for example allergies or accessibility needs)</li>
        <li>A record of the consent you gave when submitting the form</li>
      </ul>
      <p className={PROSE.paragraph}>
        We do not ask for payment details through this website, and we do not knowingly collect
        information from children under 16.
      </p>

      <h2 className={PROSE.heading}>How we use it</h2>
      <ul className={PROSE.list}>
        <li>To confirm, prepare for and manage your reservation</li>
        <li>To contact you about your request if we need to clarify something</li>
        <li>To keep a short record of bookings for operational and accounting purposes</li>
        <li>To meet legal obligations that apply to us</li>
      </ul>
      <p className={PROSE.paragraph}>
        We do not sell your information, and we do not use reservation details for marketing unless
        you separately ask us to.
      </p>

      <h2 className={PROSE.heading}>Legal bases</h2>
      <p className={PROSE.paragraph}>
        Where data protection law requires a legal basis, we rely on your consent (which you give
        when you submit the form), our legitimate interest in running a working reservation system,
        and compliance with our legal obligations.
      </p>

      <h2 className={PROSE.heading}>Cookies and analytics</h2>
      <p className={PROSE.paragraph}>
        This site does not set advertising or tracking cookies, and no analytics product is included
        by default. If you add one later, update this section and, where required, add a consent
        banner.
      </p>

      <h2 className={PROSE.heading}>Sharing and processors</h2>
      <p className={PROSE.paragraph}>
        We share information only with service providers that help us operate this site — for
        example our hosting provider and, where configured, an email or webhook service that
        delivers reservation requests to our team. Those providers process data on our instructions.
      </p>

      <h2 className={PROSE.heading}>Retention</h2>
      <p className={PROSE.paragraph}>
        Reservation requests are kept for up to 12 months so we can handle follow-ups and resolve
        disputes, then deleted or anonymised. You can ask us to remove your details sooner.
      </p>

      <h2 className={PROSE.heading}>Your rights</h2>
      <p className={PROSE.paragraph}>
        Depending on where you live, you may have the right to access, correct, export or delete the
        personal information we hold about you, to object to or restrict certain processing, and to
        withdraw consent. To exercise any of these, email{" "}
        <a
          href={`mailto:${site.contact.email}`}
          className="text-espresso decoration-caramel/50 font-medium underline underline-offset-2"
        >
          {site.contact.email}
        </a>
        . We will respond within the timeframe required by applicable law.
      </p>

      <h2 className={PROSE.heading}>Security</h2>
      <p className={PROSE.paragraph}>
        Reservation data is transmitted over HTTPS and validated on our server. No system is
        perfectly secure, but we take reasonable technical and organisational steps to protect the
        information we hold.
      </p>

      <h2 className={PROSE.heading}>International transfers</h2>
      <p className={PROSE.paragraph}>
        Our providers may store data in countries other than yours. Where that happens we rely on
        appropriate safeguards required by applicable law.
      </p>

      <h2 className={PROSE.heading}>Changes to this policy</h2>
      <p className={PROSE.paragraph}>
        We may update this policy from time to time. The date at the top of the page shows when it
        last changed.
      </p>

      <h2 className={PROSE.heading}>Contact</h2>
      <p className={PROSE.paragraph}>
        Questions about this policy? Email{" "}
        <a
          href={`mailto:${site.contact.email}`}
          className="text-espresso decoration-caramel/50 font-medium underline underline-offset-2"
        >
          {site.contact.email}
        </a>{" "}
        or write to us at {site.contact.address.street}, {site.contact.address.city}.
      </p>

      <p className="border-line text-clay mt-12 border-t pt-6 text-sm">
        <Link
          href="/legal/terms"
          className="text-espresso decoration-caramel/50 font-medium underline underline-offset-2"
        >
          Read our terms of use
        </Link>
      </p>
    </article>
  );
}
