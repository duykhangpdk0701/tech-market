const GoodsReceived = require("../model/GoodsReceived");

class GoodsReceivedController {
  async add(req, res) {
    try {
      const data = req.body;
      const addGoodsReceived = new GoodsReceived(data);
      await addGoodsReceived.save();
      res.json({
        success: true,
        messages: "add successfully",
        GoodsReceived: addGoodsReceived,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const findGoodsReceived = await GoodsReceived.aggregate([
        {
          $lookup: {
            from: "admins",
            localField: "admin",
            foreignField: "_id",
            as: "admin",
          },
        },
        { $unwind: "$admin" },
        {
          $lookup: {
            from: "providers",
            localField: "provider",
            foreignField: "_id",
            as: "provider",
          },
        },
        { $unwind: "$provider" },
      ]);
      res.json({
        success: true,
        messages: "add successfully",
        GoodsReceived: findGoodsReceived,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new GoodsReceivedController();
