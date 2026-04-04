import type { Metadata, Viewport } from "next";
import { Syne, Nunito } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { SiteTopBanner } from "@/components/layout/SiteTopBanner";
import { ContribMarqueeStrip } from "@/components/layout/ContribMarqueeStrip";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { AnalyticsRoot } from "@/components/providers/AnalyticsRoot";
import { siteConfig } from "@/lib/constants";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "VIBO — Good vibes happen nearby.",
    template: "%s | VIBO",
  },
  description:
    "Discover local events, meet real people, and build community. VIBO connects you to hikes, workshops, jam sessions, and more happening near you. Free forever for attendees.",
  keywords: [
    "Vibo",
    "hellovibo",
    "local events India",
    "Mumbai events",
    "events near me",
    "community events",
    "meetups",
    "hosting",
    "fun activities",
    "things to do Mumbai",
    "discover local events",
    "social events app",
    "new"
  ],
  authors: [{ name: "VIBO", url: siteConfig.url }],
  creator: "VIBO",
  publisher: "VIBO",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: "VIBO",
    title: "VIBO — Good vibes happen nearby.",
    description:
      "Discover local events, meet real people, and build community. Free forever for attendees.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VIBO — Good vibes happen nearby.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBO — Good vibes happen nearby.",
    description:
      "Discover local events, meet real people, and build community.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? {
        verification: {
          ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
            ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
            : {}),
          ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
            ? {
                other: {
                  "msvalidate.01":
                    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
                },
              }
            : {}),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = siteConfig.url;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "VIBO",
        url: siteUrl,
        logo: `${siteUrl}${siteConfig.ogImage}`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "VIBO",
        description: siteConfig.description,
        inLanguage: "en-IN",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "ReadAction",
          target: siteUrl,
        },
      },
      {
        "@type": "WebApplication",
        name: "VIBO",
        url: siteUrl,
        description: siteConfig.description,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web, iOS, Android",
        browserRequirements: "Requires JavaScript",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR, USD",
          description: "Free forever for attendees",
        },
        creator: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${nunito.variable} font-body antialiased`}
      >
        <ThemeProvider>
          <AnalyticsRoot />
          <ScrollProgress />
          <Navbar />
          <SiteTopBanner />
          <ContribMarqueeStrip />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
