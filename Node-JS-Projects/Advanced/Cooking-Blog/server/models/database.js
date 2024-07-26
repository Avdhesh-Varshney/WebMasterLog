const mongoose=require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser:true , useUnifiedTopology:true});

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('Connected to MongoDB')
});

//Models
require('./Category');
require('./Recipe');