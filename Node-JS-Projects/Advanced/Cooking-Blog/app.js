const express=require('express');

//express layout is basically helpful when diff layout are created for diff scenarios
const expressLayouts= require('express-ejs-layouts');

//FOR SUBMIT BUTTON
const fileUpload= require('express-fileupload');
const session= require('express-session');
const cookieParser = require('cookie-parser'); 
const flash= require('connect-flash');

const app=express();
const port =process.env.PORT || 3000;

require('dotenv').config()

app.use(express.urlencoded( { extended:true } ));
//static is used so that hame koi image insert karni ho kabhi to yaha par path path na khelna pade
app.use(express.static('public'));
app.use(expressLayouts);


//creating middlewares for the submit button to work
app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());


app.set('layout', './layouts/main');
app.set('view engine','ejs');

const routes = require('./server/routes/recipeRoutes.js')
app.use('/',routes);

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})