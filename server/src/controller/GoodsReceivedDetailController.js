const GoodsReceivedDetail = require("../model/GoodsReceivedDetail");

class GoodsReceivedDetailController {
  async add(req, res) {
    try {
      const data = req.body;
      const addGoodsReceivedDetail = new GoodsReceivedDetail(data);
      await addGoodsReceivedDetail.save();
      res.json({
        success: true,
        messages: "add successfully",
        GoodsReceivedDetail: addGoodsReceivedDetail,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new GoodsReceivedDetailController();
