export const siteConfig = {
  name: "VIBO",
  tagline: "Find your people. Show up. Live it.",
  description:
    "Discover local events, meet real people, and build community. VIBO connects you to hikes, workshops, jam sessions, and more happening near you.",
  url: "https://vibo.app",
  email: "hello@vibo.in",
  ogImage: "/og-image.png",
} as const;

export const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#feat" },
  { label: "Pricing", href: "#price" },
  { label: "Terms", href: "/terms" },
] as const;

export const trustStats = [
  { value: "2,400", unit: "+", label: "events hosted" },
  { value: "4.8", unit: "★", label: "average rating" },
  { value: "12", unit: " cities", label: "and growing" },
  { value: "0", unit: "₹", label: "to attend any event" },
] as const;

export const emotionCards = [
  {
    num: "01",
    title: "Plans that never quite happen",
    description:
      'You say "we should do something" every week. Then Sunday comes and you\'re back on the couch. Not because you don\'t want to — but because no one made it easy.',
  },
  {
    num: "02",
    title: "A city full of things you've never found",
    description:
      "There's a ceramics workshop two streets away. A sunrise hike leaving tomorrow at 6am. A book club that actually reads the book. You just didn't know where to look.",
  },
  {
    num: "03",
    title: "Meeting people who get it",
    description:
      "Not networking. Not dating. Just the easy, low-stakes kind of connection that happens when you show up for the same thing. The kind that used to happen naturally.",
  },
] as const;

export const steps = [
  {
    num: 1,
    title: "Open VIBO wherever you are.",
    description:
      "Your feed shows what's happening nearby — filtered to the things you care about. Real events, real distances, real people hosting them.",
  },
  {
    num: 2,
    title: "Tap once. You're in.",
    description:
      "No lengthy flows, no approval limbo. Tap Join, see who else is going, get a reminder before it starts.",
  },
  {
    num: 3,
    title: "Show up. The rest takes care of itself.",
    description:
      "The best part of every event isn't on the app. VIBO just gets you to the door — what happens after is yours.",
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

export const phoneCards: PhoneCard[] = [
  {
    id: 1,
    title: "Morning Hike — Sanjay Gandhi Park",
    rating: "4.9",
    attendees: "12 going",
    price: "Free",
    priceHighlight: true,
    distance: "2.1km",
    gradient: "from-accent-dim to-highlight-dim",
  },
  {
    id: 2,
    title: "Pottery for Beginners · Bandra",
    rating: "4.8",
    attendees: "8/15 spots",
    price: "Free",
    priceHighlight: false,
    badge: "✓ Verified",
    badgeColor: "#00B4A0",
    gradient: "from-highlight-dim to-[rgba(0,180,160,0.1)]",
  },
];

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
    title: "Everything good that's happening near you.",
    description:
      "Events ranked by proximity, your interests, and honest attendee ratings. The more you use VIBO, the better it understands what a good evening looks like for you.",
    accent: null,
    trustBadges: ["Live near you", "Rated by real attendees"],
  },
  {
    span: 5,
    tag: "Trust",
    title: "Every host is a real person with a real reputation.",
    description:
      "Government ID verified. Ratings built from real attendees. A host who ghosts gets removed. Permanently.",
    accent: "orange",
    trustBadges: null,
  },
  {
    span: 4,
    tag: null,
    title: null,
    description:
      "Showing up costs nothing. We charge hosts for growth tools — never attendees for existing.",
    accent: null,
    stat: { value: "₹0", label: "to attend any event" },
    trustBadges: null,
  },
  {
    span: 8,
    tag: "Community",
    title: "The people you meet become your community.",
    description:
      "Every event you attend adds a group to your life — people who showed up for the same reason you did. See what they're going to next.",
    accent: "yellow",
    trustBadges: null,
  },
];

