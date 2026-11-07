# Kafé — Café & Coffee Shop Landing Page Template

A modern, accessible, SEO-ready single-page template for cafés, coffee shops, bakeries and small
restaurants. Built with Next.js, TypeScript and Tailwind CSS, with a working reservation form and
legal pages included.

Everything you need to launch is here — and almost everything you need to change lives in **one
file**.

---

## Highlights

| Area                 | What you get                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Design**           | Editorial serif typography, warm cream/espresso palette, organic image masks, subtle paper grain, tasteful scroll reveals                 |
| **Architecture**     | Typed React components, one content config file, server components by default                                                             |
| **Content**          | Hero, credibility strip, story, filterable menu, gallery, testimonials, reservation/contact                                               |
| **Reservation form** | Server-side validation, honeypot, rate limiting, inline field errors, success state, optional webhook delivery                            |
| **SEO**              | Per-page metadata, canonical URLs, LocalBusiness/Café JSON-LD, sitemap, robots.txt, generated Open Graph image, web manifest              |
| **Accessibility**    | Skip link, semantic landmarks, visible focus rings, keyboard-friendly mobile menu, labelled form fields, `prefers-reduced-motion` support |
| **Performance**      | `next/image` with AVIF/WebP, self-hosted fonts via `next/font`, no icon library, no animation library                                     |
| **Policies**         | Privacy policy, terms of use, and a commercial license template                                                                           |
| **Tooling**          | ESLint, Prettier, strict TypeScript, `typecheck` and `format` scripts                                                                     |

---

## Requirements

- **Node.js 20.9+** (see `.nvmrc`)
- npm 10+ (or pnpm/yarn — commands below use npm)

## Quick start

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Command                | Purpose                      |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Start the development server |
| `npm run build`        | Production build             |
| `npm run start`        | Serve the production build   |
| `npm run lint`         | ESLint                       |
| `npm run typecheck`    | TypeScript, no emit          |
| `npm run format`       | Format with Prettier         |
| `npm run format:check` | Verify formatting in CI      |

---

## Project structure

```
.
├── app/
│   ├── api/reservation/route.ts   # Validated reservation endpoint
│   ├── legal/privacy/page.tsx     # Privacy policy
│   ├── legal/terms/page.tsx       # Terms of use
│   ├── globals.css                # Design tokens, base styles, motion
│   ├── layout.tsx                 # Fonts, metadata, header/footer shell
│   ├── page.tsx                   # Home page + JSON-LD
│   ├── icon.svg                   # Favicon
│   ├── manifest.ts                # Web app manifest
│   ├── opengraph-image.tsx        # Generated social share image
│   ├── robots.ts                  # robots.txt
│   └── sitemap.ts                 # sitemap.xml
├── components/
│   ├── sections/                  # Hero, story, menu, gallery, …
│   ├── ui/                        # Button, container, icons, section intro
│   ├── reservation-form.tsx       # Client form with error handling
│   ├── reveal-observer.tsx        # Single scroll-reveal observer
│   ├── site-header.tsx            # Sticky header + mobile menu
│   └── site-footer.tsx
├── lib/
│   ├── site.ts                    # ★ All site content lives here
│   ├── reservation-options.ts     # Slots, party sizes, shared types
│   ├── reservation-schema.ts      # Server-side zod validation
│   ├── rate-limit.ts              # In-memory rate limiter
│   └── utils.ts
├── public/images/                 # Local demo photography
└── next.config.ts
```

---

## Customising the template

### 1. Content — `lib/site.ts`

Every headline, menu item, price, opening hour, social link and image path is defined in a single
typed object. Rebranding a typical site takes about ten minutes:

- `name`, `legalName`, `tagline`, `description`
- `contact` — email, phone, address, map link
- `hours` — also drives the structured data
- `social`, `nav`
- `hero`, `trust`, `story`, `menu`, `gallery`, `testimonials`, `visit`

Sections read from this object, so changing the copy never means touching a component.

### 2. Colours — `app/globals.css`

All colours are Tailwind v4 tokens under `@theme`:

```css
--color-cream: #f7f2e9;
--color-espresso: #2a1710;
--color-caramel: #b8742f;
```

Change the token values and the entire site re-themes — buttons, borders, focus rings and the
reservation form included.

### 3. Fonts — `app/layout.tsx`

The template uses **Cormorant Garamond** (display) and **DM Sans** (body) through `next/font`, which
self-hosts the files and eliminates layout shift. Swap the imports for any Google font and update
the `--font-display` / `--font-sans` tokens in `globals.css`.

### 4. Images

Demo photography lives in `public/images/` and is served through `next/image`. Replace the files
(keep the filenames) or change the paths in `lib/site.ts`.

Use landscape images around **1600–2000 px wide**, JPG or WebP, ideally under 300 KB each. Next.js
generates responsive AVIF/WebP variants at request time.

