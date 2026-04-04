"use client";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import { solutionBridgeSection } from "@/lib/constants";

export function SolutionBridgeSection() {
  const { eyebrow, headlineLine1, headlineAccent, headlineLine2, body, sub, cta } =
    solutionBridgeSection;

  return (
    <section
      className="border-t border-line bg-page py-[100px]"
      aria-labelledby="solution-bridge-heading"
    >
      <Container>
        <SectionEyebrow text={eyebrow} />
        <FadeIn>
          <h2
            id="solution-bridge-heading"
            className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading"
          >
            {headlineLine1}{" "}
            <em className="font-light not-italic text-accent">{headlineAccent}</em>
            <br />
            {headlineLine2}
          </h2>
        </FadeIn>

        <FadeIn delay={0.06}>
          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-body">
            {body}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 max-w-[520px] text-sm font-light leading-relaxed text-muted">
            {sub}
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <a
            href="#how"
            className="group mt-10 inline-flex items-center gap-2 border-b border-transparent font-body text-sm font-medium text-accent transition-colors hover:border-accent hover:text-heading"
          >
            {cta}
            <span
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </a>
        </FadeIn>
      </Container>
    </section>
  );
}
