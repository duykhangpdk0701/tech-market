const mongoose = require("mongoose");
const { LAPTOP_ID } = require("../constant/categoryName");
const Product = require("../model/Product");

class LaptopController {
  ShowAll = async (req, res) => {
    try {
      const findLaptop = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand",
          },
        },
        { $unwind: "$brand" },
        { $match: { "category._id": mongoose.Types.ObjectId(LAPTOP_ID) } },
      ]);
      res.json({ success: true, laptops: findLaptop });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    }
  };
}

module.exports = new LaptopController();
