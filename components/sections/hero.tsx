import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function Hero() {
  const { headline } = site.hero;

  return (
    <section
      id="top"
      className="bg-espresso relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <Image
        src={site.hero.image}
        alt={site.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="from-ink via-ink/60 to-espresso/30 absolute inset-0 bg-gradient-to-t"
      />

      {/* Keeps the transparent header legible over bright photography. */}
      <div
        aria-hidden="true"
        className="from-ink/70 via-ink/25 absolute inset-x-0 top-0 h-52 bg-gradient-to-b to-transparent"
      />

      <Container className="relative z-10 pt-32 pb-16 md:pb-24">
        <p className="text-honey flex items-center gap-3 text-[10px] font-semibold tracking-[0.32em] uppercase">
          <span aria-hidden="true" className="bg-honey/70 h-px w-8" />
          {site.hero.eyebrow}
        </p>

        <h1 className="font-display text-cream mt-6 max-w-3xl text-[clamp(3rem,8vw,6.5rem)] leading-[0.94] font-medium tracking-[-0.02em]">
          {headline.lines.map((line, index) => {
            const emphasisIndex = line.indexOf(headline.emphasis);

            return (
              <span key={`${line}-${index}`} className="block">
                {emphasisIndex >= 0 ? (
                  <>
                    {line.slice(0, emphasisIndex)}
                    <em className="text-honey font-normal italic">{headline.emphasis}</em>
                    {line.slice(emphasisIndex + headline.emphasis.length)}
                  </>
                ) : (
                  line
                )}
              </span>
            );
          })}
        </h1>

        <p className="text-cream/70 mt-6 max-w-lg text-base leading-relaxed md:text-lg">
          {site.hero.description}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href={site.hero.primaryCta.href} variant="primary" size="lg">
            {site.hero.primaryCta.label}
            <ArrowUpRightIcon className="size-4" />
          </ButtonLink>
          <ButtonLink href={site.hero.secondaryCta.href} variant="outline" size="lg">
            {site.hero.secondaryCta.label}
            <ArrowUpRightIcon className="size-4" />
          </ButtonLink>
        </div>

        <ul className="text-cream/50 mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] font-medium tracking-[0.2em] uppercase">
          {site.hero.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-3">
              <span aria-hidden="true" className="bg-caramel size-1 rounded-full" />
              {highlight}
            </li>
          ))}
        </ul>
      </Container>

      <p
        aria-hidden="true"
        className="text-cream/35 absolute right-8 bottom-20 z-10 hidden items-center gap-3 text-[10px] font-semibold tracking-[0.3em] uppercase [writing-mode:vertical-rl] lg:flex"
      >
        Scroll
        <span className="bg-cream/25 h-px w-8" />
      </p>
    </section>
  );
}
