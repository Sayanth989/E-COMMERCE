import { useState } from "react";



function FeatureBox({ img, label, bg }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        width: 180, textAlign: "center", padding: "25px 15px",
        boxShadow: hovered
          ? "10px 10px 54px rgba(20,62,221,0.1)"
          : "20px 20px 34px rgba(0,0,0,0.05)",
        border: "1px solid #cce7d0", borderRadius: 4,
        margin: "15px 0", transition: "0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={img} alt={label} style={{ width: "100%", marginBottom: 10 }} />
      <h6 style={{
        padding: "9px 8px 6px 8px", display: "inline-block",
        lineHeight: 1, borderRadius: 4, color: "#088178",
        backgroundColor: bg, fontWeight: 700, fontSize: 12,
      }}>
        {label}
      </h6>
    </div>
  );
}

export default FeatureBox;