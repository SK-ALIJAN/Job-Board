const express = require("express");
const app = express();
const cors = require("cors");
const { JobSeekerRoute } = require("./Routes/JobseekerRoute");
const { RecruiterRoute } = require("./Routes/Recruiter");
const { connection } = require("./Database");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/jobseeker", JobSeekerRoute);
app.use("/recruiter", RecruiterRoute);

app.listen(process.env.PORT, async () => {
  try {
    console.log(`server is runnning ${process.env.PORT}`);
    await connection;
    console.log("database connected successfully!");
  } catch (error) {
    console.log("something went wrong");
  }
});
