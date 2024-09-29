const Product = require('../models/Product')
const Category = require('../models/Category');
const { default: mongoose } = require('mongoose');
const _ = require('lodash');

exports.createProduct = async (req, res) => {

    try {

        const { name, image, description, price, category } = req.body;

        const categoryFromDB = await Category.findOne({ _id: category })
        if (!categoryFromDB) {
            return res.status(400).json({ message: "Category not found with id " + category })
        }

        const data = {
            name: name, image: image, description: description, price: price, category: category
        }

        await Product.create(data)

        res.status(201).json({ success: true, message: "New product has been successfully created!" })

    } catch (error) {
        console.log("Failed to create product: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.updateProduct = async (req, res) => {
    try {

        const { name, image, description, price, category } = req.body;
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: `Product id ${id} is invalid!` })
        }

        const product = await Product.findOne({ _id: id })
        if (!product) {
            return res.status(400).json({ message: "Product not found with id " + id })
        }

        const categoryFromDB = await Category.findOne({ _id: category })
        if (!categoryFromDB) {
            return res.status(400).json({ message: "Category not found with id " + category })
        }

        const data = {
            name: name, image: image, description: description, price: price, category: category
        }

        await Product.updateOne({ _id: id }, { $set: data })

        res.status(200).json({ success: true, message: "Product has been successfully updated!" })

    } catch (error) {
        console.log("Failed to update product: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.deleteProduct = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: `Product id ${id} is invalid!` })
        }

        const product = await Product.findOne({ _id: id })
        if (!product) {
            return res.status(400).json({ message: "Product not found with id " + id })
        }

        await Product.deleteOne({ _id: id })

        res.status(200).json({ success: true, message: "Product has been successfully deleted!" })

    } catch (error) {
        console.log("Failed to delete product: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.getAllProduct = async (req, res) => {
    try {

        const products = await Product.find().populate('category')

        res.status(200).json({ success: true, message: `${products.length} results found!`, response: products })

    } catch (error) {
        console.log("Failed to find categories: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.getProductById = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: `Product id ${id} is invalid!` })
        }

        const product = await Product.findOne({ _id: id }).populate('category')
        if (!product) {
            return res.status(400).json({ message: "Product not found with id " + id })
        }

        res.status(200).json({ success: true, response: product })

    } catch (error) {
        console.log("Failed to find product: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.filterProducts = async (req, res) => {
    try {

        const { categoryId, key, minPrice, maxPrice } = req.query

        const query = {};

        if (categoryId) {
            query.category = categoryId;
        }

        if (key) {
            const safeKey = _.escapeRegExp(key);
            const regex = new RegExp(safeKey, 'i');
            query.$or = [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
            ];
        }

        if (minPrice !== undefined && maxPrice !== undefined) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        }

        const products = await Product.find(query).populate('category');

        res.status(200).json({ success: true, message: `${products.length} results found!`, response: products })

    } catch (error) {
        console.log("Failed to find categories: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}