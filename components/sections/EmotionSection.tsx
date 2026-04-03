"use client";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { emotionCards } from "@/lib/constants";

export function EmotionSection() {
  return (
    <section className="bg-surface py-[100px]">
      <Container>
        <SectionEyebrow text="Sound familiar?" />
        <FadeIn>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
            You already know
            <br />
            this feeling.
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-card border border-line bg-line max-md:grid-cols-1">
          {emotionCards.map((card) => (
            <StaggerItem key={card.num}>
              <div className="group bg-surface p-10 transition-colors max-md:p-8 hover:bg-page">
                <div className="mb-5 font-display text-[56px] font-light leading-none text-line-strong transition-colors group-hover:text-accent">
                  {card.num}
                </div>
                <h3 className="mb-2.5 font-body text-base font-medium text-heading">
                  {card.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-body">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
