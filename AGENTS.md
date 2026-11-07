# Working on this template

A commercial café landing page template. Keep it generic: no client-specific hacks, no content
duplicated outside the config.

## Ground rules

- **Content lives in `lib/site.ts`.** Never hardcode copy, prices, addresses or image paths in
  components. If a section needs new copy, add it to the typed config first.
- **Server components by default.** Add `"use client"` only for the header, the menu filter, the
  reservation form and the reveal observer. Do not add client boundaries for static markup.
- **No new UI dependencies.** Icons are local SVGs in `components/ui/icons.tsx`; styling is Tailwind
  utilities plus tokens in `app/globals.css`. Do not add an icon, animation or component library.
- **Design tokens, not magic colours.** Use `cream`, `shell`, `sand`, `line`, `espresso`, `ink`,
  `caramel`, `ember`, `honey`, `clay`. Add new tokens to `@theme` rather than using hex values.
- **Keep accessibility intact.** Every control needs a label; keep `aria-*` wiring, focus styles,
  reduced-motion handling and keyboard behaviour when editing.
- **Validate on the server.** The form's browser constraints are convenience only —
  `lib/reservation-schema.ts` is authoritative.

## Checks before finishing

```bash
npm run typecheck
npm run lint
npm run build
```

Do not silence TypeScript or ESLint errors to make a check pass.

## Style

Prettier with Tailwind class sorting (`npm run format`). Double quotes, semicolons, 100-column
width. Prefer early returns and small components over deeply nested JSX.
