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

module.exports = router;
