"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import { faqItems } from "@/lib/constants";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="py-[100px]">
      <Container>
        <SectionEyebrow text="Questions" />
        <FadeIn>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
            Good questions.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 max-w-[720px]">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-line">
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-5 text-left font-body text-[15px] font-medium text-heading"
                >
                  {item.question}
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-sm transition-all duration-300 ${
                      openIndex === i
                        ? "rotate-45 border-accent bg-accent text-white"
                        : "border-line-strong text-muted"
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm font-light leading-relaxed text-body">
                        {item.hasLink ? (
                          <>
                            {item.answer}{" "}
                            <a
                              href={item.linkHref}
                              className="text-accent no-underline hover:underline"
                            >
                              {item.linkText}
                            </a>
                            {item.answerSuffix}
                          </>
                        ) : (
                          item.answer
                        )}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
