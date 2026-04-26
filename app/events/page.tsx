import type { Metadata } from "next";
import { Suspense } from "react";
import { EventExplorer } from "@/components/events/EventExplorer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse VIBO events, apply to attend, or host your own.",
};

export default function EventsPage() {
  return (
    <Container className="pt-32 pb-20">
      <div className="mb-10 max-w-[760px]">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
          Validate the vibe
        </p>
        <h1 className="mt-4 font-display text-[clamp(42px,7vw,84px)] font-light leading-[0.95] tracking-[-0.06em] text-heading">
          Find a plan. Apply. Show up.
        </h1>
        <p className="mt-6 text-[16px] font-medium leading-relaxed text-body">
          A first look at the VIBO loop: browse real nearby events, sign in,
          and apply to attend.
        </p>
      </div>
      <Suspense fallback={<div className="text-sm font-bold text-muted">Loading events...</div>}>
        <EventExplorer />
      </Suspense>
    </Container>
  );
}
