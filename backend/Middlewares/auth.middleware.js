import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access Denied: No Token Provided" });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.SECRET_ACCESS_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid Token" });
    }
};
