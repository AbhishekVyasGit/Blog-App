require("dotenv").config();
const mongoose = require("mongoose");

const connect = () => {
  console.log("MongoDB Connected");
  return mongoose.connect(process.env.MONGO_URL);
};

module.exports = connect;