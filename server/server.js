import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import router from "./routes/productRoute.js";
import { seedProductsIfEmpty } from "./data.js";

dotenv.config();

console.log("SERVER FILE LOADED");

const app = express();

/* 🔧 Fix __dirname (ES modules) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* middleware */
app.use(cors());
app.use(express.json());

/* mongo connection (Atlas) */
const dbUrl = process.env.ATLASDB_URL;

if (!dbUrl) {
  console.error("❌ ATLASDB_URL is missing in .env");
  process.exit(1);
}

mongoose
  .connect(dbUrl)
  .then(async () => {
    console.log("✅ MongoDB Atlas connected");

    // 🌱 Seed default products ONLY if empty
    await seedProductsIfEmpty();
  })
  .catch((err) => console.error("❌ Mongo error:", err));

/* API routes */
app.use("/api/products", router);

/* ================= SERVE REACT ================= */
app.use(express.static(path.join(__dirname, "../dist")));

/* React Router fallback */
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});


/* server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
