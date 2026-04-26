/**
 * Central definition of VIBO web + analytics HTTP paths (relative to NEXT_PUBLIC_API_URL).
 */

export const WEB_API_PREFIX = "/v0/api/web" as const;
export const AUTH_API_PREFIX = "/v0/api/auth" as const;
export const EVENTS_API_PREFIX = "/v0/api/events" as const;
export const ANALYTICS_API_PREFIX = "/v0/api/analytics" as const;

export const WebEndpoints = {
  waitlist: `${WEB_API_PREFIX}/waitlist`,
  waitlistCity: `${WEB_API_PREFIX}/waitlist/city`,
  waitlistCount: `${WEB_API_PREFIX}/waitlist/count`,
  /** Optional ?section= for CMS slices */
  content: (section?: string) =>
    section
      ? `${WEB_API_PREFIX}/content?section=${encodeURIComponent(section)}`
      : `${WEB_API_PREFIX}/content`,
  faqs: `${WEB_API_PREFIX}/faqs`,
  eventsNearby: `${WEB_API_PREFIX}/events/nearby`,
  tnc: `${WEB_API_PREFIX}/tnc`,
} as const;

export const AnalyticsEndpoints = {
  events: `${ANALYTICS_API_PREFIX}/events`,
} as const;

export const AuthEndpoints = {
  login: `${AUTH_API_PREFIX}/login`,
  register: `${AUTH_API_PREFIX}/register`,
  refresh: `${AUTH_API_PREFIX}/refresh`,
  logout: `${AUTH_API_PREFIX}/logout`,
} as const;

export const EventEndpoints = {
  events: EVENTS_API_PREFIX,
  categories: `${EVENTS_API_PREFIX}/categories`,
  detail: (eventId: string) => `${EVENTS_API_PREFIX}/${encodeURIComponent(eventId)}`,
  register: (eventId: string) =>
    `${EVENTS_API_PREFIX}/${encodeURIComponent(eventId)}/register`,
  cancelRegistration: (eventId: string) =>
    `${EVENTS_API_PREFIX}/${encodeURIComponent(eventId)}/cancel-registration`,
} as const;

/** `GET /v0/api/web/events/nearby` — vibo-backend `getNearbyEvents`. */
/** Omit `city` (or pass `all`) to load upcoming events in every city — needed for the public map. */
export const DEFAULT_EVENT_LIMIT = 100 as const;

export function buildNearbyQuery(params: {
  /** When omitted or `all`, backend returns events for all cities (up to limit). */
  city?: string;
  limit?: number;
  category?: string;
}): string {
  const q = new URLSearchParams();
  const city = params.city?.trim();
  if (city && city.toLowerCase() !== "all") {
    q.set("city", city);
  }
  q.set("limit", String(params.limit ?? DEFAULT_EVENT_LIMIT));
  if (params.category && params.category !== "All") {
    q.set("category", params.category);
  }
  return `${WebEndpoints.eventsNearby}?${q.toString()}`;
}
