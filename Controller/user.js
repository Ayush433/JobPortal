const express = require("express");
const User = require("../Models/userModel");

// load all users

exports.allUsers = async (req, res, next) => {
  //enable pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();
  try {
    const users = await User.find()
      .sort({ CreatedAt: -1 })
      .select("-password")
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    return res.status(200).json({
      status: 200,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    return next(error);
  }
}; // show single user

module.exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

// edit user

module.exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    if (req.user.role === 0 && user.role !== 0) {
      return res.status(403).json({
        status: 403,
        message: "Access denied. You must be an admin to delete users",
      });
    }
    if (req.user.role === 1 && req.user.id !== user.id) {
      return res.status(403).json({
        status: 403,
        message: "Access denied. You can only delete your own account",
      });
    }
    await user.remove();
    return res.status(200).json({
      status: 200,
      message: "User deleted",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};