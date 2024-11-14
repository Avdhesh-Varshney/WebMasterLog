const mongoose = require('mongoose');
//requing the .env file
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MONGODB ...")
    } catch (err) {
        console.error('Error connecting to database : ', err);
    }
}

module.exports = connectDB;