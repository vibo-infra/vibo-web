"use client";

import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import { mapFilters } from "@/lib/constants";
import type { NearbyEvent } from "@/lib/api/types";
import { safeDisplayText } from "@/lib/api/sanitize";
import { fetchNearbyEvents } from "@/lib/map-events";
import { track } from "@/lib/analytics";

type PinView = {
  key: string;
  left: string;
  top: string;
  color: "orange" | "teal";
  title: string;
  lines: string[];
  soloPlaceholder?: boolean;
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

function isPlaceholderPinKey(key: string) {
  return key === "be-first" || key === "filter-empty";
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export function MapSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [events, setEvents] = useState<NearbyEvent[]>([]);
  const [cityHasEvents, setCityHasEvents] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openPinKey, setOpenPinKey] = useState<string | null>(null);
  const [hoverPinKey, setHoverPinKey] = useState<string | null>(null);
  const [popoutBox, setPopoutBox] = useState<{
    left: number;
    top: number;
    width: number;
    ready: boolean;
  }>({ left: 0, top: 0, width: 260, ready: false });

  const mapCardRef = useRef<HTMLDivElement>(null);
  const pinBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const popoutRef = useRef<HTMLDivElement>(null);
  const hoverClearRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayPinKey = openPinKey ?? hoverPinKey;

  const clearHoverSoon = useCallback(() => {
    if (hoverClearRef.current) clearTimeout(hoverClearRef.current);
    hoverClearRef.current = setTimeout(() => setHoverPinKey(null), 120);
  }, []);

  const cancelHoverClear = useCallback(() => {
    if (hoverClearRef.current) {
      clearTimeout(hoverClearRef.current);
      hoverClearRef.current = null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void fetchNearbyEvents(
      activeFilter === "All" ? undefined : activeFilter
    )
      .then((list) => {
        if (cancelled) return;
        setEvents(list);
        if (activeFilter === "All") {
          setCityHasEvents(list.length > 0);
        }
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

  useEffect(() => {
    setOpenPinKey(null);
    setHoverPinKey(null);
  }, [activeFilter, events]);

  useEffect(() => {
    if (openPinKey === null) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = e.target as Node | null;
      if (!el) return;
      if (!mapCardRef.current?.contains(el)) {
        setOpenPinKey(null);
        return;
      }
      if ((el as Element).closest?.("[data-map-pin]")) return;
      if ((el as Element).closest?.("[data-map-popout]")) return;
      setOpenPinKey(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openPinKey]);

  const pins: PinView[] = useMemo(() => {
    if (!events.length) {
      if (cityHasEvents) {
        return [
          {
            key: "filter-empty",
            left: "50%",
            top: "48%",
            color: "orange",
            title: "Nothing in this category",
            lines: [],
            soloPlaceholder: true,
          },
        ];
      }
      return [
        {
          key: "be-first",
          left: "50%",
          top: "48%",
          color: "teal",
          title: "Be the first to add one :)",
          lines: [],
          soloPlaceholder: true,
        },
      ];
    }
    return events.map((ev, i) => ({
      key: ev.id,
      left: `${20 + (i * 15) % 65}%`,
      top: `${30 + (i * 12) % 45}%`,
      color: i % 2 === 0 ? "orange" : "teal",
      title: safeDisplayText(ev.title, 200),
      lines: eventToPinLines(ev),
    }));
  }, [events, cityHasEvents]);

  const layoutPopout = useCallback(() => {
    const map = mapCardRef.current;
    const btn = displayPinKey
      ? pinBtnRefs.current[displayPinKey]
      : null;
    const bubble = popoutRef.current;
    if (!map || !btn || !bubble || !displayPinKey) {
      setPopoutBox((p) => ({ ...p, ready: false }));
      return;
    }

    const pad = 12;
    const footReserve = 56;
    const mapR = map.getBoundingClientRect();
    const pinR = btn.getBoundingClientRect();

    const maxW = Math.min(280, mapR.width - pad * 2);
    bubble.style.width = `${maxW}px`;

    const bh = bubble.offsetHeight;
    const pinCx = pinR.left - mapR.left + pinR.width / 2;
    const pinTop = pinR.top - mapR.top;
    const pinBot = pinR.bottom - mapR.top;

    let left = pinCx - maxW / 2;
    left = clamp(left, pad, mapR.width - maxW - pad);

    let top = pinTop - bh - 10;
    if (top < pad) top = pinBot + 10;
    top = clamp(top, pad, mapR.height - bh - footReserve);

    setPopoutBox({ left, top, width: maxW, ready: true });
  }, [displayPinKey]);

  useLayoutEffect(() => {
    if (!displayPinKey) {
      setPopoutBox({ left: 0, top: 0, width: 260, ready: false });
      return;
    }
    layoutPopout();
    const id = requestAnimationFrame(() => layoutPopout());
    return () => cancelAnimationFrame(id);
  }, [displayPinKey, pins, layoutPopout]);

  useEffect(() => {
    const map = mapCardRef.current;
    if (!map) return;
    const ro = new ResizeObserver(() => {
      if (displayPinKey) layoutPopout();
    });
    ro.observe(map);
    return () => ro.disconnect();
  }, [displayPinKey, layoutPopout]);

  const activePin = displayPinKey
    ? pins.find((p) => p.key === displayPinKey)
    : null;

  const soon = events.slice(0, 3);

  const onFilter = useCallback((filter: string) => {
    setActiveFilter(filter);
    track("cta_click", "map_filter", { category: filter });
  }, []);

  const togglePin = useCallback((key: string) => {
    setOpenPinKey((k) => (k === key ? null : key));
    setHoverPinKey(null);
  }, []);

  return (
    <section className="py-[100px]" id="map">
      <Container>
        <SectionEyebrow text="Live events" />
        <FadeIn>
          {cityHasEvents ? (
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
              This is what&apos;s already
              <br />
              <em className="font-light">waiting outside.</em>
            </h2>
          ) : (
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
              See live events on the map
              <br />
              <em className="font-light text-accent">- waiting for the first pin {":)"}</em>
            </h2>
          )}
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
            ref={mapCardRef}
            className={`relative mt-12 h-[420px] overflow-hidden rounded-card border border-line bg-page transition-opacity duration-300 ${
              loading ? "opacity-60" : "opacity-100"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 bg-page" />
            <div className="map-grid-lines pointer-events-none absolute inset-0" />

            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5">
              {mapFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => onFilter(filter)}
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

            {pins.map((pin) => {
              const pulsate = Boolean(pin.soloPlaceholder);
              const dotClass =
                pin.color === "orange"
                  ? pulsate
                    ? "map-pin-pulse-orange bg-accent border-2 border-page"
                    : "border-2 border-page bg-accent shadow-[0_0_0_4px_rgba(255,92,43,0.15)]"
                  : pulsate
                    ? "map-pin-pulse-teal border-2 border-page bg-[#00B4A0]"
                    : "border-2 border-page bg-[#00B4A0] shadow-[0_0_0_4px_rgba(0,180,160,0.15)]";

              return (
                <div
                  key={pin.key}
                  data-map-pin
                  className={`absolute z-30 ${
                    isPlaceholderPinKey(pin.key)
                      ? "-translate-x-1/2 -translate-y-1/2"
                      : ""
                  }`}
                  style={{ left: pin.left, top: pin.top }}
                  onMouseEnter={() => {
                    if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
                      cancelHoverClear();
                      if (!openPinKey) setHoverPinKey(pin.key);
                    }
                  }}
                  onMouseLeave={() => {
                    if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
                      clearHoverSoon();
                    }
                  }}
                >
                  <button
                    ref={(el) => {
                      pinBtnRefs.current[pin.key] = el;
                    }}
                    type="button"
                    aria-expanded={openPinKey === pin.key}
                    aria-label={`Map pin: ${pin.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(pin.key);
                    }}
                    className="relative flex h-11 min-h-[44px] w-11 min-w-[44px] cursor-pointer touch-manipulation items-center justify-center rounded-full border-0 bg-transparent p-0 outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                  >
                    <span
                      className={`relative z-[1] block h-3.5 w-3.5 shrink-0 rounded-full ${dotClass}`}
                    />
                  </button>
                </div>
              );
            })}

            {activePin ? (
              <div
                ref={popoutRef}
                data-map-popout
                role="tooltip"
                className={`absolute z-50 rounded-lg border border-line-strong bg-page px-3.5 py-2.5 shadow-lg transition-opacity duration-150 ${
                  popoutBox.ready
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                style={{
                  left: popoutBox.left,
                  top: popoutBox.top,
                  width: popoutBox.width,
                  maxHeight: "min(200px, calc(100% - 80px))",
                  overflowY: "auto",
                }}
                onMouseEnter={() => {
                  cancelHoverClear();
                  if (!openPinKey) setHoverPinKey(activePin.key);
                }}
                onMouseLeave={() => {
                  if (!openPinKey) clearHoverSoon();
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="break-words text-[13px] font-medium text-heading">
                  {activePin.title}
                </div>
                {activePin.lines.length > 0 ? (
                  <div className="mt-1 flex flex-wrap gap-2 break-words text-[11px] text-muted">
                    {activePin.lines.map((m, j) => (
                      <span key={j}>{m}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="absolute bottom-4 left-1/2 z-20 max-w-[calc(100%-2rem)] -translate-x-1/2 text-center text-[11px] text-faint">
              <span className="rounded-full border border-line bg-page px-3 py-1">
                {cityHasEvents
                  ? "Tap or hover a dot for details · Near Mumbai"
                  : "Tap or hover a dot for details · Illustrative map"}
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
