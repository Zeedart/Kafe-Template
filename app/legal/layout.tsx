import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-cream pt-32 pb-24 md:pt-40">
      <Container className="max-w-3xl">{children}</Container>
    </div>
  );
}
