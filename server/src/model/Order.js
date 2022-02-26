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
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: { type: Number, required: true },
    status: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", Order);
