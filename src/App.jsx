import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Main from "./components/signup/Main";
import Signup from "./components/signup/Signup";
import Otp from "./components/signup/Otp";

// Dashboard
import DashboardLayout from "./components/dashboard/DashboardLayout";
import HomePage from "./components/dashboard/home/HomePage";
import ProductsPage from "./components/dashboard/products/ProductsPage";

function App() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route element={<Main />}>
        <Route path="/" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
      </Route>

      {/* DASHBOARD ROUTES */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
