import type { Metadata, Viewport } from "next";
import { Syne, Nunito } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { AnalyticsRoot } from "@/components/providers/AnalyticsRoot";
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
    "local events",
    "community events",
    "activities near me",
    "meetups",
    "Mumbai events",
    "discover events",
    "social events",
    "VIBO",
  ],
  authors: [{ name: "VIBO Technologies" }],
  creator: "VIBO Technologies",
  metadataBase: new URL("https://vibo.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vibo.app",
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
    canonical: "https://vibo.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VIBO",
    url: "https://vibo.app",
    description:
      "Discover local events, meet real people, and build community.",
    applicationCategory: "SocialNetworkingApplication",
    operatingSystem: "iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Free forever for attendees",
    },
    creator: {
      "@type": "Organization",
      name: "VIBO Technologies",
      url: "https://vibo.app",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
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
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
