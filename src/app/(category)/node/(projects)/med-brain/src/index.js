import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import presRoutes from "./routes/pres.route.js"
import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from 'body-parser';


dotenv.config()
// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;
 // Provide a default port in case the environment variable is missing

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors()
);
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Credentials','true');
  next();
})
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", presRoutes);
app.use(bodyParser.json());
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate = async (prompt)=>{
  try{
      const updatedprompt = prompt + "keep answer short seprated with commas and health specific otherwise said him that i can only help you with health related informations even the user greet you and say how are you and dont take the name of non curable disease and big diseases"
      const result = await model.generateContent(updatedprompt);
      console.log(result.response.text());
      return result.response.text()
  }
  catch(err){
      console.log(err);
  }
}
app.post('/api/content',async (req,res)=>{
  try{
    const data  = req.body.question;
    const result = await generate(data);
    res.send({
      "result":result
    })
  }
  catch(err){
      console.log(err);
  }
})

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
});
