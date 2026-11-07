import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #2a1710 0%, #170c07 100%)",
        padding: 72,
        color: "#f7f2e9",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 20,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#e3a969",
        }}
      >
        <div style={{ width: 56, height: 1, background: "#e3a969" }} />
        {`Specialty coffee · Est. ${site.founded}`}
      </div>

      <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1.02 }}>
        <div>Every cup</div>
        <div style={{ display: "flex" }}>
          <span>{"tells a "}</span>
          <span style={{ color: "#e3a969", fontStyle: "italic" }}>{"story"}</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#f7f2e9",
          opacity: 0.65,
        }}
      >
        <span>{site.legalName}</span>
        <span>{site.contact.address.city}</span>
      </div>
    </div>,
    { ...size },
  );
}
