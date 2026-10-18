import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UFO Music Group | Culture in Motion",
  description:
    "A concept website exploring a digital home for UFO Music Group, music, events, artists and creative culture.",
  applicationName: "UFO Music Group",
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