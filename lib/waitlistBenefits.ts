/**
 * Waitlist perks — aligned with backend `docs/HOSTING_AND_WELCOME_GRANTS.md` and `app_config`.
 * Figures are marketing defaults; product can tune via `app_config` without changing this file.
 */

export const waitlistSparkExplainer = {
  title: "What are Sparks?",
  /** Sentence split so “tokens” can be highlighted in the UI */
  subtitleBefore: "They're ",
  subtitleHighlight: "tokens",
  subtitleAfter:
    " in the app — you spend them on hosting paid listings and on premium features.",
  /** Figure: simple what / use-for */
  whatLabel: "What they are",
  brandName: "Sparks",
  whatSub: "In-app tokens in your balance",
  spendLabel: "What you use them for",
  useHostingTitle: "Hosting",
  useHostingLine: "Publish paid activities (free listings stay free)",
  usePremiumTitle: "Premium",
  usePremiumLine: "Unlock paid extras in the app",
  spendFooter: "Same balance — you choose where to spend.",
} as const;

export const waitlistBenefitsSection = {
  eyebrow: "Waitlist",
  titleLine1: "You joined early.",
  titleEmphasis: "You get extras at launch.",
  lead:
    "Thank-you Sparks land in your account when you first sign in after launch. First 100 on the list get the biggest bundle; everyone else on the waitlist still gets a boost over the standard signup gift.",
} as const;

export const waitlistTop100Spotlight = {
  badge: "First 100",
  free: "",
  headline: "1,030 Sparks + discounted paid hosting for six months.",
  body:
    "Roughly 1,000 thank-you Sparks plus the same ~30 starter Sparks everyone gets. For six months after your bundle is applied, each paid listing you host costs fewer Sparks than the standard rate (configurable in the product).",
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
  {
    privilege: "Sparks · first 100",
    memberGets: "~1,030 total when you first sign in (if you joined the waitlist before creating your account)",
    duration: "Once",
    standardEquivalent: "~30 starter Sparks if you’re not on the waitlist bundle",
  },
  {
    privilege: "Sparks · rest of waitlist",
    memberGets: "~530 total under the same rules",
    duration: "Once",
    standardEquivalent: "~30 starter Sparks",
  },
  {
    privilege: "Paid hosting · welcome",
    memberGets: "Host paid listings with only 20 Spark",
    duration: "Until you use the quota",
    standardEquivalent: "Standard Spark cost per paid listing",
  },
  {
    privilege: "Paid hosting · after quota",
    memberGets: "Standard Spark cost per paid listing (first 100: lower cost for six months while the discount window is active)",
    duration: "Ongoing",
    standardEquivalent: "Same for everyone at public rates",
  },
  {
    privilege: "Nice extras",
    memberGets: "New features early; priority help when we offer it",
    duration: "As announced by email",
    standardEquivalent: "Normal rollout",
  },
] as const;

export const waitlistPrivilegesHeading = {
  title: "Your waitlist perks",
  subtitle: "Exact numbers and windows are controlled in the product — this page is the intent, not a legal guarantee.",
} as const;

export const waitlistStayInTouch =
  "We email you at launch and when major perks change. Read the latest in-app or on your account after you sign in.";

export const waitlistBenefitsCta = {
  label: "Join the waitlist",
  helper: "Earlier signup position can mean a larger thank-you — same list for everyone.",
} as const;
