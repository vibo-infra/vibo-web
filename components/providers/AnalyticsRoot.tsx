"use client";

import { useEffect } from "react";
import { initAnalytics, track } from "@/lib/analytics";

export function AnalyticsRoot() {
  useEffect(() => {
    initAnalytics();

    const depths = [25, 50, 75, 90];
    const fired = new Set<number>();

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const pct =
        max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);
      depths.forEach((d) => {
        if (pct >= d && !fired.has(d)) {
          fired.add(d);
          track("scroll_depth", undefined, { depth: d });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
