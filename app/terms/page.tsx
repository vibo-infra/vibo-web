import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Terms Redirect",
  description: "Redirecting to the VIBO Terms & Conditions page.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/tnc",
  },
};

export default function TermsRedirectPage() {
  redirect("/tnc");
}
