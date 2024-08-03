require('dotenv').config();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { generateAccessToken } = require('../utils/jwt');

exports.registerUser = async (req, res) => {
    const { username, email, password, roles } = req.body;

    try {
        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({success: false, response: {email: "User already exists with email " + email}})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        if (roles.length === 0) {
            roles.push('user')
        }

        const data = {
            username: username,
            email: email,
            password: hashedPassword,
            roles: roles
        }

        await User.create(data)

        res.status(200).json({ success: true, message: "Your account created successfully!" })

    } catch (error) {
        console.log("Failed to sign up: " + error)
        return res.status(500).json({ message: "Internal server error!" })
    }
}

exports.loginUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found with email " + email })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(404).json({ success: false, message: "Invalid credentials!" })
        }

        const accessToken = generateAccessToken(user._id, user.roles)

        const response = {
            accessToken: accessToken,
            userId: user._id,
            username: user.username,
            email: user.email,
        }

        res.status(200).json({ success: true, response: response })
    } catch (error) {
        console.log("Failed to Sign in: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
