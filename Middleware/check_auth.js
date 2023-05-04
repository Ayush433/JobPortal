const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Authorization header missing");
    }
    const decodedToken = jwt.verify(token.split(" ")[1], "tokenGenerated");
    console.log(decodedToken);
    req.user = {
      id: decodedToken.id,
      role: decodedToken.role,
    };
    // console.log("req.user:", req.user);
    next();
  } catch (err) {
    console.log("err:", err);
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};

module.exports = auth;

// For admin
module.exports.isAdmin = async (req, res, next) => {
  if (req.user.role === 0) {
    return res.status(400).json({
      status: 400,
      message: "Access Denied You Must be an Admin",
    });
  }
  next();
};
