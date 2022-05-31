const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
  },
  purchased: {
    type: [String],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
