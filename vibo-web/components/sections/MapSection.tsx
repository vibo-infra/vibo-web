"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import { mapPins, mapFilters } from "@/lib/constants";

export function MapSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section className="py-[100px]">
      <Container>
        <SectionEyebrow text="Live events" />
        <FadeIn>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
            Here&apos;s a taste of
            <br />
            <em className="font-light">what&apos;s out there.</em>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mt-12 h-[420px] overflow-hidden rounded-card border border-line bg-page">
            <div className="absolute inset-0 bg-page" />
            <div className="map-grid-lines absolute inset-0" />

            {/* Filter pills */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5">
              {mapFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`cursor-pointer rounded-full border px-3 py-[5px] text-[11px] font-medium transition-all ${
                    activeFilter === filter
                      ? "border-accent bg-accent text-white"
                      : "border-line-strong bg-page text-body hover:border-accent hover:bg-accent hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Map pins */}
            {mapPins.map((pin, i) => (
              <div
                key={i}
                className="group absolute cursor-pointer transition-transform hover:scale-110"
                style={{ left: pin.left, top: pin.top }}
              >
                <div
                  className={`h-3.5 w-3.5 rounded-full border-2 border-page ${
                    pin.color === "orange"
                      ? "bg-accent shadow-[0_0_0_4px_rgba(255,92,43,0.15)]"
                      : "bg-[#00B4A0] shadow-[0_0_0_4px_rgba(0,180,160,0.15)]"
                  }`}
                />

                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-[22px] left-1/2 z-10 min-w-[200px] -translate-x-1/2 rounded-lg border border-line-strong bg-page px-3.5 py-2.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="mb-1 text-[13px] font-medium text-heading whitespace-nowrap">
                    {pin.title}
                  </div>
                  <div className="flex gap-2.5 text-[11px] text-muted">
                    {pin.meta.map((m, j) => (
                      <span
                        key={j}
                        className={
                          m.startsWith("★") ? "text-highlight" : ""
                        }
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-page px-3 py-1 text-[11px] text-faint">
              Hover a dot to see event details · Events shown are
              illustrative
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
