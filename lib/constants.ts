/** Production site — canonical URLs, OG, JSON-LD */
export const siteConfig = {
  name: "VIBO",
  tagline: "Good vibes happen nearby.",
  description:
    "VIBO is an app for local events near you: see what's on, tap to join, show up. Free for attendees. Verified hosts. Launching Mumbai first.",
  url: "https://hellovibo.in",
  /** Referral / share links (host only; same site as `url`) */
  shareDomain: "hellovibo.in",
  email: "sayhellovibo@gmail.com",
  ogImage: "/og-image.png",
} as const;

/**
 * When `true`, the home page shows the pricing section (`#price`).
 * When `false`, shows waitlist privileges instead (`#waitlist-perks`).
 */
export const SHOW_PRICING_SECTION = false;

export const homeSectionLinks = {
  waitlist: "/#wl",
  howItWorks: "/#how",
  features: "/#feat",
  pricing: "/#price",
  waitlistPerks: "/#waitlist-perks",
} as const;

const navPricingOrPerks = SHOW_PRICING_SECTION
  ? ({ label: "Pricing", href: homeSectionLinks.pricing } as const)
  : ({
      label: "Waitlist Perks",
      href: homeSectionLinks.waitlistPerks,
    } as const);

export const navLinks = [
  { label: "How it works", href: homeSectionLinks.howItWorks },
  { label: "Features", href: homeSectionLinks.features },
  navPricingOrPerks,
  { label: "Terms", href: "/tnc" },
] as const;

/** Hero only — one glance = what we’re building. */
export const heroSkimPoints = [
  "Local events near you (map + list)",
  "Tap to join · free for attendees",
  "Verified hosts · Mumbai first",
] as const;

export const trustStats = [
  { value: "0", unit: "", label: "events hosted" },
  { value: "5", unit: "★", label: "average rating" },
  { value: "1", unit: " cities", label: "and growing" },
  { value: "0", unit: "₹", label: "to attend any event" },
] as const;

export const emotionCards = [
  {
    num: "01",
    title: '"Haan haan, plan karte hain" — and then nothing.',
    description:
      'Everyone says "this Sunday." Then Sunday ends on your phone. You wanted to go. Making it happen was just too hard.',
  },
  {
    num: "02",
    title: "Your city is alive. You're just not seeing it.",
    description:
      "Morning runs, art nights, games down the road — they were always there. You didn't miss them on purpose. No one showed you where.",
  },
  {
    num: "03",
    title: "Not networking. Not swiping. Just people.",
    description:
      "Good talks don't come from forced meetups. They come when two people show up for the same walk, game, or song. Easy after that.",
  },
] as const;

/** Bridge: pain → product (Desire + curiosity) before How it works (Action). */
export const solutionBridgeSection = {
  eyebrow: "So here's the answer",
  headlineLine1: "We built",
  headlineAccent: "VIBO",
  headlineLine2: "for plans that almost happen.",
  body:
    "We put real events near you on one simple list. Tap to join. No long chat that dies before the weekend.",
  sub: "The fun was already out there. We just help you find it.",
  cta: "How it works",
} as const;

/** One skim: problem → product → detail — sits before How it works. */
export const storyBandSection = {
  eyebrow: "Start to finish",
  headlineLine1: "One app.",
  headlineLine2: "From your phone to the live event.",
  steps: [
    {
      title: "See",
      body: "Local events on a map and list — what's on near you.",
    },
    {
      title: "Trust",
      body: "Hosts checked. Reviews from people who actually went.",
    },
    {
      title: "Join",
      body: "One tap. A reminder before it starts.",
    },
    {
      title: "Go",
      body: "Free for you to show up. The rest is offline.",
    },
  ],
} as const;

/** One line each — under shortened Features grid. */
export const featureFootnotes = [
  {
    label: "Paid events",
    text: "Your money stays with us until the event happens.",
  },
  {
    label: "Hosts",
    text: "Three free events every month to start.",
  },
  {
    label: "Soon",
    text: "Wander mode — we pick one nearby event for you.",
  },
] as const;

export const steps = [
  {
    num: 1,
    title: "Open VIBO. See what's around you.",
    description:
      "Nearby events in one feed. Real distance, real host, who's going.",
  },
  {
    num: 2,
    title: "Tap once. You're in.",
    description:
      "No long forms. Tap join, see the group, get a ping before it starts.",
  },
  {
    num: 3,
    title: "Show up. That's the whole plan.",
    description:
      "The good part isn't on the screen. We just get you to the door.",
  },
] as const;

