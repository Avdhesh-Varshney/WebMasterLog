var mysql=require('mysql2');
const dotenv=require('dotenv');
dotenv.config();

let instance=null;

var connection=mysql.createConnection({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: process.env.DB_PORT,
    database: process.env.database
});

// connection.connect(function(err){
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('Database Connected');
// });

class Db{
    static getDbInstance(){
        return instance ? instance : new Db();
    }
    getConnection(){
        return connection;
    }
}

module.exports={Db,connection};