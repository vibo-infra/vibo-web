import type { Metadata } from "next";
import { WaitlistBenefits } from "@/components/sections/WaitlistBenefits";

export const metadata: Metadata = {
  title: "Sparks and Benefits",
  description: "See VIBO waitlist benefits, Sparks, and early host perks.",
};

export default function BenefitsPage() {
  return (
    <div className="pt-16">
      <WaitlistBenefits />
    </div>
  );
}
