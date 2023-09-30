const mongoose = require("mongoose");

// signup schema
const signupSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const JobSeekerSignupModel = mongoose.model("jobseeker", signupSchema);

module.exports = {
  JobSeekerSignupModel,
};
