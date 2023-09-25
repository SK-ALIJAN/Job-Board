const express = require("express");
const RecruiterRoute = express.Router();


// Recruiter signup
RecruiterRoute.post("/signup", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Recruiter signIN/Login
RecruiterRoute.post("/login", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.export = {
  RecruiterRoute,
};
