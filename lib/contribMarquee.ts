import { siteConfig } from "@/lib/constants";

/**
 * Thin marquee under the navbar — comms / contribute CTA (not product copy).
 * Toggle `enabled` or bump `storageKey` to reset dismiss state for everyone.
 */
export type ContribMarqueeConfig = {
  enabled: boolean;
  /** sessionStorage — hide until new session after dismiss */
  storageKey: string;
  /** Leads the scrolling line */
  hook: string;
  /** Runs after hook (same line, looped) */
  tail: string;
  mailtoHref: string;
};

export const contribMarqueeConfig: ContribMarqueeConfig = {
  enabled: true,
  storageKey: "vibo_contrib_marquee_v2",
  hook: "Wanna contribute?",
  tail: "Looking to host a few small weekend events — need a mind to help us plan, post, and get people talking. No salary yet; paid in pizzas 🍕 + good stories. Tap here to email ",
  mailtoHref: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Weekend events + comms / PR")}`,
};
