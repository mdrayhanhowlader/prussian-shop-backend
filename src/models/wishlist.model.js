const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

// একই device একই product দুইবার add করতে পারবে না
wishlistSchema.index({ deviceId: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);