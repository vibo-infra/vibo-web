"use client";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { storyBandSection } from "@/lib/constants";

export function StoryBandSection() {
  const { eyebrow, headlineLine1, headlineLine2, steps } = storyBandSection;

  return (
    <section
      className="border-y border-line bg-gradient-to-b from-surface-alt/90 via-page to-page py-[72px] md:py-[88px]"
      aria-labelledby="story-band-heading"
    >
      <Container>
        <SectionEyebrow text={eyebrow} />
        <FadeIn>
          <h2
            id="story-band-heading"
            className="font-display text-[clamp(28px,3.6vw,44px)] font-light leading-[1.15] tracking-tight text-heading"
          >
            {headlineLine1}
            <br />
            {headlineLine2}
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="flex gap-4 border-l-2 border-accent/25 pl-4 lg:border-l-0 lg:pl-0">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-page font-display text-sm text-heading"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-body text-base font-semibold text-heading">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-body">
                    {step.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
