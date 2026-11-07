import { ReservationForm } from "@/components/reservation-form";
import { Container } from "@/components/ui/container";
import { ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { SectionIntro } from "@/components/ui/section-intro";
import { formatAddress, site } from "@/lib/site";

export function Visit() {
  return (
    <section id="visit" className="bg-espresso relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="bg-caramel/10 pointer-events-none absolute -top-40 -right-40 size-[32rem] rounded-full blur-3xl"
      />

      <Container className="relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionIntro
            eyebrow={site.visit.eyebrow}
            title={site.visit.title}
            emphasis={site.visit.emphasis}
            tone="dark"
          />

          <p className="text-cream/60 max-w-md text-[15px] leading-relaxed">
            {site.visit.description}
          </p>

          <div className="flex flex-col gap-7">
            <div className="flex gap-4">
              <MapPinIcon className="text-caramel mt-0.5 size-5 shrink-0" />
              <div>
                <p className="text-honey text-[10px] font-semibold tracking-[0.24em] uppercase">
                  Address
                </p>
                <a
                  href={site.contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/75 hover:text-cream mt-2 block text-sm leading-relaxed transition-colors"
                >
                  {formatAddress()}
                  <span className="text-cream/40 mt-1 block text-xs">Get directions →</span>
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <ClockIcon className="text-caramel mt-0.5 size-5 shrink-0" />
              <div className="w-full max-w-sm">
                <p className="text-honey text-[10px] font-semibold tracking-[0.24em] uppercase">
                  Hours
                </p>
                <dl className="mt-3">
                  {site.hours.map((entry) => (
                    <div
                      key={entry.label}
                      className="border-cream/10 flex items-center justify-between gap-6 border-b py-2.5 text-sm last:border-0"
                    >
                      <dt className="text-cream/50">{entry.label}</dt>
                      <dd className="text-cream/80 font-medium whitespace-nowrap">
                        {entry.opens} – {entry.closes}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-3 text-sm">
                <p className="text-honey text-[10px] font-semibold tracking-[0.24em] uppercase">
                  Contact
                </p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-cream/75 hover:text-cream flex items-center gap-3 transition-colors"
                >
                  <EnvelopeIcon className="text-cream/40 size-4" />
                  {site.contact.email}
                </a>
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="text-cream/75 hover:text-cream flex items-center gap-3 transition-colors"
                >
                  <PhoneIcon className="text-cream/40 size-4" />
                  {site.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-card bg-shell shadow-lift p-6 md:p-9">
          <ReservationForm />
        </div>
      </Container>
    </section>
  );
}
