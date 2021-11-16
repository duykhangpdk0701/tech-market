const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItem = new Schema(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "carts",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CartItem", CartItem);
