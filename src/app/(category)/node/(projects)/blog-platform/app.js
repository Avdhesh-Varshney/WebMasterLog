require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRouter')
const userRoutes = require('./routes/userRoutes')
const tagRoutes = require('./routes/tagRoutes')
const blogRoutes = require('./routes/blogRoutes')
const likeRoutes = require('./routes/likeRoutes')
const commentRoutes = require('./routes/commentRouter')
const connectToDB = require('./config/dbConnection')

const port = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json())

connectToDB()

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/tags', tagRoutes)
app.use('/blogs', blogRoutes)
app.use('/likes', likeRoutes)
app.use('/comments', commentRoutes)

app.listen(port, () => {
    console.log('Application is running on port ' + port)
})
