import type { NearbyEvent } from "@/lib/api/types";
import { safeDisplayText } from "@/lib/api/sanitize";
import type { PhoneCard } from "@/lib/constants";

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
