const { JWT_SECRET_KEY } = require("./env");
const jwt = require("jsonwebtoken");

const generateToken = payload => {
  return jwt.sign(payload, JWT_SECRET_KEY);
};

module.exports = { generateToken };
