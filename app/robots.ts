import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

/** Required for `output: 'export'` — robots.txt is generated at build time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
