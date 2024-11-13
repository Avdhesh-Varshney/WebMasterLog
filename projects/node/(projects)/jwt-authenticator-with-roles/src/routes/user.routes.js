import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  registerAdmin,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import { permit } from "../middlewares/permit.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ADMIN, USER } from "../constants.js";

const router = express.Router();

// secret routes for admin (This router is not exposed to the public and is only for the developer to register the admin.)
// comment this route after registering the admin

router.post("/register-admin", registerAdmin);

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

// protected route with both permission
router.post("/logout", auth, logoutUser);

// protected routes for specific roles
router.get("/i-am-admin", auth, permit(ADMIN), (req, res) => {
  res.status(200).json(new ApiResponse(200, null, "You are an admin"));
});

router.get("/i-am-user", auth, permit(USER), (req, res) => {
  res.status(200).json(new ApiResponse(200, null, "You are a user"));
});

export default router;
