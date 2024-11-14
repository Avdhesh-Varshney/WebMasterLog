const express = require('express');
const { addItem, updateQuantity, removeItem, clearCart, getCartByUser } = require('../controllers/CartController');
const { Authenticate } = require('../middlewares/authentication');
const CartRouter = express.Router();

CartRouter.post('/', Authenticate(["user"]), addItem);
CartRouter.put('/', Authenticate(["user"]),  updateQuantity);
CartRouter.delete('/:productId', Authenticate(["user"]),  removeItem);
CartRouter.delete('/', Authenticate(["user"]),  clearCart);
CartRouter.get('/', Authenticate(["user"]),  getCartByUser);

module.exports = CartRouter;
