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
    return res.status(201).json({
      status: 201,
      job,
    });
  } catch (error) {
    next(error);
  }
};
// update a job

module.exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {
      new: true,
    })
      .populate("jobType", "jobTypeName")
      .populate("user", "fullName");

    if (!job) {
      return res.status(404).json({
        status: 404,
        message: "Job not found",
      });
    }

    return res.status(201).json({
      status: 201,
      job,
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
  //enable Search
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  // filter by Category

  let ids = [];
  const jobTypeCategory = await JobType.find({}, { _id: 1 });
  jobTypeCategory.forEach((cat) => {
    ids.push(cat._id);
  });

  let category = req.query.category;
  let categ = category !== "" ? ids : undefined;

  // Job By Location
  let locations = [];
  const jobByLocation = await Job.find(
    { ...keyword, jobType: categ },
    { location: 1 }
  );
  jobByLocation.forEach((val) => {
    locations.push(val.location);
  });

  // Unique Location
  let setUniqueLocation = [...new Set(locations)];
  let location = req.query.location;
  let locationFilter = location !== "" ? location : setUniqueLocation;

  //enable pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  //   const count = await Job.find({}).estimatedDocumentCount();
  const count = await Job.find({
    ...keyword,
    jobType: categ,
    location: locationFilter,
  }).countDocuments();
  try {
    const jobs = await Job.find({
      ...keyword,
      jobType: categ,
      location: { $in: setUniqueLocation },
    })
      .sort({ createdAt: -1 })
      .populate("jobType", "jobTypeName")
      .populate("User", "fullName")

      .skip(pageSize * (page - 1))
      .limit(pageSize);
    return res.status(201).json({
      status: 201,
      jobs,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      setUniqueLocation,
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
