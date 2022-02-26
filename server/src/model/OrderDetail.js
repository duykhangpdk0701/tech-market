const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetail = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "products",
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("OrderDetail", OrderDetail);
