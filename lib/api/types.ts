export type ApiEnvelope<T> = {
  success?: boolean;
  data: T;
  error?: string;
  message?: string;
};

export type WaitlistCountData = {
  total: number;
  by_role?: { attendees: number; hosts: number };
  by_city?: { city: string; count: number }[];
};

export type WaitlistJoinResult = {
  already_registered: boolean;
  referral_code: string | null;
  position: number | null;
};

export type WaitlistCityUpdateResult = {
  updated: boolean;
  city: string;
};

export type WebFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  ord: number;
  link_label?: string | null;
  link_href?: string | null;
  answer_suffix?: string | null;
};

export type TncSection = {
  id: string;
  title: string;
  content: string;
  ord: number;
  has_highlight: boolean;
  highlight_text: string | null;
  last_updated?: string;
};

export type TncPayload = {
  last_updated: string;
  sections: TncSection[];
};

/** Matches vibo-backend web.service nearby mapping (+ optional lat/lng if added later) */
export type NearbyEvent = {
  id: string;
  title: string;
  category: string;
  location: string;
  city: string;
  price: number | null;
  is_free: boolean;
  starts_at: string;
  lat?: number;
  lng?: number;
  /** Present on some API shapes before client normalization */
  latitude?: number;
  longitude?: number;
};

export type ProductContentMap = Record<string, unknown>;
