const express = require("express");
const RecruiterRoute = express.Router();
const { RecruiterSignupModel } = require("../Model/RecruiterModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

//Signup Router
RecruiterRoute.post("/signup", (req, res, next) => {
  const { password } = req.body;

  try {
    // here i am hashing the password
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.status(400).json({ err: err.message });
      }
      let newData = new RecruiterSignupModel({ ...req.body, password: hash });
      await newData.save();
      var token = jwt.sign({ foo: "bar" }, "RecruiterToken");
      res.json({ message: "seccessfully created", data: newData, token });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Login Router
RecruiterRoute.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let recruiter = await RecruiterSignupModel.findOne({ email });

    if (recruiter) {
      // comparing hash password
      bcrypt.compare(password, recruiter.password, function (err, result) {
        if (result) {
          var token = jwt.sign({ foo: "bar" }, "RecruiterToken");
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
  RecruiterRoute,
};
