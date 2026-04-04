/**
 * Copy for the waitlist perks section — keep wording plain and short.
 * Edit here; the UI imports these exports.
 */

/** One-line Spark explainer — shown up front so “Sparks” isn’t jargon. */
export const waitlistSparkExplainer = {
  title: "What’s a Spark?",
  body:
    "Sparks are credits inside the VIBO app. Hosts use them for things like boosting an event or extra tools — like points you spend in the app instead of paying for each small add-on.",
} as const;

export const waitlistBenefitsSection = {
  eyebrow: "Waitlist",
  titleLine1: "You joined before the app was live.",
  titleEmphasis: "That matters to us.",
  /** Text before the highlighted word “Sparks”. */
  introBeforeSpark:
    "You signed up early. So instead of just a thank-you email, you get real, usable benefits from day one — including ",
  /** Highlighted in the UI (in-app credits). */
  introSparkWord: "Sparks",
  /** Text after the highlighted word. */
  introAfterSpark: " waiting in your account.",
  closingBeforeSpark: "When we launch, you’ll see it in the app and in your ",
  closingSparkWord: "Sparks",
  closingAfterSpark: " balance.",
} as const;

export const waitlistTop100Spotlight = {
  badge: "First 100 in line",
  headline: "1,000 Sparks from us for your first year.",
  body:
    "The first 100 people on the waitlist get 1,000 Sparks of value from VIBO for one full year after launch. A direct thank-you for believing in us before day one.",
  microcopy: "One gift per qualifying account · Full details at launch",
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
    privilege: "Sparks on launch day",
    memberGets: "50 Sparks added the day the app goes live",
    duration: "Once",
    standardEquivalent: "0 Sparks when you sign up",
  },
  {
    privilege: "List all your events",
    memberGets: "Post as many events as you want — no 3-event limit",
    duration: "First 6 months after launch",
    standardEquivalent: "3 events per month",
  },
  {
    privilege: "All boost types",
    memberGets: "Every boost type included — 3 boosts per month free",
    duration: "First 6 months",
    standardEquivalent: "Pay Sparks per boost",
  },
  {
    privilege: "Full stats",
    memberGets: "Full dashboard with all reports",
    duration: "First 6 months",
    standardEquivalent: "Basic stats only",
  },
  {
    privilege: "Paid tickets for hosts",
    memberGets: "Unlock in month 4 instead of month 7",
    duration: "Unlocked for good once you get it",
    standardEquivalent: "Month 7 or later for most",
  },
  {
    privilege: "Locked-in discount",
    memberGets: "When paid plans go live: 30% off your first year",
    duration: "For as long as you keep your account",
    standardEquivalent: "Full price",
  },
  {
    privilege: "New features first",
    memberGets: "Try new features 4 weeks before everyone else",
    duration: "Keeps going",
    standardEquivalent: "Same day as public launch",
  },
  {
    privilege: "Faster help",
    memberGets: "Priority email when you need support",
    duration: "First 6 months",
    standardEquivalent: "Normal queue",
  },
] as const;

export const waitlistPrivilegesHeading = {
  title: "Your waitlist perks",
  subtitle: "What you get, how long it lasts, and what changes later for everyone else.",
} as const;

export const waitlistNotificationsSection = {
  title: "How we’ll stay in touch",
} as const;

export type WaitlistNotificationItem = {
  id: string;
  title: string;
  description: string;
};

export const waitlistNotificationItems: readonly WaitlistNotificationItem[] =
  [
    {
      id: "1",
      title: "Launch email",
      description:
        "We email you when we launch and list exactly what you received, with a link to see your 50 Sparks in the app.",
    },
    {
      id: "2",
      title: "First time you open the app",
      description:
        "A welcome screen with your name, early-member status, and a simple list of what’s active for the next six months.",
    },
    {
      id: "3",
      title: "This page",
      description:
        "Anyone can read what early members get — so friends know why joining the waitlist still helps before launch.",
    },
    {
      id: "4",
      title: "Reminder in month 5",
      description:
        "A heads-up before some perks wind down: what stops, what stays, and what happens next — so nothing feels sudden.",
    },
  ] as const;

export const waitlistBenefitsCta = {
  label: "Join the waitlist",
  helper:
    "Same waitlist for everyone — earlier often means more thank-you perks.",
} as const;
