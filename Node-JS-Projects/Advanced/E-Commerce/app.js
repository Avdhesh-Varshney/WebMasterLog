require('dotenv').config();
const express = require('express');
const cors = require('cors')
const connectToDB = require('./config/dbConnection')
const AuthRouter = require("./routes/AuthRoutes")
const CartRouter = require("./routes/CartRoutes")
const CategoryRouter = require("./routes/CategoryRoutes")
const OrderRouter = require("./routes/OrderRoutes")
const ProductRouter = require("./routes/ProductRoutes")
const WishlistRouter = require("./routes/WishlistRoutes")
const UserRouter = require("./routes/UserRoutes")

const port = process.env.PORT || 8080;

connectToDB()

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/cart", CartRouter);
app.use("/category", CategoryRouter);
app.use("/order", OrderRouter);
app.use("/product", ProductRouter);
app.use("/wishlist", WishlistRouter);
app.use("/user", UserRouter);

app.listen(port, () => {
    console.log('Application is running on port ' + port)
})
