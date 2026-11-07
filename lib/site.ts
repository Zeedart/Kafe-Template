/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT
 * ---------------------------------------------------------------------------
 * This file is the single source of truth for every word, price, link and
 * image on the site. You should be able to rebrand the entire template by
 * editing this file alone — no component changes required.
 *
 * Quick rebrand checklist:
 *   1. name / legalName / tagline / description
 *   2. contact details and social links
 *   3. hours
 *   4. hero copy and images
 *   5. menu items
 *   6. gallery + testimonials
 *   7. NEXT_PUBLIC_SITE_URL in your .env file
 * ---------------------------------------------------------------------------
 */

export type NavItem = {
  label: string;
  href: string;
};

export type HoursEntry = {
  /** Human label shown in the UI. */
  label: string;
  /** Schema.org day codes, used for structured data. */
  schemaDays: string[];
  /** 24h "HH:MM" strings. */
  opens: string;
  closes: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "facebook";
};

export type MenuCategoryId = "coffee" | "cold" | "bakery";

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  category: MenuCategoryId;
  /** Optional small badge, e.g. "Signature" or "Popular". */
  tag?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type SectionIntro = {
  eyebrow: string;
  title: string;
  /** Word (or phrase) inside `title` to render in italic caramel. */
  emphasis?: string;
};

export type SiteConfig = {
  name: string;
  legalName: string;
  /** Absolute production URL, no trailing slash. */
  url: string;
  locale: string;
  tagline: string;
  description: string;
  keywords: string[];
  founded: number;
  contact: {
    email: string;
    phone: string;
    phoneHref: string;
    address: {
      street: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
    };
    mapUrl: string;
  };
  hours: HoursEntry[];
  social: SocialLink[];
  nav: NavItem[];
  hero: {
    eyebrow: string;
    headline: { lines: string[]; emphasis: string };
    description: string;
    image: string;
    imageAlt: string;
    primaryCta: NavItem;
    secondaryCta: NavItem;
    highlights: string[];
  };
  trust: string[];
  story: SectionIntro & {
    body: string[];
    features: string[];
    badge: string;
    images: {
      primary: { src: string; alt: string };
      secondary: { src: string; alt: string };
    };
    stats: { value: string; label: string }[];
    cta: NavItem;
  };
  menu: SectionIntro & {
    note: string;
    categories: { id: MenuCategoryId; label: string }[];
    items: MenuItem[];
  };
  gallery: SectionIntro & {
    images: GalleryImage[];
  };
  testimonials: SectionIntro & {
    items: Testimonial[];
  };
  visit: SectionIntro & {
    description: string;
    form: {
      title: string;
      note: string;
      submit: string;
      successTitle: string;
      successBody: string;
    };
    policy: string;
  };
  legal: {
    privacyUpdated: string;
    termsUpdated: string;
    /** Shown on legal pages so buyers know to replace the boilerplate. */
    reviewedByCounsel: boolean;
  };
};

