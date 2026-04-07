"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineArrowUp } from "react-icons/hi2";

const MIN_Y = 280;
const DELTA = 6;

/**
 * Back-to-top control: visible only while the user is scrolling up (not at top).
 * Subtle at rest; stronger on hover.
 */
export function ScrollUpToTop() {
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = typeof window !== "undefined" ? window.scrollY : 0;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const prev = lastY.current;
        const dy = y - prev;

        if (y < 120) {
          setVisible(false);
        } else if (dy < -DELTA && y > MIN_Y) {
          setVisible(true);
        } else if (dy > DELTA) {
          setVisible(false);
        }

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setVisible(false);
      }}
      className={`fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[90] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-page/95 text-heading shadow-md backdrop-blur-sm transition-all duration-300 ease-out hover:scale-110 hover:border-accent hover:text-accent hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page focus-visible:outline-none sm:right-8 sm:bottom-8 sm:h-12 sm:w-12 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-[0.78] hover:opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <HiOutlineArrowUp className="h-5 w-5 sm:h-[22px] sm:w-[22px]" aria-hidden />
    </button>
  );
}
