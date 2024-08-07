const express = require('express');
const { registerUser, loginUser } = require('../controllers/AuthController');
const { validateRegister, validateLogin } = require('../middlewares/validator');
const AuthRouter = express.Router();

AuthRouter.post('/register', validateRegister(), registerUser);
AuthRouter.post('/login', validateLogin(), loginUser);

module.exports = AuthRouter;
