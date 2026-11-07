import { Container } from "@/components/ui/container";
import { StarIcon } from "@/components/ui/icons";
import { SectionIntro } from "@/components/ui/section-intro";
import { site } from "@/lib/site";

export function Testimonials() {
  return (
    <section className="texture-grain bg-cream py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow={site.testimonials.eyebrow}
          title={site.testimonials.title}
          emphasis={site.testimonials.emphasis}
          align="center"
          className="mx-auto"
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {site.testimonials.items.map((testimonial, index) => (
            <li
              key={testimonial.name}
              className="reveal rounded-card border-line/80 bg-shell flex flex-col border p-7"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="text-caramel flex gap-0.5" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, star) => (
                  <StarIcon key={star} className="size-3.5" />
                ))}
              </div>

              <blockquote className="mt-5 flex-1">
                <p className="font-display text-espresso/90 text-lg leading-relaxed">
                  “{testimonial.quote}”
                </p>
              </blockquote>

              <footer className="border-line/60 mt-6 border-t pt-4">
                <p className="text-espresso text-sm font-semibold">{testimonial.name}</p>
                <p className="text-clay text-xs">{testimonial.detail}</p>
              </footer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
