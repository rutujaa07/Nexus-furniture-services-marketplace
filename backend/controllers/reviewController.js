const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const { jobId, contractorId, rating, comment } = req.body;
    const review = await Review.create({
      job: jobId,
      customer: req.user._id,
      contractor: contractorId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContractorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      contractor: req.params.contractorId,
    }).populate("customer", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getContractorReviews };
