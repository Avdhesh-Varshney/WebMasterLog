require('dotenv').config();
const { validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { STATUS } = require('../utils/status');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log("Failed to find all users: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const existingUser = await User.findOne({ _id: id })

        if (!existingUser || existingUser.status === STATUS.DISABLE) {
            return res.status(404).json({ message: "User not found with id " + id })
        }
        res.send(existingUser)
    } catch (error) {
        console.log("Failed to find user: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.signUp = async (req, res) => {

    const errors = validationResult(req)
    const ROLES = ["user", "admin"];
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    let { name, email, password, role } = req.body;

    try {

        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists with email " + email })
        }
        if (!role) {
            role = ["user"]
        } else if (Array.isArray(role)) {
            if (!role.every(r => ROLES.indexOf(r) !== -1)) {
                return res.status(400).json({ message: "Roles are invalid!" })
            }
        } else {
            return res.status(400).json({ message: "Send roles as an array!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const data = {
            name: name, email: email, password: hashedPassword, roles: role, about: "", status: STATUS.ENABLE
        }

        await User.create(data)

        res.status(201).json({ message: "User has been successfully added!" })

    } catch (error) {
        console.log("Failed to sign up: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params
    const { name, about } = req.body;

    if (req.user !== id) {
        return res.status(401).json({ message: "Unauthorized: Access denied!" })
    }

    if (!name) {
        return res.status(404).json({ message: "Name is required!" })
    }

    if (name.length > 20 || name.length < 4) {
        return res.status(404).json({ message: "Name must be between 5 and 20 characters long!" })
    }
    if (about && about.length > 160) {
        return res.status(404).json({ message: "About must be less than 160 characters long!" })
    }

    try {
        const user = await User.findOne({ _id: id })

        if (!user) {
            return res.status(404).json({ message: "User not found with id " + id })
        }

        const data = {
            name: name, email: user.email, password: user.password, roles: user.roles, about: about, status: user.status
        }

        await User.updateOne({ _id: id }, { $set: data })
        res.status(200).json({ message: "User has been successfully updated!" })

    } catch (error) {
        console.log("Failed to update user: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.deleteUser = async (req, res) => {
    const { id } = req.params

    if (req.user != id) {
        return res.status(401).json({ message: "Unauthorized: Access denied!" })
    }

    try {
        const existingUser = await User.findOne({ _id: id })

        if (!existingUser) {
            return res.status(404).json({ message: "User not found with id " + id })
        }

        await User.updateOne({ _id: id }, { $set: { status: STATUS.DISABLE } })
        await Blog.deleteMany({ user: id })
        await Blog.updateMany({}, { $pull: { likes: id } })
        await Comment.deleteMany({ user: id })

        res.status(200).json({ message: "User has been successfully deleted!" })

    } catch (error) {
        console.log("Failed to delete user: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}