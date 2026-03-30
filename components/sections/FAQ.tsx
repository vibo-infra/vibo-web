"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import type { WebFaq } from "@/lib/api/types";
import { fetchFaqsClient } from "@/lib/api/services/webApi";
import { track } from "@/lib/analytics";

function safeFaqHref(href: string | null | undefined): string | null {
  if (!href) return null;
  if (/^#[\w-]+$/.test(href)) return href;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  return null;
}

function FaqAccordion({ faqs }: { faqs: WebFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback(
    (index: number) => {
      setOpenIndex((prev) => {
        if (prev === index) return null;
        const item = faqs[index];
        if (item) track("faq_open", item.id);
        return index;
      });
    },
    [faqs]
  );

  return (
    <div className="mt-12 max-w-[720px]">
      {faqs.length === 0 ? (
        <p className="text-sm font-light leading-relaxed text-muted">
          No questions are published yet. Seed{" "}
          <code className="text-xs">web_faqs</code> or check the CMS API.
        </p>
      ) : null}
      {faqs.map((item, i) => {
        const href = safeFaqHref(item.link_href);
        const showLink = Boolean(item.link_label && href);

        return (
          <div key={item.id} className="border-b border-line">
            <button
              type="button"
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
                  <p className="pb-5 text-sm font-light leading-relaxed text-body whitespace-pre-line">
                    {item.answer}
                    {showLink ? (
                      <>
                        {" "}
                        <a
                          href={href!}
                          className="text-accent no-underline hover:underline"
                        >
                          {item.link_label}
                        </a>
                      </>
                    ) : null}
                    {item.answer_suffix ?? ""}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function FAQ() {
  const [faqs, setFaqs] = useState<WebFaq[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "error" | "ok">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;
    void fetchFaqsClient().then((data) => {
      if (cancelled) return;
      if (data === null) setLoadState("error");
      else {
        setFaqs(data);
        setLoadState("ok");
      }
    });
    return () => {
      cancelled = true;
    };
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
          {loadState === "loading" ? (
            <p className="mt-12 text-sm font-light text-muted">Loading…</p>
          ) : null}
          {loadState === "error" ? (
            <p className="mt-12 text-sm font-light leading-relaxed text-muted">
              We couldn&apos;t load FAQs. Check that the API is running and{" "}
              <code className="text-xs">NEXT_PUBLIC_API_URL</code> is set.
            </p>
          ) : null}
          {loadState === "ok" ? <FaqAccordion faqs={faqs} /> : null}
        </FadeIn>
      </Container>
    </section>
  );
}
