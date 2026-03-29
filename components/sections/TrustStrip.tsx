"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { trustStats } from "@/lib/constants";

export function TrustStrip() {
  return (
    <FadeIn>
      <div className="border-t border-b border-line bg-surface py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-16">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-[32px] font-light leading-none text-heading">
                  {stat.value}
                  <span className="text-lg text-accent">{stat.unit}</span>
                </div>
                <div className="mt-1 text-xs text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </FadeIn>
  );
}
