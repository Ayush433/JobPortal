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

//Update JobType
module.exports.updateJobType = async (req, res, next) => {
  try {
    const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body, {
      new: true,
    });
    return res.status(200).json({
      status: 200,
      jobT,
    });
  } catch (error) {
    next(error);
    // Return error grda ni huxna
  }
};

module.exports.deleteJobType = async (req, res) => {
  try {
    const jobT = await JobType.findByIdAndDelete(req.params.type_id);
    return res.status(200).json({
      status: 200,
      message: "Job Type Deleted",
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: "Server Error",
    });

    // Return error grda ni huxna
  }
};
