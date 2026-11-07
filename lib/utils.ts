/**
 * Tiny class-name joiner. Keeps the template dependency-free while letting
 * components accept an optional `className` override.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
