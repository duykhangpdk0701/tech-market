const Category = require('../model/Category')

class CategoryController {
    async showAll(req, res) {
        try {
            const categories = await Category.find({})
            res.json({success:true, categories})
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async show(req, res) {
        const { id } = req.params
        try {
            const categories = await Category.findById(id)
            res.json({success:true, categories})
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async store(req, res) {
        try {
            const category = await Category.findOne({ name: req.body.name })
            if (category) {
                return res.status(400).json({ success: false, messages: 'Category already exsist' });
            }
            const newCategory = new Category(req.body)
            await newCategory.save()
            res.json({ success: true, messages: 'Add successfully', category: newCategory })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const category = await Category.updateOne({ _id: id }, req.body, { new: true })
            if (!category) return res.json({ success: false, messages: 'Cant update Category' })
            res.json({ success: true, messages: 'Update successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const category = await Category.deleteOne({ _id: id })
            if (!category) return res.status(401).json({ success: false, messages: 'Cant delete Category' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new CategoryController()