const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    tagName: {
        type: String,
        required: true
    }
})

const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag