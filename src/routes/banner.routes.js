const express = require("express");
const { 
  getBanners, 
  createBanner, 
  updateBanner, 
  deleteBanner 
} = require("../controllers/banner.controller");

const router = express.Router();

router.get("/", getBanners);
router.post("/", createBanner);
router.patch("/:id", updateBanner);
router.delete("/:id", deleteBanner);

module.exports = router;
