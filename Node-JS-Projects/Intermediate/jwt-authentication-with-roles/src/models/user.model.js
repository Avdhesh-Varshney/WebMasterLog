import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { ADMIN, USER } from "../constants.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        trim: true,
    },
    role: {
        type: String,
        enum: [USER, ADMIN],
        default: "user",
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)