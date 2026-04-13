const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["customer", "contractor", "admin"],
      default: "customer",
    },
    portfolio: [{ type: String }],
    profilePic: { type: String },
    // Only for contractors
    businessName: { type: String },
    servicesOffered: [{ type: String }],
    location: { type: String },
    rating: { type: Number, default: 0 },
    totalJobsDone: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
