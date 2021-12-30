const mongoose = require("mongoose");
const GoodsReceived = require("../model/GoodsReceived");
const GoodsReceivedDetail = require("../model/GoodsReceivedDetail");
const Product = require("../model/Product");

class GoodsReceivedController {
  async addAmount(productId, quantity) {
    await Product.findByIdAndUpdate(productId, {
      $inc: {
        quantity,
      },
    });
  }

  async add(req, res) {
    try {
      const { admin, provider, goodReceivedDetail } = req.body.data;
      const addGoodsReceived = new GoodsReceived({ admin, provider });
      await addGoodsReceived.save();
      goodReceivedDetail.forEach(async (item) => {
        const addGoodsReceivedDetail = new GoodsReceivedDetail({
          goodsreceived: addGoodsReceived.id,
          product: item.product,
          quantity: item.quantity,
        });
        await addGoodsReceivedDetail.save();
        // add amount to product
        await Product.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(item.product) },
          {
            $inc: {
              quantity: item.quantity,
            },
          },
        );
      });

      const findGoodsReceived = await GoodsReceived.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(addGoodsReceived.id) } },
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
        GoodsReceived: findGoodsReceived,
        messages: "add successfully",
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

  async getById(req, res) {
    try {
      const { id } = req.params;
      const findGoodsReceived = await GoodsReceived.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "goodsreceiveddetails",
            localField: "_id",
            foreignField: "goodsreceived",
            as: "goodsReceivedDetail",
          },
        },
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
        {
          $lookup: {
            from: "products",
            localField: "goodsReceivedDetail.product",
            foreignField: "_id",
            as: "newProduct",
          },
        },
        { $unwind: "$provider" },
      ]).then((item) => item[0]);
      res.json({
        success: true,
        goodsReceived: findGoodsReceived,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new GoodsReceivedController();
