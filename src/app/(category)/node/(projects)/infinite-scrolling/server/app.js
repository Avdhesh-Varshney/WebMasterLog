const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
dotenv.config();
const { Db ,connection}=require('./db');
const https = require('https');

const app=express();
app.use(cors());    // you're telling your Express server to allow cross-origin requests from any origin
app.use(express.json());

const postsService =require('./postService');


app.get('/list', function(request,response){
    //this helps us to update the no from 1-10 to 11
    //after 10 otherwise it get started fro 1-10 then again 1-10
    const offset=request.query.offset;  //now pass offset to promise

    // response.send('Hello World');
    //will tell how many posts I want from the database
    // response.json({
    //     success:true
    // });

    //THE BELOW LINE RETURN -- Promise { <pending> } in console of vs
    // console.log(postsService.getPosts());       //this is going to return a promise

    const promise= postsService.getPosts(offset);
    // data.then(posts => console.log(posts));       //get data and it's an array
    //now in order to send this back as JSON format we need to 
    //access the array so data.then changes to below one

    promise.then(posts => response.json(posts));     //now this is showing us arr 1st obj in json if posts[0] now we will se 10 posts as LIMIT 10
});

app.get('/listCount', function(request,response){
    //will tell how many posts are stored in the table
    response.json({
        success:true
    });
});

app.listen(process.env.SERVER_PORT, ()=>{
    console.log('Server Running')
});

// app.listen(process.env.PORT, ()=>{
//     console.log(`Listening to the port ${process.env.PORT}`)
//     connection.connect(function(err){
//         if(err) throw err;
//         console.log("Database is Connected")
//     });
// });