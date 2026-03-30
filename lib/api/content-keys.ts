import type { ProductContentMap } from "@/lib/api/types";

/** Supports flat keys like `stats.events_hosted` or nested `{ stats: { events_hosted: 1 } }`. */
export function readContentValue(
  map: ProductContentMap | null | undefined,
  key: string
): unknown {
  if (!map) return undefined;
  if (Object.prototype.hasOwnProperty.call(map, key)) {
    return map[key];
  }
  const parts = key.split(".");
  let cur: unknown = map;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

export function formatStatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}
