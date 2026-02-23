const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller");

router.get("/:deviceId", getCart);
router.post("/", addToCart);
router.delete("/", removeFromCart);
router.delete("/clear/:deviceId", clearCart);

module.exports = router;