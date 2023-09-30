const mongoose = require("mongoose");

// signup schema
const signupSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
  username: { type: String, required: true },
  designation: { type: String },
  city: { type: String },
});

const RecruiterSignupModel = mongoose.model("recruiter", signupSchema);

module.exports = {
  RecruiterSignupModel,
};
