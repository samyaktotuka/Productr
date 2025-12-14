import React, { useState } from "react";

function HomeSubBar({ active, onChange }) {
  const [hovered, setHovered] = useState(null);

  const getTabStyle = (tab) => ({
    color:
      active === tab || hovered === tab ? "#2563eb" : "#6b7280",
    fontWeight: active === tab ? 600 : 500,
    cursor: "pointer",
    transition: "color 0.2s ease",
  });

  return (
    <div
      style={{
        height: "44px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "0 20px",
        borderBottom: "1px solid #e5e7eb",
        fontSize: "14px",
      }}
    >
      {/* Published */}
      <span
        style={getTabStyle("published")}
        onClick={() => onChange("published")}
        onMouseEnter={() => setHovered("published")}
        onMouseLeave={() => setHovered(null)}
      >
        Published
      </span>

      {/* Unpublished */}
      <span
        style={getTabStyle("unpublished")}
        onClick={() => onChange("unpublished")}
        onMouseEnter={() => setHovered("unpublished")}
        onMouseLeave={() => setHovered(null)}
      >
        Unpublished
      </span>
    </div>
  );
}

export default HomeSubBar;
