const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

// const dotenv = require("dotenv");
const productRoutes = require("./src/routes/product.routes");
const orderRoutes = require("./src/routes/order.routes");
const bannerRoutes = require("./src/routes/banner.routes");
const cartRoutes = require("./src/routes/cart.routes");
const wishlistRoutes = require("./src/routes/wishlist.routes");



// dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  });


app.use("/api/products", productRoutes);  
app.use("/api/orders", orderRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/carts", cartRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
