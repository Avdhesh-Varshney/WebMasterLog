const express = require('express');
const { getUserById, getUsersByRole, getAllUsers, changePassword, deleteUser } = require('../controllers/UserController');
const UserRouter = express.Router();

UserRouter.get('/', getAllUsers);
UserRouter.get('/:id', getUserById);
UserRouter.get('/role/:role', getUsersByRole);
UserRouter.put('/change-password', changePassword);
UserRouter.delete('/', deleteUser);

module.exports = UserRouter;
