const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./src/routes/product.routes");
const orderRoutes = require("./src/routes/order.routes");
const bannerRoutes = require("./src/routes/banner.routes");
const cartRoutes = require("./src/routes/cart.routes");
const wishlistRoutes = require("./src/routes/wishlist.routes");
const adminUserRoutes = require("./src/routes/adminUser.routes");
const siteSettingsRoutes = require("./src/routes/siteSettings.routes");

const app = express();

// ─── Middleware ───────────────────────────────────────────────

app.use(cors({
    origin: [
      "https://prussianbd.shop",
      "https://www.prussianbd.shop",
      "http://localhost:3000"
    ],
    credentials: true
  }));
app.use(express.json());

// ─── MongoDB Connection ───────────────────────────────────────
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    throw err;
  }
};

// Vercel এ প্রতিটা request এ connection check করো
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// ─── Routes ───────────────────────────────────────────────────
app.get("/", (req, res) => res.send("Server Running..."));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/admin-users", adminUserRoutes);
app.use("/api/site-settings", siteSettingsRoutes);

// ─── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ message: "Internal server error" });
});

// ─── Local Development ────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ─── Vercel Export ────────────────────────────────────────────
module.exports = app;