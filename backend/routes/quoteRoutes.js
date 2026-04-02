const express = require("express");
const router = express.Router();
const {
  submitQuote,
  getQuotesForJob,
  acceptQuote,
} = require("../controllers/quoteController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, submitQuote);
router.get("/:jobId", protect, getQuotesForJob);
router.put("/:id/accept", protect, acceptQuote);

module.exports = router;
