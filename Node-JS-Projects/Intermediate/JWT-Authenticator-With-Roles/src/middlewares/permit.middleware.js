import { ApiError } from "../utils/ApiError.js";

// high order function to check if user has permission to access a resource
export const permit = (...permissions) => {
  return (req, res, next) => {
    const userRole = req.role;
    if (!permissions.includes(userRole)) {
      return res
        .status(403)
        .json(
          new ApiError(
            403,
            "You do not have permission to access this resource"
          )
        );
    }
    next();
  };
};