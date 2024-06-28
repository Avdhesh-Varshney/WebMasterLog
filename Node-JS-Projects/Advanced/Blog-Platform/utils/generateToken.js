require('dotenv').config();
const jwt = require('jsonwebtoken')

exports.generateToken = (_userId, _roles) => {
    const token = jwt.sign({ userId: _userId, roles: _roles }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
    return token
}