import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const accessToken =
      req.headers.authorization?.split(" ")[1] ||
      null;

    if (!accessToken) {
      return res
        .status(401)
        .json(new ApiError(401, "Token not found"));
    }

    const decodedAccessToken = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!decodedAccessToken) {
      return res.status(401).json(new ApiError(400, "Token Expired"));
    }

    // check if the user exists
    const user = await User.findById(decodedAccessToken._id);

    if (!user) {
      return res.status(400).json(new ApiError(400, "User not found"));
    }

    req.user = user;
    req.role = user.role;

    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json(new ApiError(401, err.message));
  }
};

export default auth;