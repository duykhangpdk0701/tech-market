const mongoose = require("mongoose");
const Product = require("../model/Product");

class CartController {
  show = async (req, res) => {
    try {
      const { productIds } = req.body;
      const carts = await Product.find().where("_id").in(productIds).exec();
      return res.status(200).json({ success: true, carts });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  };
}

module.exports = new CartController();
