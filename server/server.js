import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/productRoute.js";
import { seedProductsIfEmpty } from "./data.js";

dotenv.config();

console.log("SERVER FILE LOADED");

const app = express();

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

    // 🔑 SEED DEFAULT PRODUCTS (ONLY IF DB IS EMPTY)
    await seedProductsIfEmpty();
  })
  .catch((err) => console.error("❌ Mongo error:", err));

/* routes */
app.use("/api/products", router);

/* server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
