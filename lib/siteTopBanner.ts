import { siteConfig } from "@/lib/constants";

/**
 * Site-wide messaging: optional strip under the nav.
 *
 * - `enabled`: fixed strip (pushes content). `false` = no strip (Hero uses default top padding).
 * - `variant: "countdown"` + `countdownUntil` only applies when the strip is enabled.
 */
export type SiteTopBannerVariant = "notice" | "countdown" | "urgent" | "info";

export type SiteTopBannerCTA = {
  label: string;
  /** Use `mailto:…`, `tel:…`, or a path like `/blog/post` */
  href: string;
};

export type SiteTopBannerConfig = {
  /** Fixed strip under the navbar. When false, no layout gap. */
  enabled: boolean;
  variant: SiteTopBannerVariant;
  /**
   * Short note so people don’t read this strip as product / app / waitlist content.
   * Shown in a dashed “aside” above the rest of the banner.
   */
  visitorContext?: string;
  /** Small pill on the left, e.g. role type */
  badge?: string;
  /** Main line — keep short on mobile */
  title: string;
  /** Optional supporting line */
  description?: string;
  cta?: SiteTopBannerCTA;
  /** ISO 8601 date-time (e.g. `2026-06-01T18:00:00+05:30`) — used when `variant === "countdown"` */
  countdownUntil?: string;
};

export const siteTopBannerConfig: SiteTopBannerConfig = {
  enabled: false,
  variant: "info",
  visitorContext:
    "This is about our own weekend events in Mumbai and who we're looking for to help spread the word — not the VIBO app, waitlist, or the rest of this site.",
  badge: "Knead the word out",
  title:
    "We're building small weekend events in Mumbai — need someone who knows how to get people talking 👀",
  description:
    "Help us shape the vibe and spread the word. No money (yet) — just dough: pizza, shoutouts, and good stories first.",
  cta: {
    label: "Toss your toppings in",
    href: `mailto:${siteConfig.email}?subject=Weekend%20events%20%2B%20comms%20%2F%20PR`,
  },
};
