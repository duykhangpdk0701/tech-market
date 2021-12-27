const Brand = require("../model/Brand");
const mongoose = require("mongoose");

class BrandController {
  async showAll(req, res) {
    try {
      // cái này t cho nó nhận category id để nó trả về brand của từng loại
      // vd: trả về brand của laptop
      const query = [{}];
      if (req.query.category)
        query.push({
          "category._id": mongoose.Types.ObjectId(req.query.category),
        });

      const brands = await Brand.aggregate([
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
          $match: {
            $and: query,
          },
        },
      ]);
      res.json({ success: true, brands });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const brand = await Brand.aggregate([
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
      ]);
      res.json({ success: true, brand: brand[0] });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }

  async store(req, res) {
    try {
      const brand = await Brand.findOne({ name: req.body.name });
      if (brand) {
        return res
          .status(400)
          .json({ success: false, messages: "Brand already exsist" });
      }
      const newBrand = new Brand(req.body);
      await newBrand.save();
      res.json({
        success: true,
        messages: "Add successfully",
        brand: newBrand,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }

  async update(req, res) {
    const { id } = req.body;
    if (!id)
      return res.status(401).json({ success: false, messages: "Missing id" });
    try {
      const brand = await Brand.updateOne({ _id: id }, req.body, { new: true });
      if (!brand)
        return res.json({ success: false, messages: "Cant update brand" });
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
      const brand = await Brand.deleteOne({ _id: id });
      if (!brand)
        return res
          .status(401)
          .json({ success: false, messages: "Cant delete brand" });
      res.json({ success: true, messages: "Delete successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, messages: "Interval server error" });
    }
  }
}

module.exports = new BrandController();
