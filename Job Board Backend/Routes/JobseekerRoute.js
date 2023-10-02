const express = require("express");
const JobSeekerRoute = express.Router();
const { JobSeekerSignupModel } = require("../Model/JobSeekerModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { MailSenderFunction } = require("../NodeMailer");
const BlacklistedUser = require("../Model/BlacklistedJobseeker&Recruiter");

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
      var token = jwt.sign(
        { userId: newData[userId], _id: newData[_id] },
        "JobSeekerToken"
      );
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
          var token = jwt.sign(
            { userId: jobseeker[userId], _id: jobseeker[_id] },
            "JobSeekerToken"
          );
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

// forgot email
JobSeekerRoute.post("/forgotemail", async (req, res) => {
  let { username } = req.body;
  try {
    let userData = await JobSeekerSignupModel.findOne({ username });

    if (condition) {
      let configrationMesssage = {
        mailSubject: "Recover Email",
        mailContent: `Thank You ! ${userData.name} for email recovering , your email id is :  ${userData.email}`,
        Headline: "Recover Email",
      };

      MailSenderFunction(
        userData.email,
        configrationMesssage.mailSubject,
        configrationMesssage.mailContent,
        configrationMesssage.Headline
      )
        .then((info) => {
          res.status(200).json({ message: "please check Your email" });
        })
        .catch((error) => {
          res.status(200).json({ error: error.message });
        });
    } else {
      res.status(200).json({ message: "wrong username" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// reset password
JobSeekerRoute.post("/resetpassword", async (req, res) => {
  let { email, password, confirmpassword } = req.body;
  try {
    if (password !== confirmpassword) {
      res.status(200).json({ message: "password are not matched" });
    } else {
      let userData = await JobSeekerSignupModel.findOne({ email });
      if (userData) {
        await JobSeekerSignupModel.updateOne(
          { _id: userData[_id] },
          { $set: { password } }
        );
        res.status(200).json({ message: "password change successfully" });
      } else {
        res.status(200).json({ message: "Check email,user not found" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// log out functionality
JobSeekerRoute.get("/logout", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      jwt.verify(token, "JobSeekerToken", async (err, decode) => {
        if (err) {
          res.status(200).json({ message: err });
        } else {
          let { userId } = decode;
          let user = new BlacklistedUser({ userId });
          await user.save();
          res.status(200).json({ message: "succesffuly logged out" });
        }
      });
    } else {
      res.status(200).json({ message: "please Provided token " });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  JobSeekerRoute,
};
