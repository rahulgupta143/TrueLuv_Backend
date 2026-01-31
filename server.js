require("dotenv").config(); // 🔥 VERY IMPORTANT
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

// ✅ CORS — FRONTEND ONLY ALLOWED
app.use(
  cors({
    origin: [
      "https://dynamic-starlight-9be205.netlify.app", // live frontend
      "http://127.0.0.1:5500",                         // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// ✅ JSON body parse
app.use(express.json());

// ✅ routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("TrueLuv Backend is Running 🚀");
});

// ✅ Connect DB
connectDB();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
