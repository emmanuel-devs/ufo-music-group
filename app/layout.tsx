import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ufo-music-group.vercel.app";
const siteTitle = "UFO Music Group | Music, Events & Creative Culture";
const siteDescription =
  "Explore an independent website concept for UFO Music Group, bringing together live music, DJs, artists, creative collaborations and culture. This concept is not an official site.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | UFO Music Group",
  },
  description: siteDescription,
  applicationName: "UFO Music Group Concept",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "UFO Music Group",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "UFO Music Group concept: music, events and creative culture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
