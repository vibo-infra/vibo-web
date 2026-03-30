import { apiFetch, type ApiFetchOptions } from "@/lib/api";
import type { ApiEnvelope } from "@/lib/api/types";

function unwrapWebData<T>(json: ApiEnvelope<T>): T {
  if (json && typeof json === "object" && "data" in json && json.data === undefined) {
    throw new Error("API response envelope missing data");
  }
  return json.data;
}

/** Cached GET for Server Components / build */
export async function webGetServer<T>(
  path: string,
  revalidate: number
): Promise<T> {
  const json = await apiFetch<ApiEnvelope<T>>(path, {
    method: "GET",
    next: { revalidate },
  });
  return unwrapWebData(json);
}

/** Uncached GET for browser (Client Components) */
export async function webGetClient<T>(path: string): Promise<T> {
  const json = await apiFetch<ApiEnvelope<T>>(path, {
    method: "GET",
    cache: "no-store",
  });
  return unwrapWebData(json);
}

export async function webPostClient<TResponse, TBody extends object>(
  path: string,
  body: TBody,
  extra?: Omit<ApiFetchOptions, "method" | "body" | "headers">
): Promise<TResponse> {
  const json = await apiFetch<ApiEnvelope<TResponse>>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...extra,
  });
  return unwrapWebData(json);
}

/** Fire-and-forget POST — errors swallowed */
export function webPostVoid(path: string, body: object): void {
  void apiFetch<unknown>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {});
}
