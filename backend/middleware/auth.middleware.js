const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const backListTokenModel = require("../models/blackListToken.model");
const blackListTokenModel = require("../models/blackListToken.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const isBlackListed = await blackListTokenModel.findOne({ token: token });
  console.log(isBlackListed);
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
