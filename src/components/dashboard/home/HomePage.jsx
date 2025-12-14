import React, { useState } from "react";
import { Box } from "@mui/material";
import { useOutletContext, useNavigate } from "react-router-dom";
import HomeEmptyState from "./HomeEmptyState";
import HomeSubBar from "./HomeSubBar";
import ProductCard from "../products/ProductCard";
import {
  deleteProduct,
  togglePublish,
} from "../../../api/productApi";

function HomePage() {
  const { products = [], setProducts } = useOutletContext();
  const [activeTab, setActiveTab] = useState("published");
  const navigate = useNavigate();

  /* FILTER BASED ON TAB */
  const filteredProducts = products.filter((p) =>
    activeTab === "published" ? p.published : !p.published
  );

  /* PUBLISH / UNPUBLISH */
  const handlePublish = async (product) => {
    const updated = await togglePublish(product._id, !product.published);

    setProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
  };

  /* DELETE */
  const handleDelete = async (product) => {
    await deleteProduct(product._id);

    setProducts((prev) =>
      prev.filter((p) => p._id !== product._id)
    );
  };

  /* EDIT → redirect to Products page */
  const handleEdit = () => {
    navigate("/dashboard/products");
  };

  return (
    <>
      <HomeSubBar active={activeTab} onChange={setActiveTab} />

      <Box sx={{ p: 3 }}>
        {filteredProducts.length === 0 ? (
          <HomeEmptyState type={activeTab} />
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onPublish={handlePublish}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}

export default HomePage;
