const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    buttonText: { type: String },
    textColor: { type: String, default: "#000000" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
