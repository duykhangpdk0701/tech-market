const Address = require("../model/Address");

class AddressController {
  showByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const findAddress = await Address.find({ userId });
      res.json({ success: true, address: findAddress });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  };

  add = async (req, res) => {
    try {
      const { userId, street, district, province } = req.body;
      const newAddress = new Address({ userId, street, district, province });
      await newAddress.save();
      res.json({
        success: true,
        messages: "Add successfully",
        address: newAddress,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  };

  remove = async (req, res) => {
    try {
      const { id } = req.body;
      const removeAddress = await Address.findByIdAndDelete(id);
      res.json({
        success: true,
        messages: "Add successfully",
        address: removeAddress,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  };

  update = async (req, res) => {
    try {
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  };
}

module.exports = new AddressController();
