import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// different registration route for admin if in case we need to add some more authentication for admin login in future.
// Registeration of admin is done by the developer so this route is not exposed to the public.
// This route is only for the developer to register the admin.
export const registerAdmin = asyncHandler(async (req, res, next) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(new ApiError(400, "Please enter all fields"));
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json(new ApiError(400, "Password must be at least 6 characters long"));
  }

  if (email.includes("@") === false || email.includes(".") === false) {
    return res
      .status(400)
      .json(new ApiError(400, "Please enter a valid email address"));
  }

  //   check if the user is already registered
  let registeredUser = await User.findOne({
    email,
  });

  if (registeredUser) {
    return res.status(400).json(new ApiError(400, "User already registered"));
  }

  let user = new User({ name, email, password, role: "admin" });
  await user.save();

  user.refreshToken = user.generateRefreshToken();
  await user.save();

  let accessToken = user.generateAccessToken();

  user = user.toObject();
  user.accessToken = accessToken;

  user.password = undefined;
  user.__v = undefined;
  user.createdAt = undefined;
  user.updatedAt = undefined;

  return res
    .status(201)
    .json(new ApiResponse(201, user, "Admin registered successfully"));
});

export const registerUser = asyncHandler(async (req, res, next) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(new ApiError(400, "Please enter all fields"));
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json(new ApiError(400, "Password must be at least 6 characters long"));
  }

  if (email.includes("@") === false || email.includes(".") === false) {
    return res
      .status(400)
      .json(new ApiError(400, "Please enter a valid email address"));
  }

  let registeredUser = await User.findOne({
    email,
  });

  if (registeredUser) {
    return res.status(400).json(new ApiError(400, "User already registered"));
  }

  let user = new User({ name, email, password, role: "user" });
  await user.save();

  user.refreshToken = user.generateRefreshToken();
  await user.save();

  let accessToken = user.generateAccessToken();
  user = user.toObject();

  user.accessToken = accessToken;

  user.password = undefined;
  user.__v = undefined;
  user.createdAt = undefined;
  user.updatedAt = undefined;

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(new ApiError(400, "Please enter all fields"));
  }

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json(new ApiError(400, "Invalid credentials"));
  }

  let isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return res.status(400).json(new ApiError(400, "Invalid credentials"));
  }

  user.refreshToken = user.generateRefreshToken();
  await user.save();

  let accessToken = user.generateAccessToken();
  user = user.toObject();

  user.accessToken = accessToken;

  user.password = undefined;
  user.__v = undefined;
  user.createdAt = undefined;
  user.updatedAt = undefined;

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User logged in successfully"));
  W;
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  let user = req.user;
  user.refreshToken = null;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

export const refreshToken = asyncHandler(async (req, res, next) => {
  let { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(400)
      .json(new ApiError(400, "Please provide a refresh token"));
  }

  let decodedToken = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decodedToken) {
    return res.status(400).json(new ApiError(400, "Invalid refresh token"));
  }

  let user = await User.findById(decodedToken._id);

  user.refreshToken = user.generateRefreshToken();
  await user.save();

  let accessToken = user.generateAccessToken();
  
  return res
    .status(200)
    .json(new ApiResponse(200, {
        accessToken:  accessToken,
        refreshToken: user.refreshToken
    }, "Token refreshed successfully"));
});
