const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    serviceType: {
      type: String,
      enum: ["assembly", "delivery", "repair", "custom"],
      required: true,
    },
    location: { type: String, required: true },
    photos: [{ type: String }],
    budget: { type: Number },
    status: {
      type: String,
      enum: [
        "open",
        "quoted",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "open",
    },
    acceptedContractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    assignedWorker: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
