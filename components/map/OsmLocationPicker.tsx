"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

type OsmLocationPickerProps = {
  lat: number;
  lng: number;
  label?: string;
  onChange: (lat: number, lng: number) => void;
};

export function OsmLocationPicker({
  lat,
  lng,
  label = "Event location",
  onChange,
}: OsmLocationPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);
  const onChangeRef = useRef(onChange);
  const initialPositionRef = useRef<[number, number]>([lat, lng]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let cancelled = false;
    let ro: ResizeObserver | null = null;

    void import("leaflet").then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const initialPosition = initialPositionRef.current;
      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView(initialPosition, 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<div style="width:28px;height:28px;border-radius:999px;background:#ff6b4a;border:3px solid white;box-shadow:0 8px 18px rgba(0,0,0,.25);"></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker(initialPosition, {
        draggable: true,
        icon,
        title: label,
      }).addTo(map);

      marker.bindTooltip("Drag me to the exact spot", {
        direction: "top",
        offset: [0, -12],
      });

      marker.on("dragend", () => {
        const next = marker.getLatLng();
        onChangeRef.current(next.lat, next.lng);
      });

      map.on("click", (event) => {
        marker.setLatLng(event.latlng);
        onChangeRef.current(event.latlng.lat, event.latlng.lng);
      });

      ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(containerRef.current);
      mapRef.current = map;
      markerRef.current = marker;
    });

    return () => {
      cancelled = true;
      ro?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [label]);

  useEffect(() => {
    const next: [number, number] = [lat, lng];
    markerRef.current?.setLatLng(next);
    mapRef.current?.setView(next, Math.max(mapRef.current.getZoom(), 15), {
      animate: true,
    });
  }, [lat, lng]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div ref={containerRef} className="h-[280px] w-full sm:h-[340px]" />
      <div className="border-t border-line px-4 py-3 text-xs font-bold text-muted">
        Drag the pin or tap the map to set the exact meeting spot.
      </div>
    </div>
  );
}
