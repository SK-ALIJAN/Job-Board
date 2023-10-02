const mongoose = require("mongoose");

// signup schema
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

module.exports = {
  RecruiterSignupModel,
};
