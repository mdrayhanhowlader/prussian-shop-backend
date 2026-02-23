const Product = require("../models/product.model");

// CREATE
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL (with optional filter/search)
const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, isNewArrival, isOffer } = req.query;

    let filter = {};

    // Category filter
    if (category) filter.category = category;

    // New arrival filter
    if (isNewArrival !== undefined) filter.isNewArrival = isNewArrival === 'true';

    // Offer filter
    if (isOffer !== undefined) filter.isOffer = isOffer === 'true';

    // Price range filter
    if (minPrice || maxPrice) {
      filter.salePrice = {};
      if (minPrice) filter.salePrice.$gte = Number(minPrice);
      if (maxPrice) filter.salePrice.$lte = Number(maxPrice);
    }

    // Text search (name + description)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(filter);

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE (Smart Stock Logic)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // If colors updated
    if (updateData.colors && Array.isArray(updateData.colors)) {
      const total = updateData.colors.reduce(
        (sum, color) => sum + (color.stock || 0),
        0
      );

      updateData.totalStock = total;
      updateData.isOutOfStock = total === 0;
    }

    // If totalStock directly updated
    if (updateData.totalStock !== undefined) {
      updateData.isOutOfStock = updateData.totalStock === 0;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
