"use client";

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
import { HiSparkles } from "react-icons/hi2";
import { IoGiftOutline } from "react-icons/io5";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

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
          <p className="mt-5 max-w-[520px] text-[15px] font-light leading-relaxed text-body">
            {waitlistBenefitsSection.lead}
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <aside
            className="mt-6 flex max-w-[520px] gap-3 rounded-card border border-line-strong bg-surface-alt/80 px-4 py-3.5 min-[600px]:px-5 min-[600px]:py-4"
            aria-labelledby="spark-explainer-title"
          >
            <HiSparkles
              className="mt-0.5 h-5 w-5 shrink-0 text-accent"
              aria-hidden
            />
            <div>
              <h3
                id="spark-explainer-title"
                className="font-display text-sm font-semibold tracking-tight text-heading"
              >
                {waitlistSparkExplainer.title}
              </h3>
              <p className="mt-1.5 text-[13px] font-light leading-relaxed text-body">
                {waitlistSparkExplainer.body}
              </p>
            </div>
          </aside>
        </FadeIn>

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
