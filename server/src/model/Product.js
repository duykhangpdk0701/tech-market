const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
    },
    images: { type: [String] },
    description: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", Product);
