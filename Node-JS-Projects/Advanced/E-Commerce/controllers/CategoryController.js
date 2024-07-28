const { default: mongoose } = require('mongoose');
const Category = require('../models/Category')

exports.createCategory = async (req, res) => {

    try {

        const {name, image, description} = req.body;

        const data = {
            name: name, image: image, description: description
        }

        await Category.create(data)

        res.status(201).json({ success: true, message: "New category has been successfully created!" })
        
    }catch (error) {
        console.log("Failed to create category: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.updateCategory = async (req, res) => {
    try {

        const {name, image, description} = req.body;
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success:false, message: `Category id ${id} is invalid!` })
        }

        const category = await Category.findOne({ _id: id })
        if (!category) {
            return res.status(400).json({ success:false, message: "Category not found with id " + id })
        }

        const data = {
            name: name, image: image, description: description
        }

        await Category.updateOne({ _id: id }, { $set: data })

        res.status(200).json({ success: true, message: "Category has been successfully updated!" })
        
    }catch (error) {
        console.log("Failed to update category: " + error)
        return res.status(500).json({ success:false, message: "Internal server error" })
    }
}

exports.deleteCategory = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success:false, message: `Category id ${id} is invalid!` })
        }

        const category = await Category.findOne({ _id: id })
        if (!category) {
            return res.status(400).json({ success:false, message: "Category not found with id " + id })
        }

        await Category.deleteOne({ _id: id })

        res.status(200).json({ success: true, message: "Category has been successfully deleted!" })
        
    }catch (error) {
        console.log("Failed to delete category: " + error)
        return res.status(500).json({ success:false, message: "Internal server error" })
    }
}

exports.getAllCategory = async (req, res) => {
    try {

        const categories = await Category.find()

        res.status(200).json({ success: true, message: `${categories.length} results found!`, response: categories })
        
    }catch (error) {
        console.log("Failed to find categories: " + error)
        return res.status(500).json({ success:false, message: "Internal server error" })
    }
}

exports.getCategoryById = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success:false, message: `Category id ${id} is invalid!` })
        }

        const category = await Category.findOne({ _id: id })
        if (!category) {
            return res.status(400).json({ success:false, message: "Category not found with id " + id })
        }

        res.status(200).json({ success: true, response: category })
        
    }catch (error) {
        console.log("Failed to find category: " + error)
        return res.status(500).json({ success:false, message: "Internal server error" })
    }
}