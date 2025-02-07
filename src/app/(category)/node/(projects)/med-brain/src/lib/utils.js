import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: false, // Prevent JavaScript access
    sameSite: "none", // Allow cookies across subdomains and origins
    secure: process.env.NODE_ENV === "production", // Only HTTPS in production
  });
  

  return token;
};
