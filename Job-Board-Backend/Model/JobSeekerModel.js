const mongoose = require("mongoose");

////////////  signup schema  /////////////
const signupSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
});

const JobSeekerSignupModel = mongoose.model("jobseeker", signupSchema);

////////////  Job Applied schema  /////////////
const jobAppliedSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
});

const JobAppliedModel = mongoose.model("jobapplied", jobAppliedSchema);

module.exports = {
  JobSeekerSignupModel,
};
