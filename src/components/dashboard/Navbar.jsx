import React from "react";
import { Box, TextField, Typography, Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

function Navbar() {
  const location = useLocation();

  const isHomePage = location.pathname.includes("/dashboard/home");
  const isProductsPage = location.pathname.includes("/dashboard/products");

  const showSearch = isHomePage || isProductsPage;

  return (
    <Box
      sx={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        px: 3,
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
      }}
    >
      {/* LEFT: Icon + Title */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 160 }}
      >
        {isHomePage && (
          <>
            <HomeIcon sx={{ fontSize: 18, color: "#0b1b4f" }} />
            <Typography
              sx={{ fontWeight: 600, fontSize: "15px", color: "#0b1b4f" }}
            >
              Home
            </Typography>
          </>
        )}

        {isProductsPage && (
          <>
            <ShoppingBagIcon sx={{ fontSize: 18, color: "#0b1b4f" }} />
            <Typography
              sx={{ fontWeight: 600, fontSize: "15px", color: "#0b1b4f" }}
            >
              Products
            </Typography>
          </>
        )}
      </Box>

      {/* CENTER: Search */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "right",
          marginRight: "30px",
        }}
      >
        {showSearch && (
          <TextField
            size="small"
            placeholder="Search Services, Products"
            sx={{
              width: 360,
              backgroundColor: "#f8fafc",
            }}
          />
        )}
      </Box>

      {/* RIGHT: Avatar */}
      <Box sx={{ minWidth: 40, display: "flex", justifyContent: "flex-end" }}>
        <Avatar src="/resources/avatar.png" />
      </Box>
    </Box>
  );
}

export default Navbar;
