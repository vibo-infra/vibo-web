"use client";

/** Renders when `SHOW_PRICING_SECTION` is `true` in `@/lib/constants`. */

import { useRef, useMemo, useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import {
  pricingPlans,
  PRICING_CMS_KEYS,
  type PricingCmsSlot,
  type PricingPlanDef,
  type PricingPlanFeature,
} from "@/lib/constants";
import type { ProductContentMap } from "@/lib/api/types";
import { readContentValue } from "@/lib/api/content-keys";
import { fetchContentPricingClient } from "@/lib/api/services/webApi";
import { track } from "@/lib/analytics";

function planKey(tier: string): "attendee" | "host" | "host_pro" {
  if (tier === "Host Pro") return "host_pro";
  if (tier === "Host") return "host";
  return "attendee";
}

function cmsFeatureLine(
  slot: PricingCmsSlot,
  raw: unknown,
  loading: boolean
): string {
  if (loading) return "…";
  const s = raw != null && String(raw).trim() !== "" ? String(raw) : "";
  if (!s) return "—";
  switch (slot) {
    case "host_boost":
      return `Event Boost from ${s} / event`;
    case "host_unlimited":
      return `Unlimited events from ${s}`;
    case "ticketing_fee":
      return `Ticketing — ${s} per ticket sold`;
  }
}

function resolveFeature(
  f: PricingPlanFeature,
  content: ProductContentMap,
  loading: boolean
): { text: string; included: boolean } {
  if ("text" in f) return { text: f.text, included: f.included };
  const key = PRICING_CMS_KEYS[f.cmsSlot];
  const raw = readContentValue(content, key);
  return {
    included: f.included,
    text: cmsFeatureLine(f.cmsSlot, raw, loading),
  };
}

/** Splits `…/mo` for typographic main + suffix when the API returns a combined string. */
function headlineFromCms(
  raw: unknown,
  loading: boolean
): { main: string; suffix: string | null } {
  if (loading) return { main: "…", suffix: null };
  const s = raw != null && String(raw).trim() !== "" ? String(raw).trim() : "";
  if (!s) return { main: "—", suffix: null };
  const m = s.match(/^(.+?)(\s*\/mo\s*)$/i);
  if (m) {
    return { main: m[1].trim(), suffix: "/mo" };
  }
  return { main: s, suffix: null };
}

function resolveHeadline(
  plan: PricingPlanDef,
  content: ProductContentMap,
  loading: boolean
): { main: string; suffix: string | null } {
  if (plan.priceCmsKey) {
    const raw = readContentValue(content, plan.priceCmsKey);
    return headlineFromCms(raw, loading);
  }
  if (plan.priceLiteral) {
    return { main: plan.priceLiteral, suffix: plan.priceSuffix };
  }
  return { main: "—", suffix: null };
}

export function Pricing() {
  const hoverOnce = useRef(new Set<string>());
  const [loadState, setLoadState] = useState<"loading" | "error" | "ok">(
    "loading"
  );
  const [content, setContent] = useState<ProductContentMap>({});

  useEffect(() => {
    let cancelled = false;
    fetchContentPricingClient().then((data) => {
      if (cancelled) return;
      if (data === null) {
        setLoadState("error");
        return;
      }
      setContent(data);
      setLoadState("ok");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = loadState === "loading";

  const plans = useMemo(() => {
    return pricingPlans.map((plan) => {
      const { main, suffix } = resolveHeadline(plan, content, loading);
      return {
        ...plan,
        displayPrice: main,
        displaySuffix: suffix,
        features: plan.features.map((f) => resolveFeature(f, content, loading)),
      };
    });
  }, [content, loading]);

  const scrollToWaitlist = (tier: string) => {
    const el = document.getElementById("wl");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    const input = document.getElementById("emailInput") as HTMLInputElement | null;
    if (input) input.focus();
    track("cta_click", "pricing_cta", { plan: planKey(tier) });
  };

  const onPlanHover = (tier: string) => {
    const k = planKey(tier);
    if (hoverOnce.current.has(k)) return;
    hoverOnce.current.add(k);
    track("pricing_hover", k);
  };

  return (
    <section id="price" className="bg-surface py-[108px]">
      <Container>
        <SectionEyebrow text="Pricing" />
        <FadeIn>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
            Simple, honest pricing.
            <br />
            <em className="font-light">Nothing buried in the fine print.</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-3 max-w-[540px] text-base font-light leading-relaxed text-body">
            Attending events is free. Always. We only charge hosts when they
            want tools to grow — and even then, only what&apos;s fair.
          </p>
        </FadeIn>

        {loadState === "error" ? (
          <FadeIn delay={0.15}>
            <p className="mt-14 text-sm font-light leading-relaxed text-muted">
              We couldn&apos;t load pricing. Check that the API is running and{" "}
              <code className="text-xs">NEXT_PUBLIC_API_URL</code> is set, and
              that the pricing section is published in{" "}
              <code className="text-xs">product_content</code>.
            </p>
          </FadeIn>
        ) : (
          <StaggerContainer className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-3">
            {plans.map((plan) => (
              <StaggerItem key={plan.tier}>
                <div
                  className={`relative rounded-card border p-8 transition-all hover:-translate-y-1 ${
                    plan.featured
                      ? "border-accent bg-page"
                      : "border-line bg-surface"
                  }`}
                  onMouseEnter={() => onPlanHover(plan.tier)}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                      Most popular
                    </div>
                  )}

                  <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                    {plan.tier}
                  </div>

                  <div className="mb-1.5 font-display text-[44px] font-light leading-none text-heading">
                    {plan.displayPrice}
                    {plan.displaySuffix ? (
                      <span className="text-lg text-muted">
                        {plan.displaySuffix}
                      </span>
                    ) : null}
                  </div>

                  <div className="mb-6 text-[13px] text-muted">
                    {plan.subtitle}
                  </div>

                  <ul className="mb-7">
                    {plan.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex gap-2.5 border-b border-line py-[7px] text-sm font-light text-body last:border-b-0"
                      >
                        <span
                          className={`mt-px shrink-0 text-xs ${
                            feature.included ? "text-accent" : "text-faint"
                          }`}
                        >
                          {feature.included ? "✓" : "—"}
                        </span>
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => scrollToWaitlist(plan.tier)}
                    className={`h-11 w-full cursor-pointer rounded-lg font-body text-sm font-medium transition-all ${
                      plan.featured
                        ? "border border-accent bg-accent text-white hover:opacity-90"
                        : "border border-line-strong bg-transparent text-heading hover:bg-surface-alt"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </Container>
    </section>
  );
}
