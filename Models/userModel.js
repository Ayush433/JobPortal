const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const { ObjectId } = mongoose.Schema;

const jobHistorySchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 70,
    },
    description: {
      type: String,
    },
    salary: {
      type: String,
    },
    location: {
      type: String,
    },
    interviewDate: {
      type: Date,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "accepted", "deleted"],
      default: "pending",
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobHistory", jobHistorySchema);

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 0,
    },
    confirmPassword: {
      type: String,
      required: false,
    },
    role: {
      type: Number,
      default: 0,
    },
    jobHistory: [jobHistorySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
