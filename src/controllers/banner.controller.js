const Banner = require("../models/banner.model");

const getBanners = async (req, res) => {
  const banners = await Banner.find();
  res.json(banners);
};

const createBanner = async (req, res) => {
  const banner = await Banner.create(req.body);
  res.status(201).json(banner);
};

const updateBanner = async (req, res) => {
  const banner = await Banner.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(banner);
};

const deleteBanner = async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ message: "Banner deleted" });
};

module.exports = {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};
