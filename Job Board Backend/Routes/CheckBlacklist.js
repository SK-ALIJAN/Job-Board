const BlacklistedUser = require("../Model/BlacklistedJobseeker&Recruiter");

async function checkBlacklist(req, res, next) {
  const userId = req.user.id;
  const isBlacklisted = await BlacklistedUser.exists({ userId });

  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "User is blacklisted. Please log in again." });
  }
  next();
}

module.exports = {
  checkBlacklist,
};
