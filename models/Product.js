const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    desc: { type: String, default: "" },
    fullDesc: { type: String, required: false },

    images: { type: [String], default: [] },
    stock: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
