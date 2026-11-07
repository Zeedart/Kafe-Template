import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/**
 * Renders a section heading and wraps an emphasized phrase from the config in
 * an italic accent, so copy can change without touching JSX.
 */
export function SectionIntro({
  eyebrow,
  title,
  emphasis,
  tone = "light",
  align = "left",
  className,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  emphasis?: string;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
}) {
  const index = emphasis ? title.indexOf(emphasis) : -1;
  const hasEmphasis = index >= 0 && emphasis !== undefined;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
      data-reveal
    >
      <p
        className={cn(
          "flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] uppercase",
          tone === "dark" ? "text-honey" : "text-caramel",
          align === "center" && "justify-center",
        )}
      >
        <span
          aria-hidden="true"
          className={cn("h-px w-8", tone === "dark" ? "bg-honey/60" : "bg-caramel/60")}
        />
        {eyebrow}
      </p>

      <Heading
        className={cn(
          "font-display max-w-2xl text-4xl leading-[1.05] font-medium tracking-[-0.01em] sm:text-5xl lg:text-[3.4rem]",
          tone === "dark" ? "text-cream" : "text-espresso",
        )}
      >
        {hasEmphasis && emphasis ? (
          <>
            {title.slice(0, index)}
            <em
              className={cn("font-normal italic", tone === "dark" ? "text-honey" : "text-caramel")}
            >
              {emphasis}
            </em>
            {title.slice(index + emphasis.length)}
          </>
        ) : (
          title
        )}
      </Heading>
    </div>
  );
}
