const jwt = require("jsonwebtoken");

const getSignedToken = function (id) {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "24hr" });
};

module.exports = getSignedToken;
