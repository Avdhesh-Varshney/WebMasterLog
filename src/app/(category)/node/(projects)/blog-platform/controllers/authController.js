const User = require('../models/User')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')
const { STATUS } = require('../utils/status')

exports.signIn = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(404).json({ message: "Please send all the required fields: email, password"})
    }

    try {
        const user = await User.findOne({email: email})

        if(!user) {
            return res.status(404).json({ message: "User not found with email " + email})
        }

        if (user.status === STATUS.DISABLE) {
            return res.status(401).json({ message: "User account is disbled by the admin!"})
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(404).json({ message: "Invalid credentials!"})
        }

        const token = generateToken(user._id, user.roles)

        const response = {
            token: token,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                about: user.about,
            }
        }

        res.status(200).json(response)
    }catch (error) {
        console.log("Failed to Sign in: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}