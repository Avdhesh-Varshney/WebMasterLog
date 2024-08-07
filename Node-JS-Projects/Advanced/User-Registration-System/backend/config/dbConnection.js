require('dotenv').config();
const mongoose = require('mongoose');

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(
        (error) => {
            console.error("Error connecting to MongoDB:", error);
        }
    );
}

module.exports = connectToDB