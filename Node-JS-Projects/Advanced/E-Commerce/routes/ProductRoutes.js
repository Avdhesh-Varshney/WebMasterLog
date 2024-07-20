const express = require('express');
const { createProduct, updateProduct, deleteProduct, getAllProduct, getProductById, filterProducts } = require('../controllers/ProductController');
const { Authenticate } = require('../middlewares/authentication');
const { validateProduct } = require('../middlewares/validator');
const ProductRouter = express.Router();

ProductRouter.post('/', Authenticate(["admin"]), validateProduct(), createProduct);
ProductRouter.put('/:id', Authenticate(["admin"]), validateProduct(), updateProduct);
ProductRouter.delete('/:id', Authenticate(["admin"]), deleteProduct);
ProductRouter.get('/', filterProducts);
ProductRouter.get('/:id', getProductById);

module.exports = ProductRouter;
