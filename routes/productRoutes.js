const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* ================= RELATED PRODUCTS (SABSE UPAR) ================= */
router.get("/related/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;

    const products = await Product.find({
      category,
      _id: { $ne: id },
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= CATEGORY PRODUCTS ================= */
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= ALL PRODUCTS ================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= SINGLE PRODUCT (LAST ME) ================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= ADD PRODUCT ================= */
router.post("/", async (req, res) => {
  try {
    const { name, price, category, desc, fullDesc, images, stock } = req.body;

    const product = new Product({
      name,
      price,
      category,
      desc,
      fullDesc,
      images,
      stock,
    });

    const saved = await product.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= DELETE PRODUCT ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add review to a product
// Add review to a product
router.post("/review/:id", async (req, res) => {
  try {
    const { name, comment, rating } = req.body;

    // Check all fields
    if (!name || !comment || !rating) {
      return res.status(400).json({ message: "All fields required" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Push new review
    product.reviews.push({ name, comment, rating });
    await product.save();

    res.json(product); // return updated product
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
