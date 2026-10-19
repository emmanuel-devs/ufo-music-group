import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff6a2a",
          color: "#171613",
          fontSize: 31,
          fontWeight: 900,
          letterSpacing: "-0.1em",
          borderRadius: 12,
        }}
      >
        UFO
      </div>
    ),
    { ...size }
  );
}