export const bentoBottomFeatures = [
  {
    tag: "Safety",
    title: "Payments held in escrow",
    description:
      "For paid events, your money sits with the platform — not the host — until the event is confirmed complete. If it doesn't happen, you're refunded automatically.",
  },
  {
    tag: "Hosts",
    title: "Host 3 events free, every month",
    description:
      "No upfront cost to start hosting. Create an event, invite people, build a reputation. Pay only when you want more reach.",
  },
  {
    tag: "Coming soon",
    title: "Wander Mode",
    description:
      "Open the app. Let it surprise you. One event, picked for you, happening nearby. For days when you don't want to decide — you just want to go.",
  },
] as const;

export const mapPins = [
  {
    left: "22%",
    top: "35%",
    color: "orange" as const,
    title: "Morning Hike — Sanjay Gandhi",
    meta: ["★ 4.9", "12 going", "2.1km"],
  },
  {
    left: "48%",
    top: "55%",
    color: "teal" as const,
    title: "Pottery for Beginners · Bandra",
    meta: ["★ 4.8", "8/15 spots", "Verified"],
  },
  {
    left: "65%",
    top: "42%",
    color: "orange" as const,
    title: "Board Game Night · Colaba",
    meta: ["★ 4.7", "6 going", "Tomorrow"],
  },
  {
    left: "35%",
    top: "68%",
    color: "orange" as const,
    title: "Rooftop Sketch Session",
    meta: ["★ 5.0", "4 going", "3.5km"],
  },
  {
    left: "75%",
    top: "65%",
    color: "teal" as const,
    title: "Community Run · Carter Road",
    meta: ["★ 4.9", "23 going", "6am"],
  },
  {
    left: "55%",
    top: "28%",
    color: "orange" as const,
    title: "Sourdough Baking Workshop",
    meta: ["★ 4.8", "₹499", "6 spots left"],
  },
] as const;

export const mapFilters = ["All", "Outdoors", "Creative", "Food", "Social"] as const;

export const pricingPlans = [
  {
    tier: "Attendee",
    price: "Free",
    priceSuffix: null,
    subtitle: "No asterisk. No trial. Forever.",
    featured: false,
    cta: "Get started free",
    features: [
      { text: "Discover all events near you", included: true },
      { text: "Join any free event, anytime", included: true },
      { text: "See who's going before committing", included: true },
      { text: "Rate and review experiences", included: true },
      { text: "Community page access", included: true },
    ],
  },
  {
    tier: "Host",
    price: "Free",
    priceSuffix: "to start",
    subtitle: "Pay only to grow your reach.",
    featured: true,
    cta: "Start hosting free",
    features: [
      { text: "3 events per month, free", included: true },
      { text: "Verified host badge from day one", included: true },
      { text: "Basic attendance and rating stats", included: true },
      { text: "Event Boost from ₹199 / event", included: false },
      { text: "Unlimited events from ₹499 / mo", included: false },
      { text: "Ticketing — 6% per ticket sold", included: false },
    ],
  },
  {
    tier: "Host Pro",
    price: "₹999",
    priceSuffix: "/mo",
    subtitle: "For hosts serious about their community.",
    featured: false,
    cta: "Go Pro",
    features: [
      { text: "Everything in Host, no limits", included: true },
      { text: "Deep analytics and reach stats", included: true },
      { text: "2 free event boosts per month", included: true },
      { text: "Priority verification — 24hr", included: true },
      { text: "First access to every new feature", included: true },
      { text: "Direct support, not a ticket queue", included: true },
    ],
  },
] as const;

