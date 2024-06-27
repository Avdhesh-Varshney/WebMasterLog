const port=4000;
const express=require("express");
const app= express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const { type } = require("os");
const { error } = require("console");


app.use(express.json());
app.use(cors());

//Database connection with mongoDb

mongoose.connect("Your MongoDb Url");


//Api Creation
app.get("/",(req,res)=>{
    res.send("Express App is Running");
})

//Image Storage Engine
const Storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: Storage });

//creating upload endpoint
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:4000/images/${req.file.filename}`
    })
})

//Schema for products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

app.post('/addproduct', async (req, res) => {
   let products=await Product.find();
   let id;
   if (products.length > 0){
    let last_product_array=products.slice(-1);
    let last_product=last_product_array[0];
    id=last_product.id+1;
   }else{
    id=1;
   }
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            available: req.body.available,
        });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name:req.body.name,
    })
});

//Creating API for deleting product

app.post('/removeproduct',async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name:req.body.name
    })
})

//creating API for getting all products
app.get("/allproducts",async (req,res)=>{
    let products=await Product.find({});
    console.log("All Product Fetched");
    res.send(products);
})

//Schema for user model

const Users=mongoose.model('Users',{
    name:{
        type: "string",
    },
    email:{
        type:"string",
        unique:true
    },
    password:{
        type:"string",
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
//Creating Endpoint for registering User
app.post('/signup',async(req,res)=>{

    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({
            success:false,
            errors:"User already exist with this email id"
        })}
        let cart={};
        for(let i=0;i<300;i++){
            cart[i]=0;
        } 
        const user=new Users({
            name:req.body.name,
            email:req.body.email,   
            password:req.body.password,
            cartData:cart,
        })   
    await user.save();
//jwt authentication
    const data={
         user:{
            id:user.id,
         }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({
        success:true,
        token
    })
})

//creating endpoint for user login
app.post('/login',async(req, res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const passCompare=req.body.password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id,
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({
                success:true,
                token
            });
        }else{
            res.json({
                success:false,
                error:"Wrong Password"
            })
        }
    }
    else{
        res.json({
            success:false,
            error:"Wrong Email Id"
        })
    }
})

//Creatin endpoint for newcollection data
app.get('/newcollections',async(req, res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("newcollecton Fetched");
    res.send(newcollection);
})

//creating endpoint for popular in women

app.get('/popularinwomen',async (req, res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})
//creating middleware to fetxh user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using valid token" });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Please authenticate using valid token" });
    }
}

// Creating endpoint for add to cart
app.post('/addtocart', fetchUser, async (req, res) => {
   
        
        // Fetch the authenticated user's ID
        const userId = req.user.id;
        const itemId = req.body.itemId;
        console.log("Added",itemId);
        // Find user by ID
        let userData = await Users.findById(userId);
        userData.cartData[itemId]+=1;
        await Users.findOneAndUpdate({_id:userId},{cartData:userData.cartData})
        res.send("Added")
        
});
//creating endpoint to remove product from cartData
app.post("/removefromcart",fetchUser, async (req,res)=>{
   
    const userId = req.user.id;
    const itemId = req.body.itemId;
    console.log("removed",itemId);
    // Find user by ID
    let userData = await Users.findById(userId);
    if(userData.cartData[itemId]>0){
        userData.cartData[itemId]-=1;
    }
    
    await Users.findOneAndUpdate({_id:userId},{cartData:userData.cartData})
    res.send("removed")

})

//creating endpoint to retrieve data on login

app.post("/getcart",fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})


app.listen(port,(error)=>{
    if(!error){
        console.log("Server is Running on Port:"+port);
    }
    else{
        console.log("Error"+error);
    }
})