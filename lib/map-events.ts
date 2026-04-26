import { webGetClient } from "@/lib/api/methods";
import type { NearbyEvent } from "@/lib/api/types";
import { safeDisplayText } from "@/lib/api/sanitize";
import type { PhoneCard } from "@/lib/constants";
import { buildNearbyQuery, DEFAULT_EVENT_LIMIT } from "@/lib/constants/api";

function parseCoordinate(raw: unknown): number | undefined {
  if (raw === null || raw === undefined || raw === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

function pickLatLng(row: NearbyEvent): {
  lat: number | undefined;
  lng: number | undefined;
} {
  const lat =
    parseCoordinate(row.lat) ?? parseCoordinate(row.latitude);
  const lng =
    parseCoordinate(row.lng) ?? parseCoordinate(row.longitude);
  return { lat, lng };
}

/** `GET /v0/api/web/events/nearby` — `{ success, data }` envelope. */
export async function fetchNearbyEvents(
  category?: string,
  options?: { limit?: number; city?: string }
): Promise<NearbyEvent[]> {
  const path = buildNearbyQuery({
    city: options?.city,
    limit: options?.limit ?? DEFAULT_EVENT_LIMIT,
    category,
  });
  const rows = await webGetClient<NearbyEvent[]>(path);
  return rows.map((row) => {
    const { lat, lng } = pickLatLng(row);
    return {
      ...row,
      lat,
      lng,
    };
  });
}

export function nearbyEventsToPhoneCards(events: NearbyEvent[]): PhoneCard[] {
  if (!events.length) return [];
  return events.slice(0, 2).map((ev, i) => ({
    id: i + 1,
    title: safeDisplayText(ev.title, 200),
    rating: "—",
    attendees: safeDisplayText(ev.category, 80),
    price:
      ev.is_free || ev.price == null ? "Free" : `₹${ev.price}`,
    priceHighlight: Boolean(ev.is_free),
    distance: safeDisplayText(ev.location, 80),
    badge: undefined,
    badgeColor: undefined,
    gradient:
      i === 0
        ? "from-accent-dim to-highlight-dim"
        : "from-highlight-dim to-[rgba(0,180,160,0.1)]",
  }));
}
