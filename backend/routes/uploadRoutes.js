const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");
const { protect, contractorOnly } = require("../middleware/authMiddleware");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "nexus-portfolio",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// Upload portfolio photo
router.post(
  "/portfolio",
  protect,
  contractorOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      const imageUrl = req.file.path;
      await User.findByIdAndUpdate(req.user._id, {
        $push: { portfolio: imageUrl },
      });
      res.json({ url: imageUrl });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete portfolio photo
router.delete("/portfolio", protect, contractorOnly, async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { portfolio: url },
    });
    res.json({ message: "Photo removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all portfolio photos for landing page
router.get("/showcase", async (req, res) => {
  try {
    const contractors = await User.find({
      role: "contractor",
      isApproved: true,
      portfolio: { $exists: true, $not: { $size: 0 } },
    }).select("name businessName portfolio location servicesOffered");

    const showcase = [];
    contractors.forEach((c) => {
      c.portfolio.forEach((photo) => {
        showcase.push({
          url: photo,
          contractorName: c.businessName || c.name,
          location: c.location,
        });
      });
    });

    // Shuffle and return max 12
    const shuffled = showcase.sort(() => 0.5 - Math.random()).slice(0, 12);
    res.json(shuffled);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
