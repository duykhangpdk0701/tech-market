const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoodsReceived = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "admins",
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "provider",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("GoodsReceived", GoodsReceived);
