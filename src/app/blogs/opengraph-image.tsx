import { ImageResponse } from "next/og";

export const alt = "Chakriova Community Blog Feed";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function BlogOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #064e3b 0%, #047857 52%, #0e7490 100%)",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "36px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "64px 72px",
            width: "100%",
          }}
        >
          <div style={{ color: "#a7f3d0", fontSize: 28, fontWeight: 700 }}>
            CHAKRIOVA COMMUNITY
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
            Community Blog Feed
          </div>
          <div style={{ color: "#d1fae5", fontSize: 30 }}>
            Share knowledge, preparation tips, and career experiences.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
