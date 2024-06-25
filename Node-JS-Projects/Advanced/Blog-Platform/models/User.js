const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    roles: {
        type: Array
    },
    about: {
        require: true,
        type: String
    },
    status: {
        require: true,
        type: String
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema)

module.exports = User;