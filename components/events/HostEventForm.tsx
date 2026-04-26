"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode, FormEvent } from "react";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { FeedbackPrompt } from "@/components/ui/FeedbackPrompt";
import { OsmLocationPicker } from "@/components/map/OsmLocationPicker";
import { useAuth } from "@/context/AuthContext";
import {
  ApiRequestError,
  createEventClient,
  fetchEventCategoriesClient,
  type EventCategory,
} from "@/lib/api/services/appApi";
import { track } from "@/lib/analytics";
import {
  osmAddressLine,
  osmCity,
  osmPlaceName,
  osmState,
  reverseOsmPlace,
  searchOsmPlaces,
  type OsmPlace,
} from "@/lib/osm";
import { HiOutlineMapPin } from "react-icons/hi2";

const MUMBAI_LAT = 19.076;
const MUMBAI_LNG = 72.8777;

function defaultStartTime() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  date.setHours(18, 0, 0, 0);
  return date.toISOString().slice(0, 16);
}

export function HostEventForm() {
  const { session, refreshSession } = useAuth();
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [capacity, setCapacity] = useState("12");
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [latitude, setLatitude] = useState(String(MUMBAI_LAT));
  const [longitude, setLongitude] = useState(String(MUMBAI_LNG));
  const [submitting, setSubmitting] = useState(false);
  const [locating, setLocating] = useState(false);
  const [showAdvancedLocation, setShowAdvancedLocation] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [showHostFeedback, setShowHostFeedback] = useState(false);
  const [placeSuggestions, setPlaceSuggestions] = useState<OsmPlace[]>([]);
  const [searchingPlaces, setSearchingPlaces] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetchEventCategoriesClient()
      .then(({ categories: rows }) => {
        if (cancelled) return;
        setCategories(rows);
        setCategoryId((current) => current || rows[0]?.category_id || "");
      })
      .catch(() => {
        if (!cancelled) setCategories([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const query = address.trim();
    if (query.length < 3) {
      setPlaceSuggestions([]);
      setSearchingPlaces(false);
      return;
    }

    let cancelled = false;
    setSearchingPlaces(true);
    const timer = window.setTimeout(() => {
      void searchOsmPlaces(`${query}${city ? `, ${city}` : ""}`)
        .then((places) => {
          if (!cancelled) setPlaceSuggestions(places);
        })
        .catch(() => {
          if (!cancelled) setPlaceSuggestions([]);
        })
        .finally(() => {
          if (!cancelled) setSearchingPlaces(false);
        });
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [address, city]);

  const canSubmit = useMemo(
    () =>
      Boolean(
        session &&
          eventName.trim() &&
          categoryId &&
          startTime &&
          placeName.trim() &&
          address.trim() &&
          city.trim()
      ),
    [session, eventName, categoryId, startTime, placeName, address, city]
  );

  if (!session) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <div className="rounded-[30px] border border-line bg-surface p-6 md:p-8">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
            Host access
          </p>
          <h2 className="mt-3 font-display text-[clamp(34px,5vw,64px)] font-light leading-none tracking-[-0.06em] text-heading">
            Log in before you publish.
          </h2>
          <p className="mt-5 max-w-[560px] text-sm font-medium leading-relaxed text-body">
            Hosting uses your VIBO account. Keep the plan clear, add where it
            happens, and publish when you are ready.
          </p>
        </div>
        <AuthPanel compact redirectLabel="Host login" />
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session) return;
    setSubmitting(true);
    setMessage(null);
    setCreatedId(null);
    setShowHostFeedback(false);
    track("host_event_submit", "host_form", { source: "web" });
    const payload: Parameters<typeof createEventClient>[1] = {
      eventName: eventName.trim(),
      eventDescription: eventDescription.trim() || undefined,
      categoryId,
      startTime,
      capacity: Number(capacity) || undefined,
      isFree,
      price: isFree ? undefined : Number(price) || undefined,
      publishNow: true,
      location: {
        placeName: placeName.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim() || "Maharashtra",
        country: "India",
        latitude: Number(latitude) || MUMBAI_LAT,
        longitude: Number(longitude) || MUMBAI_LNG,
      },
    };
    try {
      let result;
      try {
        result = await createEventClient(session.accessToken, payload);
      } catch (err) {
        if (!(err instanceof ApiRequestError) || err.status !== 401) throw err;
        const refreshed = await refreshSession();
        result = await createEventClient(refreshed.accessToken, payload);
      }
      const event = result.event as { event_id?: string };
      setCreatedId(event.event_id ?? null);
      setMessage("Event published. It can now appear for nearby members.");
      setShowHostFeedback(true);
      track("host_event_success", "host_form", { eventId: event.event_id, source: "web" });
    } catch (err) {
      const text =
        err instanceof ApiRequestError
          ? err.status === 401
            ? "Your login expired. Please log in again and publish the event."
            : err.message
          : "Could not create the event. Please try again.";
      setMessage(text);
      track("host_event_error", "host_form", { message: text });
    } finally {
      setSubmitting(false);
    }
  }

  function useCurrentLocation() {
    setLocationMessage(null);
    if (!navigator.geolocation) {
      setLocationMessage("Your browser cannot share location. You can still type it in.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat.toFixed(6));
        setLongitude(lng.toFixed(6));
        setLocationMessage("Location added. Please still name the place so people can find it.");
        setLocating(false);
        track("host_location_added", "host_form");
        void hydrateFromMapPin(lat, lng, false);
      },
      () => {
        setLocationMessage("Location permission was not allowed. You can still type the place.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  function applyOsmPlace(place: OsmPlace) {
    const nextCity = osmCity(place);
    const nextState = osmState(place);
    setPlaceName(osmPlaceName(place));
    setAddress(osmAddressLine(place));
    if (nextCity) setCity(nextCity);
    if (nextState) setState(nextState);
    setLatitude(Number(place.lat).toFixed(6));
    setLongitude(Number(place.lon).toFixed(6));
    setPlaceSuggestions([]);
    setLocationMessage("Place selected from OpenStreetMap.");
    track("host_osm_place_selected", "host_form");
  }

  async function hydrateFromMapPin(lat: number, lng: number, overwriteText = true) {
    const place = await reverseOsmPlace(lat, lng);
    if (!place) return;
    const nextCity = osmCity(place);
    const nextState = osmState(place);
    if (overwriteText || !placeName.trim()) setPlaceName(osmPlaceName(place));
    if (overwriteText || !address.trim()) setAddress(osmAddressLine(place));
    if (nextCity) setCity(nextCity);
    if (nextState) setState(nextState);
  }

  function onMapPick(lat: number, lng: number) {
    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
    setLocationMessage("Map pin updated. We filled the nearest OSM place if found.");
    void hydrateFromMapPin(lat, lng);
  }

  return (
    <form className="grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:gap-6" onSubmit={onSubmit}>
      <section className="rounded-[30px] border border-line bg-surface p-5 md:p-7">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
          Event basics
        </p>
        <div className="mt-6 grid gap-4">
          <Field label="Event name">
            <input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Sunset board games at Bandra"
              required
              className="vibo-input"
            />
          </Field>
          <Field label="Short description">
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="What should people expect?"
              className="vibo-input min-h-28 resize-none"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="vibo-input"
              >
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Start time">
              <input
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                type="datetime-local"
                required
                className="vibo-input"
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Capacity">
              <input
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                type="number"
                min="1"
                className="vibo-input"
              />
            </Field>
            <label className="flex items-center gap-3 rounded-2xl border border-line bg-page px-4 py-3 text-sm font-extrabold text-heading">
              <input
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                type="checkbox"
                className="h-4 w-4 accent-[var(--orange)]"
              />
              Free event
            </label>
            <Field label="Price">
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min="0"
                disabled={isFree}
                placeholder="499"
                className="vibo-input disabled:opacity-50"
              />
            </Field>
          </div>
        </div>
      </section>

      <aside className="grid gap-6">
        <section className="rounded-[30px] border border-line bg-page p-5 md:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
                Event location
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-body">
                Add the exact spot. People nearby will use this to decide if
                they can come.
              </p>
            </div>
            <button
              type="button"
              onClick={useCurrentLocation}
              disabled={locating}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm font-extrabold text-heading transition hover:border-accent hover:text-accent disabled:opacity-60"
            >
              <HiOutlineMapPin className="text-lg" />
              {locating ? "Finding..." : "Use my location"}
            </button>
          </div>
          {locationMessage ? (
            <p className="mt-4 rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-bold text-heading">
              {locationMessage}
            </p>
          ) : null}
          <div className="mt-5 grid gap-4">
            <Field label="Place name">
              <input
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="Joggers Park"
                required
                className="vibo-input"
              />
            </Field>
            <div className="relative">
              <Field label="Address">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Start typing: Carter Road, Bandra"
                  required
                  autoComplete="off"
                  className="vibo-input"
                />
              </Field>
              {(searchingPlaces || placeSuggestions.length > 0) ? (
                <div className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-line bg-page p-2 shadow-xl">
                  {searchingPlaces ? (
                    <p className="px-3 py-2 text-xs font-bold text-muted">
                      Searching OpenStreetMap...
                    </p>
                  ) : null}
                  {placeSuggestions.map((place) => (
                    <button
                      key={place.place_id}
                      type="button"
                      onClick={() => applyOsmPlace(place)}
                      className="block w-full rounded-xl px-3 py-2 text-left transition hover:bg-surface"
                    >
                      <span className="block text-sm font-extrabold text-heading">
                        {osmPlaceName(place)}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium leading-relaxed text-muted">
                        {place.display_name}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Field label="City">
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="vibo-input"
                />
              </Field>
              <Field label="State">
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="vibo-input"
                />
              </Field>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvancedLocation((value) => !value)}
              className="text-left text-xs font-extrabold text-heading transition hover:text-accent"
            >
              {showAdvancedLocation ? "Hide map pin details" : "Adjust map pin manually"}
            </button>
            {showAdvancedLocation ? (
              <div className="grid gap-4">
                <OsmLocationPicker
                  lat={Number(latitude) || MUMBAI_LAT}
                  lng={Number(longitude) || MUMBAI_LNG}
                  label={placeName || "Event location"}
                  onChange={onMapPick}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Latitude">
                    <input
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="vibo-input"
                    />
                  </Field>
                  <Field label="Longitude">
                    <input
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="vibo-input"
                    />
                  </Field>
                </div>
              </div>
            ) : null}
            <p className="text-xs font-semibold leading-relaxed text-muted">
              Tip: use your location for the map pin, then write the place name
              and address in simple words.
            </p>
          </div>
        </section>

        <section className="rounded-[30px] border border-line bg-surface p-5">
          <p className="text-sm font-bold text-muted">
            Signed in as <span className="text-heading">{session.user.email}</span>
          </p>
          {message ? (
            <p className="mt-4 rounded-2xl border border-line bg-page px-4 py-3 text-sm font-bold text-heading">
              {message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-5 w-full rounded-full bg-heading px-6 py-3 text-sm font-extrabold text-page transition hover:-translate-y-px hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Publishing..." : "Publish event"}
          </button>
          {createdId ? (
            <>
              <Link
                href={`/events?eventId=${encodeURIComponent(createdId)}`}
                className="mt-3 flex w-full justify-center rounded-full border border-line-strong px-6 py-3 text-sm font-extrabold text-heading no-underline transition hover:border-accent hover:text-accent"
              >
                View event
              </Link>
              {showHostFeedback ? (
                <FeedbackPrompt
                  eventName="host_event_feedback"
                  element="host_form"
                  question="Was hosting easy?"
                />
              ) : null}
            </>
          ) : null}
        </section>
      </aside>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-bold text-heading">
      {label}
      {children}
    </label>
  );
}
