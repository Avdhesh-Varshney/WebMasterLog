require('dotenv').config();
const jwt = require('jsonwebtoken')

exports.Authenticate = (permissions = []) => {
    return (req, res, next) => {
        const token = req.headers['authorization']
    
        if (!token) {
            return res.status(401).json({message: 'Unauthorized access: Token is required!'})
        }
    
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({message: 'Unauthorized access: Token has expired!'})
                }
                else {
                    return res.status(401).json({message: 'Unauthorized access: Invalid token!'})
                }
            }
            console.log(user)
            if (!permissions.some(role => user.roles.indexOf(role) !== -1)) {
                return res.status(401).json({message: 'Unauthorized access: Insufficient permissions!'})
            }
            req.user = user.userId
            next()
        })
    }
}