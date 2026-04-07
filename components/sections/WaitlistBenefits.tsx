"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import {
  waitlistBenefitsSection,
  waitlistSparkExplainer,
  waitlistTop100Spotlight,
  waitlistPrivilegeRows,
  waitlistPrivilegeTableHeaders,
  waitlistPrivilegesHeading,
  waitlistStayInTouch,
  waitlistBenefitsCta,
} from "@/lib/waitlistBenefits";
import { track } from "@/lib/analytics";
import { HiOutlineArrowDown, HiSparkles } from "react-icons/hi2";
import { IoGiftOutline } from "react-icons/io5";
import {
  MdEventAvailable,
  MdOutlineMarkEmailUnread,
  MdOutlineWorkspacePremium,
} from "react-icons/md";

function SparksFigure() {
  const reduceMotion = useReducedMotion();
  const c = waitlistSparkExplainer;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3
        id="spark-explainer-title"
        className="font-display text-lg font-semibold tracking-tight text-heading"
      >
        {c.title}
      </h3>
      <p className="mt-2 max-w-[480px] text-[14px] font-medium leading-relaxed text-body">
        {c.subtitleBefore}
        <span className="font-extrabold text-accent">{c.subtitleHighlight}</span>
        {c.subtitleAfter}
      </p>

      <p id="sparks-figure-desc" className="sr-only">
        Sparks are in-app tokens you spend on hosting and premium features.
      </p>

      <div
        className="mt-6 overflow-hidden rounded-2xl border border-line bg-page"
        aria-labelledby="spark-explainer-title"
        aria-describedby="sparks-figure-desc"
      >
        {/* Step 1: what Sparks are */}
        <div className="border-b border-line bg-surface-alt/80 px-5 py-5 md:px-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            {c.whatLabel}
          </p>
          <div className="mt-3 flex items-start gap-4">
            <motion.div
              className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-accent/35 bg-accent-dim/50"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 0 0 rgba(255, 107, 74, 0)",
                        "0 0 18px 2px rgba(255, 107, 74, 0.12)",
                        "0 0 0 0 rgba(255, 107, 74, 0)",
                      ],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <HiSparkles className="h-8 w-8 text-accent" aria-hidden />
            </motion.div>
            <div className="min-w-0 pt-0.5">
              <p className="font-display text-xl font-bold tracking-tight text-heading">
                {c.brandName}
              </p>
              <p className="mt-0.5 text-[13px] font-medium leading-snug text-body">
                {c.whatSub}
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex justify-center border-b border-line bg-page py-2.5"
          aria-hidden
        >
          <HiOutlineArrowDown className="h-4 w-4 text-accent/60" />
        </div>

        {/* Step 2: what you use them for */}
        <div className="px-5 py-5 md:px-6 md:py-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            {c.spendLabel}
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
              <motion.div
                className="rounded-xl border border-line-strong bg-surface-alt p-4"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-page text-accent shadow-sm">
                    <MdEventAvailable className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-bold text-heading">
                      {c.useHostingTitle}
                    </p>
                    <p className="mt-1 text-[12px] font-medium leading-snug text-muted">
                      {c.useHostingLine}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="rounded-xl border border-line-strong bg-surface-alt p-4"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-page text-heading shadow-sm">
                    <MdOutlineWorkspacePremium className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-bold text-heading">
                      {c.usePremiumTitle}
                    </p>
                    <p className="mt-1 text-[12px] font-medium leading-snug text-muted">
                      {c.usePremiumLine}
                    </p>
                  </div>
                </div>
              </motion.div>
          </div>

          <p className="mt-4 text-center text-[11px] font-medium text-muted">
            {c.spendFooter}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function scrollToWaitlist() {
  const el = document.getElementById("wl");
  if (el) el.scrollIntoView({ behavior: "smooth" });
  const input = document.getElementById("emailInput") as HTMLInputElement | null;
  if (input) input.focus();
  track("cta_click", "waitlist_perks_cta");
}

