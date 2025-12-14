import React, { useState, useRef } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ProductCard({ product, onPublish, onEdit, onDelete }) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["/placeholder.png"];

  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  /* ▶ Next / ◀ Prev */
  const next = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  const prev = () =>
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  /* 📱 Swipe support */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (!touchStartX.current) return;

    const diff =
      touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) next();
    if (diff < -50) prev();

    touchStartX.current = null;
  };

  return (
    <Box
      sx={{
        width: 280,
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        padding: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* IMAGE CAROUSEL */}
      <Box
        sx={{
          position: "relative",
          height: 160,
          borderRadius: "8px",
          backgroundColor: "#f9fafb",
          overflow: "hidden",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[current]}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />

        {/* LEFT */}
        {images.length > 1 && (
          <IconButton
            size="small"
            onClick={prev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 4,
              transform: "translateY(-50%)",
              backgroundColor: "#ffffff",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        )}

        {/* RIGHT */}
        {images.length > 1 && (
          <IconButton
            size="small"
            onClick={next}
            sx={{
              position: "absolute",
              top: "50%",
              right: 4,
              transform: "translateY(-50%)",
              backgroundColor: "#ffffff",
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* DOTS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "4px",
          marginTop: "6px",
        }}
      >
        {images.map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor:
                i === current ? "#f97316" : "#e5e7eb",
            }}
          />
        ))}
      </Box>

      {/* TITLE */}
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#111827",
          marginTop: "8px",
        }}
      >
        {product.name}
      </Typography>

      {/* DETAILS */}
      <Box sx={{ marginTop: "6px", fontSize: "12px" }}>
        <Detail label="Product type" value={product.type} />
        <Detail label="Quantity Stock" value={product.stock} />
        <Detail label="MRP" value={`₹ ${product.mrp}`} />
        <Detail label="Selling Price" value={`₹ ${product.price}`} />
        <Detail label="Brand Name" value={product.brand} />
        <Detail label="Total Images" value={images.length} />
        <Detail
          label="Exchange Eligibility"
          value={product.exchange === "yes" ? "YES" : "NO"}
        />
      </Box>

      {/* ACTIONS */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          marginTop: "12px",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={() => onPublish(product)}
          sx={{
            backgroundColor: product.published ? "#22c55e" : "#1d4ed8",
            textTransform: "none",
            fontSize: "13px",
            height: 34,
          }}
        >
          {product.published ? "Unpublish" : "Publish"}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => onEdit(product)}
          sx={{
            textTransform: "none",
            fontSize: "13px",
            height: 34,
          }}
        >
          Edit
        </Button>

        <IconButton
          onClick={() => onDelete(product)}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            height: 34,
            width: 34,
          }}
        >
          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

/* Helper row */
function Detail({ label, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        color: "#6b7280",
        marginBottom: "2px",
      }}
    >
      <span>{label} -</span>
      <span style={{ color: "#374151" }}>{value}</span>
    </Box>
  );
}

export default ProductCard;
