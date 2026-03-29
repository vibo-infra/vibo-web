"use client";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { bentoFeatures, bentoBottomFeatures } from "@/lib/constants";

const spanClasses: Record<number, string> = {
  4: "col-span-12 min-[900px]:col-span-4",
  5: "col-span-12 min-[900px]:col-span-5",
  7: "col-span-12 min-[900px]:col-span-7",
  8: "col-span-12 min-[900px]:col-span-8",
  12: "col-span-12",
};

const accentStyles = {
  orange: {
    card: "bg-accent border-accent",
    tag: "bg-white/20 text-white/90",
    title: "text-white",
    desc: "text-white/80",
  },
  yellow: {
    card: "bg-highlight border-highlight",
    tag: "bg-black/[0.08] text-[#7A5A00]",
    title: "text-[#3A2E00]",
    desc: "text-[#7A5A00]",
  },
} as const;

export function Features() {
  return (
    <section id="feat" className="bg-surface py-[108px]">
      <Container>
        <SectionEyebrow text="Features" />
        <FadeIn>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
            Built around trust,
            <br />
            <em className="font-light">not metrics.</em>
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-14 grid auto-rows-auto grid-cols-12 gap-3">
          {bentoFeatures.map((feature, i) => {
            const accent = feature.accent
              ? accentStyles[feature.accent]
              : null;

            return (
              <StaggerItem
                key={i}
                className={spanClasses[feature.span] ?? "col-span-12"}
              >
                <div
                  className={`relative overflow-hidden rounded-card border p-8 transition-all hover:-translate-y-0.5 hover:border-line-strong ${
                    accent?.card ?? "border-line bg-surface"
                  }`}
                >
                  {feature.tag && (
                    <span
                      className={`mb-4 inline-block rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
                        accent?.tag ??
                        "bg-surface-alt text-muted"
                      }`}
                    >
                      {feature.tag}
                    </span>
                  )}

                  {feature.stat ? (
                    <>
                      <div className="font-display text-[clamp(40px,6vw,72px)] font-light leading-none text-accent">
                        {feature.stat.value}
                      </div>
                      <div className="mt-1 text-[13px] text-muted">
                        {feature.stat.label}
                      </div>
                      <div className="mt-3 text-[13px] font-light leading-relaxed text-body">
                        {feature.description}
                      </div>
                    </>
                  ) : (
                    <>
                      {feature.title && (
                        <div
                          className={`mb-2.5 font-display text-2xl leading-snug ${
                            accent?.title ?? "text-heading"
                          }`}
                        >
                          {feature.title}
                        </div>
                      )}
                      <div
                        className={`text-sm font-light leading-relaxed ${
                          accent?.desc ?? "text-body"
                        }`}
                      >
                        {feature.description}
                      </div>
                    </>
                  )}

                  {feature.trustBadges && (
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {feature.trustBadges.map((badge) => (
                        <div
                          key={badge}
                          className="flex items-center gap-1.5 rounded-full border border-line bg-surface-alt px-3 py-1.5 text-xs text-body"
                        >
                          {badge === "Live near you" ? (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                          ) : (
                            <span className="text-xs text-highlight">★</span>
                          )}
                          {badge}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}

          <StaggerItem className="col-span-12">
            <div className="rounded-card border border-line bg-surface p-8 transition-all hover:-translate-y-0.5 hover:border-line-strong">
              <div className="grid grid-cols-1 items-start gap-8 min-[900px]:grid-cols-3">
                {bentoBottomFeatures.map((feature) => (
                  <div key={feature.tag}>
                    <span className="mb-4 inline-block rounded-full bg-surface-alt px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted">
                      {feature.tag}
                    </span>
                    <div className="mb-2 text-[15px] font-medium text-heading">
                      {feature.title}
                    </div>
                    <div className="text-[13px] font-light leading-relaxed text-body">
                      {feature.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </section>
  );
}