export type FaqItem = {
  question: string;
  answer: string;
  hasLink?: boolean;
  linkText?: string;
  linkHref?: string;
  answerSuffix?: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Is VIBO actually free for attendees?",
    answer:
      "Yes, genuinely. No trial, no 'free tier with limitations'. Discovering events, joining free events, seeing who's going, rating and reviewing — all free, forever. We make money from hosts who want to grow, not from people who just want to show up.",
  },
  {
    question: "How do I know a host is trustworthy?",
    answer:
      "Every host who runs paid events goes through real ID verification. Their trust score is built from real attendee ratings — visible to anyone. A host who ghosts an event gets permanently removed. We take this seriously because the whole thing only works if you feel safe showing up.",
  },
  {
    question: "What happens to my money if a paid event falls apart?",
    answer:
      "Your payment is held in escrow — with us, not the host — until the event is confirmed complete. If it doesn't happen, your full refund is automatic within 5–7 business days. You don't have to chase anyone.",
  },
  {
    question: "I've never hosted before. Is this for me?",
    answer:
      "Especially for you. You don't need experience, a following, or a budget. If you have an idea and a time slot, VIBO handles discovery and participants. Start small. See what happens.",
  },
  {
    question: "Which cities is VIBO in right now?",
    answer:
      "We're starting with Mumbai and expanding city by city — carefully, not everywhere at once.",
    hasLink: true,
    linkText: "Join the early access list",
    linkHref: "#waitlist",
    answerSuffix: " and we'll email you the moment we open in your city.",
  },
  {
    question: "What do you do with my personal data?",
    answer:
      "Less than you'd expect. Your location shows you nearby events — never shared with hosts or other attendees. Verification documents are discarded after confirmation. We don't sell data. We don't run ads. VIBO exists to connect people, not monetise their attention.",
  },
];

export type TncSection = {
  title: string;
  content: string;
  callout?: string;
  contentAfter?: string;
  email?: string;
};

export const tncSections: TncSection[] = [
  {
    title: "Who we are",
    content:
      "VIBO is a platform that helps people discover and attend local, in-person events. We connect attendees and hosts. We are not the organiser of any event listed on the platform — that's always the host.",
  },
  {
    title: "What you're agreeing to",
    content:
      "By creating an account, you confirm you're 18 or older, you'll provide accurate information, and you'll use VIBO in good faith. That's the foundation everything else is built on.",
  },
  {
    title: "Your account",
    content:
      "You're responsible for your account. Don't share credentials, don't impersonate others, and keep your contact info current. If something looks wrong, tell us immediately at hello@vibo.in.",
  },
  {
    title: "Hosting events",
    content:
      "Hosts are independent organisers. You own your event — VIBO provides the platform, not the venue, insurance, or staffing. You are responsible for what happens at your event.",
    callout:
      "By hosting a paid event, you agree to our escrow payout policy: funds are held by the platform and released 48 hours after the event is confirmed complete, with no active disputes.",
  },
  {
    title: "Attending events",
    content:
      "You agree to treat hosts and fellow attendees with respect. Events are real-world experiences — behave as you would want others to behave toward you. VIBO has a zero-tolerance policy for harassment at events.",
  },
  {
    title: "Payments and refunds",
    content:
      "For paid events: your payment is held in escrow until the event is confirmed complete.",
    callout:
      "If the host cancels or the event doesn't happen, you receive a full automatic refund within 5–7 business days. You don't have to ask for it.",
    contentAfter:
      "Platform fees, where applicable, are non-refundable once the event has taken place.",
  },
  {
    title: "Verification and safety",
    content:
      "Identity verification builds trust. Verified hosts have confirmed their identity with a government-issued document. Verification does not guarantee the quality or safety of any event — always exercise personal judgment. Verification documents are processed and discarded after approval. We do not store them.",
  },
  {
    title: "Content you post",
    content:
      "Reviews, ratings, and profile content remain yours. You grant VIBO a non-exclusive licence to display them on the platform. Don't post anything false, harmful, or that you don't have the right to share.",
  },
  {
    title: "What we don't guarantee",
    content:
      "We work hard to keep VIBO reliable and safe, but we can't guarantee that every event will be exactly as described, that the platform will be available 100% of the time, or that every host will be perfect. We do guarantee that we'll act in good faith and fix problems when they arise.",
  },
  {
    title: "How to reach us",
    content: "For anything — complaints, questions, or ideas — email us at",
    email: "hello@vibo.in",
    contentAfter: "We read every message.",
  },
];

export const socialProofAvatars = ["AK", "SP", "RN", "MV", "+"] as const;
