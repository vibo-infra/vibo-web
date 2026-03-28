"use client";

import { FadeIn } from "@/components/ui/FadeIn";

export function FinalCTA() {
  return (
    <section className="bg-heading py-[120px]">
      <FadeIn>
        <div className="mx-auto max-w-[600px] text-center">
          <h2 className="mb-4 font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-white">
            Your next favourite
            <br />
            <em className="font-semibold text-highlight">memory is 2km away.</em>
          </h2>
          <p className="mb-10 text-lg font-medium leading-relaxed text-white/60">
            Someone nearby is planning something you&apos;d love. Download VIBO
            and find out what it is.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-[10px] border border-highlight bg-highlight px-6 py-3 text-sm font-extrabold text-heading no-underline transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              <span className="text-xl leading-none">🍎</span>
              <span className="text-left">
                <span className="block text-[10px] font-light opacity-70">
                  Download on the
                </span>
                <span className="text-[15px] font-medium">App Store</span>
              </span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-[10px] border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-white/15"
            >
              <span className="text-xl leading-none">▶</span>
              <span className="text-left">
                <span className="block text-[10px] font-light opacity-70">
                  Get it on
                </span>
                <span className="text-[15px] font-medium">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
