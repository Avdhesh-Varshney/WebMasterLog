const axios=require('axios');
const express=require('express');
const app=express();
const { Db ,connection}=require('./db');
const https = require('https');

async function insertPostsIntoDb(){
    const dbInstance =  Db.getDbInstance();
    const connection =  dbInstance.getConnection();

    const response= await axios.get("http://jsonplaceholder.typicode.com/posts");
    
    const posts=response.data;
    const postsLength=posts.length;

    let query="INSERT INTO posts (title,body) VALUES ";
    posts.forEach(function(post,index){
        query += `("${post.title}","${post.body}")`;

        if(index + 1 !== postsLength){
            query += ",";
        }
    })
    query += ";";
    // console.log(query);
    //with the help of below code I actually was able to push all my api data into the sql
    connection.query(query, function(error,results){
        if(error){
            console.log(error);
            return;
        }
        console.log(results);
    });
}

insertPostsIntoDb();

app.listen(process.env.PORT, ()=>{
    console.log(`Listening to the port ${process.env.PORT}`)
    connection.connect(function(err){
        if(err) throw err;
        console.log("Database is Connected")
    });
});