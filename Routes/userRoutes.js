const express = require("express");
const joi = require("joi");
const router = express.Router();
const validation = require("express-joi-validation").createValidator({});
const userController = require("../Controller/userController");
const { createValidator } = require("express-joi-validation");
const auth = require("../Middleware/check_auth");
const user = require("../Controller/user");

const SignUpSchema = joi.object({
  fullName: joi.string().min(5).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().required().max(20),
  role: joi.number().optional(),
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

router.get("/api/allUsers", auth, auth.isAdmin, user.allUsers);

router.get("/api/user/:id", user.singleUser);

router.put("/api/user/edit/:id", user.editUser);

router.delete(
  "/api/user/admin/delete/:id",
  auth,
  auth.isAdmin,
  user.deleteUser
);

// api for JobHistory
router.post("/api/user/jobHistory", auth, user.JobHistory);

module.exports = router;
