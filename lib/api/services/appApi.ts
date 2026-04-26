import { getApiBaseUrl } from "@/lib/api";
import { AuthEndpoints, EventEndpoints } from "@/lib/constants/api";

export const WEB_SOURCE = "web" as const;

export type AuthUser = {
  userId: string;
  email: string;
  firstName?: string | null;
  defaultCity?: string | null;
  isVerified?: boolean;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt?: string;
  user: AuthUser;
};

export type EventCategory = {
  category_id: string;
  name: string;
  icon_url: string | null;
  display_order: number;
};

export type EventDetail = {
  event_id: string;
  event_name: string;
  event_description: string | null;
  start_time: string;
  end_time: string | null;
  is_free: boolean;
  price: string | number | null;
  capacity: number | null;
  current_attendee_count: number;
  registration_count?: number;
  status: string;
  address: string | null;
  city: string;
  state?: string | null;
  country?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  category_id?: string | null;
  category_name: string;
  host_first_name?: string | null;
  is_registered_by_me?: boolean;
};

export type EventListItem = {
  event_id: string;
  event_name: string;
  event_description?: string | null;
  start_time: string;
  end_time?: string | null;
  is_free: boolean;
  price: string | number | null;
  capacity: number | null;
  current_attendee_count: number;
  registration_count?: number;
  city: string;
  place_name?: string | null;
  category_name: string;
  host_first_name?: string | null;
  distance_km?: string | number | null;
  is_registered_by_me?: boolean;
};

type RequestOptions = RequestInit & {
  token?: string | null;
};

export class ApiRequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...rest,
    headers: {
      ...(rest.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });
  const json = (await res.json().catch(() => null)) as
    | { error?: string; message?: string }
    | null;
  if (!res.ok) {
    throw new ApiRequestError(res.status, json?.error ?? json?.message ?? "Request failed");
  }
  return json as T;
}

export function loginClient(email: string, password: string) {
  return requestJson<AuthSession>(AuthEndpoints.login, {
    method: "POST",
    body: JSON.stringify({ email, password, source: WEB_SOURCE }),
  });
}

export function registerClient(body: {
  email: string;
  password: string;
  defaultCity: string;
  firstName?: string;
}) {
  return requestJson<AuthSession>(AuthEndpoints.register, {
    method: "POST",
    body: JSON.stringify({ ...body, source: WEB_SOURCE }),
  });
}

export function refreshClient(refreshToken: string) {
  return requestJson<AuthSession>(AuthEndpoints.refresh, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

export function logoutClient(token: string) {
  return requestJson<{ message: string }>(AuthEndpoints.logout, {
    method: "POST",
    token,
  });
}

export function fetchEventCategoriesClient() {
  return requestJson<{ categories: EventCategory[] }>(EventEndpoints.categories);
}

export function fetchEventDetailClient(eventId: string, token?: string | null) {
  return requestJson<{ event: EventDetail }>(EventEndpoints.detail(eventId), { token });
}

export function fetchEventsNearbyClient(
  params: {
    lat: number;
    lng: number;
    radiusKm: number;
    limit?: number;
    page?: number;
  },
  token?: string | null
) {
  const q = new URLSearchParams({
    lat: String(params.lat),
    lng: String(params.lng),
    radius: String(params.radiusKm),
    limit: String(params.limit ?? 80),
    page: String(params.page ?? 1),
  });
  return requestJson<{ events: EventListItem[]; page: number; limit: number }>(
    `${EventEndpoints.events}?${q.toString()}`,
    { token }
  );
}

export function registerForEventClient(eventId: string, token: string) {
  return requestJson<{ ok: boolean; alreadyRegistered?: boolean }>(
    EventEndpoints.register(eventId),
    {
      method: "POST",
      token,
      body: JSON.stringify({ source: WEB_SOURCE }),
    }
  );
}

export function cancelEventRegistrationClient(eventId: string, token: string) {
  return requestJson<{ ok: boolean }>(EventEndpoints.cancelRegistration(eventId), {
    method: "POST",
    token,
    body: JSON.stringify({}),
  });
}

export function createEventClient(
  token: string,
  body: {
    eventName: string;
    eventDescription?: string;
    categoryId: string;
    startTime: string;
    endTime?: string;
    capacity?: number;
    isFree?: boolean;
    price?: number;
    publishNow?: boolean;
    location: {
      address: string;
      city: string;
      state: string;
      country: string;
      latitude: number;
      longitude: number;
      placeName: string;
    };
  }
) {
  return requestJson<{ event: Record<string, unknown> }>(EventEndpoints.events, {
    method: "POST",
    token,
    body: JSON.stringify({ ...body, source: WEB_SOURCE }),
  });
}
