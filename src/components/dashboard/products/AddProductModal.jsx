import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AddProductModal({
  open,
  onClose,
  onCreate,
  onUpdate,
  editingProduct,
}) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    type: "",
    stock: "",
    mrp: "",
    price: "",
    brand: "",
    exchange: "yes",
  });

  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);

  /* ================= PREFILL ON EDIT ================= */
  useEffect(() => {
    if (!editingProduct) return;

    setForm({
      name: editingProduct.name || "",
      type: editingProduct.type || "",
      stock: editingProduct.stock ?? "",
      mrp: editingProduct.mrp ?? "",
      price: editingProduct.price ?? "",
      brand: editingProduct.brand || "",
      exchange: editingProduct.exchange || "yes",
    });

    setImages((editingProduct.images || []).map((url) => ({ url })));
  }, [editingProduct]);

  /* ================= RESET ON CREATE ================= */
  useEffect(() => {
    if (open && !editingProduct) {
      setForm({
        name: "",
        type: "",
        stock: "",
        mrp: "",
        price: "",
        brand: "",
        exchange: "yes",
      });
      setImages([]);
      setErrors({});
    }
  }, [open, editingProduct]);

  /* ================= HANDLERS ================= */
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  /* ⚠️ TEMP PREVIEW ONLY (not persisted after refresh) */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previews]);
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Product name is required";
    if (!form.type) nextErrors.type = "Product type is required";
    if (!form.stock) nextErrors.stock = "Stock is required";
    if (!form.mrp) nextErrors.mrp = "MRP is required";
    if (!form.price) nextErrors.price = "Selling price is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!validate()) return;

    const stock = Number(form.stock);
    const mrp = Number(form.mrp);
    const price = Number(form.price);

    if (
      Number.isNaN(stock) ||
      Number.isNaN(mrp) ||
      Number.isNaN(price)
    ) {
      setErrors({
        stock: "Must be a number",
        mrp: "Must be a number",
        price: "Must be a number",
      });
      return;
    }

    const payload = {
      name: form.name.trim(),
      type: form.type,
      stock,
      mrp,
      price,
      brand: form.brand || "",
      exchange: form.exchange,
      images: images.map((img) => img.url), // strings only
    };

    if (editingProduct) {
      onUpdate(editingProduct._id, payload);
    } else {
      onCreate({
        ...payload,
        published: false,
      });
    }

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{ sx: { width: 420, borderRadius: 2 } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {editingProduct ? "Edit Product" : "Add Product"}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Field label="Product Name">
            <TextField
              fullWidth
              value={form.name}
              onChange={handleChange("name")}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Field>

          <Field label="Product Type">
            <TextField
              select
              fullWidth
              value={form.type}
              onChange={handleChange("type")}
              error={Boolean(errors.type)}
              helperText={errors.type}
            >
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothes">Clothes</MenuItem>
              <MenuItem value="beauty">Beauty Products</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </TextField>
          </Field>

          <Field label="Quantity Stock">
            <TextField
              type="number"
              fullWidth
              value={form.stock}
              onChange={handleChange("stock")}
              error={Boolean(errors.stock)}
              helperText={errors.stock}
            />
          </Field>

          <Field label="MRP">
            <TextField
              type="number"
              fullWidth
              value={form.mrp}
              onChange={handleChange("mrp")}
              error={Boolean(errors.mrp)}
              helperText={errors.mrp}
            />
          </Field>

          <Field label="Selling Price">
            <TextField
              type="number"
              fullWidth
              value={form.price}
              onChange={handleChange("price")}
              error={Boolean(errors.price)}
              helperText={errors.price}
            />
          </Field>

          <Field label="Brand Name">
            <TextField
              fullWidth
              value={form.brand}
              onChange={handleChange("brand")}
            />
          </Field>

          {/* Images */}
          <Box>
            <Label>Add Product Images</Label>
            <Box
              sx={{
                border: "1px dashed #d1d5db",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={handleBrowseClick}
            >
              Upload product images
              <br />
              <Button size="small">Browse</Button>

              {images.length > 0 && (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt=""
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Box>

          <Field label="Exchange or Return Eligibility">
            <TextField
              select
              fullWidth
              value={form.exchange}
              onChange={handleChange("exchange")}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>
          </Field>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleSubmit}>
              {editingProduct ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

/* ================= HELPERS ================= */
const Label = ({ children }) => (
  <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, display: "block" }}>
    {children}
  </label>
);

const Field = ({ label, children }) => (
  <Box>
    <Label>{label}</Label>
    {children}
  </Box>
);

export default AddProductModal;
