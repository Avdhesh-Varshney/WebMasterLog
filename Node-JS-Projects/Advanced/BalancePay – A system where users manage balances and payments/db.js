const mongoose = require('mongoose');

    mongoose.connect('');

   

const userSchema = new mongoose.Schema ({
    firstname : String,
    lastname : String,
    password : String,
    username : String
});


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema)
module.exports = {
    User,
    Account
}
