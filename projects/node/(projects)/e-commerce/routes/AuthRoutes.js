const express = require('express');
const { registerUser, loginUser, refreshToken, sendOtp, verifyOtp } = require('../controllers/AuthController');
const { validateRegister, validateLogin, validateRefreshToken } = require('../middlewares/validator');
const AuthRouter = express.Router();

AuthRouter.post('/register', validateRegister(), registerUser);
AuthRouter.get('/send-otp/:email', sendOtp);
AuthRouter.post('/verify-otp', verifyOtp);
AuthRouter.post('/login', validateLogin(), loginUser);
AuthRouter.post('/refresh-token', validateRefreshToken(), refreshToken);

module.exports = AuthRouter;
