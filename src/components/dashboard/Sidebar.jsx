import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  const isActive = (path) => location.pathname.includes(path);

  const getItemStyle = (item) => ({
    opacity: 0.8,
    display: "flex",
    alignItems: "center",
    padding: "8px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor:
      isActive(item) || hovered === item ? "#1e293b" : "transparent",
    color: isActive(item) || hovered === item ? "#ffffff" : "#cbd5f5",
    transition: "background-color 0.2s ease, color 0.2s ease",
  });

  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#0f172a",
        color: "#fff",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      <h3
        onClick={() => navigate("/dashboard/home")}
        style={{ marginBottom: "20px", fontWeight: "bold", fontSize: "24px" }}
      >
        Productr <AddShoppingCartIcon />
      </h3>

      <input
        placeholder="Search"
        style={{
          marginLeft: "-6px",
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          width: "200px",
          marginBottom: "24px",
        }}
      />

      <hr />

      <nav
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* Home */}
        <span
          style={getItemStyle("home")}
          onClick={() => navigate("/dashboard/home")}
          onMouseEnter={() => setHovered("home")}
          onMouseLeave={() => setHovered(null)}
        >
          <HomeIcon
            sx={{ fontSize: "18px", marginTop: "-4px", marginRight: "6px" }}
          />
          Home
        </span>

        {/* Products */}
        <span
          style={getItemStyle("products")}
          onClick={() => navigate("/dashboard/products")}
          onMouseEnter={() => setHovered("products")}
          onMouseLeave={() => setHovered(null)}
        >
          <ShoppingBagIcon
            sx={{ fontSize: "17px", marginTop: "-4px", marginRight: "6px" }}
          />
          Products
        </span>
      </nav>
    </aside>
  );
}

export default Sidebar;
