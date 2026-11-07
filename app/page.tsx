import type { Metadata } from "next";

import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { MenuSection } from "@/components/sections/menu";
import { Story } from "@/components/sections/story";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Visit } from "@/components/sections/visit";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const DAY_NAMES: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

export default function HomePage() {
  const { address, email, phone } = site.contact;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.legalName,
    description: site.description,
    url: site.url,
    image: `${site.url}${site.hero.image}`,
    telephone: phone,
    email,
    priceRange: "$$",
    servesCuisine: ["Coffee", "Bakery"],
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    openingHoursSpecification: site.hours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.schemaDays.map((day) => DAY_NAMES[day]).filter(Boolean),
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: site.social.map((link) => link.href),
    hasMenu: `${site.url}/#menu`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <TrustStrip />
      <Story />
      <MenuSection />
      <Gallery />
      <Testimonials />
      <Visit />
    </>
  );
}
