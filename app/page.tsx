import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { SolutionBridgeSection } from "@/components/sections/SolutionBridgeSection";
import { StoryBandSection } from "@/components/sections/StoryBandSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { MapSection } from "@/components/sections/MapSection";
import { Pricing } from "@/components/sections/Pricing";
import { WaitlistBenefits } from "@/components/sections/WaitlistBenefits";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SHOW_PRICING_SECTION, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  description: siteConfig.description,
  keywords: [
    "local events in Mumbai",
    "discover local events",
    "things to do near me",
    "community events app",
    "social events Mumbai",
    "VIBO",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <MapSection />
      <WaitlistSection />
      <SolutionBridgeSection />
      <StoryBandSection />
      <HowItWorks />
      <Features />
      {SHOW_PRICING_SECTION ? <Pricing /> : <WaitlistBenefits />}
      <FAQ />
      <FinalCTA />
    </>
  );
}
