const mongoose = require("mongoose");

const TestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamp: true },
);

module.exports = mongoose.model("Test", TestSchema);
