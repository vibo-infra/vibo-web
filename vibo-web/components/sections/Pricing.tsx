"use client";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { pricingPlans } from "@/lib/constants";

export function Pricing() {
  const scrollToWaitlist = () => {
    const el = document.getElementById("wl");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    const input = document.getElementById("emailInput") as HTMLInputElement | null;
    if (input) input.focus();
  };

  return (
    <section id="price" className="bg-surface py-[108px]">
      <Container>
        <SectionEyebrow text="Pricing" />
        <FadeIn>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
            Honest pricing.
            <br />
            <em className="font-light">Pay only for what you need.</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-3 max-w-[540px] text-base font-light leading-relaxed text-body">
            Showing up to events is free, forever. We charge hosts only when
            they want more tools and reach.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.tier}>
              <div
                className={`relative rounded-card border p-8 transition-all hover:-translate-y-1 ${
                  plan.featured
                    ? "border-accent bg-page"
                    : "border-line bg-surface"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                    Most popular
                  </div>
                )}

                <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                  {plan.tier}
                </div>

                <div className="mb-1.5 font-display text-[44px] font-light leading-none text-heading">
                  {plan.price}
                  {plan.priceSuffix && (
                    <span className="text-lg text-muted">
                      {plan.priceSuffix}
                    </span>
                  )}
                </div>

                <div className="mb-6 text-[13px] text-muted">
                  {plan.subtitle}
                </div>

                <ul className="mb-7">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex gap-2.5 border-b border-line py-[7px] text-sm font-light text-body last:border-b-0"
                    >
                      <span
                        className={`mt-px shrink-0 text-xs ${
                          feature.included ? "text-accent" : "text-faint"
                        }`}
                      >
                        {feature.included ? "✓" : "—"}
                      </span>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToWaitlist}
                  className={`h-11 w-full cursor-pointer rounded-lg font-body text-sm font-medium transition-all ${
                    plan.featured
                      ? "border border-accent bg-accent text-white hover:opacity-90"
                      : "border border-line-strong bg-transparent text-heading hover:bg-surface-alt"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.2}>
          <p className="mt-5 text-center text-[13px] text-muted">
            Prices in INR. GST where applicable. Cancel anytime.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
