"use client";

import { useCallback, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import { mapPins, mapFilters } from "@/lib/constants";
import type { NearbyEvent } from "@/lib/api/types";
import { safeDisplayText } from "@/lib/api/sanitize";
import { fetchNearbyEventsClient } from "@/lib/api/services/webApi";
import { track } from "@/lib/analytics";

type MapSectionProps = {
  initialEvents: NearbyEvent[];
};

type PinView = {
  key: string;
  left: string;
  top: string;
  color: "orange" | "teal";
  title: string;
  lines: string[];
};

function eventToPinLines(ev: NearbyEvent): string[] {
  const price =
    ev.is_free || ev.price == null ? "Free" : `₹${ev.price}`;
  return [
    safeDisplayText(ev.category, 80),
    safeDisplayText(ev.location, 100),
    price,
  ];
}

export function MapSection({ initialEvents }: MapSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [events, setEvents] = useState<NearbyEvent[]>(initialEvents);
  const [loading, setLoading] = useState(false);

  const pins: PinView[] = useMemo(() => {
    if (!events.length) {
      return mapPins.map((p, i) => ({
        key: `s-${i}`,
        left: p.left,
        top: p.top,
        color: p.color,
        title: p.title,
        lines: [...p.meta],
      }));
    }
    return events.map((ev, i) => {
      const slot = mapPins[i % mapPins.length];
      return {
        key: ev.id,
        left: slot.left,
        top: slot.top,
        color: slot.color,
        title: safeDisplayText(ev.title, 200),
        lines: eventToPinLines(ev),
      };
    });
  }, [events]);

  const soon = events.slice(0, 3);

  const onFilter = useCallback(async (filter: string) => {
    setActiveFilter(filter);
    track("cta_click", "map_filter", { category: filter });
    setLoading(true);
    try {
      const next = await fetchNearbyEventsClient(
        filter === "All" ? undefined : filter
      );
      setEvents(next);
    } catch {
      /* keep pins */
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section className="py-[100px]" id="map">
      <Container>
        <SectionEyebrow text="Live events" />
        <FadeIn>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
            This is what&apos;s already
            <br />
            <em className="font-light">waiting outside.</em>
          </h2>
        </FadeIn>

        {soon.length > 0 ? (
          <FadeIn delay={0.05}>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-wider text-muted">
              Happening soon
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {soon.map((ev) => (
                <div
                  key={ev.id}
                  className="min-w-[200px] flex-1 rounded-xl border border-line bg-page p-3"
                >
                  <div className="mb-1 text-xs font-medium text-heading">
                    {safeDisplayText(ev.title, 120)}
                  </div>
                  <div className="text-[10px] text-muted">
                    {safeDisplayText(ev.category, 60)} ·{" "}
                    {safeDisplayText(ev.location, 80)}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        ) : null}

        <FadeIn delay={0.1}>
          <div
            className={`relative mt-12 h-[420px] overflow-hidden rounded-card border border-line bg-page transition-opacity duration-300 ${
              loading ? "opacity-60" : "opacity-100"
            }`}
          >
            <div className="absolute inset-0 bg-page" />
            <div className="map-grid-lines absolute inset-0" />

            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5">
              {mapFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => void onFilter(filter)}
                  className={`cursor-pointer rounded-full border px-3 py-[5px] text-[11px] font-medium transition-all ${
                    activeFilter === filter
                      ? "border-accent bg-accent text-white"
                      : "border-line-strong bg-page text-body hover:border-accent hover:bg-accent hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {pins.map((pin) => (
              <div
                key={pin.key}
                className="group absolute cursor-pointer transition-transform hover:scale-110"
                style={{ left: pin.left, top: pin.top }}
              >
                <div
                  className={`h-3.5 w-3.5 rounded-full border-2 border-page ${
                    pin.color === "orange"
                      ? "bg-accent shadow-[0_0_0_4px_rgba(255,92,43,0.15)]"
                      : "bg-[#00B4A0] shadow-[0_0_0_4px_rgba(0,180,160,0.15)]"
                  }`}
                />

                <div className="pointer-events-none absolute bottom-[22px] left-1/2 z-10 min-w-[200px] -translate-x-1/2 rounded-lg border border-line-strong bg-page px-3.5 py-2.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="mb-1 text-[13px] font-medium text-heading whitespace-nowrap">
                    {pin.title}
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-muted">
                    {pin.lines.map((m, j) => (
                      <span key={j}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-page px-3 py-1 text-[11px] text-faint">
              {events.length > 0
                ? "Hover a dot for details · Near Mumbai"
                : "Hover a dot to see event details · Events shown are illustrative"}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
