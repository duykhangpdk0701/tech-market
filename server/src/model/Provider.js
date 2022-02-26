const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Provider = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model("provider", Provider);
