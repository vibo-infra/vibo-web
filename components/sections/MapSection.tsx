"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
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

function hasLatLng(ev: NearbyEvent): ev is NearbyEvent & { lat: number; lng: number } {
  return Number.isFinite(ev.lat) && Number.isFinite(ev.lng);
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

function formatEventDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Soon";
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
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
    return events
      .filter(hasLatLng)
      .map((ev, i) => {
        const coordLine = `${ev.lat.toFixed(5)}, ${ev.lng.toFixed(5)}`;
        return {
          id: ev.id,
          lat: ev.lat,
          lng: ev.lng,
          title: safeDisplayText(ev.title, 200),
          lines: [...eventToPinLines(ev), coordLine],
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
    <section className="scroll-mt-[76px] py-20 md:py-24" id="around">
      <Container>
        <SectionEyebrow text="Around you" />
        <FadeIn>
          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.05] tracking-tight text-heading">
                Real plans nearby.
              </h2>
              <p className="mt-4 max-w-[520px] text-[15px] font-medium leading-relaxed text-body">
                A simple preview of what VIBO will help you find and host.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex w-fit rounded-full bg-heading px-5 py-3 text-sm font-extrabold text-page no-underline transition hover:-translate-y-px hover:opacity-90"
            >
              Browse all events
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-9 grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="rounded-card border border-line bg-surface p-4 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
                  Event preview
                </p>
                <span className="rounded-full bg-accent-dim px-3 py-1 text-[11px] font-extrabold text-heading">
                  {loading ? "Loading" : `${events.length} live`}
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {soon.length > 0 ? (
                  soon.map((ev) => (
                    <Link
                      key={ev.id}
                      href={`/events?eventId=${encodeURIComponent(ev.id)}`}
                      className="group rounded-[22px] border border-line bg-page p-4 no-underline transition hover:-translate-y-0.5 hover:border-accent"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-accent">
                            {formatEventDate(ev.starts_at)}
                          </p>
                          <h3 className="mt-2 text-base font-extrabold leading-snug text-heading">
                            {safeDisplayText(ev.title, 90)}
                          </h3>
                        </div>
                        <span className="shrink-0 rounded-full border border-line px-2.5 py-1 text-[11px] font-bold text-muted">
                          {ev.is_free || ev.price == null ? "Free" : `₹${ev.price}`}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold leading-relaxed text-body">
                        {safeDisplayText(ev.location, 90)}
                      </p>
                      <p className="mt-1 text-xs font-bold text-muted">
                        {safeDisplayText(ev.category, 50)}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-[22px] border border-dashed border-line bg-page p-5">
                    <h3 className="text-base font-extrabold text-heading">
                      Be the first host nearby.
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-muted">
                      Create a small plan and let people around you discover it.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`relative min-h-[360px] overflow-hidden rounded-card border border-line bg-page transition-opacity duration-300 ${
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
                className="h-full min-h-[360px] rounded-card [&_.leaflet-container]:h-full [&_.leaflet-container]:min-h-[360px] [&_.leaflet-container]:rounded-card [&_.leaflet-container]:font-[family-name:var(--font-nunito)]"
                markers={osmMarkers}
                center={MUMBAI_CENTER}
                zoom={12}
              />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
