const express = require("express");
const RecruiterRoute = express.Router();
const {
  RecruiterSignupModel,
  RecruiterJobPostModel,
} = require("../Model/RecruiterModel");
const { MailSenderFunction } = require("../NodeMailer");
const { BlacklistedUser } = require("../Model/BlacklistedJobseeker&Recruiter");
const { checkBlacklist } = require("./CheckRecruiterBlacklist");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

/////////////////   Signup Router  /////////////////////
RecruiterRoute.post("/signup", async (req, res, next) => {
  const { password, email } = req.body;

  try {
    let data = await RecruiterSignupModel({ email });

    if (data) {
      res.status(200).json({ message: "already registered!" });
    } else {
      /////////////  here i am hashing the password   ///////////////
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          res.status(400).json({ err: err.message });
        }
        let newData = new RecruiterSignupModel({ ...req.body, password: hash });
        await newData.save();
        var token = jwt.sign(
          { userId: newData.id, _id: newData.id },
          "RecruiterToken"
        );
        res.json({ message: "seccessfully created", data: newData, token });
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/////////////////  Login Router  ////////////////////
RecruiterRoute.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let recruiter = await RecruiterSignupModel.findOne({ email });

    if (recruiter) {
      ///////////  comparing hash password  ////////
      bcrypt.compare(password, recruiter.password, function (err, result) {
        if (result) {
          var token = jwt.sign(
            { userId: recruiter._id, _id: recruiter._id },
            "RecruiterToken"
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

///////////////////   forgot email  //////////////////////
RecruiterRoute.post("/forgotemail", async (req, res) => {
  let { username } = req.body;
  try {
    let userData = await RecruiterSignupModel.findOne({ username });

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

//////////////  reset password  ///////////////////
RecruiterRoute.post("/resetpassword", async (req, res) => {
  let { email, newpassword, confirmpassword } = req.body;
  try {
    if (newpassword !== confirmpassword) {
      res.status(200).json({ message: "password are not matched" });
    } else {
      let userData = await RecruiterSignupModel.findOne({ email });
      if (userData) {
        bcrypt.hash(newpassword, 5, async function (err, hash) {
          await RecruiterSignupModel.updateOne(
            { _id: userData._id },
            { $set: { password: hash } }
          );
        });

        res.status(200).json({ message: "password change successfully" });
      } else {
        res.status(200).json({ message: "Check email,user not found" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/////////////   log out functionality   ////////////////
RecruiterRoute.get("/logout", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      jwt.verify(token, "RecruiterToken", async (err, decode) => {
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

//////////////  Job Posting  //////////////
RecruiterRoute.post("/jobpost", checkBlacklist, async (req, res) => {
  try {
    const postjob = new RecruiterJobPostModel(req.body);
    await postjob.save();
    res.status(200).send({ message: "successfully posted", data: postjob });
  } catch (error) {
    res.status(400).json({ error: message });
  }
});

//////////////  Job Update  //////////////
RecruiterRoute.patch("/jobpost/:id", checkBlacklist, async (req, res) => {
  let { id } = req.params;
  try {
    await RecruiterJobPostModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    res.json({ message: "successfully update" });
  } catch (error) {
    res.status(400).json({ error: message });
  }
});

//////////////  Job Get  //////////////
RecruiterRoute.get("/jobpost", checkBlacklist, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      jwt.verify(token, "RecruiterToken", async (err, decode) => {
        let { userId } = decode;
        let data = await RecruiterJobPostModel.find({ userId });
        res.json({ data });
      });
    } else {
      res.status(400).json({ message: "token not valid" });
    }
  } catch (error) {
    res.status(400).json({ error: message });
  }
});

//////////////  Job Get  //////////////
RecruiterRoute.get("/jobpost/:id", checkBlacklist, async (req, res) => {
  let { id } = req.params;

  try {
    let data = await RecruiterJobPostModel.find({ _id: id });
    res.json({ data });
  } catch (error) {
    res.status(400).json({ error: message });
  }
});

//////////////  Job Delete  //////////////
RecruiterRoute.delete("/jobpost/:id", checkBlacklist, async (req, res) => {
  let { id } = req.params;

  try {
    await RecruiterJobPostModel.deleteOne({ _id: id });
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: message });
  }
});

module.exports = {
  RecruiterRoute,
};
