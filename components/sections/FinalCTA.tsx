"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { closingSection } from "@/lib/closingSection";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

export function FinalCTA() {
  return (
    <section
      className="border-t border-white/10 bg-[#10100e] py-[100px] text-white dark:border-white/10 dark:bg-[#0a0a09]"
      aria-labelledby="closing-heading"
    >
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-[560px] text-center">
            <h2
              id="closing-heading"
              className="font-display text-[clamp(30px,4.5vw,48px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-white"
            >
              {closingSection.titleLine1}
              <br />
              <em className="font-semibold not-italic text-highlight">
                {closingSection.titleLine2}
              </em>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] text-base font-light leading-relaxed text-white/65">
              {closingSection.body}
            </p>
            <p className="mx-auto mt-4 max-w-[440px] text-sm font-medium leading-relaxed text-white/20">
              {closingSection.waitlistEmailNote}
            </p>

            <p className="mt-12 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/40">
              {closingSection.storesEyebrow}
            </p>
            <div className="mt-4 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center justify-center gap-3 rounded-card border border-white/15 bg-white/[0.06] px-5 py-3.5 sm:min-w-[200px]">
                <span className="text-2xl leading-none text-white/90" aria-hidden>
                  <FaApple />
                </span>
                <span className="text-left">
                  <span className="block text-[15px] font-bold text-white">
                    {closingSection.apple.name}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-highlight/90">
                    {closingSection.apple.status}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-card border border-white/15 bg-white/[0.06] px-5 py-3.5 sm:min-w-[200px]">
                <span className="text-2xl leading-none text-white/90" aria-hidden>
                  <BiLogoPlayStore />
                </span>
                <span className="text-left">
                  <span className="block text-[15px] font-bold text-white">
                    {closingSection.google.name}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-highlight/90">
                    {closingSection.google.status}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
