import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { fetchProducts } from "../../api/productApi";

function DashboardLayout() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, overflow: "auto" }}>
          <Outlet context={{ products, setProducts }} />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
