const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const jobTypeSchema = new Schema(
  {
    jobTypeName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 70,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
); // date and updated date

module.exports = mongoose.model("JobType", jobTypeSchema);
