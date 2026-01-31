require("dotenv").config(); // ✅ bas ek baar
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

// ✅ middlewares
app.use(cors()); // 🔥 VERY IMPORTANT (CORS fix)
app.use(express.json());

// ✅ routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("TrueLuv Backend is Running 🚀");
});

// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGO_URI) // 👈 same name as .env
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ DB Error:", err));

// ✅ server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
