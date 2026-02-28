const express = require("express");
const { getAdminUsers, createAdminUser, deleteAdminUser, loginAdmin } = require("../controllers/adminUser.controller");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/", getAdminUsers);
router.post("/", createAdminUser);
router.delete("/:id", deleteAdminUser);

module.exports = router;