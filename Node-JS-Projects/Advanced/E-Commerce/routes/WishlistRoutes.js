const express = require('express');
const { addOrRemoveItem, getbyUser } = require('../controllers/WishlistController');
const { Authenticate } = require('../middlewares/authentication');
const WishlistRouter = express.Router();

WishlistRouter.post('/', Authenticate(["user"]), addOrRemoveItem);
WishlistRouter.get('/', Authenticate(["user"]), getbyUser);
WishlistRouter.put('/', Authenticate(["user"]), addOrRemoveItem);

module.exports = WishlistRouter;
