"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";

export type OsmMapMarker = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  lines: string[];
  color: "orange" | "teal";
};

const DEFAULT_CENTER: [number, number] = [19.076, 72.8777];

type OsmMapEmbedProps = {
  className?: string;
  markers: OsmMapMarker[];
  center?: [number, number];
  zoom?: number;
};

export function OsmMapEmbed({
  className = "",
  markers,
  center = DEFAULT_CENTER,
  zoom = 11,
}: OsmMapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerLat = center[0];
  const centerLng = center[1];

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;
    let ro: ResizeObserver | null = null;

    void import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView([centerLat, centerLng], zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const group = L.layerGroup().addTo(map);

      const popupUi = {
        className: "vibo-leaflet-popup",
        maxWidth: 288,
        minWidth: 220,
        autoPanPadding: [12, 12] as [number, number],
      };

      const list = markers.length ? markers : [];
      if (!list.length) {
        const empty = L.circleMarker([centerLat, centerLng], {
          radius: 9,
          color: "#00B4A0",
          weight: 2,
          fillColor: "#00B4A0",
          fillOpacity: 0.35,
        });
        empty.bindPopup(buildEmptyStatePopupHtml(), popupUi);
        empty.addTo(group);
      } else {
        const bounds = L.latLngBounds([]);
        list.forEach((m) => {
          const isOrange = m.color === "orange";
          const circle = L.circleMarker([m.lat, m.lng], {
            radius: 8,
            color: isOrange ? "#ff5c2b" : "#00B4A0",
            weight: 2,
            fillColor: isOrange ? "#ff6b4a" : "#00B4A0",
            fillOpacity: 0.9,
          });
          circle.bindPopup(buildMarkerPopupHtml(m), popupUi);
          circle.addTo(group);
          bounds.extend([m.lat, m.lng]);
        });
        if (bounds.isValid()) {
          // Without maxZoom, Leaflet zooms in tightly on clustered pins — the `zoom`
          // prop would be ignored. Cap how far in we can zoom; padding keeps pins off the edge.
          map.fitBounds(bounds.pad(0.55), {
            maxZoom: zoom,
            padding: [40, 40],
          });
        }
      }

      ro = new ResizeObserver(() => {
        map?.invalidateSize();
      });
      ro.observe(containerRef.current);
    });

    return () => {
      cancelled = true;
      ro?.disconnect();
      map?.remove();
    };
  }, [markers, centerLat, centerLng, zoom]);

  return <div ref={containerRef} className={`min-h-[280px] w-full ${className}`} />;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Matches pin line order: category, location, price, optional coordinates */
const POPUP_LINE_LABELS = ["Type", "Where", "", "Coords"] as const;

function buildMarkerPopupHtml(m: OsmMapMarker): string {
  const variant = m.color === "orange" ? "orange" : "teal";
  const meta = buildPopupMetaRows(m.lines);
  return `
<div class="vibo-map-popup vibo-map-popup--${variant}">
  <div class="vibo-map-popup__top">
    <span class="vibo-map-popup__dot" aria-hidden="true"></span>
    <h3 class="vibo-map-popup__title">${escapeHtml(m.title)}</h3>
  </div>
  ${meta}
</div>`.trim();
}

function buildPopupMetaRows(lines: string[]): string {
  if (!lines.length) return "";
  const rows: string[] = [];
  lines.forEach((raw, i) => {
    const text = raw.trim();
    if (!text) return;
    if (i === 2) {
      rows.push(
        `<p class="vibo-map-popup__price"><span class="vibo-map-popup__price-label">Price</span><span class="vibo-map-popup__price-value">${escapeHtml(text)}</span></p>`
      );
      return;
    }
    const label = POPUP_LINE_LABELS[i] ?? (i === 3 ? "Coords" : "Detail");
    rows.push(
      `<div class="vibo-map-popup__row"><span class="vibo-map-popup__row-label">${escapeHtml(label)}</span><span class="vibo-map-popup__row-value">${escapeHtml(text)}</span></div>`
    );
  });
  if (!rows.length) return "";
  return `<div class="vibo-map-popup__meta">${rows.join("")}</div>`;
}

function buildEmptyStatePopupHtml(): string {
  return `
<div class="vibo-map-popup vibo-map-popup--empty">
  <p class="vibo-map-popup__eyebrow">Your map</p>
  <h3 class="vibo-map-popup__title">Plans will show up here</h3>
  <p class="vibo-map-popup__lede">As hosts go live nearby, you&apos;ll see real things to join on the map.</p>
</div>`.trim();
}
