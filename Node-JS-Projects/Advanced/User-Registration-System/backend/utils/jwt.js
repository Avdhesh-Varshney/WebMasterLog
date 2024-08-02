require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateAccessToken = (userId, roles = []) => {
  return jwt.sign({ userId, roles }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

const generateRefreshToken = (userId, roles) => {
  return jwt.sign({ userId, roles }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30d' });
};

module.exports = { generateAccessToken, generateRefreshToken };
