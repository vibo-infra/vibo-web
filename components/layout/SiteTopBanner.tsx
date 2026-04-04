"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  siteTopBannerConfig,
  type SiteTopBannerConfig,
} from "@/lib/siteTopBanner";

function useCountdown(targetIso: string | undefined) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!targetIso) return;
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, [targetIso]);

  return useMemo(() => {
    if (!targetIso) return null;
    const end = new Date(targetIso).getTime();
    if (Number.isNaN(end)) return null;
    const diff = Math.max(0, end - now);
    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    if (diff <= 0) return "Live";
    if (d > 0) return `${d}d ${h}h`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }, [targetIso, now]);
}

const variantStyles: Record<
  SiteTopBannerConfig["variant"],
  { bar: string; badge: string }
> = {
  notice: {
    bar: "border-highlight/35 bg-highlight-dim/45",
    badge:
      "bg-highlight/25 text-heading dark:bg-highlight/20 dark:text-highlight",
  },
  countdown: {
    bar: "border-accent/35 bg-accent-dim/50",
    badge: "bg-accent/20 text-heading",
  },
  urgent: {
    bar: "border-accent/40 bg-accent-dim/55",
    badge: "bg-accent/25 text-heading",
  },
  info: {
    bar: "border-line bg-surface-alt/90",
    badge: "border border-line-strong bg-page text-muted dark:bg-surface",
  },
};

export function SiteTopBanner() {
  const cfg = siteTopBannerConfig;
  const countdown = useCountdown(
    cfg.enabled && cfg.variant === "countdown"
      ? cfg.countdownUntil
      : undefined
  );

  if (!cfg.enabled) return null;

  const styles = variantStyles[cfg.variant];

  const ctaIsExternal =
    cfg.cta &&
    (cfg.cta.href.startsWith("mailto:") ||
      cfg.cta.href.startsWith("tel:") ||
      cfg.cta.href.startsWith("http"));

  const ctaButtonClass =
    "inline-flex h-10 w-full items-center justify-center rounded-lg border border-line-strong bg-page px-5 font-body text-[12px] font-bold tracking-wide text-heading no-underline transition-colors hover:border-accent hover:text-accent sm:h-9 sm:w-auto sm:rounded-full dark:bg-surface";

  const regionLabel = cfg.visitorContext
    ? "Team and events notice — separate from VIBO product content"
    : "Site notice";

  return (
    <div
      className={`relative z-[95] mt-[60px] w-full border-b ${styles.bar}`}
      role="region"
      aria-label={regionLabel}
    >
      <div className="mx-auto max-w-[1120px] px-5 py-4 sm:px-8 sm:py-3.5">
        <div className="flex flex-col gap-3">
          {cfg.visitorContext ? (
            <div
              role="note"
              className="flex gap-2.5 rounded-lg border border-dashed border-accent/30 bg-accent-dim/25 px-3 py-2.5 dark:bg-accent-dim/15"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[10px] font-extrabold text-accent"
                aria-hidden
              >
                i
              </span>
              {/* <p className="min-w-0 text-[11px] font-light leading-relaxed text-body sm:text-[12px]">
                <span className="font-semibold text-heading">
                  For visitors ·{" "}
                </span>
                {cfg.visitorContext}
              </p> */}
            </div>
          ) : null}

          {(cfg.badge || (cfg.variant === "countdown" && countdown)) ? (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {cfg.badge ? (
                <span
                  className={`w-fit rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${styles.badge}`}
                >
                  {cfg.badge}
                </span>
              ) : null}
              {cfg.variant === "countdown" && countdown ? (
                <span
                  className="font-display text-sm font-semibold tabular-nums text-accent"
                  aria-live="polite"
                >
                  {countdown}
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="min-w-0 flex-1 space-y-1.5">
              <p className="font-display text-[15px] font-semibold leading-snug tracking-tight text-heading sm:text-[16px]">
                {cfg.title}
              </p>
              {cfg.description ? (
                <p className="max-w-[720px] text-[13px] font-light leading-relaxed text-body">
                  {cfg.description}
                </p>
              ) : null}
            </div>

            {cfg.cta ? (
              <div className="shrink-0 sm:pt-0.5">
                {ctaIsExternal ? (
                  <a href={cfg.cta.href} className={ctaButtonClass}>
                    {cfg.cta.label}
                  </a>
                ) : (
                  <Link href={cfg.cta.href} className={ctaButtonClass}>
                    {cfg.cta.label}
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
