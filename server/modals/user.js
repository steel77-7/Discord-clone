const mongoose = require("mongoose");

const userSchma = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const User = mongoose.model("user", userSchma);

module.exports = User;
