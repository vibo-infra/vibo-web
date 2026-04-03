import {
  WebEndpoints,
  buildNearbyQuery,
  DEFAULT_EVENT_CITY,
  DEFAULT_EVENT_LIMIT,
} from "@/lib/constants/api";
import {
  webGetServer,
  webGetClient,
  webPostClient,
  webPatchClient,
  webPostVoid,
} from "@/lib/api/methods";
import { sanitizeEmail, sanitizeReferralCode } from "@/lib/api/sanitize";
import type {
  NearbyEvent,
  ProductContentMap,
  ReferralLookupData,
  TncPayload,
  WaitlistCountData,
  WaitlistJoinResult,
  WaitlistCityUpdateResult,
  WebFaq,
} from "@/lib/api/types";

export async function fetchContentTrustBarServer(): Promise<ProductContentMap> {
  try {
    return await webGetServer<ProductContentMap>(
      WebEndpoints.content("trust_bar"),
      60
    );
  } catch {
    return {};
  }
}

export async function fetchContentPricingServer(): Promise<ProductContentMap> {
  try {
    return await webGetServer<ProductContentMap>(
      WebEndpoints.content("pricing"),
      60
    );
  } catch {
    return {};
  }
}

/** Client-only: `null` = request failed; `[]` = success, no rows yet. */
export async function fetchFaqsClient(): Promise<WebFaq[] | null> {
  try {
    return await webGetClient<WebFaq[]>(WebEndpoints.faqs);
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[vibo-web] GET /api/web/faqs failed. Check NEXT_PUBLIC_API_URL and the API.",
        e
      );
    }
    return null;
  }
}

export async function fetchNearbyEventsServer(): Promise<NearbyEvent[]> {
  try {
    return await webGetServer<NearbyEvent[]>(
      buildNearbyQuery({ city: DEFAULT_EVENT_CITY, limit: DEFAULT_EVENT_LIMIT }),
      300
    );
  } catch {
    return [];
  }
}

/** Client-only: `null` = request failed. */
export async function fetchTncClient(): Promise<TncPayload | null> {
  try {
    return await webGetClient<TncPayload>(WebEndpoints.tnc);
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[vibo-web] GET /api/web/tnc failed. Check NEXT_PUBLIC_API_URL and the API.",
        e
      );
    }
    return null;
  }
}

export async function fetchWaitlistCountClient(): Promise<number | null> {
  try {
    const data = await webGetClient<WaitlistCountData>(
      WebEndpoints.waitlistCount
    );
    return typeof data.total === "number" ? data.total : null;
  } catch {
    return null;
  }
}

export function postReferralClickClient(code: string): void {
  const safe = sanitizeReferralCode(code);
  if (!safe) return;
  webPostVoid(WebEndpoints.referralClick, { code: safe });
}

export async function fetchReferralClient(
  code: string
): Promise<ReferralLookupData | null> {
  const safe = sanitizeReferralCode(code);
  if (!safe) return null;
  try {
    return await webGetClient<ReferralLookupData>(
      WebEndpoints.referralByCode(safe)
    );
  } catch {
    return null;
  }
}

export type JoinWaitlistBody = {
  email: string;
  role?: string;
  city?: string;
  source: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  ref?: string | null;
};

export async function joinWaitlistClient(
  body: JoinWaitlistBody
): Promise<WaitlistJoinResult> {
  const safeBody: JoinWaitlistBody = {
    ...body,
    email: sanitizeEmail(body.email),
  };
  return webPostClient<WaitlistJoinResult, JoinWaitlistBody>(
    WebEndpoints.waitlist,
    safeBody
  );
}

export async function updateWaitlistCityClient(
  email: string,
  city: string
): Promise<WaitlistCityUpdateResult> {
  const safeEmail = sanitizeEmail(email);
  return webPatchClient<
    WaitlistCityUpdateResult,
    { email: string; city: string }
  >(WebEndpoints.waitlistCity, { email: safeEmail, city });
}

export async function fetchNearbyEventsClient(
  category?: string
): Promise<NearbyEvent[]> {
  const path = buildNearbyQuery({
    city: DEFAULT_EVENT_CITY,
    limit: DEFAULT_EVENT_LIMIT,
    category,
  });
  return webGetClient<NearbyEvent[]>(path);
}

/** Grouped facade — use individual exports above in UI, or this for DI/testing */
export const webApi = {
  fetchContentTrustBarServer,
  fetchContentPricingServer,
  fetchFaqsClient,
  fetchNearbyEventsServer,
  fetchTncClient,
  fetchWaitlistCountClient,
  postReferralClickClient,
  fetchReferralClient,
  joinWaitlistClient,
  updateWaitlistCityClient,
  fetchNearbyEventsClient,
};
