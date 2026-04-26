export type OsmPlace = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  name?: string;
  address?: {
    amenity?: string;
    road?: string;
    suburb?: string;
    neighbourhood?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
};

const NOMINATIM_URL = "https://nominatim.openstreetmap.org";

export async function searchOsmPlaces(query: string): Promise<OsmPlace[]> {
  const q = query.trim();
  if (q.length < 3) return [];
  const params = new URLSearchParams({
    q,
    format: "jsonv2",
    addressdetails: "1",
    limit: "6",
    countrycodes: "in",
  });
  const res = await fetch(`${NOMINATIM_URL}/search?${params.toString()}`, {
    headers: { "Accept-Language": "en-IN,en;q=0.9" },
  });
  if (!res.ok) return [];
  return (await res.json()) as OsmPlace[];
}

export async function reverseOsmPlace(lat: number, lon: number): Promise<OsmPlace | null> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    format: "jsonv2",
    addressdetails: "1",
    zoom: "18",
  });
  const res = await fetch(`${NOMINATIM_URL}/reverse?${params.toString()}`, {
    headers: { "Accept-Language": "en-IN,en;q=0.9" },
  });
  if (!res.ok) return null;
  return (await res.json()) as OsmPlace;
}

export function osmPlaceName(place: OsmPlace): string {
  return (
    place.name ||
    place.address?.amenity ||
    place.display_name.split(",")[0]?.trim() ||
    "Selected place"
  );
}

export function osmAddressLine(place: OsmPlace): string {
  const parts = [
    place.address?.road,
    place.address?.neighbourhood,
    place.address?.suburb,
    place.address?.postcode,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : place.display_name;
}

export function osmCity(place: OsmPlace): string {
  return place.address?.city || place.address?.town || place.address?.village || "";
}

export function osmState(place: OsmPlace): string {
  return place.address?.state || "";
}
