"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import type { IconType } from "react-icons";
import { FaMountainSun } from "react-icons/fa6";
import {
  MdDirectionsBike,
  MdPalette,
  MdSportsFootball,
  MdSportsSoccer,
} from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import {
  heroActivityChips,
  heroComingSoon,
  heroHookQuestionLines,
  heroScenarioSlides,
} from "@/lib/heroIntro";

const SLIDE_MS = 5000;
const SWIPE_MIN_PX = 48;
const SLIDE_COUNT = heroScenarioSlides.length;

const CHIP_ICONS: Record<(typeof heroActivityChips)[number]["iconKey"], IconType> = {
  trek: FaMountainSun,
  cafe: MdPalette,
  football: MdSportsSoccer,
  pottery: MdPalette,
  clubs: MdSportsSoccer,
  turf: MdSportsFootball,
  cycling: MdDirectionsBike,
  host: IoAddCircleOutline,
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function HeroHook() {
  const [ix, setIx] = useState(0);
  /** 1 = forward (next), -1 = back — drives enter/exit direction */
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [slidesHoverPaused, setSlidesHoverPaused] = useState(false);
  /** True while a finger is on the slides: auto-advance is paused so your gesture wins */
  const [slideTouchActive, setSlideTouchActive] = useState(false);
  /** Bumped after touch ends (and on swipe) so the 5s auto timer restarts from now */
  const [autoTimerEpoch, setAutoTimerEpoch] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const bumpAutoTimer = useCallback(() => {
    setAutoTimerEpoch((n) => n + 1);
  }, []);

  const slidesPaused = slidesHoverPaused || slideTouchActive;

  useEffect(() => {
    if (reduceMotion || slidesPaused) return;
    const t = window.setInterval(() => {
      setSlideDir(1);
      setIx((i) => (i + 1) % SLIDE_COUNT);
    }, SLIDE_MS);
    return () => window.clearInterval(t);
  }, [reduceMotion, slidesPaused, autoTimerEpoch]);

  const onSlideTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
    setSlideTouchActive(true);
  };

  const onSlideTouchEnd = (e: React.TouchEvent) => {
    setSlideTouchActive(false);
    bumpAutoTimer();

    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || e.changedTouches.length !== 1) return;

    const end = e.changedTouches[0];
    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;

    if (
      Math.abs(dx) < SWIPE_MIN_PX ||
      Math.abs(dx) < Math.abs(dy) * 1.15
    ) {
      return;
    }

    if (dx < 0) {
      setSlideDir(1);
      setIx((i) => (i + 1) % SLIDE_COUNT);
    } else {
      setSlideDir(-1);
      setIx((i) => (i - 1 + SLIDE_COUNT) % SLIDE_COUNT);
    }
  };

  const onSlideTouchCancel = () => {
    touchStartRef.current = null;
    setSlideTouchActive(false);
    bumpAutoTimer();
  };

  return (
    <div className="mb-8">
      <FadeIn>
        <div
          className="inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-2.5 rounded-2xl border border-line-strong bg-page/90 px-4 py-2.5 shadow-sm backdrop-blur-sm min-[900px]:justify-start"
          aria-label={`${heroComingSoon}. Coming soon on App Store and Google Play.`}
        >
          <span className="inline-flex items-center gap-2.5">
            <span
              className="vibo-live-dot h-2 w-2 shrink-0 rounded-full bg-live shadow-[0_0_0_3px_var(--live-dim)] animate-[pulse-dot_2s_ease-in-out_infinite]"
              aria-hidden
            />
            <span className="text-[11px] font-bold uppercase leading-tight tracking-[0.14em] text-muted">
              {heroComingSoon}
            </span>
          </span>
          <span
            className="hidden h-4 w-px shrink-0 bg-line-strong sm:block"
            aria-hidden
          />
          <div className="flex items-center gap-3 text-heading sm:gap-2.5">
            <SiGoogleplay
              className="h-5 w-5 text-muted shrink-0 opacity-[0.82] transition-opacity hover:opacity-100 sm:h-[22px] sm:w-[22px]"
              aria-hidden
            />
            <SiAppstore
              className="h-5 w-5 text-muted shrink-0 opacity-[0.82] transition-opacity hover:opacity-100 sm:h-[22px] sm:w-[22px]"
              aria-hidden
            />
          </div>
        </div>
        <h1 className="mt-6 max-w-[22ch] font-body text-[clamp(2rem,6.2vw,3.35rem)] font-black leading-[1.12] tracking-[-0.035em] text-balance text-heading">
          {heroHookQuestionLines[0]}
          <br />
          {heroHookQuestionLines[1]}
        </h1>
      </FadeIn>

      <FadeIn delay={0.06}>
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-2 min-[900px]:justify-start"
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: { staggerChildren: 0.04, delayChildren: 0.04 },
            },
          }}
        >
          {heroActivityChips.map(({ label, iconKey }) => {
            const Icon = CHIP_ICONS[iconKey];
            return (
              <motion.span
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-page/95 px-3.5 py-2 text-[18px] font-semibold text-body shadow-[0_1px_2px_rgba(15,15,15,0.04)] transition-shadow hover:shadow-md"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                {label}
              </motion.span>
            );
          })}
        </motion.div>
      </FadeIn>

      {/* P2: one step below h1 — neutral color; orange accent line sits under carousel */}
      <div
        className="mt-10 flex flex-col items-center gap-7 text-center min-[900px]:items-start min-[900px]:text-left"
        aria-live="polite"
      >
        <div className="w-full min-h-[4.25rem]">
          {reduceMotion ? (
            <ul className="mx-auto max-w-xl list-none space-y-3 min-[900px]:mx-0">
              {heroScenarioSlides.slice(0, 2).map((line) => (
                <li
                  key={line}
                  className="border-l border-line-strong pl-4 text-[clamp(1.8rem,2.35vw,2.125rem)] font-medium leading-relaxed text-body"
                >
                  {line}
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="overflow-hidden py-1 touch-manipulation select-none"
              onMouseEnter={() => setSlidesHoverPaused(true)}
              onMouseLeave={() => setSlidesHoverPaused(false)}
              onTouchStart={onSlideTouchStart}
              onTouchEnd={onSlideTouchEnd}
              onTouchCancel={onSlideTouchCancel}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={ix}
                  initial={
                    slideDir === 1
                      ? { opacity: 0, x: 28 }
                      : { opacity: 0, x: -28 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    slideDir === 1
                      ? { opacity: 0, x: -28 }
                      : { opacity: 0, x: 28 }
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto max-w-xl text-[clamp(1.8rem,2.35vw,2.125rem)] font-medium leading-[1.5] tracking-[0.01em] text-body min-[900px]:mx-0"
                >
                  {heroScenarioSlides[ix]}
                </motion.p>
              </AnimatePresence>
            </div>
          )}
        </div>
        <div className="vibo-hero-carousel-line" aria-hidden />
      </div>
    </div>
  );
}
