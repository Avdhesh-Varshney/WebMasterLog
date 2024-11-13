const mongoose = require('mongoose')

const Role = require('../models/Role')

exports.validateRegister = () => {
    return async (req, res, next) => {

        const {username, email, password, roles} = req.body;
        const errors = {}
    
        if (username.trim() === "") {
            errors.username = "Username is required!"
        }else if(username.trim().length <= 3) {
            errors.username = "Username must have atleast 4 characters!"
        }
    
        if (email.trim() === "") {
            errors.email = "Email is required!"
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            errors.email = "Invalid email address!"
        }
    
        if (password.trim() === "") {
            errors.password = "Password is required!"
        }else if(password.trim().length < 8) {
            errors.password = "Password must have atleast 8 characters!"
        }
    
        if (!roles) {
            console.log(roles)
            req.body.roles = ['user']
        }
        else if (!Array.isArray(roles)) {
            errors.role = "Roles should be an array!"
        }else {
            for (const role of roles) {
                const r = await Role.findOne({ name: role });
                if (!r) {
                    errors.role = `Role ${role} does not exist!`;
                }
            }
        }
    
        if (Object.keys(errors).length !== 0) {
            return res.status(400).json({success: false, response: errors})
        }
    
        next()
    }
}

exports.validateLogin = () => {
    return (req, res, next) => {

        const {email, password} = req.body;
        const errors = {}
    
        if (email.trim() === "") {
            errors.email = "Email is required!"
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            errors.email = "Invalid email address!"
        }

        if (password.trim() === "") {
            errors.password = "Password is required!"
        }
    
        if (Object.keys(errors).length !== 0) {
            return res.status(400).json({success: false, response: errors})
        }
    
        next()
    }
}

exports.validateRefreshToken = () => {
    return (req, res, next) => {

        const {token} = req.body;
        const errors = {}
    
        if (!token) {
            errors.Token = "Token is required!"
        }
    
        if (Object.keys(errors).length !== 0) {
            return res.status(400).json({success: false, response: errors})
        }
    
        next()
    }
}

exports.validateCategory = () => {
    return (req, res, next) => {
        const {name, image, description} = req.body;
        const errors = []

        if (!name) {
            errors.name = "Category name is required!"
        }
        if (!image) {
            errors.image = "Category image is required!"
        }
        if (!description) {
            errors.description = "Category description is required!"
        }

        if (Object.keys(errors).length !== 0) {
            return res.status(400).json({success: false, response: errors})
        }
    
        next()
    }
}

exports.validateProduct = () => {
    return (req, res, next) => {
        const {name, image, description, price, category} = req.body;
        const errors = []

        if (!name) {
            errors.name = "Product name is required!"
        }
        if (!image) {
            errors.image = "Product image is required!"
        }
        if (!description) {
            errors.description = "Product description is required!"
        }
        if (!price) {
            errors.price = "Product price is required!"
        }else if (isNaN(price)) {
            errors.price = "Product price is invalid!"
        }
        if (!mongoose.Types.ObjectId.isValid(category)) {
            errors.category = "Category id is invalid!"
        }

        if (Object.keys(errors).length !== 0) {
            return res.status(400).json({success: false, response: errors})
        }
    
        next()
    }
}

exports.validateCart = () => {
    return (req, res, next) => {
        const {productId, quantity} = req.body;
        const errors = []

        if (!productId) {
            errors.product = "Product id is required!"
        }else if (!mongoose.Types.ObjectId.isValid(productId)) {
            errors.product = "Product id is invalid!"
        }
        if (!quantity) {
            errors.quantity = "Quantity is required!"
        }else if (!/^[1-9]\d*$/.test(quantity)) {
            errors.quantity = "Quantity must be an integer!"
        }

        if (Object.keys(errors).length !== 0) {
            return res.status(400).json({success: false, response: errors})
        }
    
        next()
    }
}

exports.validateOrder= () => {
    return (req, res, next) => {
        const { shipAddress1, shipAddress2, shipToCity, phone } = req.body;
        const errors = []

        if (!shipAddress1) {
            errors.shipAddress1 = "shipAddress1 is required!"
        }
        if (!shipToCity) {
            errors.shipToCity = "shipToCity is required!"
        }
        if (!phone) {
            errors.phone = "phone is required!"
        }else if (!/^\+?[1-9]\d{1,14}$/.test(phoneInput.value)) {
            errors.phone = "Invalid phone number!"
        }

        if (Object.keys(errors).length !== 0) {
            return res.status(400).json({success: false, response: errors})
        }
    
        next()
    }
}
