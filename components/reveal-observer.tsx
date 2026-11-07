"use client";

import { useEffect } from "react";

/**
 * Mounts a single IntersectionObserver for every `.reveal` element on the page.
 *
 * Server components stay server components: they only add `className="reveal"`.
 * Falls back to showing everything if IntersectionObserver is unavailable.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (elements.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      for (const element of elements) element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    for (const element of elements) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return null;
}
