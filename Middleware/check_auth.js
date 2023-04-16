const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decode = jwt.decode(token, "tokenGenerate");
      if (decode) {
        req.userId = decode.id;
        next();
      } else {
        return res.status(401).json({
          status: 401,
          message: "You are not authorized",
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: "You are not authorized",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: "You are not authorized",
    });
  }
};
