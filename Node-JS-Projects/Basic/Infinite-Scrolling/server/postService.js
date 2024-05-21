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