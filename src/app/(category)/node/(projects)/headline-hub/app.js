const express = require('express');
const bodyParser=require('body-parser');
// const newsRouter=require('./routes/news');  //adjust the path as necessary
const path = require('path'); // Ensure path module is required

const app = express();
const port = 5000;

//Middleware to parse the request body
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Static Files

//Static Files
//so if we include this we don't need to write big locations we will have static file
//now we can easily access the folder directly like for image, img/photo.jpg

app.use(express.static('public'));

// Templating Engine
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Routes
const newsRouter = require('./src/routes/news');
app.use('/', newsRouter); // this is for the home page -> home page we will get to show our news.js + news.ejs files

// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`));