export type PhoneCard = {
  id: number;
  title: string;
  rating: string;
  attendees: string;
  price: string;
  priceHighlight: boolean;
  distance?: string;
  badge?: string;
  badgeColor?: string;
  gradient: string;
};

export type BentoFeature = {
  span: number;
  tag: string | null;
  title: string | null;
  description: string;
  accent: "orange" | "yellow" | null;
  trustBadges: string[] | null;
  stat?: { value: string; label: string };
};

export const bentoFeatures: BentoFeature[] = [
  {
    span: 7,
    tag: "Discovery",
    title: "What's on near you, in one place.",
    description:
      "Sorted by distance and what you like. It learns as you use it.",
    accent: null,
    trustBadges: ["Live near you", "Rated by real attendees"],
  },
  {
    span: 5,
    tag: "Trust",
    title: "Hosts are real people — ID checked.",
    description:
      "Stars come from attendees, not friends. Bad hosts don't stay.",
    accent: "orange",
    trustBadges: null,
  },
  {
    span: 4,
    tag: null,
    title: null,
    description: "We charge hosts for growth tools. Not you for showing up.",
    accent: null,
    stat: { value: "₹0", label: "to attend any event" },
    trustBadges: null,
  },
  {
    span: 8,
    tag: "Community",
    title: "Same crowd, next weekend.",
    description:
      "See people from past events and what they're joining next.",
    accent: "yellow",
    trustBadges: null,
  },
];

export const mapFilters = ["All", "Outdoors", "Creative", "Food", "Social"] as const;

/** Keys for `GET /content?section=pricing` — amounts must not be hardcoded in the UI. */
export type PricingCmsSlot = "host_boost" | "host_unlimited" | "ticketing_fee";

export const PRICING_CMS_KEYS: Record<PricingCmsSlot, string> = {
  host_boost: "pricing.host_boost",
  host_unlimited: "pricing.host_unlimited",
  ticketing_fee: "pricing.ticketing_fee",
};

export type PricingPlanFeature =
  | { text: string; included: boolean }
  | { included: false; cmsSlot: PricingCmsSlot };

export type PricingPlanDef = {
  tier: string;
  /** Shown as headline price when not using CMS. */
  priceLiteral: string | null;
  /** When set, headline price comes from this `product_content` key only. */
  priceCmsKey: string | null;
  priceSuffix: string | null;
  subtitle: string;
  featured: boolean;
  cta: string;
  features: readonly PricingPlanFeature[];
};

export const pricingPlans: readonly PricingPlanDef[] = [
  {
    tier: "Attendee",
    priceLiteral: "Free",
    priceCmsKey: null,
    priceSuffix: null,
    subtitle: "No asterisk. No trial. No catch.",
    featured: true,
    cta: "Get started free",
    features: [
      { text: "Discover all events near you", included: true },
      { text: "Join any free event, anytime", included: true },
      { text: "See who's going before you commit", included: true },
      { text: "Rate and review every experience", included: true },
      { text: "Community page access", included: true },
    ],
  },
  {
    tier: "Host",
    priceLiteral: "Free ",
    priceCmsKey: null,
    priceSuffix: "to start",
    subtitle: "Pay only when you want to grow.",
    featured: false,
    cta: "Start hosting free",
    features: [
      { text: "3 events per month, completely free", included: true },
      { text: "Verified host badge from day one", included: true },
      { text: "Basic attendance and rating stats", included: true },
      { included: false, cmsSlot: "host_boost" },
      { included: false, cmsSlot: "host_unlimited" },
      { included: false, cmsSlot: "ticketing_fee" },
    ],
  },
  // {
  //   tier: "Host Pro",
  //   priceLiteral: null,
  //   priceCmsKey: "pricing.host_pro",
  //   priceSuffix: null,
  //   subtitle: "For hosts serious about building something.",
  //   featured: false,
  //   cta: "Go Pro",
  //   features: [
  //     { text: "Everything in Host, no limits", included: true },
  //     { text: "Deep analytics and reach stats", included: true },
  //     { text: "2 free event boosts every month", included: true },
  //     { text: "Priority verification in 24 hours", included: true },
  //     { text: "First access to every new feature", included: true },
  //     { text: "Direct support — not a ticket queue", included: true },
  //   ],
  // },
];

export const socialProofAvatars = ["AK", "SP", "RN", "MV", "+"] as const;
