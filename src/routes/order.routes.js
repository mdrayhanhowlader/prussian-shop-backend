const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.patch("/:id", orderController.updateOrderStatus);
router.get("/track", orderController.trackOrdersByPhone);

module.exports = router;
