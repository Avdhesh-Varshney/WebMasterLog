const mongoose= require('mongoose');

const recipeSchema= new mongoose.Schema({
    name:{
        type:String,
        required:'This field is required'
    },
    description:{
        type:String,
        required:'This field is required'
    },
    email:{
        type:String,
        required:'This field is required'
    },
    ingredients:{
        type:Array,
        required:'This field is required'
    },
    category:{
        type:String,
        // Since I want some specific categories only so we will apply enum so 
        //it will only allow that categories only to be included
        enum:['Thai', 'American','Chinese','Mexican','Indian'],
        required:'This field is required'
    },
    image:{
        type:String,
        required:'This field is required'
    },
});

recipeSchema.index( { name:'text', description: 'text'});
//WildCard Indexing
//recipeSchema.index({"$**" : 'text});

module.exports = mongoose.model('Recipe',recipeSchema);
// in the above Recipe is my collection name