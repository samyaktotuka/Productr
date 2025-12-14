import React from "react";
import WidgetsIcon from '@mui/icons-material/Widgets';

function HomeEmptyState({ type }) {
  const isPublished = type === "published";

  return (
    <div
      style={{
        marginTop: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#111827",
      }}
    >
  
        <WidgetsIcon sx={{fontSize: "60px"}}/>

      <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
        {isPublished
          ? "No Published Products"
          : "No Unpublished Products"}
      </h3>

      <p
        style={{
          fontSize: "14px",
          color: "#6b7280",
          marginTop: "6px",
          textAlign: "center",
          maxWidth: "360px",
        }}
      >
        {isPublished
          ? "Your published products will appear here once you publish them."
          : "Create your first product to publish it here."}
      </p>
    </div>
  );
}

export default HomeEmptyState;
