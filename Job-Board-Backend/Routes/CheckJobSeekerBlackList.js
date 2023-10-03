const BlacklistedUser = require("../Model/BlacklistedJobseeker&Recruiter");
var jwt = require("jsonwebtoken");

async function checkJobSeekerBlacklist(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "JobSeekerToken", async (err, decode) => {
    if (err) {
      res.status(200).json({ message: err });
    } else {
      const {userId, _id } = decode;
      const isBlacklisted = await BlacklistedUser.find({ _Id });

      if (!isBlacklisted) {
        return res
          .status(401)
          .json({ message: "User is blacklisted. Please log in again." });
      } else {
        req.body.userId = _id;
        next();
      }
    }
  });
}

module.exports = {
  checkJobSeekerBlacklist,
};
