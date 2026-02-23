const Wishlist = require("../models/wishlist.model");

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { deviceId, productId } = req.body;

    if (!deviceId || !productId) {
      return res.status(400).json({ message: "Missing deviceId or productId" });
    }

    const exists = await Wishlist.findOne({ deviceId, product: productId });
    if (exists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const wish = await Wishlist.create({ deviceId, product: productId });
    res.status(201).json(wish);
  } catch (error) {
    console.error("Add Wishlist Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { deviceId, productId } = req.body;

    if (!deviceId || !productId) {
      return res.status(400).json({ message: "Missing deviceId or productId" });
    }

    await Wishlist.findOneAndDelete({ deviceId, product: productId });
    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    console.error("Remove Wishlist Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get wishlist by deviceId
const getWishlist = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const wishlist = await Wishlist.find({ deviceId }).populate("product");
    res.json(wishlist);
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };