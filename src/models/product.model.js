const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  name: String,
  hex: String,
  stock: {
    type: Number,
    default: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: Number,
    description: String,
    images: [String],
    sizes: [String],
    colors: [colorSchema],
    totalStock: { type: Number, default: 0 },
    isNewArrival: { type: Boolean, default: false },
    isOffer: { type: Boolean, default: false },
    analytics: {
      views: { type: Number, default: 0 },
      favorites: { type: Number, default: 0 },
      addToCart: { type: Number, default: 0 },
    },
    isOutOfStock: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
