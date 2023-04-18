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

// const jwt = require("jsonwebtoken");

// const checkAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     console.log("Token:", token);
//     if (token) {
//       const decoded = jwt.verify(token, "tokenGenerated");
//       console.log("Decoded:", decode);
//       req.user = decoded;
//       next();
//     } else {
//       return res.status(401).json({
//         status: 401,
//         message: "You are not authorized",
//       });
//     }
//   } catch (err) {
//     return res.status(401).json({
//       status: 401,
//       message: "You are not authorized",
//     });
//   }
// };
// module.exports = checkAuth;
