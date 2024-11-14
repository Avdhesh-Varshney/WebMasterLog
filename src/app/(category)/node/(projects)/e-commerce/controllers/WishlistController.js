const User = require("../models/User")
const Product = require('../models/Product')

exports.addOrRemoveItem = async (req, res) => {

    try {

        const { product } = req.body
        const userId = req.user

        const productFromDb = await Product.findOne({ _id: product })
        if (!productFromDb) {
            return res.status(400).json({ success: false, message: "Product not found with id " + product })
        }

        let user = await User.findOne({ _id: userId })

        if (user.wishlist.includes(product)) {
            user.wishlist.remove(product)
            await User.updateOne({ _id: user._id }, { $set: user })
            console.log(user.wishlist)
            res.status(200).json({ success: true, message: "Product removed successfully from wishlist!", wishlist: user.wishlist })
        } else {
            user.wishlist.push(product)
            await User.updateOne({ _id: user._id }, { $set: user })
            console.log(user.wishlist)

            res.status(200).json({ success: true, message: "Product added successfully to wishlist!", wishlist: user.wishlist })
        }

    } catch (error) {
        console.log("Failed to add/remove item to wishlist: " + error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }

}

exports.getbyUser = async (req, res) => {

    try {

        const userId = req.user

        let user = await User.findOne({ _id: userId })

        res.status(200).json({ success: true, message: `${user.wishlist.length} items in the wishlist!`, wishlist: user.wishlist })

    } catch (error) {
        console.log("Failed to fetch wishlist by user: " + error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }

}
