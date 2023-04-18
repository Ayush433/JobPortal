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
