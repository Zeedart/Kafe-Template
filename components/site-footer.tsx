import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ArrowUpRightIcon, FacebookIcon, InstagramIcon, MapPinIcon } from "@/components/ui/icons";
import { formatAddress, site } from "@/lib/site";

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream/65">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="flex flex-col gap-4">
          <a href="#top" className="font-display text-cream text-2xl font-semibold">
            {site.name.replace(/é$/, "")}
            <span className="text-caramel italic">é</span>
          </a>
          <p className="text-cream/55 max-w-xs text-sm leading-relaxed">{site.tagline}</p>
          <p className="text-cream/35 text-[11px] tracking-[0.2em] uppercase">
            Est. {site.founded}
          </p>
        </div>

        <div>
          <h2 className="text-caramel text-[10px] font-semibold tracking-[0.24em] uppercase">
            Explore
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-cream transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#visit" className="hover:text-cream transition-colors">
                Reservations
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-caramel text-[10px] font-semibold tracking-[0.24em] uppercase">
            Find us
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPinIcon className="text-cream/40 mt-0.5 size-4 shrink-0" />
              <a
                href={site.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream transition-colors"
              >
                {formatAddress()}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="hover:text-cream transition-colors"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="hover:text-cream transition-colors"
              >
                {site.contact.phone}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-caramel text-[10px] font-semibold tracking-[0.24em] uppercase">
            Follow
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {site.social.map((link) => {
              const Icon = SOCIAL_ICONS[link.icon];

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:text-cream inline-flex items-center gap-2 transition-colors"
                  >
                    <Icon className="text-cream/40 group-hover:text-caramel size-4 transition-colors" />
                    {link.label}
                    <ArrowUpRightIcon className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="text-cream/35 mt-8 text-xs leading-relaxed">
            Open today until {site.hours[0]?.closes ?? "18:00"}
          </p>
        </div>
      </Container>

      <div className="border-cream/10 border-t">
        <Container className="text-cream/35 flex flex-col gap-4 py-6 text-[11px] tracking-[0.14em] uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/legal/privacy" className="hover:text-cream transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="hover:text-cream transition-colors">
                Terms
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
