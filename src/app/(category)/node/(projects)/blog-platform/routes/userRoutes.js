const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')
const { validateUserRequestBody } = require('../middlewares/validators')
const { Authenticate } = require('../middlewares/authentication')


userRouter.post('/', validateUserRequestBody, userController.signUp)
userRouter.get('/:id', userController.getUserById);
userRouter.get('/', Authenticate(['admin']), userController.getAllUsers);
userRouter.put('/:id', Authenticate(['user']), userController.updateUser)
userRouter.delete('/:id', Authenticate(['user']), userController.deleteUser)


module.exports = userRouter;
