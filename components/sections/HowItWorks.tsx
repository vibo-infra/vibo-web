"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import { steps, phoneCards, type PhoneCard } from "@/lib/constants";
import type { NearbyEvent } from "@/lib/api/types";
import { nearbyEventsToPhoneCards } from "@/lib/map-events";

function PhoneMockup({
  activeStep,
  cards,
}: {
  activeStep: number;
  cards: PhoneCard[];
}) {
  return (
    <div className="w-full max-w-[300px] rounded-[36px] border border-line-strong bg-surface" style={{ aspectRatio: "9/19" }}>
      <div className="flex h-full flex-col px-4 pt-6 pb-4">
        <div className="mb-4 flex justify-between">
          <span className="text-[10px] text-muted">9:41</span>
          <span className="text-[10px] text-muted">●●●</span>
        </div>

        <div className="mb-3 font-display text-lg font-medium text-heading">
          Near you
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-lg bg-surface-alt px-3 py-2 text-[11px] text-muted">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8.5 8.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Search events, hosts...
        </div>

        <div className="flex flex-col gap-2">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`rounded-xl border bg-page p-3 transition-colors duration-300 ${
                (activeStep === 1 && card.id === 1) ||
                (activeStep === 2 && card.id === 2) ||
                (activeStep === 3 && card.id === 1)
                  ? "border-accent"
                  : "border-line"
              }`}
              animate={{
                scale:
                  (activeStep === 1 && card.id === 1) ||
                  (activeStep === 2 && card.id === 2)
                    ? 1.02
                    : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative mb-2 h-[70px] w-full overflow-hidden rounded-lg bg-surface-alt">
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      card.id === 1
                        ? "linear-gradient(135deg, var(--orange-dim), var(--yellow-dim))"
                        : "linear-gradient(135deg, var(--yellow-dim), rgba(0,180,160,0.1))",
                  }}
                />
                <span
                  className="absolute top-1.5 right-1.5 rounded-full px-[7px] py-0.5 text-[9px] font-medium text-white"
                  style={{
                    background: card.badgeColor ?? "var(--orange)",
                  }}
                >
                  {card.badge ?? card.distance}
                </span>
              </div>
              <div className="mb-1 text-xs font-medium text-heading">
                {card.title}
              </div>
              <div className="flex gap-2.5 text-[10px] text-muted">
                <span>★ {card.rating}</span>
                <span>{card.attendees}</span>
                <span
                  className={card.priceHighlight ? "text-accent" : ""}
                >
                  {card.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

type HowItWorksProps = {
  previewEvents: NearbyEvent[];
};

export function HowItWorks({ previewEvents }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState(1);

  const cards = useMemo(() => {
    const fromApi = nearbyEventsToPhoneCards(previewEvents);
    if (fromApi.length >= 2) return fromApi;
    if (fromApi.length === 1) return [fromApi[0], phoneCards[1]];
    return [...phoneCards];
  }, [previewEvents]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStepClick = useCallback((step: number) => {
    setActiveStep(step);
  }, []);

  return (
    <section id="how" className="py-[100px]">
      <Container>
        <SectionEyebrow text="How it works" />
        <FadeIn>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
            Three taps to
            <br />
            <em className="font-light text-accent">somewhere good.</em>
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 items-start gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-12">
          <FadeIn className="sticky top-[100px] max-[900px]:static max-[900px]:flex max-[900px]:justify-center">
            <PhoneMockup activeStep={activeStep} cards={cards} />
          </FadeIn>

          <FadeIn className="pt-2">
            <div className="flex flex-col">
              {steps.map((step) => (
                <div
                  key={step.num}
                  onClick={() => handleStepClick(step.num)}
                  className={`cursor-pointer border-b border-line py-7 last:border-b-0`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm transition-all duration-300 ${
                        activeStep === step.num
                          ? "border border-accent bg-accent text-white"
                          : "border border-line-strong bg-surface text-muted"
                      }`}
                    >
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`mt-1.5 mb-1.5 text-base font-medium transition-colors duration-200 ${
                          activeStep === step.num
                            ? "text-accent"
                            : "text-heading"
                        }`}
                      >
                        {step.title}
                      </div>
                      <AnimatePresence>
                        {activeStep === step.num && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm font-light leading-relaxed text-body">
                              {step.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
