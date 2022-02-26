const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    street: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },
  },
  { timestamp: true },
);

module.exports = mongoose.model("Address", AddressSchema);
