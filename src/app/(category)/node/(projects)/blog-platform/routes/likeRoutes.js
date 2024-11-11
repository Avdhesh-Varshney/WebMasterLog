const express = require('express')
const likeRouter = express.Router()
const likeController = require('../controllers/likeController');
const { Authenticate } = require('../middlewares/authentication');


likeRouter.put('/', Authenticate(['user']), likeController.likeOrUnLike);
likeRouter.get('/:blogId', likeController.getLikesByBlog);

module.exports = likeRouter;