const express = require("express");
const JobSeekerRoute = express.Router();
const { JobSeekerSignupModel } = require("../Model/JobSeekerModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

//Signup Router
JobSeekerRoute.post("/signup", (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // here i am hashing the password
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.status(400).json({ err: err.message });
      }
      let newData = new JobSeekerSignupModel({ name, email, password: hash });
      await newData.save();
      var token = jwt.sign({ foo: "bar" }, "JobSeekerToken");
      res.json({ message: "seccessfully created", data: newData, token });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Login Router
JobSeekerRoute.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let jobseeker = await JobSeekerSignupModel.findOne({ email });

    if (jobseeker) {
      // comparing hash password
      bcrypt.compare(password, jobseeker.password, function (err, result) {
        if (result) {
          var token = jwt.sign({ foo: "bar" }, "JobSeekerToken");
          res.json({
            message: "Successfully Logged In",
            token,
          });
        } else {
          res.status(400).json({ message: "Password Not Matched" });
        }
      });
    } else {
      res.status(200).json({ message: "User Not Found", data: [] });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  JobSeekerRoute,
};
