const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // console.log("req.headers.authorization:", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    // console.log("token:", token);
    const decodedToken = jwt.verify(token, "tokenGenerated");
    req.user = { id: decodedToken.id };
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
