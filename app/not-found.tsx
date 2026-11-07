import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="texture-grain bg-cream">
      <Container className="flex min-h-[75svh] flex-col items-start justify-center gap-6 py-32">
        <p className="text-caramel flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] uppercase">
          <span aria-hidden="true" className="bg-caramel/60 h-px w-8" />
          404
        </p>
        <h1 className="font-display text-espresso max-w-xl text-4xl font-medium tracking-tight sm:text-5xl">
          This page went for a <em className="text-caramel italic">coffee</em>.
        </h1>
        <p className="text-clay max-w-md text-sm leading-relaxed">
          The link may be out of date, or the page has moved. Let&apos;s get you back to something
          warm.
        </p>
        <ButtonLink href="/" variant="dark" size="lg">
          Back to {site.name}
        </ButtonLink>
      </Container>
    </div>
  );
}
