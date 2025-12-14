import React from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";

function ProductsEmptyState({ onAddClick }) {
  return (
    <div
      style={{
        marginTop: "-150px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "420px",
          color: "#111827",
        }}
      >
        {/* Icon */}
        <WidgetsIcon
          style={{
            fontSize: "60px",
            color: "#111827",
            marginBottom: "12px",
          }}
        />

        {/* Title */}
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "6px",
          }}
        >
          Feels a little empty over here...
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            lineHeight: 1.5,
            marginBottom: "20px",
          }}
        >
          You can create products without connecting store.
          <br />
          You can add products to store anytime.
        </p>

        <button
          onClick={onAddClick}
          style={{
            backgroundColor: "#0F1EC5",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            width: "350px",
          }}
        >
          Add your Products
        </button>
      </div>
    </div>
  );
}

export default ProductsEmptyState;
