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

// module.exports.deleteUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     console.log(user);
//     if (!user) {
//       return res.status(404).json({
//         status: 404,
//         message: "User not found",
//       });
//     }
//     if (req.user.role === 0) {
//       if (user._id.toString() !== req.user.id) {
//         return res.status(403).json({
//           status: 403,
//           message: "Access denied. You can only delete your own account",
//         });
//       } else {
//         await user.remove();
//         return res.status(200).json({
//           status: 200,
//           message: "User deleted",
//         });
//       }
//     } else if (req.user.role === 1) {
//       if (user.role === 1) {
//         await user.remove();
//         return res.status(200).json({
//           status: 200,
//           message: "User deleted",
//         });
//       } else {
//         return res.status(403).json({
//           status: 403,
//           message: "Access denied. You must be an admin to delete other users",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       status: 400,
//       message: error.message,
//     });
//   }
// };

module.exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "user deleted",
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// module.exports.JobHistory = async (req, res, next) => {
//   const { title, description, salary, location, email } = req.body;
//   try {
//     const currentUser = await User.findOne({ email: email });
//     console.log(currentUser);
//     // console.log(user);
//     if (!currentUser) {
//       return res.status(404).json({
//         status: 404,
//         message: "User not found",
//       });
//     } else {
//       const addJobHistory = {
//         title,
//         description,
//         salary,
//         location,
//         user: req.user._id,
//       };
//       currentUser.JobHistory.push(addJobHistory);
//       await currentUser.save();
//     }
//     res.status(201).json({
//       status: 201,
//       currentUser,
//     });
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       status: 400,
//       message: error.message,
//     });
//   }
// };

module.exports.JobHistory = async (req, res, next) => {
  const { title, description, salary, location, contact } = req.body;
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    } else {
      const addJobHistory = {
        title,
        description,
        salary,
        location,
        contact,
        user: req.user.id,
      };
      currentUser.jobHistory.push(addJobHistory);
      await currentUser.save();
      res.status(201).json({
        status: 201,
        currentUser,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
module.exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userProfile = {
      fullName: user.fullName,
      email: user.email,
    };
    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
