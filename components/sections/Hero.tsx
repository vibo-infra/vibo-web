"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig, socialProofAvatars } from "@/lib/constants";
import {
  fetchWaitlistCountClient,
  fetchReferralClient,
  postReferralClickClient,
  joinWaitlistClient,
} from "@/lib/api/services/webApi";
import { safeDisplayText, sanitizeReferralCode } from "@/lib/api/sanitize";
import { track } from "@/lib/analytics";
import { WaitlistCityStep } from "@/components/waitlist/WaitlistCityStep";

export function Hero() {
  const [email, setEmail] = useState("");
  const [inlineError, setInlineError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [inviter, setInviter] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    position: number | null;
    code: string;
    already: boolean;
    email: string;
  } | null>(null);
  const [cityStepComplete, setCityStepComplete] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroViewTracked = useRef(false);

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
    void fetchReferralClient(ref).then((data) => {
      if (data?.valid) setInviter(data.owner_name);
    });
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !heroViewTracked.current) {
            heroViewTracked.current = true;
            track("section_view", "hero");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
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
        source: "hero_form",
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
      track("cta_click", "hero_cta");
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  }, [email]);

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

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-[130px] pb-[90px]"
      id="top"
    >
      <div className="pointer-events-none absolute top-1/2 -right-[120px] h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--yellow-dim)_0%,transparent_68%)]" />
      <div className="pointer-events-none absolute bottom-[10%] -left-[80px] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,var(--orange-dim)_0%,transparent_70%)]" />

      <Container>
        <FadeIn>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-1.5">
            <div className="h-2 w-2 rounded-full bg-highlight animate-[pulse-dot_2s_ease-in-out_infinite]" />
            <span className="text-[12px] font-bold tracking-[0.02em] text-body">
              Early access open · Mumbai first
            </span>
          </div>
        </FadeIn>

        {/* {inviter ? (
          <FadeIn delay={0.05}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-1.5">
              <span className="text-[12px] font-bold tracking-[0.02em] text-body">
                Invited by {safeDisplayText(inviter, 80)}
              </span>
            </div>
          </FadeIn>
        ) : null} */}

        <FadeIn delay={0.1}>
          <h1 className="mb-4 max-w-[820px] font-display text-[clamp(46px,6.5vw,88px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-heading">
            Something fun is
            <br />
            <em className="font-semibold italic">happening near you.</em>
            <br />
            You just
            <br />
            <span className="underline-word">don&apos;t know it yet.</span>
          </h1>
        </FadeIn>

        {/* <FadeIn delay={0.15}>
          <p className="mb-7 text-[13px] font-semibold italic tracking-wide text-muted">
            — good vibes happen nearby
          </p>
        </FadeIn> */}

        <FadeIn delay={0.2}>
          <p className="mb-5 max-w-[520px] text-[17px] font-medium leading-[1.78] text-body">
            Somewhere close by, someone is organising a sunrise trek, a
            chai-and-sketch morning, a rooftop jam. VIBO finds those people —
            and gets you to the door.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col gap-4" id="wl">
            {success ? (
              <div className="max-w-[460px] animate-[fadeUp_0.35s_ease_forwards]">
                {/* Position confirmation */}
                <p className="mb-4 text-[1rem] font-semibold text-body">
                  {success.already || success.position == null ? (
                    "You're already one of us. 🤝"
                  ) : (
                    <>
                      You&apos;re in.{" "}
                      <span className="font-extrabold text-[1.5rem] text-heading animate-[pop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
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
                    theme="hero"
                    onComplete={() => setCityStepComplete(true)}
                  />
                ) : null}

                {/* Share — always visible after join; city step hides above when done */}
                <div className="space-y-3 pt-1">

                  <p className="text-sm font-medium text-body">
                    Share: {" "}
                    <a
                      className="text-[15px] font-extrabold tracking-[0.02em] text-heading underline underline-offset-2"
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
                    className="h-[46px] cursor-pointer whitespace-nowrap rounded-[10px] border-none bg-heading px-6 font-body text-[13px] font-extrabold tracking-[0.02em] text-page transition-all hover:-translate-y-px hover:opacity-90"
                  >
                    Copy link
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="max-w-[460px] text-[13px] font-semibold leading-snug tracking-[0.01em] text-muted">
                  Get notified when VIBO launches in your city.
                </p>
                <div className="flex max-w-[460px] items-center gap-2">
                  <input
                    id="emailInput"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="your@email.com"
                    disabled={loading}
                    className={`h-[50px] flex-1 rounded-[10px] border bg-surface px-[18px] font-body text-sm font-semibold text-heading outline-none transition-colors placeholder:text-faint focus:border-heading ${
                      inlineError ? "border-red-400" : "border-line-strong"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => void handleSubmit()}
                    disabled={loading}
                    className="h-[50px] cursor-pointer whitespace-nowrap rounded-[10px] border-none bg-heading px-6 font-body text-[13px] font-extrabold tracking-[0.02em] text-page transition-all hover:-translate-y-px hover:opacity-90 disabled:opacity-60"
                  >
                    {loading ? "…" : "Save my spot →"}
                  </button>
                </div>
                {submitError ? (
                  <p className="text-sm font-medium text-red-500">
                    Something went wrong — try again
                  </p>
                ) : null}
              </>
            )}

            <p className="text-xs font-medium text-faint">
              Free forever for attendees. One email when VIBO hits your city.
              That&apos;s it.
            </p>

            <div className="flex items-center gap-5 pt-2">
              <div className="flex">
                {socialProofAvatars.map((initials, i) => (
                  <span
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-page bg-surface-alt text-[10px] font-extrabold text-body first:ml-0 -ml-2"
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <span className="text-[13px] font-semibold text-muted">
                {count != null ? (
                  <>
                    <strong className="font-extrabold text-body">
                      {count.toLocaleString("en-IN")}
                    </strong>{" "}
                    people already in line
                  </>
                ) : (
                  <>
                    <strong className="font-extrabold text-body">0</strong>{" "}
                    people already in line
                  </>
                )}
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}