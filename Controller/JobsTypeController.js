const JobType = require("../Models/jobTypeModel");

// create Job Category
module.exports.createJobType = async (req, res, next) => {
  try {
    const jobT = await JobType.create({
      jobTypeName: req.body.jobTypeName,
      user: req.user.id,
    });
    return res.status(201).json({
      status: 201,
      jobT,
    });
  } catch (error) {
    next(error);
    // Return error grda ni huxna
  }
};

// all Job Category
module.exports.allJobType = async (req, res, next) => {
  try {
    const jobT = await JobType.find();
    return res.status(200).json({
      status: 200,
      jobT,
    });
  } catch (error) {
    next(error);
    // Return error grda ni huxna
  }
};
