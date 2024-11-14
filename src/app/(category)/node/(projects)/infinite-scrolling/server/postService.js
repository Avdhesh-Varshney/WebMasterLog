//here we will be having helper functions that will help us to get all data we need
// SELECT * FROM project.posts
// LIMIT 10 OFFSET 10;
//the above help us to get the phases from 11-20
//until LIMIT 10 we get 1-10 then after OFFSET 10 we get 11-20

//here offset is an number and protect it as it may happen that it is null or undefined

const { Db ,connection}=require('./db');

//made this function async as we want to 
//await the data from the query from the database
async function getPosts(offset){
    if(!offset){
        offset=0;
    }

    const dbInstance=Db.getDbInstance();
    const connection=dbInstance.getConnection();

    //inorder to get something returned to the 
    //variable(response) I'm going to create a Promise
    //so that I am not stuck in a callback function
    //as I need this data to be returned in app.js app.get()

    let query="SELECT * FROM posts LIMIT 10 OFFSET "+
    offset;

    const response= await new Promise((resolve,reject)=>{
        connection.query(query,function(error,results){
            if(error) reject(error);

            resolve(results);
        });
    });
    // console.log(response);
    return response;
}

module.exports ={getPosts};