const express = require('express');
const { createCategory, updateCategory, deleteCategory, getAllCategory, getCategoryById } = require('../controllers/CategoryController');
const { Authenticate } = require('../middlewares/authentication');
const { validateCategory } = require('../middlewares/validator');
const CategoryRouter = express.Router();

CategoryRouter.post('/', Authenticate(["admin"]), validateCategory(), createCategory);
CategoryRouter.put('/:id', Authenticate(["admin"]), validateCategory(), updateCategory);
CategoryRouter.delete('/:id', Authenticate(["admin"]), deleteCategory);
CategoryRouter.get('/', getAllCategory);
CategoryRouter.get('/:id', getCategoryById);

module.exports = CategoryRouter;
