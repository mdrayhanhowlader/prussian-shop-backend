const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlist.controller");

router.post("/", addToWishlist);
router.delete("/", removeFromWishlist);
router.get("/:deviceId", getWishlist);

module.exports = router;