export const site: SiteConfig = {
  name: "Kafé",
  legalName: "Kafé Specialty Coffee",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",
  tagline:
    "Slow coffee, honest food, and a corner of the world that asks nothing of you but your presence.",
  description:
    "Kafé is a specialty coffee shop serving single-origin espresso, seasonal bakes and slow mornings. Browse the menu, see the space, or reserve a table.",
  keywords: ["specialty coffee", "coffee shop", "café", "espresso", "brunch", "reserve a table"],
  founded: 2018,

  contact: {
    email: "hello@kafecoffee.com",
    phone: "+218 91 000 0000",
    phoneHref: "+218910000000",
    address: {
      street: "14 Stillwater Lane, East Quarter",
      city: "Tripoli",
      // Optional: leave empty if your region has no postal code, or fill in
      // the district and postcode you use.
      region: "",
      postalCode: "",
      country: "LY",
    },
    mapUrl: "https://maps.google.com/?q=14+Stillwater+Lane+Tripoli",
  },

  hours: [
    {
      label: "Monday – Friday",
      schemaDays: ["Mo", "Tu", "We", "Th", "Fr"],
      opens: "07:00",
      closes: "18:00",
    },
    { label: "Saturday", schemaDays: ["Sa"], opens: "08:00", closes: "17:00" },
    { label: "Sunday", schemaDays: ["Su"], opens: "09:00", closes: "15:00" },
  ],

  social: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  ],

  nav: [
    { label: "Menu", href: "#menu" },
    { label: "Our story", href: "#story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit", href: "#visit" },
  ],

  hero: {
    eyebrow: "Specialty coffee · Est. 2018",
    headline: {
      lines: ["Every cup", "tells a story"],
      emphasis: "story",
    },
    description:
      "Single-origin beans, slow mornings and a menu that changes with the season. Pull up a chair — we have been keeping it warm for you.",
    image: "/images/hero-interior.jpg",
    imageAlt: "Warmly lit café interior with wooden tables and hanging pendant lights",
    primaryCta: { label: "View the menu", href: "#menu" },
    secondaryCta: { label: "Reserve a table", href: "#visit" },
    highlights: ["Open 7 days", "Roasted in-house", "Walk-ins welcome"],
  },

  trust: [
    "Single-origin beans",
    "Baked fresh daily",
    "Roasted in small batches",
    "Direct trade partners",
    "Open 7 days a week",
  ],

  story: {
    eyebrow: "Our story",
    title: "Fueling your day, one cup at a time",
    emphasis: "one cup at a time",
    body: [
      "Kafé started with a simple idea: what if your local coffee shop actually knew your name? We source directly from farms, roast in small batches, and bake everything fresh each morning.",
      "No shortcuts, no compromise — just good coffee made by people who care about the details.",
    ],
    features: [
      "Direct trade with 12 farm partners",
      "Roasted in-house every Tuesday",
      "Seasonal menu, always evolving",
      "Pastries baked on-site from 6am",
    ],
    badge: "Best in town",
    images: {
      primary: {
        src: "/images/story-pour.jpg",
        alt: "Barista pouring steamed milk into a cup of espresso",
      },
      secondary: {
        src: "/images/story-latte.jpg",
        alt: "Latte art on a ceramic saucer beside a window",
      },
    },
    stats: [
      { value: "2018", label: "Founded" },
      { value: "12", label: "Farm partners" },
      { value: "4.9", label: "Guest rating" },
    ],
    cta: { label: "Come say hello", href: "#visit" },
  },

  menu: {
    eyebrow: "What we serve",
    title: "Simple things, done right",
    emphasis: "done right",
    note: "Oat, almond and lactose-free milk available on every drink. Ask us about today's single origin.",
    categories: [
      { id: "coffee", label: "Coffee" },
      { id: "cold", label: "Cold" },
      { id: "bakery", label: "Bakery" },
    ],
    items: [
      {
        name: "Espresso Noir",
        description: "Double shot, dark roast, served black",
        price: "$4.50",
        category: "coffee",
        tag: "Signature",
      },
      {
        name: "Honey Oat Latte",
        description: "Oat milk, espresso, raw honey, cinnamon dust",
        price: "$6.00",
        category: "coffee",
        tag: "Popular",
      },
      {
        name: "Cardamom Cappuccino",
        description: "House blend, steamed milk, ground cardamom",
        price: "$5.50",
        category: "coffee",
      },
      {
        name: "Flat White",
        description: "Ristretto base, silky microfoam, served short",
        price: "$5.00",
        category: "coffee",
      },
      {
        name: "Cold Brew Float",
        description: "18-hour cold brew, vanilla cream, served tall",
        price: "$6.50",
        category: "cold",
        tag: "Cold",
      },
      {
        name: "Matcha Cloud",
        description: "Ceremonial matcha, coconut milk, light foam",
        price: "$6.00",
        category: "cold",
      },
      {
        name: "Iced Filter",
        description: "Slow-dripped single origin poured over ice",
        price: "$5.00",
        category: "cold",
      },
      {
        name: "Almond Croissant",
        description: "Twice-baked, frangipane filled, powdered sugar",
        price: "$5.00",
        category: "bakery",
        tag: "Fresh",
      },
      {
        name: "Banana Bread",
        description: "Brown butter, walnuts, warm spice",
        price: "$4.75",
        category: "bakery",
      },
      {
        name: "Cardamom Bun",
        description: "Hand-rolled, pearl sugar, baked each morning",
        price: "$4.50",
        category: "bakery",
      },
    ],
  },

  gallery: {
    eyebrow: "Our gallery",
    title: "Moments at Kafé",
    emphasis: "Kafé",
    images: [
      { src: "/images/gallery-1.jpg", alt: "Coffee cup on a marble table beside a pastry" },
      { src: "/images/gallery-2.jpg", alt: "Sunlit corner of the café with plants and stools" },
      { src: "/images/gallery-3.jpg", alt: "Barista tamping espresso at the bar" },
      { src: "/images/gallery-4.jpg", alt: "Friends sharing coffee at a window seat" },
      { src: "/images/gallery-5.jpg", alt: "Close-up of freshly roasted coffee beans" },
      { src: "/images/gallery-6.jpg", alt: "Pastries cooling on a wire rack in the kitchen" },
    ],
  },

  testimonials: {
    eyebrow: "Kind words",
    title: "Regulars, not customers",
    emphasis: "Regulars",
    items: [
      {
        quote:
          "The cardamom cappuccino ruined every other coffee for me. I have been coming in every Tuesday since they opened.",
        name: "Maya R.",
        detail: "Regular since 2019",
      },
      {
        quote:
          "It feels like a living room that happens to serve perfect coffee. The staff remembered my order on the second visit.",
        name: "Omar K.",
        detail: "Local designer",
      },
      {
        quote:
          "Best almond croissant in the city, hands down. I book my morning calls around their opening hours now.",
        name: "Sofia L.",
        detail: "Freelance writer",
      },
    ],
  },

  visit: {
    eyebrow: "Get in touch",
    title: "Come find us. We saved you a seat.",
    emphasis: "We saved you a seat.",
    description:
      "Booking a table, asking about our beans, or just want to say hello? Send a note and we will get back to you the same day.",
    form: {
      title: "Reserve a table",
      note: "We hold reservations for 15 minutes. For groups larger than 6, please call us directly.",
      submit: "Send request",
      successTitle: "Request received",
      successBody:
        "Thanks — we have your details and will confirm your table by email shortly. If it is urgent, give us a call.",
    },
    policy: "By sending this request you agree to our privacy policy.",
  },

  legal: {
    privacyUpdated: "2026-01-01",
    termsUpdated: "2026-01-01",
    reviewedByCounsel: false,
  },
};

/**
 * Full display address, single line. Empty region/postcode values are dropped
 * so the output stays clean for locations that do not use them.
 */
export function formatAddress(): string {
  const { street, city, region, postalCode } = site.contact.address;
  const locality = [region, postalCode].filter(Boolean).join(" ");
  return [street, city, locality].filter(Boolean).join(", ");
}
