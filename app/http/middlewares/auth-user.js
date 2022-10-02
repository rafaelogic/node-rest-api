const User = require("../../models/user");

module.exports = (req, res, next) => {
  if (req.user) {
    const user = User.find({ _id: req.user._id });

    if (user) {
      next();
    } else {
      return res.status(400).json({
        message: "Access Denied. User not found.",
      });
    }
  } else {
    return res.status(400).json({ message: "Access denied." });
  }
}
