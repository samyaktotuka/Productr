import React, { useState } from "react";
import { Box, Button, Typography, Snackbar } from "@mui/material";
import { useOutletContext } from "react-router-dom";

import ProductsEmptyState from "./ProductsEmptyState";
import AddProductModal from "./AddProductModal";
import ProductCard from "./ProductCard";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  togglePublish,
} from "../../../api/productApi";

function ProductsPage() {
  const { products, setProducts } = useOutletContext();

  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [snack, setSnack] = useState("");

  /* ================= CREATE ================= */
  const handleCreateProduct = async (data) => {
    try {
      const saved = await createProduct(data);
      setProducts((prev) => [saved, ...prev]);
      setSnack("Product added successfully");
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      setSnack("Failed to create product");
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdateProduct = async (id, data) => {
    try {
      const updated = await updateProduct(id, data);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? updated : p))
      );
      setSnack("Product updated successfully");
      setEditingProduct(null);
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      setSnack("Failed to update product");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (product) => {
    try {
      await deleteProduct(product._id);
      setProducts((prev) =>
        prev.filter((p) => p._id !== product._id)
      );
      setSnack("Product deleted successfully");
    } catch (err) {
      console.error(err);
      setSnack("Failed to delete product");
    }
  };

  /* ================= PUBLISH / UNPUBLISH ================= */
  const handlePublish = async (product) => {
    try {
      const updated = await togglePublish(
        product._id,
        !product.published
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === updated._id ? updated : p
        )
      );
    } catch (err) {
      console.error(err);
      setSnack("Failed to update publish status");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  return (
    <>
      {/* HEADER — only if products exist */}
      {products.length > 0 && (
        <Box
          sx={{
            height: 64,
            px: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e5e7eb",
            backgroundColor: "#fff",
          }}
        >
          <Typography fontSize={16} fontWeight={600}>
            Products
          </Typography>

          <Button
            variant="outlined"
            onClick={() => {
              setEditingProduct(null);
              setOpenModal(true);
            }}
            sx={{ textTransform: "none" }}
          >
            + Add Product
          </Button>
        </Box>
      )}

      {/* CONTENT */}
      <Box sx={{ p: 3 }}>
        {products.length === 0 ? (
          <Box
            sx={{
              height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProductsEmptyState
              onAddClick={() => setOpenModal(true)}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onPublish={handlePublish}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* MODAL */}
      <AddProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingProduct(null);
        }}
        onCreate={handleCreateProduct}
        onUpdate={handleUpdateProduct}
        editingProduct={editingProduct}
      />

      {/* SNACKBAR */}
      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={3000}
        onClose={() => setSnack("")}
        message={snack}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
    </>
  );
}

export default ProductsPage;
