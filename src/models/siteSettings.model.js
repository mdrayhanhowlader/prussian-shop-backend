const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: "Prussian" },
  logoUrl: { type: String, default: "" },
  faviconUrl: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);