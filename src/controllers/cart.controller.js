const Cart = require("../models/cart.model");

// Get cart
const getCart = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const cart = await Cart.findOne({ deviceId }).populate("items.product");
    res.json(cart || { items: [] });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add or update item
const addToCart = async (req, res) => {
  try {
    const { deviceId, productId, quantity } = req.body;

    if (!deviceId || !productId) {
      return res.status(400).json({ message: "Missing deviceId or productId" });
    }

    let cart = await Cart.findOne({ deviceId });

    if (!cart) {
      cart = await Cart.create({
        deviceId,
        items: [{ product: productId, quantity: quantity || 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (i) => i.product.toString() === productId
      );
      if (itemIndex >= 0) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ product: productId, quantity: quantity || 1 });
      }
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error("Add Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove single item
const removeFromCart = async (req, res) => {
  try {
    const { deviceId, productId } = req.body;

    if (!deviceId || !productId) {
      return res.status(400).json({ message: "Missing deviceId or productId" });
    }

    const cart = await Cart.findOne({ deviceId });
    if (cart) {
      cart.items = cart.items.filter(
        (i) => i.product.toString() !== productId
      );
      await cart.save();
    }

    res.json(cart || { items: [] });
  } catch (error) {
    console.error("Remove Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const { deviceId } = req.params;
    await Cart.findOneAndDelete({ deviceId });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };