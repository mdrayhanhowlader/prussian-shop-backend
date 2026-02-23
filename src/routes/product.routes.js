const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
  } = require("../controllers/product.controller");



router.post("/", createProduct);
router.get("/", getProducts);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

