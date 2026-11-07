import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "dark" | "ghost";
export type ButtonSize = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold uppercase tracking-[0.12em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-cream text-espresso hover:bg-white hover:-translate-y-0.5 hover:shadow-lift",
  secondary: "bg-caramel text-white hover:bg-ember hover:-translate-y-0.5 hover:shadow-lift",
  outline: "border border-cream/35 text-cream hover:border-cream hover:bg-cream/10",
  dark: "bg-espresso text-cream hover:bg-ink hover:-translate-y-0.5 hover:shadow-lift",
  ghost: "text-espresso hover:text-caramel",
};

const SIZES: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-[11px]",
  lg: "px-8 py-4 text-xs",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

/**
 * Renders a plain anchor for in-page, mail and phone links and Next's Link for
 * real routes, so hash navigation keeps working without client-side routing.
 */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className });

  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
