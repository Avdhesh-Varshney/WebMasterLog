import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
    profilePic: {
      type: String,
      default: "",
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required:true
    },
    gender: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
