const express = require("express");
const joi = require("joi");
const router = express.Router();
const validation = require("express-joi-validation").createValidator({});
const userController = require("../Controller/userController");
const { createValidator } = require("express-joi-validation");
const auth = require("../Middleware/check_auth");

const SignUpSchema = joi.object({
  fullName: joi.string().min(5).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().required().max(20),
});
const LoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
router.post(
  "/api/userSignup",
  validation.body(SignUpSchema),
  userController.signUp
);
router.post(
  "/api/userLogin",
  validation.body(LoginSchema),
  userController.Login
);
router.get("/api/Profile", auth, userController.userProfile);
module.exports = router;
