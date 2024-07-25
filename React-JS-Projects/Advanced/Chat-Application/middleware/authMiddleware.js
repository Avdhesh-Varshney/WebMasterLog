const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protect = async (req, res, next) => {
    let token;
  
    // If 'authorization' header present and starts Wwth 'Bearer' word
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1]; // Splits "Bearer <TOKEN>"
  
        //decodes token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        // Find user with the id and return it without the password
        req.user = await User.findById(decoded.id).select("-password");
  
        next(); // Move on to next operation
      } catch (error) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Not authorized, token failed",
        });
      }
    }
  
    // If token is not present
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Not authorized, no token provided",
      });
    }
  };
  
  module.exports = protect;