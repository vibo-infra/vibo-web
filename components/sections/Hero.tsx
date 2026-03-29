"use client";

import { useState, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { socialProofAvatars } from "@/lib/constants";

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!email.trim() || !email.includes("@")) {
      setError(true);
      setTimeout(() => setError(false), 1500);
      return;
    }
    setEmail("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }, [email]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleSubmit();
    },
    [handleSubmit]
  );

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-[130px] pb-[90px]" id="top">
      {/* Background gradient dot */}
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

        <FadeIn delay={0.1}>
          <h1 className="mb-7 max-w-[820px] font-display text-[clamp(46px,6.5vw,88px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-heading">
            The weekend you
            <br />
            <em className="font-semibold italic">actually want</em> is
            <br />
            <span className="underline-word">already out there.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mb-10 max-w-[520px] text-[17px] font-medium leading-[1.78] text-body">
            Somewhere near you, someone is hosting a hike, a cooking class, a
            rooftop jam session. VIBO connects you to the people making it
            happen — and the ones showing up.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col gap-4" id="wl">
            <div className="flex max-w-[460px] items-center gap-2">
              <input
                id="emailInput"
                type="email"
                value={submitted ? "" : email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  submitted
                    ? "✓ You're on the list — we'll be in touch!"
                    : "your@email.com"
                }
                className={`h-[50px] flex-1 rounded-[10px] border bg-surface px-[18px] font-body text-sm font-semibold text-heading outline-none transition-colors placeholder:text-faint focus:border-heading ${
                  error
                    ? "border-red-400"
                    : submitted
                      ? "border-highlight"
                      : "border-line-strong"
                }`}
              />
              <button
                onClick={handleSubmit}
                className="h-[50px] cursor-pointer whitespace-nowrap rounded-[10px] border-none bg-heading px-6 font-body text-[13px] font-extrabold tracking-[0.02em] text-page transition-all hover:-translate-y-px hover:opacity-90"
              >
                Save my spot →
              </button>
            </div>

            <p className="text-xs font-medium text-faint">
              Free forever for attendees. One email when your city goes live.
              Nothing else.
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
                <strong className="font-extrabold text-body">1,200 people</strong>{" "}
                already in line
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
