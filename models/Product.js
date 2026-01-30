const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // jewellery, hair, cosmetic
    desc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    images: { type: [String], required: true }, // array of image URLs
    stock: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
