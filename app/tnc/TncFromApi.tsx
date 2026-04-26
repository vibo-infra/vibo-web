"use client";

import { useEffect, useState } from "react";
import type { TncPayload } from "@/lib/api/types";
import { fetchTncClient } from "@/lib/api/services/webApi";
import { TncContent } from "./TncContent";

function formatLastUpdated(raw: string): string {
  const d = new Date(raw);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  }
  return raw;
}

export function TncFromApi() {
  const [payload, setPayload] = useState<TncPayload | null | undefined>(
    undefined
  );

  useEffect(() => {
    let cancelled = false;
    void fetchTncClient().then((data) => {
      if (cancelled) return;
      setPayload(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (payload === undefined) {
    return <p className="text-sm font-light text-muted">Loading…</p>;
  }

  if (payload === null) {
    return (
      <p className="text-sm font-light leading-relaxed text-muted">
        We couldn&apos;t load terms. Please check your connection or try again later.
      </p>
    );
  }

  return (
    <>
      <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-muted before:h-px before:w-5 before:bg-faint before:content-['']">
        Last updated: {formatLastUpdated(payload.last_updated)}
      </span>

      <h1 className="mt-4 mb-3 font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
        Terms & Conditions
      </h1>

      <p className="mb-16 text-base font-light leading-relaxed text-body">
        We wrote this to be read — not to protect us from you, but to make sure
        we&apos;re both clear on what VIBO is, what we promise, and what we ask
        of you.
      </p>

      <div className="mb-16 h-px w-full bg-line" />

      <TncContent sections={payload.sections} />
    </>
  );
}
