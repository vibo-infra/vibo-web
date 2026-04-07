/**
 * Waitlist perks — Sparks for everyone; table mostly host extras.
 */

export const waitlistSparkExplainer = {
  title: "What are Sparks?",
  /** Sentence split so “tokens” can be highlighted in the UI */
  subtitleBefore: "They're ",
  subtitleHighlight: "tokens",
  subtitleAfter:
    " in the app — you spend them on hosting and on premium features.",
  /** Figure: simple what / use-for */
  whatLabel: "What they are",
  brandName: "Sparks",
  whatSub: "In-app tokens in your balance",
  spendLabel: "What you use them for",
  useHostingTitle: "Hosting",
  useHostingLine: "Post & boost your activities",
  usePremiumTitle: "Premium",
  usePremiumLine: "Unlock paid extras in the app",
  spendFooter: "Same balance — you choose where to spend.",
} as const;

export const waitlistBenefitsSection = {
  eyebrow: "Waitlist",
  titleLine1: "You joined early.",
  titleEmphasis: "You get extras at launch.",
  lead:
    "For joining early, we’ve set aside real thank-yous — Sparks (see below) and, if you host, the perks listed here. Your Sparks will be ready in your account when we go live.",
} as const;

export const waitlistTop100Spotlight = {
  badge: "First 100",
  free: "Free ",
  headline: " 1,000 Sparks from us — your first year.",
  body:
    "On top of the 30 sparks everyone gets, the first 100 on the waitlist get this extra gift from us for a year after launch. Full details when we're live.",
} as const;

export type WaitlistPrivilegeRow = {
  privilege: string;
  memberGets: string;
  duration: string;
  standardEquivalent: string;
};

export const waitlistPrivilegeTableHeaders = {
  privilege: "Perk",
  memberGets: "You get",
  duration: "How long",
  standardEquivalent: "Others later",
} as const;

export const waitlistPrivilegeRows: readonly WaitlistPrivilegeRow[] = [
  // {
  //   privilege: "Sparks (everyone)",
  //   memberGets: "100 when you first open the app after launch",
  //   duration: "Once",
  //   standardEquivalent: "30 free Sparks for signing up",
  // },
  {
    privilege: "Hosting · your events",
    memberGets: "Post as many events as you want",
    duration: "First 3 months after launch",
    standardEquivalent: "3 events per month",
  },
  {
    privilege: "Hosting · promos & stats",
    memberGets: "Full promos (3/mo) + all stats",
    duration: "First 3 months",
    standardEquivalent: "Pay Sparks · basic stats",
  },
  {
    privilege: "Paid plans (when live)",
    memberGets: "30% off your first year",
    duration: "As long as you keep your account",
    standardEquivalent: "Full price",
  },
  {
    privilege: "Nice extras",
    memberGets: "New features ~4 weeks early; priority email help",
    duration: "Priority help: 3 months · early features: ongoing",
    standardEquivalent: "Normal",
  },
] as const;

export const waitlistPrivilegesHeading = {
  title: "Your waitlist perks",
  subtitle: "What you get, how long it lasts, and what changes later for everyone else.",
} as const;

export const waitlistStayInTouch =
  "We email you at launch and again before some perks wind down. This page stays online for anyone to read.";

export const waitlistBenefitsCta = {
  label: "Join the waitlist",
  helper: "Same waitlist for everyone — earlier often means more thank-you perks.",
} as const;
