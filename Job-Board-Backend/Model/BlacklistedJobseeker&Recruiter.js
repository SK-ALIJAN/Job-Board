const mongoose = require("mongoose");

const blacklistedUserSchema = new mongoose.Schema({
  userId: String,
});

const BlacklistedUser = mongoose.model(
  "BlacklistedUser",
  blacklistedUserSchema
);

module.exports = {
  BlacklistedUser,
};
