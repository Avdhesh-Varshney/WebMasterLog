require('dotenv').config();
const express = require('express');
const cors = require('cors')
const connectToDB = require('./config/dbConnection')
const AuthRouter = require("./routes/AuthRoutes")

const port = process.env.PORT || 8080;

connectToDB()

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", AuthRouter);

app.listen(port, () => {
    console.log('Application is running on port ' + port)
})