export function WaitlistBenefits() {
  return (
    <section
      id="waitlist-perks"
      className="scroll-mt-[76px] bg-surface py-[72px] md:py-[88px]"
      aria-labelledby="waitlist-perks-heading"
    >
      <Container>
        <SectionEyebrow text={waitlistBenefitsSection.eyebrow} />

        <div className="mt-2 grid grid-cols-1 gap-10 lg:mt-0 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-14">
          <div className="min-w-0">
            <FadeIn>
              <h2
                id="waitlist-perks-heading"
                className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading"
              >
                {waitlistBenefitsSection.titleLine1}
                <br />
                <em className="font-light not-italic text-body">
                  {waitlistBenefitsSection.titleEmphasis}
                </em>
              </h2>
            </FadeIn>

            <FadeIn delay={0.06}>
              <p className="mt-5 max-w-[540px] text-[15px] font-light leading-relaxed text-body lg:max-w-none">
                {waitlistBenefitsSection.lead}
              </p>
            </FadeIn>
          </div>

          <div className="min-w-0 lg:pt-1">
            <SparksFigure />
          </div>
        </div>

        <FadeIn delay={0.1}>
          <div className="relative mt-8 overflow-hidden rounded-card border border-line bg-page p-6 min-[600px]:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.5]"
              aria-hidden
              style={{
                background:
                  "radial-gradient(800px 240px at 20% 0%, var(--orange-dim), transparent 55%), radial-gradient(600px 200px at 90% 100%, var(--yellow-dim), transparent 50%)",
              }}
            />
            <div className="relative flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-start min-[480px]:gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-dim text-accent">
                <IoGiftOutline className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted">
                  {waitlistTop100Spotlight.badge}
                </span>
                <p className="mt-2 font-display text-[clamp(20px,2.8vw,28px)] font-light leading-snug tracking-tight text-heading">
                  <span className="font-light text-accent">
                    {waitlistTop100Spotlight.free}
                  </span>
                  {waitlistTop100Spotlight.headline}
                </p>
                <p className="mt-2 max-w-[480px] text-[13px] font-light leading-relaxed text-body">
                  {waitlistTop100Spotlight.body}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <h3 className="mt-10 font-display text-lg font-light tracking-tight text-heading min-[600px]:text-xl">
            {waitlistPrivilegesHeading.title}
          </h3>
          <p className="mt-2 max-w-[480px] text-[13px] font-light leading-relaxed text-body">
            {waitlistPrivilegesHeading.subtitle}
          </p>
        </FadeIn>

        <div className="mt-6 hidden overflow-x-auto rounded-card border border-line bg-page min-[900px]:block">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-alt/80">
                <th className="px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                  {waitlistPrivilegeTableHeaders.privilege}
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                  {waitlistPrivilegeTableHeaders.memberGets}
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                  {waitlistPrivilegeTableHeaders.duration}
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                  {waitlistPrivilegeTableHeaders.standardEquivalent}
                </th>
              </tr>
            </thead>
            <tbody>
              {waitlistPrivilegeRows.map((row) => (
                <tr
                  key={row.privilege}
                  className="border-b border-line last:border-b-0"
                >
                  <td className="px-4 py-3.5 align-top font-medium text-heading">
                    {row.privilege}
                  </td>
                  <td className="px-4 py-3.5 align-top font-light leading-relaxed text-body">
                    {row.memberGets}
                  </td>
                  <td className="px-4 py-3.5 align-top font-light text-muted">
                    {row.duration}
                  </td>
                  <td className="px-4 py-3.5 align-top font-light text-muted">
                    {row.standardEquivalent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <StaggerContainer className="mt-5 flex flex-col gap-2.5 min-[900px]:hidden">
          {waitlistPrivilegeRows.map((row) => (
            <StaggerItem key={row.privilege}>
              <div className="rounded-card border border-line bg-page p-4">
                <div className="font-display text-[15px] font-medium text-heading">
                  {row.privilege}
                </div>
                <dl className="mt-3 space-y-2.5 text-[13px]">
                  <div>
                    <dt className="text-[10px] font-extrabold uppercase tracking-wider text-muted">
                      {waitlistPrivilegeTableHeaders.memberGets}
                    </dt>
                    <dd className="mt-0.5 font-light leading-relaxed text-body">
                      {row.memberGets}
                    </dd>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <div>
                      <dt className="text-[10px] font-extrabold uppercase tracking-wider text-muted">
                        {waitlistPrivilegeTableHeaders.duration}
                      </dt>
                      <dd className="mt-0.5 font-light text-muted">
                        {row.duration}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-extrabold uppercase tracking-wider text-muted">
                        {waitlistPrivilegeTableHeaders.standardEquivalent}
                      </dt>
                      <dd className="mt-0.5 font-light text-muted">
                        {row.standardEquivalent}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.06}>
          <div className="mt-7 flex gap-3 rounded-card border border-line bg-page p-3.5 min-[600px]:p-4">
            <MdOutlineMarkEmailUnread
              className="mt-0.5 h-5 w-5 shrink-0 text-accent"
              aria-hidden
            />
            <p className="text-[13px] font-light leading-relaxed text-muted">
              {waitlistStayInTouch}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-8 min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between">
            <p className="max-w-[320px] text-[13px] font-light leading-relaxed text-muted">
              {waitlistBenefitsCta.helper}
            </p>
            <button
              type="button"
              onClick={scrollToWaitlist}
              className="h-10 shrink-0 cursor-pointer rounded-lg border border-accent bg-accent px-6 font-body text-sm font-semibold text-white transition-all hover:opacity-90"
            >
              {waitlistBenefitsCta.label}
            </button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
