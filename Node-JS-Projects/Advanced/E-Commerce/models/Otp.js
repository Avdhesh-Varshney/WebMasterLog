const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema({
    code: {
        type: String
    },
    expiresAt: {
        type: Date
    },
    resendAttempts: { 
        type: Number, 
        default: 0 
    },
    blockedUntil: {
        type: Date,
        default: null
    },
});

module.exports = otpSchema