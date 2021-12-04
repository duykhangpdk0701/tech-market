const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    orderDetail: {
      type: [Schema.Types.ObjectId],
      ref: "orderdetails",
    },
    address: {
      type: Object,
      require: true,
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    totalPrice: { type: Number },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", Order);
