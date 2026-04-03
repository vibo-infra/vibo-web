"use client";

import { useState, useCallback } from "react";
import { updateWaitlistCityClient } from "@/lib/api/services/webApi";
import { track } from "@/lib/analytics";

export const WAITLIST_DISPLAY_CITIES = [
  "Mumbai",
  "Delhi",
  "Pune",
  "Bangalore",
  "Hyderabad",
  "Others",
] as const;

type Props = {
  email: string;
  theme: "hero" | "cta";
  onComplete: () => void;
};

export function WaitlistCityStep({ email, theme, onComplete }: Props) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const isHero = theme === "hero";

  const pick = useCallback(
    async (city: string) => {
      if (selectedCity) return;
      setError(false);
      setSelectedCity(city);
      try {
        await updateWaitlistCityClient(email, city);
        track("waitlist_city", city);
        window.setTimeout(() => onComplete(), 380);
      } catch {
        setError(true);
        setSelectedCity(null);
      }
    },
    [email, selectedCity, onComplete]
  );

  const skip = useCallback(() => {
    track("waitlist_city", "skip");
    onComplete();
  }, [onComplete]);

  return (
    <div
      className={[
        "animate-[fadeUp_0.32s_ease_forwards]",
        isHero
          ? "space-y-3 border-t border-line pt-4"
          : "space-y-4 border-t border-white/10 pt-5",
      ].join(" ")}
    >
      <p
        className={
          isHero
            ? "text-[13px] font-semibold leading-snug tracking-[0.01em] text-heading"
            : "text-center text-sm font-semibold text-white/90"
        }
      >
        Which city are you in?
      </p>

      <div
        className={[
          "flex flex-wrap gap-2",
          isHero ? "" : "justify-center",
        ].join(" ")}
      >
        {WAITLIST_DISPLAY_CITIES.map((city, i) => {
          const isSelected = selectedCity === city;
          const isDimmed = selectedCity !== null && !isSelected;

          return (
            <button
              key={city}
              type="button"
              disabled={selectedCity !== null}
              onClick={() => void pick(city)}
              style={{ animationDelay: `${i * 40}ms` }}
              className={[
                "animate-[fadeUp_0.3s_ease_both]",
                "min-h-[38px] rounded-full border px-4 py-2 text-[12px] font-semibold",
                "transition-all duration-200 disabled:cursor-default",
                isHero
                  ? isSelected
                    ? "scale-105 border-heading bg-heading text-page shadow-sm"
                    : isDimmed
                    ? "border-line bg-transparent text-heading opacity-25"
                    : "border-line-strong bg-surface text-heading hover:border-heading hover:scale-[1.03]"
                  : isSelected
                  ? "scale-105 border-highlight bg-highlight text-heading shadow-sm"
                  : isDimmed
                  ? "border-white/10 bg-transparent text-white opacity-20"
                  : "border-white/20 bg-white/[0.06] text-white hover:border-white/50 hover:bg-white/10 hover:scale-[1.03]",
              ].join(" ")}
            >
              {isSelected && !error ? (
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={[
                      "inline-block h-[7px] w-[7px] rounded-full animate-[pulse-dot_1s_ease-in-out_infinite]",
                      isHero ? "bg-page" : "bg-heading",
                    ].join(" ")}
                  />
                  {city}
                </span>
              ) : (
                city
              )}
            </button>
          );
        })}
      </div>

      {error ? (
        <p
          className={
            isHero
              ? "text-xs font-medium text-red-500"
              : "text-center text-xs font-medium text-red-300"
          }
        >
          Couldn&apos;t save — try again
        </p>
      ) : null}

      <button
        type="button"
        onClick={skip}
        disabled={selectedCity !== null}
        className={[
          "text-[12px] font-medium underline-offset-2 hover:underline disabled:pointer-events-none disabled:opacity-0",
          "transition-opacity duration-200",
          isHero
            ? "text-muted hover:text-body"
            : "mx-auto block text-white/40 hover:text-white/70",
        ].join(" ")}
      >
        Skip for now
      </button>
    </div>
  );
}