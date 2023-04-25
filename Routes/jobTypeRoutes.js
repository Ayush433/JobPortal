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

router.post(
  "/type/create",
  validation.body(JobsTypeControllerSchema),
  JobsTypeController.createJobType
);

module.exports = router;
