const express = require('express')
const tagRouter = express.Router()
const tagController = require('../controllers/tagController');
const { Authenticate } = require('../middlewares/authentication');

tagRouter.get('/', tagController.getTags);
tagRouter.post('/', Authenticate(['admin'], tagController.createTag))
tagRouter.put('/:id', Authenticate(['admin'], tagController.updateTag))
tagRouter.delete('/:id', Authenticate(['admin'], tagController.deleteTag))

module.exports = tagRouter;
