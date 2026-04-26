/**
 * Product analytics — POST batches to `${NEXT_PUBLIC_API_URL}/v0/api/analytics/events`.
 * Contract: `vibo-backend/docs/HTTP_API.md` → Analytics.
 */
import { AnalyticsEndpoints } from "@/lib/constants/api";

function fallbackUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replaceAll(/[xy]/g, (c) => {
    const r = Math.trunc(Math.random() * 16);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const SESSION_ID =
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : fallbackUUID();

const queue: object[] = [];

export function track(
  eventType: string,
  element?: string,
  meta?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  queue.push({
    event_type: eventType,
    element: element ?? null,
    page: window.location.pathname,
    metadata: meta ?? null,
    utm_source: new URLSearchParams(location.search).get("utm_source"),
    utm_campaign: new URLSearchParams(location.search).get("utm_campaign"),
    ts: Date.now(),
  });
}

function flush() {
  if (!queue.length) return;
  const batch = queue.splice(0, 100);
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return;
  const payload = JSON.stringify({
    session_id: SESSION_ID,
    source: "web",
    events: batch,
  });
  navigator.sendBeacon(
    `${base}${AnalyticsEndpoints.events}`,
    new Blob([payload], { type: "application/json" })
  );
}

export function initAnalytics() {
  if (typeof window === "undefined") return;
  setInterval(flush, 5000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
}
