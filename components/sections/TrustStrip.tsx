"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { trustStats } from "@/lib/constants";
import type { ProductContentMap } from "@/lib/api/types";
import { readContentValue, formatStatNumber } from "@/lib/api/content-keys";

type TrustStripProps = {
  content: ProductContentMap;
};

export function TrustStrip({ content }: TrustStripProps) {
  const ev = readContentValue(content, "stats.events_hosted");
  const rt = readContentValue(content, "stats.avg_rating");
  const ct = readContentValue(content, "stats.cities");

  const eventsHosted =
    typeof ev === "number"
      ? `${formatStatNumber(ev)}+`
      : typeof ev === "string"
        ? ev
        : trustStats[0].value;
  const avgRating =
    typeof rt === "number"
      ? String(rt)
      : typeof rt === "string"
        ? rt
        : trustStats[1].value;
  const cities =
    typeof ct === "number"
      ? String(ct)
      : typeof ct === "string"
        ? ct
        : trustStats[2].value;

  const stats = [
    { ...trustStats[0], value: eventsHosted },
    { ...trustStats[1], value: avgRating },
    { ...trustStats[2], value: cities },
    trustStats[3],
  ];

  return (
    <FadeIn>
      <div className="border-t border-b border-line bg-surface py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-[32px] font-light leading-none text-heading">
                  {stat.value}
                  <span className="text-lg text-accent">{stat.unit}</span>
                </div>
                <div className="mt-1 text-xs text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </FadeIn>
  );
}
