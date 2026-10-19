import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "UFO Music Group independent website concept for music, events and creative culture";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171613",
          color: "#f3eee5",
          padding: "62px 72px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: "0.16em" }}>
          <span>UFO® / MUSIC GROUP</span>
          <span style={{ color: "#ff6a2a" }}>INDEPENDENT CONCEPT</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.88 }}>
          <span style={{ fontSize: 112, fontWeight: 900, letterSpacing: "-0.07em" }}>FIND YOUR</span>
          <span style={{ fontSize: 112, fontWeight: 900, letterSpacing: "-0.07em", color: "#ff6a2a" }}>PEOPLE.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 19 }}>
          <span>Music · Events · Creative Culture</span>
          <span style={{ color: "#b7b0a5" }}>NOT AN OFFICIAL WEBSITE</span>
        </div>
        <div style={{ position: "absolute", right: -90, top: 170, width: 280, height: 280, border: "2px solid #ff6a2a", borderRadius: 999, opacity: 0.55 }} />
        <div style={{ position: "absolute", right: -30, top: 230, width: 160, height: 160, border: "1px solid #ff6a2a", borderRadius: 999, opacity: 0.8 }} />
      </div>
    ),
    { ...size }
  );
}
