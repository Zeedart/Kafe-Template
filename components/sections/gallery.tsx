import Image from "next/image";

import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** First image anchors the mosaic; the last fills the mobile grid. */
const SPANS = ["col-span-2 row-span-2", "", "", "", "", "col-span-2 sm:col-span-1"];

export function Gallery() {
  return (
    <section id="gallery" className="bg-sand py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow={site.gallery.eyebrow}
          title={site.gallery.title}
          emphasis={site.gallery.emphasis}
        />

        <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-3 lg:auto-rows-[220px]">
          {site.gallery.images.map((image, index) => (
            <figure
              key={image.src}
              className={cn(
                "group bg-line relative overflow-hidden rounded-lg",
                SPANS[index] ?? "",
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
