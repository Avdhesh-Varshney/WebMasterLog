require('dotenv').config();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const { generateOTP } = require('../utils/otp');
const sendEmail = require('../config/nodemailer');

exports.registerUser = async (req, res) => {
    const { username, email, password, roles } = req.body;

    try {
        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists with email " + email })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        if (roles.length === 0) {
            roles.push('user')
        }

        const otp = generateOTP();

        const data = {
            username: username,
            email: email,
            password: hashedPassword,
            otp: {
                code: otp,
                expiresAt: Date.now() + 10 * 60 * 1000, // 10 min
            },
            enabled: false,
            roles: roles,
            wishlist: [],
            cart: { numberOfItems: 0, total: 0, cartItems: [] }
        }

        await User.create(data)

        const subject = "Please confirm your email!"
        const body = `Hello, <br> <br> Welcome to XYZ! We are excited to have you on-board and there's just one step to verify if it's actually your e-mail address. Please enter the below otp in the verification phase of registration. <br> <br> Your OTP is : ${otp} <br><r> Please note that the OTP will be expires in 10 minutes. <br><br> Thank you.`
        await sendEmail(email, subject, body);

        res.status(200).json({ success: true, message: "Verification email sent!" })

    } catch (error) {
        console.log("Failed to sign up: " + error)
        return res.status(500).json({ message: "Internal server error!" })
    }
}

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found with email ' + email });
        }

        if (user.otp.resendAttempts >= 3) {
            if (user.otp.blockedUntil && user.otp.blockedUntil > Date.now()) {
                return res.status(403).json({ success: false, message: 'Too many resend attempts. Account is blocked. Try again later.' });
            } else {
                user.otp.resendAttempts = 0;
                user.otp.blockedUntil = null;
            }
        }

        const otp = generateOTP();
        user.otp.code = otp;
        user.otp.expiresAt = Date.now() + 10 * 60 * 1000;
        user.otp.resendAttempts += 1;
        if (user.otp.resendAttempts >= 3) {
            user.otp.blockedUntil = Date.now() + 30 * 60 * 1000; // 30 min
        }

        await user.save();
        const subject = "Please confirm your email!"
        const body = `Hello, <br> <br> Welcome to XYZ! We are excited to have you on-board and there's just one step to verify if it's actually your e-mail address. Please enter the below otp in the verification phase of registration. <br> <br> Your OTP is : ${otp} <br><r> Please note that the OTP will be expires in 10 minutes. <br><br> Thank you.`
        await sendEmail(email, subject, body);

        res.status(200).json({ success: true, message: "Verification email sent!" })

    } catch (error) {
        console.log("Failed to send otp: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.verifyOtp = async (req, res) => {

    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.otp.blockedUntil && user.otp.blockedUntil > Date.now()) {
            return res.status(403).json({ success: false, message: 'Account is blocked. Try again later.' });
        }

        if (user.otp.expiresAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        if (user.otp.code !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        user.enabled = true;
        user.otp.code = null;
        user.otp.expiresAt = null;
        user.otp.resendAttempts = 0;
        user.otp.blockedUntil = null;

        await user.save();
        res.status(200).json({ success: true, message: 'Account verified successfully' });
    } catch (error) {
        console.log("Failed to verify regisration otp: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.loginUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found with email " + email })
        }

        if (!user.enabled) {
            return res.status(403).json({ success: false, message: 'User not verified. Please verify your account.' });
        }


        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(404).json({ success: false, message: "Invalid credentials!" })
        }

        const accessToken = generateAccessToken(user._id, user.roles)
        const refreshToken = generateRefreshToken(user._id, user.roles)

        const response = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
                userId: user._id,
                username: user.username,
                email: user.email,
            }
        }

        res.status(200).json({ success: true, response: response })
    } catch (error) {
        console.log("Failed to Sign in: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.refreshToken = async (req, res) => {
    const { token } = req.body

    try {

        jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
            console.log(user)
            if (err) {
                return res.status(401).json({ success: false, message: "Invalid refresh token!" })
            }

            const newAccessToken = generateAccessToken(user.userId, user.roles)
            return res.status(200).json({ success: true, token: newAccessToken })

        })

    } catch (error) {
        console.log("Failed to validate refresh token: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}