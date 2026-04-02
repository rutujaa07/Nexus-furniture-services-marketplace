const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Get all contractors
router.get("/contractors", protect, adminOnly, async (req, res) => {
  try {
    const contractors = await User.find({ role: "contractor" });
    res.json(contractors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve contractor
router.put("/approve/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: "Contractor approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
