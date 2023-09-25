require("dotenv").config();
const express = require("express");
const App = express();
const cors = require("cors");
const { JobSeeker } = require("./Routes/JobseekerRoute");
const { Recruiter } = require("./Routes/Recruiter");

App.use(express.json());
App.use(cors());
App.use("/jobseek", JobSeeker);
App.use("/recruiter", Recruiter);

App.listen(process.env.port, () => {
  console.log(`server is running at ${process.env.port} port`);
});
