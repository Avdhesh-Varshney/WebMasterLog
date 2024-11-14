const mongoose = require('mongoose');
const { CartSchema } = require('./Cart');
const otpSchema = require('./Otp');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    otp: otpSchema,
    enabled: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [String],
        default: ['user']
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product', 
            default: []
        }
    ],
    cart: CartSchema

}, { timestamps: true });

const User = mongoose.model('User', UserSchema)

module.exports = User;