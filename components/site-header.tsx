"use client";

import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-cream/95 shadow-soft backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:h-24 md:px-10">
        <a
          href="#top"
          aria-label={`${site.name} — back to top`}
          className={cn(
            "font-display text-2xl font-semibold tracking-[0.02em] transition-colors",
            solid ? "text-espresso" : "text-cream",
          )}
        >
          {site.name.replace(/é$/, "")}
          <span className="text-caramel italic">é</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "hover:text-caramel text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors",
                    solid ? "text-clay" : "text-cream/85",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href="#visit"
            variant={solid ? "dark" : "primary"}
            className="hidden md:inline-flex"
          >
            Reserve a table
          </ButtonLink>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              solid
                ? "border-line text-espresso hover:bg-sand"
                : "border-cream/30 text-cream hover:bg-cream/10",
            )}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        tabIndex={-1}
        hidden={!open}
        className="bg-cream fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto px-6 pt-8 pb-10 focus:outline-none md:top-24 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.href} className="border-line/70 border-b">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-espresso hover:text-caramel block py-5 text-3xl font-medium transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-4">
          <ButtonLink href="#visit" variant="dark" size="lg" onClick={() => setOpen(false)}>
            Reserve a table
          </ButtonLink>

          <div className="text-clay mt-4 space-y-2 text-sm">
            <p>{site.contact.email}</p>
            <p>{site.contact.phone}</p>
            <p className="text-caramel text-xs tracking-[0.18em] uppercase">
              Open 7 days · {site.hours[0]?.label ?? ""}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
