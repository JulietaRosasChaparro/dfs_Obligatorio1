import { loginService, registerService } from "../services/auth.services.js";
import connectDB from "../config/db.js";

// Login
export const loginController = async (req, res) => {
    try {
        await connectDB()
        const { username, password } = req.body;
        const { token, user } = await loginService({ username, password });
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Registro
export const registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const { token, user } = await registerService({ username, email, password });
        res.status(201).json({ token, user });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};