const Product = require('../model/Product')
const mongoose = require('mongoose')

class ProductController {
    async showAll(req, res) {
        try {
            const products = await Product.aggregate([
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                { $unwind: '$category' },
                {
                    $lookup: {
                        from: 'brands',
                        localField: 'brand',
                        foreignField: '_id',
                        as: 'brand'
                    }
                },
                { $unwind: '$brand' }
            ])
            res.json({success:true, products})
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async show(req, res) {
        const { id } = req.params
        try {
            const product = await Product.aggregate([
                {
                    $match: {
                        _id : mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                { $unwind: '$category' },
                {
                    $lookup: {
                        from: 'brands',
                        localField: 'brand',
                        foreignField: '_id',
                        as: 'brand'
                    }
                },
                { $unwind: '$brand' }
            ])
            res.json({success:true, product})
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async store(req, res) {
        try {
            const product = await Product.findOne({ name: req.body.name })
            if (product) {
                return res.status(400).json({ success: false, messages: 'Product already exsist' });
            }
            const newProduct = new Product(req.body)
            await newProduct.save()
            res.json({ success: true, messages: 'Add successfully', product: newProduct })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const product = await Product.updateOne({ _id: id }, req.body, { new: true })
            if (!product) return res.json({ success: false, messages: 'Cant update Product' })
            res.json({ success: true, messages: 'Update successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const Product = await Product.deleteOne({ _id: id })
            if (!Product) return res.status(401).json({ success: false, messages: 'Cant delete Product' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new ProductController()