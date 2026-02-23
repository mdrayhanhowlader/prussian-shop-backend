const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    customerName: String,
    phone: String,
    email: String,

    district: String,
    location: String,
    thana: String,
    detailedAddress: String,

    settlementMethod: String,
    notes: String,

    subtotal: Number,
    shipping: Number,
    totalAmount: Number,

    status: {
      type: String,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
