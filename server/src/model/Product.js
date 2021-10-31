const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'categories',
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'brands',
        },
        description: { type: String },
        quantity: { type: Number },
        price: { type: Number }
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Product', Product)
