"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  HiOutlineArrowLongRight,
  HiOutlineCalendar,
  HiOutlineDevicePhoneMobile,
  HiOutlineMap,
  HiPlusCircle,
  HiUsers,
} from "react-icons/hi2";
import { MdOutlineGroups } from "react-icons/md";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  storyBandSection,
  type StoryRouteIconKey,
  type StoryRouteStep,
} from "@/lib/constants";

const ROUTE_ICONS: Record<StoryRouteIconKey, IconType> = {
  mobile: HiOutlineDevicePhoneMobile,
  map: HiOutlineMap,
  users: HiUsers,
  add: HiPlusCircle,
  people: MdOutlineGroups,
  calendar: HiOutlineCalendar,
};

function StepArrow() {
  return (
    <div
      className="flex shrink-0 items-center justify-center self-center px-0.5 text-muted sm:px-1.5"
      aria-hidden
    >
      <HiOutlineArrowLongRight
        className="h-5 w-5 opacity-[0.5] sm:h-7 sm:w-7 sm:opacity-[0.45]"
        strokeWidth={1.5}
      />
    </div>
  );
}

function RouteCard({
  title,
  hook,
  steps,
}: {
  title: string;
  hook: string;
  steps: readonly StoryRouteStep[];
}) {
  return (
    <motion.div
      className="relative flex flex-col rounded-card border border-line bg-page p-6 min-[600px]:p-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute -top-px right-0 left-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden
      />
      <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-accent">
        {title}
      </p>
      <p className="mt-2 font-display text-lg font-semibold leading-snug text-heading min-[600px]:text-xl">
        {hook}
      </p>

      <div
        className="mt-8"
        role="group"
        aria-label={`${title} — ${steps.map((s) => s.label).join(" → ")}`}
      >
        <div className="relative">
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-[26px] z-0 hidden h-px bg-gradient-to-r from-transparent via-line-strong/70 to-transparent sm:block sm:top-[30px]"
            aria-hidden
          />
          <div className="relative z-[1] flex flex-row flex-nowrap items-stretch justify-between gap-0 overflow-x-auto overflow-y-visible pb-1 [scrollbar-width:none] sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
            {steps.map((step, i) => {
              const Icon = ROUTE_ICONS[step.iconKey];
              return (
                <Fragment key={step.label}>
                  {i > 0 ? <StepArrow /> : null}
                  <motion.div
                    className="flex min-w-[6rem] max-w-[10rem] flex-none flex-col items-center gap-2.5 text-center sm:min-w-0 sm:max-w-none sm:flex-1 sm:gap-3"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-24px" }}
                    transition={{
                      delay: 0.07 * i,
                      duration: 0.42,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-page shadow-[0_1px_0_var(--color-line)] ring-2 ring-page sm:h-[52px] sm:w-[52px]">
                      <Icon className="h-[22px] w-[22px] text-heading sm:h-6 sm:w-6" aria-hidden />
                    </span>
                    <span className="text-[13px] font-semibold leading-snug tracking-tight text-body sm:text-[15px]">
                      {step.label}
                    </span>
                  </motion.div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function StoryBandSection() {
  const { eyebrow, headlineLine1, headlineLine2, discover, host } =
    storyBandSection;

  return (
    <section
      className="scroll-mt-[76px] border-y border-line bg-gradient-to-b from-surface-alt/90 via-page to-page py-[72px] md:py-[96px]"
      id="story"
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
            <span className="text-body">{headlineLine2}</span>
          </h2>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          <RouteCard
            title={discover.title}
            hook={discover.hook}
            steps={discover.steps}
          />
          <RouteCard
            title={host.title}
            hook={host.hook}
            steps={host.steps}
          />
        </div>
      </Container>
    </section>
  );
}
