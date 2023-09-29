require("dotenv").config();
const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.database);

module.exports = {
  connection,
};
