const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllOpenJobs,
  getMyJobs,
  updateJobStatus,
} = require("../controllers/jobController");
const { protect, contractorOnly } = require("../middleware/authMiddleware");

router.post("/", protect, createJob);
router.get("/open", protect, contractorOnly, getAllOpenJobs);
router.get("/myjobs", protect, getMyJobs);
router.put("/:id/status", protect, updateJobStatus);
// Get jobs for contractor
router.get("/contractorjobs", protect, contractorOnly, async (req, res) => {
  try {
    const jobs = await require("../models/Job")
      .find({ acceptedContractor: req.user._id })
      .populate("customer", "name phone");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single job
router.get("/:id", protect, async (req, res) => {
  try {
    const job = await require("../models/Job")
      .findById(req.params.id)
      .populate("customer", "name phone")
      .populate(
        "acceptedContractor",
        "name businessName phone location rating"
      );
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
