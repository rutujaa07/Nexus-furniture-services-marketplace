const express = require("express");
const router = express.Router();
const {
  createReview,
  getContractorReviews,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createReview);
router.get("/:contractorId", getContractorReviews);

module.exports = router;
