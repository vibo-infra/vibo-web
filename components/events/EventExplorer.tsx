"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { FeedbackPrompt } from "@/components/ui/FeedbackPrompt";
import { useAuth } from "@/context/AuthContext";
import {
  ApiRequestError,
  cancelEventRegistrationClient,
  fetchEventsNearbyClient,
  fetchEventDetailClient,
  registerForEventClient,
  type EventDetail,
  type EventListItem,
} from "@/lib/api/services/appApi";
import { safeDisplayText } from "@/lib/api/sanitize";
import { track } from "@/lib/analytics";

const MUMBAI_COORDS = { lat: 19.076, lng: 72.8777 };

function formatDate(value?: string | null) {
  if (!value) return "Date TBA";
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatPrice(isFree?: boolean, price?: number | string | null) {
  if (isFree || price == null) return "Free";
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export function EventExplorer() {
  const search = useSearchParams();
  const initialEventId = search.get("eventId");
  const { session } = useAuth();
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(initialEventId);
  const [detail, setDetail] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [acting, setActing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showAuthPanel, setShowAuthPanel] = useState(false);
  const [showApplyFeedback, setShowApplyFeedback] = useState(false);
  const [coords, setCoords] = useState(MUMBAI_COORDS);
  const [radiusKm, setRadiusKm] = useState(25);
  const [locationLabel, setLocationLabel] = useState("Mumbai");
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void fetchEventsNearbyClient(
      {
        lat: coords.lat,
        lng: coords.lng,
        radiusKm,
        limit: 100,
      },
      session?.accessToken
    )
      .then(({ events: list }) => {
        if (cancelled) return;
        setEvents(list);
        setSelectedId((current) =>
          current && list.some((event) => event.event_id === current)
            ? current
            : list[0]?.event_id ?? null
        );
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
  }, [coords.lat, coords.lng, radiusKm, session?.accessToken]);

  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    setDetailLoading(true);
    setMessage(null);
    void fetchEventDetailClient(selectedId, session?.accessToken)
      .then(({ event }) => {
        if (cancelled) return;
        setDetail(event);
        track("event_detail_view", "events_page", { eventId: selectedId });
      })
      .catch((err) => {
        if (cancelled) return;
        setDetail(null);
        setMessage(err instanceof ApiRequestError ? err.message : "Could not load event.");
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedId, session?.accessToken]);

  const selectedFromList = useMemo(
    () => events.find((event) => event.event_id === selectedId) ?? null,
    [events, selectedId]
  );

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationLabel("Mumbai fallback");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationLabel("Your location");
        setLocating(false);
        track("events_location_added", "events_page");
      },
      () => {
        setLocationLabel("Mumbai fallback");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  async function apply() {
    if (!selectedId) return;
    if (!session) {
      setShowAuthPanel(true);
      setMessage("Create an account or log in here. Your event stays open.");
      track("event_apply_auth_required", "events_page", { eventId: selectedId });
      return;
    }
    setActing(true);
    setMessage(null);
    setShowApplyFeedback(false);
    track("event_apply_click", "events_page", { eventId: selectedId });
    try {
      const result = await registerForEventClient(selectedId, session.accessToken);
      setDetail((current) =>
        current
          ? {
              ...current,
              is_registered_by_me: true,
              registration_count:
                result.alreadyRegistered || current.registration_count == null
                  ? current.registration_count
                  : current.registration_count + 1,
            }
          : current
      );
      setMessage(result.alreadyRegistered ? "You are already in." : "You're in. Show up and enjoy it.");
      setShowApplyFeedback(true);
      track("event_apply_success", "events_page", { eventId: selectedId });
    } catch (err) {
      const text =
        err instanceof ApiRequestError ? err.message : "Could not apply for this event.";
      setMessage(text);
      track("event_apply_error", "events_page", { eventId: selectedId, message: text });
    } finally {
      setActing(false);
    }
  }

  async function withdraw() {
    if (!selectedId || !session) return;
    setActing(true);
    setMessage(null);
    try {
      await cancelEventRegistrationClient(selectedId, session.accessToken);
      setDetail((current) =>
        current
          ? {
              ...current,
              is_registered_by_me: false,
              registration_count:
                current.registration_count == null
                  ? current.registration_count
                  : Math.max(0, current.registration_count - 1),
            }
          : current
      );
      setMessage("You're no longer attending.");
      setShowApplyFeedback(false);
      track("event_withdraw_success", "events_page", { eventId: selectedId });
    } catch (err) {
      setMessage(err instanceof ApiRequestError ? err.message : "Could not withdraw.");
    } finally {
      setActing(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
      <section className="rounded-[30px] border border-line bg-surface p-4 md:p-5">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
              Browse
            </p>
            <h2 className="mt-1 font-display text-3xl font-light tracking-[-0.04em] text-heading">
              Events nearby
            </h2>
            <p className="mt-1 text-xs font-bold text-muted">
              Showing within {radiusKm} km of {locationLabel}
            </p>
          </div>
          <Link
            href="/host"
            className="rounded-full bg-heading px-4 py-2 text-xs font-extrabold text-page no-underline transition hover:-translate-y-px hover:opacity-90"
          >
            Host one
          </Link>
        </div>

        <div className="mb-5 rounded-2xl border border-line bg-page p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="grid flex-1 gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">
              Radius: <span className="normal-case tracking-normal text-heading">{radiusKm} km</span>
              <input
                type="range"
                min="1"
                max="100"
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
                className="accent-[var(--orange)]"
              />
            </label>
            <button
              type="button"
              onClick={useCurrentLocation}
              disabled={locating}
              className="rounded-full border border-line-strong px-4 py-2 text-xs font-extrabold text-heading transition hover:border-accent hover:text-accent disabled:opacity-60"
            >
              {locating ? "Finding..." : "Use my location"}
            </button>
          </div>
        </div>

        <div className="grid max-h-[720px] gap-3 overflow-auto pr-1">
          {loading ? (
            <div className="rounded-2xl border border-line bg-page p-5 text-sm font-bold text-muted">
              Loading events...
            </div>
          ) : events.length ? (
            events.map((event) => (
              <button
                type="button"
                key={event.event_id}
                onClick={() => setSelectedId(event.event_id)}
                className={`cursor-pointer rounded-2xl border p-4 text-left transition hover:-translate-y-px ${
                  selectedId === event.event_id
                    ? "border-accent bg-accent-dim"
                    : "border-line bg-page hover:border-line-strong"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-extrabold leading-tight text-heading">
                      {safeDisplayText(event.event_name, 120)}
                    </div>
                    <div className="mt-1 text-xs font-bold text-muted">
                      {safeDisplayText(event.category_name, 50)} · {safeDisplayText(event.city, 50)}
                      {event.host_first_name ? ` · ${event.host_first_name}` : ""}
                    </div>
                  </div>
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-extrabold text-heading">
                    {formatPrice(event.is_free, event.price)}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-body">
                  <span className="rounded-full border border-line px-3 py-1">
                    Casual
                  </span>
                  <span className="rounded-full border border-line px-3 py-1 text-accent">
                    {event.is_free ? "Free to join" : "Paid plan"}
                  </span>
                  <span className="rounded-full border border-line px-3 py-1">
                    {formatDate(event.start_time)}
                  </span>
                  <span className="rounded-full border border-line px-3 py-1">
                    {safeDisplayText(event.place_name || event.city, 70)}
                  </span>
                  {event.distance_km != null ? (
                    <span className="rounded-full border border-line px-3 py-1">
                      {Number(event.distance_km).toFixed(1)} km away
                    </span>
                  ) : null}
                  <span className="rounded-full border border-line px-3 py-1">
                    {Number(event.registration_count ?? event.current_attendee_count ?? 0)} going
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="rounded-2xl border border-line bg-page p-5 text-sm font-bold text-muted">
              No public events yet. Try hosting the first one.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[30px] border border-line bg-page p-5 md:p-7">
        {detailLoading ? (
          <div className="text-sm font-bold text-muted">Loading details...</div>
        ) : detail ? (
          <>
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-muted">
              <span className="rounded-full bg-accent-dim px-3 py-1 text-accent">
                {safeDisplayText(detail.category_name, 60)}
              </span>
              <span>{formatDate(detail.start_time)}</span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(38px,6vw,72px)] font-light leading-[0.95] tracking-[-0.06em] text-heading">
              {safeDisplayText(detail.event_name, 160)}
            </h1>
            <p className="mt-5 max-w-[680px] text-[15px] font-medium leading-relaxed text-body">
              {safeDisplayText(
                detail.event_description ||
                  selectedFromList?.place_name ||
                  "A VIBO event near you. Apply to attend and keep the plan simple.",
                500
              )}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <InfoCard label="Price" value={formatPrice(detail.is_free, detail.price)} />
              <InfoCard
                label="Going"
                value={String(detail.registration_count ?? detail.current_attendee_count ?? 0)}
              />
              <InfoCard
                label="Capacity"
                value={detail.capacity ? String(detail.capacity) : "Open"}
              />
            </div>

            <div className="mt-5 rounded-3xl border border-line bg-surface p-5">
              <p className="text-sm font-extrabold text-heading">
                {safeDisplayText(detail.address || selectedFromList?.place_name || "Location TBA", 140)}
              </p>
              <p className="mt-1 text-sm font-bold text-muted">
                {safeDisplayText(detail.city || selectedFromList?.city || "Mumbai", 80)}
                {detail.host_first_name ? ` · hosted by ${detail.host_first_name}` : ""}
              </p>
            </div>

            {message ? (
              <p className="mt-5 rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-bold text-heading">
                {message}
              </p>
            ) : null}

            {!session && showAuthPanel ? (
              <div className="mt-5">
                <AuthPanel
                  compact
                  redirectLabel="Apply with VIBO"
                  onSuccess={() => {
                    setShowAuthPanel(false);
                    setMessage("You're signed in. Tap Apply to attend.");
                  }}
                />
              </div>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-3">
              {detail.is_registered_by_me ? (
                <button
                  type="button"
                  onClick={() => void withdraw()}
                  disabled={acting}
                  className="rounded-full border border-line-strong px-6 py-3 text-sm font-extrabold text-heading transition hover:border-accent hover:text-accent disabled:opacity-60"
                >
                  {acting ? "Updating..." : "Withdraw"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void apply()}
                  disabled={acting}
                  className="rounded-full bg-heading px-6 py-3 text-sm font-extrabold text-page transition hover:-translate-y-px hover:opacity-90 disabled:opacity-60"
                >
                  {acting ? "Applying..." : "Apply to attend"}
                </button>
              )}
            </div>
            {showApplyFeedback ? (
              <FeedbackPrompt
                eventName="event_apply_feedback"
                element="events_page"
                question="Was applying easy?"
              />
            ) : null}
          </>
        ) : (
          <div className="grid gap-5">
            <p className="text-sm font-bold text-muted">
              Pick an event to see details and apply.
            </p>
            {!session ? <AuthPanel compact redirectLabel="Quick login" /> : null}
          </div>
        )}
      </section>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted">
        {label}
      </div>
      <div className="mt-1 text-lg font-extrabold text-heading">{value}</div>
    </div>
  );
}

