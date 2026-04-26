"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SectionHashLink } from "@/components/ui/SectionHashLink";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { homeSectionLinks } from "@/lib/constants";
import { siteTopBannerConfig } from "@/lib/siteTopBanner";
import { track } from "@/lib/analytics";
import { HeroHook } from "@/components/sections/HeroHook";
import { heroHighlights } from "@/lib/heroIntro";
import { HiArrowDown } from "react-icons/hi2";

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const heroViewTracked = useRef(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !heroViewTracked.current) {
            heroViewTracked.current = true;
            track("section_view", "hero");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const heroTopPad = siteTopBannerConfig.enabled
    ? "pt-14 sm:pt-20 md:pt-24"
    : "pt-[130px]";

  return (
    <section
      ref={heroRef}
      className={`relative overflow-hidden pb-14 sm:pb-20 ${heroTopPad}`}
      id="top"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute top-[-20%] right-[-10%] h-[min(70vh,520px)] w-[min(90vw,520px)] rounded-full bg-[radial-gradient(circle_at_center,var(--orange-dim)_0%,transparent_68%)] opacity-90" />
        <div className="absolute bottom-[-30%] left-[-15%] h-[min(50vh,400px)] w-[min(80vw,400px)] rounded-full bg-[radial-gradient(circle_at_center,var(--yellow-dim)_0%,transparent_65%)] opacity-70" />
      </div>

      <Container>
        <div className="mx-auto max-w-[720px] text-center min-[900px]:max-w-none min-[900px]:text-left">
          <HeroHook />

          <FadeIn delay={0.12}>
            <div className="mx-auto -mt-3 max-w-[560px] space-y-1 min-[900px]:mx-0">
              {heroHighlights.map(({ lead, rest }, i) => (
                <motion.p
                  key={lead}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.06 * i,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[15px] leading-relaxed md:text-[16px]"
                >
                  <span className="font-display text-[17px] font-bold tracking-tight text-accent md:text-lg">
                    {lead}
                  </span>
                  <span className="font-medium text-body">{rest}</span>
                </motion.p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              className="mt-10 flex flex-col items-start gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex w-full max-w-[360px] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-start">
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center rounded-full bg-heading px-7 py-3.5 font-body text-[14px] font-extrabold tracking-wide text-page no-underline shadow-md transition-[transform,box-shadow] hover:shadow-lg active:scale-[0.99]"
                >
                  Browse events
                </Link>
                <Link
                  href="/host"
                  className="inline-flex items-center justify-center rounded-full border border-line-strong px-7 py-3.5 font-body text-[14px] font-extrabold tracking-wide text-heading no-underline transition hover:border-accent hover:text-accent"
                >
                  Host one
                </Link>
              </div>
              <p className="text-[12px] font-medium text-muted">
                <SectionHashLink
                  href={homeSectionLinks.waitlist}
                  className="inline-flex items-center gap-1 text-muted no-underline transition hover:text-accent"
                >
                  Join the app waitlist
                  <HiArrowDown className="h-3.5 w-3.5" />
                </SectionHashLink>{" "}
                · Mumbai first
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
