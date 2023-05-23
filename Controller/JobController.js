const Job = require("../Models/JobModel");
const JobType = require("../Models/jobTypeModel");

module.exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      user: req.user.id,
    });
    return res.status(201).json({
      status: 201,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// single job

module.exports.singleJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: 404,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      status: 200,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// update a job

// Controller: updateJob.js

module.exports.updateJob = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const { title, description, location, salary } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      job_id,
      { title, description, location, salary },
      { new: true }
    )
      .populate("jobType", "jobTypeName")
      .populate("user", "fullName");

    if (!updatedJob) {
      return res.status(404).json({
        status: 404,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      status: 200,
      job: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

// module.exports.showJob = async (req, res, next) => {
//   // enable search
//   const keyword = req.query.keyword
//     ? { title: { $regex: req.query.keyword, $options: "i" } }
//     : {};

//   // filter by category
//   const jobTypeId = req.query.cat ? req.query.cat : "";
//   const jobType = jobTypeId ? await JobType.findById(jobTypeId) : null;

//   // filter by location
//   const allLocations = await Job.distinct("location");
//   const searchLocation = req.query.location ? req.query.location : undefined;
//   const locationFilter = searchLocation ? searchLocation : allLocations;

//   // enable pagination
//   const pageSize = 5;
//   const page = Number(req.query.pageNumber) || 1;
//   const count = await Job.find({
//     ...keyword,
//     jobType: jobType ? jobType._id : { $exists: true },
//     location: { $in: locationFilter },
//   }).countDocuments();
//   try {
//     const jobs = await Job.find({
//       ...keyword,
//       jobType: jobType ? jobType._id : { $exists: true },
//       location: { $in: locationFilter },
//     })
//       .skip(pageSize * (page - 1))
//       .limit(pageSize);
//     return res.status(201).json({
//       status: 201,
//       jobs,
//       page,
//       pages: Math.ceil(count / pageSize),
//       count,
//       allLocations,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// ShowJob
module.exports.showJob = async (req, res, next) => {
  // Enable search
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // Filter by category
  const jobTypeCategory = await JobType.find({}, { _id: 1 });
  const category = req.query.category;
  const categ =
    category !== "" ? jobTypeCategory.map((cat) => cat._id) : undefined;

  // Job by location
  const jobByLocation = await Job.find(
    { ...keyword, jobType: categ },
    { location: 1 }
  );
  const locations = jobByLocation.map((val) => val.location);

  // Unique locations
  const uniqueLocations = [...new Set(locations)];
  const location = req.query.location;
  const locationFilter = location !== "" ? location : uniqueLocations;

  // Enable pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await Job.find({
      ...keyword,
      jobType: categ,
      location: locationFilter,
    }).countDocuments();

    const totalPages = Math.ceil(count / pageSize);
    const jobs = await Job.find({
      ...keyword,
      jobType: categ,
      location: { $in: uniqueLocations },
    })
      .sort({ createdAt: -1 })
      .populate("jobType", "jobTypeName")
      .populate("User", "fullName")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    return res.status(200).json({
      status: 200,
      jobs,
      page,
      totalPages,
      count,
      uniqueLocations,
    });
  } catch (error) {
    res.status(404).json({ error: "Job not found" });
    next(error);
  }
};

// Both code works maile grni tarika mah validate grna parni raixa

// module.exports.createJob = async (req, res, next) => {
//   const { title, description, salary, location, jobType } = req.body;
//   const user = req.user.id;
//   try {
//     const job = new Job({
//       title,
//       description,
//       salary,
//       location,
//       jobType,
//       user,
//     });

//     await job.validate(); // add this to manually validate the job object

//     await job.save();
//     return res.status(201).json({
//       status: 201,
//       job,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({
        status: 404,
        message: "Job Type not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Job Type deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Server Error",
    });
  }
};
