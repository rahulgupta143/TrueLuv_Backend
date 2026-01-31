const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* ================= GET ALL PRODUCTS ================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= GET PRODUCTS BY CATEGORY ================= */
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    console.error("CATEGORY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= GET RELATED PRODUCTS ================= */
router.get("/related/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    const products = await Product.find({
      category,
      _id: { $ne: id },
    });
    res.json(products);
  } catch (err) {
    console.error("RELATED ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= GET SINGLE PRODUCT (LAST) ================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("SINGLE PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
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
    console.error("ADD PRODUCT ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= DELETE PRODUCT ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
