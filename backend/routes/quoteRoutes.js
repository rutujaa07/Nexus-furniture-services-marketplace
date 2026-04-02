const express = require("express");
const router = express.Router();
const {
  submitQuote,
  getQuotesForJob,
  acceptQuote,
} = require("../controllers/quoteController");
const { protect } = require("../middleware/authMiddleware");
const Quote = require("../models/Quote");

// IMPORTANT: /myquotes must come BEFORE /:jobId
router.get("/myquotes", protect, async (req, res) => {
  try {
    const quotes = await Quote.find({ contractor: req.user._id }).populate(
      "job",
      "title location status"
    );
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", protect, submitQuote);
router.get("/:jobId", protect, getQuotesForJob);
router.put("/:id/accept", protect, acceptQuote);

module.exports = router;
