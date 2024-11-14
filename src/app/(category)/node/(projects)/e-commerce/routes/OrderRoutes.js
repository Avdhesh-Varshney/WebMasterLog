const express = require('express');
const { createOrder, updateStatus, getAllOrders, getOrderByUser, getOrderByStatus, getOrderById } = require('../controllers/OrderController');
const { Authenticate } = require('../middlewares/authentication');
const OrderRouter = express.Router();

OrderRouter.post('/', Authenticate(["user"]), createOrder);
OrderRouter.put('/', Authenticate(["admin"]), updateStatus);
OrderRouter.get('/', Authenticate(["admin"]), getAllOrders);
OrderRouter.get('/user/:id', Authenticate(["user", "admin"]), getOrderByUser);
OrderRouter.get('/status/:status', Authenticate(["user", "admin"]), getOrderByStatus);
OrderRouter.get('/:id', Authenticate(["user", "admin"]), getOrderById);



module.exports = OrderRouter;
