import Product from "./models/Product.js";

export const seedProductsIfEmpty = async () => {
  const count = await Product.countDocuments();

  if (count > 0) {
    return; // already seeded
  }

  console.log("🌱 Seeding default products...");

  await Product.insertMany([
    {
      name: "Dark Chocolate",
      type: "Food",
      stock: 50,
      mrp: 999,
      price: 699,
      brand: "Vadilal",
      exchange: "yes",
      published: false,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1n5pahNt2exKcXdty2yKZjEHe4yJCPPBs2g&s"
      ],
    },
    {
      name: "Mint Chocolate Chips",
      type: "Food",
      stock: 20,
      mrp: 899,
      price: 599,
      brand: "Vadilal",
      exchange: "yes",
      published: false,
      images: [
        "https://www.sugarhero.com/wp-content/uploads/2023/12/mint-chocolate-chip-layer-cake-square-5.jpg"
      ],
    },
  ]);

  console.log("✅ Default products added");
};
