const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 70,
    },
    description: {
      type: String,
      required: true,
      maxlength: 10000,
    },
    salary: {
      type: String,
      required: true,
      maxlength: 70,
    },
    location: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    jobType: {
      type: ObjectId,
      ref: "JobType",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
); // date and updated date

module.exports = mongoose.model("Job", jobSchema);
