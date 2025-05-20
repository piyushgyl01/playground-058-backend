const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pg58User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  preferredJobType: {
    type: String,
    enum: ["remote", "onsite", "any"],
    default: "any",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("pg58Profile", ProfileSchema);
