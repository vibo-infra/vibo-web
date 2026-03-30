/**
 * Browser: only NEXT_PUBLIC_* exists.
 * Server (RSC / Route Handlers): prefer VIBO_API_BASE_URL or API_URL so Docker/internal
 * hostnames work without exposing them to the client.
 */
export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    const serverBase =
      process.env.VIBO_API_BASE_URL ||
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL;
    if (serverBase) return serverBase.replace(/\/$/, "");
  } else {
    const pub = process.env.NEXT_PUBLIC_API_URL;
    if (pub) return pub.replace(/\/$/, "");
  }
  throw new Error(
    "Missing API base URL: set NEXT_PUBLIC_API_URL (required in the browser). " +
      "For server-side fetches you may also set VIBO_API_BASE_URL or API_URL."
  );
}

export type ApiFetchOptions = RequestInit & {
  next?: { revalidate?: number };
};

/**
 * Single low-level transport for all VIBO API calls.
 * Server: pass `next: { revalidate: N }` for ISR-style caching.
 */
export async function apiFetch<T>(
  path: string,
  opts?: ApiFetchOptions
): Promise<T> {
  const base = getApiBaseUrl();
  const url = `${base}${path}`;
  if (
    process.env.NODE_ENV === "development" &&
    typeof window === "undefined"
  ) {
    console.log(
      `[vibo-web] SSR ${opts?.method ?? "GET"} ${url}`
    );
  }
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(String(res.status));
  return res.json() as Promise<T>;
}
