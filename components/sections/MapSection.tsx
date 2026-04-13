"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import { mapFilters } from "@/lib/constants";
import type { NearbyEvent } from "@/lib/api/types";
import { safeDisplayText } from "@/lib/api/sanitize";
import { fetchNearbyEvents } from "@/lib/map-events";
import { track } from "@/lib/analytics";
import {
  OsmMapEmbed,
  type OsmMapMarker,
} from "@/components/map/OsmMapEmbed";

const MUMBAI_CENTER: [number, number] = [19.2236, 72.8841];

function eventToLatLng(ev: NearbyEvent, i: number): [number, number] {
  if (ev.lat != null && ev.lng != null) return [ev.lat, ev.lng];
  const angle = (i * 1.17 + ev.id.length * 0.13) % (Math.PI * 2);
  const r = 0.011 + (i % 6) * 0.0045;
  return [
    MUMBAI_CENTER[0] + r * Math.cos(angle),
    MUMBAI_CENTER[1] + r * Math.sin(angle),
  ];
}

function eventToPinLines(ev: NearbyEvent): string[] {
  const price =
    ev.is_free || ev.price == null ? "Free" : `₹${ev.price}`;
  return [
    safeDisplayText(ev.category, 80),
    safeDisplayText(ev.location, 100),
    price,
  ];
}

export function MapSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [events, setEvents] = useState<NearbyEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void fetchNearbyEvents(activeFilter === "All" ? undefined : activeFilter)
      .then((list) => {
        if (cancelled) return;
        setEvents(list);
      })
      .catch(() => {
        if (!cancelled) setEvents([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeFilter]);

  const osmMarkers: OsmMapMarker[] = useMemo(() => {
    return events.map((ev, i) => {
      const [lat, lng] = eventToLatLng(ev, i);
      return {
        id: ev.id,
        lat,
        lng,
        title: safeDisplayText(ev.title, 200),
        lines: eventToPinLines(ev),
        color: i % 2 === 0 ? "orange" : "teal",
      };
    });
  }, [events]);

  const soon = events.slice(0, 3);

  const onFilter = useCallback((filter: string) => {
    setLoading(true);
    setActiveFilter(filter);
    track("cta_click", "map_filter", { category: filter });
  }, []);

  return (
    <section className="scroll-mt-[76px] py-[88px] md:py-[100px]" id="around">
      <Container>
        <SectionEyebrow text="Around you" />
        <FadeIn>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
            {events.length > 0 ? (
              <>
                Real plans
                <br />
                <em className="font-light not-italic text-accent">
                  near where you are.
                </em>
              </>
            ) : (
              <>
                This map fills in
                <br />
                <em className="font-light not-italic text-accent">
                  as people host nearby.
                </em>
              </>
            )}
          </h2>
        </FadeIn>

        <FadeIn delay={0.06}>
          <p className="mt-5 max-w-[560px] text-[15px] font-medium leading-relaxed text-body">
            What it will look like.
            Soon your events will appear here.
          </p>
        </FadeIn>

        {soon.length > 0 ? (
          <FadeIn delay={0.08}>
            <p className="mt-8 text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Starting soon
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {soon.map((ev) => (
                <div
                  key={ev.id}
                  className="min-w-[200px] flex-1 rounded-xl border border-line bg-page p-3.5"
                >
                  <div className="mb-1 text-sm font-semibold text-heading">
                    {safeDisplayText(ev.title, 120)}
                  </div>
                  <div className="text-[11px] text-muted">
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
            className={`relative mt-10 overflow-hidden rounded-card border border-line bg-page transition-opacity duration-300 ${
              loading ? "opacity-70" : "opacity-100"
            }`}
          >
            <div className="absolute top-3 left-3 z-20 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5">
              {mapFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => onFilter(filter)}
                  className={`cursor-pointer rounded-full border px-3 py-[6px] text-[11px] font-semibold shadow-sm backdrop-blur-sm transition-all ${
                    activeFilter === filter
                      ? "border-accent bg-accent text-white"
                      : "border-line-strong bg-page/95 text-body hover:border-accent hover:bg-accent hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <OsmMapEmbed
              className="h-[min(56vh,480px)] min-h-[320px] rounded-card [&_.leaflet-container]:h-full [&_.leaflet-container]:min-h-[320px] [&_.leaflet-container]:rounded-b-card [&_.leaflet-container]:font-[family-name:var(--font-nunito)]"
              markers={osmMarkers}
              center={MUMBAI_CENTER}
              zoom={12}
            />

            <div className="border-t border-line bg-surface-alt/80 px-4 py-2.5 text-center text-[11px] font-medium text-muted">
              Vibo · Pins are illustrative, exact coordinates
              aren&apos;t set yet · Near Mumbai first
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
