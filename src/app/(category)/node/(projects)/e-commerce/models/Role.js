const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({
    name: {
        require: true,
        type: String
    },
})

const Role = mongoose.model('Role', RoleSchema)
module.exports = Role