The bundled photos are from [Unsplash](https://unsplash.com) and are included as placeholders under
the [Unsplash License](https://unsplash.com/license). Replace them with your own photography before
selling or launching a real business site.

### 5. SEO essentials

1. Set `NEXT_PUBLIC_SITE_URL` in `.env.local` and in your host's environment variables.
2. Update `description`, `keywords` and `social` in `lib/site.ts`.
3. Keep `app/sitemap.ts` in sync if you add pages.
4. Verify the result with a rich-results/social-preview checker after deploying.

`app/opengraph-image.tsx` renders the 1200×630 share image at build time — no design file needed.

---

## The reservation form

The flow is deliberately simple and framework-native:

1. `components/reservation-form.tsx` posts JSON to `/api/reservation`.
2. `lib/reservation-schema.ts` validates it on the server with zod — dates must not be in the past,
   times must fall inside that weekday's opening hours, party size is capped.
   Available slots are generated from `site.hours`, so the form and the config never drift.
3. `lib/rate-limit.ts` limits each IP to **5 requests per 10 minutes**.
4. A hidden honeypot field rejects naive bots.
5. Valid requests are forwarded to `RESERVATION_WEBHOOK_URL` if set, otherwise logged to the server
   console.
6. The visitor sees a success panel; validation errors appear inline and are announced to screen
   readers.

### Connecting a real destination

Set one environment variable — no code changes:

```bash
RESERVATION_WEBHOOK_URL=https://hooks.slack.com/services/…
```

Works with Slack, Discord, Zapier, Make, n8n, a CRM, or any HTTPS endpoint that accepts JSON. The
payload looks like:

```json
{
  "type": "reservation",
  "submittedAt": "2026-01-01T09:30:00.000Z",
  "name": "Maya Rahman",
  "email": "maya@example.com",
  "phone": "+218 91 000 0000",
  "date": "2026-01-08",
  "time": "19:00",
  "partySize": 2,
  "notes": "Window seat if possible",
  "consent": true
}
```

**Email instead of a webhook?** Add your provider's API call inside the `if (webhookUrl)` block in
`app/api/reservation/route.ts` (Resend, Postmark and SendGrid all have small HTTP APIs), and keep
the key in a server-only environment variable.

> **Scaling note:** the rate limiter is in-memory, so it is per-instance. On serverless hosting each
> instance keeps its own window. For strict limits, back `lib/rate-limit.ts` with Upstash Redis or
> your platform's KV store.

---

## Accessibility

Built and checked against the basics of WCAG 2.2 AA:

- Skip-to-content link and one `<main>` landmark
- Keyboard-operable navigation; `Escape` closes the mobile menu and focus returns to the trigger
- Visible `:focus-visible` rings that match the brand
- Form controls have real labels, `aria-invalid`, and error text linked with `aria-describedby`
- Decorative imagery and icons are `aria-hidden`
- Motion respects `prefers-reduced-motion`; no content depends on animation
- Content is readable at 200% zoom and with JavaScript disabled

Accessibility is a process, not a badge — re-test after changing colours or copy.

## Performance notes

- No icon, animation or UI-framework dependencies: icons are local SVGs
- Fonts are self-hosted with `display: swap`
- The only client components are the header, menu filter, form and reveal observer
- Images are local, sized, and served as AVIF/WebP
- The page ships as static HTML with one JSON-LD block

---

## Deployment

### Vercel (recommended)

1. Import the repository.
2. Add `NEXT_PUBLIC_SITE_URL` (and optionally `RESERVATION_WEBHOOK_URL`) in **Settings → Environment
   Variables**.
3. Deploy. No other configuration needed.

### Netlify / Cloudflare / any Node host

- Build command: `npm run build`
- Output: Next.js server (the API route requires a Node runtime)
- Node 20+

### Static hosting

A pure static export is **not** included because the reservation form needs a server endpoint.
Options: deploy as a Node app, or remove `app/api/reservation` and point the form at an external
form service (Formspree, Basin, your own function).

---

## Legal pages

`/legal/privacy` and `/legal/terms` ship as realistic starting points, with a visible note reminding
you to review them. They are **not legal advice**.

Before publishing:

1. Fill in jurisdiction, company details and contact information.
2. Confirm the privacy text matches your actual data handling (hosting, webhook destination,
   analytics).
3. Set `site.legal.reviewedByCounsel = true` in `lib/site.ts` to hide the template note.
4. Have both documents reviewed by a qualified professional.

---

## License

This template is sold under the terms in [LICENSE.md](LICENSE.md). In short: one purchase covers one
end product, you may modify it freely, and you may not resell or redistribute it as a template.

Replace `[Your name or studio]` in `LICENSE.md` with your business name before distributing the
template to customers.

Third-party assets keep their own licenses:

- Demo photography — [Unsplash License](https://unsplash.com/license)
- Cormorant Garamond and DM Sans — [SIL Open Font License](https://openfontlicense.org/)

---

## Credits & support

Designed and built as a production-ready template for independent cafés and coffee shops.

See [CHANGELOG.md](CHANGELOG.md) for release notes. For support, use the contact details included
with your purchase.
