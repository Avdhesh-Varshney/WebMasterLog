const express = require('express')
const blogRouter = express.Router()
const blogController = require('../controllers/blogController');
const { Authenticate } = require('../middlewares/authentication');

blogRouter.post('/', Authenticate(["user"]), blogController.createBlog);
blogRouter.put('/:id', Authenticate(["user"]), blogController.updateBlog);
blogRouter.delete('/:id', Authenticate(["user"]), blogController.deleteBlog);
blogRouter.get('/', blogController.getBlogs);

module.exports = blogRouter;