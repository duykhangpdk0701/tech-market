const Product = require("../model/Product");
const mongoose = require("mongoose");
const { LAPTOP_ID, PHONE_ID } = require("../constant/categoryName");

class ProductController {
  async showAll(req, res) {
    try {
      const preAggregate = [
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
        { $match: { isActive: true } },
        // { $match: { quantity: { $gte: 0 } } },
      ];

      if (req.query.max) {
        preAggregate.push({
          $match: {
            price: {
              $gt: parseInt(req.query.min),
              $lt: parseInt(req.query.max),
            },
          },
        });
      }

      if (req.query.brand) {
        preAggregate.push({
          $match: {
            "brand.name": { $in: req.query.brand },
          },
        });
      }

      const products = await Product.aggregate(preAggregate);
      res.json({ success: true, products });
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: "Interval server error" + error.message,
      });
    }
  }

  async showAllAdminDSide(req, res) {
    try {
      const findProduct = await Product.aggregate([
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
      ]);

      res.json({ success: true, products: findProduct });
    } catch (error) {
      res.status(500).json({
        success: false,
        messages: "Interval server error" + error.message,
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
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
      ]).then((item) => item[0]);
      res.json({ success: true, product });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const product = await Product.findOne({ name: req.body.name });
      if (product) {
        return res
          .status(400)
          .json({ success: false, messages: "Product already exsist" });
      }
      const newProduct = new Product({
        ...req.body,
        images: req.files
          ? req.files.map((file) => "/assets/" + file.filename)
          : "defaultImg ??",
      });
      await newProduct.save();
      res.json({
        success: true,
        product: newProduct,
        messages: "Add successfully",
      });
    } catch (error) {
      res.status(400).json({ success: false, messages: error });
    }
  }

  async update(req, res) {
    console.log(req);
    const { id } = req.body;
    if (!id)
      return res.status(401).json({ success: false, messages: "Missing id" });
    try {
      const product = await Product.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        {
          ...req.body,
          images: req.files
            ? req.files.map((file) => "/assets/" + file.filename)
            : "defaultImg ??",
        },
        {
          new: true,
        },
      );
      if (!product)
        return res.json({ success: false, messages: "Cant update Product" });
      res.json({ success: true, messages: "Update successfully" });
    } catch (error) {
      res.status(500).json({ success: false, messages: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(401).json({ success: false, messages: "Missing id" });
    try {
      const Product = await Product.deleteOne({ _id: id });
      if (!Product)
        return res
          .status(401)
          .json({ success: false, messages: "Cant delete Product" });
      res.json({ success: true, messages: "Delete successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }

  async disactive(req, res) {
    try {
      const { id, isActive } = req.body;
      const disbaleProduct = await Product.findByIdAndUpdate(id, {
        isActive: !isActive,
      });
      res.json({
        success: true,
        product: disbaleProduct,
        messages: "disactive successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, messages: error });
    }
  }

  async active(req, res) {
    try {
      const { id } = req.params;
      const disbaleProduct = await Product.findByIdAndUpdate(id, {
        isActive: true,
      });
      res.json({
        success: true,
        product: disbaleProduct,
        messages: "Delete successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, messages: error });
    }
  }
}

class LaptopController {
  async showAll(req, res) {
    const preAggregate = [
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
      { $match: { isActive: true } },
      { $match: { "category._id": mongoose.Types.ObjectId(LAPTOP_ID) } },
    ];

    if (req.query.max) {
      preAggregate.push({
        $match: {
          price: { $gt: parseInt(req.query.min), $lt: parseInt(req.query.max) },
        },
      });
    }
    if (req.query.brand) {
      preAggregate.push({
        $match: {
          "brand.name": { $in: req.query.brand },
        },
      });
    }

    try {
      const findLaptop = await Product.aggregate(preAggregate);
      res.json({ success: true, laptops: findLaptop });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
}

class PhoneController {
  async showAll(req, res) {
    try {
      const preAggregate = [
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
        { $match: { isActive: true } },
        { $match: { "category._id": mongoose.Types.ObjectId(PHONE_ID) } },
      ];

      if (req.query.max) {
        preAggregate.push({
          $match: {
            price: {
              $gt: parseInt(req.query.min),
              $lt: parseInt(req.query.max),
            },
          },
        });
      }

      if (req.query.brand) {
        preAggregate.push({
          $match: {
            "brand.name": { $in: req.query.brand },
          },
        });
      }

      const findLaptop = await Product.aggregate(preAggregate);

      res.json({ success: true, laptops: findLaptop });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
}

module.exports = {
  ProductController: new ProductController(),
  LaptopController: new LaptopController(),
  PhoneController: new PhoneController(),
};
