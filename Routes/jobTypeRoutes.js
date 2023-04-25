const express = require("express");
const joi = require("joi");
const validation = require("express-joi-validation").createValidator({});
const JobsTypeController = require("../Controller/JobsTypeController");
const auth = require("../Middleware/check_auth");
const user = require("../Controller/user");
const router = express.Router();

const JobsTypeControllerSchema = joi.object({
  jobTypeName: joi.string().min(5).max(30).required(),
});
// Api for create JOb
router.post(
  "/api/type/create",
  auth,
  validation.body(JobsTypeControllerSchema),

  JobsTypeController.createJobType
);
// api for all Job
router.get("/api/jobs", auth, JobsTypeController.allJobType);
module.exports = router;
