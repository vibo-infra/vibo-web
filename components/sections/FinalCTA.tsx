"use client";

import { useState, useCallback, useEffect } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/constants";
import { joinWaitlistClient } from "@/lib/api/services/webApi";
import { sanitizeReferralCode } from "@/lib/api/sanitize";
import { track } from "@/lib/analytics";
import { WaitlistCityStep } from "@/components/waitlist/WaitlistCityStep";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [inlineError, setInlineError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{
    position: number | null;
    code: string;
    already: boolean;
    email: string;
  } | null>(null);
  const [cityStepComplete, setCityStepComplete] = useState(false);

  useEffect(() => {
    if (!success) setCityStepComplete(false);
  }, [success]);

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
        source: "footer_cta",
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
      track("cta_click", "footer_cta");
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  }, [email]);

  const copyShare = useCallback(() => {
    if (!success?.code) return;
    void navigator.clipboard.writeText(
      `${siteConfig.shareDomain}?ref=${success.code}`
    );
  }, [success]);

  return (
    <section className="bg-heading py-[120px]">
      <FadeIn>
        <div className="mx-auto max-w-[600px] px-6 text-center">
          <h2 className="mb-4 font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-white">
            Your next favourite memory
            <br />
            <em className="font-semibold text-highlight">is 2km away.</em>
          </h2>
          <p className="mb-8 text-lg font-medium leading-relaxed text-white/60">
            Someone nearby is already planning something you&apos;d love. Be the
            first to know when VIBO hits your city.
          </p>

          <div className="mb-10 text-left">
            {success ? (
              <div className="animate-[fadeUp_0.35s_ease_forwards] space-y-1 text-center text-white">
                {/* Position */}
                <p className="mb-4 text-[15px] font-semibold">
                  {success.already || success.position == null ? (
                    "You're already one of us. 🤝"
                  ) : (
                    <>
                      You&apos;re in.{" "}
                      <span className="font-extrabold text-[1.5rem] animate-[pop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
                        #{success.position}
                      </span>{" "}
                      and early.
                    </>
                  )}
                </p>

                {/* City step */}
                {!cityStepComplete ? (
                  <WaitlistCityStep
                    email={success.email}
                    theme="cta"
                    onComplete={() => setCityStepComplete(true)}
                  />
                ) : null}

                <div className="space-y-3 pt-2">
                  <p className="text-sm font-medium text-white/70">
                    Share your link and move up the list:
                  </p>
                  <p className="text-sm font-medium text-white/80">
                    <a
                      className="font-extrabold text-highlight underline underline-offset-2"
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
                    className="h-11 w-full cursor-pointer rounded-[10px] border-none bg-highlight px-6 font-body text-[13px] font-extrabold text-heading transition-all hover:-translate-y-0.5 hover:opacity-90 sm:w-auto"
                  >
                    Copy link
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  id="footerEmailInput"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void handleSubmit();
                  }}
                  placeholder="your@email.com"
                  disabled={loading}
                  className={`h-[50px] flex-1 rounded-[10px] border bg-white/10 px-[18px] font-body text-sm font-semibold text-white outline-none transition-colors placeholder:text-white/40 focus:border-highlight ${
                    inlineError ? "border-red-400" : "border-white/25"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => void handleSubmit()}
                  disabled={loading}
                  className="h-[50px] cursor-pointer whitespace-nowrap rounded-[10px] border-none bg-highlight px-6 font-body text-[13px] font-extrabold text-heading transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? "…" : "Save my spot →"}
                </button>
              </div>
            )}
            {submitError ? (
              <p className="mt-2 text-center text-sm font-medium text-red-300">
                Something went wrong — try again
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                track("cta_click", "appstore_btn");
              }}
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
              onClick={(e) => {
                e.preventDefault();
                track("cta_click", "playstore_btn");
              }}
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