import type { Metadata } from "next";
import { HostEventForm } from "@/components/events/HostEventForm";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Host a Local Event",
  description:
    "Create a simple local event on VIBO and let nearby people discover, apply, and show up.",
  alternates: { canonical: `${siteConfig.url}/host` },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Host a Local Event | VIBO",
    description:
      "Publish a local plan on VIBO and see if nearby people want to join.",
    url: `${siteConfig.url}/host`,
    type: "website",
    images: [siteConfig.ogImage],
  },
};

export default function HostPage() {
  return (
    <Container className="pt-32 pb-20">
      <div className="mb-10 max-w-[760px]">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
          Host on web
        </p>
        <h1 className="mt-4 font-display text-[clamp(42px,7vw,84px)] font-light leading-[0.95] tracking-[-0.06em] text-heading">
          Put a plan out there.
        </h1>
        <p className="mt-6 text-[16px] font-medium leading-relaxed text-body">
          Create a simple event, publish it, and see if people nearby want in.
          No heavy dashboard yet, just the core hosting idea.
        </p>
      </div>
      <HostEventForm />
    </Container>
  );
}
