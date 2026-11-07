import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function TrustStrip() {
  return (
    <div className="border-cream/10 bg-espresso border-y">
      <Container className="text-cream/70 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-[10px] font-medium tracking-[0.2em] uppercase">
        {site.trust.map((item) => (
          <span key={item} className="flex items-center gap-3">
            <span aria-hidden="true" className="bg-caramel size-1 rounded-full" />
            {item}
          </span>
        ))}
      </Container>
    </div>
  );
}
