/**
 * Central definition of VIBO web + analytics HTTP paths (relative to NEXT_PUBLIC_API_URL).
 */

export const WEB_API_PREFIX = "/v0/api/web" as const;
export const ANALYTICS_API_PREFIX = "/v0/api/analytics" as const;

export const WebEndpoints = {
  waitlist: `${WEB_API_PREFIX}/waitlist`,
  waitlistCity: `${WEB_API_PREFIX}/waitlist/city`,
  waitlistCount: `${WEB_API_PREFIX}/waitlist/count`,
  referralClick: `${WEB_API_PREFIX}/referral/click`,
  /** Pass encoded code — use buildReferralPath(code) */
  referralByCode: (code: string) =>
    `${WEB_API_PREFIX}/referral/${encodeURIComponent(code)}`,
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

/** `GET /v0/api/web/events/nearby` — vibo-backend `getNearbyEvents`. */
export const DEFAULT_EVENT_CITY = "Mumbai" as const;
export const DEFAULT_EVENT_LIMIT = 6 as const;

export function buildNearbyQuery(params: {
  city?: string;
  limit?: number;
  category?: string;
}): string {
  const q = new URLSearchParams();
  q.set("city", params.city ?? DEFAULT_EVENT_CITY);
  q.set("limit", String(params.limit ?? DEFAULT_EVENT_LIMIT));
  if (params.category && params.category !== "All") {
    q.set("category", params.category);
  }
  return `${WebEndpoints.eventsNearby}?${q.toString()}`;
}
