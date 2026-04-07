"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
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

      <ol className="mt-8 flex flex-col gap-0">
        {steps.map((step, i) => {
          const Icon = ROUTE_ICONS[step.iconKey];
          return (
            <li key={step.label}>
              {i > 0 ? (
                <div className="flex justify-center py-1" aria-hidden>
                  <span className="block h-5 w-px bg-line-strong" />
                </div>
              ) : null}
              <motion.div
                className="flex items-center gap-3 min-[480px]:gap-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{
                  delay: 0.06 * i,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-alt text-heading">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-[15px] font-medium leading-snug text-body">
                  {step.label}
                </span>
              </motion.div>
            </li>
          );
        })}
      </ol>
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
