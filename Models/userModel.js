const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
); // date and updated date

module.exports = mongoose.model("User", userSchema);
