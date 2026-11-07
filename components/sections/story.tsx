import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowUpRightIcon, CheckIcon } from "@/components/ui/icons";
import { SectionIntro } from "@/components/ui/section-intro";
import { site } from "@/lib/site";

export function Story() {
  return (
    <section id="story" className="texture-grain bg-cream overflow-hidden py-24 md:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="reveal relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="shadow-lift relative aspect-[4/5] w-[82%] overflow-hidden rounded-[58%_42%_55%_45%/46%_58%_42%_54%]">
            <Image
              src={site.story.images.primary.src}
              alt={site.story.images.primary.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
          </div>

          <div className="border-cream shadow-soft absolute right-0 bottom-0 aspect-square w-[54%] overflow-hidden rounded-[45%_55%_40%_60%/58%_42%_56%_44%] border-4">
            <Image
              src={site.story.images.secondary.src}
              alt={site.story.images.secondary.alt}
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="bg-caramel shadow-lift absolute top-[52%] left-[48%] flex size-24 -translate-x-1/2 -translate-y-1/2 -rotate-6 items-center justify-center rounded-full text-center">
            <span className="font-display px-3 text-[13px] leading-tight font-medium text-white italic">
              {site.story.badge}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SectionIntro
            eyebrow={site.story.eyebrow}
            title={site.story.title}
            emphasis={site.story.emphasis}
          />

          <div className="reveal reveal-late text-clay space-y-4 text-[15px] leading-relaxed">
            {site.story.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="reveal reveal-late mt-2 grid gap-3">
            {site.story.features.map((feature) => (
              <li key={feature} className="text-espresso flex items-start gap-3 text-sm">
                <span className="bg-caramel/10 text-caramel mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                  <CheckIcon className="size-3.5" strokeWidth={2.2} />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <dl className="border-line mt-4 grid grid-cols-3 gap-4 border-t pt-6">
            {site.story.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-clay/80 text-[10px] tracking-[0.16em] uppercase">
                  {stat.label}
                </dt>
                <dd className="font-display text-espresso mt-1 text-3xl font-semibold">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <ButtonLink href={site.story.cta.href} variant="dark" className="mt-2 self-start">
            {site.story.cta.label}
            <ArrowUpRightIcon className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
