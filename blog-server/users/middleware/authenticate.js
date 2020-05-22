const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../controller/utils/env");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  if (decoded) {
    req.id = decoded;
    next();
  } else {
    res.json({
      success: false,
      message: "token not provided"
    });
  }
};

module.exports = { authenticate };
