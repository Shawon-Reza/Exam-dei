import { ImageResponse } from "next/og";

export const alt = "Chakriova - Job Preparation Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #5e5653 0%, #586b88 52%, #ab978c 100%)",
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
          <div style={{ color: "#e9e6e7", fontSize: 28, fontWeight: 700 }}>
            CHAKRIOVA
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
            Job Preparation Platform
          </div>
          <div style={{ color: "#e9e6e7", fontSize: 30 }}>
            Learn, practice, and move closer to your goal.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
