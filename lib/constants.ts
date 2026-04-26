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

export const homeSectionLinks = {
  around: "/#around",
  waitlist: "/#wl",
  hostFirst: "/#host-first",
} as const;

export const navLinks = [
  { label: "Events", href: "/events" },
  { label: "Host", href: "/host" },
  { label: "Preview", href: homeSectionLinks.around },
  { label: "Waitlist", href: homeSectionLinks.waitlist },
  { label: "Benefits", href: "/benefits" },
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

/** Bridge: what VIBO is — activities and plans around you. */
export const solutionBridgeSection = {
  eyebrow: "What VIBO is",
  headlineLine1: "Activities, plans, and events",
  headlineAccent: "happening around you",
  headlineLine2: "— or simply host one yourself.",
  body:
    "VIBO is for real-world things near you: runs, games, workshops, meetups. See what others are hosting, join in a tap, or put your own plan out there.",
  sub: "Nearby first. Practical. Built for showing up.",
  cta: "See two paths",
} as const;

export type StoryRouteIconKey =
  | "mobile"
  | "map"
  | "users"
  | "add"
  | "people"
  | "calendar";

export type StoryRouteStep = {
  label: string;
  iconKey: StoryRouteIconKey;
};

/** Start to finish — two illustrated paths (discover vs host). */
export const storyBandSection = {
  eyebrow: "Start to finish",
  headlineLine1: "Discover or host.",
  headlineLine2: "Two simple routes.",
  discover: {
    title: "Discover",
    hook: "Bored on a Saturday evening?",
    steps: [
      { label: "Open VIBO", iconKey: "mobile" },
      { label: "See what's nearby", iconKey: "map" },
      { label: "Join · go", iconKey: "users" },
    ] as const satisfies readonly StoryRouteStep[],
  },
  host: {
    title: "Host",
    hook: "Want a cycling group?",
    steps: [
      { label: "Post a plan", iconKey: "add" },
      { label: "Locals find you", iconKey: "people" },
      { label: "Meet up", iconKey: "calendar" },
    ] as const satisfies readonly StoryRouteStep[],
  },
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
    title: "Open the website. See what's nearby.",
    description:
      "This is an early glimpse of VIBO: real events around you, shown before the app arrives.",
  },
  {
    num: 2,
    title: "Pick a plan. Apply to attend.",
    description:
      "Read the details, log in, and ask to join. Simple enough to try on your phone.",
  },
  {
    num: 3,
    title: "Or host one and see who finds it.",
    description:
      "Post a walk, game, jam, workshop, or tiny meetup. We want to see what people actually like.",
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
    title: "What’s on near you, in one place.",
    description:
      "By distance and what you care about — it gets smarter as you use it.",
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
