const mongoose = require("mongoose");
const Cart = require("../model/Cart");

class CartController {
  showByUserId = async (req, res) => {
    try {
      const userId = req.params.id;
      const carts = await Cart.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        { $match: { user: mongoose.Types.ObjectId(userId) } },
      ]);
      return res.status(200).json({ success: true, carts });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  };

  add = async (req, res) => {
    try {
      const { user, product, quantity } = req.body;
      const newCart = new Cart({ user, product, quantity });
      //checking if exist cart and plus quantity
      const isExist = await Cart.findOne({ user, product });
      if (isExist) {
        const oldQuantity = isExist.quantity;
        const newQuantity = oldQuantity + quantity;
        const UpdateCart = await Cart.findOneAndUpdate(
          { user, product },
          { quantity: newQuantity },
        ).then((result) => {
          result.quantity = newQuantity;
          return result;
        });

        return res.status(200).json({
          success: true,
          messages: "update success",
          carts: UpdateCart,
        });
      }

      const saveCart = await newCart.save({ user, product, quantity });

      return res.status(200).json({
        success: true,
        messages: "Add successfully",
        carts: saveCart,
      });
    } catch (error) {
      return res.status(500).json({ success: false, messages: error });
    }
  };

  delete = async (req, res) => {
    try {
      const { cartId } = req.body;
      const removeCart = await Cart.findByIdAndDelete(cartId);
      return res.status(200).json({
        success: true,
        messages: "delete success",
        cart: removeCart,
      });
    } catch (error) {
      return res.status(500).json({ success: false, messages: error });
    }
  };
}

module.exports = new CartController();
