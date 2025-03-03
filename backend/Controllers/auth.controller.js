import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import { formatDataToSend, generateUsername, emailRegex, passwordRegex } from "../utils/helpers.js";

export const signup = async (req, res) => {
    let { fullname, email, password } = req.body;

    if (fullname.length < 3) return res.status(400).json({ error: "Full name should be at least 3 letters long" });
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email" });
    if (!passwordRegex.test(password)) return res.status(400).json({
        error: "Password should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    });

    try {
        const hashed_password = await bcrypt.hash(password, 10);
        const username = await generateUsername(email);

        const user = new User({
            personal_info: { fullname, email, password: hashed_password, username }
        });

        const savedUser = await user.save();
        return res.status(201).json(formatDataToSend(savedUser));
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: "User with this email already exists" });
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    let { email, password } = req.body;

    try {
        const user = await User.findOne({ "personal_info.email": email });
        if (!user) return res.status(404).json({ error: "Email not found" });

        const isMatch = await bcrypt.compare(password, user.personal_info.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_ACCESS_KEY, { expiresIn: "7d" });

        return res.status(200).json({ token, user: formatDataToSend(user) });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
