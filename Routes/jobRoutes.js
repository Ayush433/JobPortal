const express = require("express");
const joi = require("joi");
const validation = require("express-joi-validation").createValidator({});

const auth = require("../Middleware/check_auth");
const user = require("../Controller/user");
const router = express.Router();
const JobController = require("../Controller/JobController");

const jobSchema = joi.object({
  title: joi.string().min(2).max(20),
  description: joi.string().required(),
  salary: joi.string().required(),
  location: joi.string().optional(),
  jobType: joi.string().required(),
});
// Api for create JOb
router.post(
  "/api/create",
  auth,
  validation.body(jobSchema),
  JobController.createJob
);
module.exports = router;
