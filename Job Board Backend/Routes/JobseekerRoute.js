const express = require("express");
const JobSeekerRoute = express.Router();

// Job Seeker signup
JobSeekerRoute.post("/signup", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Job Seeker signIN/Login
JobSeekerRoute.post("/login", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.export = {
  JobSeekerRoute,
};
