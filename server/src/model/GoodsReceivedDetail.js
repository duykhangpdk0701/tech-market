const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoodsReceivedDetail = new Schema(
  {
    goodsreceived: {
      type: Schema.Types.ObjectId,
      ref: "goodsreceiveds",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("GoodsReceivedDetail", GoodsReceivedDetail);
