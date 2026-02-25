import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { fetchSanity } from "@/sanity/lib/helpers";
import { announcementBannerQuery } from "@/sanity/queries";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Enjiri Center Ministries International",
    template: "%s | Enjiri Center Ministries",
  },
  description:
    "Reaching the world with the love of Christ through worship, outreach, teachings, and service. Join us at Enjiri Center Ministries International.",
  keywords: [
    "Enjiri Center Ministries",
    "church",
    "worship",
    "sermons",
    "outreach",
    "teachings",
  ],
  metadataBase: new URL("https://enjiriministries.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Enjiri Center Ministries International",
    title: "Enjiri Center Ministries International",
    description:
      "Reaching the world with the love of Christ through worship, outreach, teachings, and service.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

interface AnnouncementBannerData {
  enabled: boolean;
  message: string;
  linkText?: string;
  linkUrl?: string;
  style?: "info" | "warning" | "celebration";
  expiresAt?: string;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const banner = await fetchSanity<AnnouncementBannerData>(announcementBannerQuery);

  const showBanner =
    banner?.enabled &&
    banner?.message &&
    (!banner.expiresAt || new Date(banner.expiresAt) > new Date());

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {showBanner && (
          <AnnouncementBanner
            message={banner.message}
            linkText={banner.linkText}
            linkUrl={banner.linkUrl}
            style={banner.style}
          />
        )}
        <Navbar />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
