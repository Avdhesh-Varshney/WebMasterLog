import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully");
  } catch (error) {
    console.log("DB Error:" + error);
  }
};

export default dbConnection;
