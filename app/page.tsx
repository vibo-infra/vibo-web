import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { EmotionSection } from "@/components/sections/EmotionSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { MapSection } from "@/components/sections/MapSection";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <EmotionSection />
      <HowItWorks />
      <Features />
      <MapSection />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
