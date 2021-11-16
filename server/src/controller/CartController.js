const Cart = require("../model/Cart");

class CartController {
  showByUserId = async (req, res) => {
    try {
      const userId = req.params.id;
      const carts = await Cart.find({ user: userId });
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
        const UpdateCart = await Cart.findOneAndUpdate(
          { user, product },
          { quantity: oldQuantity + quantity },
        ).then((result) => result);

        return res.status(200).json({
          success: true,
          messages: "update success",
          cart: UpdateCart,
        });
      }

      await newCart.save({ user, product, quantity });

      return res.status(200).json({
        success: true,
        messages: "Add successfully",
        cart: newCart,
      });
    } catch (error) {
      return res.status(500).json({ success: false, messages: error });
    }
  };
}

module.exports = new CartController();
