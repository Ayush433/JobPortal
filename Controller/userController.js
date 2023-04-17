const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    const isExistUser = await User.findOne({ email: email });
    if (isExistUser) {
      return res.status(400).json({
        status: 400,
        message: "User Already Exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      fullName,

      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      status: 201,
      message: "User Successfully Registered",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: "Incorrect",
    });
  }
};

module.exports.Login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const isExistUser = await User.findOne({ email: email });
    if (isExistUser) {
      const isValidPassword = await bcrypt.compareSync(
        password,
        isExistUser.password
      );
      if (isValidPassword) {
        const token = jwt.sign({ id: isExistUser._id }, "tokenGenerated");
        return res.status(200).json({
          status: 200,
          data: {
            id: isExistUser._id,
            fullName: isExistUser.fullName,
            email: isExistUser.email,
            token,
          },
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Password Incorrect Please Check Again",
        });
      }
    } else {
      return res.status(401).json({
        status: 400,
        message: " User Not Found Please Login as soon as Possible",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: "Not Found",
    });
  }
};
