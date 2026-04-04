/** Production site — canonical URLs, OG, JSON-LD */
export const siteConfig = {
  name: "VIBO",
  tagline: "Good vibes happen nearby.",
  description:
    "Discover local events, meet real people, and build community. VIBO connects you to hikes, workshops, jam sessions, and more happening near you.",
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
      'You say it every week. Your friends say it back. Somebody says "this Sunday for sure" and then Sunday disappears into a phone screen and leftover dal. Not because you don\'t want to go out — but because no one ever made it easy to actually go.',
  },
  {
    num: "02",
    title: "Your city is alive. You're just not seeing it.",
    description:
      "There's a group doing a 6am run near Carter Road. A rooftop sketch session in Bandra this Saturday. A board game night two lanes from your house — every Thursday. You didn't know because no one told you where to look.",
  },
  {
    num: "03",
    title: "Not networking. Not swiping. Just people.",
    description:
      "The best conversations don't happen at corporate mixers. They happen when two strangers show up for the same thing — a trail, a table, a song. VIBO is just the reason to show up. The connection happens on its own.",
  },
] as const;

export const steps = [
  {
    num: 1,
    title: "Open VIBO. See what's around you.",
    description:
      "Your feed shows real events happening nearby — filtered to what you actually care about. Real distances, real hosts, real people going.",
  },
  {
    num: 2,
    title: "Tap once. You're in.",
    description:
      "No long forms. No waiting for approval. Tap Join, see who else is going, get a reminder before it starts. Done.",
  },
  {
    num: 3,
    title: "Show up. That's the whole plan.",
    description:
      "The best part of any event isn't on the screen. VIBO just handles the 'how to get there' — everything after is yours to keep.",
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
    title: "Everything good happening near you — finally in one place.",
    description:
      "Events ranked by how close they are, what you enjoy, and what real attendees thought. The more you use VIBO, the sharper it gets at knowing what a good evening looks like for you.",
    accent: null,
    trustBadges: ["Live near you", "Rated by real attendees"],
  },
  {
    span: 5,
    tag: "Trust",
    title: "Every host is a real person with a real reputation on the line.",
    description:
      "Government ID verified. Ratings earned from actual attendees — not friends. A host who cancels last minute or ghosts the group gets removed. Permanently. No second chances.",
    accent: "orange",
    trustBadges: null,
  },
  {
    span: 4,
    tag: null,
    title: null,
    description:
      "Showing up costs nothing — ever. We charge hosts for tools that help them grow. Never attendees for simply existing.",
    accent: null,
    stat: { value: "₹0", label: "to attend any event" },
    trustBadges: null,
  },
  {
    span: 8,
    tag: "Community",
    title: "The people you meet once become the ones you keep going back out with.",
    description:
      "Every event you attend adds a small group to your life — people who showed up for the same reason you did. See what they're going to next.",
    accent: "yellow",
    trustBadges: null,
  },
];

export const bentoBottomFeatures = [
  {
    tag: "Safety",
    title: "Your money doesn't move until the event actually happens.",
    description:
      "For paid events, your payment sits with us — not the host — until the event is confirmed done. If it gets cancelled or doesn't happen, you're refunded automatically. No chasing, no drama.",
  },
  {
    tag: "Hosts",
    title: "Host 3 events free, every month.",
    description:
      "No cost to start. Create an event, invite people, build a name for yourself. Pay only when you want more reach — not before.",
  },
  {
    tag: "Coming soon",
    title: "Wander Mode",
    description:
      "Open the app. Let it decide. One event, picked just for you, happening close by. For days when you don't want to think — you just want to get out.",
  },
] as const;

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
