import type { Metadata } from "next";
import { WaitlistBenefits } from "@/components/sections/WaitlistBenefits";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "VIBO Sparks and Waitlist Benefits",
  description:
    "See VIBO Sparks, waitlist rewards, and early benefits for people joining or hosting before the app launches.",
  alternates: { canonical: `${siteConfig.url}/benefits` },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VIBO Sparks and Waitlist Benefits",
    description:
      "Explore waitlist rewards, Sparks, and early host benefits on VIBO.",
    url: `${siteConfig.url}/benefits`,
    type: "website",
    images: [siteConfig.ogImage],
  },
};

export default function BenefitsPage() {
  return (
    <div className="pt-16">
      <WaitlistBenefits />
    </div>
  );
}
