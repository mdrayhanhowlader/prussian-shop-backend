const Order = require("../models/order.model");
const Product = require("../models/product.model");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      customerName,
      phone,
      email,
      district,
      location,
      thana,
      detailedAddress,
      settlementMethod,
      notes,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (!customerName || !phone) {
      return res.status(400).json({ message: "Customer info missing" });
    }

    let subtotal = 0;

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      if (product.totalStock < item.quantity)
        return res.status(400).json({ message: `${product.name} out of stock` });

      subtotal += (product.salePrice || product.price) * item.quantity;

      product.totalStock -= item.quantity;
      product.isOutOfStock = product.totalStock === 0;
      await product.save();
    }

    const shipping = district === "Dhaka" ? 80 : 140;
    const totalAmount = subtotal + shipping;

    const order = await Order.create({
      items,
      customerName,
      phone,
      email,
      district,
      location,
      thana,
      detailedAddress,
      settlementMethod,
      notes,
      subtotal,
      shipping,
      totalAmount,
      status: "PENDING",
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate("items.product");
  res.json(orders);
};

// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (status === "CANCELLED") {
      for (let item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.totalStock += item.quantity;
          product.isOutOfStock = false;
          await product.save();
        }
      }
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TRACK ORDERS BY PHONE
exports.trackOrdersByPhone = async (req, res) => {
  try {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    const orders = await Order.find({ phone }).populate("items.product");
    if (!orders || orders.length === 0)
      return res.status(404).json({ message: "No orders found for this phone number" });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
