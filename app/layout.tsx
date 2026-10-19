import type { Metadata } from "next";
import { Archivo_Black, DM_Mono, Manrope } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-archivo-black",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const siteUrl = "https://ufo-music-group.vercel.app";
const siteTitle = "UFO Music Group Website Concept | Music, Events & Culture";
const siteDescription =
  "Independent website concept exploring UFO Music Group, live music, events, artists and creative culture. Portfolio project, not an official or affiliated website.";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&amp;fit=crop&amp;w=1920&amp;q=78" />
      </head>
      <body className={`${archivoBlack.variable} ${dmMono.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
