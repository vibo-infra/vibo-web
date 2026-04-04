"use client";

import { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { contribMarqueeConfig } from "@/lib/contribMarquee";

export function ContribMarqueeStrip() {
  const cfg = contribMarqueeConfig;
  const [dismissed, setDismissed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(cfg.storageKey) === "1") return;
      setDismissed(false);
    } catch {
      setDismissed(false);
    }
  }, [cfg.storageKey]);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(cfg.storageKey, "1");
    } catch {
      /* private mode */
    }
    setDismissed(true);
  }, [cfg.storageKey]);

  if (!cfg.enabled || !mounted || dismissed) return null;

  const segment = (
    <>
      <span className="font-semibold text-heading mr-2">{cfg.hook}</span>
      <span className="text-body">{cfg.tail}</span>
    </>
  );

  return (
    <div
      className="fixed top-[60px] right-0 left-0 z-[99] flex h-9 items-stretch border-b border-line bg-surface-alt/95 backdrop-blur-md dark:bg-surface/95"
      role="region"
      aria-label="Contribute"
    >
      <a
      
        href={cfg.mailtoHref}
        className="relative flex min-h-9 min-w-0 flex-1 items-center overflow-hidden py-0 no-underline outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        {/* Reduced motion fallback: one static centered line */}
        <span className="vibo-contrib-marquee-fallback">
          {segment}
          <span className="shrink-0 text-accent underline-offset-2 sm:ml-1">
            Email →
          </span>
        </span>

        {/* Marquee viewport + track */}
        <div className="vibo-contrib-marquee-viewport">
          <div className="vibo-contrib-marquee-track">
            {/* Two identical chunks — second one makes the loop seamless */}
            <div className="vibo-contrib-marquee-chunk" aria-hidden>
              {segment}
              <span className="shrink-0 text-accent ml-2 mr-6">Email →</span>
            </div>
            <div className="vibo-contrib-marquee-chunk" aria-hidden>
              {segment}
              <span className="shrink-0 text-accent ml-2 mr-6">Email →</span>
            </div>
          </div>
        </div>
      </a>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dismiss();
        }}
        className="flex h-full w-11 shrink-0 cursor-pointer touch-manipulation items-center justify-center border-l border-line bg-page/80 text-muted transition-colors hover:bg-surface-alt hover:text-heading dark:bg-surface/80"
        aria-label="Dismiss"
      >
        <IoClose className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}