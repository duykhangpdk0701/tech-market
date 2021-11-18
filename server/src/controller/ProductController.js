const Product = require("../model/Product");
const mongoose = require("mongoose");
const { LAPTOP_ID, PHONE_ID } = require("../constant/categoryName");

class ProductController {
    async showAll(req, res) {
        try {
            const products = await Product.aggregate([
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
            res.json({ success: true, products });
        } catch (error) {
            res
                .status(500)
                .json({ success: false, messages: "Interval server error" });
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
            const product = await Product.findOne({ name: req.body.name });
            if (product) {
                return res
                    .status(400)
                    .json({ success: false, messages: "Product already exsist" });
            }
            const newProduct = new Product({ ...req.body, images: req.files ? req.files.map(file => "/assets/" + file.filename) : 'defaultImg ??' });
            await newProduct.save();
            res.json({ success: true, messages: "Add successfully" });
        } catch (error) {
            res
                .status(500)
                .json({ success: false, messages: "Interval server error" });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(401).json({ success: false, messages: "Missing id" });
        try {
            const product = await Product.updateOne({ _id: id }, req.body, {
                new: true,
            });
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
}

class LaptopController {
    async showAll(req, res) {
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
            res.status(500).json({ success: false, message: error });
        }
    }
}

class PhoneController {
    async showAll(req, res) {
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
                { $match: { "category._id": mongoose.Types.ObjectId(PHONE_ID) } },
            ]);
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
