const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("connected to DB"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
