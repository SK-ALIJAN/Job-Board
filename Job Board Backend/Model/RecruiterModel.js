const mongoose = require("mongoose");

////////////   signup Schema   /////////////////
const signupSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  company: { type: String },
  username: { type: String },
  designation: { type: String },
  city: { type: String },
});

const RecruiterSignupModel = mongoose.model("recruiter", signupSchema);


//////////   job Posting Schema  //////////////
const recruiterJobPostSchema = mongoose.Schema({
  role: String,
  company: String,
  location: String,
  noticePeriod: String,
  deadline: String,
  package: String,
  experience: String,
  opening: Number,
  aboutCompany: String,
  logo: String,
  skills: Array,
  userId: String,
  applicants: Array,
});

const RecruiterJobPostModel = mongoose.model("jobpost", recruiterJobPostSchema);

module.exports = {
  RecruiterSignupModel,
  RecruiterJobPostModel,
};
