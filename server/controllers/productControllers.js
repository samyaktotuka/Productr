const Product = require("../../src/models/Product");

/* CREATE */
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

/* READ */
exports.getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

/* UPDATE */
exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

/* DELETE */
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

/* TOGGLE PUBLISH */
exports.togglePublish = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.published = !product.published;
  await product.save();
  res.json(product);
};
