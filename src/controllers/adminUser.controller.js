const AdminUser = require("../models/adminUser.model");

const getAdminUsers = async (req, res) => {
  const users = await AdminUser.find().select("-password");
  res.json(users);
};

const createAdminUser = async (req, res) => {
  try {
    const user = await AdminUser.create(req.body);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAdminUser = async (req, res) => {
  await AdminUser.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const user = await AdminUser.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const valid = await user.comparePassword(password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ success: true, name: user.name, email: user.email });
};

module.exports = { getAdminUsers, createAdminUser, deleteAdminUser, loginAdmin };