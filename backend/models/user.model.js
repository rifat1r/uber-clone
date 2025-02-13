const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [20, "First name must be at most 20 characters long"],
    },
    lastname: {
      type: String,
      trim: true,
      minlength: [3, "last name must be at least 3 characters long"],
      maxlength: [20, "last name must be at most 20 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [6, "Email must be at least 6 characters long"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 12);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
