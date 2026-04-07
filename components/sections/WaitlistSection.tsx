"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SHOW_PRICING_SECTION, siteConfig } from "@/lib/constants";
import {
  fetchWaitlistCountClient,
  fetchReferralClient,
  postReferralClickClient,
  joinWaitlistClient,
} from "@/lib/api/services/webApi";
import { sanitizeReferralCode } from "@/lib/api/sanitize";
import { track } from "@/lib/analytics";
import { WaitlistCityStep } from "@/components/waitlist/WaitlistCityStep";
import { useWaitlistSpot } from "@/context/WaitlistSpotContext";
import {
  waitlistPerksLinkLabel,
  waitlistSectionHeading,
  waitlistSectionSub,
  waitlistSectionTitle,
} from "@/lib/heroIntro";
import { HiEnvelope, HiSparkles } from "react-icons/hi2";

export function WaitlistSection() {
  const { setUserPosition } = useWaitlistSpot();
  const [email, setEmail] = useState("");
  const [inlineError, setInlineError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [success, setSuccess] = useState<{
    position: number | null;
    code: string;
    already: boolean;
    email: string;
  } | null>(null);
  const [cityStepComplete, setCityStepComplete] = useState(false);

  useEffect(() => {
    void fetchWaitlistCountClient().then((n) => {
      if (n != null) setCount(n);
    });
  }, []);

  useEffect(() => {
    if (!success) setCityStepComplete(false);
  }, [success]);

  useEffect(() => {
    const ref = sanitizeReferralCode(
      new URLSearchParams(window.location.search).get("ref")
    );
    if (!ref) return;
    postReferralClickClient(ref);
    void fetchReferralClient(ref);
  }, []);

  const handleSubmit = useCallback(async () => {
    const trimmed = email.trim();
    if (!trimmed.includes("@")) {
      setInlineError(true);
      return;
    }
    setInlineError(false);
    setSubmitError(false);
    setLoading(true);

    const sp = new URLSearchParams(window.location.search);
    const ref = sanitizeReferralCode(sp.get("ref"));

    try {
      const result = await joinWaitlistClient({
        email: trimmed,
        source: "waitlist_section",
        utm_source: sp.get("utm_source"),
        utm_medium: sp.get("utm_medium"),
        utm_campaign: sp.get("utm_campaign"),
        ref,
      });
      if (!result.referral_code) {
        setSubmitError(true);
        return;
      }
      setSuccess({
        position: result.position,
        code: result.referral_code,
        already: result.already_registered,
        email: trimmed,
      });
      if (result.position != null && result.position > 0) {
        setUserPosition(result.position);
      }
      track("cta_click", "waitlist_section_cta");
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  }, [email, setUserPosition]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") void handleSubmit();
    },
    [handleSubmit]
  );

  const copyShare = useCallback(() => {
    if (!success?.code) return;
    void navigator.clipboard.writeText(
      `${siteConfig.shareDomain}?ref=${success.code}`
    );
  }, [success]);

  const scrollToPerks = useCallback(() => {
    track("cta_click", "waitlist_section_perks_link");
    document
      .getElementById("waitlist-perks")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="wl"
      className="scroll-mt-[76px] border-y border-line bg-gradient-to-b from-surface/80 via-page to-page py-16 md:py-24"
      aria-labelledby="waitlist-section-title"
    >
      <Container>
        <div className="mx-auto max-w-[540px]">
          <FadeIn>
            <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
              <HiSparkles className="h-4 w-4" aria-hidden />
              {waitlistSectionHeading}
            </div>
            <h2
              id="waitlist-section-title"
              className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-[-0.03em] text-heading"
            >
              {waitlistSectionTitle}
            </h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed text-muted">
              {waitlistSectionSub}
            </p>
          </FadeIn>

          <motion.div
            className="mt-8 rounded-[20px] border border-line-strong bg-surface p-6 shadow-[0_1px_0_rgba(15,15,15,0.04)] md:p-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {success ? (
              <div className="animate-[fadeUp_0.35s_ease_forwards]">
                <p className="text-[15px] font-semibold text-body">
                  {success.already || success.position == null ? (
                    "You're already on the list."
                  ) : (
                    <>
                      You&apos;re{" "}
                      <span className="font-extrabold text-[1.75rem] text-accent tabular-nums">
                        #{success.position}
                      </span>{" "}
                      in line.
                    </>
                  )}
                </p>

                {!cityStepComplete ? (
                  <div className="mt-5">
                    <WaitlistCityStep
                      email={success.email}
                      theme="hero"
                      onComplete={() => setCityStepComplete(true)}
                    />
                  </div>
                ) : null}

                <div className="mt-6 space-y-3 border-t border-line pt-6">
                  <p className="text-sm font-medium text-body">
                    Share:{" "}
                    <a
                      className="font-bold text-heading underline underline-offset-2"
                      href={`https://${siteConfig.shareDomain}?ref=${success.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {siteConfig.shareDomain}?ref={success.code}
                    </a>
                  </p>
                  <button
                    type="button"
                    onClick={copyShare}
                    className="h-11 cursor-pointer rounded-xl bg-heading px-5 text-[13px] font-extrabold text-page transition-opacity hover:opacity-90"
                  >
                    Copy link
                  </button>
                </div>
              </div>
            ) : (
              <>
                <label htmlFor="emailInput" className="sr-only">
                  Email for waitlist
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <div className="relative min-w-0 flex-1">
                    <HiEnvelope className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-faint" />
                    <input
                      id="emailInput"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="you@email.com"
                      disabled={loading}
                      autoComplete="email"
                      className={`h-[52px] w-full rounded-xl border bg-page pl-11 pr-4 font-body text-[15px] font-semibold text-heading outline-none transition-[border,box-shadow] placeholder:text-faint focus:border-accent focus:ring-2 focus:ring-accent/20 ${
                        inlineError ? "border-red-400" : "border-line-strong"
                      }`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleSubmit()}
                    disabled={loading}
                    className="h-[52px] shrink-0 rounded-xl bg-accent px-8 font-body text-[14px] font-extrabold tracking-wide text-white shadow-sm transition-[transform,opacity] hover:opacity-95 active:scale-[0.99] disabled:opacity-60 sm:min-w-[140px]"
                  >
                    {loading ? "…" : "Apply"}
                  </button>
                </div>
                {submitError ? (
                  <p className="mt-3 text-sm font-medium text-red-500">
                    Something went wrong — try again
                  </p>
                ) : null}
              </>
            )}

            <div className="mt-6 flex flex-row-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center justify-between">
              {!SHOW_PRICING_SECTION ? (
                <button
                  type="button"
                  onClick={scrollToPerks}
                  className="group text-left text-[14px] font-semibold text-heading transition-colors hover:text-accent"
                >
                  {waitlistPerksLinkLabel}
                  <span
                    className="ml-0.5 inline-block transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </button>
              ) : (
                <span />
              )}
              <p className="text-[13px] font-medium text-muted">
                {count != null ? (
                  <>
                    <span className="font-extrabold text-lg tabular-nums text-body">
                      #{count.toLocaleString("en-IN")}
                    </span>{"   "}
                    in line
                  </>
                ) : (
                  <span className="text-faint">—</span>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
