import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ufo-music-group.vercel.app";
const siteTitle = "UFO Music Group Website Concept | Music, Events & Culture";
const siteDescription =
  "An independent website concept for UFO Music Group, exploring music, live events, artists and creative culture. A speculative portfolio project, not an official or affiliated website.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | UFO Music Group Concept",
  },
  description: siteDescription,
  applicationName: "UFO Music Group Website Concept",
  keywords: [
    "UFO Music Group",
    "music website concept",
    "live music",
    "music events",
    "DJ events",
    "creative culture",
    "website design portfolio",
  ],
  category: "music",
  creator: "Independent website concept",
  publisher: "Independent website concept",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "UFO Music Group Website Concept",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "UFO Music Group independent website concept for music, events and creative culture",
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
