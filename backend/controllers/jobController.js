const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const { title, description, serviceType, location, budget } = req.body;
    const job = await Job.create({
      customer: req.user._id,
      title,
      description,
      serviceType,
      location,
      budget,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOpenJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" }).populate(
      "customer",
      "name phone"
    );
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ customer: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    job.status = req.body.status;
    if (req.body.assignedWorker) job.assignedWorker = req.body.assignedWorker;
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJob, getAllOpenJobs, getMyJobs, updateJobStatus };
