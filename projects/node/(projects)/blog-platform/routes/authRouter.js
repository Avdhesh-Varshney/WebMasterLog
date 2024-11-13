const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController')

authRouter.use('/signin', authController.signIn)

module.exports = authRouter;