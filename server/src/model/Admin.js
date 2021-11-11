const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      unique: true,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamp: true },
);

module.exports = mongoose.model("Admin", AdminSchema);
