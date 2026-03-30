import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { EmotionSection } from "@/components/sections/EmotionSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { MapSection } from "@/components/sections/MapSection";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  fetchContentTrustBarServer,
  fetchContentPricingServer,
  fetchNearbyEventsServer,
} from "@/lib/api/services/webApi";
import { siteConfig } from "@/lib/constants";

export const revalidate = 60;

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

export default async function HomePage() {
  const [trustContent, pricingContent, nearbyEvents] = await Promise.all([
    fetchContentTrustBarServer(),
    fetchContentPricingServer(),
    fetchNearbyEventsServer(),
  ]);

  return (
    <>
      <Hero />
      <TrustStrip content={trustContent} />
      <EmotionSection />
      <HowItWorks previewEvents={nearbyEvents} />
      <Features />
      <MapSection initialEvents={nearbyEvents} />
      <Pricing content={pricingContent} />
      <FAQ />
      <FinalCTA />
    </>
  );
}
