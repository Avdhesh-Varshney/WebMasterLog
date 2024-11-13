const express = require('express')
const commentRouter = express.Router()
const commentController = require('../controllers/commentController');
const { Authenticate } = require('../middlewares/authentication');

commentRouter.post('/', Authenticate(['user']), commentController.addComment);
commentRouter.delete('/:id', Authenticate(['user']), commentController.deleteComment)
commentRouter.put('/:id', Authenticate(['user']), commentController.updateComment)
commentRouter.get('/', commentController.getCommentsByBlog)

module.exports = commentRouter;
