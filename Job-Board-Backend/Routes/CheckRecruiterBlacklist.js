const {BlacklistedUser} = require("../Model/BlacklistedJobseeker&Recruiter");
var jwt = require("jsonwebtoken");

async function checkBlacklist(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "RecruiterToken", async (err, decode) => {
    if (err) {
      res.status(200). json({ message: err });
    } else {
      const { userId ,_id} = decode;
      const isBlacklisted = await BlacklistedUser.findOne({_id });

      if (!isBlacklisted) {
        return res.status(401).json({ message: "User is blacklisted. Please log in again." });
      } else {
        req.body.userId = _id;
        next();
      }
    }
  });
}

module.exports = {
  checkBlacklist,
};
