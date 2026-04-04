/**
 * Closing band under FAQ — no waitlist form; apps coming soon.
 */

export const closingSection = {
  titleLine1: "Your next favourite memory",
  titleLine2: "is 2km away.",
  body:
    "VIBO will be on the App Store and Google Play. We’re still building the apps.",
  /** Shown under the main paragraph — waitlist → email at launch. */
  waitlistEmailNote:
    "If you’re on the waitlist, we’ll email you as soon as you can download. No need to keep checking the stores.",
  storesEyebrow: "Coming to",
  apple: { name: "App Store", status: "Coming soon" },
  google: { name: "Google Play", status: "Coming soon" },
} as const;
