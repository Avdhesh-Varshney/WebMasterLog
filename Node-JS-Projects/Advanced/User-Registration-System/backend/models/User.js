const mongoose = require('mongoose');

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
    roles: {
        type: [String],
        default: ['user']
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema)

module.exports = User;