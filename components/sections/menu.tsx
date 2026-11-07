"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import type { MenuCategoryId } from "@/lib/site";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Filter = MenuCategoryId | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  ...site.menu.categories,
];

export function MenuSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(
    () =>
      filter === "all"
        ? site.menu.items
        : site.menu.items.filter((item) => item.category === filter),
    [filter],
  );

  return (
    <section id="menu" className="bg-shell py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow={site.menu.eyebrow}
            title={site.menu.title}
            emphasis={site.menu.emphasis}
          />
          <p className="text-clay max-w-xs text-sm leading-relaxed">{site.menu.note}</p>
        </div>

        <div
          role="group"
          aria-label="Filter the menu by category"
          className="mt-10 flex flex-wrap gap-2"
        >
          {FILTERS.map((option) => {
            const active = option.id === filter;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option.id)}
                className={cn(
                  "rounded-full border px-5 py-2 text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors",
                  active
                    ? "border-espresso bg-espresso text-cream"
                    : "border-line text-clay hover:border-espresso hover:text-espresso",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <p className="sr-only" role="status">
          Showing {items.length} {items.length === 1 ? "item" : "items"}
        </p>

        <ul className="mt-8 grid gap-x-16 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.name} className="border-line/70 border-b">
              <div className="flex items-baseline justify-between gap-6 py-5">
                <div>
                  {item.tag ? (
                    <span className="text-caramel mb-1 block text-[9px] font-semibold tracking-[0.2em] uppercase">
                      {item.tag}
                    </span>
                  ) : null}
                  <h3 className="font-display text-espresso text-xl font-semibold">{item.name}</h3>
                  <p className="text-clay mt-1 text-sm leading-relaxed">{item.description}</p>
                </div>
                <span className="font-display text-caramel text-xl whitespace-nowrap">
                  {item.price}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
