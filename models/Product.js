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
    // ⭐⭐⭐ NEW FIELDS
    reviews: [reviewSchema], // all reviews
    ratings: {
      type: Number, // average rating
      default: 0,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
