import mongoose from "mongoose";
import userSchema from "../Schemas/user.schema.js";

const User = mongoose.model("users", userSchema);

export default User;
