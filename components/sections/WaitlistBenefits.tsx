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
  waitlistNotificationsSection,
  waitlistNotificationItems,
  waitlistBenefitsCta,
} from "@/lib/waitlistBenefits";
import { track } from "@/lib/analytics";

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
      className="scroll-mt-[76px] bg-surface py-[108px]"
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
        <FadeIn delay={0.08}>
          <p className="mt-4 max-w-[640px] text-base font-light leading-relaxed text-body">
            {waitlistBenefitsSection.introBeforeSpark}
            <span className="font-semibold text-accent">
              {waitlistBenefitsSection.introSparkWord}
            </span>
            {waitlistBenefitsSection.introAfterSpark}
          </p>
          <p className="mt-3 max-w-[560px] text-sm font-light leading-relaxed text-muted">
            {waitlistBenefitsSection.closingBeforeSpark}
            <span className="font-semibold text-accent">
              {waitlistBenefitsSection.closingSparkWord}
            </span>
            {waitlistBenefitsSection.closingAfterSpark}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <aside
            className="mt-8 max-w-[560px] rounded-card border border-line-strong bg-surface-alt/80 px-5 py-4 min-[600px]:px-6 min-[600px]:py-5"
            aria-labelledby="spark-explainer-title"
          >
            <h3
              id="spark-explainer-title"
              className="font-display text-sm font-semibold tracking-tight text-heading sm:text-base"
            >
              {waitlistSparkExplainer.title}
            </h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-body">
              {waitlistSparkExplainer.body}
            </p>
          </aside>
        </FadeIn>

        {/* Top 100 — visible but restrained */}
        <FadeIn delay={0.12}>
          <div className="relative mt-14 overflow-hidden rounded-card border border-line bg-page p-8 min-[600px]:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.55]"
              aria-hidden
              style={{
                background:
                  "radial-gradient(900px 280px at 20% 0%, var(--orange-dim), transparent 55%), radial-gradient(700px 220px at 90% 100%, var(--yellow-dim), transparent 50%)",
              }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-dim px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-heading">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                {waitlistTop100Spotlight.badge}
              </span>
              <p className="mt-5 font-display text-[clamp(22px,3.2vw,34px)] font-light leading-snug tracking-tight text-heading">
                {waitlistTop100Spotlight.headline}
              </p>
              <p className="mt-3 max-w-[560px] text-sm font-light leading-relaxed text-body">
                {waitlistTop100Spotlight.body}
              </p>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-muted">
                {waitlistTop100Spotlight.microcopy}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <h3 className="mt-16 font-display text-xl font-light tracking-tight text-heading min-[600px]:text-2xl">
            {waitlistPrivilegesHeading.title}
          </h3>
          <p className="mt-2 max-w-[520px] text-sm font-light leading-relaxed text-muted">
            {waitlistPrivilegesHeading.subtitle}
          </p>
        </FadeIn>

        {/* Desktop table */}
        <div className="mt-10 hidden overflow-x-auto rounded-card border border-line bg-page min-[900px]:block">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-alt/80">
                <th className="px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                  {waitlistPrivilegeTableHeaders.privilege}
                </th>
                <th className="px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                  {waitlistPrivilegeTableHeaders.memberGets}
                </th>
                <th className="px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                  {waitlistPrivilegeTableHeaders.duration}
                </th>
                <th className="px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
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
                  <td className="px-5 py-4 align-top font-medium text-heading">
                    {row.privilege}
                  </td>
                  <td className="px-5 py-4 align-top font-light leading-relaxed text-body">
                    {row.memberGets}
                  </td>
                  <td className="px-5 py-4 align-top font-light text-muted">
                    {row.duration}
                  </td>
                  <td className="px-5 py-4 align-top font-light text-muted">
                    {row.standardEquivalent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <StaggerContainer className="mt-8 flex flex-col gap-3 min-[900px]:hidden">
          {waitlistPrivilegeRows.map((row) => (
            <StaggerItem key={row.privilege}>
              <div className="rounded-card border border-line bg-page p-5">
                <div className="font-display text-base font-medium text-heading">
                  {row.privilege}
                </div>
                <dl className="mt-3 space-y-2.5 text-sm">
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
          <h3 className="mt-16 font-display text-xl font-light tracking-tight text-heading min-[600px]:text-2xl">
            {waitlistNotificationsSection.title}
          </h3>
        </FadeIn>
        <StaggerContainer className="mt-8 grid grid-cols-1 gap-3 min-[640px]:grid-cols-2">
          {waitlistNotificationItems.map((item, i) => (
            <StaggerItem key={item.id}>
              <div className="flex h-full gap-4 rounded-card border border-line bg-page p-5 transition-all hover:-translate-y-px hover:border-line-strong">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-alt font-display text-sm font-semibold text-heading"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div>
                  <div className="font-medium text-heading">{item.title}</div>
                  <p className="mt-1.5 text-[13px] font-light leading-relaxed text-body">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.1}>
          <div className="mt-14 flex flex-col items-start gap-4 border-t border-line pt-12 min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between">
            <p className="max-w-[400px] text-sm font-light leading-relaxed text-muted">
              {waitlistBenefitsCta.helper}
            </p>
            <button
              type="button"
              onClick={scrollToWaitlist}
              className="h-11 shrink-0 cursor-pointer rounded-lg border border-accent bg-accent px-8 font-body text-sm font-semibold text-white transition-all hover:opacity-90"
            >
              {waitlistBenefitsCta.label}
            </button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
