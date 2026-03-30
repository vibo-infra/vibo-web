import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/constants";
import { TncFromApi } from "./TncFromApi";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read VIBO's Terms & Conditions, including attendee, host, payment, refund, and platform usage policies.",
  keywords: [
    "VIBO terms and conditions",
    "VIBO refund policy",
    "VIBO host terms",
    "VIBO attendee terms",
  ],
  alternates: { canonical: `${siteConfig.url}/tnc` },
  openGraph: {
    title: "Terms & Conditions | VIBO",
    description:
      "Read VIBO's Terms & Conditions, including attendee, host, payment, refund, and platform usage policies.",
    url: `${siteConfig.url}/tnc`,
    type: "article",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "VIBO Terms & Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | VIBO",
    description:
      "Read VIBO's Terms & Conditions, including attendee, host, payment, refund, and platform usage policies.",
    images: [siteConfig.ogImage],
  },
};

export default function TncPage() {
  return (
    <Container>
      <div className="mx-auto max-w-[720px] pt-[120px] pb-20">
        <TncFromApi />
      </div>
    </Container>
  );
}
